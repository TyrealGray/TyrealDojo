/**
 * colorGridWorker
 * calculate every grid position and color
 * return gridsArray to mian thread
 */
var gColorGridWorker = self;

//global value
var colorData = null,

    imageWidth = null,
    imageHeight = null,

    gridWidth = null,
    gridHeight = null;

/**
 * main function
 * parse color grids for mian thread
 */
function parse(gridData, imageData) {

    colorData = imageData.color;

    imageWidth = imageData.width;
    imageHeight = imageData.height;

    gridWidth = gridData.width;
    gridHeight = gridData.height;

    var colorGrids = getAllColorGrids();

    gColorGridWorker.postMessage({
        'cmd': 'parse',
        'msg': {
            grids: colorGrids
        }
    });
}

function getAllColorGrids() {

    var maxX = getGridMaxX(),
        maxY = getGridMaxY();

    var rowsNumber = maxY / gridHeight,
        columnsNumber = maxX / gridWidth;

    var grids = getGrids(rowsNumber, columnsNumber, gridWidth, gridHeight);

    return parseBoundaryAndColor(grids);
}

function parseBoundaryAndColor(grids) {

    var gridBoundary = null,
        averageColor = null,
        colorGrids = [];

    for (var index = 0, len = grids.length; index < len; ++index) {
        gridBoundary = grids[index];
        var gridTopLeft = gridBoundary.topLeft,
            gridBottomRight = gridBoundary.bottomRight;


        //get every colorArrays for the specified grid in image
        var colors = getImageColorData(colorData, imageWidth, imageHeight, gridTopLeft, gridBottomRight);
        averageColor = getAverageColor(colors);

        colorGrids.push({
            center: {
                x: (gridTopLeft.x + gridBottomRight.x) / 2,
                y: (gridTopLeft.y + gridBottomRight.y) / 2
            },
            averageColor: averageColor
        })
    }

    return colorGrids;
}


function getImageColorData(colorData, width, height, topLeft, bottomRight) {

    /**
    * get color arrays form colorData based on topLeft & bottomRight
    * [1rt,2nd,3rd,
    *  4th,5th,6th
    *  7th,8th,9th]
    * 
    * find topLeft(1,0) to bottomRight(3,2)
    * result will be [2nd,3rd,5th,6th]
    * 
    *       -------
    * [1st,|2nd,3rd|
    *  4th,|5th,6th|
    *       -------
    *  7th,8th,9th ]
    */

    var topLeftX = topLeft.x, topLeftY = topLeft.y,
        bottomRightX = bottomRight.x, bottomRightY = bottomRight.y;

    var colorArrays = [],
        colorRedIndex = null,
        COLOR_CONUT = 4;//color data has 4 numbers:r,g,b,a

    for (var rowIndex = topLeftY, rlen = bottomRightY; rowIndex < rlen; ++rowIndex) {
        for (var colIndex = topLeftX, clen = bottomRightX; colIndex < clen; ++colIndex) {

            colorRedIndex = (rowIndex * (width) + colIndex) * COLOR_CONUT;
            colorArrays.push(colorData[colorRedIndex]);
            colorArrays.push(colorData[colorRedIndex + 1]);
            colorArrays.push(colorData[colorRedIndex + 2]);
            colorArrays.push(colorData[colorRedIndex + 3]);
        }
    }

    return colorArrays;
}

function getAverageColor(colorData) {

    var averageRed = 0,
        averageGreen = 0,
        averageBlue = 0,
        total = colorData.length / 4;

    for (var index = 0, len = colorData.length; index < len; index += 4) {

        var red = colorData[index],
            green = colorData[index + 1],
            blue = colorData[index + 2],
            alpha = colorData[index + 3];

        averageRed += red;
        averageGreen += green;
        averageBlue += blue;
    }

    //make sure output is hex
    averageRed = (parseInt(averageRed / total)).toString(16);
    averageGreen = (parseInt(averageGreen / total)).toString(16);
    averageBlue = (parseInt(averageBlue / total)).toString(16);

    return toFixedHexString(averageRed) + toFixedHexString(averageGreen) + toFixedHexString(averageBlue);
}

//make sure every color hex is two numbers
function toFixedHexString(hexStr) {

    var result = '';

    if (2 > hexStr.length) {
        result = '0' + hexStr;
    } else {
        result = hexStr;
    }

    return result;
}

/**
 * calculate the width & height of image
 * and convert into a gird position by giving the rowsNumber and columnsNumber
 */
function getGrids(rowsNumber, columnsNumber, width, height) {

    var grids = [];

    //calculate all grids topLeft and bottomRight coordinate
    for (var rowIndex = 0, rlen = rowsNumber; rowIndex < rlen; ++rowIndex) {

        for (var colIndex = 0, clen = columnsNumber; colIndex < clen; ++colIndex) {

            grids.push({
                topLeft: {
                    x: colIndex * width,
                    y: rowIndex * height
                },
                bottomRight: {
                    x: (colIndex + 1) * width,
                    y: (rowIndex + 1) * height
                }
            });
        }
    }

    return grids;
}

/**
 * get the max coordinate in x-axis
 */
function getGridMaxX() {
    return getGridMaxBoundary(gridWidth, imageWidth);
}

/**
 * get the max coordinate in y-axis
 */
function getGridMaxY() {
    return getGridMaxBoundary(gridHeight, imageHeight);
}

function getGridMaxBoundary(gridNumber, imageNumber) {

    if (0 >= gridNumber || gridNumber > imageNumber) {
        throw new Error("bad data");
    }

    return parseInt(imageNumber / gridNumber) * gridNumber;
}

gColorGridWorker.onmessage = function (event) {

    var data = event.data;

    switch (data.cmd) {
        case 'parse':
            parse(data.msg.gridData, data.msg.imageData);
            break;
        default:
            gColorGridWorker.postMessage('Unknown command: ' + data.cmd);
    }
};