import Level from "./Level";
import OrderType from "./OrderType";

export class Side {
    levels: Map<number, Level> = new Map<number, Level>();

    constructor(private type: OrderType) { }

    public best(): Level | undefined {
        return this.levels.size > 0
            ? this.levels.values().next().value
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

    public reverseCompare(a: number, b: number) {
        return a > b
            ? -1
            : (a < b ? 1 : 0);
    }
}

export default Side;