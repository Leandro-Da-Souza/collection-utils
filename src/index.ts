function countBy<T extends Record<K, PropertyKey>, K extends keyof T> (
    group: T[],
    property: K
) {
    const result: Record<PropertyKey, number> = {}

    for (const item of group) {
        if (!result[item[property]]) {
            result[item[property]] = 1
        } else {
            result[item[property]]++
        }
    }

    return result;
}

function groupBy<T extends Record<K, PropertyKey>, K extends keyof T>(group: T[], property: K) {
    const result: Record<PropertyKey, T[]> = {};

    for (const item of group) {
        const key = item[property]
        if(!result[key]) result[key] = []
        result[key].push(item)
    }
    return result
}

function indexBy<T extends Record<K, PropertyKey>, K extends keyof T>(
    group: T[],
    property: K)
{
    const result: Record<PropertyKey, T> = {}

    for (const item of group) {
        const key = item[property];
        result[key] = item
    }

    return result;
}

function findBy<T extends Record<K, PropertyKey>, K extends keyof T>(group: T[], property: K, value: T[K]) {
    for (const item of group) {
        if (item[property] === value) {
            return item;
        }
    }
    return undefined;
}

function uniqueBy<T extends Record<K, PropertyKey>, K extends keyof T>(group: T[], property: K){
    const seen: Record<PropertyKey, boolean> = {}
    const result: T[] = [];

    for (const item of group) {
        const key = item[property];
        if (!seen[key]) {
            seen[key] = true;
            result.push(item)
        }
    }
    return result
}

function pluck<
    T extends Record<K, PropertyKey>,
    K extends keyof T
>(
    group: T[], property: K
) {
    const result: Array<T[K]> = [];

    for (const item of group) {
        result.push(item[property])
    }

    return result;
}

function partition<T>(group: T[], predicate: (item: T) => boolean) {
    const result: Record<boolean, T[]> = {
        true: [],
        false: []
    }

    for (const item of group) {
        const key = predicate(item)
        result[key].push(item)
    }

    return result;
}

export const Utils = {
    countBy,
    groupBy,
    indexBy,
    findBy,
    uniqueBy,
    pluck,
    partition
}
