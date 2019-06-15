import DataSource from "./DataSource";
import DataPoint from "./DataPoint";
import Order from "../orderbook/Order";
import OrderType from "../orderbook/OrderType";
import { NoMoreDataException } from "../orderbook/Exceptions";

export default class JsonSource implements DataSource {
    private index = 0;
    private data = [
        {"method": "add", "id": "id1", "type": "buy", "price": 100, "quantity": 10},
        {"method": "add", "id": "id2", "type": "buy", "price": 101, "quantity": 10},
        {"method": "add", "id": "id3", "type": "buy", "price": 101, "quantity": 10},
        {"method": "add", "id": "id1", "type": "sell", "price": 99, "quantity": 10},
        {"method": "add", "id": "id2", "type": "sell", "price": 97, "quantity": 10},
        {"method": "add", "id": "id3", "type": "sell", "price": 98, "quantity": 10},
    ];

    next(): DataPoint {
        if (this.index === this.data.length) {
            throw new NoMoreDataException();
        }

        const payload = this.data[this.index];
        this.index += 1;

        return new DataPoint(payload.method, new Order(payload.id, payload.type === "buy" ? OrderType.Buy : OrderType.Sell, payload.price, payload.quantity));
    }
}