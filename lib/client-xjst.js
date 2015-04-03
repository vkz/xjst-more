function preTranslate(input) {
  // input: [ Template ]
  var program = {
    templates: input,
    init : this.inputProgram.init,
    other : this.inputProgram.other
  };
  return program;
}

function identity(program) { return program; }

var transformers = [ identity ];

exports.Compiler = (require('./xjst'))(preTranslate, transformers);
