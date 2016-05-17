class Referee {

    constructor(columns) {
        this._columns = columns;
        this._turn = RED;
        this._isVSCom = true;
        this._isGameOver = false;
        this._gameInfoSprite = null;
    }

    initSprite() {
        var style = {
            fill: '#F7EDCA',
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        };

        this._gameInfoSprite = new PIXI.Text('Red Turn', style);
        this._gameInfoSprite.x = 5;
        this._gameInfoSprite.y = 5;
    }

    restart() {

        this._turn = RED;

        this._setGameOver(false);

        this.setGameInfo('Red Turn');
    }

    setVSCom(isVSCom) {

        this._isVSCom = isVSCom;
    }

    setWinnerIs(turn) {
        this._setGameOver(true);

        let infoStr = (RED === turn) ? 'Red Win' : 'Blue Win';
        this.setGameInfo(infoStr);
    }

    setGameInfo(str) {
        this._gameInfoSprite.text = str;
    }

    _setGameOver(isGameOver) {
        this._isGameOver = isGameOver;
    }

    checkTurn() {

        if (!this._isVSCom || BLUE !== this.getTurn()) {
            return;
        }

        let index = this._getComStrategy();

        this._columns[index].onClick();
    }

    _getComStrategy() {
        return this._getComDropIndex();
    }

    _getComDropIndex() {

        let notFulledColumns = this._getNotFulledColumns();
        let mostPossibleIndex = Math.floor(Math.random() * (notFulledColumns.length - 1));
        let connectCount = 0;

        notFulledColumns.forEach(function (column) {

            let grid = column.getPossibleDropGrid();

            let fakeGrid = this._fakeGrid(grid);
            fakeGrid.setOwner(BLUE);

            let possibleCount = this._getMostPossibleCount(fakeGrid);

            if (possibleCount > connectCount) {
                connectCount = possibleCount;
                mostPossibleIndex = column.getID();
            }

        }, this);

        let HumanStrategyIndex = this._gerHumanStrategyIndex();

        if (null !== HumanStrategyIndex && 3 > connectCount) {
            mostPossibleIndex = HumanStrategyIndex;
        }

        return mostPossibleIndex;
    }
    
    _gerHumanStrategyIndex() {

        let notFulledColumns = this._getNotFulledColumns();
        let mostPossibleIndex = null;

        notFulledColumns.forEach(function (column) {

            let grid = column.getPossibleDropGrid();

            let fakeGrid = this._fakeGrid(grid);
            fakeGrid.setOwner(RED);

            if (3 === this._getMostPossibleCount(fakeGrid)) {
                mostPossibleIndex = column.getID();
            }

        }, this);

        return mostPossibleIndex;
    }

    /**
     * fake a grid for AI test
     */
    _fakeGrid(grid) {
        let fakeGrid = new Grid(grid.getColumnID());
        fakeGrid.setIndex(grid.getIndex());
        fakeGrid.setBottom(grid.getBottom());

        return fakeGrid;
    }

    _getMostPossibleCount(grid) {
        let possibleCount = 0;

        possibleCount = Math.max(this._getBottomConnectCount(grid), this._getTopLeft_BottomRightCount(grid),
            this._getTopRight_BottomLeftCount(grid), this._getLeftCount(grid), this._getRightCount(grid));

        return possibleCount;
    }

    _getNotFulledColumns() {
        let notFulledColumns = [];

        this._columns.forEach(function (column) {
            if (!column.isGridFull()) {
                notFulledColumns.push(column);
            }
        }, this);

        return notFulledColumns;
    }

    switchTurn() {
        this._turn = (RED === this._turn) ? BLUE : RED;

        let infoStr = (RED === this.getTurn()) ? 'Red Turn' : 'Blue Turn';
        this.setGameInfo(infoStr);
    }

    getTurn() {
        return this._turn;
    }

    isGameOver() {
        return this._isGameOver;
    }

    getSprite() {
        return this._gameInfoSprite;
    }

    checkWinner(column) {

        let [winner, newDroppedGrid, grids] = [null, null, column.getGrids()];

        for (let index = GRID_NUMBER - 1; index >= 0; --index) {
            let grid = grids[index];

            if (null !== grid.getOwner()) {
                newDroppedGrid = grid;
                break;
            }
        }

        winner = (this._isWinByBottomConnect(newDroppedGrid)) ? newDroppedGrid.getOwner() : null;

        winner = (this._isWinByHorizontalConnect(newDroppedGrid)) ? newDroppedGrid.getOwner() : winner;

        winner = (this._isWinByDiagonalConnect(newDroppedGrid))? newDroppedGrid.getOwner() : winner;

        return winner;
    };

    _isWinByBottomConnect(grid) {
        let winner = null;

        return (3 <= this._getBottomConnectCount(grid));
    }

    _getBottomConnectCount(grid) {

        let [connectCount, bottomGrid] = [0, grid.getBottom()];

        while (null !== bottomGrid && bottomGrid.getOwner() === grid.getOwner()) {
            connectCount++;
            bottomGrid = bottomGrid.getBottom();
        }

        return connectCount;
    }
    
    _isWinByHorizontalConnect(grid) {
        let leftCount = this._getLeftCount(grid);
        let rightCount = this._getRightCount(grid);

        let winner = null;

        return (3 <= (leftCount + rightCount));
    }

    _getLeftCount(grid) {

        let connectCount = 0;

        let columnID = grid.getColumnID();

        if (0 === columnID) {
            return connectCount;
        }

        for (let index = columnID - 1; index >= 0; --index) {

            let grids = this._columns[index].getGrids();

            if (grid.getOwner() !== grids[grid.getIndex()].getOwner()) {
                break;
            }

            ++connectCount;
        }

        return connectCount;
    }

    _getRightCount(grid) {

        let connectCount = 0;

        let columnID = grid.getColumnID();

        if ((COLUMN_NUMBER - 1) === columnID) {
            return connectCount;
        }

        for (let index = columnID + 1; index < COLUMN_NUMBER; ++index) {

            let grids = this._columns[index].getGrids();

            if (grid.getOwner() !== grids[grid.getIndex()].getOwner()) {
                break;
            }

            ++connectCount;
        }

        return connectCount;
    }

    _isWinByDiagonalConnect(grid) {
        let leftCount = this._getTopLeft_BottomRightCount(grid);
        let rightCount = this._getTopRight_BottomLeftCount(grid);

        let winner = null;

        return (3 <= leftCount || 3 <= rightCount);
    }

    _getTopLeft_BottomRightCount(grid) {

        let connectCount = 0;

        let columnID = grid.getColumnID();

        if (0 !== columnID) {
            for (let index = columnID - 1, gridY = 1; index >= 0; --index, ++gridY) {

                let grids = this._columns[index].getGrids();

                if (GRID_NUMBER <= grid.getIndex() + gridY) {
                    break;
                }

                if (grid.getOwner() !== grids[grid.getIndex() + gridY].getOwner()) {
                    break;
                }

                ++connectCount;
            }
        }

        if ((COLUMN_NUMBER - 1) !== columnID) {

            for (let index = columnID + 1, gridY = 1; index < COLUMN_NUMBER; ++index, ++gridY) {

                let grids = this._columns[index].getGrids();

                if (0 > grid.getIndex() - gridY) {
                    break;
                }

                if (grid.getOwner() !== grids[grid.getIndex() - gridY].getOwner()) {
                    break;
                }

                ++connectCount;
            }
        }

        return connectCount;
    }

    _getTopRight_BottomLeftCount(grid) {

        let connectCount = 0;

        let columnID = grid.getColumnID();

        if (0 !== columnID) {
            for (let index = columnID - 1, gridY = 1; index >= 0; --index, ++gridY) {

                let grids = this._columns[index].getGrids();

                if (0 > grid.getIndex() - gridY) {
                    break;
                }

                if (grid.getOwner() !== grids[grid.getIndex() - gridY].getOwner()) {
                    break;
                }

                ++connectCount;
            }
        }

        if ((COLUMN_NUMBER - 1) !== columnID) {

            for (let index = columnID + 1, gridY = 1; index < COLUMN_NUMBER; ++index, ++gridY) {

                let grids = this._columns[index].getGrids();

                if (GRID_NUMBER <= grid.getIndex() + gridY) {
                    break;
                }

                if (grid.getOwner() !== grids[grid.getIndex() + gridY].getOwner()) {
                    break;
                }

                ++connectCount;
            }
        }

        return connectCount;
    }
}