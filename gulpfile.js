'use strict';



// DEPENDENCIES
// =================================================
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const lineEndingCorrector = require('gulp-line-ending-corrector');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const srcMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


// SETTINGS: FOLDER/FILE PATHS
// =================================================
const proyectName = 'gulp-compiler/';

// Path src
const pathSrc = 'src/';
const pathSrcSass = `${pathSrc}sass/`;
const pathSrcJs = `${pathSrc}js/`;

// Path dist
const pathDist = 'dist/';
const pathDistCss = `${pathDist}css/`;
const pathDistJs = `${pathDist}js/`;

// Path Files
const pathFiles = "**/*";
const pathFilesHtml = "*.html";
const pathFilesSass = "**/*.sass";
const pathFilesCss = "**/*.css";
const pathFilesJs = "**/*.js";

// Watch Files
const watchFilesHtml = `${pathDist}${pathFilesHtml}`;
const watchFilesCss = `${pathDistCss}${pathFilesCss}`;
const watchFilesJs = `${pathDistJs}${pathFilesJs}`;

// Paths used to concat the files in a specific order.
const filesJsCompile = [
	`${pathSrcJs}scripts.js`,
];

const filesCssCompile = [
	`${pathDistCss}styles.min.css`,
];


// FUNTIONS USED IN THE TASKS
// =================================================
function createServer() {
	browserSync.init({
		server: {
			baseDir: pathDist,
			browser: [
				"google-chrome",
				"firefox",
			],
		},
	});
};

function copyDirectory(directoryToCopy, directoryOutput) {
	return gulp
		.src(`${directoryToCopy}${pathFiles}`)
		.pipe(gulp.dest(directoryOutput));
};

function copyFiles(filesToCopy, directoryOutput) {
	return gulp
		.src(filesToCopy)
		.pipe(gulp.dest(directoryOutput));
};

function htmlCopy() {
	return copyFiles(
		`${pathSrc}${pathFilesHtml}`,
		pathDist
	);
};

function htmlMinfy() {
	return gulp
		.src(`${pathDist}${pathFilesHtml}`)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(gulp.dest(pathDist));
};

function sassCompile() {
	return gulp
		.src([
			`${pathSrcSass}styles.sass`,
		])
		.pipe(
			srcMaps.init({
				loadMaps: true,
			})
		)
		.pipe(
			sass({
				outputStyle: "compressed",
			}).on(
				"error",
				sass.logError
			)
		)
		.pipe(
			autoprefixer({
				versions: [
					"last 2 versions",
				],
				cascade: false,
			})
		)
		.pipe(cleanCss())
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(pathDistCss));
};

function cssCompile() {
	return gulp
		.src(filesCssCompile)
		.pipe(concat("styles.min.css"))
		.pipe(cleanCss())
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(pathDistCss))
		.pipe(browserSync.stream());
};

function jsCompile() {
	return gulp
		.src(filesJsCompile)
		.pipe(
			babel({
				presets: [
					"@babel/preset-env",
				],
			})
		)
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(pathDistJs));
};

function watch() {
	createServer();

	gulp.watch(
		`${pathSrc}${pathFilesHtml}`,
		gulp.series(
			htmlCopy,
			htmlMinfy
		)
	);

	gulp.watch(
		`${pathSrcSass}${pathFilesSass}`,
		gulp.series(
			sassCompile,
			cssCompile
		)
	);

	gulp.watch(
		`${pathSrcJs}${pathFilesJs}`,
		jsCompile
	);

	gulp.watch(
		[
			watchFilesHtml,
			watchFilesCss,
			watchFilesJs,
		]
	).on(
		"change",
		reload
	);
};


// EXPORTS
// =================================================
exports.createServer = createServer;
exports.htmlCopy = htmlCopy;
exports.htmlMinfy = htmlMinfy;
exports.sassCompile = sassCompile;
exports.cssCompile = cssCompile;
exports.jsCompile = jsCompile;
exports.watch = watch;


// TASKS
// =================================================
gulp.task(
	"default",
	gulp.series(
		htmlCopy,
		htmlMinfy,
		sassCompile,
		jsCompile,
		watch
	)
);

gulp.task(
	"serve",
	createServer
);

gulp.task(
	"build",
	gulp.series(
		htmlCopy,
		htmlMinfy,
		sassCompile,
		jsCompile
	)
);

gulp.task(
	"html",
	gulp.series(
		htmlCopy,
		htmlMinfy
	)
);

gulp.task(
	"css",
	gulp.series(
		sassCompile,
		cssCompile
	)
);

gulp.task(
	"js",
	jsCompile
);

gulp.task(
	"watch",
	watch
);
