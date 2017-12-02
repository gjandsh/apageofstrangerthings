var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
const babel = require('gulp-babel');
var postcss = require('gulp-postcss'); 
var autoprefixer = require('autoprefixer');
let cleanCSS = require('gulp-clean-css');

gulp.task('reset', function() {
    return del(['build']);
});

gulp.task('js', ['reset'], function() {
	return gulp.src('./src/js/*.js')
	      .pipe(babel({presets:['env']}))
				.pipe(uglify())
				.pipe(gulp.dest('build/'));
});
gulp.task('css', ['reset'], function() {
	return gulp.src('./src/style/*.css')
				.pipe(postcss([autoprefixer()]))
				.pipe(cleanCSS({compatibility: 'ie8'}))
				.pipe(gulp.dest('build/'));
});

gulp.task('image', ['reset'],function(){
	return gulp.src('./src/images/*')
				.pipe(imagemin())
				.pipe(gulp.dest('build/images'))
});

gulp.task('static', ['reset'],function(){
	return gulp.src('./src/static/*.{html,json,js}')
				.pipe(gulp.dest('build/'))
});


gulp.task('default',['js','css','image','static']);
