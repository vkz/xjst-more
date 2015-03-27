function preTranslate(templates) {
  var program = {
    templates: templates,
    init : this.inputProgram.init,
    other : this.inputProgram.other
  };
  return program;
}

function _translate(program, bodyOnly) {
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

exports.Compiler = (require('./xjst'))(preTranslate, _translate);
