define(['dojo-module/terrain/terrain-core'], function(terrainCore) {
    'use strict';


    describe('get terrain grid', function() {
        it('should get grid high', function() {

            var size = 30;

            expect(terrainCore.getShapeHight(30)).toEqual(size * Math.cos(30.0 / 180.0 * Math.PI));
        });
    });
});