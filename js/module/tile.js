//object that manager each tile,control the 
function Tile(color, position) {
    this._color = color;
    this._position = position;
    this._div = null;
    this._isSvgReady = false;

    this._init();
}

Tile.prototype._init = function () {

    this._initDiv();
};

Tile.prototype.getDiv = function () {
    return this._div;
};

Tile.prototype._parseGTagForSvg = function (SvgTemplate) {

    var svgWithTagG = "<g transform='translate(" + 
    (this._position.x - TILE_WIDTH / 2) + " " + 
    (this._position.y - TILE_HEIGHT / 2) + ")'>"+
    SvgTemplate+"</g>"
    return svgWithTagG;
};

/**
 * this div never need to show
 */
Tile.prototype._initDiv = function () {

    this._div = document.createElement('div');
}

/**
 * use ajax to get the svg template
 */
Tile.prototype.requestSvg = function () {

    var scope = this;

    requestTileSvg(this._color, function (data) {
        scope.setSvgContext(data);
    }, function (error) {

        setTimeout(function () {
            scope.requestSvg();
        }, 4000);

        console.error(error);
    });
};

Tile.prototype.setSvgContext = function (htmlData) {
    this._div.innerHTML = this._parseGTagForSvg(htmlData);
    this._isSvgReady = true;
    this.onSvgReady();
}

Tile.prototype.onSvgReady = function () {
    //callback function
};