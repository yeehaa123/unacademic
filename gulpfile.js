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
bundler.on('update', bundle);

gulp.task('copy', function(){
  gulp.src(['./src/assets/**/*', './src/index.html'],{base: 'src'})
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function(cb){
  rimraf('./dist/', cb);
});

gulp.task('dist', ['build'], function(){
  process.exit(0);
});

gulp.task('build', ['copy'], function(){
  return bundle();
});

gulp.task('js', bundle);

gulp.task('serve', ['build'], function () {
  browserSync({
    server: {
      baseDir: './dist'
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
