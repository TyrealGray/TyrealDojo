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

Tile.prototype.generateSvg = function () {

    var svgTemplate = [
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="' +
        TILE_WIDTH + '" height="' + TILE_HEIGHT + '">',
        '<ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="#' + this._color + '"></ellipse>',
        '</svg>'
    ].join('');

    this.setSvgContext(svgTemplate);
};

Tile.prototype.setSvgContext = function (htmlData) {
    this._div.innerHTML = this._parseGTagForSvg(htmlData);
    this._isSvgReady = true;
    this.onSvgReady();
}

Tile.prototype.onSvgReady = function () {
    //callback function
};