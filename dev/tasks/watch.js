module.exports = ($) => {
    'use strict'

    $.gulp.task('watch', () => {
        $.gulp.watch(`${$.dev.dir}/**/*.jade`, () => $.runSequence('jade', 'templateCache'))

        $.gulp.watch([
            `${$.dev.dir}/**/*.js`,
            `!${$.dev.dir}/**/_*.js`
        ], ['scripts'])

        $.gulp.watch(`${$.dev.dir}/**/_*.js`, ['jade-script'])

        $.gulp.watch(`${$.dev.dir}/**/*.styl`, ['styles'])

        return $.gulp.watch([`${$.deploy.dir}/**/*`], (event) => {
            const FILE_NAME = $.path.relative(__dirname, event.path)

            $.tinylr.changed({
                body: {
                    files: [FILE_NAME]
                }
            })
        })
    })
}