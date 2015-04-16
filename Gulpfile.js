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

gulp.task("default", function() {
  // var jsFilter = filter("**/*.js");
  var cssFilter = filter("**/*.css");
  var indexFilter = filter("dev.html");

  var userefAssets = useref.assets();

  //clean
  del(["index.html","css/product*"])

  gulp.src('./css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./css'));

  return gulp.src("dev.html")
    .pipe(userefAssets)  // 解析html中build:{type}块，将里面引用到的文件合并传过来
    // .pipe(jsFilter)
    // .pipe(uglify())             // 压缩Js
    // .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(csso())               // 压缩Css
    .pipe(cssFilter.restore())
    .pipe(rev())
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())         // Substitute in new filenames
    .pipe(indexFilter)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename("index.html"))
    .pipe(indexFilter.restore())
    .pipe(gulp.dest('./'));
});