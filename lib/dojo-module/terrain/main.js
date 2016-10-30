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
            shapeSize = 30.0;

        // yoffset times 2 because orginal point not start at shape center
        var yoffset = shapeSize * Math.cos(30.0 / 180.0 * Math.PI) * 2,
            xoffset = yoffset * Math.cos(30.0 / 180.0 * Math.PI);

        var turn = 1.0,
            rx = 0.0,
            ry = 0.0;

        for (var x = 0.0; x < canvas.width; x += xoffset) {
            for (var y = 0.0; y < canvas.height; y += yoffset, vx += 0.005, vy += 0.009) {

                if (0 !== turn % 2.0) {
                    ry = y + yoffset / 2;
                } else {
                    ry = y;
                }

                var value = noise.perlin3(vx, vy, 3);

                var height = parseInt(Math.abs(value) * 255);

                terrainCore.drawShape(context, { x: x, y: ry }, 6, shapeSize, height);
            }

            turn += 1.0;
        }
    });

});