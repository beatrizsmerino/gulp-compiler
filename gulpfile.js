"use strict";



// DEPENDENCIES
// =================================================
const browserSync = require("browser-sync");
const gulp = require("gulp");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpBabel = require("gulp-babel");
const gulpChanged = require("gulp-changed");
const gulpCleanCss = require("gulp-clean-css");
const gulpConcat = require("gulp-concat");
const gulpImagemin = require("gulp-imagemin");
const gulpLineEndingCorrector = require("gulp-line-ending-corrector");
const gulpRename = require("gulp-rename");
const gulpSass = require("gulp-sass")(require("sass"));
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpUglify = require("gulp-uglify");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");

const createBrowserSync = browserSync.create();
const reloadBrowserSync = createBrowserSync.reload;


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
		icons: "src/icomoon/",
		img: "src/images/",
	},
	dist: {
		base: "dist/",
		css: "dist/css/",
		js: "dist/js/",
		icons: "dist/icomoon/",
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
const pathsFront = {
	src: {
		sass: `${paths.src.sass}styles.sass`,
		css: [
			`${paths.proyect.node}swiper/swiper-bundle.min.css`,
			//----------------
			`${paths.dist.css}styles.min.css`,
		],
		js: [
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
		],
		icons: {
			main: `${paths.src.icons}icomoon-front/`,
			social: `${paths.src.icons}icomoon-social/`
		},
		img: `${paths.src.img}${paths.files.base}`
	},
	dist: {
		css: paths.dist.css,
		js: paths.dist.js,
		icons: {
			main: `${paths.dist.icons}icomoon-front/`,
			social: `${paths.dist.icons}icomoon-social/`
		},
		img: paths.dist.img
	}
};

// BACK
// -------------------------------------------------
const pathsBack = {
	src: {
		sass: `${paths.proyect.back}${paths.src.sass}styles.sass`,
		css: [
			`${paths.proyect.node}swiper/swiper-bundle.min.css`,
			//----------------
			`${paths.proyect.back}${paths.dist.css}styles.min.css`,
		],
		js: [
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
		],
		icons: {
			main: `${paths.proyect.back}${paths.src.icons}icomoon-back/`,
			social: `${paths.proyect.back}${paths.src.icons}icomoon-social/`
		},
		img: `${paths.proyect.back}${paths.src.img}${paths.files.base}`
	},
	dist: {
		css: `${paths.proyect.back}${paths.dist.css}`,
		js: `${paths.proyect.back}${paths.dist.js}`,
		icons: {
			main: `${paths.proyect.back}${paths.dist.icons}icomoon-back/`,
			social: `${paths.proyect.back}${paths.dist.icons}icomoon-social/`
		},
		img: `${paths.proyect.back}${paths.dist.img}`
	}
};


// FUNCTIONS USED IN THE TASKS
// =================================================
function sassCompile(src, dist, fileName) {
	return gulp
		.src(src)
		.pipe(
			gulpSourcemaps.init({
				loadMaps: true,
			})
		)
		.pipe(
			gulpSass({
				outputStyle: "compressed",
			}).on(
				"error",
				gulpSass.logError
			)
		)
		.pipe(
			gulpAutoprefixer({
				versions: [
					"last 2 versions",
				],
			})
		)
		.pipe(gulpSourcemaps.write())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulpRename(fileName))
		.pipe(gulp.dest(dist))
};

function cssCompile(src, dist, fileName) {
	return gulp
		.src(src)
		.pipe(gulpConcat(fileName))
		.pipe(gulpSourcemaps.write())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(dist))
};

function jsCompile(src, dist, fileName) {
	return gulp
		.src(src)
		.pipe(
			gulpBabel({
				presets: [
					"@babel/preset-env",
				],
				compact: false,
			})
		)
		.pipe(gulpConcat(fileName))
		.pipe(gulpUglify())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(dist))
};

function fontsIcomoonCopy(src, dist) {
	return gulp
		.src(
			`${src}fonts/*`,
			{
				base: `./${src}`,
			}
		)
		.pipe(gulp.dest(dist));
}

function cssIcomoonMinify(src, dist) {
	return gulp
		.src(`${src}style.css`)
		.pipe(
			gulpSourcemaps.init({
				loadMaps: true,
				largeFile: true,
			})
		)
		.pipe(gulpCleanCss())
		.pipe(gulpSourcemaps.write("./maps/"))
		.pipe(gulpLineEndingCorrector())
		.pipe(gulpRename("fonts.min.css"))
		.pipe(gulp.dest(dist));
}

function imageMinify(src, dist) {
	return gulp
		.src(src)
		.pipe(gulpChanged(dist))
		.pipe(
			gulpImagemin([
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
	createBrowserSync.init({
		open: "external",
		proxy: `http://localhost/${paths.proyect.name}`,
		port: 3306,
	});
};

// FRONT
// -------------------------------------------------
function front__sassCompile() {
	return sassCompile(
		pathsFront.src.sass,
		pathsFront.dist.css,
		"styles.min.css"
	);
};

function front__cssCompile() {
	return cssCompile(
		pathsFront.src.css,
		pathsFront.dist.css,
		"styles.min.css"
	);
};

function front__jsCompile() {
	return jsCompile(
		pathsFront.src.js,
		pathsFront.dist.js,
		"scripts.min.js"
	);
};

function front__cssIcomoonMainCopy() {
	return fontsIcomoonCopy(
		pathsFront.src.icons.main,
		pathsFront.dist.icons.main
	);
};

function front__cssIcomoonMainMinify() {
	return cssIcomoonMinify(
		pathsFront.src.icons.main,
		pathsFront.dist.icons.main
	);
};

function front__cssIcomoonSocialCopy() {
	return fontsIcomoonCopy(
		pathsFront.src.icons.social,
		pathsFront.dist.icons.social
	);
};

function front__cssIcomoonSocialMinify() {
	return cssIcomoonMinify(
		pathsFront.src.icons.social,
		pathsFront.dist.icons.social
	);
};

function front__imageMinify() {
	return imageMinify(
		pathsFront.src.img,
		pathsFront.dist.img
	);
};

// BACK
// -------------------------------------------------
function back__sassCompile() {
	return sassCompile(
		pathsBack.src.sass,
		pathsBack.dist.css,
		"styles.min.css"
	);
};

function back__cssCompile() {
	return cssCompile(
		pathsBack.src.css,
		pathsBack.dist.css,
		"styles.min.css"
	);
};

function back__jsCompile() {
	return jsCompile(
		pathsBack.src.js,
		pathsBack.dist.js,
		"scripts.min.js"
	);
};

function back__cssIcomoonMainCopy() {
	return fontsIcomoonCopy(
		pathsBack.src.icons.main,
		pathsBack.dist.icons.main
	);
};

function back__cssIcomoonMainMinify() {
	return cssIcomoonMinify(
		pathsBack.src.icons.main,
		pathsBack.dist.icons.main
	);
};

function back__cssIcomoonSocialCopy() {
	return fontsIcomoonCopy(
		pathsBack.src.icons.social,
		pathsBack.dist.icons.social
	);
};

function back__cssIcomoonSocialMinify() {
	return cssIcomoonMinify(
		pathsBack.src.icons.social,
		pathsBack.dist.icons.social
	);
};

function back__imageMinify() {
	return imageMinify(
		pathsBack.src.img,
		pathsBack.dist.img
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
			`${paths.dist.icons}${paths.files.base}`,
			`${paths.dist.img}${paths.files.base}`,
			`${paths.proyect.back}${paths.files.php}`,
			`${paths.proyect.back}${paths.dist.css}${paths.files.css}`,
			`${paths.proyect.back}${paths.dist.js}${paths.files.js}`,
			`${paths.proyect.back}${paths.dist.icons}${paths.files.base}`,
			`${paths.proyect.back}${paths.dist.img}${paths.files.base}`
		]
	).on(
		"change",
		reloadBrowserSync
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
		`${pathsFront.src.icons.main}${paths.files.base}`,
		gulp.series(
			front__cssIcomoonMainCopy,
			front__cssIcomoonMainMinify
		)
	);

	gulp.watch(
		`${pathsFront.src.icons.social}${paths.files.base}`,
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
		`${pathsBack.src.icons.main}${paths.files.base}`,
		gulp.series(
			back__cssIcomoonMainCopy,
			back__cssIcomoonMainMinify
		)
	);

	gulp.watch(
		`${pathsBack.src.icons.social}${paths.files.base}`,
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
exports.front__cssIcomoonMainCopy = front__cssIcomoonMainCopy;
exports.front__cssIcomoonMainMinify = front__cssIcomoonMainMinify;
exports.front__cssIcomoonSocialCopy = front__cssIcomoonSocialCopy;
exports.front__cssIcomoonSocialMinify = front__cssIcomoonSocialMinify;
exports.front__imageMinify = front__imageMinify;

// BACK
// -------------------------------------------------
exports.back__sassCompile = back__sassCompile;
exports.back__cssCompile = back__cssCompile;
exports.back__jsCompile = back__jsCompile;
exports.back__cssIcomoonMainCopy = back__cssIcomoonMainCopy;
exports.back__cssIcomoonMainMinify = back__cssIcomoonMainMinify;
exports.back__cssIcomoonSocialCopy = back__cssIcomoonSocialCopy;
exports.back__cssIcomoonSocialMinify = back__cssIcomoonSocialMinify;
exports.back__imageMinify = back__imageMinify;


// TASKS
// =================================================
gulp.task(
	"default",
	gulp.series(
		gulp.series(
			gulp.series(
				front__sassCompile,
				front__cssCompile
			),
			front__jsCompile,
			gulp.series(
				front__cssIcomoonMainCopy,
				front__cssIcomoonMainMinify,
				front__cssIcomoonSocialCopy,
				front__cssIcomoonSocialMinify
			),
			front__imageMinify
		),
		gulp.series(
			gulp.series(
				back__sassCompile,
				back__cssCompile
			),
			back__jsCompile,
			gulp.series(
				back__cssIcomoonMainCopy,
				back__cssIcomoonMainMinify,
				back__cssIcomoonSocialCopy,
				back__cssIcomoonSocialMinify
			),
			back__imageMinify
		),
		watch
	)
);

gulp.task(
	"serve",
	createServer
);

gulp.task(
	"watch",
	watch
);

// FRONT
// -------------------------------------------------
gulp.task(
	"front-build",
	gulp.series(
		front__sassCompile,
		front__cssCompile,
		front__jsCompile,
		front__cssIcomoonMainCopy,
		front__cssIcomoonMainMinify,
		front__cssIcomoonSocialCopy,
		front__cssIcomoonSocialMinify,
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
		front__cssIcomoonMainCopy,
		front__cssIcomoonMainMinify,
		front__cssIcomoonSocialCopy,
		front__cssIcomoonSocialMinify
	)
);

gulp.task(
	"front-img",
	front__imageMinify
);

// BACK
// -------------------------------------------------
gulp.task(
	"back-build",
	gulp.series(
		back__sassCompile,
		back__cssCompile,
		back__jsCompile,
		back__cssIcomoonMainCopy,
		back__cssIcomoonMainMinify,
		back__cssIcomoonSocialCopy,
		back__cssIcomoonSocialMinify,
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
		back__cssIcomoonMainCopy,
		back__cssIcomoonMainMinify,
		back__cssIcomoonSocialCopy,
		back__cssIcomoonSocialMinify
	)
);

gulp.task(
	"back-img",
	back__imageMinify
);
