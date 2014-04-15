# grunt-dir2module v0.0.1

> Creates a browserify/commonjs module with a map of all the files in a directory.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dir2module --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dir2module');
```


## Dir2Module task
_Run this task with the `grunt dir2module` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Examples

```js
// Project configuration.
grunt.initConfig({
  dir2module: {
    options: {
      files: {
        'dist/basic.js': ['src/services/*.js']
      }
    },
  },
});
```

---

Task submitted by [Erik Rasmussen](http://erikras.com/)
