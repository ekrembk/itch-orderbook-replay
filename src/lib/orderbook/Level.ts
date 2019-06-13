import Order from "./Order";
import { OrderExistsException, OrderDoesNotExistException } from "./Exceptions";

export class Level {
    quantity: number = 0;

    constructor(
        public price: number,
        public orders: Map<string, Order> = new Map<string, Order>(),
    ) {}

    add(order: Order) {
        if (this.orders.has(order.id)) {
            throw new OrderExistsException(order.id);
        }

        this.orders.set(order.id, order);
        this.quantity += order.quantity;
    }

    replace(order: Order) {
        if (!this.orders.has(order.id)) {
            throw new OrderDoesNotExistException(order.id);
        }

        const currentQuantity = this.orders.get(order.id)!.quantity;

        this.orders.set(order.id, order);
        this.quantity += order.quantity - currentQuantity;
    }

    delete(order: Order) {
        if (!this.orders.has(order.id)) {
            throw new OrderDoesNotExistException(order.id);
        }

        this.quantity -= this.orders.get(order.id)!.quantity;
        this.orders.delete(order.id);
    }
}

export default Level;