var assert = require('assert');
var util = require('util');
var entities = require('./');
var pp = require("zeHelpers").prettyPrint;
var esprima = require('esprima');
var esgen = require("escodegen").generate;


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


  // var __$t = predicate;
  var $declareT = 'var __$t = ' + this.predicate.$expr + ';\n';

  result.push({
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: t,
      init: this.predicate.expr
    }]
  });

  var branches = this.pairs.map(function(pair, index) {
    var out = [],
        $out = '';
    pair.bodies.forEach(function(body) {
      this.compiler.addChange(pair.predicate);
      var local = body.render();

      assert(!body.applyNext);

      if (local.apply) {
        // assert(typeof local.$apply === 'string');
        out = out.concat(local.apply);
        $out = $out.concat(local.$apply);
      }
      if (local.other) other = other.concat(local.other);
      if (local.init) init = init.concat(local.init);
      this.compiler.revertChange();
    }, this);

    var predV = pair.predicate.value,
        $test = predV ? '__$t === ' + esgen(predV): '__$t',
        $cons = $out,
        $branch = { test: $test, cons: $cons, alt: null};
    // TODO remove this check in production
    // assert.equal(
    //   esgen(esprima.parse($out)),
    //   esgen({type: 'Program', body: out}),
    //   'Group: string rendered from pair.bodies \
    //   differs from AST-generated.');

    return {
      $apply: $branch,
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
  }, this);

  var ast = branches.reduceRight(function(prev, next) {
    next.$apply.alt = prev.$apply;
    next.alternate = prev;
    return next;
  });
  result.push(ast);

  function reduceBranch(branch) {
    var alt = ';';
    if (branch.alt) {
      alt = ' else ' + reduceBranch(branch.alt) ;
    }
    return '' +
      'if (' + branch.test + ') {\n' +
      branch.cons +
      '}' + alt;
  }

  return {
    apply: result,
    other: other,
    init: init,
    $apply: $declareT + reduceBranch(ast.$apply)
  };
};
