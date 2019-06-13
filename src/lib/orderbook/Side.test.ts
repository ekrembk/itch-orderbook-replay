import Side from './Side';
import Level from './Level';
import OrderType from './OrderType';

let side: Side;

// Setup
beforeEach(() => side = new Side(OrderType.Buy));

it('creates a new level when necessary', () => {
    const level100 = side.getOrCreateLevel(100);

    expect(level100).toBeInstanceOf(Level);
    expect(side.getOrCreateLevel(100)).toBe(level100);
});

it('returns best bid level correctly', () => {
    expect(side.best()).toBeUndefined();
    side.getOrCreateLevel(100);
    side.getOrCreateLevel(102);
    side.getOrCreateLevel(101);
    expect(side.best()!.price).toBe(102);
});

it('returns best ask level correctly', () => {
    const askSide = new Side(OrderType.Sell);
    expect(askSide.best()).toBeUndefined();
    askSide.getOrCreateLevel(105);
    askSide.getOrCreateLevel(102);
    askSide.getOrCreateLevel(103);
    expect(askSide.best()!.price).toBe(102);
});