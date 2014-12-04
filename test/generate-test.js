var more = require('..');
var assert = require('assert');
var bemxjst = require("bem-xjst");

describe('Client templating', function() {

  function test(fn1, fn2, options) {
    if (!options) options = {};
    var templates = fn2.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
    var moreTemplates = fn1.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
    var result1 = more.generate(templates);
    var result = more.generateMore(moreTemplates, result1.ir);
    assert.equal(
      result.out,
      bemxjst.generate(templates + '\n' + moreTemplates, options));
  }

  it('Should produce IR for templates', function () {
    assert.doesNotThrow(function () {
      more.generate(function () {
        block('attach').elem('control')(
          tag()('input'),
          attrs()(function() {
            return { type : 'file' };
          })
        );
        block('attach').elem('no-file').tag()('span');
        block('attach').elem('file').tag()('span');
        block('attach').elem('text').tag()('span');
      })});
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



