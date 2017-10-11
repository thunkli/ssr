var gulp = require('gulp');
var htmlmin = require('gulp-html-minifier');
gulp.task('copy-minifier', function(){
    return gulp.src('src/server/views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('built/server/views'))
});

gulp.task('default', ['copy-minifier']);
