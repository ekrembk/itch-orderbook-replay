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
    const buyOrder: Order = { "id": "id", "type": "buy", "price": 100, "quantity": 1 };
    book.add(buyOrder);
    expect(bidSide.getOrCreateLevel(100).orders.has(buyOrder.id)).toBeTruthy();
});

it('handles replaces', () => {
    const buyOrder: Order = { "id": "buy id replace", "type": "buy", "price": 100, "quantity": 1 };
    const updatedBuyOrder: Order = { "id": "buy id replace", "type": "buy", "price": 100, "quantity": 10 };

    book.add(buyOrder);
    book.replace(updatedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(updatedBuyOrder.quantity);

    const buyOrderWithDifferentPrice: Order = { "id": "buy id replace different price", "type": "buy", "price": 102, "quantity": 1 };
    const updatedBuyOrderWithDifferentPrice: Order = { "id": "buy id replace different price", "type": "buy", "price": 103, "quantity": 10 };

    book.add(buyOrderWithDifferentPrice);
    book.replace(updatedBuyOrderWithDifferentPrice);
    expect(bidSide.getOrCreateLevel(102).quantity).toBe(0);
    expect(bidSide.getOrCreateLevel(103).quantity).toBe(10);

    const sellOrder: Order = { "id": "sell id replace", "type": "sell", "price": 101, "quantity": 2 };
    const updatedSellOrder: Order = { "id": "sell id replace", "type": "sell", "price": 101, "quantity": 11 };

    book.add(sellOrder);
    book.replace(updatedSellOrder);
    expect(askSide.getOrCreateLevel(101).quantity).toBe(updatedSellOrder.quantity);
});

it('handles executions', () => {
    const buyOrder: Order = { "id": "buy id", "type": "buy", "price": 100, "quantity": 10 };
    const executedBuyOrder: Order = { "id": "buy id", "type": "buy", "price": 100, "quantity": 1 };

    book.add(buyOrder);
    book.execute(executedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(9);
});

it('handles delete', () => {
    const buyOrder: Order = { "id": "buy id", "type": "buy", "price": 100, "quantity": 10 };
    const SecondBuyOrder: Order = { "id": "buy id 2", "type": "buy", "price": 100, "quantity": 1 };
    const deleteOrder: Order = { "id": "buy id", "type": "buy", "price": 0, "quantity": 0 };

    book.add(buyOrder);
    book.add(SecondBuyOrder);
    book.delete(deleteOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(1);

    const sellOrder: Order = { "id": "sell id", "type": "sell", "price": 101, "quantity": 11 };
    const SecondSellOrder: Order = { "id": "sell id 2", "type": "sell", "price": 101, "quantity": 2 };
    const secondDeleteOrder: Order = { "id": "sell id", "type": "sell", "price": 0, "quantity": 0 };

    book.add(sellOrder);
    book.add(SecondSellOrder);
    book.delete(secondDeleteOrder);
    expect(askSide.getOrCreateLevel(101).quantity).toBe(2);
});