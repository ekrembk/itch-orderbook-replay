import Order from "./Order";
import OrderType from "./OrderType";
import { OrderExistsException } from "./Exceptions";
import Side from "./Side";

export class OrderBook {
    bidSide = new Side(OrderType.Buy);
    askSide = new Side(OrderType.Sell);

    public add(order: Order) {
        const side = order.type === OrderType.Buy
            ? this.bidSide
            : this.askSide;

        const level = side.getOrCreateLevel(order.price);

        if (level.orders.has(order.id)) {
            throw new OrderExistsException(order.id);
        }

        level.orders.set(order.id, order);
    }
}

export default OrderBook;