/**
 * Strict ISO8601 datetime parser
 * @module antongolub/iso8601
 */

// @flow
import type {
  IParser,
  IISOString
} from '../interface'

import YY from './yy'
import YYYYMMDD from './yyyymmdd'
import YYYYDDD from './yyyyddd'
import YYYYWWWD from './yyyywwwd'
import HHMMSSTZ from './hhmmsstz'
import DATETIME from './datetime'

const dateParsers = [YY, YYYYMMDD, YYYYDDD, YYYYWWWD]
const timeParsers = [HHMMSSTZ]
const dateTimeParsers = [DATETIME]
const allParsers = [...timeParsers, ...dateTimeParsers, ...dateParsers]

/**
 * Normalizes input string.
 * @ignore
 * @param {Mixed} value
 * @return {string}
 */
const normalizeInput = (value: IISOString) => ('' + value).replace(',', '.')

/**
 * Checks whether given date instance is valid.
 * @ignore
 * @param {Mixed} date
 * @return {Boolean}
 */
const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime())

/**
 * @ignore
 * @param {Date/undefined} date
 * @return {Date}
 */
const normalizeDate = (date): Date => date && isValidDate(date)
  ? new Date(date)
  : new Date()

/**
 * @ignore
 * @param {string} group
 * @return {IParser[]}
 */
const getParsers = (group?: string): Array<IParser> => {
  switch (group && ('' + group).toLowerCase()) {
    case 'localtime':
    case 'time':
      return timeParsers

    case 'date':
      return dateParsers

    case 'datetime':
      return dateTimeParsers

    default:
      return allParsers
  }
}

/**
 * Strict ISO 8601 date parser
 * @example
 parse('1970-01-01T00:00:00.000Z');         // new Date(0)
 parse('1950-02');                          // new Date(1950, 1)
 parse('1960W011');                         // new Date(1960, 0, 4)
 parse('1950-205');                         // new Date(1950, 6, 24)
 parse('1997-W01-2')                        // new Date(1996, 11, 31)
 parse('+002015-W02-4');                    // new Date(2015, 0, 8);
 parse('2052-05-09T15:20.5');               // new Date(2052, 4, 9, 15, 20, 30, 0);

 * @module antongolub/iso8601
 * @public
 * @param {String} input
 * @param {String} [group] parser pattern
 * @param {Date} [date] Default date
 * @return {Date/undefined}
 */
export default function parse (input: IISOString, group?: string, date?: Date): Date | void {
  const parsers = getParsers(group)
  const value = normalizeInput(input)
  const initialDate = normalizeDate(date)

  for (let i = parsers.length; i--;) {
    const {pattern, builder} = parsers[i]

    for (let j = pattern.length; j--;) {
      const parts = pattern[j].exec(value)

      if (parts) {
        return builder(parts, initialDate)
      }
    }
  }
}
