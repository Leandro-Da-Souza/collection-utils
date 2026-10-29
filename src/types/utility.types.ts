/**
 * Replaces every property type with a string.
 */
export type Stringify<T> = {
  [K in keyof T]: string;
};

/**
 * Makes every property readonly and nullable.
 */
export type ReadonlyNullable<T> = {
  readonly [K in keyof T]: T[K] | null;
};

/**
 * Converts all numeric properties to strings.
 */
export type NumbersToStrings<T> = {
  [K in keyof T]: T[K] extends number ? string : T[K];
};

/**
 * Produces a union type containing the keys of all boolean properties.
 */
export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

/**
 * Produces a union of keys whose values are not boolean.
 */
export type NonBooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? never : K;
}[keyof T];

/**
 * Produces a new type containing only the boolean properties.
 */
export type BooleanProperties<T> = {
  [K in keyof T as T[K] extends boolean ? K : never]: T[K];
};

/**
 * Describes two functions connecting A to B, then B to C.
 */
export type Steps<A, B, C> = [(input: A) => B, (input: B) => C];

/**
 * Extracts a function's return type, or never if the pattern doesn't match.
 */
type FunctionOutput<F> = F extends (input: infer _input) => infer output
  ? output
  : never;

/**
 * Extracts a function's input type, or never if the pattern doesn't match.
 */
type FunctionInput<F> = F extends (input: infer input) => infer _output
  ? input
  : never;

/**
 * Checks whether the first function's output fits the second function's input.
 */
export type CanConnect<first, second> =
  FunctionOutput<first> extends FunctionInput<second> ? true : false;

/**
 * Splits a non-empty tuple into its first element and the remaining tuple.
 */
export type Split<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [First, Rest]
  : never;

/**
 * Recursively checks that each function's output fits the next function's input.
 * Returns true when fewer than two functions remain.
 */
export type IsValidChain<PassedInGeneric extends unknown[]> =
  PassedInGeneric extends [infer First, infer Second, ...infer Rest]
    ? CanConnect<First, Second> extends true
      ? IsValidChain<[Second, ...Rest]>
      : false
    : true;

/**
 * Keeps the function tuple if its connections are valid; otherwise returns never.
 */
export type CheckedChain<Functions extends unknown[]> =
  IsValidChain<Functions> extends true ? Functions : never;

/**
 * Extracts the last function's type, or never if the tuple is empty.
 */
export type LastFunctions<Functions extends unknown[]> = Functions extends [
  ...infer _Rest,
  infer Last,
]
  ? Last
  : never;

/**
 * Extracts the last function's return type: the pipeline's final output.
 */
export type ChainOutput<Functions extends unknown[]> = FunctionOutput<
  LastFunctions<Functions>
>;

/**
 * Extracts the first function's input type: the pipeline's starting input.
 */
export type ChainInput<Functions extends unknown[]> = FunctionInput<
  Functions[0]
>;
