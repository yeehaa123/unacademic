var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var mocha = require('gulp-mocha');
require('6to5/register');

gulp.task('default', function () {
  return gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('serve', ['copy'], function () {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});
