var fs       = require('fs');
var camelize = require("underscore.string/camelize");

module.exports = massquire;

function massquire(dirname, opts) {
  if (!dirname.length || typeof dirname !== 'string') { throw new Error('invalid dirname'); }
  opts = opts || {};
  opts.resolve = opts.resolve || noopVal;
  opts.map = opts.map || defMap;
  opts.recurse = opts.recurse === false ? false : true;
  opts.includeDir = opts.includeDir || noopTrue;
  opts.excludeDir = opts.excludeDir || noopFalse;
  opts.include = opts.include || noopTrue;
  opts.exclude = opts.exclude || noopFalse;

  var modules = {};
  fs.readdirSync(dirname).forEach(function(file) {
    //if (shouldExclude(file, opts.exclude) || !shouldInclude(file, opts.match)) { return; }
    var key = opts.map(file);
    var filepath = dirname+'/'+file;
    if (fs.statSync(filepath).isDirectory()) {
      if (opts.recurse && opts.includeDir(filepath) && !opts.excludeDir(filepath)) {
        modules[key] = massquire(filepath, opts);
      }
    } else if(opts.include(filepath) && !opts.exclude(filepath)) {
      modules[key] = opts.resolve(require(filepath));
    }
  });
  return modules;
}

function noopVal(v) { return v; }
function noopTrue() { return true; }
function noopFalse() { return false; }
function defMap(filename) {
  key = strip(filename).replace('.', '-');
  return camelize(key);
}
function strip(str) {
  // strip leading dot so that the next letter won't be capitalized
  str = str.replace(/^\./, '');
  return str.replace(/\.js(on)?$/, '');
}
/*
function shouldExclude(file, excludes) {
  if (!excludes || !excludes.length) { return false; }
  return excludes.some(function(exclude) {
    return file.match(exclude);
  });
}
function shouldInclude(file, includes) {
  if (!includes || !includes.length) { return true; }
  return includes.some(function(include) {
    return file.match(include);
  });
}*/
