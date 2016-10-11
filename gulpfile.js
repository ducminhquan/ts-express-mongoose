var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');

var serverTS = ["**/*.ts", "!node_modules/**", '!bin/**'];

var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });


gulp.task('ts', [
  // 'clean'
], function () {

  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('./'));
});


gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee ejs',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);
