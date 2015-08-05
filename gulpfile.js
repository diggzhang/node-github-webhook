var gulp = require('gulp');

// invoke init
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// check script
gulp.task('lint', function () {
    gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// complie Sass
gulp.task('sass', function () {
    gulp.src('./public/stylesheets')
        .pipe('sass()')
        .pipe(gulp.dest('./css'));
});

// compress
gulp.task('scripts', function () {
    gulp.src('*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// default task
gulp.task('default', function () {
    gulp.run('lint', 'sass', 'scripts');

    gulp.watch('*.js', function () {
        gulp.run('lint', 'sass', 'scripts');
    });
});
