# gulp-dir2module v0.0.1

## Information

<table>
<tr> 
<td>Package</td><td>gulp-dir2module</td>
</tr>
<tr>
<td>Description</td>
<td>
Creates a browserify/commonjs module with a map of all the files in a directory.
</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```javascript
var dir2module = require('gulp-dir2module');

gulp.task('dir2module', function() {
    gulp.src('js/controllers/*.js')
        .pipe(dir2module('controllers.js'))
            .pipe(gulp.dest('js/controllers'))
});
```

This will create a file in the js/controllers directory called controllers.js that exports a map with each js file (excluding itself).

