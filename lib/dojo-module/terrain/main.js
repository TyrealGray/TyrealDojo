requirejs.config({

    baseUrl: '../lib/',

    paths: {
        'noise': 'noise/perlinUMD'
    }
});

define(function (require) {
    'use strict';

    var canvas = document.getElementById("heightMap");

    require(['noise'], function (noise) {

        noise.seed(Math.random());
        var ctx = canvas.getContext("2d");

        var heightHex = "";

        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {

                // ... or noise.simplex3 and noise.perlin3:
                var value = noise.perlin3(x / 100, y / 100, 1231);

                heightHex = parseInt(Math.abs(value) * 255).toString(16);

                ctx.fillStyle = "#" + heightHex + heightHex + heightHex;

                ctx.fillRect(x, y, 1, 1); // fill in the pixel at (10,10)
            }
        }
    });

});