var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var fs = require('fs');

gulp.task('bonsai', function() {
    var bundleFiles = function(filenames) {
        filenames.forEach(function(filename) {
            var filenameWithoutExtension = filename.split('.')[0];
            var sourceFilePath = './bonsai_movies/' + filenameWithoutExtension + '.js';
            var bundle = browserify([sourceFilePath]).bundle();
            bundle.pipe(source(filenameWithoutExtension + '.js'))
                .pipe(gulp.dest('./bonsai_movie_bundles/'));
        });
    }

    bundleFiles(fs.readdirSync('bonsai_movies'));
});

gulp.task('konva', function() {
    var bundleFiles = function(filenames) {
        filenames.forEach(function(filename) {
            var filenameWithoutExtension = filename.split('.')[0];
            var sourceFilePath = './entry_points/' + filenameWithoutExtension + '.js';
            var bundle = browserify([sourceFilePath]).bundle();
            bundle.pipe(source(filenameWithoutExtension + '.js'))
                .pipe(gulp.dest('./entry_point_bundles/'));
        });
    }

    bundleFiles(fs.readdirSync('entry_points'));
});

gulp.task('watch', function() {
    gulp.watch('./bonsai_movies/*.js', ['bonsai']);
    gulp.watch('./entry_points/*.js', ['konva']);
});

gulp.task('default', ['bonsai', 'konva', 'watch']);
