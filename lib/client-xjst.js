function preTranslate(templates) {
  var program = {
    templates: templates,
    init : this.inputProgram.init,
    other : this.inputProgram.other
  };
  return program;
}

function identity(program) { return program; }

var transformers = [ identity ];

exports.Compiler = (require('./xjst'))(preTranslate, transformers);
