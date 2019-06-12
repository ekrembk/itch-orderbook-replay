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

it('returns best levels correctly', () => {
    expect(side.best()).toBeUndefined();
    side.getOrCreateLevel(100);
    side.getOrCreateLevel(101);
    expect(side.best()!.price).toBe(101);
});

it('reverse sort works correctly', () => {
    expect(side.reverseCompare(1, 2)).toBe(1);
    expect(side.reverseCompare(2, 1)).toBe(-1);
    expect(side.reverseCompare(1, 1)).toBe(0);
});