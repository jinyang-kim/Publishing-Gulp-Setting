/* Gulp Modules */
import gulp from "gulp";
import del from "del";
import gconnect from "gulp-connect";
import gimagemin from "gulp-imagemin";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import sourcemaps from "gulp-sourcemaps";
import bro from "gulp-bro";
import babelify from "babelify";
import uglify from "gulp-uglify";
import plumber from "gulp-plumber";
import ghPages from "gulp-gh-pages";
import htmlExtend from "gulp-html-extend";
import htmlMin from "gulp-htmlmin";
import gsprite from "gulp.spritesmith";
import gconcat from "gulp-concat";

const sass = require('gulp-sass')(require('sass'));

/* Files Directory */
const routes = {
	build: {
		html: "build/html",
		css: "build/css",
		js: "build/js",
		img: "build/img",
		index: "build/index.html"
	},
	html: {
		watch: "html/**/*.html",
		src: "html/**/*.html",
		dest: "build/"
	},
	img: {
		src: "static/asset/img/**/*",
		dest: "build/img"
	},
	img_sprite: {
		src: "static/asset/src/img/**/*",
		dest: "build/img_sprite"
	},
	scss: {
		watch: "static/asset/scss/**/*.scss",
		src: "static/asset/scss/**/*.scss",
		dest: "build/css"
	},
	css: {
		src: "build/css"
	},
	common_js: {
		watch: "static/asset/common_js/**/*.js",
		src: "static/asset/common_js/**/*.js",
		dest: "build/js"
	},
	js: {
		watch: "static/asset/js/**/*.js",
		src: "static/asset/js/**/*.js",
		dest: "build/js"
	}
}

/* Gulp Tasks */
const clean = () => del([routes.build.html, routes.build.css, routes.build.js, routes.build.img, routes.build.index]);
const deploy_clean = () => del([".publish"]);

const connect = () => 
	gconnect.server({
		root: './',
		livereload: true,
		port: 8000
	});

const gh = () => 
	gulp
		.src("build/**/*")
		.pipe(ghPages());

const watch = () => {
	gulp.watch(routes.html.watch, html);
	gulp.watch(routes.scss.watch, styles);
	gulp.watch(routes.common_js.watch, common_js);
	gulp.watch(routes.js.watch, js);
	// gulp.watch(routes.img.src, img);
}

const html = () =>
	gulp
		.src(routes.html.src)
		.pipe(plumber())
		.pipe(
      htmlExtend({ annotations:false, verbose:false })
    )
    .pipe(htmlMin({ collapseWhitespace: false }))
    .pipe(gulp.dest(routes.html.dest));

const common_js = () => 
	gulp	
		.src(routes.common_js.src)
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(bro({
			transform: [
				// babelify.configure({ presets: ["es2015"] }),
				// babelify.configure({ presets: ["@babel/preset-env"] }),
				// [ 'uglifyify', { global: true } ]
				babelify.configure({ presets: ["@babel/preset-env"] })
			]
		}))
		.pipe(gconcat('common.js'))
		.pipe(uglify())
		// .pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(routes.js.dest));

const js = () => 
	gulp	
		.src(routes.js.src)
		.pipe(plumber())
		// .pipe(sourcemaps.init())
		.pipe(bro({
			transform: [
				// babelify.configure({ presets: ["es2015"] }),
				// babelify.configure({ presets: ["@babel/preset-env"] }),
				// [ 'uglifyify', { global: true } ]
				babelify.configure({ presets: ["@babel/preset-env"] })
			]
		}))
		.pipe(uglify())
		// .pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(routes.js.dest));

const img = () => 
	gulp
		.src(routes.img.src)
		.pipe(plumber())
		.pipe(gimagemin())
		.pipe(gulp.dest(routes.img.dest));

const sprite = () =>
	gulp
		.src(routes.img_sprite.src)
		.pipe(plumber())
		.pipe(gsprite({
			imgName: 'sprite.png',
			cssName: 'sprite.css',
			padding: 10
		}))
		.pipe(gulp.dest(routes.img_sprite.dest));

const styles = () => 
	gulp
		.src(routes.scss.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(routes.scss.dest));

/* Gulp Builds */
const prepare = gulp.series([clean, img, sprite]);

const assets = gulp.series([html, styles, common_js, js]);

const live = gulp.parallel([connect, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, deploy_clean]);