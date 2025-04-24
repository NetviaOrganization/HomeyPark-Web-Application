/**
 * Checks if the provided value is a Promise
 * @param value The value to check
 * @returns True if the value is a Promise, false otherwise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise<T = unknown>(value: any): value is Promise<T> {
  return Boolean(
    value && typeof value === 'object' && typeof value.then === 'function'
  )
}
