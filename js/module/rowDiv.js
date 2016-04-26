function RowDiv(previous) {
    this._previous = previous;
    this._div = null;
    this._tiles = [];
    this._tilesReferenceCount = 0;
    this._isReady = false;
    this._attachedCanvasID = null;
}

/**
 * canvasID: canvas id which draw this row div
 */
RowDiv.prototype.init = function (canvasID) {
    this._attachedCanvasID = canvasID;
};

/**
 * this._tilesReferenceCount is counting number
 * when rowDiv is ready, and count back to 0,rowDiv will draw on canvas
 */
RowDiv.prototype.addTile = function (tile) {
    this._tiles.push(tile);
    this._tilesReferenceCount += 1;

    this._initTile(tile);
}

RowDiv.prototype._initTile = function (tile) {

    if (null === this._attachedCanvasID) {
        return;
    }
    var scope = this;

    tile.onSvgReady = function () {
        scope.oneTileReady();
    }

    tile.generateSvg();
}

/**
 * tile data all set
 * then draw on canvas
 */
RowDiv.prototype.ready = function () {
    this._isReady = true;

    this._check();
};

/**
 * tile's onSvgReady callback function
 * when call this function, count cut 1
 */
RowDiv.prototype.oneTileReady = function () {

    this._tilesReferenceCount -= 1;
    this._check();
};

RowDiv.prototype._check = function () {
    if (this.isReady()) {
        this.drawOnCanvas();
    }
};

RowDiv.prototype.isReady = function () {
    //make sure previous row is ready
    var isPreviousReady = (null === this._previous) ? true : this._previous.isReady();

    return 0 === this._tilesReferenceCount && isPreviousReady && this._isReady;
}

/**
 * draw the div on the given canvas
 */
RowDiv.prototype.drawOnCanvas = function () {

    if (null === this._attachedCanvasID) {
        return;
    }

    var canvas = document.getElementById(this._attachedCanvasID);

    /**
     * svg to img
     */
    var svgContext = '';

    for (var index = 0, len = this._tiles.length; index < len; ++index) {
        svgContext += this._tiles[index].getDiv().innerHTML;
    }

    var data = "<svg version='1.1'" +
        " baseProfile='full'" +
        " width='" + canvas.width + "' height='" + canvas.height + "'" +
        " xmlns='http://www.w3.org/2000/svg'>" +
        svgContext +
        "</svg>";

    var DOMURL = window.URL || window.webkitURL || window;
    var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    var url = DOMURL.createObjectURL(svg);

    var img = new Image();
    img.onload = function () {
        canvas.getContext('2d').drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
    }
    img.src = url;

    this.release();
}

//GC
RowDiv.prototype.release = function () {

    this._tiles = null;
    delete this._tiles;
};