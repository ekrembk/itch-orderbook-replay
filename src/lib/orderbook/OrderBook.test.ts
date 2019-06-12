import OrderBook from './OrderBook';
import Order from './Order';
import OrderType from './OrderType';
import { OrderExistsException } from './Exceptions';

let book: OrderBook = new OrderBook();

// Setup
beforeEach(() => book = new OrderBook());

it('does not allow multiple orders with the same id', () => {
    book.add(new Order("id", OrderType.Buy, 100, 1));
    expect(() => book.add(new Order("id", OrderType.Buy, 100, 1))).toThrowError(OrderExistsException);
});

it('shows correct best price levels', () => {
    book.add(new Order("id", OrderType.Buy, 100, 1));
    book.add(new Order("id2", OrderType.Buy, 101, 2));
    book.add(new Order("id3", OrderType.Sell, 102, 3));
    book.add(new Order("id4", OrderType.Sell, 103, 4));

    expect(book.askSide.best()!.price).toBe(101);
    expect(book.bidSide.best()!.price).toBe(103);
});