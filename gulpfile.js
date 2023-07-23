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
	return gulp
		.src([
			`${srcSass}styles.sass`,
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
			})
		)
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(`${distCss}`))
};

function front__cssCompile() {
	return gulp
		.src(frontSrcCssRoots)
		.pipe(concat("styles.min.css"))
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(`${distCss}`))
};

function front__jsCompile() {
	return gulp
		.src(frontSrcJsRoots)
		.pipe(
			babel({
				presets: [
					"@babel/preset-env",
				],
				compact: false,
			})
		)
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(`${distJs}`))
};

function front__cssIcomoonMinify() {
	return gulp
		.src(`${srcIcomoonFront}style.css`)
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
		.pipe(gulp.dest(`${distIcomoonFront}`));
};

function front__cssIcomoonCopy() {
	return gulp
		.src(
			`${srcIcomoonFront}fonts/*`,
			{
				base: `./${srcIcomoonFront}`,
			}
		)
		.pipe(gulp.dest(`${distIcomoonFront}`));
};

function front__cssIcomoonSocialMinify() {
	return gulp
		.src(`${srcIcomoonSocial}style.css`)
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
		.pipe(gulp.dest(`${distIcomoonSocial}`));
};

function front__cssIcomoonSocialCopy() {
	return gulp
		.src(
			`${srcIcomoonSocial}fonts/*`,
			{
				base: `./${srcIcomoonSocial}`,
			}
		)
		.pipe(gulp.dest(`${distIcomoonSocial}`));
};

function front__imageMinify() {
	return gulp
		.src(`${srcImg}${watchFiles}`)
		.pipe(changed(`${distImg}`))
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
		.pipe(gulp.dest(`${distImg}`));
};

// BACK
// -------------------------------------------------
function back__sassCompile() {
	return gulp
		.src([
			`${proyectBack}${srcSass}styles.sass`
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
			})
		)
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(`${proyectBack}${distCss}`))
};

function back__cssCompile() {
	return gulp
		.src(backSrcCssRoots)
		.pipe(concat("styles.min.css"))
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(`${proyectBack}${distCss}`))
};

function back__jsCompile() {
	return gulp
		.src(backSrcJsRoots)
		.pipe(
			babel({
				presets: [
					"@babel/preset-env",
				],
				compact: false,
			})
		)
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(`${proyectBack}${distJs}`))
};

function back__cssIcomoonMinify() {
	return gulp
		.src(`${proyectBack}${srcIcomoonBack}style.css`)
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
		.pipe(gulp.dest(`${proyectBack}${distIcomoonBack}`));
};

function back__cssIcomoonCopy() {
	return gulp
		.src(
			`${proyectBack}${srcIcomoonBack}fonts/*`,
			{
				base: `./${proyectBack}${srcIcomoonBack}`,
			}
		)
		.pipe(gulp.dest(`${proyectBack}${distIcomoonBack}`));
};

function back__cssIcomoonSocialMinify() {
	return gulp
		.src(`${proyectBack}${srcIcomoonSocial}style.css`)
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
		.pipe(gulp.dest(`${proyectBack}${distIcomoonSocial}`));
};

function back__cssIcomoonSocialCopy() {
	return gulp
		.src(
			`${proyectBack}${srcIcomoonSocial}fonts/*`,
			{
				base: `./${proyectBack}${srcIcomoonSocial}`,
			}
		)
		.pipe(gulp.dest(`${proyectBack}${distIcomoonSocial}`));
};

function back__imageMinify() {
	return gulp
		.src(`${srcImg}${watchFiles}`)
		.pipe(changed(`${proyectBack}${distImg}`))
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
		.pipe(gulp.dest(`${proyectBack}${distImg}`));
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
