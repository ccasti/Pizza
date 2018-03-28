var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');//permite usar ECMAScript 2015
var browserify = require('browserify');
var source = require('vinyl-source-stream');//para que no procesado en el bundle pueda entenderlo gulp
var watchify = require('watchify');

gulp.task('sass', function () {
	return gulp
		.src('index.scss')
		.pipe(sass())
		.pipe(rename('app.css'))
		.pipe(gulp.dest('public'));
})

gulp.task('assets', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'));
})

function compile(watch) {//watch es la VARIABLE que indicará si hacemos o no watch, enviando o no el PARAMETRO
	var bundle = watchify(browserify('./src/index.js'/*, { debug: true}*/));

	function rebundle() {
		bundle
			.transform(babel)
			.bundle()//procesa el archivo
			.on('error', function (err) { console.log(err); this.emit('end') })
			.pipe(source('index.js'))//entry point
			/*.pipe(uglyfy({ compress; true }))*/
			/*.pipe(stripDebug())*/
			.pipe(rename('app.js'))
			.pipe(gulp.dest('public'));
	}

	if(watch) {//chequea si la condición es verdadera o no
		bundle.on('update', function () {
			console.log('--> bundling...');
			rebundle();
		})
	}

	rebundle();
}

gulp.task('build', function () {
	return compile();
});

gulp.task('watch', function () {
	return compile(true);
});

gulp.task('default', ['sass', 'assets', 'build']);