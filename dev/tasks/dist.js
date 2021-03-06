module.exports = ($) => {
    'use strict'

    $.gulp.task('clean-dist', (cb) =>
        $.del([
            $.dist.dir
        ], {
            force: true
        }, cb)
    )

    $.gulp.task('styles-dist', () =>
        $.gulp
        .src(`${$.dev.styles}/main.styl`)
        .pipe($.styles({
            compress: true
        }))
        .pipe($.gulp.dest($.dist.styles))
    )

    $.gulp.task('jade-dist', () =>
        $.gulp
        .src([
            `${$.dev.dir}/**/*.jade`,
            `!${$.dev.dir}/**/_**/*.jade`,
            `!${$.dev.dir}/**/_*.jade`,

            `!${$.dev.guide}/**/*.jade`,
            `!${$.dev.dir}/guide.jade`
        ])
        .pipe($.changed($.deploy.dir, {extension: '.html'}))
        .pipe($.data((file) => $.fn.jsonJade(file)))
        .pipe($.jade({
            pretty: true
        }))
        .on('error', (error) => {
            console.log(error);
        })
        .pipe($.gulp.dest($.dist.dir))
    )

    $.gulp.task('copyDeploy', (done) =>
        $.gulp
        .src([
            `${$.deploy.dir}/**/*.*`,
            `${$.deploy.vendor}/**/*.*`
        ])
        .pipe($.gulp.dest($.dist.dir))
    )

    $.gulp.task('templateCache-dist', (done) =>
        $.gulp
        .src(`${$.dist.dir}/**/directives/**/*.html`)
        .pipe($.templateCache('templates.js', {
            standalone: true
        }))
        .pipe($.gulp.dest($.dist.js))
    )

    $.gulp.task('generateOneScriptFile', (done) => {
        const assets = $.useref.assets()

        return $.gulp
        .src($.dist.index)
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.gulp.dest($.dist.dir))
    })

    $.gulp.task('concat', () =>
        $.gulp
        .src(`${$.dist.js}/**/*.js`)
        .pipe($.concat('all.min.js'))
        .pipe($.uglify())
        .pipe($.gulp.dest($.dist.allJs))
    )

    $.gulp.task('compress', () =>
        $.gulp
        .src(`${$.dist.dir}/**/*.js`)
        .pipe($.uglify())
        .pipe($.gulp.dest($.dist.dir))
    )

    $.gulp.task('clean-min', (cb) =>
        $.del([
            `${$.dist.js}/**/*.js`,
            $.dist.vendor,
            `!${$.dist.js}/all.js`,
            `${$.dist.dir}/**/_*`,
            `${$.dist.dir}/**/_**/**/*`
        ], {
            force: true
        }, cb)
    )

    $.gulp.task('distTask', (cb) => $.runSequence('generateOneScriptFile', 'compress', 'styles-dist', 'clean-min', cb))

    $.gulp.task('webserver-dist', () => require(`../${$.server}/server-dist.js`)($))
}