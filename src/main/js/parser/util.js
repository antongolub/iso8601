// @flow

/**
 * @ignore
 */
export function correctOffset (date: Date, offset: number): void {
  if (!isNaN(offset)) {
    date.setMinutes(date.getMinutes() - offset - date.getTimezoneOffset())
  }
}

/**
 * @ignore
 */
export function getSignFactor (value: string): number {
  return value === '+'
    ? 1
    : -1
}
