import OrderType from "./OrderType";

export class Order {
    constructor(
        public id: string, 
        public type: OrderType, 
        public price: number, 
        public quantity: number) {}
}

export default Order;