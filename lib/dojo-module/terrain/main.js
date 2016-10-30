requirejs.config({

    baseUrl: '../lib/',

    paths: {
        'noise': 'noise/perlinUMD'
    }
});

define(function (require) {
    'use strict';

    var canvas = document.getElementById("heightMap");

    require(['noise', 'dojo-module/terrain/terrain-core'], function (noise, terrainCore) {

        noise.seed(Math.random());
        var context = canvas.getContext("2d");

        var heightHex = "",
            vx = 0.002, vy = 0.003,
            shapeSize = 50.0, offset = 42.0;

        var turn = 1.0,
            rx = 0.0;

        for (var y = 0.0; y < canvas.height; y += (offset - 3) ) {
            for (var x = 0.0; x < canvas.width; x += offset, vx += 0.005, vy += 0.009) {

                if (0 !== turn % 2.0) {
                    rx = x + offset/2;
                }else{
                    rx = x;
                }

                var value = noise.perlin3(vx, vy, 3);

                var height = parseInt(Math.abs(value) * 255);

                terrainCore.drawShape(context, { x: rx, y: y }, 6, shapeSize / 2, '' + height);
            }

            turn+=1.0;
        }
    });

});