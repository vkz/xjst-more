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
//var compiler2 = new bemxjst.Compiler();
//debugger;
console.log("compiler.generate(templates[0]) = ", compiler.generate(templates[0]));
// console.log("compiler.generate(templates[0]) = ", compiler2.generate(templates[0]));

