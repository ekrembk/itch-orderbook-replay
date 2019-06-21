import DataSource from "./DataSource";
import DataPoint from "./DataPoint";
import { NoMoreDataException } from "./Exceptions";

export default class JsonSource implements DataSource {
    index = -1;

    constructor(private data: DataPoint[]) {}

    reset(): void {
        this.index = -1;
    }

    revert(): void {
        this.index -= 1;
    }
    
    next(): DataPoint {
        if (this.index === this.data.length - 1) {
            throw new NoMoreDataException();
        }

        this.index += 1;

        return this.data[this.index];
    }
}