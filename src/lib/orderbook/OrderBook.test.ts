import OrderBook from './OrderBook';
import Order from './Order';
import OrderType from './OrderType';
import Side from './Side';

let askSide: Side;
let bidSide: Side;
let book: OrderBook;

// Setup
beforeEach(() => {
    bidSide = new Side(OrderType.Buy);
    askSide = new Side(OrderType.Sell);
    book = new OrderBook(bidSide, askSide)
});

it('handles addition', () => {
    const buyOrder = new Order("id", OrderType.Buy, 100, 1);
    book.add(buyOrder);
    expect(bidSide.getOrCreateLevel(100).orders.has(buyOrder.id)).toBeTruthy();
});

it('handles replaces', () => {
    const buyOrder = new Order("buy id", OrderType.Buy, 100, 1);
    const updatedBuyOrder = new Order("buy id", OrderType.Buy, 100, 10);

    book.add(buyOrder);
    book.replace(updatedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(updatedBuyOrder.quantity);

    const sellOrder = new Order("sell id", OrderType.Sell, 101, 2);
    const updatedSellOrder = new Order("sell id", OrderType.Sell, 101, 11);

    book.add(sellOrder);
    book.replace(updatedSellOrder);
    expect(askSide.getOrCreateLevel(101).quantity).toBe(updatedSellOrder.quantity);
});

it('handles executions', () => {
    const buyOrder = new Order("buy id", OrderType.Buy, 100, 10);
    const executedBuyOrder = new Order("buy id", OrderType.Buy, 100, 1);

    book.add(buyOrder);
    book.execute(executedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(9);
});

it('handles replaces with price updates', () => {
    const buyOrder = new Order("buy id", OrderType.Buy, 100, 1);
    const updatedBuyOrder = new Order("buy id", OrderType.Buy, 101, 10);

    book.add(buyOrder);
    book.replace(updatedBuyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(0);
    expect(bidSide.getOrCreateLevel(101).quantity).toBe(10);
});

it('handles deletes', () => {
    const buyOrder = new Order("buy id", OrderType.Buy, 100, 10);
    const SecondBuyOrder = new Order("buy id 2", OrderType.Buy, 100, 1);

    book.add(buyOrder);
    book.add(SecondBuyOrder);
    book.delete(buyOrder);
    expect(bidSide.getOrCreateLevel(100).quantity).toBe(1);

    const sellOrder = new Order("sell id", OrderType.Sell, 101, 11);
    const SecondSellOrder = new Order("sell id 2", OrderType.Sell, 101, 2);

    book.add(sellOrder);
    book.add(SecondSellOrder);
    book.delete(sellOrder);
    expect(askSide.getOrCreateLevel(101).quantity).toBe(2);
});