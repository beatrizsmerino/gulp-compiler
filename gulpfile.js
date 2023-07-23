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


// ROOTS
// =================================================
const proyectName = "gulp-compiler/";
const proyectFront = "";
const proyectBack = "admin/";

// Files src
const src = "src/";
const srcIcomoon = src + "icomoon/";
const srcIcomoonFront = srcIcomoon + "icomoon-front/";
const srcIcomoonBack = srcIcomoon + "icomoon-back/";
const srcIcomoonSocial = srcIcomoon + "icomoon-social/";
const srcSass = src + "sass/";
const srcJs = src + "js/";
const srcImg = src + "images/";

// Files dist
const dist = "dist/";
const distIcomoon = dist + "icomoon/";
const distIcomoonFront = distIcomoon + "icomoon-front/";
const distIcomoonBack = distIcomoon + "icomoon-back/";
const distIcomoonSocial = distIcomoon + "icomoon-social/";
const distCss = dist + "css/";
const distJs = dist + "js/";
const distImg = dist + "images/";

// Watch Files
const watchFiles = "**/*";
const watchFilesPhp = "**/*.php";
const watchFilesSass = "**/*.sass";
const watchFilesCss = "**/*.css";
const watchFilesJs = "**/*.js";
const watchFilesIcomoon = watchFiles;


// FRONT
// =================================================
const nodeModules = "./node_modules/";

const frontSrcIcomoon = proyectFront + srcIcomoonFront;
const frontSrcIcomoonSocial = proyectFront + srcIcomoonSocial;
const frontSrcSass = proyectFront + srcSass;
const frontSrcJs = proyectFront + srcJs;

const frontDistIcomoon = proyectFront + distIcomoonFront;
const frontDistIcomoonSocial = proyectFront + distIcomoonSocial;
const frontDistCss = proyectFront + distCss;
const frontDistJs = proyectFront + distJs;
const frontDistImg = proyectFront + distImg;

const frontWatchFilesPhp = proyectFront + watchFilesPhp;
const frontWatchFilesIcomoon = frontDistIcomoon + watchFilesIcomoon;
const frontWatchFilesIcomoonSocial = frontDistIcomoonSocial + watchFilesIcomoon;
const frontWatchFilesCss = frontDistCss + watchFilesCss;
const frontWatchFilesJs = frontDistJs + watchFilesJs;

// Roots used to concat the css files in a specific order.
const frontSrcCssRoots = [
	nodeModules + "swiper/swiper-bundle.min.css",
	frontDistCss + "styles.min.css",
];

// Roots used to concat the js files in a specific order.
const frontSrcJsRoots = [
	nodeModules + "jquery/dist/jquery.min.js",
	nodeModules + "jquery-validation/dist/jquery.validate.min.js",
	nodeModules + "jquery-validation/dist/additional-methods.min.js",
	nodeModules + "isotope-layout/dist/isotope.pkgd.min.js",
	nodeModules + "swiper/swiper-bundle.min.js",
	frontSrcJs + "scripts.js",
	frontSrcJs + "abstracts/variables/_abstracts-variables-breakpoints.js",
	frontSrcJs + "abstracts/functions/_abstracts-functions-browser.js",
	frontSrcJs + "abstracts/functions/_abstracts-functions-form-require.js",
	frontSrcJs + "abstracts/functions/_abstracts-functions-form-validate.js",
	frontSrcJs + "abstracts/functions/_abstracts-functions-form-validate-ckeditor.js",
	frontSrcJs + "layouts/_layouts-nav.js",
	frontSrcJs + "components/_components-form-require.js",
	frontSrcJs + "components/_components-form-validate.js",
	frontSrcJs + "components/_components-form-validate-ckeditor.js",
	frontSrcJs + "components/_components-message.js",
];

const frontSrcImgRoots = srcImg + watchFiles;


// BACK
// =================================================
const backSrcIcomoon = proyectBack + srcIcomoonBack;
const backSrcIcomoonSocial = proyectBack + srcIcomoonSocial;
const backSrcSass = proyectBack + srcSass;
const backSrcJs = proyectBack + srcJs;

const backDistIcomoon = proyectBack + distIcomoonBack;
const backDistIcomoonSocial = proyectBack + distIcomoonSocial;
const backDistCss = proyectBack + distCss;
const backDistJs = proyectBack + distJs;
const backDistImg = proyectBack + distImg;

const backWatchFilesPhp = proyectBack + watchFilesPhp;
const backWatchFilesIcomoon = backDistIcomoon + watchFilesIcomoon;
const backWatchFilesIcomoonSocial = backDistIcomoonSocial + watchFilesIcomoon;
const backWatchFilesCss = backDistCss + watchFilesCss;
const backWatchFilesJs = backDistJs + watchFilesJs;

// Roots used to concat the css files in a specific order.
const backSrcCssRoots = [
	nodeModules + "swiper/swiper-bundle.min.css",
	backDistCss + "styles.min.css",
];

// Roots used to concat the js files in a specific order.
const backSrcJsRoots = [
	nodeModules + "jquery/dist/jquery.min.js",
	nodeModules + "jquery-validation/dist/jquery.validate.min.js",
	nodeModules + "jquery-validation/dist/additional-methods.min.js",
	nodeModules + "isotope-layout/dist/isotope.pkgd.min.js",
	nodeModules + "swiper/swiper-bundle.min.js",
	backSrcJs + "scripts.js",
	backSrcJs + "abstracts/variables/_abstracts-variables-breakpoints.js",
	backSrcJs + "abstracts/functions/_abstracts-functions-browser.js",
	backSrcJs + "abstracts/functions/_abstracts-functions-form-require.js",
	backSrcJs + "abstracts/functions/_abstracts-functions-form-validate.js",
	backSrcJs + "abstracts/functions/_abstracts-functions-form-validate-ckeditor.js",
	backSrcJs + "layouts/_layouts-nav.js",
	backSrcJs + "components/_components-form-require.js",
	backSrcJs + "components/_components-form-validate.js",
	backSrcJs + "components/_components-form-validate-ckeditor.js",
	backSrcJs + "components/_components-message.js",
];

const backSrcImgRoots = srcImg + watchFiles;


// GULP TASK - FRONT
// =================================================
function front__cssIcomoonMinify() {
	return gulp
		.src(frontSrcIcomoon + "style.css")
		.pipe(
			srcMaps.init({
				loadMaps: true,
				largeFile: true
			})
		)
		.pipe(cleanCss())
		.pipe(srcMaps.write("./maps/"))
		.pipe(lineEndingCorrector())
		.pipe(rename("fonts.min.css"))
		.pipe(gulp.dest(frontDistIcomoon));
};

function front__cssIcomoonCopy() {
	return gulp
		.src(
			frontSrcIcomoon + "fonts/*",
			{
				base: "./" + frontSrcIcomoon
			}
		)
		.pipe(gulp.dest(frontDistIcomoon));
};

function front__cssIcomoonSocialMinify() {
	return gulp
		.src(frontSrcIcomoonSocial + "style.css")
		.pipe(
			srcMaps.init({
				loadMaps: true,
				largeFile: true
			})
		)
		.pipe(cleanCss())
		.pipe(srcMaps.write("./maps/"))
		.pipe(lineEndingCorrector())
		.pipe(rename("fonts.min.css"))
		.pipe(gulp.dest(frontDistIcomoonSocial));
};

function front__cssIcomoonSocialCopy() {
	return gulp
		.src(
			frontSrcIcomoonSocial + "fonts/*",
			{
				base: "./" + frontSrcIcomoonSocial
			}
		)
		.pipe(gulp.dest(frontDistIcomoonSocial));
};

function front__sassCompile() {
	return gulp
		.src([
			frontSrcSass + "styles.sass"
		])
		.pipe(
			srcMaps.init({
				loadMaps: true
			})
		)
		.pipe(
			sass({
				outputStyle: "compressed"
			}).on(
				"error",
				sass.logError
			)
		)
		.pipe(
			autoprefixer({
				versions: [
					"last 2 versions"
				]
			})
		)
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(frontDistCss))
};

function front__cssCompile() {
	return gulp
		.src(frontSrcCssRoots)
		.pipe(concat("styles.min.css"))
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(frontDistCss))
};

function front__jsCompile() {
	return gulp
		.src(frontSrcJsRoots)
		.pipe(
			babel({
				"presets": [
					"@babel/preset-env"
				],
				"compact": false
			})
		)
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(frontDistJs))
};

function front__imageMinify() {
	return gulp
		.src(frontSrcImgRoots)
		.pipe(changed(frontDistImg))
		.pipe(
			imagemin([
				imageminGifsicle({
					interlaced: true
				}),
				imageminJpegtran({
					progressive: true
				}),
				imageminOptipng({
					optimizationLevel: 5
				})
			])
		)
		.pipe(gulp.dest(frontDistImg));
};


// GULP TASK - BACK
// =================================================
function back__cssIcomoonMinify() {
	return gulp
		.src(backSrcIcomoon + "style.css")
		.pipe(
			srcMaps.init({
				loadMaps: true,
				largeFile: true
			})
		)
		.pipe(cleanCss())
		.pipe(srcMaps.write("./maps/"))
		.pipe(lineEndingCorrector())
		.pipe(rename("fonts.min.css"))
		.pipe(gulp.dest(backDistIcomoon));
};

function back__cssIcomoonCopy() {
	return gulp
		.src(
			backSrcIcomoon + "fonts/*",
			{
				base: "./" + backSrcIcomoon
			}
		)
		.pipe(gulp.dest(backDistIcomoon));
};

function back__cssIcomoonSocialMinify() {
	return gulp
		.src(backSrcIcomoonSocial + "style.css")
		.pipe(
			srcMaps.init({
				loadMaps: true,
				largeFile: true
			})
		)
		.pipe(cleanCss())
		.pipe(srcMaps.write("./maps/"))
		.pipe(lineEndingCorrector())
		.pipe(rename("fonts.min.css"))
		.pipe(gulp.dest(backDistIcomoonSocial));
};

function back__cssIcomoonSocialCopy() {
	return gulp
		.src(
			backSrcIcomoonSocial + "fonts/*",
			{
				base: "./" + backSrcIcomoonSocial
			}
		)
		.pipe(gulp.dest(backDistIcomoonSocial));
};

function back__sassCompile() {
	return gulp
		.src([
			backSrcSass + "styles.sass"
		])
		.pipe(
			srcMaps.init({
				loadMaps: true
			})
		)
		.pipe(
			sass({
				outputStyle: "compressed"
			}).on(
				"error",
				sass.logError
			)
		)
		.pipe(
			autoprefixer({
				versions: [
					"last 2 versions"
				]
			})
		)
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(rename("styles.min.css"))
		.pipe(gulp.dest(backDistCss))
};

function back__cssCompile() {
	return gulp
		.src(backSrcCssRoots)
		.pipe(concat("styles.min.css"))
		.pipe(srcMaps.write())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(backDistCss))
};

function back__jsCompile() {
	return gulp
		.src(backSrcJsRoots)
		.pipe(
			babel({
				"presets": [
					"@babel/preset-env"
				],
				"compact": false
			})
		)
		.pipe(concat("scripts.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(backDistJs))
};

function back__imageMinify() {
	return gulp
		.src(backSrcImgRoots)
		.pipe(changed(backDistImg))
		.pipe(
			imagemin([
				imageminGifsicle({
					interlaced: true
				}),
				imageminJpegtran({
					progressive: true
				}),
				imageminOptipng({
					optimizationLevel: 5
				})
			])
		)
		.pipe(gulp.dest(backDistImg));
};


// WATCH and EXPORTS
// =================================================
function watch() {
	browserSync.init({
		open: "external",
		proxy: "http://localhost/" + proyectName,
		port: 3306,
	});

	gulp.watch(
		frontSrcJs + watchFilesJs,
		front__jsCompile
	);

	gulp.watch(
		frontSrcSass + watchFilesSass,
		gulp.series(
			front__sassCompile,
			front__cssCompile
		)
	);

	gulp.watch(
		frontSrcIcomoon + watchFiles,
		gulp.series(
			front__cssIcomoonCopy,
			front__cssIcomoonMinify
		)
	);

	gulp.watch(
		frontSrcIcomoonSocial + watchFiles,
		gulp.series(
			front__cssIcomoonSocialCopy,
			front__cssIcomoonSocialMinify
		)
	);

	gulp.watch(
		srcImg + watchFiles,
		front__imageMinify
	);

	gulp.watch(
		backSrcJs + watchFilesJs,
		back__jsCompile
	);

	gulp.watch(
		backSrcSass + watchFilesSass,
		gulp.series(
			back__sassCompile,
			back__cssCompile
		)
	);

	gulp.watch(
		backSrcIcomoon + watchFiles,
		gulp.series(
			back__cssIcomoonCopy,
			back__cssIcomoonMinify
		)
	);

	gulp.watch(
		backSrcIcomoonSocial + watchFiles,
		gulp.series(
			back__cssIcomoonSocialCopy,
			back__cssIcomoonSocialMinify
		)
	);

	gulp.watch(
		srcImg + watchFiles,
		back__imageMinify
	);

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
	).on(
		"change",
		reload
	);
};


exports.front__cssIcomoonMinify = front__cssIcomoonMinify;
exports.front__cssIcomoonCopy = front__cssIcomoonCopy;
exports.front__cssIcomoonSocialMinify = front__cssIcomoonSocialMinify;
exports.front__cssIcomoonSocialCopy = front__cssIcomoonSocialCopy;
exports.front__sassCompile = front__sassCompile;
exports.front__cssCompile = front__cssCompile;
exports.front__jsCompile = front__jsCompile;
exports.front__imageMinify = front__imageMinify;

exports.back__cssIcomoonMinify = back__cssIcomoonMinify;
exports.back__cssIcomoonCopy = back__cssIcomoonCopy;
exports.back__cssIcomoonSocialMinify = back__cssIcomoonSocialMinify;
exports.back__cssIcomoonSocialCopy = back__cssIcomoonSocialCopy;
exports.back__sassCompile = back__sassCompile;
exports.back__cssCompile = back__cssCompile;
exports.back__jsCompile = back__jsCompile;
exports.back__imageMinify = back__imageMinify;

exports.watch = watch;


gulp.task(
	"front-js",
	gulp.series(
		front__jsCompile,
	)
);

gulp.task(
	"back-js",
	gulp.series(
		back__jsCompile,
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
	"back-css",
	gulp.series(
		back__sassCompile,
		back__cssCompile
	)
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
	"back-icon",
	gulp.series(
		back__cssIcomoonMinify,
		back__cssIcomoonCopy,
		back__cssIcomoonSocialMinify,
		back__cssIcomoonSocialCopy
	)
);

gulp.task(
	"front-img",
	gulp.series(
		front__imageMinify
	)
);

gulp.task(
	"back-img",
	gulp.series(
		back__imageMinify
	)
);

gulp.task(
	"front",
	gulp.series(
		front__cssIcomoonMinify,
		front__cssIcomoonCopy,
		front__cssIcomoonSocialMinify,
		front__cssIcomoonSocialCopy,
		front__sassCompile,
		front__cssCompile,
		front__jsCompile,
		front__imageMinify
	)
);

gulp.task(
	"back",
	gulp.series(
		back__cssIcomoonMinify,
		back__cssIcomoonCopy,
		back__cssIcomoonSocialMinify,
		back__cssIcomoonSocialCopy,
		back__sassCompile,
		back__cssCompile,
		back__jsCompile,
		back__imageMinify
	)
);

gulp.task(
	"default",
	gulp.parallel(
		watch
	)
);