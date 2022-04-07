/* Gulp Modules */
import gulp from "gulp";
import gpug from "gulp-pug";
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

const sass = require('gulp-sass')(require('sass'));

/* Files Directory */
const routes = {
	pug: {
		watch: "src/**/*.pug",
		src: "src/*.pug",
		dest: "build"
	},
	html: {
		watch: "src/html/**/*.html",
		src: "src/html/*",
		dest: "build/html"
	},
	img: {
		src: "src/img/*",
		dest: "build/img"
	},
	scss: {
		watch: "src/scss/**/*.scss",
		src: "src/scss/*",
		dest: "build/css"
	},
	css: {
		src: "build/css"
	},
	js: {
		watch: "src/js/**/*.js",
		src: "src/js/main.js",
		dest: "build/js"
	}
	// js: {
	// 	warch: "src/js/**/*.js",
	// 	src: "src/js/*",
	// 	dest: "build/js"
	// }
}

/* Gulp Tasks */
const pug = () =>
	gulp
		.src(routes.pug.src)
		.pipe(plumber())
		.pipe(gpug())
		.pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build", ".publish"]);

const webserver = () => 
	gulp
		.src("build")
		.pipe(plumber())
		.pipe(gwebserver({ 
			// port: 8080,
			livereload : true, 
			open: true 
		}));

const gh = () => 
	gulp
		.src("build/**/*")
		.pipe(ghPages());

const watch = () => {
	gulp.watch(routes.pug.watch, pug);
	gulp.watch(routes.scss.watch, styles);
	gulp.watch(routes.js.watch, js);
	// gulp.watch(routes.img.src, img);
}

const js = () => 
	gulp	
		.src(routes.js.src)
		.pipe(plumber())
		.pipe(bro({
			transform: [
				// babelify.configure({ presets: ["es2015"] }),
				// babelify.configure({ presets: ["@babel/preset-env"] }),
				// [ 'uglifyify', { global: true } ]
				babelify.configure({ presets: ["@babel/preset-env"] })
			]
		}))
		.pipe(uglify())
		.pipe(gulp.dest(routes.js.dest));

const img = () => 
	gulp
		.src(routes.img.src)
		.pipe(plumber())
		.pipe(gimagemin())
		.pipe(gulp.dest(routes.img.dest));

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
const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);