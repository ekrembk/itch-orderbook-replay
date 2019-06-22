import { NoMoreDataException } from "./Exceptions";
import JsonSource from "./JsonSource";
import DataPoint from "./DataPoint";

it("returns next data correctly", () => {
    const sample1: DataPoint = {"method": "add", "order": { "seconds": 0, "id": "id1", "type": "buy", "price": 100, "quantity": 10} };
    const sample2: DataPoint = {"method": "remove", "order": { "seconds": 0, "id": "id2", "type": "sell", "price": 200, "quantity": 20} };

    const source = new JsonSource([sample1, sample2]);
    expect(source.next()).toStrictEqual({ "method": "add", "order": { "seconds": 0, "id": "id1", "type": "buy", "price": 100, "quantity": 10 } });
    expect(source.next()).toStrictEqual({ "method": "remove", "order": { "seconds": 0, "id": "id2", "type": "sell", "price": 200, "quantity": 20 } });
});

it("reverts correctly", () => {
    const sample1: DataPoint = {"method": "add", "order": { "seconds": 0, "id": "id1", "type": "buy", "price": 100, "quantity": 10} };

    const source = new JsonSource([sample1]);
    source.next();
    source.revert();
    expect(source.next()).toStrictEqual({ "method": "add", "order": { "seconds": 0, "id": "id1", "type": "buy", "price": 100, "quantity": 10 } });
});

it("does not allow nexting when there is no data left", () => {
    const source = new JsonSource([]);
    expect(() => source.next()).toThrow(NoMoreDataException);
});