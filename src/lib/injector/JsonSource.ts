import DataSource from "./DataSource";
import DataPoint from "./DataPoint";
import { NoMoreDataException } from "./Exceptions";

export default class JsonSource implements DataSource {
    private index = -1;

    constructor(private data: DataPoint[]) {}

    prev(): DataPoint {
        if (this.index <= 0) {
            throw new NoMoreDataException();
        }

        this.index -= 1;

        return this.data[this.index];
    }
    
    next(): DataPoint {
        if (this.index === this.data.length - 1) {
            throw new NoMoreDataException();
        }

        this.index += 1;

        return this.data[this.index];
    }
}