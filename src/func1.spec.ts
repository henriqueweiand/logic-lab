import { sum } from "./func1";

describe("func1", () => {
    it("should return 3 ok", () => {
        expect(sum(1, 2)).toBe(3);
    });
});
