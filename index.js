var path = require('path');

var createCommonjsPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.commonjs');
  var defaultOptions = {
    registerCmd: "require.register",
    isCoffeeScript: false,
    pathReplace: false
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var rebasePath = function (origPath) {
    // in the browser we dont care about the absolute path, we just want the relative path from the karma root
    // we assume that we're in node_modules/karma-commonjs-preprocessor
    // therefore we just strip everything that is over the ../../ level
    var karmaRoot = path.normalize(__dirname + '/../..');
    return origPath.replace(karmaRoot + '/', '');
  };

  var indentStr = function(str) {
    return str.replace(/(\r\n|\n|\r)/g, '\n ');
  };

  var isCoffeeScript = function(filepath) {
    return filepath.slice(-7) === '.coffee';
  };

  var wrapDefine = function(filepath, content) {
    var definePath;
    definePath = filepath.replace(/\.\w+$/, '');
    if (options.isCoffeeScript || isCoffeeScript(filepath)) {
      content = indentStr(content);
      return "window." + options.registerCmd + " '" + definePath + "': (exports, require, module) ->\n " + content + "\n";
    } else {
      return "window." + options.registerCmd + "({'" + definePath + "': function(exports, require, module) {" + content + "}});\n";
    }
  };

  return function(content, file, done) {
    var result = null;
    var map;
    var datauri;

    log.debug('Processing "%s".', file.originalPath);

    file.path = rebasePath(file.originalPath);
    log.debug('Rebased Path "%s".', file.path);

    if (options.pathReplace && typeof options.pathReplace == "function") {
      file.path = options.pathReplace(file.path);
      log.debug('applied pathReplace "%s".', file.path);
    }


    try {
      result = wrapDefine(file.path, content)
      done(result)
    } catch (e) {
      log.error('%s\n  at %s', e.message, file.originalPath);
      return;
    }
  };
};

createCommonjsPreprocessor.$inject = ['args', 'config.commonjsPreprocessor', 'logger', 'helper'];

module.exports = {
  'preprocessor:commonjs': ['factory', createCommonjsPreprocessor]
};
