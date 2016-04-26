function App() {
    this._canvas = null;
    this._fileInput = null;
    this._divConductor = null;
    this._colorGridWorker = null;
}

App.prototype.init = function (content) {
    this._initWorker(content);
    this._initInterface(content);
};

/**
 * use thread calculate grids position and color
 */
App.prototype._initWorker = function (content) {

    this._colorGridWorker = new Worker('js/module/colorGridWorker.js');

    this._colorGridWorker.onmessage = function (event) {
        var data = event.data;
        switch (data.cmd) {
            case 'parse':
                var grids = data.msg.grids,
                    firstRowDiv = null,
                    tile = null,
                    lastRowIndex = null;

                for (var index = 0, len = grids.length; index < len; ++index) {

                    /**
                     * if y not equal lastRowIndex that means there should be a new row div
                     * and current row div's tiles data is all set
                     */
                    if (grids[index].center.y !== lastRowIndex) {
                        lastRowIndex = grids[index].center.y;
                        if (null !== firstRowDiv) {
                            firstRowDiv.ready();
                        }

                        firstRowDiv = new RowDiv(firstRowDiv);
                        firstRowDiv.init(content.canvasID);
                    }

                    tile = new Tile(grids[index].averageColor, grids[index].center);

                    firstRowDiv.addTile(tile);
                }

                //last row div will out of loop,set ready here
                firstRowDiv.ready();
                break;
            default:
                console.log("default msg received" + data.cmd);
        }
    };
};

App.prototype._initInterface = function (content) {
    //bind interface tag id
    this._canvas = document.getElementById(content.canvasID);
    this._fileInput = document.getElementById(content.fileInputID);

    this._initEvent();
};

App.prototype._initEvent = function () {

    var colorGridWorker = this._colorGridWorker,
        canvas = this._canvas;

    /**
     * when click, clear canvas to avoid SecurityError 
     * and the name so that user can choose the same img again
     *  */
    this._fileInput.onclick = function (uploader) {
        var canvasID = canvas.id;
        document.body.removeChild(canvas);
        canvas = document.createElement('canvas');
        canvas.id = canvasID;
        document.body.appendChild(canvas);
        
        uploader.target.value = '';
    }

    this._fileInput.onchange = function (uploader) {
        var file = uploader.target.files[0];

        var reader = new FileReader();

        reader.onload = function (e) {

            var context2d = canvas.getContext('2d'),
                img = new Image;

            img.onload = function () {
                canvas.width = this.width;
                canvas.height = this.height;

                context2d.drawImage(img, 0, 0);

                //if number is not divisible, just ignore the float
                var imgWidth = parseInt(canvas.width / TILE_WIDTH) * TILE_WIDTH,
                    imgHeight = parseInt(canvas.height / TILE_HEIGHT) * TILE_HEIGHT;

                var colorData = context2d.getImageData(0, 0, imgWidth, imgHeight).data;

                colorGridWorker.postMessage({
                    'cmd': 'parse',
                    'msg': {
                        gridData: {
                            width: TILE_WIDTH,
                            height: TILE_HEIGHT
                        },
                        imageData: {
                            width: imgWidth,
                            height: imgHeight,
                            color: colorData
                        }
                    }
                });
            }

            img.src = reader.result;
        }

        reader.readAsDataURL(file);
    }
};