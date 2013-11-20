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

## How is this different from karma-commonjs?

[karma-commonjs](https://github.com/karma-runner/karma-commonjs) is a complete framework handling wrapping, register and loading all defined files in commonjs. If one wants to only wrap coffee- or javascript-files into the commonjs format and having some other modules handling the registering and loading this plugin is for you. That's why its just a preprocessor and not a complete framework.

The wrapper code is based on [brunch.io](https://github.com/brunch/brunch) and adapted from [grunt-commonjs-coffee](https://github.com/tuxracer/grunt-commonjs-coffee).

So if you have existing bundles which are build from brunch or do include [brunchs require.js](https://github.com/brunch/commonjs-require-definition) directly you can use this preprocessor.

## Why not just bundling before running karma?

Creating a single bundle means "recompiling" the bundle anytime any file changes. On big project, this can significantly slow down the development. This plugin processes only files that changed.


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

## Credits

This plugin is basically a mix between [grunt-commonjs-coffee](https://github.com/tuxracer/grunt-commonjs-coffee) and [karma-commonjs](https://github.com/karma-runner/karma-commonjs) adapted to work with karma instead.

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
