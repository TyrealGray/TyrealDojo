const RED = 0;
const BLUE = 1;
const GRID_WIDTH = 60;
const GRID_HEIGHT = 60;

class Grid {

    constructor(columnID) {

        this._columnID = columnID;
        this._index = null;
        this._bottom = null;
        this._owner = null;
        this._sprite = null;
    }
    
    initSprite() {
        let gridSprite = PIXI.Sprite.fromImage('/connect4/resource/grid.png');
        this._sprite = gridSprite;
    }
    
    /**
     * empty the grid for restart play
     */
    empty(){
        this.setOwner(null);
        this._sprite.removeChildren();
    }
    
    /**
     * fill the grid by turn
     */
    fillIn(turn){
        
        if(null === this._sprite){
            return;
        }
        
        let redPieceTexture = PIXI.Texture.fromImage('/connect4/resource/redpiece.png');
        let bluePieceTexture = PIXI.Texture.fromImage('/connect4/resource/bluepiece.png');
        
        let pieceSprite = null;

        if(RED === turn){
            pieceSprite = new PIXI.Sprite(redPieceTexture);
        }else{
            pieceSprite = new PIXI.Sprite(bluePieceTexture);
        }
        
        this._sprite.addChild(pieceSprite);
    }
    
    getOwner(){
        return this._owner;
    }

    getSprite() {
        return this._sprite;
    }
    
    setOwner(turn){
        this._owner = turn;
    }

    setBottom(bottomGrid) {
        this._bottom = bottomGrid;
    }

    setIndex(index) {
        this._index = index;
    }

    getIndex() {
        return this._index;
    }

    getBottom() {
        return this._bottom;
    }
    
    getColumnID(){
        return this._columnID;
    }
}