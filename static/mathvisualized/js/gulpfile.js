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
    var bundleFiles = function(filenames, sourceFolderPath) {
        filenames.forEach(function(filename) {
            var filenameWithoutExtension = filename.split('.')[0];
            var sourceFilePath = path.join(
                sourceFolderPath,
                filenameWithoutExtension + '.js'
            );
            var destinationFolderPath = sourceFolderPath.replace(
                'entry_points',
                'entry_point_bundles'
            );
            var bundle = browserify([sourceFilePath]).bundle();
            bundle.pipe(source(filenameWithoutExtension + '.js'))
                .pipe(gulp.dest(destinationFolderPath));
        });
    }

    var categoryFolders = getDirectories('entry_points');
    categoryFolders.forEach(function(categoryFolderPath) {
        var subcategoryFolders = getDirectories(categoryFolderPath)
        subcategoryFolders.forEach(function(subcategoryFolderPath) {
            bundleFiles(
                fs.readdirSync(subcategoryFolderPath),
                subcategoryFolderPath
            );
        });
    });

    
});

gulp.task('watch', function() {
    gulp.watch('./bonsai_movies/*.js', ['bonsai']);
    gulp.watch('./entry_points/*.js', ['konva']);
});

gulp.task('default', ['bonsai', 'konva', 'watch']);
// gulp.task('default', ['konva']);
