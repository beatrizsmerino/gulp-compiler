'use strict';


// DEPENDENCIES
// =================================================
const gulp                = require('gulp'),
      autoprefixer        = require('gulp-autoprefixer'),
      browserSync         = require('browser-sync').create(),
      reload              = browserSync.reload,
      changed             = require('gulp-changed'),
      cleanCss            = require('gulp-clean-css'),
      concat              = require('gulp-concat'),
      imagemin            = require('gulp-imagemin'),
      lineEndingCorrector = require('gulp-line-ending-corrector'),
      rename              = require('gulp-rename'),
      sass                = require('gulp-sass'),
      srcMaps             = require('gulp-sourcemaps'),
      uglify              = require('gulp-uglify'),
      babel               = require('gulp-babel');


// ROOTS
// =================================================
var proyectName  = "gulp-compiler/",
    proyectFront = '',
    proyectBack  = 'admin/';

// Files src
var src              = 'assets/src/',
    srcIcomoon       = src + 'icomoon/',
    srcIcomoonFront  = srcIcomoon + 'icomoon-front/',
    srcIcomoonBack   = srcIcomoon + 'icomoon-back/',
    srcIcomoonSocial = srcIcomoon + 'icomoon-social/',
    srcSass          = src + 'sass/',
    srcJs            = src + 'js/',
    srcImg           = src + 'images/';

// Files dist
var dist              = 'assets/dist/',
    distIcomoon       = dist + 'icomoon/',
    distIcomoonFront  = distIcomoon + 'icomoon-front/',
    distIcomoonBack   = distIcomoon + 'icomoon-back/',
    distIcomoonSocial = distIcomoon + 'icomoon-social/',
    distCss           = dist + 'css/',
    distJs            = dist + 'js/',
    distImg           = dist + 'images/';

// Watch Files
var watchFiles        = '**/*',
    watchFilesPhp     = '**/*.php',
    watchFilesSass    = '**/*.sass',
    watchFilesCss     = '**/*.css',
    watchFilesJs      = '**/*.js',
    watchFilesIcomoon = watchFiles;


// FRONT
// =================================================
var nodeModules = "./node_modules/";

var frontSrcIcomoon       = proyectFront + srcIcomoonFront,
    frontSrcIcomoonSocial = proyectFront + srcIcomoonSocial,
    frontSrcSass          = proyectFront + srcSass,
    frontSrcJs            = proyectFront + srcJs;

var frontDistIcomoon       = proyectFront + distIcomoonFront,
    frontDistIcomoonSocial = proyectFront + distIcomoonSocial,
    frontDistCss           = proyectFront + distCss,
    frontDistJs            = proyectFront + distJs;

var frontWatchFilesPhp           = proyectFront + watchFilesPhp,
    frontWatchFilesIcomoon       = frontDistIcomoon + watchFilesIcomoon,
    frontWatchFilesIcomoonSocial = frontDistIcomoonSocial + watchFilesIcomoon,
    frontWatchFilesCss           = frontDistCss + watchFilesCss,
    frontWatchFilesJs            = frontDistJs + watchFilesJs;

var frontSrcCssRoots = [
    nodeModules + 'swiper/css/swiper.min.css',
    frontDistCss + 'styles.min.css',
];

// Roots used to concat the files in a specific order.
var frontSrcJsRoots = [
    nodeModules + 'jquery/dist/jquery.min.js',
    nodeModules + 'jquery-validation/dist/jquery.validate.min.js',
    nodeModules + 'jquery-validation/dist/additional-methods.min.js',
    nodeModules + 'isotope-layout/dist/isotope.pkgd.min.js',
    nodeModules + 'swiper/js/swiper.min.js',
    frontSrcJs + 'scripts.js',
    frontSrcJs + 'abstracts/variables/_abstracts-variables-breakpoints.js',
    frontSrcJs + 'abstracts/functions/_abstracts-functions-browser.js',
    frontSrcJs + 'abstracts/functions/_abstracts-functions-form-require.js',
    frontSrcJs + 'abstracts/functions/_abstracts-functions-form-validate.js',
    frontSrcJs + 'abstracts/functions/_abstracts-functions-form-validate-ckeditor.js',
    frontSrcJs + 'layouts/_layouts-nav.js',
    frontSrcJs + 'components/_components-form-require.js',
    frontSrcJs + 'components/_components-form-validate.js',
    frontSrcJs + 'components/_components-form-validate-ckeditor.js',
    frontSrcJs + 'components/_components-message.js',
];

var frontSrcImgRoots = srcImg + watchFiles;


// BACK
// =================================================
var backSrcIcomoon       = proyectBack + srcIcomoonBack,
    backSrcIcomoonSocial = proyectBack + srcIcomoonSocial,
    backSrcSass          = proyectBack + srcSass,
    backSrcJs            = proyectBack + srcJs;

var backDistIcomoon       = proyectBack + distIcomoonBack,
    backDistIcomoonSocial = proyectBack + distIcomoonSocial,
    backDistCss           = proyectBack + distCss,
    backDistJs            = proyectBack + distJs;

var backWatchFilesPhp           = proyectBack + watchFilesPhp,
    backWatchFilesIcomoon       = backDistIcomoon + watchFilesIcomoon,
    backWatchFilesIcomoonSocial = backDistIcomoonSocial + watchFilesIcomoon,
    backWatchFilesCss           = backDistCss + watchFilesCss,
    backWatchFilesJs            = backDistJs + watchFilesJs;

var backSrcCssRoots = [
    nodeModules + 'swiper/css/swiper.css',
    backDistCss + 'styles.min.css',
];

// Roots used to concat the files in a specific order.
var backSrcJsRoots = [
    nodeModules + 'jquery/dist/jquery.min.js',
    nodeModules + 'jquery-validation/dist/jquery.validate.min.js',
    nodeModules + 'jquery-validation/dist/additional-methods.min.js',
    backSrcJs + 'scripts.js',
    backSrcJs + 'abstracts/variables/_abstracts-variables-breakpoints.js',
    backSrcJs + 'abstracts/functions/_abstracts-functions-browser.js',
    backSrcJs + 'abstracts/functions/_abstracts-functions-form-require.js',
    backSrcJs + 'abstracts/functions/_abstracts-functions-form-validate.js',
    backSrcJs + 'abstracts/functions/_abstracts-functions-form-validate-ckeditor.js',
    backSrcJs + 'layouts/_layouts-nav.js',
    backSrcJs + 'components/_components-form-require.js',
    backSrcJs + 'components/_components-form-validate.js',
    backSrcJs + 'components/_components-form-validate-ckeditor.js',
    backSrcJs + 'components/_components-message.js',
];

var backSrcImgRoots = srcImg + watchFiles;


// GULP TASK - FRONT
// =================================================
function front__cssIcomoonMinify()
{
    return gulp.src(frontSrcIcomoon + 'style.css')
               .pipe(srcMaps.init({
                   loadMaps: true,
                   largeFile: true
               }))
               .pipe(cleanCss())
               .pipe(srcMaps.write('./maps/'))
               .pipe(lineEndingCorrector())
               .pipe(rename('fonts.min.css'))
               .pipe(gulp.dest(frontDistIcomoon));
}

function front__cssIcomoonCopy()
{
    return gulp.src(frontSrcIcomoon + 'fonts/*', {base: "./" + frontSrcIcomoon})
               .pipe(gulp.dest(frontDistIcomoon));
}

function front__cssIcomoonSocialMinify()
{
    return gulp.src(frontSrcIcomoonSocial + 'style.css')
               .pipe(srcMaps.init({
                   loadMaps: true,
                   largeFile: true
               }))
               .pipe(cleanCss())
               .pipe(srcMaps.write('./maps/'))
               .pipe(lineEndingCorrector())
               .pipe(rename('fonts.min.css'))
               .pipe(gulp.dest(frontDistIcomoonSocial));
}

function front__cssIcomoonSocialCopy()
{
    return gulp.src(frontSrcIcomoonSocial + 'fonts/*', {base: "./" + frontSrcIcomoonSocial})
               .pipe(gulp.dest(frontDistIcomoonSocial));
}

function front__sassCompile()
{
    return gulp.src([frontSrcSass + 'styles.sass'])
               .pipe(srcMaps.init({
                   loadMaps: true
               }))
               .pipe(sass({
                   outputStyle: 'compressed'
               }).on('error', sass.logError))
               .pipe(autoprefixer({
                   versions: ['last 2 versions']
               }))
               .pipe(srcMaps.write())
               .pipe(lineEndingCorrector())
               .pipe(rename('styles.min.css'))
               .pipe(gulp.dest(frontDistCss))
}

function front__cssCompile()
{
    return gulp.src(frontSrcCssRoots)
               .pipe(concat('styles.min.css'))
               .pipe(srcMaps.write())
               .pipe(lineEndingCorrector())
               .pipe(gulp.dest(frontDistCss))
}

function front__jsCompile()
{
    return gulp.src(frontSrcJsRoots)
               .pipe(babel({
                   'presets': ['@babel/preset-env'],
                   'compact': false
               }))
               .pipe(concat('scripts.min.js'))
               .pipe(uglify())
               .pipe(lineEndingCorrector())
               .pipe(gulp.dest(frontDistJs))
}

function front__imageMinify()
{
    return gulp.src(frontSrcImgRoots)
               .pipe(changed(distImg))
               .pipe(imagemin([
                   imagemin.gifsicle({
                       interlaced: true
                   }),
                   imagemin.jpegtran({
                       progressive: true
                   }),
                   imagemin.optipng({
                       optimizationLevel: 5
                   })
               ]))
               .pipe(gulp.dest(distImg));
}


// GULP TASK - BACK
// =================================================
function back__cssIcomoonMinify()
{
    return gulp.src(backSrcIcomoon + 'style.css')
               .pipe(srcMaps.init({
                   loadMaps: true,
                   largeFile: true
               }))
               .pipe(cleanCss())
               .pipe(srcMaps.write('./maps/'))
               .pipe(lineEndingCorrector())
               .pipe(rename('fonts.min.css'))
               .pipe(gulp.dest(backDistIcomoon));
}

function back__cssIcomoonCopy()
{
    return gulp.src(backSrcIcomoon + 'fonts/*', {base: "./" + backSrcIcomoon})
               .pipe(gulp.dest(backDistIcomoon));
}

function back__cssIcomoonSocialMinify()
{
    return gulp.src(backSrcIcomoonSocial + 'style.css')
               .pipe(srcMaps.init({
                   loadMaps: true,
                   largeFile: true
               }))
               .pipe(cleanCss())
               .pipe(srcMaps.write('./maps/'))
               .pipe(lineEndingCorrector())
               .pipe(rename('fonts.min.css'))
               .pipe(gulp.dest(backDistIcomoonSocial));
}

function back__cssIcomoonSocialCopy()
{
    return gulp.src(backSrcIcomoonSocial + 'fonts/*', {base: "./" + backSrcIcomoonSocial})
               .pipe(gulp.dest(backDistIcomoonSocial));
}

function back__sassCompile()
{
    return gulp.src([backSrcSass + 'styles.sass'])
               .pipe(srcMaps.init({
                   loadMaps: true
               }))
               .pipe(sass({
                   outputStyle: 'compressed'
               }).on('error', sass.logError))
               .pipe(autoprefixer({
                   versions: ['last 2 versions']
               }))
               .pipe(srcMaps.write())
               .pipe(lineEndingCorrector())
               .pipe(rename('styles.min.css'))
               .pipe(gulp.dest(backDistCss))
}

function back__cssCompile()
{
    return gulp.src(backSrcCssRoots)
               .pipe(concat('styles.min.css'))
               .pipe(srcMaps.write())
               .pipe(lineEndingCorrector())
               .pipe(gulp.dest(backDistCss))
}

function back__jsCompile()
{
    return gulp.src(backSrcJsRoots)
               .pipe(babel({
                   'presets': ['@babel/preset-env'],
                   'compact': false
               }))
               .pipe(concat('scripts.min.js'))
               .pipe(uglify())
               .pipe(lineEndingCorrector())
               .pipe(gulp.dest(backDistJs))
}

function back__imageMinify()
{
    return gulp.src(backSrcImgRoots)
               .pipe(changed(distImg))
               .pipe(imagemin([
                   imagemin.gifsicle({
                       interlaced: true
                   }),
                   imagemin.jpegtran({
                       progressive: true
                   }),
                   imagemin.optipng({
                       optimizationLevel: 5
                   })
               ]))
               .pipe(gulp.dest(distImg));
}


// WATCH and EXPORTS
// =================================================
function watch()
{
    browserSync.init({
        open: 'external',
        proxy: 'http://localhost/' + proyectName,
        port: 3306,
    });
    
    gulp.watch(frontSrcJs + watchFilesJs, front__jsCompile);
    gulp.watch(frontSrcSass + watchFilesSass, gulp.series(front__sassCompile, front__cssCompile));
    gulp.watch(frontSrcIcomoon + watchFiles, gulp.series(front__cssIcomoonCopy, front__cssIcomoonMinify));
    gulp.watch(frontSrcIcomoonSocial + watchFiles, gulp.series(front__cssIcomoonSocialCopy, front__cssIcomoonSocialMinify));
    gulp.watch(srcImg + watchFiles, front__imageMinify);
    
    gulp.watch(backSrcJs + watchFilesJs, back__jsCompile);
    gulp.watch(backSrcSass + watchFilesSass, gulp.series(back__sassCompile, back__cssCompile));
    gulp.watch(backSrcIcomoon + watchFiles, gulp.series(back__cssIcomoonCopy, back__cssIcomoonMinify));
    gulp.watch(backSrcIcomoonSocial + watchFiles, gulp.series(back__cssIcomoonSocialCopy, back__cssIcomoonSocialMinify));
    gulp.watch(srcImg + watchFiles, back__imageMinify);
    
    gulp.watch(
        [
            frontWatchFilesPhp,
            frontWatchFilesIcomoon,
            frontWatchFilesIcomoonSocial,
            frontWatchFilesCss,
            frontWatchFilesJs,
            backWatchFilesPhp,
            backWatchFilesIcomoon,
            backWatchFilesIcomoonSocial,
            backWatchFilesCss,
            backWatchFilesJs,
        ]
    ).on('change', reload);
}


exports.front__cssIcomoonMinify       = front__cssIcomoonMinify;
exports.front__cssIcomoonCopy         = front__cssIcomoonCopy;
exports.front__cssIcomoonSocialMinify = front__cssIcomoonSocialMinify;
exports.front__cssIcomoonSocialCopy   = front__cssIcomoonSocialCopy;
exports.front__sassCompile            = front__sassCompile;
exports.front__cssCompile             = front__cssCompile;
exports.front__jsCompile              = front__jsCompile;
exports.front__imageMinify            = front__imageMinify;

exports.back__cssIcomoonMinify       = back__cssIcomoonMinify;
exports.back__cssIcomoonCopy         = back__cssIcomoonCopy;
exports.back__cssIcomoonSocialMinify = back__cssIcomoonSocialMinify;
exports.back__cssIcomoonSocialCopy   = back__cssIcomoonSocialCopy;
exports.back__sassCompile            = back__sassCompile;
exports.back__cssCompile             = back__cssCompile;
exports.back__jsCompile              = back__jsCompile;
exports.back__imageMinify            = back__imageMinify;

exports.watch = watch;


gulp.task('front-js', gulp.series(
    front__jsCompile,
));
gulp.task('back-js', gulp.series(
    back__jsCompile,
));

gulp.task('front-css', gulp.series(
    front__sassCompile,
    front__cssCompile
));

gulp.task('back-css', gulp.series(
    back__sassCompile,
    back__cssCompile
));

gulp.task('front-icomoon', gulp.series(
    front__cssIcomoonMinify,
    front__cssIcomoonCopy,
    front__cssIcomoonSocialMinify,
    front__cssIcomoonSocialCopy
));
gulp.task('back-icomoon', gulp.series(
    back__cssIcomoonMinify,
    back__cssIcomoonCopy,
    back__cssIcomoonSocialMinify,
    back__cssIcomoonSocialCopy
));

gulp.task('front', gulp.series(
    front__cssIcomoonMinify,
    front__cssIcomoonCopy,
    front__cssIcomoonSocialMinify,
    front__cssIcomoonSocialCopy,
    front__sassCompile,
    front__cssCompile,
    front__jsCompile,
    front__imageMinify
));

gulp.task('back', gulp.series(
    back__cssIcomoonMinify,
    back__cssIcomoonCopy,
    back__cssIcomoonSocialMinify,
    back__cssIcomoonSocialCopy,
    back__sassCompile,
    back__cssCompile,
    back__jsCompile,
    back__imageMinify
));


gulp.task('default', gulp.parallel(watch));