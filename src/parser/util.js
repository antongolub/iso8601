// @flow

export function correctOffset (date: Date, offset: number): void {
  if (!isNaN(offset)) {
    date.setMinutes(date.getMinutes() - offset - date.getTimezoneOffset())
  }
}

export function getSignFactor (value: string): number {
  return value === '+'
    ? 1
    : -1
}
