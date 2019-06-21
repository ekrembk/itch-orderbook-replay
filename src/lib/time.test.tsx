import { formatUnix } from "./time";

it('converts seconds properly', () => {
    expect(formatUnix("1561146810")).toBe("22:53:30");
});