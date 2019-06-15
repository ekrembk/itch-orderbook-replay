import Order from "../orderbook/Order";
import OrderType from "../orderbook/OrderType";
import { NoMoreDataException } from "./Exceptions";
import JsonSource from "./JsonSource";
import DataPoint from "./DataPoint";

it("returns next data correctly", () => {
    const sample1 = {"method": "add", "id": "id1", "type": "buy", "price": 100, "quantity": 10};
    const sample2 = {"method": "remove", "id": "id2", "type": "sell", "price": 200, "quantity": 20};

    const source = new JsonSource([sample1, sample2]);
    expect(source.next()).toStrictEqual(new DataPoint("add", new Order("id1", OrderType.Buy, 100, 10)));
    expect(source.next()).toStrictEqual(new DataPoint("remove", new Order("id2", OrderType.Sell, 200, 20)));
});

it("does not allow nexting when there is no data left", () => {
    const source = new JsonSource([]);
    expect(() => source.next()).toThrow(NoMoreDataException);
});