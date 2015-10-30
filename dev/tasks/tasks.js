module.exports = ($) => {
    'use strict'

    $.gulp.task('compiledBase', (cb) => $.runSequence('scripts', ['styles', 'jade', 'copy'], 'templateCache', 'watch', cb))

    $.gulp.task('run', (cb) => $.runSequence('clean', 'compiledBase', 'webserver', cb))
}