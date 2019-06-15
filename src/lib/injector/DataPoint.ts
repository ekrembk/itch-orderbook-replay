import Order from "../orderbook/Order";

export default class DataPoint {
    constructor(public method: string, public order: Order) {}
}