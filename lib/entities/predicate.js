var xjst = require('../');
var esgen = require("escodegen").generate;
var pp = require("zeHelpers").prettyPrint;


// Predicate constructor
function Predicate(compiler, expr, value, cloning) {
  this.compiler = compiler;

  this.expr = this.compiler.sanitize(expr); // Replace `this` in template with `__$ctx`
  this.value = value;

  // pre-serialize
  if (this.value !== null) {
    this._s = esgen({
      type: 'BinaryExpression',
      operator: '===',
      left: this.getExpr(),                         // ??? why so convoluted
      right: this.compiler.replaceFetch(this.value) // ??? why so convoluted
    });
  } else {
    this._s = esgen(this.getExpr());
  };

  // 2nd argument to getId seems redundant
  if(!cloning) {
    this.id = compiler.getId(expr, expr);
    this.valueId = compiler.getId(value, value);
  };

  !cloning && this.simplify();

  compiler.accountScore(this.id, this.valueId);
};
exports.Predicate = Predicate;

Predicate.prototype.clone = function clone() {
  // pass one more argument to Predicate constructor to avoid invoking
  // Predicate.prototype.simplify which will have occured
  // already. Failure to do so will cause a runtime error while
  // cloning in templates where predicate is of the form '!(something)
  // === false'
  return new Predicate(this.compiler,
                       xjst.utils.cloneAst(this.expr),
                       xjst.utils.cloneAst(this.value),
                       true);
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

Predicate.prototype.render = function render() {
  if (this.value !== null) {
    return {
      type: 'BinaryExpression',
      operator: '===',
      // TODO ouch! Both invoke replaceFetch, which is using estraverse. Really?
      // Couldn't we have done this before rendering or even sortGroup?
      left: this.getExpr(),
      right: this.compiler.replaceFetch(this.value)
    };
  } else {
    return this.getExpr();
  }
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

// TODO again this is using estraverse under the hood. Could we have done this
// before rendering, before sortGroup even?
Predicate.prototype.getExpr = function getExpr() {
  return this.compiler.replaceFetch(this.expr);
};
