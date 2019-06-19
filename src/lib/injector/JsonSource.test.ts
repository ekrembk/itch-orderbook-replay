import { NoMoreDataException } from "./Exceptions";
import JsonSource from "./JsonSource";
import DataPoint from "./DataPoint";

it("returns next and prev data correctly", () => {
    const sample1: DataPoint = {"method": "add", "order": { "id": "id1", "type": "buy", "price": 100, "quantity": 10} };
    const sample2: DataPoint = {"method": "remove", "order": { "id": "id2", "type": "sell", "price": 200, "quantity": 20} };

    const source = new JsonSource([sample1, sample2]);
    expect(source.next()).toStrictEqual({ "method": "add", "order": { "id": "id1", "type": "buy", "price": 100, "quantity": 10 } });
    expect(source.next()).toStrictEqual({ "method": "remove", "order": { "id": "id2", "type": "sell", "price": 200, "quantity": 20 } });
    expect(source.prev()).toStrictEqual({ "method": "add", "order": { "id": "id1", "type": "buy", "price": 100, "quantity": 10 } });
});

it("does not allow nexting when there is no data left", () => {
    const source = new JsonSource([]);
    expect(() => source.next()).toThrow(NoMoreDataException);
});

it("does not allow preving when there is no data left", () => {
    const source = new JsonSource([]);
    expect(() => source.prev()).toThrow(NoMoreDataException);
});