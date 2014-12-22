var assert = require('assert');
var util = require('util');
var entities = require('./');

var GenericBody = entities.GenericBody;
var Map = entities.Map;

var esgen = require("escodegen").generate;

function Group(compiler, pairs) {
  // if too many (> 16) different rhs values in predicates with the same lhs
  // don't do if-else, instead create a hashmap that looks up the branch by rhs
  // [16/12/14 16:20:53] Fedor Indutny: var $h = { ‘b-b1’: function ($ctx) {} }
  // [16/12/14 16:21:00] Fedor Indutny: var $r = $h[this.block](__$ctx)
  // [16/12/14 16:21:34] Fedor Indutny: __$m
  if (pairs.length > 16) return new Map(compiler, pairs);

  GenericBody.call(this, compiler);
  assert(pairs.length > 0);

  this.predicate = pairs[0].predicate;
  this.pairs = pairs;
};
util.inherits(Group, GenericBody);
exports.Group = Group;

Group.prototype.getChildren = function getChildren() {
  return this.pairs.map(function(pair) {
    return pair.bodies;
  }).reduce(function(left, right) {
    return left.concat(right);
  }, []);
};

Group.prototype.mapChildren = function mapChildren(fn, ctx) {
  this.pairs.forEach(function(pair) {
    pair.bodies =  pair.bodies.map(fn, ctx);
  });
};

// Walk post-sortGroup AST recursively and a produce Mozilla AST
Group.prototype._render = function render() {
  var t = { type: 'Identifier', name: '__$t' };

  var result = [],
      other = [],
      init = [];

  var _s = t.name + this.predicate._s;
  //console.log("Group.render 'var __$t = predicate' = ", _s);

  // var __$t = predicate;
  result.push({
    _s: _s,
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: t,
      init: this.predicate.getExpr()
    }]
  });

  result.push(this.pairs.map(function(pair, index) {
    var out = [];
    pair.bodies.forEach(function(body) {
      this.compiler.addChange(pair.predicate);
      var local = body.render();

      assert(!body.applyNext);

      if (local.apply) out = out.concat(local.apply);
      if (local.other) other = other.concat(local.other);
      if (local.init) init = init.concat(local.init);
      this.compiler.revertChange();
    }, this);

    // console.log('Group.render.pair: predicate in if = ', 
    //             pair.predicate.value ? '__$t === ' + pair.predicate._s: '__$t');

    // var noBody = pair.bodies
    //       .filter(function (b) {return !b.body;})

    // pair.bodies
    //   .filter(function (b) {return !b.body;})
    //   .forEach(function (b) {
    //     console.log('Group.render no body predicate = ', 
    //                 { expr: b.predicate.expr, value: b.predicate.value });
    //     console.log('Group.render no body pairs = ', 
    //                 b.pairs.map(function (p) {return p.bodies}));});
    
    return {
      type: 'IfStatement',
      test: pair.predicate.value ? {
        type: 'BinaryExpression',
        operator: '===',
        left: t,
        right: pair.predicate.value
      } : t,
      consequent: {
        type: 'BlockStatement',
        body: out
      },
      alternate: null
    };
  }, this).reduceRight(function(prev, next) {
    next.alternate = prev;
    return next;
  }));

  return {
    apply: result,
    other: other,
    init: init
  };
};
