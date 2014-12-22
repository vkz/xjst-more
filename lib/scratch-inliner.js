var inliner = require("./helpers/inliner").Inliner.create(),
    pp = require('zeHelpers').prettyPrint,
    esgen = require('escodegen').generate;

// example of a body that definitely gets inlined
// this.inliner.inline(body)
var body = {
  type: "BlockStatement",
  body: [ 
    { type: 'ExpressionStatement',
      expression: 
      { type: 'CallExpression',
        callee: 
        { type: 'FunctionExpression',
          id: { type: 'Identifier', name: '__$lb__$14' },
          params: [],
          defaults: [],
          rest: null,
          generator: false,
          expression: false,
          body: 
          { type: 'BlockStatement',
            body: 
            [ { type: 'VariableDeclaration',
                kind: 'var',
                declarations: 
                [ { type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: '__$r__$15' },
                    init: null } ] },
              { type: 'VariableDeclaration',
                kind: 'var',
                declarations: 
                [ { type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: '__$l0__$16' },
                    init: 
                    { type: 'MemberExpression',
                      computed: false,
                      object: { type: 'Identifier', name: '__$ctx' },
                      property: { type: 'Identifier', name: '_menuMods' } } } ] },
              { type: 'ExpressionStatement',
                expression: 
                { type: 'AssignmentExpression',
                  operator: '=',
                  left: 
                  { type: 'MemberExpression',
                    computed: false,
                    object: { type: 'Identifier', name: '__$ctx' },
                    property: { type: 'Identifier', name: '_menuMods' } },
                  right: 
                  { type: 'ObjectExpression',
                    properties: 
                    [ { type: 'Property',
                        key: 
                        { type: 'Identifier',
                          name: 'theme',
                          loc: 
                          { start: { line: 1334, column: 16 },
                            end: { line: 1334, column: 21 } } },
                        value: 
                        { type: 'MemberExpression',
                          computed: false,
                          object: 
                          { type: 'MemberExpression',
                            computed: false,
                            object: { type: 'Identifier', name: '__$ctx' },
                            property: 
                            { type: 'Identifier',
                              name: 'mods',
                              loc: 
                              { start: { line: 1334, column: 29 },
                                end: { line: 1334, column: 33 } } },
                            loc: 
                            { start: { line: 1334, column: 24 },
                              end: { line: 1334, column: 33 } } },
                          property: 
                          { type: 'Identifier',
                            name: 'theme',
                            loc: 
                            { start: { line: 1334, column: 34 },
                              end: { line: 1334, column: 39 } } },
                          loc: 
                          { start: { line: 1334, column: 24 },
                            end: { line: 1334, column: 39 } } },
                        kind: 'init',
                        loc: 
                        { start: { line: 1334, column: 16 },
                          end: { line: 1334, column: 39 } } },
                      { type: 'Property',
                        key: 
                        { type: 'Identifier',
                          name: 'disabled',
                          loc: 
                          { start: { line: 1335, column: 16 },
                            end: { line: 1335, column: 24 } } },
                        value: 
                        { type: 'MemberExpression',
                          computed: false,
                          object: 
                          { type: 'MemberExpression',
                            computed: false,
                            object: { type: 'Identifier', name: '__$ctx' },
                            property: 
                            { type: 'Identifier',
                              name: 'mods',
                              loc: 
                              { start: { line: 1335, column: 32 },
                                end: { line: 1335, column: 36 } } },
                            loc: 
                            { start: { line: 1335, column: 27 },
                              end: { line: 1335, column: 36 } } },
                          property: 
                          { type: 'Identifier',
                            name: 'disabled',
                            loc: 
                            { start: { line: 1335, column: 37 },
                              end: { line: 1335, column: 45 } } },
                          loc: 
                          { start: { line: 1335, column: 27 },
                            end: { line: 1335, column: 45 } } },
                        kind: 'init',
                        loc: 
                        { start: { line: 1335, column: 16 },
                          end: { line: 1335, column: 45 } } } ],
                    loc: 
                    { start: { line: 1333, column: 24 },
                      end: { line: 1336, column: 13 } } } } },
              { type: 'ExpressionStatement',
                expression: 
                { type: 'AssignmentExpression',
                  operator: '=',
                  left: { type: 'Identifier', name: '__$r__$15' },
                  right: 
                  { type: 'CallExpression',
                    callee: 
                    { type: 'FunctionExpression',
                      id: { type: 'Identifier', name: '__$lb__$17' },
                      params: [],
                      defaults: [],
                      rest: null,
                      generator: false,
                      expression: false,
                      body: 
                      { type: 'BlockStatement',
                        body: 
                        [ { type: 'VariableDeclaration',
                            kind: 'var',
                            declarations: 
                            [ { type: 'VariableDeclarator',
                                id: { type: 'Identifier', name: '__$r__$18' },
                                init: null } ] },
                          { type: 'VariableDeclaration',
                            kind: 'var',
                            declarations: 
                            [ { type: 'VariableDeclarator',
                                id: { type: 'Identifier', name: '__$l1__$19' },
                                init: 
                                { type: 'MemberExpression',
                                  computed: false,
                                  object: { type: 'Identifier', name: '__$ctx' },
                                  property: { type: 'Identifier', name: '__$a0' } } } ] },
                          { type: 'ExpressionStatement',
                            expression: 
                            { type: 'AssignmentExpression',
                              operator: '=',
                              left: 
                              { type: 'MemberExpression',
                                computed: false,
                                object: { type: 'Identifier', name: '__$ctx' },
                                property: { type: 'Identifier', name: '__$a0' } },
                              right: 
                              { type: 'BinaryExpression',
                                operator: '|',
                                left: 
                                { type: 'MemberExpression',
                                  computed: false,
                                  object: { type: 'Identifier', name: '__$ctx' },
                                  property: { type: 'Identifier', name: '__$a0' } },
                                right: { type: 'Literal', value: 16 } } } },
                          { type: 'ExpressionStatement',
                            expression: 
                            { type: 'AssignmentExpression',
                              operator: '=',
                              left: { type: 'Identifier', name: '__$r__$18' },
                              right: 
                              { type: 'CallExpression',
                                callee: { type: 'Identifier', name: 'applyc' },
                                arguments: 
                                [ { type: 'Identifier', name: '__$ctx' },
                                  { type: 'Identifier', name: '__$ref' } ] } } },
                          { type: 'ExpressionStatement',
                            expression: 
                            { type: 'AssignmentExpression',
                              operator: '=',
                              left: 
                              { type: 'MemberExpression',
                                computed: false,
                                object: { type: 'Identifier', name: '__$ctx' },
                                property: { type: 'Identifier', name: '__$a0' } },
                              right: { type: 'Identifier', name: '__$l1__$19' } } },
                          { type: 'ReturnStatement',
                            argument: { type: 'Identifier', name: '__$r__$18' } } ] } },
                    arguments: [] } } },
              { type: 'ExpressionStatement',
                expression: 
                { type: 'AssignmentExpression',
                  operator: '=',
                  left: 
                  { type: 'MemberExpression',
                    computed: false,
                    object: { type: 'Identifier', name: '__$ctx' },
                    property: { type: 'Identifier', name: '_menuMods' } },
                  right: { type: 'Identifier', name: '__$l0__$16' } } },
              { type: 'ReturnStatement',
                argument: { type: 'Identifier', name: '__$r__$15' } } ] } },
        arguments: [] },
      loc: 
      { start: { line: 1332, column: 8 },
        end: { line: 1337, column: 11 } } },
    { type: 'ExpressionStatement',
      expression: 
      { type: 'UnaryExpression',
        operator: 'delete',
        argument: 
        { type: 'MemberExpression',
          computed: false,
          object: { type: 'Identifier', name: '__$ctx' },
          property: 
          { type: 'Identifier',
            name: '_menuTheme',
            loc: 
            { start: { line: 1338, column: 20 },
              end: { line: 1338, column: 30 } } },
          loc: 
          { start: { line: 1338, column: 15 },
            end: { line: 1338, column: 30 } } },
        prefix: true,
        loc: 
        { start: { line: 1338, column: 8 },
          end: { line: 1338, column: 30 } } },
      loc: 
      { start: { line: 1338, column: 8 },
        end: { line: 1338, column: 31 } } },
    { type: 'ReturnStatement', argument: null } ]
};

var inlinedBody = inliner.inline(body);
var inlinedAsStrings = inlinedBody.body.map(esgen);
var inlinedAsString = inlinedAsStrings.join('n');

pp({
  inlinedBody : inliner.inline(body),
  inlinedAsStrings : inlinedBody.body.map(esgen),
  inlinedAsString : inlinedAsStrings.join('n')
});
