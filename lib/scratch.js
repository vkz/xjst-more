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



function getCode(t, withIBem) {
  var ibem = withIBem ? require('../test/i-bem.bemhtml') + ';\n' : '';
  var template = typeof t === 'string'?
        t : t.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
  return ibem + template;
};
function compile(t, ir) {return (new more.Compiler()).compile(getCode(t, true), ir);}
function generate(t, ir) {return (new more.Compiler()).generate(getCode(t), ir);}
function generateWithIbem(t, ir) {return (new more.Compiler()).generate(getCode(t, true), ir);}

/* big example */
if (false) {
  var result1 = generateWithIbem(getCode(templates[0]));
  //var result1 = generate(templates[0]);
  //var result2 = generate(templates[1], result1);
  //console.log("result1 = ", result1.out);

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



if (false) {
  var res5 = generate(getCode(function () {
    block('attach').elem('control')(
      tag()('input'),
      attrs()(function() {
        return { type : 'file' };
      })
    );
    block('attach').elem('no-file').tag()('span');
    block('attach').elem('file').tag()('span');
    block('attach').elem('text').tag()('span');
  }));
  var res6 = generate(getCode(function () {}), res5);

  console.log("res = ", res6.out);
}

if (true) {
  var res4 = generateWithIbem(getCode(function () {
    block('b1').content()('a');
    block('b1').content()(function () {return [applyNext(), 'b'];});
  }));
  // console.log("res = ", res4.out);
}




/* multi-part */
function scratch1() {
  var bemCompiler = new more.Compiler(),
      code = getCode(function () {
        block('b1').content()('a');
      }),
      moreCode = getCode(function () {
        block('b1').content()(function () {return [applyNext(), 'b'];});
      });
  var res = bemCompiler.generate(code);
  console.log("res = ", res.out);

  var client = new more.Client(res);

  var moreRes = bemCompiler.sendGenerate(moreCode, client);
  console.log("moreRes = ", moreRes.out);
}

function scratch2() {
  var server = new more.Server(),
      client = new more.Client(),
      code = getCode(function () {
        block('b1').content()(function () {
          var num = '1';
          return 'b' + num;
        });
        block('b2').content()(function () {
          var num = '2';
          var result = applyNext({block: 'b1'});
          return result;
        });
      }, true);
  var result = server
        .generate(code)
        .send(client);

  pp(result, {prompt: "result"});
  
  // var correctResult = (new bemxjst.Compiler()).generate(code);
  // pp(correctResult, {prompt: 'result correct'});
  // return result;
}
scratch2();

// function scratch3() {
//   var server = new more.Server(),
//       client = new more.Client(),
//       code = getCode(function () {
//         match(function() { return !this.elem },
//               function() { return this.block === "arrow-rating" },
//               function() { return this._mode === "content" })(
//           function() {return [
//             this.ctx.content,
//             {
//               "elem": "corner",
//               "content": {"elem": "triangle"}
//             }
//           ]}
//         )
//       }, true);
//   var result = (new bemxjst.Compiler()).generate(code);
//   pp(result, {prompt: "result"});
//   // var result = (new bemxjst.Compiler()).compile(code);
//   // return result.apply({
//   //   block: 'arrow-rating',
//   //   content: 'Arrow content'
//   // });
//   // pp(result.out, {prompt: 'result.out'});
//   // var correctResult = (new bemxjst.Compiler()).generate(code);
//   // pp(correctResult, {prompt: 'result correct'});
//   // return result;
// }
// scratch3();

// example with maps i.e. addMaps() has affect
// TODO although generated js does map lookup to invoke the right body,
// addBodies still generates and adds 17 functions, which seems wrong.
function scratch4() {
  var server = new more.Server(),
      client = new more.Client(),
      code = getCode(function () {
        block('b1').content()(function () {var x = 0; return 'b1';});
        block('b2').content()(function () {var x = 0; return 'b2';});
        block('b3').content()(function () {var x = 0; return 'b3';});
        block('b4').content()(function () {var x = 0; return 'b4';});
        block('b5').content()(function () {var x = 0; return 'b5';});
        block('b6').content()(function () {var x = 0; return 'b6';});
        block('b7').content()(function () {var x = 0; return 'b7';});
        block('b8').content()(function () {var x = 0; return 'b8';});
        block('b9').content()(function () {var x = 0; return 'b9';});
        block('b10').content()(function () {var x = 0; return 'b10';});
        block('b11').content()(function () {var x = 0; return 'b11';});
        block('b12').content()(function () {var x = 0; return 'b12';});
        block('b13').content()(function () {var x = 0; return 'b13';});
        block('b14').content()(function () {var x = 0; return 'b14';});
        block('b15').content()(function () {var x = 0; return 'b15';});
        block('b16').content()(function () {var x = 0; return 'b16';});
        block('b17').content()(function () {var x = 0; return 'b17';});
      }, false);
  var result = server
        .generate(code)
        .send(client);
}
// scratch4();

function scratch5() {
  var server = new more.Server(),
      client = new more.Client(),
      code = getCode(function () {
        block('b1').content()(function () {var x = 0; return 'b1';});
        block('b2').content()(function () {var x = 0; return 'b2';});
        block('b3').content()(function () {var x = 0; return 'b3';});
        block('b4').content()(function () {var x = 0; return 'b4';});
        block('b5').content()(function () {var x = 0; return 'b5';});
        block('b6').content()(function () {var x = 0; return 'b6';});
        block('b7').content()(function () {var x = 0; return 'b7';});
        block('b8').content()(function () {var x = 0; return 'b8';});
        block('b9').content()(function () {var x = 0; return 'b9';});
        block('b10').content()(function () {var x = 0; return 'b10';});
        block('b11').content()(function () {var x = 0; return 'b11';});
        block('b12').content()(function () {var x = 0; return 'b12';});
        block('b13').content()(function () {var x = 0; return 'b13';});
        block('b14').content()(function () {var x = 0; return 'b14';});
        block('b15').content()(function () {var x = 0; return 'b15';});
        block('b16').content()(function () {var x = 0; return 'b16';});
        block('b17').content()(function () {var x = 0; return 'b17';});
      }, false);
  var result = server
        .generate(code)
        .send(client);
}
// scratch4();


function testApply(fn, fnMore, data, expected, options) {
  if (!options) options = {};

  var templates = require('../test/i-bem.bemhtml') + ';\n' +
        fn.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
  var moreTemplates = fnMore.toString().replace(/^function\s*\(\)\s*{|}$/g, '');

  var client = new more.Client(options);
  var server = new more.Server(options);
  var result1 = server
        .generate(templates)
        .send(client);
  var result2 = server
        .generate(moreTemplates)
        .send(client);

  var bemxjstResult = bemxjst
        .generate(templates + '\n' + moreTemplates, options);

  pp(result2, {prompt: "result2"});
  pp(bemxjstResult, {prompt: "bemxjstResult"});
}

testApply(function () {
  block('b1').content()('a');
}, function () {
  block('b1').content()(function () {return [applyNext(), 'b'];});
}, {block: 'b1'});

false && testApply(function() {
  // i-jquery
  block('i-jquery').elem('core').def()(function() {
    return applyCtx({
      block: 'b-page',
      elem: 'js',
      url: '//yandex.st/jquery/1.7.2/jquery.min.js'
    });
  });

  // i-ua
  block('i-ua')(
    tag()('script'),
    bem()(false),
    content()(function() {
      return [
        ';(function(d,e,c,r){',
        'e=d.documentElement;',
        'c="className";',
        'r="replace";',
        'e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");',
        'if(d.compatMode!="CSS1Compat")',
        'e[c]=e[c][r]("i-ua_css_standart","i-ua_css_quirks")',
        '})(document);'
      ].join('');
    })
  );

  // b-page
  block('b-page')(
    mode('doctype')(function() {
      return this.ctx.doctype || '<!DOCTYPE html>';
    }),
    mode('xUACompatible')(function() {
      return this.ctx['x-ua-compatible'] === false ? false : {
        tag: 'meta',
        attrs: {
          'http-equiv': 'X-UA-Compatible',
          content: this.ctx['x-ua-compatible'] || 'IE=EmulateIE7, IE=edge'
        }
      };
    }),
    def().match(function() { return !this.ctx._isBody })(function() {
      var ctx = this.ctx,
          dtype = apply('doctype'),
          xUA = apply('xUACompatible'),
          buf = [
            dtype,
            {
              elem: 'root',
              content: [
                {
                  elem: 'head',
                  content: [
                    {
                      tag: 'meta',
                      attrs: { charset: 'utf-8' }
                    },
                    xUA,
                    {
                      tag: 'title',
                      content: ctx.title
                    },
                    ctx.favicon ? {
                      elem: 'favicon',
                      url: ctx.favicon
                    } : '',
                    ctx.meta,
                    { block: 'i-ua' },
                    ctx.head
                  ]
                },
                ctx
              ]
            }
          ];

      local({ 'ctx._isBody': true })(applyCtx(buf));
    }),
    tag()('body'),
    mix().match(this.elem !== 'body')(function() {
      return [{ elem: 'body' }];
    }),
    elem('root')(
      bem()(false),
      tag()('html'),
      cls()('i-ua_js_no i-ua_css_standart')
    ),

    elem('head')(
      bem()(false),
      tag()('head')
    ),

    elem('meta')(
      bem()(false),
      tag()('meta'),
      attrs()(function() { return this.ctx.attrs })
    ),

    elem('favicon')(
      bem()(false),
      tag()('link'),
      attrs()(function() {
        return { rel: 'shortcut icon', href: this.ctx.url }
      })
    )
  );

  // b-page__css
  block('b-page').elem('css')(
    bem()(false),
    tag()('style'),
    def().match(function() { return this.ctx.hasOwnProperty('ie') },
                function() { return !this.ctx._ieCommented })(function() {
                  var ie = this.ctx.ie;
                  if (ie === true) {
                    apply('', {
                      ctx: [6, 7, 8, 9].map(function(v) {
                        return {
                          elem: 'css',
                          url: this.ctx.url + '.ie' + v + '.css', ie: 'IE ' + v
                        };
                      }, this)
                    });
                  } else {
                    var hideRule = !ie ?
                          ['gt IE 9', '<!-->', '<!--'] :
                          ie === '!IE' ?
                          [ie, '<!-->', '<!--'] :
                          [ie, '', ''];
                    apply('', {
                      'ctx._ieCommented': true,
                      ctx: [
                        '<!--[if ' + hideRule[0] + ']>',
                        hideRule[1],
                        this.ctx,
                        hideRule[2],
                        '<![endif]-->'
                      ]
                    });
                  }
                }),
    match(function() { return this.ctx.url })(
      tag()('link'),
      attrs()(function() {
        return { rel: 'stylesheet', href: this.ctx.url }
      })
    )
  );

  // b-page__js
  block('b-page').elem('js')(
    bem()(false),
    tag()('script'),
    attrs().match(function() { return this.ctx.url })(function() {
      return { src: this.ctx.url }
    })
  );

  // b-link
  block('b-link')(
    tag()('a'),
    attrs()(function() {
      var ctx = this.ctx,
          props = ['title', 'target'],
          p = typeof ctx.url,
          a = {
            href: (p === 'undefined' || p === 'string') ? ctx.url :
              (p = [], apply('', { _buf: p, ctx: ctx.url }),
               p.join(''))
          };

      while(p = props.pop()) ctx[p] && (a[p] = ctx[p]);

      return a;
    })
  );

  // b-link__inner
  block('b-link').elem('inner').tag()('span');


}, function () {
  // b-link__pseudo
  block('b-link').match(this.mods && this.mods.pseudo, !this.elem)(
    tag()(function() { return this.ctx.url? 'a' : 'span' }),
    js()(true),
    attrs().match(function() { return !this.ctx.url })(function() {
      return {};
    }),
    content().match(function() {
      return !this.ctx._wrap
    }, function() {
      return !this.mods.inner
    })(function() {
      apply('', {
        ctx: {
          elem: 'inner',
          content: this.ctx.content,
          _wrap: true
        }
      });
    })
  );

}, {
  "block": "b-page",
  "title": "Pseudo link",
  "head": [
    { "elem": "css", "url": "example.css"},
    { "elem": "css", "url": "example.ie.css", "ie": "lt IE 8" },
    { "block": "i-jquery", "elem": "core" },
    { "elem": "js", "url": "example.js" }
  ],
  "content": [
    {
      "block": "b-link",
      "mods" : { "pseudo" : "yes", "togcolor" : "yes", "color": "green" },
      "url": "#",
      "target": "_blank",
      "title": "Click me",
      "content": "This pseudo link changes its color after click"
    }
  ]
}, '<!DOCTYPE html><html class="i-ua_js_no i-ua_css_standart">' +
          '<head><meta charset="utf-8"/>' +
          '<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=edge"/>' +
          '<title>Pseudo link</title>' +
          '<script>;(function(d,e,c,r){e=d.documentElement;c="className";' +
          'r="replace";e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");' +
          'if(d.compatMode!="CSS1Compat")e[c]=e[c][r]' +
          '("i-ua_css_standart","i-ua_css_quirks")})(document);</script>' +
          '<link rel="stylesheet" href="example.css"/><!--[if lt IE 8]>' +
          '<link rel="stylesheet" href="example.ie.css"/><![endif]-->' +
          '<script src="//yandex.st/jquery/1.7.2/jquery.min.js"></script>' +
          '<script src="example.js"></script>' +
          '</head>' +
          '<body class="b-page b-page__body">' +
          '<a class="b-link b-link_pseudo_yes b-link_togcolor_yes ' +
          'b-link_color_green i-bem" onclick="return {&quot;b-link&quot;:{}}" ' +
          'href="#" target="_blank" title="Click me">' +
          '<span class="b-link__inner">' +
          'This pseudo link changes its color after click</span></a>' +
                   '</body></html>');
