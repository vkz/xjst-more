var esprima = require('esprima');
var more = require("./more");
var Compiler = require('./server-xjst').getCompiler(true);

function Server(options) {
  this.options = more.addBemOptions(options);
  this.bemCompiler = null;
  this.xjstCompiler = null;
  this.result = {};
  this.message = {};
};
exports.Server = Server;

Server.prototype.freshCompilers = function freshCompilers() {
  this.result = {};
  this.bemCompiler = new more.Compiler(this.options);
  this.xjstCompiler = new Compiler(this.options);
  return this;
};

Server.prototype.generate = function generate(code) {
  var ast = esprima.parse(code, {
    loc: true
  });
  return this.translate(ast, code);
};

Server.prototype.translate = function translate(ast, code) {
  ast = this
    .freshCompilers()
    .bemCompiler
    .pretranslate(ast);

  this.result = this
    .xjstCompiler
    .translate(ast, code); // { out: html, ir: [Template, ...] }

  this.message = {
    templates: this.marshalTemplates(this.result.ir),
    // could've returned this.xjstCompiler because xjstCompiler is assumed to
    // change by mutation only never by creating a new one
    compiler: this.marshalCompiler(this.result.compiler)
  };

  return this;
};

Server.prototype.send = function send(client) {
  return client.generate(this.message);
};

Server.prototype.marshalTemplates = function marshalTemplates(templates) {
  return JSON.stringify(
    templates.map(function (template) {
      return template.marshal();
    }));
}

Server.prototype.marshalCompiler = function marshalCompiler(compiler) {
  return JSON.stringify({
    // TODO I may need more meta-data to generate 100% bem-xjst accurate result
    // jailIndex: compiler.jailer.jailIndex,

    // TODO apparently this is needed to generate bodies in resetApplyNext()
    // during rendering
    // applyNext: compiler.applyNext,
    extensions: compiler.extensions,
    code : compiler.code,
    idHash : compiler.idHash,
    revIdHash : compiler.revIdHash,
    scores : compiler.scores,
    idCount : compiler.idCount,
    bodyUid : compiler.bodyUid,
    init : compiler.inputProgram.init,
    other : compiler.inputProgram.other,
    inputProgram: {
      init: compiler.inputProgram.init,
      other: compiler.inputProgram.other
    },
    $initializers: compiler.$initializers,
    $recordExtensions: compiler.$recordExtensions,
    $resetApplyNext: compiler.$resetApplyNext,
    $other: compiler.$other,
    $declareGlobals: compiler.$declareGlobals,
    $initializeGlobals: compiler.$initializeGlobals
  });
};
