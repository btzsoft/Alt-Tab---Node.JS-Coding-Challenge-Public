const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')
const nodemon = require('gulp-nodemon')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('scripts', function () {
  gulp.src(['./client/**/*.js', '!./client/**/*.test.js', '!./client/app.min.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('./app.min.js'))
  .pipe(uglify({mangle: true}))
  .pipe(gulp.dest('client'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('client'))
})

gulp.task('watch', function () {
  watch(['./client/**/*.js', '!./client/**/*.test.js', '!./client/app.min.js'], function () {
    gulp.start('scripts')
  })
})

gulp.task('start:dev', function () {
  return nodemon({
    script: './app.js',
    ext: 'js json',
    ignore: [
      'build/',
      'node_modules/',
      '.git',
      '.idea',
    ],
    watch: [
      'app.js',
      'api/**/*.js'
    ],
    stdout: true,
    readable: true
  })
})

gulp.task('default', ['scripts', 'watch'])