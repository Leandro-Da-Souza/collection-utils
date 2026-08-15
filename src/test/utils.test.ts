import { describe, it, expect } from "vitest";
import { Utils } from '../index'
import { users } from '../data/users'
import {User} from "../types/user.type";

describe('countBy', () => {
    it('should count the users by teamId', () => {
        const countByTeamId = Utils.countBy(users, 'teamId')
        const expectedTeamCount = {
            342: 2,
            351: 1,
            394: 1,
            3433: 1
        }
        expect(countByTeamId).toStrictEqual(expectedTeamCount)
        expect(Utils.countBy([], '')).toStrictEqual({})
    })
    it('should expect Alice to appear twice', () => {
        const countByName = Utils.countBy(users, "name");
        const expectedAliceNameCount = {
            "Alice": 2
        }
        expect(countByName).toEqual(expect.objectContaining(expectedAliceNameCount))
    })
    it('should give back an empty record when provided with an empty array', () => {
        const emptyRecord = Utils.countBy([], '')
        expect(emptyRecord).toStrictEqual({})
    })
})

describe('groupBy', () => {
    it('should group the users by teamId', () => {
        const groupByTeamId = Utils.groupBy(users, 'teamId')
        const expectedGroups = {
            342: [
                {id: 1, name: "Alice", teamId: 342},
                {id: 2, name: "Bob", teamId: 342},
            ],
            351: [
                { id: 3, name: "Cornelius", teamId: 351},
            ],
            394: [
                { id: 4, name: "Jarvis", teamId: 394},
            ],
            3433: [
                { id: 5, name: "Alice", teamId: 3433},
            ]
        }

        expect(groupByTeamId).toEqual(expectedGroups);
    })
})

describe('indexBy', () => {
    it('should index users by Id', () => {
        const indexedUsers = Utils.indexBy(users, 'id')
        const expectedUsers = {
            1: { id: 1, name: "Alice", teamId: 342 },
            2: { id: 2, name: "Bob", teamId: 342 },
            3: { id: 3, name: "Cornelius", teamId: 351 },
            4: { id: 4, name: "Jarvis", teamId: 394 },
            5: { id: 5, name: "Alice", teamId: 3433 },
        }
        expect(indexedUsers).toEqual(expectedUsers);
    })
})

describe('findBy', () => {
    it('should find one user by name of Jarvis', () => {
        const foundUser = Utils.findBy(users, 'name', 'Jarvis')
        const expectedUser = { id: 4, name: 'Jarvis', teamId: 394 }

        expect(foundUser).toEqual(expectedUser)
    })

    it('should find the first user by name of Alice', () => {
        const foundUser = Utils.findBy(users, 'name', 'Alice');
        const expectedUser = { id: 1, name: "Alice", teamId: 342 }

        expect(foundUser).toEqual(expectedUser)
    })

    it('should return undefined for non existant user', () => {
        const nonUser = Utils.findBy(users, 'name', 'Marko')

        expect(nonUser).toBe(undefined)
    })
})

describe('uniqueBy', () => {
    it('Should omit the second Alice', () => {
        const uniqueUsers = Utils.uniqueBy(users, 'name')
        const expectedUsers = [
            { id: 1, name: "Alice", teamId: 342 },
            { id: 2, name: "Bob", teamId: 342 },
            { id: 3, name: "Cornelius", teamId: 351},
            { id: 4, name: "Jarvis", teamId: 394},
        ]
        expect(uniqueUsers).toEqual(expectedUsers);
    })
})

describe('pluck', () => {
    it('Should return all the names from the users list', () => {
        const userNames = Utils.pluck(users, 'name')

        expect(userNames).toEqual(['Alice', 'Bob', 'Cornelius', 'Jarvis', 'Alice'])
    })

    it('Should return an empty list when the input is empty', () => {
        const data: any[] = []
        const empty = Utils.pluck(data, "")

        expect(empty).toEqual([])
    })

    it('Should pluck numeric values', () => {
        expect(Utils.pluck(users, "teamId")).toEqual([
            342,
            342,
            351,
            394,
            3433,
        ]);
    })
})

describe('partition', () => {
    const users = [
        { id: 1, name: "Alice", teamId: 342, active: true },
        { id: 2, name: "Bob", teamId: 342, active: false },
        { id: 3, name: "Cornelius", teamId: 351, active: false },
        { id: 4, name: "Jarvis", teamId: 394, active: true },
        { id: 5, name: "Alice", teamId: 3433, active: true },
    ]

    it('Should partition users', () => {
        const activeUsers = Utils.partition(users, user => user.active)
        expect(activeUsers).toEqual({
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
    })

    it('Should return empty array for empty input', () => {
        const result = Utils.partition([], () => false)
        expect(result['true']).toEqual([])
    })
})

describe('sumBy', () => {
    const users = [
        { id: 1, salary: 100 },
        { id: 2, salary: 250 },
        { id: 3, salary: 150 },
    ];

    it('Should sum salaries', () => {
        const sum = Utils.sumBy(users, 'salary')
        expect(sum).toBe(500)
    })

    it('Should return 0 for an empty array', () => {
        const sum = Utils.sumBy([], 'salary')
        expect(sum).toBe(0)
    })

    it('Should work with one item', () => {
        const sum = Utils.sumBy([users[0]], 'salary')
        expect(sum).toBe(100)
    })
})

describe('maxBy', () => {
    const users = [
        { id: 1, salary: 100 },
        { id: 2, salary: 250 },
        { id: 3, salary: 150 },
    ]

    it("returns the item with the highest value", () => {
        expect(Utils.maxBy(users, user => user.salary)).toEqual({ id: 2, salary: 250 })
    });
    it("returns undefined for an empty array", () => {
        const emptyUsers: typeof users = [];

        expect(Utils.maxBy(emptyUsers, user => user.salary)).toBe(undefined);
    });
    it("returns the only item when one exists", () => {
        expect(Utils.maxBy([users[0]], user => user.salary)).toEqual({id: 1, salary: 100})
    });
})