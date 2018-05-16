const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

/* -- TOP LEVEL FUNCTIONS
    gulp.task -> defines tasks
    gulp.src -> points to files to use
    gulp.dest -> points to folder to output
    gulp.watch -> watch filed & folder for changes
*/

// TASK: compile sass into CSS, outputStyle: 'compressed' or 'expanded'
gulp.task('sass', function(){
    return gulp.src(['src/scss/*.scss'])
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(concat('main.css'))
      //.pipe(rename('main.min.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

// TASK: watch & serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"        
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

// TASK: Default
gulp.task('default', ['serve']);