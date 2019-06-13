import Level from './Level';
import Order from './Order';
import OrderType from './OrderType';
import { OrderExistsException, OrderDoesNotExistException } from './Exceptions';

let level: Level;

// Setup
beforeEach(() => level = new Level(100));

it('does not allow multiple orders with the same id', () => {
    level.add(new Order("id", OrderType.Buy, 100, 1));
    expect(() => level.add(new Order("id", OrderType.Buy, 100, 1))).toThrowError(OrderExistsException);
});

it('handles quantity normalization', () => {
    level.add(new Order("id", OrderType.Buy, 100, 1));
    level.replace(new Order("id", OrderType.Buy, 100, 2));
    level.add(new Order("id2", OrderType.Buy, 100, 3));
    level.add(new Order("id3", OrderType.Buy, 100, 4));
    level.delete(new Order("id3", OrderType.Buy));
    expect(level.quantity).toBe(5);
});

it('handles orders map correctly', () => {
    level.add(new Order("id", OrderType.Buy, 100, 1));
    level.replace(new Order("id", OrderType.Buy, 100, 2));
    level.add(new Order("id2", OrderType.Buy, 100, 4));
    level.delete(new Order("id2", OrderType.Buy));
    expect(level.orders.size).toBe(1);
});

it('does not allow deleting non-existing order', () => {
    expect(() => level.delete(new Order("id", OrderType.Buy))).toThrow(OrderDoesNotExistException);
});

it('does not allow replacing non-existing order', () => {
    expect(() => level.replace(new Order("id", OrderType.Buy, 100, 2))).toThrow(OrderDoesNotExistException);
});