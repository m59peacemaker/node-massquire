# Massquire

Similar to [require-all](https://www.npmjs.com/package/require-all), `massquire` requires directories of modules into objects.

## Install
```
npm install massquire
```

## Usage
```javascript
var massquire = require('massquire');

var modules = massquire(dirname, opts);
```

### Parameters

#### dirname

Type: `String`

The name of the directory (path) that should be required.

#### opts

Type: `Object`

##### opts.recurse

Type: `Boolean`  
Default: true

Requires all modules in the given directory and its subdirectories by default. Set `recurse` to `false` to require only the given directory.

##### opts.include

Type: `Function`

Function that receives the full path of a file and should return `true` to include the file.

##### opts.exclude

Type: `Function`

Function that receives the full path of a file and should return `true` to exclude the file.

##### opts.includeDir

Type: `Function`

Function that receives the full path of a directory and should return `true` to include the directory.

##### opts.excludeDir

Type: `Function`

Function that receives the full path of a directory and should return `true` to exclude the directory.

##### opts.map

Type: `Function`  
Default: Strip .js or .json and camelCase

Function that receives the filename for each module and should return the keyname where the module will be stored to the object.

```javascript
function(filename) {
  // format the filename
  return key;
}
```

##### opts.resolve

Type: `Function`

Function that receives each required module and should return the desired module value.

```javascript
function(module) {
  return module();
}
```
