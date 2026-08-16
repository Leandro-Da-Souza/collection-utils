function countBy<
    T
> (
    group: readonly T[],
    selector: (item: T) => PropertyKey
) {
    const result: Record<PropertyKey, number> = {}

    for (const item of group) {
        const key = selector(item);

        if (result[key] === undefined) result[key] = 0;
        result[key]++;
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
    const result: { true: T[]; false: T[] } = {
        true: [],
        false: []
    };

    for (const item of group) {
        if(predicate(item)) {
            result.true.push(item)
        } else {
            result.false.push(item)
        }
    }

    return result;
}

function sumBy<
    T extends Record<K, number>,
    K extends keyof T
>(
    group: T[],
    property: K
) {
    let result: number = 0;

    for (const item of group) {
        result += item[property]
    }

    return result;
}

function maxBy<T>(
    group: T[],
    selector: (item: T) => number
) {
    if (group.length == 0) return undefined;

    const [first, ...rest] = group;

    let result = first;
    let max = selector(first);

    for (const item of rest) {
        const current = selector(item)

        if(current > max) {
            max = current
            result = item
        }
    }

    return result
}

function sortBy<T>(group: readonly T[], selector: (item: T) => number) {
    if(!group.length) return [];

    const _mutable: T[] = [...group]

    for (let i = 0; i < _mutable.length; i++) {
        for(let j = i + 1; j < _mutable.length; j++) {
            if (selector(_mutable[i]) > selector(_mutable[j])) {
                const temp = _mutable[i]
                _mutable[i] = _mutable[j]
                _mutable[j] = temp
            }
        }
    }

    return _mutable
}

function chunk<T>(group: readonly T[], size: number) {
    if (group.length === 0) return [];
    if (size <= 0) throw new Error('Chunk size must be greater than 0.')

    const result: Array<T[]>= [];

    for(let i = 0; i < group.length; i += size) {
        result.push(group.slice(i, i + size))
    }

    return result;
}

function zip<T, U>(first: readonly T[], second: readonly U[]) {
    if (first.length === 0 || second.length === 0) return []

    const min = Math.min(first.length, second.length)
    const result: [T,U][] = []

    for(let i = 0; i < min; i++) {
        const subArr:[T, U] = [first[i], second[i]]
        result.push(subArr)
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
    partition,
    sumBy,
    maxBy,
    sortBy,
    chunk,
    zip
}
