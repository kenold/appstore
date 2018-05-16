const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
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

//  logs message
gulp.task('message', function(){
    return console.log("Gulp is running Ken...");
});

// copy all HTML files
gulp.task('copyHtml', function() {
    gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
});

// optimize images
gulp.task('imageMin', function(){
    gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});

// minify JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
      .pipe(uglify())    
      .pipe(gulp.dest('dist/js'));
});

// compile sass into CSS
gulp.task('sass', function(){
    gulp.src('src/scss/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('dist/css'));
});

// concat JS files
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
});

// static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// run all tasks above at once with 'gulp'
gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts', 'browser-sync']);

/* watch for changes "gulp watch"
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
}); */

// watch for changes "gulp watch" then live reload server
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});
    
