var gulp = require('gulp')
var browserify = require('gulp-browserify')
var reactify = require('reactify')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var notify = require('gulp-notify')
var nodemon = require('gulp-nodemon')

gulp.task('browserify', function() {
  gulp.src('./public/src/js/main.jsx', { read: false })
    .pipe(plumber())
    .pipe(browserify({
      transform: [reactify],
    }))
    .on('error', notify.onError({
      message: '<%= error.message %>',
      title: 'Error'
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/dist/js/'))
})

gulp.task('watch', function(){
  console.log('watching...')
  var watcher = gulp.watch('./public/src/js/*.js', ['browserify'])
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })
})

gulp.task('start', function(){
  nodemon({
    script: 'app.js',
    ext: 'js jsx html',
    env: {'NODE_ENV': 'development'}
  })
})

gulp.task('watch', ['watch', 'start'])
gulp.task('default', ['browserify', 'start'])

