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
const paths = {
	proyect: {
		name: "gulp-compiler/",
		back: "admin/",
		node: "node_modules/",
	},
	src: {
		base: "src/",
		sass: "src/sass/",
		js: "src/js/",
		icons: {
			front: "src/icomoon/icomoon-front/",
			back: "src/icomoon/icomoon-back/",
			social: "src/icomoon/icomoon-social/"
		},
		img: "src/images/",
	},
	dist: {
		base: "dist/",
		css: "dist/css/",
		js: "dist/js/",
		icons: {
			front: "dist/icomoon/icomoon-front/",
			back: "dist/icomoon/icomoon-back/",
			social: "dist/icomoon/icomoon-social/"
		},
		img: "dist/images/",
	},
	files: {
		base: "**/*",
		php: "**/*.php",
		sass: "**/*.sass",
		css: "**/*.css",
		js: "**/*.js",
	},
};


// FRONT
// -------------------------------------------------
// Roots used to concat the css files in a specific order.
const frontSrcCssRoots = [
	`${paths.proyect.node}swiper/swiper-bundle.min.css`,
	//----------------
	`${paths.dist.css}styles.min.css`,
];

// Roots used to concat the js files in a specific order.
const frontSrcJsRoots = [
	`${paths.proyect.node}jquery/dist/jquery.min.js`,
	`${paths.proyect.node}jquery-validation/dist/jquery.validate.min.js`,
	`${paths.proyect.node}jquery-validation/dist/additional-methods.min.js`,
	`${paths.proyect.node}isotope-layout/dist/isotope.pkgd.min.js`,
	`${paths.proyect.node}swiper/swiper-bundle.min.js`,
	//----------------
	`${paths.src.js}scripts.js`,
	//----------------
	`${paths.src.js}abstracts/variables/_abstracts-variables-breakpoints.js`,
	`${paths.src.js}abstracts/functions/_abstracts-functions-browser.js`,
	`${paths.src.js}abstracts/functions/_abstracts-functions-form-require.js`,
	`${paths.src.js}abstracts/functions/_abstracts-functions-form-validate.js`,
	`${paths.src.js}abstracts/functions/_abstracts-functions-form-validate-ckeditor.js`,
	//----------------
	`${paths.src.js}layouts/_layouts-nav.js`,
	//----------------
	`${paths.src.js}components/_components-form-require.js`,
	`${paths.src.js}components/_components-form-validate.js`,
	`${paths.src.js}components/_components-form-validate-ckeditor.js`,
	`${paths.src.js}components/_components-message.js`,
];


// BACK
// -------------------------------------------------
// Roots used to concat the css files in a specific order.
const backSrcCssRoots = [
	`${paths.proyect.node}swiper/swiper-bundle.min.css`,
	//----------------
	`${paths.proyect.back}${paths.dist.css}styles.min.css`,
];

// Roots used to concat the js files in a specific order.
const backSrcJsRoots = [
	`${paths.proyect.node}jquery/dist/jquery.min.js`,
	`${paths.proyect.node}jquery-validation/dist/jquery.validate.min.js`,
	`${paths.proyect.node}jquery-validation/dist/additional-methods.min.js`,
	`${paths.proyect.node}isotope-layout/dist/isotope.pkgd.min.js`,
	`${paths.proyect.node}swiper/swiper-bundle.min.js`,
	//----------------
	`${paths.proyect.back}${paths.src.js}scripts.js`,
	//----------------
	`${paths.proyect.back}${paths.src.js}abstracts/variables/_abstracts-variables-breakpoints.js`,
	`${paths.proyect.back}${paths.src.js}abstracts/functions/_abstracts-functions-browser.js`,
	`${paths.proyect.back}${paths.src.js}abstracts/functions/_abstracts-functions-form-require.js`,
	`${paths.proyect.back}${paths.src.js}abstracts/functions/_abstracts-functions-form-validate.js`,
	`${paths.proyect.back}${paths.src.js}abstracts/functions/_abstracts-functions-form-validate-ckeditor.js`,
	//----------------
	`${paths.proyect.back}${paths.src.js}layouts/_layouts-nav.js`,
	//----------------
	`${paths.proyect.back}${paths.src.js}components/_components-form-require.js`,
	`${paths.proyect.back}${paths.src.js}components/_components-form-validate.js`,
	`${paths.proyect.back}${paths.src.js}components/_components-form-validate-ckeditor.js`,
	`${paths.proyect.back}${paths.src.js}components/_components-message.js`,
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
		proxy: `http://localhost/${paths.proyect.name}`,
		port: 3306,
	});
};

// FRONT
// -------------------------------------------------
function front__sassCompile() {
	return sassCompile(
		[`${paths.src.sass}styles.sass`],
		paths.dist.css,
		"styles.min.css"
	);
};

function front__cssCompile() {
	return cssCompile(
		frontSrcCssRoots,
		paths.dist.css,
		"styles.min.css"
	);
};

function front__jsCompile() {
	return jsCompile(
		frontSrcJsRoots,
		paths.dist.js,
		"scripts.min.js"
	);
};

function front__cssIcomoonMinify() {
	return cssIcomoonMinify(
		paths.src.icons.front,
		paths.dist.icons.front
	);
};

function front__cssIcomoonCopy() {
	return copyFonts(
		paths.src.icons.front,
		paths.dist.icons.front
	);
};

function front__cssIcomoonSocialMinify() {
	return cssIcomoonMinify(
		paths.src.icons.social,
		paths.dist.icons.social
	);
};

function front__cssIcomoonSocialCopy() {
	return copyFonts(
		paths.src.icons.social,
		paths.dist.icons.social
	);
};

function front__imageMinify() {
	return imageMinify(
		`${paths.src.img}${paths.files.base}`,
		paths.dist.img
	);
};

// BACK
// -------------------------------------------------
function back__sassCompile() {
	return sassCompile(
		[`${paths.proyect.back}${paths.src.sass}styles.sass`],
		`${paths.proyect.back}${paths.dist.css}`,
		"styles.min.css"
	);
};

function back__cssCompile() {
	return cssCompile(
		backSrcCssRoots,
		`${paths.proyect.back}${paths.dist.css}`,
		"styles.min.css"
	);
};

function back__jsCompile() {
	return jsCompile(
		backSrcJsRoots,
		`${paths.proyect.back}${paths.dist.js}`,
		"scripts.min.js"
	);
};

function back__cssIcomoonMinify() {
	return cssIcomoonMinify(
		`${paths.proyect.back}${paths.src.icons.back}`,
		`${paths.proyect.back}${paths.dist.icons.back}`
	);
};

function back__cssIcomoonCopy() {
	return copyFonts(
		`${paths.proyect.back}${paths.src.icons.back}`,
		`${paths.proyect.back}${paths.dist.icons.back}`
	);
};

function back__cssIcomoonSocialMinify() {
	return cssIcomoonMinify(
		`${paths.proyect.back}${paths.src.icons.social}`,
		`${paths.proyect.back}${paths.dist.icons.social}`
	);
};

function back__cssIcomoonSocialCopy() {
	return copyFonts(
		`${paths.proyect.back}${paths.src.icons.social}`,
		`${paths.proyect.back}${paths.dist.icons.social}`
	);
};

function back__imageMinify() {
	return imageMinify(
		`${paths.src.img}${paths.files.base}`,
		`${paths.proyect.back}${paths.dist.img}`
	);
};


// WATCH
// =================================================
function watch() {
	createServer();

	gulp.watch(
		[
			`${paths.files.php}`,
			`${paths.dist.css}${paths.files.css}`,
			`${paths.dist.js}${paths.files.js}`,
			`${paths.dist.icons.front}${paths.files.base}`,
			`${paths.dist.icons.social}${paths.files.base}`,
			`${paths.proyect.back}${paths.files.php}`,
			`${paths.proyect.back}${paths.dist.css}${paths.files.css}`,
			`${paths.proyect.back}${paths.dist.js}${paths.files.js}`,
			`${paths.proyect.back}${paths.dist.icons.back}${paths.files.base}`,
			`${paths.proyect.back}${paths.dist.icons.social}${paths.files.base}`,
		]
	).on(
		"change",
		reload
	);

	// FRONT
	// -------------------------------------------------
	gulp.watch(
		`${paths.src.sass}${paths.files.sass}`,
		gulp.series(
			front__sassCompile,
			front__cssCompile
		)
	);

	gulp.watch(
		`${paths.src.js}${paths.files.js}`,
		front__jsCompile
	);

	gulp.watch(
		`${paths.src.icons.front}${paths.files.base}`,
		gulp.series(
			front__cssIcomoonCopy,
			front__cssIcomoonMinify
		)
	);

	gulp.watch(
		`${paths.src.icons.social}${paths.files.base}`,
		gulp.series(
			front__cssIcomoonSocialCopy,
			front__cssIcomoonSocialMinify
		)
	);

	gulp.watch(
		`${paths.src.img}${paths.files.base}`,
		front__imageMinify
	);

	// BACK
	// -------------------------------------------------
	gulp.watch(
		`${paths.proyect.back}${paths.src.sass}${paths.files.sass}`,
		gulp.series(
			back__sassCompile,
			back__cssCompile
		)
	);

	gulp.watch(
		`${paths.proyect.back}${paths.src.js}${paths.files.js}`,
		back__jsCompile
	);

	gulp.watch(
		`${paths.proyect.back}${paths.src.icons.back}${paths.files.base}`,
		gulp.series(
			back__cssIcomoonCopy,
			back__cssIcomoonMinify
		)
	);

	gulp.watch(
		`${paths.proyect.back}${paths.src.icons.social}${paths.files.base}`,
		gulp.series(
			back__cssIcomoonSocialCopy,
			back__cssIcomoonSocialMinify
		)
	);

	gulp.watch(
		`${paths.src.img}${paths.files.base}`,
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
