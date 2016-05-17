class PixiRenderer {
    
    constructor() {
        this._renderer = null;
        this._stage = null;
        this._updataQueue = [];
    }

    init(div) {
        
        this._renderer = PIXI.autoDetectRenderer(420, 480, { backgroundColor: 0xeeeeee });
        
        this._stage = new PIXI.Container();

        div.appendChild(this._renderer.view);
    }
    
    addContainer(container){
        this._stage.addChild(container);
    }
    
    addToUpdateQueue(queuers){
        
        queuers.forEach(function(queuer) {
            this._updataQueue.push(queuer);
        }, this);
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        
        this._updataQueue.forEach(function(queuer) {
            queuer.update();
        }, this);

        this._renderer.render(this._stage);
    }
}