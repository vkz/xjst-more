var pp = require("zeHelpers").prettyPrint;

module.exports = function getRenderer() {

  function getInitializers(program, out) {
    var initializers = this.$initializers;
    // Initializers to the initializers array
    // TODO can we ever find new init in the middle of templates like that?
    if (out.init) {
      if (Array.isArray(out.init)) {
        initializers.push.apply(initializers, out.init);
      } else {
        initializers.push(out.init);
      }
    }
    return initializers;
  }

  function renderApply() {
    var $ctxOrThis = 'ctx = ctx || this;',
        $try = '' +
          'try {\n' +
          '  return applyc(ctx, __$ref);\n' +
          '} catch (e) {\n' +
          '  e.xjstContext = ctx;\n' +
          '  throw e;\n' +
          '}\n';
    return [
      'function apply(ctx) {',
      null,                     // ctx = ctx || this
      null,                     // initialize globals
      $try,
      '}'
    ];
  }

  function renderApplyC() {
    return ['function applyc(__$ctx, __$ref) {', null, '}'];
  }

  function renderApplyBody(program, out) {
    var applyBody = [ this.$other ];
    if (out.$apply) applyBody = applyBody.concat(out.$apply);
    if (out.$other) applyBody = applyBody.unshift(out.$other);
    return applyBody;
  }


  function renderDeclareRef() {
    return 'var __$ref = {};';
  }

  function renderExportApply() {
    return 'exports.apply = apply;';
  }

  function renderInvokeInitializers(initializers) {
    return '' +
      '[ ' + initializers.join(', ') + ' ].forEach(function(fn) {\n' +
      '    fn(exports, this);\n' +
      '}, {\n' +
      '    recordExtensions: function(ctx) {\n' +
      this.$recordExtensions +
      '    },\n' +
      '    resetApplyNext: function(ctx) {\n' +
      this.$resetApplyNext +
      '    }\n' +
      '});\n';
  }

  function renderDeclareGlobals(stmts) {
    stmts.unshift(this.$declareGlobals);
  }

  function renderInitializeGlobals(apply) {
    apply[2] = this.$initializeGlobals;
  }

  function renderCtxOrThis(apply) {
    apply[1] = 'ctx = ctx || this;';
  }

  function setApplyBody(applyc, body) {
    applyc[1] = body;
  }

  return {
    getInitializers: getInitializers,
    setApplyBody: setApplyBody,
    renderApply: renderApply,
    renderApplyC: renderApplyC,
    renderApplyBody: renderApplyBody,
    renderDeclareRef: renderDeclareRef,
    renderExportApply: renderExportApply,
    renderInvokeInitializers: renderInvokeInitializers,
    renderDeclareGlobals: renderDeclareGlobals,
    renderInitializeGlobals: renderInitializeGlobals,
    renderCtxOrThis: renderCtxOrThis
  };
};
