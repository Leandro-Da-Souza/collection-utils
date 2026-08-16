/** Aggregation */

/**
 * Counts the occurrences of each key returned by the selector
 * @param group
 * @param selector
 */
export function countBy<T> (
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

/**
 * Groups items by the key returned from the selector.
 * @param group
 * @param selector
 */
export function groupBy<T>(
    group: readonly T[],
    selector: (item: T) => PropertyKey
) {
    const result: Record<PropertyKey, T[]> = {};

    for (const item of group) {
        const key = selector(item)
        if(!result[key]) result[key] = []
        result[key].push(item)
    }
    return result
}

/**
 * Creates a lookup object keyed by the selector.
 * @param group
 * @param selector
 */
export function indexBy<T>(
    group: readonly T[],
    selector: (item: T) => PropertyKey
) {
    const result: Record<PropertyKey, T> = {}

    for (const item of group) {
        const key = selector(item);
        result[key] = item
    }

    return result;
}

/**
 * Splits the collection into true and false groups based on the predicate.
 * @param group
 * @param predicate
 */
export function partition<T>(
    group: readonly T[],
    predicate: (item: T) => boolean
) {
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

/** Selection */

/**
 * Returns the first item whose selected value equals the given value.
 * @param group
 * @param selector
 * @param value
 */
export function findBy<T, U>(
    group: readonly T[],
    selector: (item: T) => U,
    value: U
) {
    for (const item of group) {
        if (selector(item) === value) {
            return item;
        }
    }
    return undefined;
}

/**
 * Returns a new collection containing only the first occurrence of each unique key.
 * @param group
 * @param selector
 */
export function uniqueBy<T>(
    group: readonly T[],
    selector: (item: T) => PropertyKey
) {
    const seen: Record<PropertyKey, true> = {}
    const result: T[] = [];

    for (const item of group) {
        const key = selector(item);
        if (!seen[key]) {
            seen[key] = true;
            result.push(item)
        }
    }
    return result
}

/**
 * Creates a new array containing the values returned by the selector.
 * @param group
 * @param selector
 */
export function pluck<T, U>(
    group: readonly T[],
    selector: (item: T) => U
) {
    const result: U[] = [];

    for (const item of group) {
        result.push(selector(item))
    }

    return result;
}

/** Ordering */

/**
 * Returns the sum of the numeric values produced by the selector.
 * @param group
 * @param selector
 */
export function sumBy<T>(
    group: readonly T[],
    selector: (item: T) => number
) {
    let result: number = 0;

    for (const item of group) {
        result += selector(item)
    }

    return result;
}

/**
 * Returns the item with the highest value produced by the selector.
 * @param group
 * @param selector
 */
export function maxBy<T>(
    group: readonly T[],
    selector: (item: T) => number
) {
    if (group.length === 0) return undefined;

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

/**
 * Returns a new array sorted in ascending order by the selector.
 * @param group
 * @param selector
 */
export function sortBy<T>(
    group: readonly T[],
    selector: (item: T) => number
) {
    if(!group.length) return [];

    const sorted: T[] = [...group]

    for (let i = 0; i < sorted.length; i++) {
        for(let j = i + 1; j < sorted.length; j++) {
            if (selector(sorted[i]) > selector(sorted[j])) {
                const temp = sorted[i]
                sorted[i] = sorted[j]
                sorted[j] = temp
            }
        }
    }

    return sorted
}

/** Collection */

/**
 * Splits a collection into groups of the given size.
 * @param group
 * @param size
 */
export function chunk<T>(
    group: readonly T[],
    size: number
) {
    if (group.length === 0) return [];
    if (size <= 0) throw new Error('Chunk size must be greater than 0.')

    const result: Array<T[]>= [];

    for(let i = 0; i < group.length; i += size) {
        result.push(group.slice(i, i + size))
    }

    return result;
}

/**
 * Combines two collections into tuples of corresponding items.
 * @param first
 * @param second
 */
export function zip<T, U>(
    first: readonly T[],
    second: readonly U[]
) {
    if (first.length === 0 || second.length === 0) return []

    const min = Math.min(first.length, second.length)
    const result: [T,U][] = []

    for(let i = 0; i < min; i++) {
        result.push([first[i], second[i]])
    }

    return result;
}

