var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserify = require('gulp-browserify');

var sassDir = 'public/styles/sass/';
jsDir = 'public/angular-app';



gulp.task('sass', function() {
    return gulp.src(sassDir + 'main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix("last 10 versions", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('public/styles/css/'))
        .pipe(livereload());
});

// gulp.task('partner', function() {
//     return gulp.src(sassDir + '/settings.scss')
//         .pipe(plumber())
//         .pipe(sass({
//             style: 'compressed'
//         }))
//         .pipe(prefix("last 10 versions", "> 1%", "ie 8", "ie 7"))
//         .pipe(gulp.dest('public/styles/css/'))
//         .pipe(livereload());
// });




gulp.task('bundle', function() {
    gulp.src(jsDir + '/main.js')
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(browserify({
            debug: true
        }))
    //on production uncomment
    //.pipe(uglify())
    .pipe(gulp.dest('public/min-js'))
        .pipe(livereload());
});


gulp.task('live', function() {
    gulp.src(['*.html', 'public/views/**/*.html'])
        .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch(sassDir + '/**/*.scss', ['sass']),
    gulp.watch(sassDir + '/settings.scss', ['partner']),
    gulp.watch(jsDir + '/**/*.js', ['bundle']),
    gulp.watch('public/views/**/*.blade.php', ['live']),
    gulp.watch('public/views/**/*.html', ['live'])
})


gulp.task('default', ['watch', 'bundle', 'sass']);