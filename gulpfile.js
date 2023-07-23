"use strict";



// DEPENDENCIES
// =================================================
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const changed = require("gulp-changed");
const cleanCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminGifsicle = require("imagemin-gifsicle");
const lineEndingCorrector = require("gulp-line-ending-corrector");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const srcMaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");


// SETTINGS: FOLDER/FILE PATHS
// =================================================
const proyectName = "gulp-compiler/";
const proyectBack = "admin/";
const nodeModules = "./node_modules/";

// Files src
const srcSass = `src/sass/`;
const srcJs = `src/js/`;
const srcIcomoonFront = `src/icomoon/icomoon-front/`;
const srcIcomoonBack = `src/icomoon/icomoon-back/`;
const srcIcomoonSocial = `src/icomoon/icomoon-social/`;
const srcImg = `src/images/`;

// Files dist
const distCss = `dist/css/`;
const distJs = `dist/js/`;
const distIcomoonFront = `dist/icomoon/icomoon-front/`;
const distIcomoonBack = `dist/icomoon/icomoon-back/`;
const distIcomoonSocial = `dist/icomoon/icomoon-social/`;
const distImg = `dist/images/`;

// Watch Files
const watchFiles = "**/*";
const watchFilesPhp = "**/*.php";
const watchFilesSass = "**/*.sass";
const watchFilesCss = "**/*.css";
const watchFilesJs = "**/*.js";


// FRONT
// -------------------------------------------------
// Roots used to concat the css files in a specific order.
const frontSrcCssRoots = [
	`${nodeModules}swiper/swiper-bundle.min.css`,
	//----------------
	`${distCss}styles.min.css`,
];

// Roots used to concat the js files in a specific order.
const frontSrcJsRoots = [
	`${nodeModules}jquery/dist/jquery.min.js`,
	`${nodeModules}jquery-validation/dist/jquery.validate.min.js`,
	`${nodeModules}jquery-validation/dist/additional-methods.min.js`,
	`${nodeModules}isotope-layout/dist/isotope.pkgd.min.js`,
	`${nodeModules}swiper/swiper-bundle.min.js`,
	//----------------
	`${srcJs}scripts.js`,
	//----------------
	`${srcJs}abstracts/variables/_abstracts-variables-breakpoints.js`,
	`${srcJs}abstracts/functions/_abstracts-functions-browser.js`,
	`${srcJs}abstracts/functions/_abstracts-functions-form-require.js`,
	`${srcJs}abstracts/functions/_abstracts-functions-form-validate.js`,
	`${srcJs}abstracts/functions/_abstracts-functions-form-validate-ckeditor.js`,
	//----------------
	`${srcJs}layouts/_layouts-nav.js`,
	//----------------
	`${srcJs}components/_components-form-require.js`,
	`${srcJs}components/_components-form-validate.js`,
	`${srcJs}components/_components-form-validate-ckeditor.js`,
	`${srcJs}components/_components-message.js`,
];


// BACK
// -------------------------------------------------
// Roots used to concat the css files in a specific order.
const backSrcCssRoots = [
	`${nodeModules}swiper/swiper-bundle.min.css`,
	//----------------
	`${proyectBack}${distCss}styles.min.css`,
];

// Roots used to concat the js files in a specific order.
const backSrcJsRoots = [
	`${nodeModules}jquery/dist/jquery.min.js`,
	`${nodeModules}jquery-validation/dist/jquery.validate.min.js`,
	`${nodeModules}jquery-validation/dist/additional-methods.min.js`,
	`${nodeModules}isotope-layout/dist/isotope.pkgd.min.js`,
	`${nodeModules}swiper/swiper-bundle.min.js`,
	//----------------
	`${proyectBack}${srcJs}scripts.js`,
	//----------------
	`${proyectBack}${srcJs}abstracts/variables/_abstracts-variables-breakpoints.js`,
	`${proyectBack}${srcJs}abstracts/functions/_abstracts-functions-browser.js`,
	`${proyectBack}${srcJs}abstracts/functions/_abstracts-functions-form-require.js`,
	`${proyectBack}${srcJs}abstracts/functions/_abstracts-functions-form-validate.js`,
	`${proyectBack}${srcJs}abstracts/functions/_abstracts-functions-form-validate-ckeditor.js`,
	//----------------
	`${proyectBack}${srcJs}layouts/_layouts-nav.js`,
	//----------------
	`${proyectBack}${srcJs}components/_components-form-require.js`,
	`${proyectBack}${srcJs}components/_components-form-validate.js`,
	`${proyectBack}${srcJs}components/_components-form-validate-ckeditor.js`,
	`${proyectBack}${srcJs}components/_components-message.js`,
];


// FUNCTIONS USED IN THE TASKS
// =================================================
function sassCompile(src, dist, fileName) {
	return gulp
		.src(src)
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
			})
		)
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename(fileName))
		.pipe(gulp.dest(dist))
};

function cssCompile(src, dist, fileName) {
	return gulp
		.src(src)
		.pipe(concat(fileName))
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(dist))
};

function jsCompile(src, dist, fileName) {
	return gulp
		.src(src)
		.pipe(
			babel({
				presets: [
					"@babel/preset-env",
				],
				compact: false,
			})
		)
		.pipe(concat(fileName))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(dist))
};

function cssIcomoonMinify(src, dist) {
	return gulp
		.src(`${src}style.css`)
		.pipe(
			srcMaps.init({
				loadMaps: true,
				largeFile: true,
			})
		)
		.pipe(cleanCss())
		.pipe(srcMaps.write("./maps/"))
		.pipe(lineEndingCorrector())
		.pipe(rename("fonts.min.css"))
		.pipe(gulp.dest(dist));
}

function copyFonts(src, dist) {
	return gulp
		.src(
			`${src}fonts/*`,
			{
				base: `./${src}`,
			}
		)
		.pipe(gulp.dest(dist));
}

function imageMinify(src, dist) {
	return gulp
		.src(src)
		.pipe(changed(dist))
		.pipe(
			imagemin([
				imageminGifsicle({
					interlaced: true,
				}),
				imageminJpegtran({
					progressive: true,
				}),
				imageminOptipng({
					optimizationLevel: 5,
				})
			])
		)
		.pipe(gulp.dest(dist));
}


// FUNCTIONS & TASKS
// =================================================
function createServer() {
	browserSync.init({
		open: "external",
		proxy: `http://localhost/${proyectName}`,
		port: 3306,
	});
};

// FRONT
// -------------------------------------------------
function front__sassCompile() {
	return sassCompile(
		[`${srcSass}styles.sass`],
		distCss,
		"styles.min.css"
	);
};

function front__cssCompile() {
	return cssCompile(
		frontSrcCssRoots,
		distCss,
		"styles.min.css"
	);
};

function front__jsCompile() {
	return jsCompile(
		frontSrcJsRoots,
		distJs,
		"scripts.min.js"
	);
};

function front__cssIcomoonMinify() {
	return cssIcomoonMinify(
		srcIcomoonFront,
		distIcomoonFront
	);
};

function front__cssIcomoonCopy() {
	return copyFonts(
		srcIcomoonFront,
		distIcomoonFront
	);
};

function front__cssIcomoonSocialMinify() {
	return cssIcomoonMinify(
		srcIcomoonSocial,
		distIcomoonSocial
	);
};

function front__cssIcomoonSocialCopy() {
	return copyFonts(
		srcIcomoonSocial,
		distIcomoonSocial
	);
};

function front__imageMinify() {
	return imageMinify(
		`${srcImg}${watchFiles}`,
		distImg
	);
};

// BACK
// -------------------------------------------------
function back__sassCompile() {
	return sassCompile(
		[`${proyectBack}${srcSass}styles.sass`],
		`${proyectBack}${distCss}`,
		"styles.min.css"
	);
};

function back__cssCompile() {
	return cssCompile(
		backSrcCssRoots,
		`${proyectBack}${distCss}`,
		"styles.min.css"
	);
};

function back__jsCompile() {
	return jsCompile(
		backSrcJsRoots,
		`${proyectBack}${distJs}`,
		"scripts.min.js"
	);
};

function back__cssIcomoonMinify() {
	return cssIcomoonMinify(
		`${proyectBack}${srcIcomoonBack}`,
		`${proyectBack}${distIcomoonBack}`
	);
};

function back__cssIcomoonCopy() {
	return copyFonts(
		`${proyectBack}${srcIcomoonBack}`,
		`${proyectBack}${distIcomoonBack}`
	);
};

function back__cssIcomoonSocialMinify() {
	return cssIcomoonMinify(
		`${proyectBack}${srcIcomoonSocial}`,
		`${proyectBack}${distIcomoonSocial}`
	);
};

function back__cssIcomoonSocialCopy() {
	return copyFonts(
		`${proyectBack}${srcIcomoonSocial}`,
		`${proyectBack}${distIcomoonSocial}`
	);
};

function back__imageMinify() {
	return imageMinify(
		`${srcImg}${watchFiles}`,
		`${proyectBack}${distImg}`
	);
};


// WATCH
// =================================================
function watch() {
	createServer();

	gulp.watch(
		[
			`${watchFilesPhp}`,
			`${distCss}${watchFilesCss}`,
			`${distJs}${watchFilesJs}`,
			`${distIcomoonFront}${watchFiles}`,
			`${distIcomoonSocial}${watchFiles}`,
			`${proyectBack}${watchFilesPhp}`,
			`${proyectBack}${distCss}${watchFilesCss}`,
			`${proyectBack}${distJs}${watchFilesJs}`,
			`${proyectBack}${distIcomoonBack}${watchFiles}`,
			`${proyectBack}${distIcomoonSocial}${watchFiles}`,
		]
	).on(
		"change",
		reload
	);

	// FRONT
	// -------------------------------------------------
	gulp.watch(
		`${srcSass}${watchFilesSass}`,
		gulp.series(
			front__sassCompile,
			front__cssCompile
		)
	);

	gulp.watch(
		`${srcJs}${watchFilesJs}`,
		front__jsCompile
	);

	gulp.watch(
		`${srcIcomoonFront}${watchFiles}`,
		gulp.series(
			front__cssIcomoonCopy,
			front__cssIcomoonMinify
		)
	);

	gulp.watch(
		`${srcIcomoonSocial}${watchFiles}`,
		gulp.series(
			front__cssIcomoonSocialCopy,
			front__cssIcomoonSocialMinify
		)
	);

	gulp.watch(
		`${srcImg}${watchFiles}`,
		front__imageMinify
	);

	// BACK
	// -------------------------------------------------
	gulp.watch(
		`${proyectBack}${srcSass}${watchFilesSass}`,
		gulp.series(
			back__sassCompile,
			back__cssCompile
		)
	);

	gulp.watch(
		`${proyectBack}${srcJs}${watchFilesJs}`,
		back__jsCompile
	);

	gulp.watch(
		`${proyectBack}${srcIcomoonBack}${watchFiles}`,
		gulp.series(
			back__cssIcomoonCopy,
			back__cssIcomoonMinify
		)
	);

	gulp.watch(
		`${proyectBack}${srcIcomoonSocial}${watchFiles}`,
		gulp.series(
			back__cssIcomoonSocialCopy,
			back__cssIcomoonSocialMinify
		)
	);

	gulp.watch(
		`${srcImg}${watchFiles}`,
		back__imageMinify
	);
};


// EXPORTS
// =================================================
exports.createServer = createServer;
exports.watch = watch;

// FRONT
// -------------------------------------------------
exports.front__sassCompile = front__sassCompile;
exports.front__cssCompile = front__cssCompile;
exports.front__jsCompile = front__jsCompile;
exports.front__cssIcomoonMinify = front__cssIcomoonMinify;
exports.front__cssIcomoonCopy = front__cssIcomoonCopy;
exports.front__cssIcomoonSocialMinify = front__cssIcomoonSocialMinify;
exports.front__cssIcomoonSocialCopy = front__cssIcomoonSocialCopy;
exports.front__imageMinify = front__imageMinify;

// BACK
// -------------------------------------------------
exports.back__sassCompile = back__sassCompile;
exports.back__cssCompile = back__cssCompile;
exports.back__jsCompile = back__jsCompile;
exports.back__cssIcomoonMinify = back__cssIcomoonMinify;
exports.back__cssIcomoonCopy = back__cssIcomoonCopy;
exports.back__cssIcomoonSocialMinify = back__cssIcomoonSocialMinify;
exports.back__cssIcomoonSocialCopy = back__cssIcomoonSocialCopy;
exports.back__imageMinify = back__imageMinify;


// TASKS
// =================================================
gulp.task(
	"serve",
	createServer
);

gulp.task(
	"default",
	watch
);

// FRONT
// -------------------------------------------------
gulp.task(
	"front",
	gulp.series(
		front__sassCompile,
		front__cssCompile,
		front__jsCompile,
		front__cssIcomoonMinify,
		front__cssIcomoonCopy,
		front__cssIcomoonSocialMinify,
		front__cssIcomoonSocialCopy,
		front__imageMinify
	)
);

gulp.task(
	"front-css",
	gulp.series(
		front__sassCompile,
		front__cssCompile
	)
);

gulp.task(
	"front-js",
	front__jsCompile
);

gulp.task(
	"front-icon",
	gulp.series(
		front__cssIcomoonMinify,
		front__cssIcomoonCopy,
		front__cssIcomoonSocialMinify,
		front__cssIcomoonSocialCopy
	)
);

gulp.task(
	"front-img",
	front__imageMinify
);

// BACK
// -------------------------------------------------
gulp.task(
	"back",
	gulp.series(
		back__sassCompile,
		back__cssCompile,
		back__jsCompile,
		back__cssIcomoonMinify,
		back__cssIcomoonCopy,
		back__cssIcomoonSocialMinify,
		back__cssIcomoonSocialCopy,
		back__imageMinify
	)
);

gulp.task(
	"back-css",
	gulp.series(
		back__sassCompile,
		back__cssCompile
	)
);

gulp.task(
	"back-js",
	back__jsCompile
);

gulp.task(
	"back-icon",
	gulp.series(
		back__cssIcomoonMinify,
		back__cssIcomoonCopy,
		back__cssIcomoonSocialMinify,
		back__cssIcomoonSocialCopy
	)
);

gulp.task(
	"back-img",
	back__imageMinify
);
