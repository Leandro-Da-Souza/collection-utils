import type {
  ChainInput,
  ChainOutput,
  CheckedChain,
  IsValidChain,
  LastFunctions,
  Steps,
} from "./types/utility.types";

/**
 * Curried utilities for building reusable, composable functions
 * and practising functional programming with TypeScript.
 */

/**
 * Creates a reusable function that reads the gives property from an object.
 * Can be used directly or passed to array methods such as `.map()`
 *
 * @param key - The property to read from an object
 * @returns A function that accepts an object containing the property and
 * returns it's value, preserving its Typescript type.
 *
 * @example
 * const getName = prop("name")
 *
 * getName([{ name: "Billy", age: 22 }]); // "Billy"
 *
 * [{ name: "Billy" }, { name: "Veronica" }].map(getName); // ["Billy", "Veronica"]
 */
export function prop<K extends PropertyKey>(key: K) {
  return function <T extends Record<K, unknown>>(object: T): T[K] {
    return object[key];
  };
}

/**
 * Create a reusable function that compares an object's property to an expected value.
 *
 * @param key the property we want to compare the expected value to
 * @returns a function that accepts the expected value and returns
 * another function that accepts an object and checks whether
 * its selected property equals the expected value.
 *
 * @example
 * const isGrub = propEq("name")("Grub");
 *
 * isGrub({ name: "Grub"}); // true
 * isGrub({ name: "Steve"}); // false
 */
export function propEq<K extends PropertyKey>(key: K) {
  return function <V>(expected: V) {
    return function <T extends Record<K, V>>(object: T): boolean {
      return object[key] === expected;
    };
  };
}

/**
 * Takes a predicate and returns a function that reverses the result of the predicate.
 *
 * @param predicate a predicate function that takes an item and returns a boolean
 * @returns a function that accepts an item and returns the opposite boolean result of the predicate.
 *
 * @example
 * const users = [
 *    {name: "Steve", active: true},
 *    {name: "Grub", active: false},
 * ];
 *
 * const isActive = propEq("active")(true);
 *
 * const activeUsers = users.filter(isActive); // [{ name: "Steve", active: true }]
 * const inactiveUsers = users.filter(not(isActive)); // [{ name: "Grub", active: false }]
 */
export function not<T>(predicate: (item: T) => boolean) {
  return function (item: T) {
    const result = predicate(item);

    return !result;
  };
}

/*
 * Function overloads describe different allowed calls to the same function.
 * Each signature ends with a semicolon and has no body.
 * The single implementation below handles all those calls.
 * Callers are checked against the overloads, not the implementation signature.
 */

/**
 * Passes a starting value through one function.
 *
 * @param value - The starting value.
 * @param first - Transforms the starting value into the result.
 * @returns The result of the first function.
 *
 * @example
 * pipe(3, n => n * 2); // 6
 */
export function pipe<A, B>(value: A, first: (input: A) => B): B;

/**
 * Passes a starting value through two functions, from left to right.
 * The second function receives the first function's result.
 *
 * @param value - The starting value.
 * @param first - Transforms the starting value.
 * @param second - Transforms the first function's result.
 * @returns The result of the second function.
 *
 * @example
 * pipe(
 *   3,
 *   n => n * 2,
 *   n => `${n} gold`,
 * ); // "6 gold"
 */
export function pipe<A, B, C>(
  value: A,
  first: (input: A) => B,
  second: (input: B) => C,
): C;

/**
 * Passes a starting value through three functions, from left to right.
 * Each function receives the previous function's result.
 * Types may change between steps, provided their inputs and outputs connect.
 *
 * @param value - The starting value.
 * @param first - Transforms the starting value.
 * @param second - Transforms the first function's result.
 * @param third - Transforms the second function's result.
 * @returns The result of the third function.
 *
 * @example
 * pipe(
 *   5,
 *   n => n * 2,
 *   n => String(n),
 *   text => text.length,
 * ); // 2
 */
export function pipe<A, B, C, D>(
  value: A,
  first: (input: A) => B,
  second: (input: B) => C,
  third: (input: C) => D,
): D;

/**
 * Shared implementation for the overloads above.
 * Optional parameters allow this body to handle one, two, or three steps.
 * Each early return stops when there is no further step to run.
 */
export function pipe<A, B, C, D>(
  value: A,
  first: (input: A) => B,
  second?: (input: B) => C,
  third?: (input: C) => D,
): B | C | D {
  const result = first(value);

  if (typeof second === "undefined") return result;

  const secondResult = second(result);

  if (typeof third === "undefined") return secondResult;

  return third(secondResult);
}

/**
 * Passes a starting value through any number of functions, from left to right.
 * Every function must accept and return the same type.
 *
 * @param value - The starting value.
 * @param steps - Functions to apply in order, each receiving the previous result.
 * @returns The final result, or the starting value when no steps are supplied.
 *
 * @example
 * pipeSameType(
 *   3,
 *   n => n * 2,
 *   n => n + 1,
 *   n => n * n,
 * ); // 49
 *
 * pipeSameType(42); // 42
 */
export function pipeSameType<T>(value: T, ...steps: ((input: T) => T)[]): T {
  let result = value;

  for (let i = 0; i < steps.length; i++) {
    result = steps[i](result);
  }

  return result;
}

/**
 * Passes a starting value through exactly two functions.
 * A tuple records each function's position and connects their input/output types.
 * Functions are supplied as separate arguments and collected into the tuple.
 *
 * @param value - The starting value accepted by the first function.
 * @param steps - Exactly two functions: X to Y, followed by Y to Z.
 * @returns The result of the second function.
 *
 * @example
 * pipeTuple(
 *   4,
 *   n => String(n * 2),
 *   text => text.length,
 * ); // 1
 */
export function pipeTuple<X, Y, Z>(value: X, ...steps: Steps<X, Y, Z>): Z {
  const first = steps[0](value);
  const second = steps[1](first);

  return second;
}

/**
 * Passes a starting value through a chain of one or more functions.
 * Each function receives the previous function's result.
 *
 * Helper types check the starting input and connections between functions,
 * then determine the final return type.
 * Inline callbacks may need explicit parameter types for inference to succeed.
 *
 * @param value - The starting value accepted by the first function.
 * @param steps - Functions whose output types fit the following input types.
 * @returns The result of the last function in the chain.
 * @throws {TypeError} If a supplied step is not a function.
 *
 * @example
 * const double = (n: number) => n * 2;
 * const toText = (n: number) => String(n);
 *
 * pipeChain(4, double, toText); // "8", inferred as string
 *
 * // Explicit parameter types also work for inline callbacks.
 * pipeChain(
 *   4,
 *   (n: number) => n * 2,
 *   (n: number) => String(n),
 * ); // "8"
 */
export function pipeChain<F extends unknown[]>(
  value: ChainInput<F>,
  ...steps: F & CheckedChain<F>
): ChainOutput<F>;

/**
 * Runtime implementation of the public signature above.
 * Uses unknown for the changing result and checks that each step is callable.
 * The overload supplies the more precise types used by callers.
 */
export function pipeChain(value: unknown, ...steps: unknown[]): unknown {
  let result: unknown = value;

  for (const step of steps) {
    if (typeof step !== "function") {
      throw new TypeError("Each step must be a function");
    }

    result = step(result);
  }

  return result;
}
