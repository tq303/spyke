/**
 * Created by tom on 25/03/15.
 */
var gulp = require('gulp');

// Plugins
var sass          = require('gulp-sass'),
	livereload    = require('gulp-livereload'),
	minifyHTML    = require('gulp-minify-html'),
	templateCache = require('gulp-angular-templatecache'),
	ngAnnotate    = require('gulp-ng-annotate'),
	ngdocs        = require('gulp-ngdocs'),
	jshint 		  = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    plumber       = require('gulp-plumber');


gulp.task('default', ['lint', 'js', 'ngdocs', 'compileViews', 'scss']);

/**
██████╗  ██████╗  ██████╗███████╗
██╔══██╗██╔═══██╗██╔════╝██╔════╝
██║  ██║██║   ██║██║     ███████╗
██║  ██║██║   ██║██║     ╚════██║
██████╔╝╚██████╔╝╚██████╗███████║
╚═════╝  ╚═════╝  ╚═════╝╚══════╝                                 
 */
gulp.task('ngdocs', [], function () {
	var options = {
		title  : "svg progress button"
	};
    gulp.src([
        './src/js/**/*.js'
    ])
    .pipe(plumber())
    .pipe(ngdocs.process(options))
    .pipe(gulp.dest('./docs'));
});


/**
     ██╗███████╗
     ██║██╔════╝
     ██║███████╗
██   ██║╚════██║
╚█████╔╝███████║
 ╚════╝ ╚══════╝           
 */
// concat all js files into app/build/js
gulp.task('js', function() {
    gulp.src(['./src/js/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build/js'));
});

// JSHint linter
gulp.task('lint', function() {
	gulp.src([
        './src/js/**/*.js'
    ])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/**
██╗  ██╗████████╗███╗   ███╗██╗     
██║  ██║╚══██╔══╝████╗ ████║██║     
███████║   ██║   ██╔████╔██║██║     
██╔══██║   ██║   ██║╚██╔╝██║██║     
██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝
 */
// Compile views
gulp.task('compileViews', function() {

	// Minify options
	var opts = {
		conditionals: true,
		spare:true,
		quotes: true
	};

	// TemplateCache Options
	var tcOpts = {
		fileName: 'templates.js',
		module: 'App'
	};

	gulp.src('./src/views/**/*.html')
		.pipe(minifyHTML(opts))
		.pipe(templateCache(tcOpts))
		.pipe(gulp.dest('./build/views'))
		.pipe(livereload());

});

/**
███████╗████████╗██╗   ██╗██╗     ███████╗███████╗
██╔════╝╚══██╔══╝╚██╗ ██╔╝██║     ██╔════╝██╔════╝
███████╗   ██║    ╚████╔╝ ██║     █████╗  ███████╗
╚════██║   ██║     ╚██╔╝  ██║     ██╔══╝  ╚════██║
███████║   ██║      ██║   ███████╗███████╗███████║
╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚══════╝╚══════╝
 */
// Compile SCSS
gulp.task('scss', function () {
	gulp.src('./src/scss/*.scss')
        .pipe(plumber())
		.pipe(sass())
		.pipe(livereload())
		.pipe(gulp.dest('./build/css'));
});

/**
██╗    ██╗ █████╗ ████████╗ ██████╗██╗  ██╗
██║    ██║██╔══██╗╚══██╔══╝██╔════╝██║  ██║
██║ █╗ ██║███████║   ██║   ██║     ███████║
██║███╗██║██╔══██║   ██║   ██║     ██╔══██║
╚███╔███╔╝██║  ██║   ██║   ╚██████╗██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
 */
// watch for file changes
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['./src/scss/**/*.scss'],  ['scss']);
	gulp.watch(['./src/views/**/*.html'],  ['compileViews']);
	gulp.watch(['./src/js/**/*.js'], ['lint', 'js', 'ngdocs']);
});