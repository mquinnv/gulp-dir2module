'use strict';
const through = require('through'),
  PluginError = require('plugin-error'),
  File = require('vinyl'),
  {Buffer} = require('buffer')

module.exports = fileName => {
  if (!fileName) {
    throw new PluginError('dir2module', 'Missing fileName option for dir2module')
  }

  let firstFile,
    files = []

  const add = file => {
    if (file.isNull()) {
      return
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError('dir2module', 'Streaming not supported'))
    }
    if (!firstFile) {
      firstFile = file
    }
    if (file.path.substring(file.base.length+1) !== fileName) {
      files.push(file.path.substring(file.base.length, file.path.length - 3))
    }
  }

  function endStream () {
    if (files.length === 0) {
      return this.emit('end')
    }
    const contents = '\'use strict\';\nmodule.exports = {\n' +
      files.map(f => f.substring(1)).map(f=>{
        return '  \'' + f + '\': require(\'./' + f + '\')'
      }).join(',\n') +
      '\n};',
      moduleFile = new File({
        cwd: firstFile.cwd,
        base: firstFile.base,
        path: firstFile.base + '/' + fileName,
        contents: new Buffer(contents)
      })
    this.emit('data', moduleFile)
    this.emit('end')
  }
  return through(add, endStream)
}
