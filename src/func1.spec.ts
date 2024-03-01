import { sum } from "./func1";

describe("sum", () => {
    it("should return 3 ok", () => {
        expect(sum(1, 2)).toBe(3);
    });
});
