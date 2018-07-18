import expect from 'expect.js';
import Hill from '../../src/core/hill';

describe('Hill', () => {

    let hill10 = null,
        downHill8 = null,
        downHill4 = null,
        downHill3 = null;

    beforeEach(() => {
        hill10 = new Hill({height: 10});
        downHill8 = new Hill({height: 8});
        downHill4 = new Hill({height: 4});
        downHill3 = new Hill({height: 3});
    });

    afterEach(() => {
        hill10 = null;
    });

    it('downHill8 should be the skiing path for hill10', () => {

        hill10.setSkiingDownPath(downHill8);
        expect(hill10.getDownHills()[0]).to.be(downHill8);
    });

    it('downHill4 should be another skiing path for hill10', () => {

        hill10.setSkiingDownPath(downHill8);
        hill10.setSkiingDownPath(downHill4);
        expect(hill10.getDownHills()[0]).to.be(downHill8);
        expect(hill10.getDownHills()[1]).to.be(downHill4);
    });

    it('hill10 downHill8 downHill4 length should be 1', () => {

        expect(hill10.getLength()).to.be(1);
        expect(downHill8.getLength()).to.be(1);
        expect(downHill4.getLength()).to.be(1);
    });

    it('hill10 length should be 2', () => {

        hill10.setSkiingDownPath(downHill8);
        hill10.setSkiingDownPath(downHill4);
        expect(hill10.getLength()).to.be(2);
    });

    it('hill10 length should be correct', () => {

        hill10.setSkiingDownPath(downHill8);
        expect(hill10.getLength()).to.be(2);
        downHill8.setSkiingDownPath(downHill4);
        expect(hill10.getLength()).to.be(3);
    });

    it('hill10 downHill8 downHill4 drop should be 0', () => {

        expect(hill10.getDrop()).to.be(0);
        expect(downHill8.getDrop()).to.be(0);
        expect(downHill4.getDrop()).to.be(0);
    });

    it('downHill3 & downHill8 should be longest skiing path for hill10', () => {

        expect(hill10.getLongestPath().getHeight()).to.be(10);
        expect(hill10.getDrop()).to.be(0);
        expect(hill10.getLength()).to.be(1);
        expect(downHill8.getLength()).to.be(1);

        hill10.setSkiingDownPath(downHill8);
        hill10.setSkiingDownPath(downHill4);
        downHill8.setSkiingDownPath(downHill3);

        expect(hill10.getLongestPath().getHeight()).to.be(8);
        expect(hill10.getDrop()).to.be(7);
        expect(hill10.getLength()).to.be(3);
        expect(downHill8.getLength()).to.be(2);
    });

    it('downHill4 & downHill3 should be longest skiing path for hill10', () => {

        hill10.setSkiingDownPath(downHill8);
        hill10.setSkiingDownPath(downHill4);
        downHill4.setSkiingDownPath(downHill3);

        expect(hill10.getLongestPath().getHeight()).to.be(4);
        expect(hill10.getDrop()).to.be(7);
        expect(hill10.getLength()).to.be(3);
        expect(downHill4.getLength()).to.be(2);
        expect(hill10.getSteepestDrop()).to.be(7);
    });

    it('downHill4 & downHill8 should be longest skiing path for hill10', () => {

        hill10.setSkiingDownPath(downHill8);
        hill10.setSkiingDownPath(downHill3);
        downHill8.setSkiingDownPath(downHill4);

        expect(hill10.getLongestPath().getHeight()).to.be(8);
        expect(hill10.getDrop()).to.be(6);
        expect(hill10.getLength()).to.be(3);
        expect(downHill8.getLength()).to.be(2);
        expect(hill10.getSteepestDrop()).to.be(7);
    });

    it('downHill4 & downHill8 should be longest skiing path for hill10', () => {

        downHill8.setSkiingDownPath(downHill4);
        downHill8.setUpperHill(hill10);
        downHill3.setUpperHill(hill10);

        expect(hill10.getLongestPath().getHeight()).to.be(8);
        expect(hill10.getDrop()).to.be(6);
        expect(hill10.getLength()).to.be(3);
        expect(downHill8.getLength()).to.be(2);
        expect(hill10.getSteepestDrop()).to.be(7);
    });

    it('hill10 downHill8 downHill4 steepest drop should be correct', () => {

        expect(hill10.getSteepestDrop()).to.be(0);
        expect(downHill8.getSteepestDrop()).to.be(0);
        expect(downHill4.getSteepestDrop()).to.be(0);

        hill10.setSkiingDownPath(downHill8);
        expect(hill10.getSteepestDrop()).to.be(2);
        expect(hill10.getSteepestDropHill().getHeight()).to.be(8);
        expect(downHill8.getSteepestDropHill().getHeight()).to.be(8);
        expect(downHill8.getHighestHill().getHeight()).to.be(10);

        downHill8.setSkiingDownPath(downHill4);
        expect(hill10.getSteepestDrop()).to.be(6);
        expect(downHill8.getSteepestDrop()).to.be(4);
        expect(hill10.getSteepestDropHill().getHeight()).to.be(4);
        expect(downHill4.getHighestHill().getHeight()).to.be(10);
    });
});