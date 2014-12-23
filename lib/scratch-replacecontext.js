var estraverse = require("estraverse");
var pp = require("zeHelpers").prettyPrint;
var esgen = require('escodegen').generate;
var parse = require("esprima").parse;
var utils = require('./utils');


function replaceContext(ast) {
  var globals = {
    _mode: '$$mode',
    block: '$$block',
    elem: '$$elem',
    elemMods: '$$elemMods',
    mods: '$$mods'
  };

  function translateProp(prop) {
    if (globals.hasOwnProperty(prop))
      return globals[prop];
    else
      return false;
  };

  var applyc = [];
  var map = null;

  return estraverse.replace(ast, {
    // looks like applyc.push() and applyc.pop() are there only to
    // ensure that we skip these nodes and remember that we did
    // so. Seems excessive. There must be a better algorithm.
    enter: function(node) {
      var isFunction = node.type === 'FunctionDeclaration' ||
                       node.type === 'FunctionExpression';
      var id = node.id && node.id.name;
      if (applyc.length === 0 &&                     //recur
          isFunction &&
          (map !== null || /^(applyc|__\$[bg]\d+)$/.test(id))) {
        applyc.push(node);
      } else if (applyc.length === 0 &&              //skip
                 node.type === 'VariableDeclarator' &&
                 /^__\$m\d+$/.test(id)) {
        map = node;
      } else if (isFunction && /^__\$lb/.test(id)) { //recur
        applyc.push(node);
      } else if (applyc.length === 0) {              //skip
        return;
      }

      if (applyc[applyc.length - 1] !== node && isFunction) {
        return;                 //effectively perform the `skip', proceed with `recur'
      } 

      // perform $ctx replacement in `recur' nodes
      if (node.type === 'MemberExpression' &&
          node.computed === false &&
          node.object.type === 'Identifier' &&
          node.object.name === '__$ctx') {
        var prop = translateProp(node.property.name || node.property.value);
        if (!prop)
          return;

        return { type: 'Identifier', name: prop };
      }
    },
    leave: function(node) {
      if (applyc[applyc.length - 1] === node)
        applyc.pop();
      if (node === map)
        map = null;
    }
  });
};

var ast = { type: 'BlockStatement',
            body: 
            [ { type: 'VariableDeclaration',
                declarations: 
                [ { type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'temp__$0' },
                    init: 
                    { type: 'Literal',
                      value: 'v1',
                      raw: '\'v1\'',
                      loc: { start: { line: 5, column: 11 }, end: { line: 5, column: 15 } } } } ],
                kind: 'var',
                loc: { start: { line: 5, column: 0 }, end: { line: 5, column: 16 } } },
              { type: 'ReturnStatement',
                argument: 
                { type: 'ArrayExpression',
                  elements: 
                  [ { type: 'CallExpression',
                      callee: 
                      { type: 'FunctionExpression',
                        id: { type: 'Identifier', name: '__$lb__$1' },
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
                                  id: { type: 'Identifier', name: '__$r__$2' },
                                  init: null } ] },
                            { type: 'VariableDeclaration',
                              kind: 'var',
                              declarations: 
                              [ { type: 'VariableDeclarator',
                                  id: { type: 'Identifier', name: '__$l2__$3' },
                                  init: 
                                  { type: 'MemberExpression',
                                    computed: false,
                                    object: { type: 'Identifier', name: '__$ctx' },
                                    property: { type: 'Identifier', name: 'mods' } } } ] },
                            { type: 'VariableDeclaration',
                              kind: 'var',
                              declarations: 
                              [ { type: 'VariableDeclarator',
                                  id: { type: 'Identifier', name: '__$l0__$4' },
                                  init: 
                                  { type: 'MemberExpression',
                                    computed: false,
                                    object: { type: 'Identifier', name: '__$l2__$3' },
                                    property: { type: 'Identifier', name: 'm1' } } } ] },
                            { type: 'ExpressionStatement',
                              expression: 
                              { type: 'AssignmentExpression',
                                operator: '=',
                                left: 
                                { type: 'MemberExpression',
                                  computed: false,
                                  object: { type: 'Identifier', name: '__$l2__$3' },
                                  property: { type: 'Identifier', name: 'm1' } },
                                right: { type: 'Identifier', name: 'temp__$0' } } },
                            { type: 'VariableDeclaration',
                              kind: 'var',
                              declarations: 
                              [ { type: 'VariableDeclarator',
                                  id: { type: 'Identifier', name: '__$r__$6' },
                                  init: null } ] },
                            { type: 'VariableDeclaration',
                              kind: 'var',
                              declarations: 
                              [ { type: 'VariableDeclarator',
                                  id: { type: 'Identifier', name: '__$l1__$7' },
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
                                  right: { type: 'Literal', value: 1 } } } },
                            { type: 'ExpressionStatement',
                              expression: 
                              { type: 'AssignmentExpression',
                                operator: '=',
                                left: { type: 'Identifier', name: '__$r__$6' },
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
                                right: { type: 'Identifier', name: '__$l1__$7' } } },
                            { type: 'ExpressionStatement',
                              expression: 
                              { type: 'AssignmentExpression',
                                operator: '=',
                                left: { type: 'Identifier', name: '__$r__$2' },
                                right: { type: 'Identifier', name: '__$r__$6' } } },
                            { type: 'ExpressionStatement',
                              expression: 
                              { type: 'AssignmentExpression',
                                operator: '=',
                                left: 
                                { type: 'MemberExpression',
                                  computed: false,
                                  object: { type: 'Identifier', name: '__$l2__$3' },
                                  property: { type: 'Identifier', name: 'm1' } },
                                right: { type: 'Identifier', name: '__$l0__$4' } } },
                            { type: 'ReturnStatement',
                              argument: { type: 'Identifier', name: '__$r__$2' } } ] } },
                      arguments: [] },
                    { type: 'Literal',
                      value: 'b',
                      raw: '\'b\'',
                      loc: { start: { line: 6, column: 38 }, end: { line: 6, column: 41 } } } ],
                  loc: { start: { line: 6, column: 7 }, end: { line: 6, column: 42 } } },
                loc: { start: { line: 6, column: 0 }, end: { line: 6, column: 43 } } } ] 
          };

var inlinedAst = { type: 'BlockStatement',
                   body: 
                   [ { type: 'VariableDeclaration',
                       declarations: 
                       [ { type: 'VariableDeclarator',
                           id: { type: 'Identifier', name: 'temp__$0' },
                           init: 
                           { type: 'Literal',
                             value: 'v1',
                             raw: '\'v1\'',
                             loc: { start: { line: 5, column: 11 }, end: { line: 5, column: 15 } } } } ],
                       kind: 'var',
                       loc: { start: { line: 5, column: 0 }, end: { line: 5, column: 16 } } },
                     { type: 'ReturnStatement',
                       argument: 
                       { type: 'ArrayExpression',
                         elements: 
                         [ { type: 'CallExpression',
                             callee: 
                             { type: 'FunctionExpression',
                               id: { type: 'Identifier', name: '__$lb__$1' },
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
                                         id: { type: 'Identifier', name: '__$r__$2' },
                                         init: null } ] },
                                   { type: 'VariableDeclaration',
                                     kind: 'var',
                                     declarations: 
                                     [ { type: 'VariableDeclarator',
                                         id: { type: 'Identifier', name: '__$l2__$3' },
                                         init: 
                                         { type: 'MemberExpression',
                                           computed: false,
                                           object: { type: 'Identifier', name: '__$ctx' },
                                           property: { type: 'Identifier', name: 'mods' } } } ] },
                                   { type: 'VariableDeclaration',
                                     kind: 'var',
                                     declarations: 
                                     [ { type: 'VariableDeclarator',
                                         id: { type: 'Identifier', name: '__$l0__$4' },
                                         init: 
                                         { type: 'MemberExpression',
                                           computed: false,
                                           object: { type: 'Identifier', name: '__$l2__$3' },
                                           property: { type: 'Identifier', name: 'm1' } } } ] },
                                   { type: 'ExpressionStatement',
                                     expression: 
                                     { type: 'AssignmentExpression',
                                       operator: '=',
                                       left: 
                                       { type: 'MemberExpression',
                                         computed: false,
                                         object: { type: 'Identifier', name: '__$l2__$3' },
                                         property: { type: 'Identifier', name: 'm1' } },
                                       right: { type: 'Identifier', name: 'temp__$0' } } },
                                   { type: 'VariableDeclaration',
                                     kind: 'var',
                                     declarations: 
                                     [ { type: 'VariableDeclarator',
                                         id: { type: 'Identifier', name: '__$r__$6' },
                                         init: null } ] },
                                   { type: 'VariableDeclaration',
                                     kind: 'var',
                                     declarations: 
                                     [ { type: 'VariableDeclarator',
                                         id: { type: 'Identifier', name: '__$l1__$7' },
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
                                         right: { type: 'Literal', value: 1 } } } },
                                   { type: 'ExpressionStatement',
                                     expression: 
                                     { type: 'AssignmentExpression',
                                       operator: '=',
                                       left: { type: 'Identifier', name: '__$r__$6' },
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
                                       right: { type: 'Identifier', name: '__$l1__$7' } } },
                                   { type: 'ExpressionStatement',
                                     expression: 
                                     { type: 'AssignmentExpression',
                                       operator: '=',
                                       left: { type: 'Identifier', name: '__$r__$2' },
                                       right: { type: 'Identifier', name: '__$r__$6' } } },
                                   { type: 'ExpressionStatement',
                                     expression: 
                                     { type: 'AssignmentExpression',
                                       operator: '=',
                                       left: 
                                       { type: 'MemberExpression',
                                         computed: false,
                                         object: { type: 'Identifier', name: '__$l2__$3' },
                                         property: { type: 'Identifier', name: 'm1' } },
                                       right: { type: 'Identifier', name: '__$l0__$4' } } },
                                   { type: 'ReturnStatement',
                                     argument: { type: 'Identifier', name: '__$r__$2' } } ] } },
                             arguments: [] },
                           { type: 'Literal',
                             value: 'b',
                             raw: '\'b\'',
                             loc: { start: { line: 6, column: 38 }, end: { line: 6, column: 41 } } } ],
                         loc: { start: { line: 6, column: 7 }, end: { line: 6, column: 42 } } },
                       loc: { start: { line: 6, column: 0 }, end: { line: 6, column: 43 } } } ] }




// var result1 = replaceContext(inlinedAst);
// pp(result1, {prompt: 'body'});
// pp(esgen(result1), {prompt: 'string'});

var ast2 = parse("function __$lb__$2() {var url__$110 = __$ctx.ctx.url; var __$r__$112; var __$l0__$113 = __$ctx._mode; __$ctx._mode = ''; var __$l1__$114 = __$ctx.ctx; __$ctx.ctx = [6, 7, 8, 9].map(function (v) {return {elem: 'css', url: url__$110 + '.ie' + v + '.css', ie: 'IE ' + v};}); var __$r__$116; var __$l2__$117 = __$ctx.__$a0; __$ctx.__$a0 = __$ctx.__$a0 | 65536; __$r__$116 = applyc(__$ctx, __$ref); __$ctx.__$a0 = __$l2__$117; __$r__$112 = __$r__$116; __$ctx._mode = __$l0__$113; __$ctx.ctx = __$l1__$114; return 0;}"); 
var result2 = replaceContext(ast2);
pp(result2, {prompt: 'body'});
pp(esgen(result2), {prompt: 'string'});


// var ast3 = parse("var __$l0__$113 = __$ctx._mode; __$ctx._mode = ''; __$ctx._mode = __$l0__$113;");
// var result3 = replaceContext(ast3);
// pp(result3, {prompt: 'body'});
// pp(esgen(result3), {prompt: 'string'});

