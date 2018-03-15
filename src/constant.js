// @flow

export const MILLISECOND = 1
export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY
export const YEAR = parseInt(365.2425 * DAY) // NOTE The Gregorian calendar improves the approximation made by the Julian calendar by skipping three Julian leap days in every 400 years giving an average year of 365.2425 mean solar days long
export const MONTH = parseInt(YEAR / 12)
