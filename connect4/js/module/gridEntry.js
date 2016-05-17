class GridEntry {
    constructor(columnID) {
        this._columnID = columnID;
        this._sprite = null;
        this._emptyTexture = null;
        this._redPieceTexture = null;
        this._bluePieceTexture = null;
        this._isDropping = false;
    }

    dropPiece() {
        this._isDropping = true;
    }

    initSprite() {
        this._emptyTexture = PIXI.Texture.fromImage('./TyrealDojo/connect4/resource/gridEntry.png');

        this._redPieceTexture = PIXI.Texture.fromImage('./TyrealDojo/connect4/resource/redpiece.png');
        this._bluePieceTexture = PIXI.Texture.fromImage('./TyrealDojo/connect4/resource/bluepiece.png');

        let gridEntry = new PIXI.Sprite(this._emptyTexture);
        this._sprite = gridEntry;
    }
    
    /**
     * show current turn piece if player gonna dorp
     */
    setTurn(turn) {

        switch (turn) {
            case RED:
                this._sprite.texture = this._redPieceTexture;
                break;
            case BLUE:
                this._sprite.texture = this._bluePieceTexture;
                break;
            default:
                this._sprite.texture = this._emptyTexture;
                break;
        }

    }

    getSprite() {
        return this._sprite;
    }
    
    /**
     * for dropping animation
     */
    update() {
        if (!this._isDropping) {
            return;
        }

        this._sprite.y += 20;
        this._sprite.alpha -= 0.08;

        if (this._sprite.y < (GRID_NUMBER) * GRID_HEIGHT) {
            return;
        }

        this._sprite.y = 0;
        this._sprite.alpha = 1;
        this._isDropping = false;

        if (this._sprite.texture !== this._emptyTexture) {
            this.setTurn(Global.referee.getTurn());
        }
    }
}