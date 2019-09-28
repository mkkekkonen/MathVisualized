/* eslint-disable */

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var fs = require('fs');
var path = require('path');

var isDirectory = function(source) {
    return fs.lstatSync(source).isDirectory();
}

var getDirectories = function(source) {
    return fs.readdirSync(source)
        .map(function(name) {
            return path.join(source, name)
        }).filter(isDirectory);
}

gulp.task('bonsai', function(done) {
    var bundleFiles = function(filenames) {
        filenames.forEach(function(filename) {
            var filenameWithoutExtension = filename.split('.')[0];
            var sourceFilePath = './src/bonsai_movies/' + filenameWithoutExtension + '.js';
            var bundle = browserify([sourceFilePath])
                .transform("babelify", {presets: ["babel-preset-env"]})
                .bundle();
            bundle.pipe(source(filenameWithoutExtension + '.js'))
                .pipe(gulp.dest('../js/bonsai_movie_bundles/'));
        });
    }

    bundleFiles(fs.readdirSync('src/bonsai_movies'));

    done();
});

gulp.task('konva', function(done) {
    var bundleFiles = function(filenames, sourceFolderPath) {
        filenames.forEach(function(filename) {
            var filenameWithoutExtension = filename.split('.')[0];
            var sourceFilePath = path.join(
                sourceFolderPath,
                filenameWithoutExtension + '.js'
            );
            var sourceFolderPathSplit = sourceFolderPath.split('/');
            var category = sourceFolderPathSplit[2];
            var subcategory = sourceFolderPathSplit[3];
            var destinationFolderPath = path.join(
                '../js/entry_point_bundles',
                category,
                subcategory,
            );
            var bundle = browserify([sourceFilePath], { debug: true })
                .transform("babelify", {presets: ["@babel/preset-env"]})
                .bundle();
            bundle.pipe(source(filenameWithoutExtension + '.js'))
                .pipe(gulp.dest(destinationFolderPath));
        });
    }

    var categoryFolders = getDirectories('src/entry_points');
    categoryFolders.forEach(function(categoryFolderPath) {
        var subcategoryFolders = getDirectories(categoryFolderPath)
        subcategoryFolders.forEach(function(subcategoryFolderPath) {
            bundleFiles(
                fs.readdirSync(subcategoryFolderPath),
                subcategoryFolderPath
            );
        });
    });

    done();
});

gulp.task('watch', function() {
    gulp.watch('./src/bonsai_movies/*.js', gulp.series('bonsai'));
    gulp.watch('./src/**/*.js', gulp.series('konva'));
});

gulp.task('default', gulp.series('bonsai', 'konva', 'watch'));
// gulp.task('default', ['konva']);
