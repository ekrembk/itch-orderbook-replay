import OrderType from "./OrderType";

export class Order {
    constructor(
        public id: string, 
        public type: OrderType, 
        public price: number = NaN, 
        public quantity: number = NaN) {}
}

export default Order;