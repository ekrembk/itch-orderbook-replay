import Order from "./Order";
import OrderType from "./OrderType";
import Side from "./Side";
import Level from "./Level";

export class OrderBook {
    constructor(public bidSide: Side, public askSide: Side) {}
    
    public add(order: Order) {
        return this.getLevel(order).add(order);
    }

    public delete(order: Order) {
        return this.getLevel(order).delete(order);
    }

    public replace(order: Order) {
        return this.getLevel(order).replace(order);
    }

    public execute(order: Order) {
        return this.getLevel(order).execute(order);
    }

    private getLevel(order: Order): Level {
        const side = order.type === OrderType.Buy
            ? this.bidSide
            : this.askSide;

        return side.getOrCreateLevel(order.price);
    }
}

export default OrderBook;