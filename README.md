# karma-commonjs-preprocessor

> Preprocessor to wrap CoffeScript or Javascript Files into CommonJS Format on the fly.

## Installation

The easiest way is to keep `karma-commonjs-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-commonjs-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-commons-preprocessor --save-dev
```

## CommonJS register/loader

This plugin was developed based on the CommonJS Loader from brunch.io. So since the files get wrapped into a require.register() function call you need to load a appropiate handler first. You can use https://github.com/brunch/commonjs-require-definition (e.g. load 'bower_components/commonjs-require-definition/require.js' in the karma file list first) for this or just embed a file build from brunch first.


## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.coffee': ['commonjs']
    }
  });
};
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
