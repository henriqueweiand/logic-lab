/**
 * Computes the monthly charge for a given subscription.
 *
 * @returns {number} The total monthly bill for the customer in cents, rounded
 * to the nearest cent. For example, a bill of $20.00 should return 2000.
 * If there are no active users or the subscription is null, returns 0.
 *
 * @param {string} month - Always present
 *   Has the following structure:
 *   "2022-04"  // April 2022 in YYYY-MM format
 *
 * @param {object} subscription - May be null
 *   If present, has the following structure:
 *   {
 *     'id': 763,
 *     'customerId': 328,
 *     'monthlyPriceInCents': 359  // price per active user per month
 *   }
 *
 * @param {array} users - May be empty, but not null
 *   Has the following structure:
 *   [
 *     {
 *       'id': 1,
 *       'name': "Employee #1",
 *       'customerId': 1,
 *
 *       // when this user started
 *       'activatedOn': new Date("2021-11-04"),
 *
 *       // last day to bill for user
 *       // should bill up to and including this date
 *       // since user had some access on this date
 *       'deactivatedOn': new Date("2022-04-10")
 *     },
 *     {
 *       'id': 2,
 *       'name': "Employee #2",
 *       'customerId': 1,
 *
 *       // when this user started
 *       'activatedOn': new Date("2021-12-04"),
 *
 *       // hasn't been deactivated yet
 *       'deactivatedOn': null
 *     },
 *   ]
 */
export function monthlyCharge(month, subscription, users) {
    // Check for edge cases - no users or no subscription
    if (!users.length || !subscription) return 0;

    const parsedMonth = parseDate(month);
    const monthStart = firstDayOfMonth(parsedMonth);
    const monthEnd = lastDayOfMonth(parsedMonth);

    let totalCharge = 0;
    users.forEach((user) => {
        // Consider only active users within the month
        if (isActiveUserInMonth(user, monthStart, monthEnd)) {
            const activeDays = calculateActiveDays(user, monthStart, monthEnd);
            totalCharge += activeDays * subscription.monthlyPriceInCents;
        }
    });

    return Math.round(totalCharge); // Round to nearest cent
}

/*******************
 * Helper functions *
 *******************/

// Helper function to check if user was active in the month
function isActiveUserInMonth(user, monthStart: Date, monthEnd: Date) {
    const activatedBeforeEnd = user.activatedOn <= monthEnd;
    const deactivatedAfterStart =
        !user.deactivatedOn || user.deactivatedOn >= monthStart;
    return activatedBeforeEnd && deactivatedAfterStart;
}

// Helper function to calculate active days for a user in the month
function calculateActiveDays(user, monthStart: Date, monthEnd: Date) {
    const activationDate =
        user.activatedOn > monthStart ? user.activatedOn : monthStart;
    const deactivationDate = user.deactivatedOn
        ? user.deactivatedOn < monthEnd
            ? user.deactivatedOn
            : monthEnd
        : monthEnd;

    let activeDays = 0;
    let currentDate = activationDate; // Declare as Date

    while (currentDate <= deactivationDate) {
        activeDays++;
        currentDate = nextDay(currentDate);
    }

    return activeDays;
}

export function parseDate(input) {
    if (!input) throw new Error("Invalid data");

    if (input instanceof Date) {
        return input;
    } else {
        const parts = input.split("-");
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        return new Date(year, month);
    }
}

export function differenceInDays(date1, date2) {
    const differenceMs = date2.getTime() - date1.getTime();
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
}

/**
 * Takes a Date instance and returns a Date which is the first day
 * of that month. For example:
 *
 * firstDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 1)
 *
 * Input type: Date
 * Output type: Date
 **/
function firstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Takes a Date object and returns a Date which is the last day of that month.
 *
 * lastDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 31)
 *
 * Input type: Date
 * Output type: Date
 **/
function lastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Takes a Date object and returns a Date which is the next day.
 * For example:
 *
 * nextDay(new Date(2022, 3, 17))  // => new Date(2022, 3, 18)
 * nextDay(new Date(2022, 3, 31))  // => new Date(2022, 4, 1)
 *
 * Input type: Date
 * Output type: Date
 **/
function nextDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}
