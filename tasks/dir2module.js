/*
 * grunt-dir2module
 *
 * Copyright (c) 2014 Erik Rasmussen
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {
  var chalk = require('chalk'),
      getRelativePath = function(from, to) {
        var fromDirs = from.split('/'),
          toDirs = to.split('/'),
          i, common = 0;
        // drop filename
        fromDirs.pop();
        for(i=0;i<fromDirs.length;i++) {
          if(fromDirs[i] === toDirs[i]) {
            common = i+1;
          }
        }
        return './'+toDirs.slice(common, toDirs.length).join('/');
      };

  grunt.registerMultiTask('dir2module', 'Create module files.', function() {
    var header = '\'use strict\';\nmodule.exports = {\n',
      footer = '\n};';

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var submodules = f.src.filter(function(filepath) {
        return filepath !== f.dest;
      }).map(function(filepath) {
        var relativePath = getRelativePath(f.dest,filepath),
          name = /^.*\/([^\/]+)\.js$/.exec(filepath)[1];
      return '  \''+name+'\': require(\''+relativePath+'\')';
      }).join(',\n');

      // Write the destination file.
      grunt.file.write(f.dest, header + submodules + footer);

      // Print a success message.
      grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
    });
  });
};
