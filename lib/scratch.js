var more = require("./more.js"),
    fs = require("fs"),
    bemxjst = require("bem-xjst"),
    templates = [ 
      "../benches/desktop.pages.index.bemhtml+concat.js",
      "../benches/desktop.pages.islands.bemhtml+concat.js",
      "../benches/touch-pad.pages.index.bemhtml+concat.js", 
      "../benches/touch-pad.pages.islands.bemhtml+concat.js",
      "../benches/touch-phone.pages.index.bemhtml+concat.js", 
      "../benches/touch-phone.pages.islands.bemhtml+concat.js" 
    ].map(function (file) { return fs.readFileSync(file, "utf8") });

 var compiler = new more.Compiler();


// var result1 = compiler.generate(templates[0]);
// var result2 = compiler.generate(templates[1], result1.ir);

var getCode = function (t) {return t.toString().replace(/^function\s*\(\)\s*{|}$/g, '')};

var t1 = getCode(function () {
  block('attach').elem('control')(
    tag()('input'),
    attrs()(function() {
      return { type : 'file' };
    })
  );
  block('attach').elem('no-file').tag()('span');
  block('attach').elem('file').tag()('span');
});

var t2 = getCode(function () {
  block('attach').elem('text').tag()('span');
})

var t3 = getCode(function () {
  block('attach').elem('clear').tag()('i');
});

var res1 = compiler.generate(t1);
console.log("res1 = ", res1.out);
var res2 = compiler.generate(t2, res1.ir);
console.log("res2 = ", res2.out);
var res3 = compiler.generate(t3, res2.ir);
console.log("res3 = ", res3.out);

var res = bemxjst.generate(t1 + t2 + t3);
console.log("res = ", res);
