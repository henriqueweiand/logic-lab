import { monthlyCharge } from "./monthlyCharge";

describe("monthlyCharge", () => {
    it("Test 1", () => {
        const users = [
            {
                id: 1,
                name: "Employee #1",
                activatedOn: new Date("2022-04-04"),
                deactivatedOn: new Date("2022-04-10"),
                customerId: 1,
            },
            {
                id: 2,
                name: "Employee #2",
                activatedOn: new Date("2021-12-04"),
                deactivatedOn: null,
                customerId: 1,
            },
        ];

        const plan = {
            id: 1,
            customerId: 1,
            monthlyPriceInCents: 2000,
        };

        const finalValue = monthlyCharge("2022-04", plan, users);

        expect(finalValue).toBeCloseTo(74000, -2);
    });

    it("Test 2", () => {
        const users = [
            {
                id: 1,
                name: "Employee #1",
                activatedOn: new Date("2022-04-04"),
                deactivatedOn: new Date("2022-04-10"),
                customerId: 1,
            },
            {
                id: 2,
                name: "Employee #2",
                activatedOn: new Date("2021-12-04"),
                deactivatedOn: null,
                customerId: 1,
            },
        ];

        const plan = {
            id: 1,
            customerId: 1,
            monthlyPriceInCents: 2000,
        };

        const finalValue = monthlyCharge("2022-03", plan, users);

        expect(finalValue).toBeCloseTo(62000, -2);
    });

    it("Test 3", () => {
        const users = [
            {
                id: 1,
                name: "Employee #1",
                activatedOn: new Date("2022-04-04"),
                deactivatedOn: new Date("2022-04-10"),
                customerId: 1,
            },
        ];

        const plan = {
            id: 1,
            customerId: 1,
            monthlyPriceInCents: 2000,
        };

        const finalValue = monthlyCharge("2022-03", plan, users);

        expect(finalValue).toBeCloseTo(0, -2);
    });
});
