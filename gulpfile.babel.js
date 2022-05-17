/* Gulp Modules */
import gulp from "gulp";
import del from "del";
import gwebserver from "gulp-webserver";
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
		index: "build/**/*.html"
	},
	html: {
		// watch: "src/html/**/*.html",
		// src: "src/html/**/*.html",
		watch: "src/**/*.html",
		src: "src/**/*.html",
		// except: "!src/html/_components/*.html",
		except: "!src/_components/**/*.html",
		// dest: "build/html"
		dest: "build/"
	},
	index_html: {
		watch: "src/index.html",
		src: "src/index.html",
		dest: "build/"
	},
	img: {
		src: "src/img/**/*",
		dest: "build/img"
	},
	img_sprite: {
		src: "src/img/**/*.png",
		dest: "build/img_sprite"
	},
	scss: {
		watch: "src/scss/**/*.scss",
		src: "src/scss/*",
		dest: "build/css"
	},
	css: {
		src: "build/css"
	},
	common_js: {
		watch: "src/common_js/**/*.js",
		// src: "src/js/main.js",
		src: "src/common_js/**/*.js",
		dest: "build/js"
	},
	js: {
		watch: "src/js/**/*.js",
		// src: "src/js/main.js",
		src: "src/js/**/*.js",
		dest: "build/js"
	}
}

/* Gulp Tasks */
const clean = () => del([routes.build.html, routes.build.css, routes.build.js, routes.build.img, routes.build.index, ".publish"]);

const webserver = () => 
	gulp
		.src("build")
		.pipe(plumber())
		.pipe(gwebserver({ 
			port: 8080,
			livereload : true, 
			open: true 
		}));

const gh = () => 
	gulp
		.src("build/**/*")
		.pipe(ghPages());

const watch = () => {
	gulp.watch(routes.index_html.watch, index_html);
	gulp.watch(routes.html.watch, html);
	gulp.watch(routes.scss.watch, styles);
	gulp.watch(routes.common_js.watch, common_js);
	gulp.watch(routes.js.watch, js);
	// gulp.watch(routes.img.src, img);
}

const index_html = () =>
	gulp
		.src(routes.index_html.src)
		.pipe(plumber())
		.pipe(
      htmlExtend({ annotations:false, verbose:false })
    )
    .pipe(htmlMin({ collapseWhitespace: false }))
    .pipe(gulp.dest(routes.index_html.dest));

const html = () =>
	gulp
		.src([routes.html.src, routes.html.except])
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

const assets = gulp.series([index_html, html, styles, common_js, js]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);