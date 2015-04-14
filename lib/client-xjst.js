var xjst = require('./');
var util = require('util');

// Helpers
var Inliner = xjst.Inliner;
var Splitter = xjst.Splitter;
var MapFlattener = xjst.MapFlattener;
var Jailer = xjst.Jailer;
var utils = xjst.utils;

// Entities
var Template = xjst.clientTemplate;
var Predicate = xjst.clientPredicate;
var Group = xjst.clientGroup;
var Map = xjst.clientMap;

var helpers = {
  Inliner: Inliner,
  Splitter: Splitter,
  MapFlattener: MapFlattener,
  Jailer: Jailer,
  utils: utils
};

var entities = {
  Template: Template,
  Predicate: Predicate,
  Group: Group,
  Map: Map
};

var getXjstConstructor = require('./xjst');
var GenericCompiler = getXjstConstructor(entities, helpers, true);

function Compiler(options) {
  GenericCompiler.call(this, options);
}
util.inherits(Compiler, GenericCompiler);

Compiler.prototype.preTranslate = function preTranslate(input) {
  // input: [ Template ]
  var program = {
    templates: input,
    init : this.inputProgram.init,
    other : this.inputProgram.other
  };
  return program;
}

Compiler.prototype.merge =function merge(compiler) {
  var mergeIdMap = {},
      extensions = compiler.extensions,
      code = compiler.code,
      idHash = compiler.idHash,
      oldIdHash = this.idHash,
      revIdHash = compiler.revIdHash,
      oldRevIdHash = this.revIdHash,
      scores = compiler.scores,
      idCount = compiler.idCount,
      bodyUid = compiler.bodyUid,
      inputProgram = compiler.inputProgram,
      init = inputProgram.init,
      other = inputProgram.other;

  this.code += code || '';

  // TODO: inputProgram seems an artefact of older xjst. Can I ditch it and get
  // init & other from this.program?

  // merge extensions, init & other
  if (this.isFreshCompiler) {
    this.extensions = extensions;
    this.inputProgram = inputProgram;
  } else {
    Object.keys(extensions).forEach(function (key) {
      this.extensions[key] = extensions[key];
    }, this);
    this.inputProgram.init = this.inputProgram.init.concat(init);
    this.inputProgram.other = this.inputProgram.other.concat(other);
  }

  // merge idHash & revIdHash, increment idCount by the number of new keys
  Object.keys(idHash).forEach(function (key) {
    var hash = idHash[key],
        id = hash.id,
        newId;

    if (oldIdHash.hasOwnProperty(key)) {
      oldIdHash[key].score += hash.score;
    } else {
      newId = this.idCount++;
      oldRevIdHash[newId] = oldIdHash[key] = {
        id: newId,
        key: key,
        value: hash.value,
        score: hash.score
      };
    }
    // NOTE preserve correct hash so that I can fix ids in new Templates when
    // switching compilers
    mergeIdMap[id] = oldIdHash[key];
  }, this);

  // merge scores
  Object.keys(scores).forEach(function (key) {
    if (this.scores.hasOwnProperty(key)) {
      var item = this.scores[key],
          values = item.values,
          newItem = scores[key],
          newValues = newItem.values;
      item.count += newItem.count;
      // copy over values that weren't in old templates, increment variance
      Object.keys(newValues).forEach(function (vkey) {
        if (!values.hasOwnProperty(vkey)) {
          values[vkey] = newValues[vkey];
          item.variance++;
        } else {
          values[vkey] += newValues[vkey];
        }
      }, this);
    } else {
      this.scores[key] = scores[key];
    }
  }, this);

  // this.bodyUid += bodyUid;
  this.isFreshCompiler = false;
  this.mergeIdMap = mergeIdMap;

  // merge pre-serialised stuff
  this.$initializers += compiler.$initializers;
  // TODO avoid adding the same statements that the compiler already has
  this.$recordExtensions += compiler.$recordExtensions;
  this.$resetApplyNext += compiler.$resetApplyNext;

  this.$other += compiler.$other;
  this.$declareGlobals += compiler.$declareGlobals;
  this.$initializeGlobals += compiler.$initializeGlobals;
  return this;
};

Compiler.prototype.switchCompilerIn = function switchCompilerIn(templates) {
  var mergeIdMap = this.mergeIdMap,
      bodyUid = this.bodyUid,
      oldBodyUid = bodyUid;

  templates.forEach(function (template) {

    // update predicates to values obtained while merging compilers
    template.predicates.forEach(function(predicate) {
      var oldId = predicate.id,
          oldValueId = predicate.valueId;
      predicate.id = mergeIdMap[oldId].id;
      predicate.valueId = mergeIdMap[oldValueId].id;
      predicate.compiler = this;
    }, this);

    // bump new ids to account for the existance of old templates
    template.uid += oldBodyUid;
    template.body.uid += oldBodyUid;
    bodyUid++;

    template.compiler = template.body.compiler = this;
  }, this);

  // bodyUid should now account for both old and new templates
  this.bodyUid = bodyUid;
  return this;
};

function identity(program) { return program; }

Compiler.prototype.beforeSortGroup = function beforeSortGroup(program) {
  [ identity ].forEach(function (transform) {
    transform.call(this, program);
  }, this);
}

function addRenderMethods(isStringRenderer) {
  var renderer = isStringRenderer ?
        require("./string-renderer")():
        require("./ast-renderer")();

  Compiler.prototype.getInitializers = renderer.getInitializers;
  Compiler.prototype.getApplyBody = renderer.getApplyBody;
  Compiler.prototype.setApplyBody = renderer.setApplyBody;
  Compiler.prototype.renderApply = renderer.renderApply;
  Compiler.prototype.renderApplyC = renderer.renderApplyC;
  Compiler.prototype.renderDeclareRef = renderer.renderDeclareRef;
  Compiler.prototype.renderExportApply = renderer.renderExportApply;
  Compiler.prototype.renderInvokeInitializers = renderer.renderInvokeInitializers;
  Compiler.prototype.renderDeclareGlobals = renderer.renderDeclareGlobals;
  Compiler.prototype.renderInitializeGlobals = renderer.renderInitializeGlobals;
  Compiler.prototype.renderCtxOrThis = renderer.renderCtxOrThis;

}

exports.getCompiler = function (isStringRenderer) {
  addRenderMethods(isStringRenderer);
  return Compiler;
};
