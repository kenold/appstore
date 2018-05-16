const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const concat = require('gulp-concat');

/* -- TOP LEVEL FUNCTIONS
    gulp.task -> defines tasks
    gulp.src -> points to files to use
    gulp.dest -> points to folder to output
    gulp.watch -> watch filed & folder for changes
*/

// minify JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
      .pipe(uglify())    
      .pipe(gulp.dest('dist/js'));
});

// compile sass into CSS, outputStyle: 'compressed' or 'expanded'
gulp.task('sass', function(){
    gulp.src('src/scss/*.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('dist/css'));
});

// run all tasks above at once with 'gulp'
gulp.task('default', ['sass']);

// watch for changes "gulp watch"
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['sass']);
});
