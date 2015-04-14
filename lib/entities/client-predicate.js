var xjst = require('../');

// Predicate constructor
function Predicate(compiler, expr, value, parent) {
  this.compiler = compiler;

  this.expr = this.compiler.sanitize(expr); // Replace `this` in template with `__$ctx`
  this.value = value;

  // 2nd argument to getId seems redundant
  if(!parent) {
    this.expr = compiler.replaceFetch(this.expr);
    this.value = compiler.replaceFetch(this.value);
    this.id = compiler.getId(expr, expr);
    this.valueId = compiler.getId(value, value);
    this.simplify();
  } else {
    // cloning
    this.$expr = parent.$expr;
    this.$value = parent.$value;
  }

  // NOTE do not pre-serialize here! There's a bunch of processing that happens
  // before sortGroup, say replaceContext

  // TODO should this really occur when cloning or should I move in the above if
  compiler.accountScore(this.id, this.valueId);

};
exports.Predicate = Predicate;

Predicate.prototype.clone = function clone() {
  // pass one more argument to Predicate constructor to avoid invoking
  // Predicate.prototype.simplify which will have occured
  // already. Failure to do so will cause a runtime error while
  // cloning in templates where predicate is of the form '!(something)
  // === false'
  var clone = new Predicate(
    this.compiler,
    xjst.utils.cloneAst(this.expr),
    xjst.utils.cloneAst(this.value),
    this);
  return clone;
};


Predicate.prototype.marshal = function marshal() {
  var res = { constructor: "Predicate" };
  // console.log("!!! marshaling Predicate = ", this);

  Object.keys(this).forEach(function (prop) {
    if (prop === "compiler") {
      res.compiler = null;
    } else {
      res[prop] = this[prop];
    }
  }, this);
  // console.log("!!! done Predicate = ", res);

  return res;
};

Predicate.prototype.getScore = function getScore() {
  return this.compiler.getScore(this.id);
};

Predicate.prototype.render = function render(pre) {
  if (this.value !== null) {
    return {
      type: 'BinaryExpression',
      operator: '===',
      left: this.expr,
      right: this.value,
      $apply: '(' + this.$expr + ')' + ' === ' + this.$value
    };
  } else {
    this.expr.$apply = '(' + this.$expr + ')';
    return this.expr;
  }
};

Predicate.prototype.preRender = function () {
  return this.render(true);
};

Predicate.prototype.simplify = function simplify() {
  // !(something) === false => something
  if (this.value.type === 'Literal' &&
      this.value.value === false &&
      this.expr.type === 'UnaryExpression' &&
      this.expr.operator === '!') {
    this.expr = this.expr.argument;
    this.value = null;          // this breaks simplify when cloning,
                                // cause this.value.value will
                                // essentially be a null.value in any
                                // subsequent invokation of
                                // simplify. See NOTE in
                                // Prototype.prototype.clone
  }
};

// // TODO again this is using estraverse under the hood. Could we have done this
// // before rendering, before sortGroup even?
// Predicate.prototype.getExpr = function getExpr() {
//   return this.compiler.replaceFetch(this.expr);
// };
