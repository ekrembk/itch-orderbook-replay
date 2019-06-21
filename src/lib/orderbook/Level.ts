import Order from "./Order";
import { OrderExistsException, OrderDoesNotExistException } from "./Exceptions";

export class Level {
    quantity: number = 0;

    constructor(
        public price: number,
        public orders: Map<string, Order> = new Map<string, Order>(),
        public executedQuantities: Map<string, number> = new Map<string, number>(),
    ) {}

    add(order: Order) {
        if (this.orders.has(order.id)) {
            throw new OrderExistsException(order.id);
        }

        this.orders.set(order.id, order);
        this.quantity += order.quantity;
    }

    execute(order: Order) {
        if (!this.orders.has(order.id)) {
            throw new OrderDoesNotExistException(order.id);
        }

        const executedNow = order.quantity;
        const initialOrder = this.orders.get(order.id)!;

        const executedSoFar = this.executedQuantities.get(order.id) || 0;

        this.executedQuantities.set(order.id, executedSoFar + executedNow);
        const isFilled = initialOrder.quantity === (executedSoFar + executedNow);

        this.quantity -= executedNow;

        if (isFilled) {
            this.orders.delete(order.id);
        }

        return isFilled;
    }

    delete(order: Order) {
        if (!this.orders.has(order.id)) {
            throw new OrderDoesNotExistException(order.id);
        }

        const executedQuantity = this.executedQuantities.get(order.id) || 0;
        this.quantity -= this.orders.get(order.id)!.quantity - executedQuantity;
        this.orders.delete(order.id);
        this.executedQuantities.delete(order.id)
    }
}

export default Level;