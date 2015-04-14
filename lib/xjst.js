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
var Splitter = xjst.Splitter;
var MapFlattener = xjst.MapFlattener;
var Jailer = xjst.Jailer;
var Template = xjst.Template;
var Predicate = xjst.Predicate;
var Group = xjst.Group;
var Map = xjst.Map;
var utils = xjst.utils;

module.exports = function () {

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

    // TODO this copying is not really necessary
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

    // TODO consider marshaling jailer's state to avoid repeatative renaming on
    // the client
    this.jailer = Jailer.create();
    this.splitter = Splitter.create(this);
    this.flattener = MapFlattener.create(this);

    // pre-serialised stuff
    this.$initializers = '';
    this.$recordExtensions = '';
    this.$resetApplyNext = '';
    this.$other = '';
    this.$initializeGlobals = '';
    this.$declareGlobals = '';
  };
  // exports.Compiler = Compiler;

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

  // Types: Template, Body, Predicate, Group, etc are all parameterized

  // Parser(ast|string): Code -> [Templates(Ast)]
  // --------------------------------------
  // parse: Code -> Ast
  // getTemplates: Ast -> [Ast]
  // transformTemplates: [Ast] -> [Template(Ast)]
  // rollOut: [Template(Ast)] -> [Template(Ast)] + modify Compiler state

  // Apply Transformers: [Template(Ast)] -> [Template]
  // --------------------------------------------
  // applyTransformers: [Template(Ast)] -> [Transform] -> [Template]
  // , where Transform: [Template(Ast)] -> [Template]
  // , where Template:== Template(Ast) | Template(String)
  //
  // Possible transformers are:
  //
  // replaceFetch:
  // replaceContext:
  // inline:
  // preSerialise:

  // Compiler.translate: [Template] -> Result
  // ------------------------------
  // , where Result:== { ast: Ast | [String], ir: [Template] }
  // transform: [Transform] -> [Template(Ast)] -> [Template]
  // cloneTemplates:
  // sortGroup:
  // render:
  // addMaps:
  // addBodies:
  // Splitter.split:


  // Run compiler in phases to translate AST to AST
  Compiler.prototype.translate = function translate(templates) {

    var program = this.preTranslate(templates);
    var result = this._translate(program);

    // TODO legacy cruft from earlier implementations?
    this.inlineDepth = this.maxInlineDepth;

    // 3.  Add maps to result
    // NOTE: this could possibly generate more shared bodies,
    // so order is important here.
    this.addMaps(result.ast);

    // 4. Add shared bodies to result
    this.addBodies(result.ast);

    // 6. Split big functions into small ones
    result.ast = this.splitter.split(result.ast);

    // preserve xjst compiler
    result.compiler = this;

    return result;
  };

  Compiler.prototype._translate = function _translate(program, bodyOnly) {
    var cacheKey = this._renderCacheKey(program.templates);
    var res = this.probeRenderCache(cacheKey);
    if (res && bodyOnly) return xjst.utils.cloneAst(res);

    var old = this.program;
    this.program = program;
    this.inputProgram = this.inputProgram || program;
    this.inlineDepth++;

    // Save render stack from enemies
    var oldRender = { stack: this.renderStack, history: this.renderHistory };
    this.renderStack = [];
    this.renderHistory = [];

    this.beforeSortGroup(program);

    // TODO: cloning on the client could be expensive. I can clone the
    // new templates on the server and send both copies to the
    // client. Then client would just need to clone the IR.
    var ir = program.templates.map(function (template) {return template.clone();});

    // Group templates
    // NOTE sortGroup doesn't use ast only predicate ids, so no need to do
    // anything special to make it work with pre-serialised values.
    program.templates = this.sortGroup(program.templates);

    // Flatten maps (disable for now)
    // program.templates = this.flattener.flatten(program.templates);

    // Restore `this.program`
    this.program = old;

    // Render program back to AST form
    res = this.render(program, bodyOnly);

    // Restore render stack
    this.renderStack = oldRender.stack;
    this.renderHistory = oldRender.history;

    // Restore inline depth
    this.inlineDepth--;

    this.renderCache(cacheKey, res);
    return {ast: res, ir: ir};
  }

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
    return stmt;
  };

  Compiler.prototype.replaceFetch = function replaceFetch(stmt) {
    return stmt;
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
        initializers = this.getInitializers(program),
        // applyc body
        applyBody = this.getApplyBody(program),
        $applyBody = [this.$other],
        $ctxOrThis = 'ctx = ctx || this;',
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
        apply = this.renderApply(),
        $applyc = ['function applyc(__$ctx, __$ref) {', $applyBody, '}'],
        applyc = this.renderApplyC();

    var $declareRef = 'var __$ref = {};';
    $stmts.push($declareRef);
    stmts.push(this.renderDeclareRef());

    stmts.push(apply);
    $stmts.push($apply);

    var $exportApply = 'exports.apply = apply;';
    $stmts.push($exportApply);
    // exports.apply = apply
    stmts.push(this.renderExportApply());

    stmts.push(applyc);
    $stmts.push($applyc);

    // Call applyc once to allow users override exports
    stmts.push(this.renderInvokeInitializers(initializers));

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

    // Render each template
    var out = this.renderArray(program.templates);

    // global variables
    this.renderDeclareGlobals(stmts);
    this.renderInitializeGlobals(apply);

    $stmts.unshift($declareGlobals);

    // ctx = ctx || this
    this.renderCtxOrThis(apply);

    /// Apply to the bottom of applyC
    if (out.apply) applyBody = applyBody.concat(out.apply);
    if (out.$apply) $applyBody = $applyBody.concat(out.$apply);

    // Other to the top of applyC
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
    this.setApplyBody(applyc, applyBody);
    $applyc[1] = $applyBody;

    function flatten(stmts) {
      return stmts.reduce(function (res, stmt) {
        return res.concat(Array.isArray(stmt)?
                          flatten(stmt):
                          [stmt]);
      }, []);
    }

    return {
      type: 'Program',
      body: stmts,
      $apply: flatten($stmts)
    };
  };

  return Compiler;
}
