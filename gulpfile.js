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
let proyectName = 'compiler/';

// Root src
let rootSrc     = 'src/',
    rootSrcSass = rootSrc + 'sass/',
    rootSrcJs   = rootSrc + 'js/';

// Root dist
let rootDist    = 'dist/',
    rootDistCss = rootDist + 'css/',
    rootDistJs  = rootDist + 'js/';

// Root Files
let rootFiles        = '**/*',
    rootFilesSass    = '**/*.sass',
    rootFilesCss     = '**/*.css',
    rootFilesJs      = '**/*.js';

// Watch
let WatchFilesCss     = rootDistCss + rootFilesCss,
    WatchFilesJs      = rootDistJs + rootFilesJs;


// Roots used to concat the files in a specific order.
let filesJs = [
    rootSrcJs + 'scripts.js',
]



// GULP TASK
// =================================================
function sassCompile()
{
    return gulp.src([rootSrcSass + 'styles.sass'])
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
               .pipe(gulp.dest(rootDistCss))
}

function jsCompile()
{
    return gulp.src(filesJs)
               .pipe(babel({
                    'presets':['@babel/preset-env']
                }))
               .pipe(concat('scripts.min.js'))
               .pipe(uglify())
               .pipe(lineEndingCorrector())
               .pipe(gulp.dest(rootDistJs))
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

    gulp.watch(rootSrcJs + rootFilesJs, jsCompile);
    gulp.watch(rootSrcSass + rootFilesSass, sassCompile);
    
    gulp.watch(
        [
            WatchFilesCss,
            WatchFilesJs,
        ]
    ).on('change', reload);
}

exports.sassCompile            = sassCompile;
exports.jsCompile              = jsCompile;


exports.watch = watch;


gulp.task('default', gulp.parallel(watch));