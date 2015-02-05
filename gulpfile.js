var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
require('6to5/register');

gulp.task('default', ['test']);

gulp.task('test', function(){
  return gulp.src(['test/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('styles', function(){
  return gulp.src('src/styles/main.scss')
  .pipe(sass({
    includePaths: require('node-neat').includePaths
  }))
  .pipe(gulp.dest('src/assets'))
});

gulp.task('watch', function(){
  gulp.watch('src/styles/**/*.scss', ['styles']);
});

gulp.task('serve', ['styles', 'watch'], function(){
  browserSync({
    server: {
      baseDir: './src'
    }
  });
});
