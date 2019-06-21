import Level from './Level';
import { OrderExistsException, OrderDoesNotExistException } from './Exceptions';

let level: Level;

// Setup
beforeEach(() => level = new Level(100));

it('does not allow multiple orders with the same id', () => {
    level.add({ "id": "id", "type": "buy", "price": 100, "quantity": 1 });
    expect(() => level.add({ "id": "id", "type": "buy", "price": 100, "quantity": 1 })).toThrowError(OrderExistsException);
});

it('handles quantity normalization', () => {
    level.add({ "id": "id", "type": "buy", "price": 100, "quantity": 1 });
    level.replace({ "id": "id", "type": "buy", "price": 100, "quantity": 2 });
    level.add({ "id": "id2", "type": "buy", "price": 100, "quantity": 3 });
    level.add({ "id": "id3", "type": "buy", "price": 100, "quantity": 4 });
    level.delete({ "id": "id3", "type": "buy", "price": 0, "quantity": 0 }); 
    expect(level.quantity).toBe(5);
});

it('handles orders map correctly', () => {
    level.add({ "id": "id", "type": "buy", "price": 100, "quantity": 1 });
    level.replace({ "id": "id", "type": "buy", "price": 100, "quantity": 2 });
    level.add({ "id": "id2", "type": "buy", "price": 100, "quantity": 4 });
    level.delete({ "id": "id2", "type": "buy", "price": 0, "quantity": 0 });
    expect(level.orders.size).toBe(1);
});

it('does not allow deleting non-existing order', () => {
    expect(() => level.delete({ "id": "id", "type": "buy", "price": 0, "quantity": 0 })).toThrow(OrderDoesNotExistException);
});

it('does not allow replacing non-existing order', () => {
    expect(() => level.replace({ "id": "id", "type": "buy", "price": 100, "quantity": 2 })).toThrow(OrderDoesNotExistException);
});

it('does not allow executing non-existing order', () => {
    expect(() => level.execute({ "id": "id", "type": "buy", "price": 100, "quantity": 2 })).toThrow(OrderDoesNotExistException);
});