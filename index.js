'use strict';
var through = require('through');
var PluginError = require('plugin-error');
var File = require('vinyl');
var Buffer = require('buffer').Buffer;

module.exports = function (fileName) {
  if (!fileName) {
    throw new PluginError('dir2module', 'Missing fileName option for dir2module');
  }

  var firstFile,
    files = [];

  function add(file) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError('dir2module', 'Streaming not supported'));
    }
    if (!firstFile) {
      firstFile = file;
    }
    if (file.path.substring(file.base.length) !== fileName) {
      files.push(file.path.substring(file.base.length, file.path.length - 3));
    }

  }

  function endStream() {
    if (files.length === 0) {
      return this.emit('end');
    }

    var contents = '\'use strict\';\nmodule.exports = {\n' +
        files.map(function (f) {
          return '  \'' + f + '\': require(\'./' + f + '\')';
        }).join(',\n') +
        '\n};',
      moduleFile = new File({
        cwd: firstFile.cwd,
        base: firstFile.base,
        path: firstFile.base + '/' + fileName,
        contents: new Buffer(contents)
      });

    this.emit('data', moduleFile);


    this.emit('end');
  }

  return through(add, endStream);
};
