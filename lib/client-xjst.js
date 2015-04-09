var renderer = require("./renderer")();

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

var getXjstConstructor = require('./xjst');

exports.getCompiler = function (preSerialised) {
  var renderer = preSerialised ?
        require("./string-renderer")():
        require("./ast-renderer")();

  return getXjstConstructor(preTranslate, transformers, renderer);
};
