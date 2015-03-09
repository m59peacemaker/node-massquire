var test = require("tape");
var massquire = require("../");

var moduleDirname = __dirname+"/modules";

test("returns object if no modules found", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname+"/none");
  t.equal(typeof modules, "object");
});

test("recursively builds object of modules from files", function(t) {
  t.plan(2);
  var modules = massquire(moduleDirname);
  t.equal(modules.foo, "foo");
  t.equal(modules.sub.foo, "foo");
});

test("optionally isn't recursive", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname, {
    recursive: false
  });
  t.false(modules.sub);
});

test("applies resolve fn to module value", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname, {
    resolve: function(module) {
      if (typeof module === "string") {
        return module.toUpperCase();
      }
      return module;
    }
  });
  t.equal(modules.foo, "FOO");
});

test("camelCases and strips .js and .json from keys by default", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname+"/format");
  t.equal(Object.keys(modules)[0], "formatThisModule");
});

test("applies opts.map fn to property names", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname, {
    map: function(prop) {
      return prop.toUpperCase();
    }
  });
  t.true(~Object.keys(modules).indexOf("FOO.JS"));
});

test("optionally excludes directories", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname, {
    exclude: [/^\./, "match.js"]
  });
  t.false(modules.exclude);
});

test("only includes modules that match opts.match", function(t) {
  t.plan(2);
  var modules = massquire(moduleDirname, {
    match: ["match.js"]
  });
  var keys = Object.keys(modules);
  t.equal(keys.length, 1);
  t.equal(keys[0], "match");
});
