module.exports = ($) => {
    'use strict'

    $.gulp.task('compiledBase', (cb) => $.runSequence('scripts', ['styles', 'jade', 'copy'], 'templateCache', 'watch', cb))
    $.gulp.task('compiledMin', (cb) => $.runSequence('scripts', ['jade-dist', 'copy'], 'copyDeploy', 'templateCache-dist', 'distTask', cb))

    $.gulp.task('run', (cb) => $.runSequence('clean', 'compiledBase', 'webserver', cb))
    $.gulp.task('dist', (cb) => $.runSequence('clean-dist', 'compiledMin', 'webserver-dist', cb))
}