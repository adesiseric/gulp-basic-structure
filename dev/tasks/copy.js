module.exports = ($) => {
    'use strict'

    const copy = (src, dest) =>
        () =>
            $.gulp.src(src)
            .pipe($.gulp.dest(dest))

    $.gulp.task('copy-assets', copy(`${$.dev.assets}/**/*`, $.deploy.assets))
    $.gulp.task('copy-vendor', copy([`${$.dev.vendor}/**/*`], $.deploy.vendor))
    $.gulp.task('copy-fonts', copy([`${$.dev.fonts}/**/*`], $.deploy.fonts))

    $.gulp.task('copy', (cb) => $.runSequence(['copy-assets', 'copy-vendor', 'copy-fonts'], cb))
}