requirejs.config({

    baseUrl: '../lib/',

    paths: {
        'jasmine': 'jasmine-2.4.1/jasmine',
        'jasmine-html': 'jasmine-2.4.1/jasmine-html',
        'boot': 'jasmine-2.4.1/boot',
        shim: {
            'jasmine-html': {
                deps: ['jasmine']
            },
            'boot': {
                deps: ['jasmine', 'jasmine-html']
            }
        }
    }
});

define(function (require) {
    'use strict';

    var jasmine = require('jasmine'),
        testPrefix = 'dojo-module/terrain/test/spec/';

    var specs = [testPrefix + 'terrain-spec'];

    require(['jasmine-html', 'boot'], function () {

        require(specs, function () {

            window.onload();
        })

    });

});