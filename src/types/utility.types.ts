/**
 * Replaces every property type with a string.
 */
export type Stringify<T> = {
    [K in keyof T]: string
}

/**
 * Makes every property readonly and nullable.
 */
export type ReadonlyNullable<T> = {
    readonly [K in keyof T]: T[K] | null
}

/**
 * Converts all numeric properties to strings.
 */
export type NumbersToStrings<T> = {
    [K in keyof T]: T[K] extends number ? string : T[K]
}

/**
 * Produces a union type containing the keys of all boolean properties.
 */
export type BooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? K : never
}[keyof T]

/**
 * Produces a union of keys whose values are not boolean.
 */
export type NonBooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? never : K
}[keyof T]


/**
 * Produces a new type containing only the boolean properties.
 */
export type BooleanProperties<T> = {
    [K in keyof T as T[K] extends boolean ? K : never]: T[K]
}
