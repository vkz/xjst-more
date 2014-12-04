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

var result1 = compiler.generate(templates[0]);
var result2 = compiler.generateMore(templates[1], result1.ir);

