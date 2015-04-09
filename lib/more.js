var assert = require('assert');
var vm = require('vm');
var esprima = require('esprima');
var estraverse = require('estraverse');
var uglify = require('uglify-js');
var esgen = require("escodegen").generate;
var pp = require("zeHelpers").prettyPrint;

// var xjst = require('./xjst');
var xjstServerCompiler = require('./server-xjst').getCompiler(true);
var xjstClientCompiler = require('./client-xjst').getCompiler(true);

function addBemOptions(options) {
  var result = options || {};
  // TODO __$ctx and __$ref belong in the globals

  if (!result.globalInit)
    result.globalInit = {
      mode: '_mode',
      block: 'block',
      elem: 'elem',
      elemMods: 'elemMods',
      mods: 'mods'
    };

  if (!result.globals)
    result.globals = {
      mode: '',
      block: '',
      elem: '',
      elemMods: null,
      mods: null
    };

  if (!result.scoreFilter)
    result.scoreFilter = Compiler.prototype._bumpMode;

  return result;
}
exports.addBemOptions = addBemOptions;

function Compiler(options) {
  options = this.options = options || {};
  if (options.cache === true) {
    if (options.optimize === false || options['no-opt']) {
      throw new Error('Cache doesn\'t work with development build');
    }
  }

  // TODO __$ctx and __$ref belong in the globals
  this.globals = {
    _mode: '$$mode',
    block: '$$block',
    elem: '$$elem',
    elemMods: '$$elemMods',
    mods: '$$mods'
  };
  this.options.globalInit = {
    mode: '_mode',
    block: 'block',
    elem: 'elem',
    elemMods: 'elemMods',
    mods: 'mods'
  };
  this.options.globals = {
    mode: '',
    block: '',
    elem: '',
    elemMods: null,
    mods: null
  };
  this.options.scoreFilter = this._bumpMode;
  this.globalKeys = Object.keys(this.globals);
  this.globalValues = this.globalKeys.map(function(key) {
    return this.globals[key];
  }, this);

  this.matches = {
    match: true, elemMatch: true,
    block: true, elem: true, mode: true, mod: true, elemMod: true,
    def: true, tag: true, attrs: true, cls: true,
    js: true, jsAttr: true, bem: true, mix: true, content: true
  };
};
exports.Compiler = Compiler;

// Ensure that `this._mode` predicate is always top-level
Compiler.prototype._bumpMode = function _bumpMode(ast) {
  if (ast.type !== 'MemberExpression' || ast.computed)
    return 0;
  var obj = ast.object;
  var prop = ast.property;
  if (obj.type !== 'Identifier' || obj.name !== '__$ctx')
    return 0;
  if (prop.type !== 'Identifier' || prop.name !== '_mode')
    return 0;

  return Infinity;
};

Compiler.prototype.pretranslate = function pretranslate(ast) {
  // Ok, I admit it. Translation process is a bit fucked.
  var self = this;
  var allowed = {
    Program: true,
    ExpressionStatement: true,
    CallExpression: true,
    MemberExpression: true
  };
  ast = estraverse.replace(ast, {
    enter: function(ast, parent, notify) {
      // Do not get too deep
      if (!allowed[ast.type]) {
        this.skip();
      }
    },
    leave: function(ast) {
      // 1. mark all match calls
      ast = self.markMatches(ast);

      // 2. replace all custom matches with match() calls
      ast = self.replaceCustom(ast);

      // 3. Merge match(cond).match(cond) into match(cond, cond) and
      //    match(cond)(match(cond)) into match()(match(cond, cond)
      ast = self.mergeMatches(ast);

      return ast;
    }
  });

  // 4. Flatten every statement and replace local/apply/applyNext/applyCtx
  for (var i = 0; i < ast.body.length; i++) {
    var stmt = ast.body[i];
    if (stmt.type !== 'ExpressionStatement' ||
        !stmt.expression.bemMarked) {
      continue;
    }

    var exprs = this.flatten(stmt.expression);
    ast.body.splice.apply(ast.body, [ i, 1 ].concat(exprs.map(function(expr) {
      return {
        type: 'ExpressionStatement',
        expression: expr
      }
    })));
    i += exprs.length - 1;
  }

  return ast;
};

Compiler.prototype.translate = function translate(ast, code, previous) {
  ast = this.pretranslate(ast);
  return xjst.translate(ast, code, this.options);
};

Compiler.prototype.markMatches = function markMatches(ast) {
  // Propagate marks through member expressions
  if (ast.type === 'MemberExpression' &&
      ast.object.type === 'CallExpression' && ast.object.bemMarked) {
    return {
      type: 'MemberExpression',
      computed: ast.computed,
      object: ast.object,
      property: ast.property,
      bemMarked: true
    };
  }

  if (ast.type !== 'CallExpression') return ast;

  // Propagate marks through calls
  if (ast.callee.type === 'CallExpression' && ast.callee.bemMarked) {
    return {
      type: 'CallExpression',
      callee: ast.callee,
      arguments: ast.arguments,
      bemMarked: true
    };
  }

  // match()
  // NOTE: Marks are created here
  if (ast.callee.type === 'Identifier') {
    var name = ast.callee.name;
    if (!this.matches[name]) return ast;
    return {
      type: 'CallExpression',
      callee: ast.callee,
      arguments: ast.arguments,
      bemMarked: true
    };
  }

  // .match()
  if (ast.callee.type === 'MemberExpression' && ast.callee.bemMarked) {
    var type = ast.callee.property.type;
    assert(type === 'Literal' || type === 'Identifier',
           'match().prop could be only literal or identifier');
    var prop = ast.callee.property.name || ast.callee.property.value;
    if (!this.matches[prop]) return ast;
    return {
      type: 'CallExpression',
      callee: ast.callee,
      arguments: ast.arguments,
      bemMarked: true
    };
  }

  return ast;
};

Compiler.prototype.getBinop = function getBinop(name, args) {
  var lhs;
  var rhs;
  if (name === 'elemMatch') {
    return args;
  } else if (name === 'block' || name === 'elem' || name === 'mode') {
    lhs = name === 'mode' ? '_mode' : name;
    rhs = args[0];
    assert.equal(args.length, 1,
                 'block/elem/mode predicates must have only one argument');
  } else if (name === 'mod' || name === 'elemMod') {
    assert.equal(args.length, 2,
                 'mod() predicates must have two arguments');
    // Modificator/Elem-Modificator predicate
    return [{
      type: 'MemberExpression',
      computed: false,
      object: { type: 'ThisExpression' },
      property: { type: 'Identifier', name: name + 's' }
    }, {
      type: 'BinaryExpression',
      operator: '===',
      left: {
        type: 'MemberExpression',
        computed: true,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: { type: 'ThisExpression' },
          property: { type: 'Identifier', name: name + 's' }
        },
        property: args[0]
      },
      right: args[1]
    }];
  } else {
    // Mode predicates
    assert.equal(args.length, 0,
                 'mode literal predicates can\'t have arguments');
    lhs = '_mode';
    rhs = { type: 'Literal', value: name === 'def' ? 'default' : name };
  }
  assert(lhs && rhs);

  return [{
    type: 'BinaryExpression',
    operator: '===',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: { type: 'ThisExpression' },
      property: { type: 'Identifier', name: lhs }
    },
    right: rhs
  }];
};

Compiler.prototype.replaceCustom = function replaceCustom(ast) {
  if (ast.type !== 'CallExpression' || !ast.bemMarked) return ast;

  var callee = ast.callee;
  if (callee.type === 'Identifier') {
    var name = callee.name;

    if (!this.matches[name]) {
      return ast;
    }

    // Just replace predicates
    if (name === 'match') return ast;

    return {
      type: 'CallExpression',
      _blockMatch: name === 'block',
      _elemMatch: name === 'elemMatch' || name === 'elem',
      callee: {
        type: 'Identifier',
        name: 'match'
      },
      arguments: this.getBinop(name, ast.arguments),
      bemMarked: true
    };
  } else if (callee.type === 'MemberExpression') {
    var property = callee.property;
    var name = property.name || property.value;
    if (!this.matches[name]) {
      return ast;
    }

    // Just replace predicates
    if (name === 'match') return ast;

    return {
      type: 'CallExpression',
      _blockMatch: name === 'block',
      _elemMatch: name === 'elemMatch' || name === 'elem',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: callee.object,
        property: { type: 'Identifier', name: 'match' }
      },
      arguments: this.getBinop(name, ast.arguments),
      bemMarked: true
    };
  }

  return ast;
};

Compiler.prototype.mergeMatches = function mergeMatches(ast) {
  if (ast.type !== 'CallExpression' || !ast.bemMarked) return ast;

  // (match(...).match)(...) => match(...)
  if (ast.callee.type === 'MemberExpression') {
    var obj = ast.callee.object;
    assert.equal(obj.type, 'CallExpression');
    ast = {
      type: 'CallExpression',
      _blockMatch: ast._blockMatch || obj._blockMatch,
      _elemMatch: ast._elemMatch || obj._elemMatch,
      callee: obj.callee,
      arguments: ast.arguments.concat(obj.arguments),
      bemMarked: true
    };
  }

  return ast;
};

Compiler.prototype.flatten = function flatten(expr) {
  function addNoElem(predicates, blockMatch, elemMatch) {
    if (blockMatch && !elemMatch) {
      return predicates.concat({
        type: 'UnaryExpression',
        operator: '!',
        argument: {
          type: 'MemberExpression',
          computed: false,
          property: { type: 'Identifier', name: 'elem' },
          object: { type: 'ThisExpression' }
        }
      });
    }

    return predicates;
  }

  function dive(expr, blockMatch, elemMatch) {
    // At this point only match(...)(match(...)(...), body) expressions are
    // present.
    assert.equal(expr.type, 'CallExpression');
    assert.equal(expr.callee.type, 'CallExpression');

    blockMatch = blockMatch || expr.callee._blockMatch || false;
    elemMatch = elemMatch || expr.callee._elemMatch || false;

    var predicates = expr.callee.arguments;

    var res = [];

    // Visit sub-templates and bodies
    expr.arguments.forEach(function(arg) {
      if (arg.bemMarked) {
        dive(arg, blockMatch, elemMatch).forEach(function(t) {
          var tblockMatch = blockMatch || t.blockMatch;
          var telemMatch = elemMatch || t.elemMatch;

          res.push({
            predicates: addNoElem(predicates, tblockMatch, telemMatch),
            predicates: predicates.concat(t.predicates),
            blockMatch: tblockMatch,
            elemMatch: telemMatch,
            body: t.body
          });
        });
      } else {
        // Body
        res.push({
          predicates: addNoElem(predicates, blockMatch, elemMatch),
          blockMatch: blockMatch,
          elemMatch: elemMatch,
          body: arg
        });
      }
    });

    return res;
  }

  return dive(expr).map(function(t) {
    return {
      type: 'CallExpression',
      callee: {
        type: 'CallExpression',
        callee: { type: 'Identifier', name: 'template' },
        arguments: t.predicates
      },
      arguments: [ this.replaceBody(t.body) ]
    };
  }, this);
};

Compiler.prototype.replaceBody = function replaceBody(body) {
  var self = this;

  return estraverse.replace(body, {
    leave: function(node) {
      if (node.type !== 'CallExpression') return;

      // apply(locals)
      if (node.callee.type === 'Identifier') {
        var name = node.callee.name;
        if (name !== 'apply' &&
            name !== 'applyNext' &&
            name !== 'applyCtx') {
          return;
        }

        return name === 'applyCtx' ? self.replaceApplyCtx(node) :
                                     self.replaceApply(node);
      // local(locals)(body)
      } else if (node.callee.type === 'CallExpression' &&
                 node.callee.callee.type === 'Identifier') {
        var name = node.callee.callee.name;
        if (name !== 'local') return;

        return self.replaceLocal(node);
      }
    }
  });
};

Compiler.prototype.getModeObj = function getModeObj(mode) {
  return {
    type: 'ObjectExpression',
    properties: [{
      type: 'Property',
      key: { type: 'Literal', value: '_mode' },
      value: mode,
      kind: 'init'
    }]
  };
};

Compiler.prototype.replaceApplyCtx = function replaceApplyCtx(ast) {
  // applyCtx(newCtx) => applyNext({ _mode: '', ctx: newCtx })
  assert(ast.arguments.length >= 1,
         'applyCtx() must have at least one argument');
  var changes = [{
    type: 'ObjectExpression',
    properties: [{
      type: 'Property',
      key: { type: 'Literal', value: '_mode' },
      value: { type: 'Literal', value: '' },
      kind: 'init'
    }, {
      type: 'Property',
      key: { type: 'Literal', value: 'ctx' },
      value: ast.arguments[ast.arguments.length - 1],
      kind: 'init'
    }]
  }].concat(ast.arguments.slice(0, -1));
  return this.traceChanges(changes, {
    type: 'CallExpression',
    callee: { type: 'Identifier', name: 'applyNext' },
    arguments: changes
  });
};

Compiler.prototype.replaceApply = function replaceApply(ast) {
  // apply(mode, {})
  var changes = ast.arguments.map(function(arg) {
    if (arg.type !== 'Literal') return arg;
    return this.getModeObj(arg);
  }, this);

  return this.traceChanges(changes, {
    type: 'CallExpression',
    callee: ast.callee,
    arguments: changes
  });
};

Compiler.prototype.replaceLocal = function replaceLocal(ast) {
  // (local(mode, {}))(body)
  var changes = ast.callee.arguments.map(function(arg) {
    if (arg.type !== 'Literal') return arg;
    return this.getModeObj(arg);
  }, this);

  return this.traceChanges(changes, {
    type: 'CallExpression',
    callee: {
      type: 'CallExpression',
      callee: ast.callee.callee,
      arguments: changes
    },
    arguments: ast.arguments
  });
};

Compiler.prototype.traceChanges = function traceChanges(changes, expr) {
  if (this.options.cache !== true) return expr;

  // Translate changes AST array to pairs of key/value
  var pairs = changes.reduce(function(prev, cur) {
    return prev.concat(cur.properties);
  }, []).map(function(property) {
    return {
      key: property.key.name || property.key.value,
      value: property.value
    };
  });

  // Filter changes that could be logged
  // (Literal values and movements)
  pairs = pairs.map(function(pair) {
    function toArr(arr) {
      return {
        type: 'ArrayExpression',
        elements: arr.map(function(elem) {
          return { type: 'Literal', value: elem }
        })
      };
    }
    var key = toArr(pair.key.split(/\./g));

    var val = pair.value;
    if (val.type === 'Literal') return { key: key, val: val, path: null };

    var path = [];
    while (val.type === 'MemberExpression' && !val.computed) {
      path.unshift(val.property.name);
      val = val.object;
    }

    if (val.type === 'ThisExpression') {
      return {
        key: key,
        val: { type: 'Literal', value: 1 },
        path: toArr(path)
      };
    }

    return null;
  });

  var data = pairs.filter(function(pair) {
    return pair !== null;
  }).map(function(pair) {
    return {
      type: 'ArrayExpression',
      elements: pair.path ? [pair.key, pair.path, pair.val] :
                            [pair.key, pair.val]
    };
  });

  // No changes
  if (data.length === 0) return expr;

  var history = {
    type: 'MemberExpression',
    computed: false,
    property: { type: 'Identifier', name: '__$history' },
    object: { type: 'ThisExpression' }
  };

  // this.__$history.push(...)
  var save = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      property: { type: 'Identifier', name: 'push' },
      object: history
    },
    arguments: data
  };

  // this.__$history = this.__$history.slice(0, -data.len);
  var restore = {
    type: 'AssignmentExpression',
    operator: '=',
    left: history,
    right: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        property: { type: 'Identifier', name: 'slice' },
        object: history
      },
      arguments: [
        { type: 'Literal', value: 0 },
        { type: 'Literal', value: -data.length }
      ]
    }
  };

  function check(expr) {
    return {
      type: 'IfStatement',
      test: history,
      consequent: { type: 'ExpressionStatement', expression: expr },
      alternate: null
    };
  }

  // function() { push_history(); invoke local; }.call(this)
  var res = { type: 'Identifier', name: '__$r' };
  return {
    type: 'CallExpression',
    arguments: [{ type: 'ThisExpression' }],
    callee: {
      type: 'MemberExpression',
      computed: false,
      property: { type: 'Identifier', name: 'call' },
      object: {
        type: 'FunctionExpression',
        id: null,
        params: [],
        defaults: [],
        rest: null,
        generator: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [{
              type: 'VariableDeclarator',
              id: res,
              init: null
            }]
          },
          check(save),
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: res,
              right: expr
            }
          },
          check(restore),
          {
            type: 'ReturnStatement',
            argument: res
          }]
        }
      }
    }
  };
};

Compiler.prototype.generate = function generate(code) {
    var ast = esprima.parse(code, {
    loc: true
  });

  // ast = this.translate(ast, code);
  var result = this.translate(ast, code);

  var out = uglify.AST_Node.from_mozilla_ast(result.ast).print_to_string({ beautify: true });

  return {out: out, ir: result.ir};
};

Compiler.prototype.compile = function compile(code, previous) {
  var result = this.generate(code, previous),
      exports = {};

  vm.runInNewContext(result.out, { exports: exports, console: console });
  exports.ir = result.ir;
  return exports;
};



// TODO Pushing this before sortGroup would be best unless it depends on, then
// can try replaceContext during sortGroup or rendering. This may even simplify
// it, since I'd be sure I'm inside templates, not external (other) user-defined
// js.
Compiler.prototype.replaceContext = function replaceContext(ast) {
  var self = this;

  function translateProp(prop) {
    if (self.globals.hasOwnProperty(prop))
      return self.globals[prop];
    else
      return false;
  };

  var applyc = [];
  var map = null;

  return estraverse.replace(ast, {
    // looks like applyc.push() and applyc.pop() are there only to
    // ensure that we skip these nodes and remember that we did
    // so. Seems excessive. There must be a better algorithm.
    enter: function(node) {
      var isFunction = node.type === 'FunctionDeclaration' ||
                       node.type === 'FunctionExpression';
      var id = node.id && node.id.name;
      if (applyc.length === 0 &&                     //recur
          isFunction &&
          (map !== null || /^(applyc|__\$[bg]\d+)$/.test(id))) {
        applyc.push(node);
      } else if (applyc.length === 0 &&              //skip
                 node.type === 'VariableDeclarator' &&
                 /^__\$m\d+$/.test(id)) {
        map = node;
      } else if (isFunction && /^__\$lb/.test(id)) { //recur
        applyc.push(node);
      } else if (applyc.length === 0) {              //skip
        return;
      }

      if (applyc[applyc.length - 1] !== node && isFunction) {
        return;                 //effectively perform the `skip', proceed with `recur'
      }

      // perform $ctx replacement in `recur' nodes
      if (node.type === 'MemberExpression' &&
          node.computed === false &&
          node.object.type === 'Identifier' &&
          node.object.name === '__$ctx') {
        var prop = translateProp(node.property.name || node.property.value);
        if (!prop)
          return;

        return { type: 'Identifier', name: prop };
      }
    },
    leave: function(node) {
      if (applyc[applyc.length - 1] === node)
        applyc.pop();
      if (node === map)
        map = null;
    }
  });
};

function Client(options, state) {
  this.options = addBemOptions(options);
  this.preSerialise = options && options.preSerialise;
  this.templates = [];
  this.code = '';
  this.xjstCompiler = new xjstClientCompiler(this.options);
  this.xjstCompiler.isFreshCompiler = true;
  this.xjstCompiler.code = '';
  if (state) {
    this.templates = state.ir;
    this.code = state.out;
    this.xjstCompiler = this.templates[0].compiler;
  }
}
exports.Client = Client;

// TODO I can switch compiler in Templates during unmarshaling, no good reason
// to walk the Templates in a separate func (switchCompilerIn):
// 1 - unmarshalCompiler
// 2 - merge compilers
// 3 - unmarshal templates switching the compiler
Client.prototype.generate = function generate(message) {
  var compiler = this.unmarshalCompiler(message.compiler),
      templates = this.unmarshalTemplates(message.templates),
      xjstResult =this.translate(templates, compiler),
      ast = xjstResult.ast;

  // this.xjstCompiler = xjstResult.compiler;
  this.templates = xjstResult.ir;

  if (this.preSerialise) {
    // pp(ast.$apply, {prompt: "ast.$apply"});
    this.code = esgen(esprima.parse(ast.$apply.join('\n')));
    return this.code
  }

  this.code = uglify
    .AST_Node
    .from_mozilla_ast(ast)
    .print_to_string({ beautify: true });

  return this.code;
};

Client.prototype.compile = function compile(code) {
  var exports = {};
  vm.runInNewContext(code || this.code, { exports: exports, console: console });
  return exports;
}

Client.prototype.translate = function translate(newTemplates, newCompiler) {
  var result = this.xjstCompiler
        .merge(newCompiler)
        .switchCompilerIn(newTemplates)
        .translate(newTemplates.concat(this.templates));
  // strictly speaking this should not be necessary, since compiler is being
  // mutated not replaced
  this.xjstCompiler = result.compiler;
  return result;
}

Client.prototype.unmarshalCompiler = function unmarshalCompiler(data) {
  return JSON.parse(data);
};

// NOTE duck-typing json-parsed objects as Body/Predicate/Template entities so
// that wrapping simply re-uses their ability to clone. Makes code small but
// might be a source of bugs. Buyer beware!
Client.prototype.unmarshalTemplates = function unmarshalTemplates(data) {
  var constructors = require('./'),
      Template = constructors.Template,
      Predicate = constructors.Predicate,
      Body = constructors.Body,
      compiler = new xjstClientCompiler(this.options),
      templates = JSON.parse(data);

  function wrapPredicate(predicate) {
    var result = new Predicate(compiler, predicate.expr, predicate.value, predicate);
    result.id = predicate.id
    result.valueId = predicate.valueId;
    return result;
  }

  return templates.map(function (template) {
    var predicates = template
          .predicates
          .map(function (predicate) { return wrapPredicate(predicate); }),
        body = new Body(compiler, template.body, undefined, undefined, template.body),
        applyPredicate = body.applyNext && body.applyNext.pred;

    if (applyPredicate) {
      body.applyNext.pred = wrapPredicate(applyPredicate);
    }

    return new Template(compiler, predicates, body);
  });
};
