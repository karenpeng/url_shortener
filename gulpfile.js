var gulp = require('gulp')
var browserify = require('gulp-browserify')
var reactify = require('reactify')
var plumber = require('gulp-plumber')
var rename = require('gulp-rename')
var notify = require('gulp-notify')

// gulp.task('browserify', function() {
//     var bundler = browserify({
//         entries: ['./public/src/js/main.js'], // Only need initial file, browserify finds the deps
//         transform: [reactify], // We want to convert JSX to normal javascript
//         debug: true, // Gives us sourcemapping
//         cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
//     });
//     var watcher  = watchify(bundler);

//     return watcher
//     .on('update', function () { // When any files update
//         var updateStart = Date.now();
//         console.log('Updating!');
//         watcher.bundle() // Create new bundle that uses the cache for high performance
//         .pipe(source('main.js'))
//     // This is where you add uglifying etc.
//         .pipe(gulp.dest('./public/dist/bundle.js'));
//         console.log('Updated!', (Date.now() - updateStart) + 'ms');
//     })
//     .bundle() // Create the initial bundle when starting the task
//     .pipe(source('main.js'))
//     .pipe(gulp.dest('./public/dist/bundle.js'));
// });
gulp.task('browserify', function() {
  gulp.src('./public/src/js/*.js', { read: false })
    .pipe(plumber())
    .pipe(browserify({
      transform: [reactify],
    }))
    .on("error", notify.onError({
      message: "<%= error.message %>",
      title: "Error"
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


gulp.task('watch', ['watch'])
gulp.task('default', ['browserify'])

