# Massquire

Similar to [require-all](https://www.npmjs.com/package/require-all), `massquire` requires directories of modules into objects.

## Install
```
npm install massquire
```

## Usage

```javascript
var massquire = require('massquire');
```

### Parameters

#### dirname

Type: `String`

The name of the directory (path) that should be required.

#### opts

Type: `Object`

##### opts.recursive

Type: 'Boolean'  
Default: true

Requires all modules in the given directory and its subdirectories by default. Set `recursive` to `false` to require only the given directory.

##### opts.match

Type: Array of RegEx

Only filenames that match this pattern will be required.

##### opts.exclude

Type: Array of RegEx

Filenames that match this pattern will not be required.

##### opts.map

Type: Function  
Default: Strip .js or .json and camelCase

Function that recieves the filename for each module and should return the keyname where the module will be stored to the object.

```javascript
  function(filename) {
    // format the filename
    return key;
  }
```

##### opts.resolve

Type: Function

Function that receives each required module and should return the desired module value.

```javascript
  function(module) {
    return module();
  }
```
