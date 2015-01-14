var more = require("./more.js"),
    fs = require("fs"),
    bemxjst = require("bem-xjst"),
    pp = require('zeHelpers').prettyPrint,
    parse = require('esprima').parse,
    esgen = require('escodegen').generate,
    replaceContext = require('./').utils.replaceContext,
    templates = [ 
      "../benches/desktop.pages.index.bemhtml+concat.js",
      "../benches/desktop.pages.islands.bemhtml+concat.js",
      "../benches/touch-pad.pages.index.bemhtml+concat.js", 
      "../benches/touch-pad.pages.islands.bemhtml+concat.js",
      "../benches/touch-phone.pages.index.bemhtml+concat.js", 
      "../benches/touch-phone.pages.islands.bemhtml+concat.js" 
    ].map(function (file) { return fs.readFileSync(file, "utf8") });

if (false) {
  
  //Body.prototype._render:
  var b = 
        [ 
          { type: 'ReturnStatement',
            argument: { type: 'ArrayExpression', elements: [] }} ,

          { type: 'ReturnStatement',
            argument: { type: 'Literal', value: 'B', raw: '\'B\'' } } ,

          { type: 'ReturnStatement',
            argument: { type: 'Literal', value: 'a', raw: '\'a\'' } } 
        ];

  //Predicate.prototype.render:
  var p = 
        [
          { type: 'BinaryExpression',
            operator: '&',
            left: 
            { type: 'MemberExpression',
              computed: false,
              object: { type: 'Identifier', name: '__$ctx' },
              property: { type: 'Identifier', name: '__$a0' } },
            right: { type: 'Literal', value: 1 } } ,

          { type: 'MemberExpression',
            computed: true,
            object: 
            { type: 'MemberExpression',
              computed: false,
              object: { type: 'Identifier', name: '__$ctx' },
              property: { type: 'Identifier', name: 'mods' } },
            property: 
            { type: 'Literal',
              value: 'm1',
              raw: '\'m1\''} } ,

          { type: 'MemberExpression',
            computed: false,
            object: { type: 'Identifier', name: '__$ctx' },
            property: { type: 'Identifier', name: 'mods' } }
        ];

  var gen = require("escodegen").generate;
  b.map(function (b) {return gen(b);});
  p.map(function (b) {return gen(b);});

}



function getCode (t, withIBem) {
  var ibem = withIBem ? require('../test/i-bem.bemhtml') + ';\n' : '';
  var template = typeof t === 'string'? 
    t : t.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
  return ibem + template;
};
function compile(t, ir) {return (new more.Compiler()).compile(getCode(t, true), ir);}
function generate(t, ir) {return (new more.Compiler()).generate(getCode(t), ir);}

/* big example */
if (false) {
  var result1 = generate(getCode(templates[0]));
  //var result1 = generate(templates[0]);
  //var result2 = generate(templates[1], result1.ir);
  //console.log("result1 = ", result1.out);

}

/* multi-part */
if (false) {
  
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

  var res1 = generate(t1);
  console.log("res1 = ", res1.out);

  var res2 = generate(t2, res1.ir);
  console.log("res2 = ", res2.out);

  var res3 = generate(t3, res2.ir);
  console.log("res3 = ", res3.out);

  // var res = bemxjst.generate(t1 + t2 + t3);
  // console.log("res = ", res);

}

/* applyNext with mods example */
if (false) {
  var t = getCode(function () {
    block('b1').content()('a');
    block('b1').mod('m1', 'v1').content()('B');
    block('b1').content()(function () {
      var temp = 'v1';
      return [applyNext({'mods.m1': temp}), 'b'];});
  });
  var res = generate(t);
  //console.log("res = ", res.out);
}


if (true) {
  var res4 = generate(getCode(function () {
      block('b1').content()('a');
      block('b1').content()(function () {return [applyNext(), 'b'];});
    }));
  console.log("res = ", res4.out);
}


