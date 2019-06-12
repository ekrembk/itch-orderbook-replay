import Order from "./Order";

export class Level {
    constructor(
        public price: number,
        public orders: Map<string, Order> = new Map<string, Order>(),
    ) {}
}

export default Level;