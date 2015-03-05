var xjst = require("../");
var util = require('util');
var estraverse = require('estraverse');
var entities = require('./');
var esgen = require("escodegen").generate;
var pp = require("zeHelpers").prettyPrint;
var assert = require("assert");

var Predicate = entities.Predicate;

// super constructor for Template
function GenericBody(compiler) {
  this.id = null;
  this.compiler = compiler;
  this.uid = this.compiler.bodyUid++;
  this.shared = false;
  this.shareable = true;
  this.primitive = false;
};
exports.GenericBody = GenericBody;

GenericBody.prototype.getChildren = function getChildren() {
  return [];
};

GenericBody.prototype.mapChildren = function mapChildren(fn, ctx) {
  // No-op
};

// ??? what are these 'split points': "xjst::split_point"
GenericBody.prototype.wrapResult = function wrapResult(res) {
  var sp = this.compiler.splitter.getSplitPoint();
  var $sp = this.compiler.splitter.$splitPoint;
  var apply = res.apply;
  var $apply = res.$apply;

  // Add split point
  apply = [ sp ].concat(apply);
  // TODO adds to much noise, will need it back on eventually
  // $apply = $sp.concat($apply);

  return {
    apply: apply,
    other: res.other,
    init: res.init,
    $apply: $apply
  };
};

// TODO it probably belongs in some utils/helper lib
GenericBody.prototype.assembleFromObj =  function assembleFromObj(obj) {
  return [obj.head, obj.body, obj.tail].join('\n');
}

GenericBody.prototype.render = function render(notShared) {
  this.shared = this.compiler.registerBody(this);
  var ast = this._render();
  var result;

  if (!notShared && this.shared) {
    // pp(ast, {prompt: "shared body ast"});
    result = this.compiler.checkRef(this.callExpr(ast));
  } else {
    result = ast;
  }
  // NOTE just to make sure we always have pre-serialized member
  assert(result.$apply);

  return this.wrapResult(result);
  // return result;
};

GenericBody.prototype.callExpr = function callExpr(ast) {
  var lazyAst = ast || this._render();
  this.shared = this.compiler.registerBody(this);

  if (this.$returns) {
    this.compiler.unshareBody(this);
    return lazyAst.apply[0].argument;
  }

  // // Fast case - inline returned value
  // if (lazyAst.apply &&
  //     lazyAst.apply.length === 1 &&
  //     lazyAst.apply[0].type === 'ReturnStatement') {
  //   this.compiler.unshareBody(this);
  //   return lazyAst.apply[0].argument;
  // }

  var $bodyCall = this.compiler.getBodyName(this).name + '(__$ctx, __$ref)';

  return {
    type: 'CallExpression',
    callee: this.compiler.getBodyName(this),
    arguments: [ this.compiler.ctx, this.compiler.ref ],
    $apply: $bodyCall
  };
};

function Body(compiler, body, id, rolledOut, cloning) {
  GenericBody.call(this, compiler);
  this.primitive = true;

  if (body instanceof Body || cloning) { // when invoked from body.clone()
    // Clone
    var parent = body;

    this.id = parent.id;
    this.uid = parent.uid;
    this.shared = parent.shared;
    this.rolledOut = parent.shared;
    this.body = xjst.utils.cloneAst(parent.body);

    this.applyNext = parent.applyNext;
  } else {
    this.body = Array.isArray(body) ? body : [ body ];

    this.rolledOut = false;
    this.applyNext = null;
  }

  this.pairIndex = 0;
  this.localRef = {};
};
util.inherits(Body, GenericBody);
exports.Body = Body;

Body.prototype.clone = function clone() {
  this.compiler.shareBody(this);
  return new Body(this.compiler, this);
};

Body.prototype.marshal = function marshal() {
  var res = { constructor: "Body" };
  // console.log("!!! marshaling Body = ", this);
  Object.keys(this).forEach(function (prop) {
    if (prop === "compiler") {
      res.compiler = null;
    } else if (prop === "applyNext" &&
               this.applyNext &&
               this.applyNext.pred) {
      res.applyNext = this.applyNext;
      res.applyNext.pred = this.applyNext.pred.marshal();
    } else {
      res[prop] = this[prop];
    }
  }, this);
  // console.log("!!! done Body = ", res);

  return res;
};

Body.prototype.rollOut = function rollOut() {
  if (this.rolledOut) return;

  // roll out every statement in the body
  for (var i = this.body.length - 1; i >= 0; i--) {
    var stmt = this.body[i];
    this.compiler.sanitize(stmt); // this -> __$ctx

    var block = {
      type: 'BlockStatement',
      body: [ stmt ]
    };
    estraverse.replace(block, {
      enter: this.rollOutSpecific.bind(this),
      leave: this.leaveSpecific.bind(this)
    });

    // Inline!
    // Effectively replacing each stmt with its processed (rolled-out) version
    if (block.body.length !== 1 || block.body[0] !== stmt) {
      // cute way of passing args to a method by constructing them in an array.
      // Actually a call to splice that replaces processed stmt this.body[i] with the rolled-out result
      // this.body.splice(i, 1, block.body[0], block.body[1], ...)
      Array.prototype.splice.apply(this.body, [i, 1].concat(block.body));
    }
  }

  // Add last return
  if (this.body.length === 0 ||
      this.body[this.body.length - 1].type !== 'ReturnStatement') {
    this.body.push({ type: 'ReturnStatement', argument: null });
  }

  // Jail local vars
  this.body = this.compiler.jailVars(this.body);
  this.rolledOut = true;
};

Body.prototype.rollOutSpecific = function rollOutSpecific(node) {
  if (node.type !== 'CallExpression') return;

  // Else looking at an ast like this:
  // --------------------------------------------------------------------------
  // { type: 'CallExpression',
  //   callee:
  //   { type: 'Identifier',
  //     name: 'applyNext',
  //     loc: { start: { line: 7, column: 17 }, end: { line: 7, column: 26 } } },
  //   arguments: [],
  //   loc: { start: { line: 7, column: 17 }, end: { line: 7, column: 28 } } }


  // apply(locals) or applyNext(locals) or __$$fetch(identifier) or __$$set
  if (node.callee.type === 'Identifier') {
    var name = node.callee.name;
    if (name === 'apply' || name === 'applyNext') {
      return this.rollOutApply(node, name, node.arguments);
    } else if (name === '__$$fetch') {
      //  __$$fetch is a special function available in templates that
      // looks up properties in globalCtx, that's available to templates
      // through $$global object. See 'compiler-test.js' for an example.
      this.compiler.assertEqual(node, node.arguments.length, 1);
      this.compiler.assertEqual(node, node.arguments[0].type, 'Literal');
      return this.rollOutFetch(node.arguments[0].value);
    } else if (name === '__$$set') {
      this.compiler.assertEqual(node, node.arguments.length, 2);
      this.compiler.assertEqual(node, node.arguments[0].type, 'Literal');
      return this.rollOutSet(node.arguments[0].value,
                             node.arguments[1]);
    }
    // local(locals)(body)
  } else if (node.callee.type === 'CallExpression' &&
             node.callee.callee.type === 'Identifier') {
    var name = node.callee.callee.name;
    if (name !== 'local') return;
    return this.rollOutLocal(node, node.callee.arguments, node.arguments[0]);
  }
};

Body.prototype.leaveSpecific = function leaveSpecific(node, parent) {
  if (node.localMarked === this.localRef) {
    delete node.localMarked;
    this.compiler.revertChange();
  }
};

// Roll-out apply expression
// two cases are `apply(changes)' and `apply()' that is with and
// withoud context changes. For the 1st case delegate changes onto
// `local' and ensure that rollOutApply is reentered without changes
// i.e. turn the 1st case into 2nd case
Body.prototype.rollOutApply = function rollOutApply(ast, type, changes) {
  var ctx = this.compiler.ctx;
  var ref = this.compiler.ref;

  // 1st case - delegate changes to `local'
  // apply(changes)     ===> local(changes)(function () {apply();})
  // applyNext(changes) ===> local(changes)(function () {applyNext();})
  if (changes.length > 0) {
    // Note the 3rd arg to rollOutLocal
    // body === f() { rollOutApply ... } -
    // thunk that will be invoked when unrolling local()
    return this.rollOutLocal(ast, changes, function() {
      return this.rollOutApply(ast, type, [])
    });
  }

  if (type !== 'apply') {
    // applyNext, heh
    // this.applyNext accumulates additions to ast we need for
    // applyNext to work out properly between recursive calls to
    // rollOutApply
    if (!this.applyNext) {
      this.applyNext = this.compiler.getApplyNext(),
      // obtain ast for a unique applyNext flag (actually a hash-prop
      // suitable for 'local(hash)()')
      this.applyNext.member = {
        // ctx.$a5
        type: 'MemberExpression',
        computed: false,
        object: ctx,
        property: this.applyNext.prop
      };

      // add a predicate (as Predicate pair) checking the flag:
      // (lhs === rhs) <==> (ctx.$a5 & 1) === 0
      this.applyNext.pred = new Predicate(
        this.compiler,

        // lhs: (ctx.$a5 & 1)
        { type: 'BinaryExpression',
          operator: '&',
          left: this.applyNext.member,
          right: this.applyNext.value },

        // rhs: 0
        { type: 'Literal', value: 0 });
    }

    // add the flag to ctx and reenter rollOutApply with `changes' and
    // typeOf `apply'. Entire chain of invocations will look like:
    // -> rollOutApply with applyNext(changes)
    // -> rollOutLocal with changes for an arg and apply() for a body
    // -> rollOutApply with no changes
    return this.rollOutApply(ast, 'apply', changes.concat(
      // will be rolled out as local(changes)(f() { apply() }) on
      // reentrance into rollOutApply
      { // would render into '{ __$a0: __$ctx.__$a0 | 1 }'
        type: 'ObjectExpression',
        properties: [{
          type: 'Property',
          key: this.applyNext.prop,
          value: {
            type: 'BinaryExpression',
            operator: '|',
            left: this.applyNext.member,
            right: this.applyNext.value,
          },
          kind: 'init'
        }]
      }));
    // returned ast would render into
    // ------------------------------
    // function __$lb() {
    //     var __$r;
    //     var __$l4 = __$ctx.__$a0;
    //     __$ctx.__$a0 = __$ctx.__$a0 | 1;
    //     __$r = applyc(__$ctx, __$ref);
    //     __$ctx.__$a0 = __$l4;
    //     return __$r;
    // }()
  }

  // Limit inline depth
  return {
    type: 'CallExpression',
    callee: { type: 'Identifier', name: 'applyc' },
    arguments: [ ctx, ref ]
  };
};

// Roll-out local expression
Body.prototype.rollOutLocal = function rollOutLocal(ast, changes, body) {
  var self = this,
      ctx = this.compiler.ctx,
      pairs = [],
      predicates = [];

  function getVar() {
    return { type: 'Identifier', name: '__$l' + self.pairIndex++ };
  }

  function addPair(prop, value) {
    predicates.push(new Predicate(self.compiler, prop, value)); // ??? why do we need those

    pairs.push({
      prop: prop,
      value: value,
      variable: getVar()        // fresh var to preserve the value in this prop
    });
  }

  // Extract prop/value pairs from hash-args to local
  // changes is an array of Mozilla-ast representations
  // of hash-args passed to local, e.g. local({ y: 2 }, { a: {}, 'a.b': 3 })
  changes.forEach(function(change) {   // change is typeOf ObjectExpression
    if (change.type === 'Literal')
      return;
    this.compiler.assertEqual(
        change,
        change.type,
        'ObjectExpression',
        'apply() and local() accepts only object literals');
    change.properties.forEach(function(property) {
      var keys = (property.key.name || property.key.value).split('.');
      var isGlobal = keys[0] === '$$global'; // ??? how do we set props on $$global
      if (isGlobal)
        keys.shift();
      if (isGlobal) {
        var prop = this.compiler.fetchGlobal(keys.join('.'));
      } else {
        // generate ast for accessing props on ctx (ctx.a.b) by nesting keys left to right
        var prop = keys.reduce(function(left, right, i, l) {
          var sub = {
            type: 'MemberExpression',
            computed: false,
            object: left,
            property: { type: 'Identifier', name: right }
          };

          self.compiler.registerExtension(right);

          return sub;
        }, ctx);
      }

      addPair(this.compiler.sanitize(prop),
              this.compiler.sanitize(property.value));
    }, this);
  }, this);

  var result = { type: 'Identifier', name: '__$r' };
  var before = [];
  var after = [];

  // result of the local unrolling
  // is a call of a newly generated function __$lb
  // that does all the save-exec-restore magic:
  // -- preserve ctx in fresh vars, change ctx
  // -- exec local's body
  // -- restore ctx
  // -- return result of body execution
  var ret = {
    localMarked: this.localRef, // ??? why mark it
    type: 'CallExpression',
    callee: null,
    arguments: []
  };

  // add preds generated from hash-args of local to render.stack
  // and their number to render.history (why?)
  this.compiler.addChange(predicates);
  if (typeof body === 'function') {
    // body is
    // ---------------------------------------------
    // function () {
    //       return this.rollOutApply(ast, type, [])
    //     }
    // ---------------------------------------------
    // installed in rollOutApply for the case of `apply(changes)' with
    // changes delegated to `local'
    body = body.call(this); // unrolling empty `apply()'
  }

  // Replace `this` in body
  if (body.type === 'FunctionExpression') {
    body.body = this.compiler.sanitize(body.body);
  } else {
    body = this.compiler.sanitize(body);
  }

  // Declare __$r var
  before.push({
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: result,
      init: null
    }]
  });

  // [pairs] for 'local({ y: 2 }, { a: {}, 'a.b': 3 })'
  // -------------------------------------------------
  // [ { prop:
  //      { type: 'MemberExpression',
  //        computed: false,
  //        object: { type: 'Identifier', name: '__$ctx' },
  //        property: { type: 'Identifier', name: 'y' } },
  //     value:
  //      { type: 'Literal',
  //        value: 2,
  //        raw: '2',
  //        loc: { start: { line: 6, column: 26 }, end: { line: 6, column: 27 } } },
  //     variable: { type: 'Identifier', name: '__$l0' } },
  //   { prop:
  //      { type: 'MemberExpression',
  //        computed: false,
  //        object: { type: 'Identifier', name: '__$ctx' },
  //        property: { type: 'Identifier', name: 'a' } },
  //     value:
  //      { type: 'ObjectExpression',
  //        properties: [],
  //        loc: { start: { line: 6, column: 36 }, end: { line: 6, column: 38 } } },
  //     variable: { type: 'Identifier', name: '__$l1' } },
  //   { prop:
  //      { type: 'MemberExpression',
  //        computed: false,
  //        object:
  //         { type: 'MemberExpression',
  //           computed: false,
  //           object: { type: 'Identifier', name: '__$ctx' },
  //           property: { type: 'Identifier', name: 'a' } },
  //        property: { type: 'Identifier', name: 'b' } },
  //     value:
  //      { type: 'Literal',
  //        value: 3,
  //        raw: '3',
  //        loc: { start: { line: 6, column: 47 }, end: { line: 6, column: 48 } } },
  //     variable: { type: 'Identifier', name: '__$l2' } } ]

   pairs.forEach(function(pair) {
    var left = pair.prop;

    // Store object
    if (left.type === 'MemberExpression' && left.object !== ctx) { // nested prop lookup like ctx.a.b
      var tmp = getVar();
      before.push({             // save ctx.a: 'var __$ln = ctx.a'
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [{
          type: 'VariableDeclarator',
          id: tmp,
          init: left.object
        }]
      });

      left = {                  // use __$ln for prop lookup: '__$ln.b' instead of direct ctx.a
        type: 'MemberExpression',
        computed: left.computed,
        object: tmp,
        property: left.property
      };
    }

    before.push({               // save entire ctx.a.b: 'var __$lm = __$ln.b'
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [{
        type: 'VariableDeclarator',
        id: pair.variable,
        init: left
      }]
    });
    before.push({               // assign new value to ctx.a.b: '__$ln.b = val'
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: left,
        right: pair.value
      }
    });

    after.push({                // restore the value of ctx.a.b: '__$ln.b = __$lm'
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: left,
        right: pair.variable
      }
    });
  }, this);

  var noreturn = false;
  if (body.type === 'FunctionExpression') {
    body = {
      type: 'CallExpression',
      callee: body,
      arguments: []
    };
  }

  if (body.type === 'ExpressionStatement') {
    body = body.expression;
  }

  // create unrolled-body:
  // ---------------------
  // before-body - add changes to ctx preserving old values
  // _$r = body
  // after-body - revert changes to ctx to old values
  body = [].concat(before, {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: result,
      right: body
    }
  }, after);

  // wrap the new unrolled-body in a 'function __$lb() {
  // unrolled-body; return _$r;}'.  This appears to be just a
  // convenience, func is never used - instead its body gets spliced
  // into generated code (where?)
  var func = {
    type: 'FunctionExpression',
    id: { type: 'Identifier', name: '__$lb' },
    params: [],
    defaults: [],
    rest: null,
    generator: false,
    expression: false,
    body: {
      type: 'BlockStatement',
      body: body.concat({
        type: 'ReturnStatement',
        argument: result
      })
    }
  };

  ret.callee = func;
  return ret;
};

Body.prototype.rollOutFetch = function rollOutFetch(id) {
  return this.compiler.fetchGlobal(id);
};

Body.prototype.rollOutSet = function rollOutSet(id, value) {
  return {
    type: 'AssignmentExpression',
    operator: '=',
    left: this.compiler.fetchGlobal(id),
    right: value
  };
};

// Render body
Body.prototype._render = function render() {
  return {
    apply: this.body,
    other: null,
    init: [],
    $apply: this.$body
  };
};
