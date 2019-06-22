import { formatUnix } from "./time";

it('converts seconds properly', () => {
    expect(formatUnix(22)).toBe("9:55:22");
});