import Level from './Level';
import { OrderExistsException, OrderDoesNotExistException } from './Exceptions';

let level: Level;

// Setup
beforeEach(() => level = new Level(100));

it('does not allow multiple orders with the same id', () => {
    level.add({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 1 });
    expect(() => level.add({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 1 })).toThrowError(OrderExistsException);
});

it('handles quantity normalization', () => {
    level.add({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 1 });
    level.add({ "seconds": 0, "id": "id2", "type": "buy", "price": 100, "quantity": 3 });
    level.add({ "seconds": 0, "id": "id3", "type": "buy", "price": 100, "quantity": 4 });
    level.delete({ "seconds": 0, "id": "id3", "type": "buy", "price": 0, "quantity": 0 }); 
    expect(level.quantity).toBe(4);
});

it('handles orders map correctly', () => {
    level.add({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 1 });
    level.add({ "seconds": 0, "id": "id2", "type": "buy", "price": 100, "quantity": 4 });
    level.delete({ "seconds": 0, "id": "id2", "type": "buy", "price": 0, "quantity": 0 });
    expect(level.orders.size).toBe(1);
});

it('does not allow deleting non-existing order', () => {
    expect(() => level.delete({ "seconds": 0, "id": "id", "type": "buy", "price": 0, "quantity": 0 })).toThrow(OrderDoesNotExistException);
});

it('does not allow executing non-existing order', () => {
    expect(() => level.execute({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 2 })).toThrow(OrderDoesNotExistException);
});

it('removes filled order after execute', () => {
    level.add({ "seconds": 0, "id": "id2", "type": "buy", "price": 100, "quantity": 8 });
    level.add({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 4 });
    level.execute({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 1 })
    level.execute({ "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 3 })
    expect(level.quantity).toBe(8);
    expect(level.orders.size).toBe(1);
});