/*
* @Author: Marte
* @Date:   2016-11-13 20:30:56
* @Last Modified by:   Marte
* @Last Modified time: 2016-11-13 21:37:45
*/

'use strict';
/**
 * 1.less编译 压缩
 * 2.js合并 压缩 混淆
 * 3.img 复制
 * 4.html压缩
 *
 * @type {[type]}
 */
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('style',() =>{
    //gulp.src('src/style/*.less')
    gulp.src(['src/style/*.less','!src/style/_*.less'])
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('script',() => {
    gulp.src('src/script/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('image',() => {
    gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream:true}));
});

var htmlmin = require('gulp-htmlmin');

gulp.task('html',() => {
    gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace:true,
        removeComments:true}))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream:true}));
});

var browserSync = require('browser-sync');
gulp.task('serve',() => {
    browserSync({
        server:{
            baseDir:['dist/']
        },
    },(err,bs) => {
        console.log(bs.options.getIn(['urls','local']));
    });

    gulp.watch('src/style/*.less',['style']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/image/*.*',['image']);
    gulp.watch('src/*.html',['html']);
})