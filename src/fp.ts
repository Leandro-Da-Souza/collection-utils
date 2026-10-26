/**
 * Curried utilities for building reusable, composable functions
 * and practising functional programming with TypeScript.
 */

/**
 * Creates a reusable function that reads the gives property from an object.
 * Can be used directly or passed to array methods such as `.map()`
 *
 * @param key - The property to read from an object
 * @returns A function that accepts an object containing the property and returns it's value, preserving its Typescript type.
 *
 * @example
 * const getName = prop("name")
 *
 * getName([{ name: "Billy", age: 22 }]); // "Billy"
 *
 * [{ name: "Billy" }, { name: "Veronica" }].map(getName); // ["Billy", "Veronica"]
 */
export function prop<K extends PropertyKey>(
  key: K,
): <T extends Record<K, unknown>>(object: T) => T[K] {
  return function <T extends Record<K, unknown>>(object: T): T[K] {
    return object[key];
  };
}
