var assert = require('assert');
var util = require('util');
var entities = require('./');

var GenericBody = entities.clientGenericBody;

// TODO add unit test that generates maps (see 'lib/scratch.js')

function Map(compiler, pairs) {
  GenericBody.call(this, compiler);

  this.shareable = false;
  this.pairs = {};
  if (pairs && pairs.length >= 1) {
    this.predicate = pairs[0].predicate.expr;
    this.$predicate = pairs[0].predicate.$expr;
    this.predicateId = pairs[0].predicate.id;

    pairs.forEach(function(pair) {
      pair.bodies.forEach(function(body) {
        assert(pair.predicate.value !== null);
        this.add(this.predicate, pair.predicate, body);
      }, this);
    }, this);
  } else {
    this.predicate = null;
    this.$predicate = '';
    this.predicateId = null;
  }

  this.compiler.registerMap(this);
};
util.inherits(Map, GenericBody);
exports.Map = Map;

Map.prototype.getChildren = function getChildren() {
  return Object.keys(this.pairs).map(function(key) {
    var pair = this.pairs[key];
    return pair.bodies;
  }, this).reduce(function(left, right) {
    return left.concat(right);
  }, []);
};

Map.prototype.mapChildren = function mapChildren(fn, ctx) {
  Object.keys(this.pairs).forEach(function(key) {
    var pair = this.pairs[key];
    pair.bodies = pair.bodies.map(fn, ctx);
  }, this);
};

Map.prototype.add = function add(predicate, pairPredicate, body) {
  var value = pairPredicate.value,
      $value = pairPredicate.$value;
  assert(pairPredicate.value.type === 'Literal');
  if (this.predicate === null) {
    // TODO makes no sense cause predicat === this.predicate already, see the
    // call site of add()
    this.predicate = predicate;
    this.predicateId = this.compiler.getId(predicate);
  }

  var valueId = this.compiler.getId(pairPredicate.value);
  body.shareable = false;
  if (!this.pairs[valueId]) {
    this.pairs[valueId] = {
      value: pairPredicate.value,
      $value: pairPredicate.$value,
      bodies: [body]
    };
  } else {
    this.pairs[valueId].bodies.push(body);
  }
};

Map.prototype.getMap = function getMap() {

  var $properties = [];
  var $map = {
    head: 'var ' + this.compiler.getMapName(this).name + ' = {',
    body: $properties,
    tail: '};'
  };

  var result = {
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: this.compiler.getMapName(this),
      init: {
        type: 'ObjectExpression',
        properties: Object.keys(this.pairs).map(function(id) {
          var pair = this.pairs[id];
          var out = [];
          var $body = [];
          var $propertyValue = {
            head: 'function (__$ctx, __$ref) {',
            body: $body,
            tail: '}'
          };
          var $property = pair.$value;

          if (pair.bodies.length === 1) {
            var bodyAst = pair.bodies[0].render(true);
            assert(bodyAst.$apply, 'No $apply in a map with single body');
            out = out.concat(bodyAst.apply);
            $body.push(bodyAst.$apply);
          } else {
            pair.bodies.forEach(function(body) {
              var bodyAst = body.render();
              assert(bodyAst.$apply, 'No $apply in a map with with multi bodies');
              out = out.concat(bodyAst.apply);
              $body.push(bodyAst.$apply);
            });
          }
          out = out.concat({
            type: 'ReturnStatement',
            argument: this.compiler.ref
          });
          $body.push('return __$ref;');
          $propertyValue.body = $body.join('');
          $propertyValue = this.assembleFromObj($propertyValue);
          $property += ': ' + $propertyValue;
          $properties.push($property);

          return {
            type: 'Property',
            key: pair.value,
            value: {
              type: 'FunctionExpression',
              id: null,
              params: [ this.compiler.ctx, this.compiler.ref ],
              defaults: [],
              rest: null,
              generator: false,
              expression: false,
              body: {
                type: 'BlockStatement',
                body: out
              }
            },
            kind: 'init'
          }
        }, this)
      }
    }]
  };

  $map.body = $properties.join(',\n');
  $map = this.assembleFromObj($map);
  result.$map = $map;
  return result;
};

Map.prototype.render = function render() {
  assert(this.predicate !== null);
  var res = { type: 'Identifier', name: '__$mr', $apply: '__$mr' },
      check = this.compiler.checkRef(res),
      $check = check.$apply;

  var $declareRes = [
    'var __$mr = ',
    this.compiler.getMapName(this).name,
    '[',
    this.$predicate,
    '];'
  ];

  var $apply = [
    $declareRes.join(''),
    'if (__$mr) {',
    '__$mr = __$mr(__$ctx, __$ref);',
    $check,
    '}'
  ].join('\n');

  return this.wrapResult({
    apply: [{
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [{
        type: 'VariableDeclarator',
        id: res,
        init: {
          type: 'MemberExpression',
          computed: true,
          object: this.compiler.getMapName(this),
          property: this.predicate
        }
      }]
    }, {
      type: 'IfStatement',
      test: res,
      consequent: {
        type: 'BlockStatement',
        body: [{
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: res,
            right: {
              type: 'CallExpression',
              callee: res,
              arguments: [this.compiler.ctx, this.compiler.ref]
            }
          }
        }].concat(check.apply)
      },
      alternate: null
    }],
    $apply: $apply
  });
};
