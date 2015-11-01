'use strict'

const deploy = '_deploy'
const dev = 'dev'

const $ = {
    babel: require('gulp-babel'),
    changed: require('gulp-changed'),
    connect: require('connect-livereload'),
    data: require('gulp-data'),
    del: require('del'),
    express: require('express'),
    extend: require('extend'),
    fs: require('fs'),
    gulp: require('gulp'),
    inject: require('gulp-inject'),
    jade: require('gulp-jade'),
    karma: require('karma').server,
    ngAnnotate: require('gulp-ng-annotate'),
    open: require('open'),
    path: require('path'),
    request: require('request'),
    runSequence: require('run-sequence'),
    styles: require('gulp-stylus'),
    templateCache: require('gulp-angular-templatecache'),
    tinylr: require('tiny-lr')(),
    uglify: require('gulp-uglify'),
    useref: require('gulp-useref'),
    wrap: require('gulp-wrap'),

    plato: './_analysis/plato',
    server: './server',
    tasks: `./${dev}/tasks`,

    dev: {
        assets: `./${dev}/public/assets`,
        dir: `./${dev}/public`,
        fonts: `./${dev}/public/css/_includes/fs-joey-font-family`,
        guide: `./${dev}/public/guide`,
        styles: `./${dev}/public/css`,
        vendor: `./${dev}/public/_vendor`
    },

    deploy: {
        assets: `./${deploy}/public/assets`,
        dir: `./${deploy}/public`,
        fonts: `./${deploy}/public/css/_includes/fs-joey-font-family`,
        guide: `./${deploy}/public/guide`,
        guideIndex: `./${deploy}/public/guide.html`,
        index: `./${deploy}/public/index.html`,
        js: `./${deploy}/public/js`,
        styles: `./${deploy}/public/css`,
        vendor: `./${deploy}/public/vendor`,
        views: `./${deploy}/public/views`
    },

    dist: {
        allJs: './_public-dist/js/all.js',
        dir: './_public-dist',
        index: './_public-dist/index.html',
        js: './_public-dist/js',
        styles: './_public-dist/css',
        vendor: './_public-dist/vendor'
    }
}

$.fn = {
    jsonJade(file) {
        const NAME = file.path

        const FILEJADE = $.path.basename(NAME, '.jade')

        let dirname = $.path.dirname(NAME)

        const ROUTE = $.path.resolve(__dirname, dirname, `_${FILEJADE}.js`)
        const ROUTE_GLOBAL = $.path.resolve(__dirname, `./${dev}/public/__global.js`)

        delete require.cache[ROUTE]
        delete require.cache[ROUTE_GLOBAL]

        const dataJSon = {}
        const dataJsonFile = ($.fs.existsSync(ROUTE)) ? require(ROUTE) : {}
        const dataJsonGlobal = ($.fs.existsSync(ROUTE_GLOBAL)) ? require(ROUTE_GLOBAL) : {}

        $.extend(true, dataJSon, dataJsonFile)
        $.extend(true, dataJSon, dataJsonGlobal)

        return dataJSon
    },

    readFolder(folder) {
        const PATH = $.path.join(__dirname, folder)

        const FILES = $.fs.readdirSync(PATH)

        FILES.forEach((file) => {
            require(`${$.tasks}/${file}`)($)
        })
    }
}

module.exports = $