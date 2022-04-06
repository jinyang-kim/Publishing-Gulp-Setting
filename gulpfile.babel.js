/* Gulp Modules */
import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-imagemin";
// import sass from "gulp-sass";

const sass = require('gulp-sass')(require('sass'));

/* Files Directory */
const routes = {
	pug: {
		watch: "src/**/*.pug",
		src: "src/*.pug",
		dest: "build"
	},
	html: {
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
		src: "src/js/*",
		dest: "build/js"
	}
}

/* Gulp Tasks */
const pug = () =>
	gulp
		.src(routes.pug.src)
		.pipe(gpug())
		.pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const webserver = () => 
	gulp
		.src("build")
		.pipe(ws({ 
			livereload : true, 
			open: true 
		}));

const watch = () => {
	gulp.watch(routes.pug.watch, pug);
	gulp.watch(routes.scss.watch, styles);
	// gulp.watch(routes.img.src, img);
}

const img = () => 
	gulp
		.src(routes.img.src)
		.pipe(image())
		.pipe(gulp.dest(routes.img.dest));

const styles = () => 
	gulp
		.src(routes.scss.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(routes.scss.dest));

/* Gulp Builds */
const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);