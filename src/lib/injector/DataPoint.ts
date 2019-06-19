import Order from "../orderbook/Order";

export default interface DataPoint {
    method: string;
    order: Order;
}