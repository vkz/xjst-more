module.exports = function getRenderer() {

  function getInitializers(program, out) {
    var initializers = program.init.slice();
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
    return {
      type: 'FunctionDeclaration',
      id: { type: 'Identifier', name: 'apply' },
      params: [{ type: 'Identifier', name: 'ctx' }],
      defaults: [],
      rest: null,
      generator: false,
      expression: false,
      body: {
        type: 'BlockStatement',
        // TODO replace with $ctxOrThis + $initializeGlobals + $try
        body: [{
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            body: [{
              type: 'ReturnStatement',
              argument: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'applyc' },
                arguments: [{ type: 'Identifier', name: 'ctx' }, this.ref]
              }
            }]
          },
          guardedHandlers: [],
          handlers: [{
            type: 'CatchClause',
            param: { type: 'Identifier', name: 'e' },
            body: {
              type: 'BlockStatement',
              body: [{
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: { type: 'Identifier', name: 'e' },
                    property: { type: 'Identifier', name: 'xjstContext' }
                  },
                  right: { type: 'Identifier', name: 'ctx' }
                }
              }, {
                type: 'ThrowStatement',
                argument: { type: 'Identifier', name: 'e' }
              }]
            }
          }],
          finalizer: null
        }]
      }
    };
  }

  function renderApplyC(applyBody) {
    return {
      type: 'FunctionDeclaration',
      id: { type: 'Identifier', name: 'applyc' },
      params: [ this.ctx, this.ref ],
      defaults: [],
      rest: null,
      generator: false,
      expression: false,
      body: {
        type: 'BlockStatement',
        body: null
      }
    };
  }

  function renderApplyBody(program, out) {
    var applyBody = program.other;
    if (out.apply) applyBody = applyBody.concat(out.apply);
    if (out.other) applyBody = applyBody.unshift(out.other);
    return applyBody;
  }


  function renderDeclareRef() {
    return {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [{
        type: 'VariableDeclarator',
        id: this.ref,
        init: { type: 'ObjectExpression', properties: [] }
      }]
    };
  }

  function renderExportApply() {
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: false,
          object: { type: 'Identifier', name: 'exports' },
          property: { type: 'Identifier', name: 'apply' }
        },
        right: { type: 'Identifier', name: 'apply' }
      }
    };
  }

  function renderInvokeInitializers(initializers) {
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          property: { type: 'Identifier', name: 'forEach'},
          object: {
            type: 'ArrayExpression',
            elements: initializers
          }
        },
        arguments: [{
          type: 'FunctionExpression',
          id: null,
          params: [ { type: 'Identifier', name: 'fn' } ],
          defaults: [],
          rest: null,
          generator: false,
          expression: false,
          body: {
            type: 'BlockStatement',
            body: [{
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'fn' },
                arguments: [
                  { type: 'Identifier', name: 'exports' },
                  { type: 'ThisExpression' }
                ]
              }
            }]
          }
        }, {
          type: 'ObjectExpression',
          properties: [{
            type: 'Property',
            key: { type: 'Literal', value: 'recordExtensions' },
            value: this.getRecordExtensions(),
            kind: 'init'
          }, {
            // TODO this doesn't generate proper reset bodies, cause I'm missing
            // correct this.applyNext.count info. Fix this in compiler merge?
            type: 'Property',
            key: { type: 'Literal', value: 'resetApplyNext' },
            value: this.getResetApplyNext(),
            kind: 'init'
          }]
        }]
      }
    };
  }

  function renderDeclareGlobals(stmts) {
    var globals = this.globals;
    var globalInit = this.globalInit;
    var globalKeys = Object.keys(globals);
    if (globalKeys.length !== 0) {
      stmts.unshift({
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: globalKeys.map(function(name) {
          return {
            type: 'VariableDeclarator',
            id: { type: 'Identifier', name: name },
            init: { type: 'Literal', value: globals[name] }
          };
        }, this)
      });
    }
  }

  function renderInitializeGlobals(apply) {
    var globals = this.globals;
    var globalInit = this.globalInit;
    var globalKeys = Object.keys(globals);
    if (globalKeys.length !== 0) {
      globalKeys.forEach(function(name) {
          // Initialize globals from the context if asked
          if (globalInit[name]) {
            apply.body.body.unshift({
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: { type: 'Identifier', name: name },
                right: {
                  type: 'MemberExpression',
                  computed: true,
                  object: { type: 'Identifier', name: 'ctx' },
                  property: { type: 'Literal', value: globalInit[name] }
                }
              }
            });
          }
        }, this)
    }
  }

  function renderCtxOrThis(apply) {
    var applyContext = {
      type: 'LogicalExpression',
      operator: '||',
      left: { type: 'Identifier', name: 'ctx' },
      right: { type: 'ThisExpression' }
    };
    apply.body.body.unshift({
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: { type: 'Identifier', name: 'ctx' },
        right: applyContext
      }
    });
  }

  function setApplyBody(applyc, body) { applyc.body.body = body; }

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
