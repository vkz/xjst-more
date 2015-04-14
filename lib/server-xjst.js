var esprima = require('esprima'),
    uglify = require('uglify-js'),
    estraverse = require('estraverse'),
    vm = require('vm'),
    util = require('util'),
    assert = require('assert');


var xjst = require('./');
var esgen = require("escodegen").generate;
var pp = require("zeHelpers").prettyPrint;

// Get required constructors
var Inliner = xjst.Inliner;
var Splitter = xjst.Splitter;
var MapFlattener = xjst.MapFlattener;
var Jailer = xjst.Jailer;
var Template = xjst.Template;
var Predicate = xjst.Predicate;
var Group = xjst.Group;
var Map = xjst.Map;
var utils = xjst.utils;

var getXjstConstructor = require('./xjst');
var GenericCompiler = getXjstConstructor();

function Compiler(options) {
  GenericCompiler.call(this, options);
}
util.inherits(Compiler, GenericCompiler);

Compiler.prototype.preTranslate = function preTranslate(input) {
  // input: Mozilla AST
  var program = this.getTemplates(input);
  program.templates = program
    .templates
    .map(this.transformTemplates.bind(this));
  return program;
};

Compiler.prototype.getTemplates = function getTemplates(ast) {
  var other = [],
      init = [];

  return {
    templates: ast.body.filter(function(stmt) {

      // fail() should be external to filter's callback
      // else it gets re-defined for each stmt
      function fail() {
        other.push(stmt);
        return false;
      };

      if (stmt.type !== 'ExpressionStatement') return fail();

      var expr = stmt.expression;
      if (expr.type !== 'CallExpression') return fail();

      var callee = expr.callee;
      if (callee.type === 'CallExpression') {
        if (callee.callee.type !== 'Identifier' ||
            callee.callee.name !== 'template') {
          return fail();
        }
      } else if (callee.type === 'Identifier' && callee.name === 'oninit') {
        init = init.concat(expr.arguments);
        return false; // oninit() call - return in a separate property
      } else {
        return fail();
      }

      return true;              // template() call
    }).reverse(),               // last template() declaration becomes templates[0]
    init: init,                 // oninit()
    other: other                // everything that's no template() or oninit()
  };
};

Compiler.prototype.transformTemplates = function transformTemplates(template) {
  var expr = template.expression,                                            // template()()              -> template-node without type info
      predicates = expr.callee.arguments,                                    // template(arguments)       -> arguments-node
      // (arg1 && arg2 ...) treated as a single predicate
      // (arg1, arg2 ...) treated as separate predicates and maybe optimized
      body = expr.arguments[0] || { type: 'Identifier', name: 'undefined' }; // template(arguments)(body) -> body

  // custom assert(node, cond, text)
  this.assert(body,
              body.type === 'FunctionExpression' || utils.isLiteral(body), // template()(body): allow only f() or Literal in body
              'Only literal or function is allowed in template\'s body');

  function isConst(val) {
    return val.type === 'Literal';
  }

  // Translate all predicates to `a === c` form
  // and map as { expr, value } pair
  predicates = predicates.map(function(pred) {
    var expr,
        value;

    // template(function() { returnreturn 1; })  => template(1)
    // template(function() { body; })      => template(function() { body; }.call(this)) to ensure that 'this' gets savitized into '__$ctx' later?
    if (pred.type === 'FunctionExpression') {
      if (pred.body.body.length === 1 &&
          pred.body.body[0].type === 'ReturnStatement') {
        pred = pred.body.body[0].argument;
      } else {
        pred = {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: pred,
            property: { type: 'Identifier', name: 'call' }
          },
          arguments: [ { type: 'ThisExpression'} ]
        };
      }
    }

    if (pred.type === 'BinaryExpression' && pred.operator === '===') {
      if (isConst(pred.right)) {
        // expr === const
        expr = pred.left;
        value = pred.right;
      } else {
        // const === expr
        expr = pred.right;
        value = pred.left;
      }
    } else {
      // expr <=> !(expr) === false
      // this actually gets simlified away in 'new Predicate' => expr
      // unclear why do this at all
      expr = {
        type: 'UnaryExpression',
        prefix: true,
        operator: '!',
        argument: pred
      };
      value = { type: 'Literal', value: false };
    }

    return new Predicate(this, expr, value); // see 'entities/predicate.js'
  }, this);

  return new Template(this, predicates, body); // see 'entities/template.js'
};

Compiler.prototype.sanitize = function sanitize(stmt) {
  return this.replaceThis(stmt);
};

// Replace `this` with `__$ctx`
Compiler.prototype.replaceThis = function replaceThis(stmt) {
  var ctx = this.ctx;
  return estraverse.replace(stmt, {
    enter: function(node, parent, notify) {
      if (node.type === 'ThisExpression') {
        return ctx;
      } else if (node.type === 'FunctionDeclaration' ||
                 node.type === 'FunctionExpression') {
        this.skip();
      }
    }
  });
};

function rollOut(program) {
  // Roll-out local() and apply/applyNext() calls
  // in the bodies
  program.templates.forEach(function(template, templateIndex) {
    template.rollOut();
  });
  return program;
}

function replaceFetchInOther(program) {
  // NOTE moved from render();
  program.other = program.other.map(function(stmt) {
    return this.replaceFetch(this.sanitize(stmt));
  }, this);
  return program;
}

function replaceContextIn(program) {
  // TODO copied from bem-xjst Compiler constructor. Can these change at all?
  // There has to be a better place for these - shared between bem-xjst and
  // xjst.
  var bemGlobals = {
    _mode: '$$mode',
    block: '$$block',
    elem: '$$elem',
    elemMods: '$$elemMods',
    mods: '$$mods'
  };

  function translateProp(prop) {
    if (bemGlobals.hasOwnProperty(prop))
      return bemGlobals[prop];
    else
      return false;
  };

  function replaceContext(ast) {
    return estraverse.replace(ast, {
      leave: function (node) {
        if (node.type === 'MemberExpression' &&
            node.computed === false &&
            node.object.type === 'Identifier' &&
            node.object.name === '__$ctx') {
          var prop = translateProp(node.property.name || node.property.value);
          // pp({node: node, prop: prop}, {prompt: "node"});
          if (!prop)
            return;
          return { type: 'Identifier', name: prop };
        }
      }
    });
  }

  program.templates.forEach(function (template) {
    // replace in body
    var body = template.body.body;
    template.body.body = body.map(replaceContext);
    // replace in template.predicates
    template.predicates.forEach(function (predicate) {
      predicate.expr = replaceContext(predicate.expr);
      predicate.value = replaceContext(predicate.value);
    }, this);
  }, this);

  return program;
}

function inline(program) {
  // inline stuff
  var inliner = Inliner.create();
  program.templates.forEach(function (template) {
    var wrappedBody = {
      type: "Program",
      body: template.body.body
    };
    template.body.body = inliner.inline(wrappedBody).body;
  }, this);

  program.init = program.init.map(function (stmt) {
    return inliner.inline(stmt);
  });

  program.other = program.other.map(function (stmt) {
    return inliner.inline(stmt);
  });

  return program;
}

function preserialise(program) {
  // Pre-serialize global variables
  var globals = this.globals;
  var globalInit = this.globalInit;
  var globalKeys = Object.keys(globals);
  if (globalKeys.length !== 0) {
    var $initializeGlobals = [];
    var $declareGlobals = {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: globalKeys.map(function(name) {
        // Initialize globals from the context if asked
        if (globalInit[name]) {
          $initializeGlobals.unshift({
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: { type: 'Identifier', name: name },
              right: {
                type: 'MemberExpression',
                computed: true,
                object: { type: 'Identifier', name: 'ctx' },
                property: { type: 'Literal', value: globalInit[name] }
              }
            }
          });
        }

        // Declare globals
        return {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: name },
          init: { type: 'Literal', value: globals[name] }
        };
      }, this)
    };
    this.$declareGlobals = esgen($declareGlobals);
    this.$initializeGlobals = esgen({
      type: "Program",
      body: $initializeGlobals
    })
  }

  var prePredicate = function prePredicate(p) {
    p.$expr = esgen(p.expr);
    // value can be null
    p.$value = p.value && esgen(p.value);
    return p;
  };

  // Pre-serialize template bodies and predicates
  program.templates.forEach(function (template) {
    var body = template.body;
    var bodyAst = body.body;
    template.body.$body = esgen({type: "Program", body: bodyAst});
    // TODO I'm not pre-serializing template.body.applyNext stuff
    // in case we want to inline during rendering
    if (bodyAst &&
        bodyAst.length === 1 &&
        bodyAst[0].type === 'ReturnStatement') {
      var argument = bodyAst[0].argument;
      argument.$apply = template.body.$returns = esgen(argument);
      argument.$cantBeRef = this.cantBeRef(argument);
      assert.notEqual(template.body.$returns, '');
    };

    if (body.applyNext) {
      prePredicate(body.applyNext.pred);
    };

    template.predicates = template.predicates.map(prePredicate);
  }, this);

  // pre-serialize program.init
  this.$initializers = program
    .init
    .map(function (init) {return esgen(init);})
    .join(",");

  // pre-serialize recordExtensions
  var recordExtensions = {
    type: "Program",
    body: this.getRecordExtensions().body.body
  };
  this.$recordExtensions = esgen(recordExtensions);

  // pre-serialize resetApplyNext
  var resetApplyNext = {
    type: "Program",
    body: this.getResetApplyNext().body.body
  }
  this.$resetApplyNext = esgen(resetApplyNext);

  // pre-serialize other code
  this.$other = program
    .other
    .map(function (other) {return esgen(other);})
    .filter(function (code) {return !/^[\s;]*$/.test(code);})
    .join(";");

  return program;
}

Compiler.prototype.beforeSortGroup = function beforeSortGroup(program) {
  [
    rollOut,
    replaceFetchInOther,
    replaceContextIn,
    inline,
    preserialise
  ].forEach(function (transform) {
    transform.call(this, program);
  }, this);
}

function addRenderMethods(isStringRenderer) {
  var renderer = isStringRenderer ?
        require("./string-renderer")():
        require("./ast-renderer")();

  Compiler.prototype.getInitializers = renderer.getInitializers;
  Compiler.prototype.getApplyBody = renderer.getApplyBody;
  Compiler.prototype.setApplyBody = renderer.setApplyBody;
  Compiler.prototype.renderApply = renderer.renderApply;
  Compiler.prototype.renderApplyC = renderer.renderApplyC;
  Compiler.prototype.renderDeclareRef = renderer.renderDeclareRef;
  Compiler.prototype.renderExportApply = renderer.renderExportApply;
  Compiler.prototype.renderInvokeInitializers = renderer.renderInvokeInitializers;
  Compiler.prototype.renderDeclareGlobals = renderer.renderDeclareGlobals;
  Compiler.prototype.renderInitializeGlobals = renderer.renderInitializeGlobals;
  Compiler.prototype.renderCtxOrThis = renderer.renderCtxOrThis;

}

exports.getCompiler = function (isStringRenderer) {
  addRenderMethods(isStringRenderer);
  return Compiler;
};
