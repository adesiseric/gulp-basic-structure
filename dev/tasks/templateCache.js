module.exports = ($) => {
    'use strict'

    $.gulp.task('templateCache', (done) =>
        $.gulp.src([`${$.dev.dir}/**/directives/**/*.html`])
        .pipe($.templateCache('templates.js', {
            standalone: true
        }))
        .pipe($.gulp.dest($.deploy.js))
    )
}