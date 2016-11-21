//引入插件
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    //imagemin = require('gulp-imagemin'), //图片压缩
    minifycss = require('gulp-clean-css'), //css压缩
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    clean = require('gulp-clean'); //清空文件夹

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function() {
    gulp.watch(['./src/**/*.*'], ['html', 'js', 'css']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function() {
    connect.server({
        root:'src',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(connect.reload());
});
gulp.task('js', function() {
    gulp.src('./src/**/*.js')
        .pipe(connect.reload());
});
gulp.task('css', function() {
    gulp.src('./src/**/*.css')
        .pipe(connect.reload());
});
// 样式处理
gulp.task('minifycss', function() {
    var cssSrc = './src/css/*.css',
        cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
// js处理
/*gulp.task('minifyjs', function() {
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';

    gulp.src(jsSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});*/

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images'], { read: false })
        .pipe(clean());
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);
