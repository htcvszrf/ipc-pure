var gulp = require('gulp'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    collector = require('gulp-rev-collector'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch');

// 默认监听
gulp.task('default', function () {
    gulp.watch('css/**/*.less', ['less']);
});

// 清除所有打包文件
gulp.task('clean', function () {
    gulp.src('dist')
        .pipe(clean());
    gulp.src('rev')
        .pipe(clean());
});

// 打包编译Less
gulp.task('less', function () {
    gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(csso())
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest('rev'));
});

// 打包资源js
gulp.task('js', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest('rev'));
});

// 打包组件js、css、fonts、images
gulp.task('components', function () {
    gulp.src('images/*')
        .pipe(gulp.dest('dist/images'));

    gulp.src('js/components/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/components'));

    gulp.src('js/components/**/*.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/js/components'));

    gulp.src('js/components/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/js/components/font-awesome/fonts'));

    gulp.src('js/components/bootstrap-colorpicker/images/*')
        .pipe(gulp.dest('dist/js/components/bootstrap-colorpicker/images'));

    gulp.src('js/components/jquery-icheck/images/*')
        .pipe(gulp.dest('dist/js/components/jquery-icheck/images'));
});

// 文件增量更新重命名
gulp.task('collector', function () {
    gulp.src(['rev/*.json', 'views/**/*.html'])
        .pipe(collector())
        .pipe(gulp.dest('dist/views'));
});

gulp.task('dist', ['clean', 'less', 'js', 'components', 'collector'], function () {

});