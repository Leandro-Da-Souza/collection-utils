"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../index");
const users_1 = require("../data/users");
(0, vitest_1.describe)('countBy', () => {
    (0, vitest_1.it)('should count the users by teamId', () => {
        const countByTeamId = index_1.Utils.countBy(users_1.users, 'teamId');
        const expectedTeamCount = {
            342: 2,
            351: 1,
            394: 1,
            3433: 1
        };
        (0, vitest_1.expect)(countByTeamId).toStrictEqual(expectedTeamCount);
        (0, vitest_1.expect)(index_1.Utils.countBy([], '')).toStrictEqual({});
    });
    (0, vitest_1.it)('should expect Alice to appear twice', () => {
        const countByName = index_1.Utils.countBy(users_1.users, "name");
        const expectedAliceNameCount = {
            "Alice": 2
        };
        (0, vitest_1.expect)(countByName).toEqual(vitest_1.expect.objectContaining(expectedAliceNameCount));
    });
    (0, vitest_1.it)('should give back an empty record when provided with an empty array', () => {
        const emptyRecord = index_1.Utils.countBy([], '');
        (0, vitest_1.expect)(emptyRecord).toStrictEqual({});
    });
});
(0, vitest_1.describe)('groupBy', () => {
    (0, vitest_1.it)('should group the users by teamId', () => {
        const groupByTeamId = index_1.Utils.groupBy(users_1.users, 'teamId');
        const expectedGroups = {
            342: [
                { id: 1, name: "Alice", teamId: 342 },
                { id: 2, name: "Bob", teamId: 342 },
            ],
            351: [
                { id: 3, name: "Cornelius", teamId: 351 },
            ],
            394: [
                { id: 4, name: "Jarvis", teamId: 394 },
            ],
            3433: [
                { id: 5, name: "Alice", teamId: 3433 },
            ]
        };
        (0, vitest_1.expect)(groupByTeamId).toEqual(expectedGroups);
    });
});
(0, vitest_1.describe)('indexBy', () => {
    (0, vitest_1.it)('should index users by Id', () => {
        const indexedUsers = index_1.Utils.indexBy(users_1.users, 'id');
        const expectedUsers = {
            1: { id: 1, name: "Alice", teamId: 342 },
            2: { id: 2, name: "Bob", teamId: 342 },
            3: { id: 3, name: "Cornelius", teamId: 351 },
            4: { id: 4, name: "Jarvis", teamId: 394 },
            5: { id: 5, name: "Alice", teamId: 3433 },
        };
        (0, vitest_1.expect)(indexedUsers).toEqual(expectedUsers);
    });
});
(0, vitest_1.describe)('findBy', () => {
    (0, vitest_1.it)('should find one user by name of Jarvis', () => {
        const foundUser = index_1.Utils.findBy(users_1.users, 'name', 'Jarvis');
        const expectedUser = { id: 4, name: 'Jarvis', teamId: 394 };
        (0, vitest_1.expect)(foundUser).toEqual(expectedUser);
    });
    (0, vitest_1.it)('should find the first user by name of Alice', () => {
        const foundUser = index_1.Utils.findBy(users_1.users, 'name', 'Alice');
        const expectedUser = { id: 1, name: "Alice", teamId: 342 };
        (0, vitest_1.expect)(foundUser).toEqual(expectedUser);
    });
    (0, vitest_1.it)('should return undefined for non existant user', () => {
        const nonUser = index_1.Utils.findBy(users_1.users, 'name', 'Marko');
        (0, vitest_1.expect)(nonUser).toBe(undefined);
    });
});
(0, vitest_1.describe)('uniqueBy', () => {
    (0, vitest_1.it)('Should omit the second Alice', () => {
        const uniqueUsers = index_1.Utils.uniqueBy(users_1.users, 'name');
        const expectedUsers = [
            { id: 1, name: "Alice", teamId: 342 },
            { id: 2, name: "Bob", teamId: 342 },
            { id: 3, name: "Cornelius", teamId: 351 },
            { id: 4, name: "Jarvis", teamId: 394 },
        ];
        (0, vitest_1.expect)(uniqueUsers).toEqual(expectedUsers);
    });
});
(0, vitest_1.describe)('pluck', () => {
    (0, vitest_1.it)('Should return all the names from the users list', () => {
        const userNames = index_1.Utils.pluck(users_1.users, 'name');
        (0, vitest_1.expect)(userNames).toEqual(['Alice', 'Bob', 'Cornelius', 'Jarvis', 'Alice']);
    });
    (0, vitest_1.it)('Should return an empty list when the input is empty', () => {
        const data = [];
        const empty = index_1.Utils.pluck(data, "");
        (0, vitest_1.expect)(empty).toEqual([]);
    });
    (0, vitest_1.it)('Should pluck numeric values', () => {
        (0, vitest_1.expect)(index_1.Utils.pluck(users_1.users, "teamId")).toEqual([
            342,
            342,
            351,
            394,
            3433,
        ]);
    });
});
(0, vitest_1.describe)('partition', () => {
    const users = [
        { id: 1, name: "Alice", teamId: 342, active: true },
        { id: 2, name: "Bob", teamId: 342, active: false },
        { id: 3, name: "Cornelius", teamId: 351, active: false },
        { id: 4, name: "Jarvis", teamId: 394, active: true },
        { id: 5, name: "Alice", teamId: 3433, active: true },
    ];
    (0, vitest_1.it)('Should partition users', () => {
        const activeUsers = index_1.Utils.partition(users, user => user.active);
        (0, vitest_1.expect)(activeUsers).toEqual({
            true: [
                users[0],
                users[3],
                users[4],
            ],
            false: [
                users[1],
                users[2],
            ],
        });
    });
    (0, vitest_1.it)('Should return empty array for empty input', () => {
        const result = index_1.Utils.partition([], () => false);
        (0, vitest_1.expect)(result['true']).toEqual([]);
    });
});
(0, vitest_1.describe)('sumBy', () => {
    const users = [
        { id: 1, salary: 100 },
        { id: 2, salary: 250 },
        { id: 3, salary: 150 },
    ];
    (0, vitest_1.it)('Should sum salaries', () => {
        const sum = index_1.Utils.sumBy(users, 'salary');
        (0, vitest_1.expect)(sum).toBe(500);
    });
    (0, vitest_1.it)('Should return 0 for an empty array', () => {
        const sum = index_1.Utils.sumBy([], 'salary');
        (0, vitest_1.expect)(sum).toBe(0);
    });
    (0, vitest_1.it)('Should work with one item', () => {
        const sum = index_1.Utils.sumBy([users[0]], 'salary');
        (0, vitest_1.expect)(sum).toBe(100);
    });
    (0, vitest_1.it)('Should throw error for non numeric values', () => {
        (0, vitest_1.expect)(() => index_1.Utils.sumBy(users, 'name')).toThrow();
    });
});
(0, vitest_1.describe)('maxBy', () => {
    const users = [
        { id: 1, salary: 100 },
        { id: 2, salary: 250 },
        { id: 3, salary: 150 },
    ];
    (0, vitest_1.it)("returns the item with the highest value", () => {
        (0, vitest_1.expect)(index_1.Utils.maxBy(users, user => user.salary)).toEqual({ id: 2, salary: 250 });
    });
    (0, vitest_1.it)("returns undefined for an empty array", () => {
        const emptyUsers = [];
        (0, vitest_1.expect)(index_1.Utils.maxBy(emptyUsers, user => user.salary)).toBe(undefined);
    });
    (0, vitest_1.it)("returns the only item when one exists", () => {
        (0, vitest_1.expect)(index_1.Utils.maxBy([users[0]], user => user.salary)).toEqual({ id: 1, salary: 100 });
    });
});
