# DEPRECATED WARNING

As we are not using this anymore we will not maintain this anymore. If someone wants to maintain this project, just drop us a line and we will transfer the repo to you. Else we will delete this repo in the next months.


# karma-commonjs-preprocessor

Preprocessor which enables you to load CoffeScript or Javascript CommonJS Modules on the fly using custom register and loader code.

## Installation

The easiest way is to keep `karma-commonjs-preprocessor` as a devDependency in your `package.json`.
```coffeescript
  "devDependencies":
    "karma": "~0.10"
    "karma-commonjs-preprocessor": "~0.1"
```

You can simple do it by:
```bash
npm install karma-commonjs-preprocessor --save-dev
```

## Options

`registerCmd` Allows you to set the name of the function to wrap your module into. Default: "require.register"

`isCoffeeScript` Allows  you to force enable or disable wrapping into coffee-script Format. If its set to false we decide based on the file-extension. Default: false

`pathReplace` Allows you to set filterer function for module names, for example, change all app/file to file. Default: false


```coffeescript
    commonjsPreprocessor:
      options:
        isCoffeeScript: true
        pathReplace: (path) ->
          path.replace(/^app\//, '')
```

## Why not just bundle before running karma?

Creating a single bundle means "recompiling" the bundle anytime any file changes. On big project, this can significantly slow down the development. This plugin processes only files that changed.


## How is this different from karma-commonjs?

[karma-commonjs](https://github.com/karma-runner/karma-commonjs) is a complete framework handling wrapping, registering and loading all files matching the preprocessor.

The wrapper code of this preprocessor is based on [brunch.io](https://github.com/brunch/brunch) and the mechanism adapted from [grunt-commonjs-coffee](https://github.com/tuxracer/grunt-commonjs-coffee). It only wraps your code into a registering function.

So if you have existing bundles which are build from brunch or do include [brunchs require.js](https://github.com/brunch/commonjs-require-definition) directly you can use this preprocessor.

An example karma.conf.coffee could look like this:
```coffeescript
module.exports = (config) ->
  config.set
    files: [
      'bower_components/commonjs-require-definition/require.js'
      'src/**/*.coffee'
      'spec/**/*.coffee'
    ]

    preprocessors:
      'src/**/*.coffee': ['commonjs', 'coffee']
      'spec/**/*.coffee': ['coffee']

    plugins: [
      'karma-coffee-preprocessor',
      'karma-commonjs-preprocessor'
    ]
```

This loads the require.js first and puts `require.register` into the global namespace. It then packages all coffee Files in the src directoy into commonjs modules and last but not least just executes the specs.

The resulting registering Code looks like this:

```javascript
window.require.register({'PATH/TO/FILE.JS': function(exports, require, module) {
  FILE_CONTENT
}})
```


## Credits

This plugin is basically a mix between [grunt-commonjs-coffee](https://github.com/tuxracer/grunt-commonjs-coffee) and [karma-commonjs](https://github.com/karma-runner/karma-commonjs).


## License

MIT

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
