import OrderBook from './OrderBook';
import Order from './Order';
import Side from './Side';

let askSide: Side;
let bidSide: Side;
let book: OrderBook;

// Setup
beforeEach(() => {
    bidSide = new Side("buy");
    askSide = new Side("sell");
    book = new OrderBook(bidSide, askSide)
});

it('handles addition', () => {
    const buyOrder: Order = { "seconds": 0, "id": "id", "type": "buy", "price": 100, "quantity": 1 };
    book.add(buyOrder);
    expect(bidSide.getOrCreateLevel(100).orders.has(buyOrder.id)).toBeTruthy();
});

it('handles replaces', () => {
    const buyOrder: Order = { "seconds": 0, "id": "buy id replace", "type": "buy", "price": 100, "quantity": 1 };
    const updatedBuyOrder: Order = { "seconds": 0, "id": "buy id replace", "type": "buy", "price": 100, "quantity": 10 };

    book.add(buyOrder);
    book.replace(updatedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(updatedBuyOrder.quantity);

    const buyOrderWithDifferentPrice: Order = { "seconds": 0, "id": "buy id replace different price", "type": "buy", "price": 102, "quantity": 1 };
    const updatedBuyOrderWithDifferentPrice: Order = { "seconds": 0, "id": "buy id replace different price", "type": "buy", "price": 103, "quantity": 10 };

    book.add(buyOrderWithDifferentPrice);
    book.replace(updatedBuyOrderWithDifferentPrice);
    expect(bidSide.getOrCreateLevel(102).quantity).toBe(0);
    expect(bidSide.getOrCreateLevel(103).quantity).toBe(10);

    const sellOrder: Order = { "seconds": 0, "id": "sell id replace", "type": "sell", "price": 101, "quantity": 2 };
    const updatedSellOrder: Order = { "seconds": 0, "id": "sell id replace", "type": "sell", "price": 101, "quantity": 11 };

    book.add(sellOrder);
    book.replace(updatedSellOrder);
    expect(askSide.getOrCreateLevel(101).quantity).toBe(updatedSellOrder.quantity);
});

it('handles executions', () => {
    const buyOrder: Order = { "seconds": 0, "id": "buy id", "type": "buy", "price": 100, "quantity": 10 };
    const secondBuyOrder: Order = { "seconds": 0, "id": "buy id 2", "type": "buy", "price": 100, "quantity": 9 };
    const executedBuyOrder: Order = { "seconds": 0, "id": "buy id", "type": "buy", "price": 100, "quantity": 10 };
    const secondExecutedBuyOrder: Order = { "seconds": 0, "id": "buy id 2", "type": "buy", "price": 100, "quantity": 5 };

    book.add(buyOrder);
    book.add(secondBuyOrder);
    book.execute(executedBuyOrder);
    book.execute(secondExecutedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(4);
    expect(bidSide.levels.length).toBe(1);
});

it('handles delete', () => {
    const buyOrder: Order = { "seconds": 0, "id": "buy id", "type": "buy", "price": 100, "quantity": 10 };
    const SecondBuyOrder: Order = { "seconds": 0, "id": "buy id 2", "type": "buy", "price": 100, "quantity": 1 };
    const deleteOrder: Order = { "seconds": 0, "id": "buy id", "type": "buy", "price": 0, "quantity": 0 };

    book.add(buyOrder);
    book.add(SecondBuyOrder);
    book.delete(deleteOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(1);

    const sellOrder: Order = { "seconds": 0, "id": "sell id", "type": "sell", "price": 101, "quantity": 11 };
    const SecondSellOrder: Order = { "seconds": 0, "id": "sell id 2", "type": "sell", "price": 101, "quantity": 2 };
    const secondDeleteOrder: Order = { "seconds": 0, "id": "sell id", "type": "sell", "price": 0, "quantity": 0 };

    book.add(sellOrder);
    book.add(SecondSellOrder);
    book.delete(secondDeleteOrder);
    expect(askSide.getOrCreateLevel(101).quantity).toBe(2);
});