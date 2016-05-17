describe("colorGridWorker", function() {

    describe("#function getImageColorData", function() {

        it("2x2 image", function() {
            var map2x2 = [
                0, 1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14, 15
            ], imageWidth = 2, mageHeight = 2,
                topLeft = { x: 0, y: 0 },
                bottomRight = { x: 2, y: 2 };

            expect(getImageColorData(map2x2, imageWidth, mageHeight, topLeft, bottomRight)).toEqual(map2x2);

            bottomRight.x = 1;
            bottomRight.y = 2;

            expect(getImageColorData(map2x2, imageWidth, mageHeight, topLeft, bottomRight)).toEqual([0, 1, 2, 3, 8, 9, 10, 11]);
        })

        it("3x2 image", function() {
            var map3x2 = [
                0, 1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14, 15,
                16, 17, 18, 19, 20, 21, 22, 23
            ], imageWidth = 2, mageHeight = 2,
                topLeft = { x: 0, y: 0 },
                bottomRight = { x: 1, y: 2 };

            expect(getImageColorData(map3x2, imageWidth, mageHeight, topLeft, bottomRight)).toEqual([0, 1, 2, 3, 8, 9, 10, 11]);
            
            topLeft.x = 1;
            topLeft.y = 1;
            bottomRight.x = 2;
            bottomRight.y = 3;
            
            expect(getImageColorData(map3x2, imageWidth, mageHeight, topLeft, bottomRight)).toEqual([12, 13, 14, 15,20, 21, 22, 23]);
        })
    })

    describe("#function toFixedHexString", function() {

        it("should return the fixed hex string", function() {
            expect(toFixedHexString('c')).toEqual('0c');
        })

        it("should return the hex string directly", function() {
            expect(toFixedHexString('bb')).toEqual('bb');
        })
    })

    describe("#function getAverageColor", function() {

        var colorData = [12, 11, 56, 255];

        it("single group", function() {
            expect(getAverageColor(colorData)).toEqual('0c0b38');
        });

        var moreColorData = [12, 11, 56, 255, 224, 55, 11, 255];

        it("more group", function() {
            expect(getAverageColor(moreColorData)).toEqual('762121');
        });
    })

    describe("#function getGrids", function() {

        var rowsNumber = 1,
            columnsNumber = 1,
            gridWidth = 16,
            gridHeight = 16;

        it("1x1 grids", function() {

            expect(getGrids(rowsNumber, columnsNumber, gridWidth, gridHeight)).toEqual([{
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 16, y: 16 }
            }]);

        });

        it("2x1 grids", function() {

            rowsNumber = 2;
            columnsNumber = 1;

            expect(getGrids(rowsNumber, columnsNumber, gridWidth, gridHeight)).toEqual([{
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 16, y: 16 }
            }, {
                    topLeft: { x: 0, y: 16 },
                    bottomRight: { x: 16, y: 32 }
                }]);

        });

        it("1x2 grids", function() {
            rowsNumber = 1;
            columnsNumber = 2;

            expect(getGrids(rowsNumber, columnsNumber, gridWidth, gridHeight)).toEqual([{
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 16, y: 16 }
            }, {
                    topLeft: { x: 16, y: 0 },
                    bottomRight: { x: 32, y: 16 }
                }]);
        });

        it("2x2 grids", function() {

            rowsNumber = 2;
            columnsNumber = 2;
            gridHeight = 17;

            expect(getGrids(rowsNumber, columnsNumber, gridWidth, gridHeight)).toEqual([{
                topLeft: { x: 0, y: 0 },
                bottomRight: { x: 16, y: 17 }
            }, {
                    topLeft: { x: 16, y: 0 },
                    bottomRight: { x: 32, y: 17 }
                }, {
                    topLeft: { x: 0, y: 17 },
                    bottomRight: { x: 16, y: 34 }
                }, {
                    topLeft: { x: 16, y: 17 },
                    bottomRight: { x: 32, y: 34 }
                }]);

        });
    })

    describe("#function getGridMaxBoundary", function() {

        it("should be able to error bad data", function() {

            var gridBoundaryNumber = 16,
                imageBoundaryNumber = 0;

            expect(function() {
                getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber);
            }).toThrowError("bad data");

            gridBoundaryNumber = -1;

            expect(function() {
                getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber);
            }).toThrowError("bad data");

            imageBoundaryNumber = 11;

            expect(function() {
                getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber);
            }).toThrowError("bad data");

        });

        it("should be able to calculate max boundary number", function() {

            var gridBoundaryNumber = 16,
                imageBoundaryNumber = 16;

            expect(getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber)).toEqual(16);

            imageBoundaryNumber = 17;
            expect(getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber)).toEqual(16);

            imageBoundaryNumber = 32;
            expect(getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber)).toEqual(32);

            imageBoundaryNumber = 47;
            expect(getGridMaxBoundary(gridBoundaryNumber, imageBoundaryNumber)).toEqual(32);
        });

    });



});
