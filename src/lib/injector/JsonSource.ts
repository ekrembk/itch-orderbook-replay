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
    private index = -1;

    constructor(private data: JsonDataPoint[]) {}

    prev(): DataPoint {
        if (this.index <= 0) {
            throw new NoMoreDataException();
        }

        this.index -= 1;
        const payload = this.data[this.index];

        return new DataPoint(payload.method, this.getOrderForPayload(payload));
    }
    
    next(): DataPoint {
        if (this.index === this.data.length - 1) {
            throw new NoMoreDataException();
        }

        this.index += 1;
        const payload = this.data[this.index];

        return new DataPoint(payload.method, this.getOrderForPayload(payload));
    }

    getOrderForPayload(payload: JsonDataPoint) {
        return new Order(payload.id, payload.type === "buy" ? OrderType.Buy : OrderType.Sell, payload.price, payload.quantity);
    }
}