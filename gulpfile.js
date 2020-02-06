'use strict';

var gulp         = require('gulp'),
    sourcemaps   = require('gulp-sourcemaps'),
    livereload   = require('gulp-livereload'),
    // CSS compilation.
    sass         = require('gulp-ruby-sass'),
    // JavaScript development.
    browserify   = require('browserify'),
    uglify       = require('gulp-uglify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer');

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function () {
    return sass('./sass/style.scss', {sourcemap: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: './sass'
        }))
        .pipe(gulp.dest('./public/stylesheets'));
});

// Task to compile JS.
gulp.task('scripts', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({
        extensions: ['.js'],
        entries:  ['./js/main.js'],
        debug: true
    })
        .transform('babelify', {
            presets: ['@babel/preset-env']
        })
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload())
});

/**
 * Static Server + watching scss/html files
 */
gulp.task('watch', gulp.series('sass', 'scripts'), function() {

    gulp.watch("./sass/*.scss", ['sass']);
    gulp.watch("./sass/components/*.scss", ['sass']);
    gulp.watch("./sass/partials/*.scss", ['sass']);
    gulp.watch("./sass/views/*.scss", ['sass']);
    gulp.watch("./sass/vendor/*.scss", ['sass']);

    gulp.watch("./js/*.js", ['scripts']);
});

gulp.task('default', gulp.series('sass', 'scripts'));