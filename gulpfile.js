var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var watchify = require('watchify');
var to5ify = require('6to5ify');
var partialify = require('partialify');
var rimraf = require('rimraf');
var browserSync = require('browser-sync');

var bundler = watchify(browserify('./src/scripts/app.js', {debug: true}, watchify.args));
bundler.transform(to5ify);
bundler.transform(partialify);

gulp.task('clean', function(cb){
  rimraf('./dist/', cb);
});

gulp.task('dist', ['build'], function(){
  process.exit(0);
});

gulp.task('build', ['clean'], function(){
  return bundle();
});

gulp.task('watch', bundle);

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}
