var gulp = require('gulp');
gulp.task('jscopy', function(){
    return gulp.src('src/server/views/*.html')
        .pipe(gulp.dest('built/server/views'))
});

gulp.task('default', ['jscopy']);
