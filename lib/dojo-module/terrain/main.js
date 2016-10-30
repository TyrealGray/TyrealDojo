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
            shapeSize = 30.0, offset = shapeSize * Math.cos( (3.0) * Math.PI)/2;

        var turn = 1.0,
            rx = 0.0;

        for (var y = 0.0; y < canvas.height; y += shapeSize) {
            for (var x = 0.0; x < canvas.width; x += shapeSize, vx += 0.001, vy += 0.009) {

                if (0 !== turn % 2.0) {
                    rx = x + offset;
                }else{
                    rx = x;
                }

                var value = noise.perlin3(vx, vy, 3);

                var height = parseInt(Math.abs(value) * 255);

                terrainCore.drawShape(context, { x: rx, y: y }, 6, shapeSize / 2, '' + height);

                heightHex = 255 < height ? "FF" : height.toString(16);

                if (1 === heightHex.length) {
                    var fixedHex = "0" + heightHex;
                    heightHex = fixedHex;
                }

                context.fillStyle = "#" + heightHex + heightHex + heightHex;

                context.fillRect(rx, y, 1, 1);
            }

            turn+=1.0;
        }
    });

});