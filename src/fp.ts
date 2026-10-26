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

export function pipe<A, B>(value: A, first: (input: A) => B): B;

export function pipe<A, B, C>(
  value: A,
  first: (input: A) => B,
  second: (input: B) => C,
): C;

export function pipe<A, B, C, D>(
  value: A,
  first: (input: A) => B,
  second: (input: B) => C,
  third: (input: C) => D,
): D;

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
