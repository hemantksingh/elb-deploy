require('babel-core/register');

import gulp from 'gulp';
import AWS from 'aws-sdk';
import babel from 'gulp-babel';
import sourceMaps from 'gulp-sourcemaps';
import merge from 'merge-stream';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import rimraf from 'rimraf';

gulp.task('build', () => {

    let index = gulp.src('index.js')
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('dist'));

    let dockerRun = gulp.src('Dockerrun.aws.json')
        .pipe(gulp.dest('dist'));

    let src = gulp.src('src/**/*', {base: '.'})
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));

    return merge(index, dockerRun, src);
});

gulp.task('zip', () => {
    return gulp.src('dist/Dockerrun.aws.json')
        .pipe(zip('output.zip'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', cb => {
    rimraf('./dist', cb);
});

gulp.task('package', callback => {
    runSequence('clean', 'build', 'zip', callback);
});