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

// Compiler constructor
function Compiler(options) {
  this.options = options || {};

  this.code = null;
  this.idHash = {};             // hash for 'expr === value' pairs in predicates
  this.revIdHash = {};
  this.scores = {};
  this.idCount = 0;
  this.bodyId = 1;
  this.bodyUid = 0;
  this.mapId = 1;
  this.applyNext = {
    value: 0,
    count: 0,
    prop: null
  };

  this.ctx = { type: 'Identifier', name: '__$ctx' };
  this.ref = { type: 'Identifier', name: '__$ref' };

  this.renderStack = [];
  this.renderHistory = [];
  this.renderCacheMap = {};
  this.sharedBodies = {};
  this.maps = {};

  // Context extensions from local({}) stmts
  this.extensions = {};

  // Global vars from local(null, {})
  this.globals = {};
  if (this.options.globals) {
    Object.keys(this.options.globals).forEach(function(name) {
      return this.globals['$$' + name] = this.options.globals[name];
    }, this);
  }
  this.globalInit = {};
  if (this.options.globalInit) {
    Object.keys(this.options.globalInit).forEach(function(name) {
      return this.globalInit['$$' + name] = this.options.globalInit[name];
    }, this);
  }

  this.program = null;
  this.inputProgram = null;

  // TODO I might want to share the jailer (marshal its state and send to the
  // client) between Client and Server. Otherwise it keeps renaming vars already
  // renamed on the Server so the names grow and there's diff between what
  // bem-xjst generates and what Client-Server communication produce.
  this.jailer = Jailer.create();
  this.inliner = Inliner.create();
  this.splitter = Splitter.create(this);
  this.flattener = MapFlattener.create(this);
};
exports.Compiler = Compiler;

// (0) create Compiler instance with cli passed options
// likely followed by a call to generate method
function create(options) {
  return new Compiler(options);
};
exports.create = create;

// (1) main function of the compiler
// Generate source code from input code
Compiler.prototype.generate = function generate(code) {
  if (this.options['no-opt'] || this.options.optimize === false) {
    // invoke as $> xjst --no-opt
    // ----------------------------------------------
    // generating non-production code
    // see vkz-xjst--no-opt.js for extensive comments
    // of the generated result
    return '/// -------------------------------------\n' +
           '/// ---------- Bootstrap start ----------\n' +
           '/// -------------------------------------\n' +
           'var __$$globalCtx = ' +
               JSON.stringify(this.options.globals || {}) + ';\n' +
           utils.run.toString() + ';\n' +
           'exports.apply = function apply(ctx) {\n' +
           '  try {\n' +
           '    return applyc(ctx || this);\n' +
           '  } catch (e) {\n' +
           '    e.xjstContext = ctx || this;\n' +
           '    throw e;\n' +
           '  }\n' +
           '};' +
           'function applyc(ctx) {\n' +
           '  return run(templates, ctx);\n' +
           '};\n' +
           'try {\n' +
           '  applyc({\n' +
           '    $init: true,\n' +
           '    $exports: exports,\n' +
           '    $context: {\n' +
           '      recordExtensions: function() {}\n' +
           '    }\n' +
           '  });\n' +
           '} catch (e) {\n' +
           '  // Just ignore any errors\n' +
           '}\n' +
           'function templates(template, local, apply, applyNext, oninit, ' +
                              '__$$fetch, __$$set) {\n' +
           '/// -------------------------------------\n' +
           '/// ---------- Bootstrap end ------------\n' +
           '/// -------------------------------------\n' +
           '\n' +
           '/// -------------------------------------\n' +
           '/// ---------- User code start ----------\n' +
           '/// -------------------------------------\n' +
           code +
           '/// -------------------------------------\n' +
           '/// ---------- User code end ------------\n' +
           '/// -------------------------------------\n' +
           '};';
  }

   // invoke as $> xjst
  // ----------------------------------
  // generate production code (default)
  var ast = esprima.parse(code, {
    loc: true
  });
  assert.equal(ast.type, 'Program');

  ast = this.translate(ast, code);

  // the way uglify exports its API is so convoluted that MH's own Tern can't pick it up
  var uast = uglify.AST_Node.from_mozilla_ast(ast);

  return uast.print_to_string({
    beautify: this.options.beautify === false ? false : true
  });
};

// Compile source to js function
Compiler.prototype.compile = function compile(code) {
  var out = this.generate(code),
      exports = {};

  vm.runInNewContext(
    '(function(exports, console) {\n' +
    out +
    '\n})(exports, console)',
    {
      exports: exports,
      console: console
    }
  );

  return exports;
};

Compiler.prototype.getNodeLine = function getNodeLine(node) {
  if (!this.code || !node.loc)
    return '';

  var loc = node.loc.start;
  var lines = this.code.split(/\r\n|\r|\n/g);
  var line = lines[loc.line - 1];
  var arrow = '';
  for (var i = 0; i < loc.column; i++)
    arrow += ' ';
  arrow += '^';

  return ' at ' + loc.line + ':' + loc.column + '\n' + line + '\n' + arrow;
};

Compiler.prototype.assert = function assert(node, cond, text) {
  if (cond)
    return;

  if (!text)
    text = 'Assertion failed';
  throw new Error(text + this.getNodeLine(node));
};

Compiler.prototype.assertEqual = function assertEqual(node, lhs, rhs, text) {
  if (lhs === rhs)
    return;

  if (!text)
    text = 'Expected ' + rhs + ', but got ' + lhs;
  throw new Error(text + this.getNodeLine(node));
};

Compiler.prototype.translateTemplates = function translateTemplates(templates, previousTemplates) {
  // TODO: inputProgram isn't actually used anywhere except to pass
  // init and other. Can I throw it out?
  var program = {
    templates: templates,
    init : this.inputProgram.init,
    other : this.inputProgram.other
  };

  var result = this._translate2(program, false, previousTemplates);

  this.inlineDepth = this.maxInlineDepth;

  // pp(esgen(result.ast), {prompt: "before addMaps"});
  this.addMaps(result.ast);
  // pp(esgen(result.ast), {prompt: "after addMaps"});

  this.addBodies(result.ast);
  // pp(esgen(esprima.parse(result.ast.$apply.join(''))), {prompt: "result.$apply.join('')"});

  // pp(esgen(result.ast), {prompt: "added Bodies"});

  // Three major cases being inlined (only three?):
  // 1: local(..)(function ( ) { body })
  // 2: (__$lb( ) { body })( )
  // 3: var rN = (__$lb( ) { body })( )
  //
  // NOTE match( ) (function ( ) { body }) cases will have been inlined in earlier
  // steps
  // NOTE __$lb() are artefacts of apply(), applyNext(), applyCtx() unrolling
  // NOTE case 2 won't be inlined when __$lb is iif in expression position
  // NOTE saw local(..)(..) used "in the wild" only once in i-bem

  // NOTE moved inlining into _translate2 before sortGroup
  // result.ast = this.inliner.inline(result.ast);

  // pp(esgen(result.ast), {prompt: "inlined"});

  // splits are moved into __$g() functions
  result.ast = this.splitter.split(result.ast);
  // pp(esgen(result.ast), {prompt: "split"});

  return result;
}

// Run compiler in phases to translate AST to AST
Compiler.prototype.translate = function translate(ast, code, previous, oldCode) {
  var ir = previous && previous.ir;

  // NOTE: Client receives Mozilla AST of fresh templates because the
  // assumption is that execution happens on the client and `this' is
  // bound to the compiler that's been used to compile previous batch
  // of templates. Therefore, any templates received after that will
  // be compiled using this `old' compiler so predicate accounting for
  // new templates will take into account all earlier templates. This
  // solves the problem of keeping propers predicate counts at the
  // expense of effectively doing all computations on the client. We
  // can fix this.
  //
  // TODO: Break the above assumption and move all computations prior
  // to sortGroup to the server. Do this by having two seperate
  // compilers: one on the client (ir) and one on the server
  // (new). Then merge compiler.counts from newCompiler into
  // irCompiler. Now I can performe all computations prior to
  // sortGroup on the server, pass the resulting [Template, ...] to
  // the client, which should replace compiler references with
  // ir.compiler in all new Templates and other entities and then
  // concat old and new Templates.
  //
  // Algo to merge scores from two compilers (ir and new)
  // -------------------------------------------------------------
  // ir.scores - scores for old templates with compiler and stats
  // new.scores - scores for more templates with their own compiler and stats
  //
  // newKeys = Object.keys(new.scores);
  // newKeys.forEach(function (nkey) {
  //
  // when nkey NOT in ir.scores
  // then ir.scores[nkey] = new.scores[nkey]
  //
  // when nkey IS in ir.scores
  // then ir.scores[nkey].count += new.scores[nkey].count
  // then ir.scores[nkey].values set+= new.scores[nkey].values
  // then ir.scores[nkey].variance += count(new.scores[nkey].values set- ir.scores[nkey].values)
  //
  // };
   // -------------------------------------------------------------
  //
  //
  // TODO: merging scores is far from enough. Apparently there's
  // plenty of state tha compiler accumulates even before the rollOut.
  // Ediff (pre-) VS (post-) transformTemplates compiler:
  //
  // code: '?'
  // idHash: {?}
  // revIdHash: {?}
  // scores: {?}
  // idCount: ?
  // bodyUid: ?
  //
  // TODO: do I need to sync Jailers in both compilers if I perform
  // body rollOuts on the server? New templates have their own scopes
  // so my guess this wouldn't be necessary?
  //
  // TODO: Suppose the client already compiled some templates. When
  // loading more templates for compilation in addition to merging
  // metadata from the (new) compiler into (ir) compiler would also
  // need to drop some metadata, like say artefacts of `render'
  // perforomed on old tempaltes?
  //
  // TODO: Entities' ids (like bodyUid in Body) in the new templates
  // need to be bumped by the max numbers in old
  // templates. Alternatively, server should request those numbers and
  // initialize compiler appropriately.

  // TODO: potential problem with Template.clone(). Looks like it
  // increments compiler.bodyUid for each instanciation of
  // Tempalate. Actually incerement happens inside
  // GenericBody.call(this, compiler).


  if (code)
    this.code = code;

  // 1. Get all template()() invokations (and other chunks of code)
  var program = this.getTemplates(ast);
  if (ir) {
    program.init = ir[0].compiler.inputProgram.init.concat(program.init);
    program.other = ir[0].compiler.inputProgram.other.concat(program.other);
  }

  // NOTE(vlad): { templates: .., init: [oninit], other: [other] }


  var DEBUG = false;
  DEBUG && console.log("Pre-transformTemplates compiler:\n", this);

  // 2. Transform templates in a compiler-readable form
  // template -> new Template(this, arrayOf new Predicate(this, lhs-expr, rhs-value), body)
  // each predicate being a new Predicate(this, lhs-expr, rhs-value)
  // with predicates normalized (expr === const)
  // with 'this' sanitized into '__$ctx'
  // with global predicate scores updated
  // body gets transformed from inside Template constuctor, see `entities/template.js'
  program.templates = program.templates.map(this.transformTemplates.bind(this));

  DEBUG = false;
  DEBUG && console.log("Post-transformTemplates compiler:\n", this);
  // transformTemplates adds shit lot of metadata to the compiler instance.
  // TODO: figure out how to merge this metadata into another (ir) compiler instance

  // by the time we get here templates (predicates and bodies) have
  // been transformed into compiler-friendly form i.e. wrapped in
  // relevant constructors (Template, Predicate, Body) so we can
  // proceed with rolling out apply/applyNext/local, optimizations and
  // code generation

  this.code = (oldCode || '') + this.code;

  var result = this._translate2(program, false, ir);

  // Prevent apply inlinings
  this.inlineDepth = this.maxInlineDepth; // ??? maxInlineDepth doesn't seem to be defined anywhere

  // 3.  Add maps to result
  // NOTE: this could possibly generate more shared bodies,
  // so order is important here.
  // NOTE maps are created in Group constructor during sortGroup
  this.addMaps(result.ast);

  // 4. Add shared bodies to result
  this.addBodies(result.ast);

  // !!! estraverse is used !!!
  // would that get in the way were we to use an ast with pre-serialized strings ?
  // 5. Inline function expressions
  // NOTE moved inlining into _translate2 before sortGroup
 // result.ast = this.inliner.inline(result.ast);

  // !!! estraverse is used !!!
  // 6. Split big functions into small ones
  result.ast = this.splitter.split(result.ast);

  return result;
};

Compiler.prototype._translate2 = function translate2(program, bodyOnly, ir) {
  // ???
  var cacheKey = this._renderCacheKey(program.templates); // so 4 templates might give '0:2:4:6'
  var res = this.probeRenderCache(cacheKey); // 'Body' instance (???) if present in cache
  if (res && bodyOnly) return xjst.utils.cloneAst(res);

  var old = this.program;
  // wtf???
  this.program = program;
  this.inputProgram = this.inputProgram || program;
  this.inlineDepth++;

  // Save render stack from enemies
  //
  // renderStack and renderHistory get altered from rollOutLocal,
  // which pushes local's hash-arg props onto renderStack. Not obvious
  // why we would want to save it here: translate2 doesn't appear
  // recursive
  var oldRender = { stack: this.renderStack, history: this.renderHistory };
  this.renderStack = [];
  this.renderHistory = [];

  var DEBUG = false
  DEBUG && console.log("Pre-rollOut compiler:\n", this);

  // Roll-out local() and apply/applyNext() calls
  // in the bodies
  program.templates.forEach(function(template, templateIndex) {
    // body is an array of parsed statements:
    // [ { type: 'VariableDeclaration',
    //     declarations: [ [Object] ],
    //     kind: 'var',
    //     loc: { start: [Object], end: [Object] } },
    //   { type: 'ReturnStatement',
    //     argument: { type: 'ArrayExpression', elements: [Object], loc: [Object] },
    //     loc: { start: [Object], end: [Object] } } ]

    // NOTE:
    // --------------------------------------------------------------------------
    // template.predicates === [{expr: MozNode, value: MozNode || null}, ...]
    // template.body.body === [statement, ... ] === [MozNode, ...]
    // where MozNodes are valid Mozilla AST nodes that can be passed to escodegen
    // template.constructor.name               === "Template"
    // template.predicates[i].constructor.name === "Predicate"
    // template.body.constructor.name          === "Body"
    // --------------------------------------------------------------------------
    var DEBUG = false;

    if (DEBUG) {
      // log Predicates in each Template
      console.log("----------------- " + template.constructor.name + templateIndex + " -----------------");
      template.predicates.forEach(function (p, predicateIndex) {
        pp(esgen(p.expr) + (p.value ? (" === " + esgen(p.value)) : ""),
           {prompt: p.constructor.name + templateIndex + "." + predicateIndex});
      });

      // log Body in each Template before rollOut
      pp(template.clone().body.body.map(function (stmt) {return esgen(stmt);}).join("\n"),
         {prompt: template.body.constructor.name + " before rollOut"});
    }

    // NOTE to avoid repeat rollOuts?
    if (!ir)
      template.rollOut();

    DEBUG = false;
    if (DEBUG){
      // log Body in each Template after rollOut
      pp(template.clone().body.body.map(function (stmt) {return esgen(stmt);}).join("\n"),
         {prompt: template.body.constructor.name + " after rollOut"});
    }

    /*

    // Pre-inline, replace __$ctx.props with relevant globals,
    // pre-serialize the body
    var statements = template.body.body.map(function (stmt) {return stmt;});

    var __body = template.body.__body = {
      type: 'BlockStatement',
      body: statements
    };

    // Pre-replaceContext doesn't work cause bodies haven't been
    // wrapped in particular auto-generated functions replaceContext
    // expects (e.g. __$lb)
    // __body = utils.replaceContext(__body);

    var __bodyInlined = template.body.__bodyInlined = inliner.inline(__body);

    __body.asStrings = statements.map(esgen);
    __body.asString = __body.asStrings.join('\n');

    __bodyInlined.asStrings = __bodyInlined.body.map(esgen);
    __bodyInlined.asString = __bodyInlined.asStrings.join('\n');

     */

  });

  //!!! Preserve templates in case more templates arrive. These aren't
  //!!! sortGroup'ed but have bodies rollOut'd
  if (ir) {
    // TODO(vlad): make 100% certain this is correct concatenation order
    // program.templates = ir.concat(program.templates);
    program.templates = program.templates.concat(ir);
  }

  // NOTE moved from render();
  program.other = program.other.map(function(stmt) {
    return this.replaceFetch(this.sanitize(stmt));
  }, this);

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

  // inline stuff
  var inliner = this.inliner;
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

  // TODO merge $resetApplyNext, $recordExtensions, $initializers, $other with
  // client versions

  // TODO: cloning on the client could be expensive. I can clone the
  // new templates on the server and send both copies to the
  // client. Then client would just need to clone the IR.
  ir = program.templates.map(function (template) {return template.clone();});

  // Group templates
  // NOTE sortGroup doesn't use ast only predicate ids, so no need to do
  // anything special to make it work with pre-serialised values.
  program.templates = this.sortGroup(program.templates);

  // Flatten maps (disable for now)
  // program.templates = this.flattener.flatten(program.templates);

  // Restore `this.program`
  this.program = old;

  // Render program back to AST form
  var res = this.render(program, bodyOnly);

  // Restore render stack
  this.renderStack = oldRender.stack;
  this.renderHistory = oldRender.history;

  // Restore inline depth
  this.inlineDepth--;

  this.renderCache(cacheKey, res);
  return {ast: res, ir: ir};                   //should have pre-sortGroup templates preserved in a field
};

// *server*
// Filter out templates from program's body
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

// Get unique id for a javascript value
Compiler.prototype.getId = function getId(value) {
  var key = utils.identify(value); // a string representation of the value's ast node

  if (this.idHash.hasOwnProperty(key)) {
    this.idHash[key].score++;
    return this.idHash[key].id;
  }

  var id = this.idCount++;
  this.idHash[key] = { id: id, key: key, value: value, score: 0 };
  this.revIdHash[id] = this.idHash[key];

  return id;
};

Compiler.prototype.accountScore = function accountScore(key, value) {
  // for every predicate of the form 'expr === value'
  // -- up the score of its lhs expr (key)
  // -- up the variance if we haven't encountered this rhs (value) for this lhs (key)
  if (!this.scores.hasOwnProperty(key)) {
    this.scores[key] = { count: 0, variance: 0, values: {} }; // 'variance' is how many different rhs values for the same lhs expr
  }

  var item = this.scores[key];
  item.count++;
  if (!item.values.hasOwnProperty(value)) {
    item.values[value] = 1;
    item.variance++;
  } else {
    item.values[value]++;
  }
};

// Get score for unique javascript value
Compiler.prototype.getScore = function getScore(id) {
  var bump = 0;
  if (this.options.scoreFilter) { // ???
    var value = this.revIdHash[id] || '';
    bump = this.options.scoreFilter(value.value, value.score, value.key);
  }
  if (!this.scores.hasOwnProperty(id)) return bump + 0;

  return bump + this.scores[id].count;
};

// Return unique applyNext flag
Compiler.prototype.getApplyNext = function getApplyNext() {
  //                            Overflow  ||  initial this.applyNext.value
  if (this.applyNext.value === 1073741824 || this.applyNext.value === 0) {
    this.applyNext.value = 1;
    this.applyNext.prop = {
      type: 'Identifier',
      name: '__$a' + this.applyNext.count++
    };
  }

  var value = {
    type: 'Literal',
    value: this.applyNext.value
  };
  this.applyNext.value <<= 1;   // ??? why multiply it by 2

  return { prop: this.applyNext.prop, value: value }; // => ast for a hash-property suitable for local(hash)() that sets the flag in ctx
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

// TODO invoked when rendering predicates. Can this be done before sortGroup and
// render to avoid esprima on the client?
Compiler.prototype.replaceFetch = function replaceFetch(stmt) {
  var self = this;
  return estraverse.replace(stmt, {
    enter: function(node, parent, notify) {
      if (node.type === 'CallExpression' &&
          node.callee.type === 'Identifier') {
        var name = node.callee.name;
        if (name !== '__$$fetch' && name !== '__$$set')
          return;

        if (name === '__$$fetch')
          self.assertEqual(node, node.arguments.length, 1, 'Invalid arg cnt');
        else
          self.assertEqual(node, node.arguments.length, 2, 'Invalid arg cnt');
        self.assertEqual(node.arguments[0], node.arguments[0].type, 'Literal');
        self.assertEqual(node.arguments[0],
                         typeof node.arguments[0].value,
                         'string');

        var id = self.fetchGlobal(node.arguments[0].value);

        if (name === '__$$fetch') {
          return id;
        } else {
          return {
            type: 'AssignmentExpression',
            operator: '=',
            left: id,
            right: node.arguments[1]
          };
        }
      }
    }
  });
};

Compiler.prototype.jailVars = function jailVars(stmt) {
  return this.jailer.jail(stmt);
};

Compiler.prototype.addChange = function addChange(predicate) {
  var predicates = Array.isArray(predicate) ? predicate : [ predicate ];

  // save the number of predicates in a template onto renderHistory
  // push all predicates onto renderStack
  this.renderHistory.push(predicates.length);
  for (var i = 0; i < predicates.length; i++) {
    this.renderStack.push(predicates[i]);
  }
};

Compiler.prototype.revertChange = function revertChange() {
  if (this.renderHistory.length === 0) throw new Error('Render OOB');
  var n = this.renderHistory.pop();
  for (var i = 0; i < n; i++) {
    this.renderStack.pop();
  }
};

Compiler.prototype.registerBody = function registerBody(body) {
  if (body.shareable && this.sharedBodies.hasOwnProperty(body.id)) {
    this.shareBody(body);
    return true;
  }
  if (body.shareable && body.primitive) {
    this.shareBody(body);
    return true;
  }

  return false;
};

Compiler.prototype.shareBody = function shareBody(body) {
  assert(body.shareable);
  body.id = body.id === null ? this.bodyId++ : body.id;
  this.sharedBodies[body.id] = body;
};

Compiler.prototype.unshareBody = function unshareBody(body) {
  assert(body.shareable);
  delete this.sharedBodies[body.id];
};

Compiler.prototype._renderCacheKey = function _renderCacheKey(templates) {
  return templates.map(function(t) {
    return t.uid.toString(36);  // ??? why radix 36
  }).join(':');
};

Compiler.prototype.probeRenderCache = function probeRenderCache(key) {
  return this.renderCacheMap[key];
};

Compiler.prototype.renderCache = function renderCache(key, body) {
  this.renderCacheMap[key] = body;
};

Compiler.prototype.addBodies = function addBodies(result) {
  var changed = true,
      visited = {};

  while (changed) {
    changed = false;
    Object.keys(this.sharedBodies).forEach(function(id) {
      if (visited.hasOwnProperty(id)) return;
      visited[id] = true;
      changed = true;

      var body = this.sharedBodies[id];
      assert.equal(body.id, id);

      var rendered = body.render(true);
      var out = rendered.apply;
      var $out = rendered.$apply;

      out = Array.isArray(out) ? out.slice() : [out];

      // TODO this needs to be moved out to pre-serialization stage, I guess. No
      // way I can verify the chunck returns at this point.
      // Optimization: If
      // last statement isn't return - return
      if (out.length === 0 || out[out.length - 1].type !== 'ReturnStatement') {
        out = out.concat({
          type: 'ReturnStatement',
          argument: this.ref
        });
      }

      var $apply = body.assembleFromObj({
        head: 'function ' + this.getBodyName(body).name + '(__$ctx, __$ref) {',
        body: $out,
        tail: '}'
      });
      result.$apply.push($apply);

      result.body.push({
        type: 'FunctionDeclaration',
        id: this.getBodyName(body),
        params: [ this.ctx, this.ref ],
        defaults: [],
        rest: null,
        generator: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          body: out
        }
      });
    }, this);
  }
};

Compiler.prototype.registerMap = function registerMap(map) {
  if (map.id) return;
  map.id = this.mapId++;
  this.maps[map.id] = map;
};

Compiler.prototype.addMaps = function addMaps(result) {
  Object.keys(this.maps).forEach(function(id) {
    var map = this.maps[id];
    var mapAst = map.getMap();
    result.body.push(mapAst);
    result.$apply.push(mapAst.$map);
  }, this);
};

Compiler.prototype.getBodyName = function getBodyName(body) {
  assert(body.shared);
  assert(this.sharedBodies.hasOwnProperty(body.id));
  return { type: 'Identifier', name: '__$b' + body.id };
};

Compiler.prototype.getMapName = function getMapName(map) {
  assert(this.maps.hasOwnProperty(map.id));
  return { type: 'Identifier', name: '__$m' + map.id };
};

Compiler.prototype.renderArray = function renderArray(bodies) {
  // bodies is 'program.templates' post-sortGroup, e.g. [{typeof Group}, ...]
  // Group inherits from GenericBody and therefore has method render,
  // which delegates to _render.  Group.prototype._render is where all
  // the 'if .. else if ..' magic of 'applyc' gets generated.
  var out = { apply: [], other: [], init: [], $apply: []};

  bodies.forEach(function(body) {
    // TODO(vkz): Pass `out` as an argument and push stuff directly into it
    var ast = body.render();
    // TODO poorman's type-checking
    assert(ast.$apply);

    if (ast.apply) out.apply = out.apply.concat(ast.apply);
    if (ast.$apply) out.$apply = out.$apply.concat(ast.$apply);
    if (ast.other) out.other = ast.other.concat(out.other);
    if (ast.init) out.init = out.init.concat(ast.init);
  }, this);

  var DEBUG = false;
  if (DEBUG) {
    var res = 'function bla() {\n' + out.$apply + '\n}';
    // pp(esgen(esprima.parse(res)), {prompt: "out.$apply"});
    pp(out.apply.map(esgen).join('\n'), {prompt: "out.$apply"});
  }

  return out;
};

Compiler.prototype.cantBeRef =   function cantBeRef(ast) {
    if (ast.type === 'Literal' ||
        ast.type === 'ObjectExpression' ||
        ast.type === 'ArrayExpression') {
      return true;
    }

    if (ast.type === 'ExpressionStatement')
      return cantBeRef(ast.expression);

    if (ast.type === 'BinaryExpression')
      return cantBeRef(ast.left) && cantBeRef(ast.right);

    if (ast.type === 'CallExpression')
      return false;

    if (ast.type === 'Identifier' && ast.name !== 'undefined')
      return false;

    return true;
  }

Compiler.prototype.checkRef = function checkRef(expr) {

  // if (this.cantBeRef(expr)) {
  //   pp(esgen(expr), {prompt: "checkRef expr" + (expr.$returns && '$returns' || '')});
  // }

  var self = this;
  var res = { type: 'Identifier', name: '__$r' };
  var $apply = 'return ' + (expr && expr.$apply || '') + ';\n';

  // TODO can I move this check to pre-serialization stage and store it as a
  // flag on Body objects? Then I should be able to make this method work on
  // strings rather than ast.
  function cantBeRef(value) {
    if (value.type === 'Literal' ||
        value.type === 'ObjectExpression' ||
        value.type === 'ArrayExpression') {
      return true;
    }

    if (value.type === 'ExpressionStatement')
      return cantBeRef(value.expression);

    if (value.type === 'BinaryExpression')
      return cantBeRef(value.left) && cantBeRef(value.right);

    if (value.type === 'CallExpression')
      return false;

    if (value.type === 'Identifier' && value.name !== 'undefined')
      return false;

    return true;
  }

  // Fastest case, just literal
  // if (!expr || cantBeRef(expr))
  if (!expr || expr.$cantBeRef)
    return {
      apply: [{ type: 'ReturnStatement', argument: expr }],
      $apply: $apply
    };

  // Simple case
  // if (expr !== __$ref) return expr;
  $apply = '' +
    'if (' + expr.$apply + ' !== __$ref) return ' + expr.$apply + ';\n'
  if (expr.type === 'Identifier') {
    return {
      apply: [{
        type: 'IfStatement',
        test: {
          type: 'BinaryExpression',
          operator: '!==',
          left: expr,
          right: this.ref
        },
        consequent: {
          type: 'ReturnStatement',
          argument: expr
        },
        alternate: null
      }],
      $apply: $apply
    };
  }

  $apply = '' +
    'var __$r = ' + expr.$apply + ';\n' +
    'if (__$r !== __$ref) return __$r;\n'
  return {
    apply: [{
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [{
        type: 'VariableDeclarator',
        id: res,
        init: expr
      }]
    }, {
      type: 'IfStatement',
      test: {
        type: 'BinaryExpression',
        operator: '!==',
        left: res,
        right: this.ref
      },
      consequent: {
        type: 'ReturnStatement',
        argument: res
      },
      alternate: null
    }],
    $apply: $apply
  };
};

// Transform AST templates into readable form
// template -> new Template(this, arrayOf new Predicate(this, lhs-expr, rhs-value), body)
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

// Sort and group templates by first predicate
// (recursively) I think the array is flattened too ???
Compiler.prototype.sortGroup = function sortGroup(templates) {
  var self = this,
      out = templates.slice();  //??? why do the slicing if out never used as an argument

  // Sort predicates in templates by popularity
  // lhs of predicate only
  templates.forEach(function(template) {
    template.predicates.sort(function(a, b) {
      return b.getScore() - a.getScore();
    });
  });

  var groups = [];

  // Group templates by first predicate
  // not exactly an honest-to-god grouping cause
  // template( x === ...)
  // template( x === ...)
  // template( y === ...)
  // template( x === ...)
  // will create two separate groups for ( x === ...)
  groups.push(templates.reduce(function(acc, template) {
    if (acc.length === 0) return [ template ];

    if (template.predicates.length === 0 ||
        acc[0].predicates.length === 0 ||
        acc[0].predicates[0].id !== template.predicates[0].id) {
      groups.push(acc);
      return [ template ];
    }

    acc.push(template);
    return acc;
  }, []));

  var DEBUG = false;
  if(DEBUG) {
    // groups === [[template, ...], ...]  where every template in the
    // same subarray (group) has the same LHS in its first predicate
    // see predicates[0].id !== template.predicates[0].id check above
    // e.g.:
    // groups === [ [ 'Template',
    //     'Template',
    //     'Template',
    //     'Template',
    //     'Template',
    //     'Template',
    //     'Template' ],
    //   [ 'Template' ] ]
    // has two distinct groups  or two distinct LHSs in the first predicate
    pp(groups.map(function (g) {
      return g.map(function (template) { return  template.constructor.name;});
    }), {prompt: "templates grouped by 1st predicate"});
  };

  // Create `Group` instance for each group and .sortGroup() them again
  out = groups.reduce(function(acc, group) {
    // inside this function we operate only on Templates with the same
    // LHS in their first Predicate aka the same group of Templates

    // don't wrap groups with just one Template in Group constructor,
    // push it into acc as is. That's why `out' sometimes have
    // Group-instances and Template-instances meshed together:
    // out === [ 'Group', 'Template' ]
    if (group.length <= 1) return acc.concat(group);

    // Remove first predicate
    var pairs = group.map(function(member) { // member === template
      var predicate = member.predicates.shift();
      return { predicate: predicate, body: member }; // body === template without the 1st pred
    });
    // for each `group' of more than 1 Template create `pairs'
    // pairs === [
    //   { predicate: first_predicate,
    //     template: template_without_first_predicate },
    //     ...
    // ];

    var subgroups = {};
    pairs.forEach(function(pair) {
      var id = pair.predicate.valueId;
      if (!subgroups[id]) {
        subgroups[id] = [ pair ];
      } else {
        subgroups[id].push(pair);
      }
    });

    if(DEBUG) {
      var logsubgroups = {};
      Object.keys(subgroups).forEach(function (k) {
        logsubgroups[k] = subgroups[k].map(function (pair) {
          return {predicate: pair.predicate.constructor.name,
             body: pair.body.constructor.name};});
      });
      pp(logsubgroups, {prompt: "Subgroups by valueId (RHS)"});
    }
    // Pairs all have the same lhs of the predicate,
    // find pairs with same constant (rhs), e.g.:
    // subgroups = {
    //   '10': [ { predicate: 'Predicate', body: 'Template' },
    //           { predicate: 'Predicate', body: 'Template' } ],
    //   '30': [ { predicate: 'Predicate', body: 'Template' } ]
    // };
    // where each key is Predicate.valueId (predicate RHS) and every
    // Predicate has the same LHS, i.e. predicates with the same LHS
    // are grouped by their RHS

    // sortGroup each subgroup again
    pairs = Object.keys(subgroups).reduce(function(acc, key) {
      var subgroup = subgroups[key];
      if (subgroup.length === 0) return acc; // ??? why would it ever be 0

      var predicate = subgroup[0].predicate;
      acc.push({
        predicate: predicate,
        // sortGroup([Template, ...]) with the 1st Predicate (exactly
        // the same in each Template) dropped from each Template
        bodies: self.sortGroup(subgroup.map(function(member) {
          return member.body;   // => [member.body, ...] === [Template, ...]
        }))
      });

      return acc;
    }, []);

    if (DEBUG) {
      var logpairs = pairs.map(function (p) {
        return {predicate: [p.predicate.expr, p.predicate.value].map(esgen).join("==="),
           bodies: p.bodies.map(function (b) {return b.constructor.name})};
      });
      pp(logpairs, {prompt: "Pairs in sortGroup passed to new Group"});
    }
    // each pairs[i].predicate (Predicate) has the same LHS and unique RHS
    // all pairs[i].bodies are the result of recursive sortGrouping of Templates
    // after the lead predicate has been dropped
    // Pairs =
    //   [ { predicate: '__$ctx._mode===\'tag\'',
    //       bodies: [ 'Group', 'Template' ] },
    //     { predicate: '__$ctx._mode===\'attrs\'',
    //       bodies: [ 'Group', 'Template' ] },
    //     { predicate: '__$ctx._mode===\'js\'',
    //       bodies: [ 'Template' ] },
    //     { predicate: '__$ctx._mode===\'\'',
    //       bodies: [ 'Template', 'Template', 'Template', 'Template' ] } ]

    return acc.concat(new Group(self, pairs));
  }, []);

  return out;
};

Compiler.prototype.fetchGlobal = function fetchGlobal(name) {
  var parts = name.split('.');
  var parent = '$$' + parts[0];

  if (!this.globals.hasOwnProperty(parent) && parent !== '__proto__')
    this.globals[parent] = null;

  var ret = { type: 'Identifier', name: parent };
  for (var i = 1; i < parts.length; i++) {
    ret = {
      type: 'MemberExpression',
      computed: true,
      object: ret,
      property: { type: 'Literal', value: parts[i] }
    };
  }

  return ret;
};

Compiler.prototype.registerExtension = function registerExtension(name) {
  if (name !== '__proto__')
    this.extensions[name] = true;
};

Compiler.prototype.getRecordExtensions = function getRecordExtensions() {
  var ctx = { type: 'Identifier', name: 'ctx' };
  var body = [];

  Object.keys(this.extensions).forEach(function(name) {
    body.push({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: true,
          object: ctx,
          property: { type: 'Literal', value: name }
        },

        // Old apply flags should have boolean value
        // New flags - number
        // Other - undefined
        right: /^__\$anflg/.test(name) ? { type: 'Literal', value: false } :
               /^__\$a\d+$/.test(name) ?
                  { type: 'Literal', value: 0 } :
                  { type: 'Identifier', name: 'undefined' }
      }
    });
  }, this);

  return {
    type: 'FunctionExpression',
    id: null,
    params: [ ctx ],
    defaults: [],
    rest: null,
    generator: false,
    expression: false,
    body: {
      type: 'BlockStatement',
      body: body
    }
  };
};

Compiler.prototype.getResetApplyNext = function getResetApplyNext() {
  var ctx = { type: 'Identifier', name: 'ctx' };
  var body = [];

  for (var i = 0; i < this.applyNext.count; i++) {
    body.push({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: true,
          object: ctx,
          property: { type: 'Literal', value: '__$a' + i }
        },
        right: { type: 'Literal', value: 0 }
      }
    });
  }

  return {
    type: 'FunctionExpression',
    id: null,
    params: [ ctx ],
    defaults: [],
    rest: null,
    generator: false,
    expression: false,
    body: {
      type: 'BlockStatement',
      body: body
    }
  };
};

Compiler.prototype.render = function render(program, bodyOnly) {
  var stmts = [],
      $stmts = [],
      initializers = program.init.slice(),
      // applyc body
      applyBody = program.other,
      $applyBody = [this.$other],
      $ctxOrThis = 'ctx = ctx || this;',
      applyContext = {
        type: 'LogicalExpression',
        operator: '||',
        left: { type: 'Identifier', name: 'ctx' },
        right: { type: 'ThisExpression' }
      },
      $declareGlobals = this.$declareGlobals,
      $initializeGlobals = this.$initializeGlobals,
      $try = '' +
        'try {\n' +
        '  return applyc(ctx, __$ref);\n' +
        '} catch (e) {\n' +
        '  e.xjstContext = ctx;\n' +
        '  throw e;\n' +
        '}\n',
      $apply = [
        'function apply(ctx) {',
        $ctxOrThis,
        $initializeGlobals,
        $try,
        '}'
      ],
      apply = {
        type: 'FunctionDeclaration',
        id: { type: 'Identifier', name: 'apply' },
        params: [{ type: 'Identifier', name: 'ctx' }],
        defaults: [],
        rest: null,
        generator: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          // TODO replace with $ctxOrThis + $initializeGlobals + $try
          body: [{
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [{
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: { type: 'Identifier', name: 'applyc' },
                  arguments: [{ type: 'Identifier', name: 'ctx' }, this.ref]
                }
              }]
            },
            guardedHandlers: [],
            handlers: [{
              type: 'CatchClause',
              param: { type: 'Identifier', name: 'e' },
              body: {
                type: 'BlockStatement',
                body: [{
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                      type: 'MemberExpression',
                      computed: false,
                      object: { type: 'Identifier', name: 'e' },
                      property: { type: 'Identifier', name: 'xjstContext' }
                    },
                    right: { type: 'Identifier', name: 'ctx' }
                  }
                }, {
                  type: 'ThrowStatement',
                  argument: { type: 'Identifier', name: 'e' }
                }]
              }
            }],
            finalizer: null
          }]
        }
      },
      // function applyc(__$ctx, __$ref) {
      //     ...
      // }
      $applyc = ['function applyc(__$ctx, __$ref) {', $applyBody, '}'],
      applyc = {
        type: 'FunctionDeclaration',
        id: { type: 'Identifier', name: 'applyc' },
        params: [ this.ctx, this.ref ],
        defaults: [],
        rest: null,
        generator: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          body: null
        }
      };

  var $declareRef = 'var __$ref = {};';
  $stmts.push($declareRef);
  stmts.push({
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: this.ref,
      init: { type: 'ObjectExpression', properties: [] }
    }]
  });

  stmts.push(apply);
  $stmts.push($apply);

  var $exportApply = 'exports.apply = apply;';
  $stmts.push($exportApply);
  // exports.apply = apply
  stmts.push({
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        computed: false,
        object: { type: 'Identifier', name: 'exports' },
        property: { type: 'Identifier', name: 'apply' }
      },
      right: { type: 'Identifier', name: 'apply' }
    }
  });

  stmts.push(applyc);
  $stmts.push($applyc);

  // NOTE padding and indentation is irrelevant since this gets generated and
  // run on the client. Can always parse and beautify when debugging.
  var $callInitializers = '' +
        '[ ' + this.$initializers + ' ].forEach(function(fn) {\n' +
        '    fn(exports, this);\n' +
        '}, {\n' +
        '    recordExtensions: function(ctx) {\n' +
        this.$recordExtensions +
        '    },\n' +
        '    resetApplyNext: function(ctx) {\n' +
        this.$resetApplyNext +
        '    }\n' +
        '});\n';
  $stmts.push($callInitializers);

  // TODO replace with $callInitializers
  // Call applyc once to allow users override exports
  stmts.push({
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        property: { type: 'Identifier', name: 'forEach'},
        object: {
          type: 'ArrayExpression',
          elements: initializers
        }
      },
      arguments: [{
        type: 'FunctionExpression',
        id: null,
        params: [ { type: 'Identifier', name: 'fn' } ],
        defaults: [],
        rest: null,
        generator: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: { type: 'Identifier', name: 'fn' },
              arguments: [
                { type: 'Identifier', name: 'exports' },
                { type: 'ThisExpression' }
              ]
            }
          }]
        }
      }, {
        type: 'ObjectExpression',
        properties: [{
          type: 'Property',
          key: { type: 'Literal', value: 'recordExtensions' },
          value: this.getRecordExtensions(),
          kind: 'init'
        }, {
          // TODO this doesn't generate proper reset bodies, cause I'm missing
          // correct this.applyNext.count info. Fix this in compiler merge?
          type: 'Property',
          key: { type: 'Literal', value: 'resetApplyNext' },
          value: this.getResetApplyNext(),
          kind: 'init'
        }]
      }]
    }
  });

  // Render each template
  var out = this.renderArray(program.templates);

  // global variables
  var globals = this.globals;
  var globalInit = this.globalInit;
  var globalKeys = Object.keys(globals);
  if (globalKeys.length !== 0) {
    stmts.unshift({
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: globalKeys.map(function(name) {
        // Initialize globals from the context if asked
        if (globalInit[name]) {
          apply.body.body.unshift({
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
    });
  }

  $stmts.unshift($declareGlobals);

  // ctx = ctx || this
  apply.body.body.unshift({
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: { type: 'Identifier', name: 'ctx' },
      right: applyContext
    }
  });

  /// Apply to the bottom
  if (out.apply) applyBody = applyBody.concat(out.apply);
  if (out.$apply) $applyBody = $applyBody.concat(out.$apply);

  // Other to the top
  if (out.other) applyBody = out.other.concat(applyBody);
  if (out.$other) $applyBody.unshift(out.$other);

  // Initializers to the initializers array
  // TODO can we ever find new init in the middle of templates like that?
  if (out.init) {
    if (Array.isArray(out.init)) {
      initializers.push.apply(initializers, out.init);
    } else {
      initializers.push(out.init);
    }
  }

  if (bodyOnly)
    return applyBody;

  // Set function's body
  applyc.body.body = applyBody;
  $applyc[1] = $applyBody;

  function flatten(stmts) {
    return stmts.reduce(function (res, stmt) {
      return res.concat(Array.isArray(stmt)?
                        flatten(stmt):
                        [stmt]);
    }, []);
  }

  var DEBUG = false;
  if (DEBUG) {
  pp(esgen(esprima.parse(flatten($stmts).join('\n'))),
     {prompt: "flatten($stmts).join('\n')"});
  }

  return {
    type: 'Program',
    body: stmts,
    $apply: flatten($stmts)
  };
};

Compiler.prototype.merge = function merge(compiler) {
  var mergeIdMap = {},
      extensions = compiler.extensions,
      code = compiler.code,
      idHash = compiler.idHash,
      oldIdHash = this.idHash,
      revIdHash = compiler.revIdHash,
      oldRevIdHash = this.revIdHash,
      scores = compiler.scores,
      idCount = compiler.idCount,
      bodyUid = compiler.bodyUid,
      inputProgram = compiler.inputProgram,
      init = inputProgram.init,
      other = inputProgram.other;

  this.code += code || '';

  // TODO: inputProgram seems an artefact of older xjst. Can I ditch it and get
  // init & other from this.program?

  // merge extensions, init & other
  if (this.isFreshCompiler) {
    this.extensions = extensions;
    this.inputProgram = inputProgram;
  } else {
    Object.keys(extensions).forEach(function (key) {
      this.extensions[key] = extensions[key];
    }, this);
    this.inputProgram.init = this.inputProgram.init.concat(init);
    this.inputProgram.other = this.inputProgram.other.concat(other);
  }

  // merge idHash & revIdHash, increment idCount by the number of new keys
  Object.keys(idHash).forEach(function (key) {
    var hash = idHash[key],
        id = hash.id,
        newId;

    if (oldIdHash.hasOwnProperty(key)) {
      oldIdHash[key].score += hash.score;
    } else {
      newId = this.idCount++;
      oldRevIdHash[newId] = oldIdHash[key] = {
        id: newId,
        key: key,
        value: hash.value,
        score: hash.score
      };
    }
    // NOTE preserve correct hash so that I can fix ids in new Templates when
    // switching compilers
    mergeIdMap[id] = oldIdHash[key];
  }, this);

  // merge scores
  Object.keys(scores).forEach(function (key) {
    if (this.scores.hasOwnProperty(key)) {
      var item = this.scores[key],
          values = item.values,
          newItem = scores[key],
          newValues = newItem.values;
      item.count += newItem.count;
      // copy over values that weren't in old templates, increment variance
      Object.keys(newValues).forEach(function (vkey) {
        if (!values.hasOwnProperty(vkey)) {
          values[vkey] = newValues[vkey];
          item.variance++;
        } else {
          values[vkey] += newValues[vkey];
        }
      }, this);
    } else {
      this.scores[key] = scores[key];
    }
  }, this);

  // this.bodyUid += bodyUid;
  this.isFreshCompiler = false;
  this.mergeIdMap = mergeIdMap;
  return this;
};

Compiler.prototype.switchCompilerIn = function switchCompilerIn(templates) {
  var mergeIdMap = this.mergeIdMap,
      bodyUid = this.bodyUid,
      oldBodyUid = bodyUid;

  templates.forEach(function (template) {

    // update predicates to values obtained while merging compilers
    template.predicates.forEach(function(predicate) {
      var oldId = predicate.id,
          oldValueId = predicate.valueId;
      predicate.id = mergeIdMap[oldId].id;
      predicate.valueId = mergeIdMap[oldValueId].id;
      predicate.compiler = this;
    }, this);

    // bump new ids to account for the existance of old templates
    template.uid += oldBodyUid;
    template.body.uid += oldBodyUid;
    bodyUid++;

    template.compiler = template.body.compiler = this;
  }, this);

  // bodyUid should now account for both old and new templates
  this.bodyUid = bodyUid;
  return this;
};

exports.generate = function generate(code, options) {
  return create(options).generate(code);
};

exports.compile = function compile(code, options) {
  return create(options).compile(code);
};

exports.translate = function translate(ast, code, options)  {
  if (typeof code !== 'string') {
    options = code;
    code = null;
  }
  return create(options).translate(ast, code);
}
