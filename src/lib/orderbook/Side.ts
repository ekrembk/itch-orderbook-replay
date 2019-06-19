import Level from "./Level";

const SortedMap = require("collections/sorted-map");

export class Side {
    levels: any;

    constructor(public type: string) {
        const equals = (a: number, b: number) => a === b;
        const compareFn = type === "buy"
            ? (a: number, b: number) => b - a
            : (a: number, b: number) => a - b;

        this.levels = new SortedMap({}, equals, compareFn);
    }

    public best(): Level | undefined {
        return this.levels.length > 0
            ? this.levels.sorted()[0]
            : undefined;
    }

    public getOrCreateLevel(price: number): Level {
        if (this.levels.has(price)) {
            return this.levels.get(price)!;
        }

        const newLevel = new Level(price);
        this.levels.set(price, newLevel);

        return newLevel;
    }
}

export default Side;