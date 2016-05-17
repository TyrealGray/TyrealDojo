const GRID_NUMBER = 6;
class Column {

    constructor(id) {

        this._id = id;
        this._gridEntry = null;
        this._grids = null;
        this._container = null;
    }

    init() {

        this._generateGridEntry();

        this._generateGrid();

        this._initGraphics();

        this._initEvent();
    }
    
    restore(){
        this._grids.forEach(function(grid) {
            grid.empty();
        }, this);
    }

    _initEvent() {

        let [scope, entry] = [this, this._gridEntry];

        this._container.interactive = true;

        this._container.on('mouseover', function () {
            entry.setTurn(Global.referee.getTurn());
        });

        this._container.on('mouseout', function () {
            entry.setTurn(null);
        });

        this._container.on('mousedown', function () {
            scope.onClick();
        });
    }

    onClick() {
        
        let referee = Global.referee;

        if (referee.isGameOver()) {
            return;
        }

        this._dropPiece();
        
        /**
         * current column had change
         * check if there is a winner
         */
        let winner = referee.checkWinner(this);

        if (null !== winner) {
            referee.setWinnerIs(winner);
        }
        
        referee.checkTurn();//check this turn
    }

    _dropPiece() {

        if (this.isGridFull()) {
            return;
        }
        
        let referee = Global.referee;
        
        this._gridEntry.dropPiece();
        
        this._fillGridBy(referee.getTurn());
        
        referee.switchTurn();
    }

    isGridFull() {
        return (null !== this._grids[GRID_NUMBER - 1].getOwner());
    }

    _fillGridBy(turn) {

        for (let index = 0, len = GRID_NUMBER; index < len; ++index) {

            let grid = this._grids[index];

            if (null !== grid.getOwner()) {
                continue;
            }

            grid.setOwner(turn);

            grid.fillIn(turn);

            break;
        }
    }

    _initGraphics() {

        this._container = new PIXI.Container();

        this._gridEntry.initSprite();

        let gridEntrySprite = this._gridEntry.getSprite();

        this._container.addChild(gridEntrySprite);
        
        /**
         * sort grids
         * index 0 to 5 represent bottom to top 
         */
        for (let index = 0, len = GRID_NUMBER; index < len; ++index) {

            let grid = this._grids[index];
            grid.initSprite();
            let gridSprite = grid.getSprite();
            gridSprite.y = GRID_HEIGHT * (GRID_NUMBER - index);

            this._container.addChild(gridSprite);
        }
    }

    _generateGrid() {

        this._grids = [];

        let previousGrid = null;

        for (let index = 0, len = GRID_NUMBER; index < len; ++index) {

            let newgrid = new Grid(this.getID());
            newgrid.setIndex(index);

            if (null !== previousGrid) {

                newgrid.setBottom(previousGrid);
            }

            this._grids.push(newgrid);

            previousGrid = newgrid;
        }
    }

    _generateGridEntry() {
        this._gridEntry = new GridEntry(this.getID());
    }
    
    /**
     * get current top droppable-grid
     */
    getPossibleDropGrid(){
        
        let possibleGrid = null;
        
        for (let index = 0, len = GRID_NUMBER; index < len; ++index) {
            let grid = this._grids[index];
            
            if(null === grid.getOwner())
            {
                possibleGrid = grid;
                break;
            }
        }
        
        return possibleGrid;
    }

    getContainer() {
        return this._container;
    }

    getGrids() {
        return this._grids;
    }

    getGridEntry() {
        return this._gridEntry;
    }

    getID() {
        return this._id;
    }
    
    /**
     * for dropping animation
     */
    update() {

        if (null === this._gridEntry) {
            return;
        }

        this._gridEntry.update();
    }
}