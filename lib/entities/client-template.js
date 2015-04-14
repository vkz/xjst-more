var util = require('util');
var entities = require('./');

var GenericBody = entities.clientGenericBody;
var Body = entities.clientBody;
var Predicate = entities.clientPredicate;

// Template constructor
function Template(compiler, predicates, body) {
  GenericBody.call(this, compiler);

  this.shareable = false;
  this.predicates = predicates;

  if (body.type === 'FunctionExpression') {
    // function() { body } => body
    this.body = body.body.body;
  } else if (!Array.isArray(body)) { // what happens if Array.isArray(body) is true???
    // stmt => return stmt;
    this.body = [ { type: 'ReturnStatement', argument: body } ];
  }

  if (body instanceof Body) {
    this.body = body.clone();
  } else {
    this.body = new Body(compiler, this.body); // branching on 'body' in Template doesn't appear exhaustive, so this.body maybe undefined???
  }
};
util.inherits(Template, GenericBody);
exports.Template = Template;

Template.prototype.getChildren = function getChildren() {
  return [this.body];
};

Template.prototype.mapChildren = function mapChildren(fn, ctx) {
  this.body = fn.call(ctx, this.body);
};

Template.prototype.marshal = function marshal() {
  var res = { constructor: "Template" };
  // console.log("!!!marshaling Template = ", this);
  Object.keys(this).forEach(function (prop) {
    if (prop === "compiler") {
      res.compiler = null;
    } else if (prop === "predicates") {
      res.predicates = this.predicates.map(function (p) { return p.marshal(); });
    } else if (prop === "body") {
      res.body = this.body.marshal();
    } else {
      res[prop] = this[prop];
    }
  }, this);
  // console.log("!!!done Template = ", res);

  return res;
};

Template.prototype.clone = function clone() {
  var r = new Template(this.compiler, this.predicates.map(function(predicate) {
    var clone = predicate.clone();
    clone.id = predicate.id;
    clone.valueId = predicate.valueId;
    return clone;
  }), this.body);

  r.uid = this.uid;

  return r;
};

// Roll-out apply/applyNext() and local() calls
Template.prototype.rollOut = function rollOut() {
  var body = this.body; // a 'Body' instance at this point

  // just adds predicates.length to renderHistory and pushes
  // predicates onto renderStack. Why do we need this at all?
  this.compiler.addChange(this.predicates);
  body.rollOut();
  this.compiler.revertChange();
};

Template.prototype.getPredicates = function getPredicates() {
  if (this.predicates.length === 0) return { $apply: '' };

  var test = this.predicates.map(function(pred) {
    return pred.render();
  }).reduce(function(left, right) {
    return {
      type: 'BinaryExpression',
      operator: '&&',
      left: left,
      right: right,
      $apply: left.$apply + ' && ' + right.$apply
    };
  });

  return {
    type: 'IfStatement',
    test: test,
    consequent: null,
    alternate: null,
    $apply: test.$apply
  };
};

// Render template to AST form
Template.prototype._render = function render() {
  // If we came here - we're compiling without optimizations
  var res,
      body = this.body.render();

  if (this.body.applyNext)
    this.predicates.push(this.body.applyNext.pred);

  // Identity template()
  if (this.predicates.length === 0)
    return body;

  res = this.getPredicates();
  // TODO could it ever return malformed ast {consequent: ..BlockStatement..}
  // when there're no predicates? The check this.predicates.length === 0 above
  // suggests this would never happen. But some duck-types pretending to be a
  // Template might still need the check inside getPredicates and an ast fix
  // somewhere down the line. This is ugly.
  var $apply = res.$apply === '' ?
        body.$apply :
        ['if (', res.$apply, ') {\n', body.$apply, '}'].join('');
  res.consequent = { type: 'BlockStatement', body: body.apply };
  return {
    apply: res,
    other: body.other,
    init: body.init,
    $apply: $apply
  };
};
