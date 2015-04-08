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

// exports.create = function create(preSerialised) {
//   var renderer = require(preSerialised ?
//                          "./client-renderer":
//                          "./server-renderer")();
//   return (require('./xjst'))(preTranslate, transformers, renderer);
// };

exports.create = function create(preSerialised) {
  // var renderer = require("./client-renderer")();
  var renderer = require("./client-renderer")();
  return (require('./xjst'))(preTranslate, transformers, renderer);
};
