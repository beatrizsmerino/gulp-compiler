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



// SETTINGS: FOLDER/FILE PATHS
// =================================================
let proyectName = 'gulp-compiler/';

// Path src
let pathSrc     = 'src/',
    pathSrcSass = pathSrc + 'sass/',
    pathSrcJs   = pathSrc + 'js/';

// Path dist
let pathDist    = 'dist/',
    pathDistCss = pathDist + 'css/',
    pathDistJs  = pathDist + 'js/';

// Path Files
let pathFiles     = "**/*",
	pathFilesHtml = "*.html",
	pathFilesSass = "**/*.sass",
	pathFilesCss  = "**/*.css",
	pathFilesJs   = "**/*.js";

// Watch Files
let watchFilesHtml = pathDist + pathFilesHtml,
	watchFilesCss  = pathDistCss + pathFilesCss,
	watchFilesJs   = pathDistJs + pathFilesJs;

// Paths used to concat the files in a specific order.
let filesJsCompile = [pathSrcJs + "scripts.js"];



// FUNTIONS USED IN THE TASKS
// =================================================
function createServer() {
	browserSync.init({
		server: {
			baseDir: "./dist",
			browser: ["google-chrome", "firefox"],
		},
	});
}

function copyDirectory(directoryToCopy, directoryOutput) {
	return gulp.src(`${directoryToCopy}/**/*`).pipe(gulp.dest(directoryOutput));
}

function copyFiles(filesToCopy, directoryOutput) {
	return gulp.src(filesToCopy).pipe(gulp.dest(directoryOutput));
}

function htmlCopy() {
	return copyFiles(pathSrc + pathFilesHtml, pathDist);
}

function sassCompile() {
    return gulp
		.src([pathSrcSass + "styles.sass"])
		.pipe(
			srcMaps.init({
				loadMaps: true,
			})
		)
		.pipe(
			sass({
				outputStyle: "compressed",
			}).on("error", sass.logError)
		)
		.pipe(
			autoprefixer({
				versions: ["last 2 versions"],
			})
		)
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(pathDistCss));
}

function jsCompile() {
    return gulp
		.src(filesJsCompile)
		.pipe(
			babel({
				presets: ["@babel/preset-env"],
			})
		)
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(pathDistJs));
}

function watch() {
    createServer();
    
	gulp.watch(pathSrc + pathFilesHtml, htmlCopy);
	gulp.watch(pathSrcSass + pathFilesSass, sassCompile);
	gulp.watch(pathSrcJs + pathFilesJs, jsCompile);

	gulp.watch([watchFilesHtml, watchFilesCss, watchFilesJs]).on(
		"change",
		reload
	);
}



// EXPORTS
// =================================================
exports.createServer 	= createServer;
exports.htmlCopy 		= htmlCopy;
exports.sassCompile 	= sassCompile;
exports.jsCompile   	= jsCompile;
exports.watch 			= watch;



// TASKS
// =================================================
gulp.task("default", gulp.series(htmlCopy, sassCompile, jsCompile, watch));
gulp.task("serve", gulp.series(createServer));
gulp.task("build", gulp.series(htmlCopy, sassCompile, jsCompile));
gulp.task("html", gulp.series(htmlCopy));
gulp.task("css", gulp.series(sassCompile));
gulp.task("js", gulp.series(jsCompile));
gulp.task("watch", gulp.parallel(watch));