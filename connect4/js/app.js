var Global = {
    referee:null
}

class App {
    constructor() {
        
        this._renderer = null;
        this._connect4 = null;
        this._referee = null;
    }

    init(div) {

        this._initRenderer(div);

        this._initConnect4();
        
        this._initReferee();
    }
    
    restart(){
        
        this._connect4.restart();
        
        this._referee.restart();
    }
    
    setVSCom(){
        this._referee.setVSCom(true);
    }
    
    setVSHuman(){
        this._referee.setVSCom(false);
    }

    _initRenderer(div) {

        this._renderer = new PixiRenderer();

        this._renderer.init(div);

        this._renderer.render();
    }

    _initConnect4() {

        this._connect4 = new Connect4();

        let columns = this._connect4.getColumns();

        for (let index = 0, len = columns.length; index < len; ++index) {
            let columnContainer = columns[index].getContainer();

            columnContainer.x = columns[index].getID() * GRID_WIDTH;
            columnContainer.y = GRID_HEIGHT;

            this._renderer.addContainer(columnContainer);
        }

        this._renderer.addToUpdateQueue(columns);
    }
    
    _initReferee(){
        
        let columns = this._connect4.getColumns();
        
        this._referee = new Referee(columns);
        
        this._referee.initSprite();
        
        this._renderer.addContainer(this._referee.getSprite());
        
        Global.referee = this._referee;
    }
}