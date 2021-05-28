const development_folder = "build";
const project_folder = "build";

const path = {
    build: {
        css: project_folder + "/css",
        favicon: development_folder + "/img/favicon",
        fonts: project_folder + "/fonts",
        html: project_folder + "/",
        img: project_folder + "/img",
        js: project_folder + "/js",
        sprite: development_folder + "/img/sprite",
        png_css: development_folder + "/scss",
        pug: project_folder + "/fonts",
    }
}

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const minifyCss = require('gulp-csso')
const pug = require('gulp-pug')
const scss = require('gulp-sass')

gulp.task('pug',function(callback) {
    return gulp.src('./pug/**/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true,
            ignoreInitial: false
        }))
        .pipe(gulp.dest('./build/'));
});
gulp.task('scss', function (callback) {
    return gulp.src('./scss/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./scss/'))
    callback();

});
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('watch', function () {
    watch('./pug/**/*.pug', gulp.parallel('pug'))
    watch(['./*.html', './pug/**/*.pug', './css/**/*.css', './js/**/*.js', './pug/**/*.pug/*.html', './scss/**/*.scss'], gulp.parallel(browserSync.reload));

})

gulp.task('minifyCss', function () {
    return gulp.src('./css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./css'));

})

gulp.task('default',gulp.series('minifyCss', gulp.parallel('pug', 'server', 'watch')));
