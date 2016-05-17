const COLUMN_NUMBER = 7;

class Connect4 {
    constructor() {
        this._columns = null;
        
        this._init();
    }
    
    _init(){
        this._initColumns();
    }
    
    _initColumns(){
        this._columns = [];
        
        for(let index = 0,len = COLUMN_NUMBER;index < len;++index ){
            let column = new Column(index);
            column.init();
            this._columns.push(column);
        }
    }
    
    restart(){
        
        this._columns.forEach(function(column) {
            column.restore();
        }, this);
    }

    getColumns(){
        return this._columns;
    }
}