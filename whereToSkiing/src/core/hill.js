//@flow
type HillPropsType = {
    height: number;
};

export default class Hill {
    _height: number;
    _downHills: Array<Hill>;
    _upperHills: Array<Hill>;
    _longestPath: Hill;
    _length: number;
    _drop: number;
    _steepestDrop: number;
    _steepestDropHill: Hill;

    constructor(props: HillPropsType) {
        this._height = props.height;
        this._downHills = [];
        this._upperHills = [];
        this._longestPath = this;
        this._length = 1;
        this._drop = 0;
        this._steepestDrop = 0;
        this._steepestDropHill = this;
    }

    setSkiingDownPath(hill: Hill) {

        this._downHills.push(hill);

        this.updateSkiingDownPath(hill);

        hill.setUpperHill(this);

        this.updateUpperHills();
    }

    setUpperHill(hill: Hill) {
        this._upperHills.push(hill);

        this.updateUpperHills();
    }

    updateUpperHills() {
        for (const upperHill of this._upperHills) {
            upperHill.updateSkiingDownPath(this);
            upperHill.updateUpperHills();
        }
    }

    updateSkiingDownPath(hill: Hill) {

        let newLength = hill.getLength() + 1,
            newDrop = hill.getDrop() + this.getHeight() - hill.getHeight();

        let isSameLengthButSteeper = (this.getLength() === newLength && this.getDrop() < newDrop ),
            isLongerLength = this.getLength() < newLength,
            newSteepestDrop = this.getHeight() - hill.getSteepestDropHill().getHeight();

        if (isSameLengthButSteeper || isLongerLength) {
            this._length = newLength;
            this._longestPath = hill;
        }

        if(newSteepestDrop > this.getSteepestDrop()){
            this._steepestDropHill = hill.getSteepestDropHill();
            this._steepestDrop = newSteepestDrop;
        }
    }

    getSteepestDropHill(): Hill {
        return this._steepestDropHill;
    }

    getDrop(): number {
        this._updateDrop();

        return this._drop;
    }

    _updateDrop() {
        let longestPath = this,
            height = this.getHeight();

        while (longestPath !== longestPath.getLongestPath()) {
            longestPath = longestPath.getLongestPath();
        }

        this._drop = height - longestPath.getHeight();
    }

    getSteepestDrop(): number {
        return this._steepestDrop;
    }

    getHeight(): number {
        return this._height;
    }

    getLength(): number {
        return this._length;
    }

    getLongestPath(): Hill {
        return this._longestPath;
    }

    getDownHills(): Array<Hill> {
        return this._downHills;
    }
}