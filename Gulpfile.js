var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var less = require("gulp-less");
var del = require('del');
var debug = require('gulp-debug');
var gulpRemoveHtml = require('gulp-remove-html');

gulp.task("default", function () {
  // var jsFilter = filter("**/*.js");
  var cssFilter = filter("**/*.css", {
    restore: true
  });
  var indexFilter = filter("dev-*.html", {
    restore: true
  });

  //clean
  del(["index.html", "css/product*"])

  gulp.src('./css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./css'));

  return gulp.src("dev.html")
    .pipe(useref())
    // .pipe(jsFilter)
    // .pipe(uglify())             // 压缩Js
    // .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(csso()) // 压缩Css
    .pipe(cssFilter.restore)
    .pipe(rev())
    .pipe(revReplace()) // Substitute in new filenames
    .pipe(indexFilter)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulpRemoveHtml())
    .pipe(indexFilter.restore)
    .pipe(debug({title:'unicorn'}))
    .pipe(gulp.dest('./'));
});