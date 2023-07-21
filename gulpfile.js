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
const paths = {
	src: {
		base: "src/",
		sass: "src/sass/",
		js: "src/js/",
	},
	dist: {
		base: "dist/",
		css: "dist/css/",
		js: "dist/js/",
	},
	files: {
		base: "**/*",
		html: "*.html",
		sass: "**/*.sass",
		css: "**/*.css",
		js: "**/*.js",
	},
};

// Paths used to concat the files in a specific order.
const filesJsCompile = [
	`${paths.src.js}scripts.js`,
];


// FUNCTIONS USED IN THE TASKS
// =================================================
function copyDirectory(directoryToCopy, directoryOutput) {
	return gulp
		.src(`${directoryToCopy}${paths.files.base}`)
		.pipe(gulp.dest(directoryOutput));
};

function copyFiles(filesToCopy, directoryOutput) {
	return gulp
		.src(filesToCopy)
		.pipe(gulp.dest(directoryOutput));
};


// FUNCTIONS & TASKS
// =================================================
function createServer() {
	browserSync.init({
		server: {
			baseDir: paths.dist.base,
			browser: [
				"google-chrome",
				"firefox",
			],
		},
	});
};

// HTML
// -------------------------------------------------
function htmlCopy() {
	return copyFiles(
		`${paths.src.base}${paths.files.html}`,
		paths.dist.base
	);
};

function htmlMinfy() {
	return gulp
		.src(`${paths.dist.base}${paths.files.html}`)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(gulp.dest(paths.dist.base));
};

// CSS
// -------------------------------------------------
function sassCompile() {
	return gulp
		.src([
			`${paths.src.sass}styles.sass`,
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
		.pipe(gulp.dest(paths.dist.css));
};

// JS
// -------------------------------------------------
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
		.pipe(gulp.dest(paths.dist.js));
};


// WATCH
// =================================================
function watch() {
	createServer();

	gulp.watch(
		`${paths.src.base}${paths.files.html}`,
		gulp.series(
			htmlCopy,
			htmlMinfy
		)
	);

	gulp.watch(
		`${paths.src.sass}${paths.files.sass}`,
		sassCompile
	);

	gulp.watch(
		`${paths.src.js}${paths.files.js}`,
		jsCompile
	);

	gulp.watch(
		[
			`${paths.dist.base}${paths.files.html}`,
			`${paths.dist.css}${paths.files.css}`,
			`${paths.dist.js}${paths.files.js}`,
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
	sassCompile
);

gulp.task(
	"js",
	jsCompile
);

gulp.task(
	"watch",
	watch
);
