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
            monthlyPriceInCents: 359,
        };

        const finalValue = monthlyCharge("2022-04", plan, users);

        expect(finalValue).toBe(13283);
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
            monthlyPriceInCents: 359,
        };

        const finalValue = monthlyCharge("2022-03", plan, users);

        expect(finalValue).toBe(11129);
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
            monthlyPriceInCents: 359,
        };

        const finalValue = monthlyCharge("2022-03", plan, users);

        expect(finalValue).toBe(0);
    });

    it("Test 4", () => {
        const users = [
            {
                id: 1,
                name: "Employee #1",
                activatedOn: new Date("2022-03-15"),
                deactivatedOn: null,
                customerId: 1,
            },
        ];

        const plan = {
            id: 1,
            customerId: 1,
            monthlyPriceInCents: 359,
        };

        const finalValue = monthlyCharge("2022-03", plan, users);

        expect(finalValue).toBe(6462);
    });
});
