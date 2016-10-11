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

                var value = noise.perlin3(x / 1000, y / 1000, 3);

                var height = parseInt(Math.abs(value) * 255);

                heightHex = 255 < height ? "FF": height.toString(16);

                if(1 === heightHex.length){
                    var fixedHex = "0"+heightHex;
                    heightHex = fixedHex;
                }

                ctx.fillStyle = "#" + heightHex + heightHex + heightHex;

                ctx.fillRect(x, y, 1, 1);
            }
        }
    });

});