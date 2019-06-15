import DataSource from "./DataSource";
import DataPoint from "./DataPoint";
import Order from "../orderbook/Order";
import OrderType from "../orderbook/OrderType";
import { NoMoreDataException } from "./Exceptions";

interface JsonDataPoint {
    method: string;
    id: string;
    type: string;
    price: number;
    quantity: number;
}

export default class JsonSource implements DataSource {
    private index = 0;

    constructor(private data: JsonDataPoint[]) {}

    next(): DataPoint {
        if (this.index === this.data.length) {
            throw new NoMoreDataException();
        }

        const payload = this.data[this.index];
        this.index += 1;

        return new DataPoint(payload.method, new Order(payload.id, payload.type === "buy" ? OrderType.Buy : OrderType.Sell, payload.price, payload.quantity));
    }
}