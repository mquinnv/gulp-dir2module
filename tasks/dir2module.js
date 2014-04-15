/*
 * grunt-dir2module
 *
 * Copyright (c) 2014 Erik Rasmussen
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {
  var chalk = require('chalk');

  grunt.registerMultiTask('dir2module', 'Create module files.', function() {
    var output = ['module.exports = {\n'];

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        //var src = grunt.file.read(filepath);
        grunt.log.writeln(filepath);
/*
        // Process files as templates if requested.
        if (typeof options.process === 'function') {
          src = options.process(src, filepath);
        } else if (options.process) {
          src = grunt.template.process(src, options.process);
        }
        }
        */
        return filepath;
      }).join(',');

      // Write the destination file.
      //grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
    });
  });

};
