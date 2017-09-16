var gulp = require('gulp');
var minifyJSON = require('gulp-jsonminify');
var ghPages = require('gulp-gh-pages');

var fs = require('fs');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

gulp.task('json', function () {
  var subjects_data_str = fs.readFileSync('./data/data.json').toString();
  try {
    var subjects_data_obj = JSON.parse(subjects_data_str);
  } catch (err) {
    console.log("Unable to parse data/data.json. Invalid JSON");
    console.error(err);
    process.exit(1);
  }
  return fs.writeFileSync('./dist/data.json', JSON.stringify(subjects_data_obj));
});

gulp.task('copy', function () {
  return gulp.src(['index.html', 'resources/**/*'])
  .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'json', 'copy' ]);

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
  .pipe(ghPages({
    origin: 'icyflame',
    message: `Built at ${new Date()}`
  }));
});
