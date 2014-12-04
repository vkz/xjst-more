var more = require('..');
var assert = require('assert');
var bemxjst = require("bem-xjst");



describe('Client templating', function() {

  function test(fn1, fn2, options) {
    if (!options) options = {};
    var templates = fn1.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
    var moreTemplates = fn2.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
    var compiler = new more.Compiler();
    var result1 = compiler.generate(templates);
    var result = compiler.generateMore(moreTemplates, result1.ir);
    var bemxjstResult = bemxjst.generate(templates + '\n' + moreTemplates, options);
    assert.equal(
      result.out,
      bemxjstResult);
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

  it('Should load a simple template', function() {
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
    }, function () {
      block('attach').elem('clear').tag()('i');
    });
  });

  it('Should load multiple simple templates', function() {
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

});



