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
  var modules = massquire(moduleDirname+"/require");
  t.equal(modules.foo, "foo");
  t.equal(modules.sub.foo, "foo");
});

test("optionally isn't recursive", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname+"/require", {
    recurse: false
  });
  t.false(modules.sub);
});

test("applies resolve fn to module value", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname+"/resolve", {
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
  var modules = massquire(moduleDirname+"/map");
  t.equal(Object.keys(modules)[0], "mapThis");
});

test("applies opts.map fn to property names", function(t) {
  t.plan(1);
  var modules = massquire(moduleDirname+"/map", {
    map: function(prop) {
      return prop.toUpperCase();
    }
  });
  t.true(~Object.keys(modules).indexOf("MAP-THIS.JS"));
});

test("optionally includes only matching directories", function(t) {
  t.plan(2);
  var modules = massquire(moduleDirname+"/match-dir", {
    includeDir: function(path) {
      var p = path.split("/");
      return p[p.length-1] === "foo";
    }
  });
  t.true(modules.foo);
  t.false(modules.bar);
});

test("optionally excludes matching directories", function(t) {
  t.plan(2);
  var modules = massquire(moduleDirname+"/match-dir", {
    excludeDir: function(path) {
      var p = path.split("/");
      return p[p.length-1] === "bar";
    }
  });
  t.true(modules.foo);
  t.false(modules.bar);
});

test("optionally includes only matching files", function(t) {
  t.plan(2);
  var modules = massquire(moduleDirname+"/match-file", {
    include: function(path) {
      var p = path.split("/");
      return p[p.length-1] === "foo.js";
    }
  });
  t.true(modules.foo);
  t.false(modules.bar);
});

test("optionally excludes matching files", function(t) {
  t.plan(2);
  var modules = massquire(moduleDirname+"/match-file", {
    exclude: function(path) {
      var p = path.split("/");
      return p[p.length-1] === "bar.js";
    }
  });
  t.true(modules.foo);
  t.false(modules.bar);
});
