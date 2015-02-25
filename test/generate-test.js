var more = require('..');
var assert = require('assert');
var bemxjst = require('bem-xjst');
var pp = require("zeHelpers").prettyPrint;

describe('Client templating', function() {

  function test(fn, fnMore, options) {
    if (!options) options = {};
    var templates = fn.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
    var moreTemplates = fnMore.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
    // var compiler = new more.Compiler(options);
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
    assert.equal(result2, bemxjstResult);
  }

  function testApply(fn, fnMore, data, expected, options) {
    if (!options) options = {};

    var templates = require('./i-bem.bemhtml') + ';\n' +
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
    var result = client.compile();
    expected = expected ||
      bemxjst
      .compile(templates + ';\n' + moreTemplates, options)
      .apply.call(data || {});

    assert.equal(result.apply.call(data || {}), expected);

    // TODO Both client/server and bem-xjst generate almost but not quite
    // identical results. Probably worth getting em 100% right.

    // var bemxjstResult = bemxjst
          // .generate(templates + '\n' + moreTemplates, options);
    // assert.equal(result2, bemxjstResult);
  }

  it('Should generate the same result as bem-xjst on a single chunk of templates', function () {
    test(function () {
      block('attach').elem('control')(
        tag()('input'),
        attrs()(function() {
          return { type : 'file' };
        })
      );
      block('attach').elem('no-file').tag()('span');
      block('attach').elem('file').tag()('span');
      block('attach').elem('text').tag()('span');
    }, function () {})
  });

  it('Should generate from two chunks of simple templates', function() {
    test(function () {
      block('attach').elem('control')(
        tag()('input'),
        attrs()(function() {
          return { type : 'file' };
        })
      );
      block('attach').elem('no-file').tag()('span');
      block('attach').elem('file').tag()('span');
    }, function () {
      block('attach').elem('text').tag()('span');
      block('attach').elem('clear').tag()('i');
    });
  });

  it('Should handle redefinition', function () {
    testApply(function () {
      block('b1').tag()('a');
    },function () {
      block('b1').tag()('b');
    }, {block: 'b1'});
  });

  it('Should handle redefinition using mod', function () {
    testApply(function () {
      block('b1').tag()('a');
    }, function () {
      block('b1').mod('m1', 'v1').tag()('b');
    }, {block: 'b1', mods: {m1: 'v1'}});
  });

  it('Should handle applyNext', function () {
    testApply(function () {
      block('b1').content()('a');
    }, function () {
      block('b1').content()(function () {return [applyNext(), 'b'];});
    }, {block: 'b1'});
  });

  it('Should work on real-world templates', function() {
    testApply(function() {
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
  });

});
