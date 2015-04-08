var esprima = require('esprima'),
    uglify = require('uglify-js'),
    estraverse = require('estraverse'),
    vm = require('vm'),
    util = require('util'),
    assert = require('assert');


var xjst = require('./');
var esgen = require("escodegen").generate;
var pp = require("zeHelpers").prettyPrint;

function preTranslate(input) {
  // input: Mozilla AST
  var program = this.getTemplates(input);
  program.templates = program
    .templates
    .map(this.transformTemplates.bind(this));
  return program;
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

var transformers = [
  rollOut,
  replaceFetchInOther,
  replaceContextIn,
  inline,
  preserialise
];

var renderer = require("./server-renderer")();

exports.Compiler = (require('./xjst'))(preTranslate, transformers, renderer);
