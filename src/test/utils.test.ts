import { describe, it, expect } from "vitest";
import { Utils } from '../index'
import { users } from '../data/users'

describe('Utils', () => {
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