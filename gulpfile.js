var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var envify = require('envify');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var less = require("gulp-less");
var minify_css = require('gulp-minify-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var replace = require("gulp-replace");
var git = require('gulp-git');
var fs = require('fs');
var webserver = require('gulp-webserver');

var browserified = function(filename) {
  return browserify({
    entries: filename,
    transform: [reactify, envify],
    extensions: ['.jsx']
  }).bundle();
};

var BUILD_ID = Math.round(new Date().getTime() / 1000, 0);

gulp.task('development-webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      fallback: "development.html",
      open: false,
      middleware: function(req, res, next) {
        if(req.url === "/") {
          res.setHeader('Content-Type', 'text/html; charset=UTF-8');
          fs.createReadStream("./development.html").pipe(res);
        } else {
          next();
        }
      }
    }));
});

gulp.task('js', ['git-remove'], function(cb) {
  browserified('./js/app.jsx')
    .pipe(source("app-" + BUILD_ID + ".js"))
    .pipe(gulp.dest('dist/src'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./map', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});

gulp.task('less', ['git-remove'], function(cb) {
  gulp.src('./less/app.less')
    .pipe(less())
    .pipe(minify_css())
    .pipe(rename("app-" + BUILD_ID + ".css"))
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});

gulp.task('templates', function(cb){  
  gulp.src(['./index.html.tmpl'])
    .pipe(rename("index.html"))
    .pipe(replace('<BUILD-ID>', BUILD_ID))
    .pipe(gulp.dest('./'))
    .on('end', cb);
});

gulp.task('git-add', ['js', 'less', 'templates'], function(){
  return gulp.src(['./dist/*', './dist/*/*']).pipe(git.add({args: '-f'}));
});

gulp.task('git-remove', function(done) {
  return gulp.src('./dist/*')
    .pipe(git.rm({args: '-r', quiet:true}))
    .on('error', function(error){
      console.log(error.toString());
      this.emit('end');
    });
});

gulp.task('default', ['js', 'less', 'templates', "git-add"]);

