describe("rowDiv", function() {
    var rowDiv;

    beforeEach(function() {
        var firstRow = null;
        rowDiv = new RowDiv(firstRow);
    });
    
    it("should not be ready", function() {
        rowDiv.addTile({});

        rowDiv.oneTileReady();
        expect(rowDiv.isReady()).not.toBeTruthy();
    });
    
    it("should be ready", function() {
        rowDiv.addTile({});
        
        rowDiv.ready();

        rowDiv.oneTileReady();
        expect(rowDiv.isReady()).toBeTruthy();
    });

});