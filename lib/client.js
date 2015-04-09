var Compiler = require('./client-xjst').getCompiler(true);
var addBemOptions = require("./more").addBemOptions;

var vm = require('vm');
var esprima = require('esprima');
var esgen = require("escodegen").generate;
var uglify = require('uglify-js');

function Client(options, state) {
  this.options = addBemOptions(options);
  this.preSerialise = options && options.preSerialise;
  this.templates = [];
  this.code = '';
  this.xjstCompiler = new Compiler(this.options);
  this.xjstCompiler.isFreshCompiler = true;
  this.xjstCompiler.code = '';
  if (state) {
    this.templates = state.ir;
    this.code = state.out;
    this.xjstCompiler = this.templates[0].compiler;
  }
}
exports.Client = Client;

// TODO I can switch compiler in Templates during unmarshaling, no good reason
// to walk the Templates in a separate func (switchCompilerIn):
// 1 - unmarshalCompiler
// 2 - merge compilers
// 3 - unmarshal templates switching the compiler
Client.prototype.generate = function generate(message) {
  var compiler = this.unmarshalCompiler(message.compiler),
      templates = this.unmarshalTemplates(message.templates),
      xjstResult =this.translate(templates, compiler),
      ast = xjstResult.ast;

  // this.xjstCompiler = xjstResult.compiler;
  this.templates = xjstResult.ir;

  if (this.preSerialise) {
    // pp(ast.$apply, {prompt: "ast.$apply"});
    this.code = esgen(esprima.parse(ast.$apply.join('\n')));
    return this.code
  }

  this.code = uglify
    .AST_Node
    .from_mozilla_ast(ast)
    .print_to_string({ beautify: true });

  return this.code;
};

Client.prototype.compile = function compile(code) {
  var exports = {};
  vm.runInNewContext(code || this.code, { exports: exports, console: console });
  return exports;
}

Client.prototype.translate = function translate(newTemplates, newCompiler) {
  var result = this.xjstCompiler
        .merge(newCompiler)
        .switchCompilerIn(newTemplates)
        .translate(newTemplates.concat(this.templates));
  // strictly speaking this should not be necessary, since compiler is being
  // mutated not replaced
  this.xjstCompiler = result.compiler;
  return result;
}

Client.prototype.unmarshalCompiler = function unmarshalCompiler(data) {
  return JSON.parse(data);
};

// NOTE duck-typing json-parsed objects as Body/Predicate/Template entities so
// that wrapping simply re-uses their ability to clone. Makes code small but
// might be a source of bugs. Buyer beware!
Client.prototype.unmarshalTemplates = function unmarshalTemplates(data) {
  var constructors = require('./'),
      Template = constructors.Template,
      Predicate = constructors.Predicate,
      Body = constructors.Body,
      compiler = new Compiler(this.options),
      templates = JSON.parse(data);

  function wrapPredicate(predicate) {
    var result = new Predicate(compiler, predicate.expr, predicate.value, predicate);
    result.id = predicate.id
    result.valueId = predicate.valueId;
    return result;
  }

  return templates.map(function (template) {
    var predicates = template
          .predicates
          .map(function (predicate) { return wrapPredicate(predicate); }),
        body = new Body(compiler, template.body, undefined, undefined, template.body),
        applyPredicate = body.applyNext && body.applyNext.pred;

    if (applyPredicate) {
      body.applyNext.pred = wrapPredicate(applyPredicate);
    }

    return new Template(compiler, predicates, body);
  });
};

