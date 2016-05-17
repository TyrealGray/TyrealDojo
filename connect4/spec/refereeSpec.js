const COLUMN_NUMBER = 7;

describe("referee", function () {
    var [referee, columns] = [null, null];

    beforeEach(function () {

        columns = [];
        referee = new Referee(columns);

        for (let index = 0, len = COLUMN_NUMBER; index < len; ++index) {

            let column = new Column(index);
            column._generateGrid();

            columns.push(column);
        }

    });

    describe("should be a win by RED", function () {

        it("bottom connect", function () {

            for (let index = 0, len = 4; index < len; ++index) {
                columns[0]._fillGridBy(RED);
            }

            expect(referee.checkWinner(columns[0])).toEqual(RED);
        });

        it("bottom connect with one blue", function () {

            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(RED);
        });

        it("horizontal with left corner connect", function () {
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(RED);
        });

        it("horizontal with right corner connect", function () {
            columns[6]._fillGridBy(RED);
            columns[5]._fillGridBy(RED);
            columns[4]._fillGridBy(RED);
            columns[3]._fillGridBy(RED);

            expect(referee.checkWinner(columns[3])).toEqual(RED);
        });

        it("second row horizontal connect", function () {
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(RED);
        });

        it("top left to bottom right with left corner connect", function () {
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(RED);
        });

        it("top left to bottom right with right corner connect", function () {
            columns[6]._fillGridBy(RED);
            columns[5]._fillGridBy(BLUE);
            columns[5]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[6]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);

            expect(referee.checkWinner(columns[3])).toEqual(RED);
        });

        it("top left to bottom right with middle connect", function () {
            columns[5]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[5]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);

            expect(referee.checkWinner(columns[2])).toEqual(RED);
        });

        it("top right to bottom left with middle connect", function () {

            columns[2]._fillGridBy(BLUE);
            columns[5]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);

            expect(referee.checkWinner(columns[4])).toEqual(RED);
        });

        it("top right to bottom left with level 3-6", function () {

            columns[0]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);

            expect(referee.checkWinner(columns[3])).toEqual(RED);
        });
    });

    describe("should be a win by BLUE", function () {

        it("bottom connect", function () {

            for (let index = 0, len = 4; index < len; ++index) {
                columns[0]._fillGridBy(BLUE);
            }

            expect(referee.checkWinner(columns[0])).toEqual(BLUE);
        });

        it("bottom connect with one red", function () {

            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);


            expect(referee.checkWinner(columns[0])).toEqual(BLUE);
        });

        it("horizontal with left corner connect", function () {
            columns[5]._fillGridBy(BLUE);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(BLUE);
            columns[1]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[0])).toEqual(BLUE);
        });

        it("second row horizontal connect", function () {
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(BLUE);
            columns[1]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[0])).toEqual(BLUE);
        });

        it("second row horizontal with left corner connect", function () {
            columns[6]._fillGridBy(BLUE);
            columns[5]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[3]._fillGridBy(BLUE);
            columns[6]._fillGridBy(BLUE);
            columns[5]._fillGridBy(BLUE);
            columns[4]._fillGridBy(BLUE);
            columns[3]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[3])).toEqual(BLUE);
        });

        it("top right to bottom left with level 3-6", function () {

            columns[0]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[3])).toEqual(BLUE);
        });

        it("top right to bottom left with level 2-5", function () {
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[5]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            expect(referee.checkWinner(columns[4])).toEqual(BLUE);
        });

        it("top right to bottom left with level 2-5 & left corner", function () {
            columns[2 - 1]._fillGridBy(RED);
            columns[3 - 1]._fillGridBy(BLUE);
            columns[4 - 1]._fillGridBy(RED);
            columns[4 - 1]._fillGridBy(BLUE);
            columns[5 - 1]._fillGridBy(RED);
            columns[2 - 1]._fillGridBy(BLUE);
            columns[3 - 1]._fillGridBy(RED);
            columns[3 - 1]._fillGridBy(BLUE);
            columns[1 - 1]._fillGridBy(RED);
            columns[1 - 1]._fillGridBy(BLUE);
            columns[1 - 1]._fillGridBy(RED);
            columns[2 - 1]._fillGridBy(BLUE);
            columns[1 - 1]._fillGridBy(RED);
            columns[1 - 1]._fillGridBy(BLUE);
            columns[2 - 1]._fillGridBy(RED);
            columns[4 - 1]._fillGridBy(BLUE);
            columns[4 - 1]._fillGridBy(RED);
            columns[3 - 1]._fillGridBy(BLUE);
            columns[2 - 1]._fillGridBy(RED);
            columns[4 - 1]._fillGridBy(BLUE);
            expect(referee.checkWinner(columns[3])).toEqual(BLUE);
        });

        it("top left to bottom right with level 3-6", function () {
            columns[1]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[3]._fillGridBy(RED);
            columns[4]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[3]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[1])).toEqual(BLUE);
        });
        
        it("top left to bottom right with level 3-6 & left corner", function () {
            columns[1 - 1]._fillGridBy(RED);
            columns[2 - 1]._fillGridBy(BLUE);
            columns[3 - 1]._fillGridBy(RED);
            columns[4 - 1]._fillGridBy(BLUE);
            columns[4 - 1]._fillGridBy(RED);
            columns[3 - 1]._fillGridBy(BLUE);
            columns[2 - 1]._fillGridBy(RED);
            columns[1 - 1]._fillGridBy(BLUE);
            columns[3 - 1]._fillGridBy(RED);
            columns[4 - 1]._fillGridBy(BLUE);
            columns[2 - 1]._fillGridBy(RED);
            columns[3 - 1]._fillGridBy(BLUE);
            columns[1 - 1]._fillGridBy(RED);
            columns[2 - 1]._fillGridBy(BLUE);
            columns[1 - 1]._fillGridBy(RED);
            columns[2 - 1]._fillGridBy(BLUE);
            columns[1 - 1]._fillGridBy(RED);
            columns[1 - 1]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[0])).toEqual(BLUE);
        });
        
        it("top left to bottom right with level 3-6 & right corner", function () {
            columns[1 + 2]._fillGridBy(RED);
            columns[2 + 2]._fillGridBy(BLUE);
            columns[3 + 2]._fillGridBy(RED);
            columns[4 + 2]._fillGridBy(BLUE);
            columns[4 + 2]._fillGridBy(RED);
            columns[3 + 2]._fillGridBy(BLUE);
            columns[2 + 2]._fillGridBy(RED);
            columns[1 + 2]._fillGridBy(BLUE);
            columns[3 + 2]._fillGridBy(RED);
            columns[4 + 2]._fillGridBy(BLUE);
            columns[2 + 2]._fillGridBy(RED);
            columns[3 + 2]._fillGridBy(BLUE);
            columns[1 + 2]._fillGridBy(RED);
            columns[2 + 2]._fillGridBy(BLUE);
            columns[1 + 2]._fillGridBy(RED);
            columns[2 + 2]._fillGridBy(BLUE);
            columns[1 + 2]._fillGridBy(RED);
            columns[1 + 2]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[3])).toEqual(BLUE);
        });

    });

    describe("should be no winner", function () {

        it("bottom with three red and one blue between with", function () {

            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(null);
        });

        it("bottom connect with wrong process", function () {

            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(null);
        });

        it("horizontal connect with wrong process", function () {

            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(RED);
            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);

            expect(referee.checkWinner(columns[0])).toEqual(null);
        });

        it("top left to bottom right connect with wrong process", function () {

            columns[3]._fillGridBy(RED);
            columns[2]._fillGridBy(BLUE);
            columns[2]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[4]._fillGridBy(RED);
            columns[1]._fillGridBy(BLUE);
            columns[1]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);
            columns[0]._fillGridBy(RED);
            columns[0]._fillGridBy(BLUE);

            expect(referee.checkWinner(columns[0])).toEqual(null);
        });
    });

});