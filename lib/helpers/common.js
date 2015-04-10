exports.addBemOptions = function addBemOptions(options) {
  var result = options || {};
  // TODO __$ctx and __$ref belong in the globals

  if (!result.globalInit)
    result.globalInit = {
      mode: '_mode',
      block: 'block',
      elem: 'elem',
      elemMods: 'elemMods',
      mods: 'mods'
    };

  if (!result.globals)
    result.globals = {
      mode: '',
      block: '',
      elem: '',
      elemMods: null,
      mods: null
    };

  if (!result.scoreFilter)
    result.scoreFilter = _bumpMode;

  return result;
}

// Ensure that `this._mode` predicate is always top-level
function _bumpMode(ast) {
  if (ast.type !== 'MemberExpression' || ast.computed)
    return 0;
  var obj = ast.object;
  var prop = ast.property;
  if (obj.type !== 'Identifier' || obj.name !== '__$ctx')
    return 0;
  if (prop.type !== 'Identifier' || prop.name !== '_mode')
    return 0;

  return Infinity;
};
