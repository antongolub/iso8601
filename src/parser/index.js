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
const allParsers = [...dateTimeParsers, ...dateParsers, ...timeParsers]

/**
 * Checks whether given date instance is valid.
 * @param {Mixed} date
 * @return {Boolean}
 */
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Strict ISO 8601 date parser

 parse('1970-01-01T00:00:00.000Z');         // new Date(0)
 parse(1950-02');                           // new Date(1950, 1)
 parse('1960W011');                         // new Date(1960, 0, 4)
 parse('1950-205');                         // new Date(1950, 6, 24)
 parse('1997-W01-2')                        // new Date(1996, 11, 31)
 parse('+002015-W02-4');                    // new Date(2015, 0, 8);
 parse('2052-05-09T15:20.5');               // new Date(2052, 4, 9, 15, 20, 30, 0);

 * @param {String} value
 * @param {String} [group] parser pattern
 * @param {Date} [date] Default date
 * @return {Date/undefined}
 */
export default function parse(value: IISOString, group: string, date: Date) {
  let parsers: Array<IParser>
  let parser
  let patterns
  let parts

  value = ('' + value).replace(',', '.');

  switch (('' + group).toLowerCase()) {
    case 'localtime':
    case 'time':
      parsers = timeParsers;
      break;

    case 'date':
      parsers = dateParsers;
      break;

    case 'datetime':
      parsers = dateTimeParsers;
      break;

    default:
      parsers = allParsers;
  }
  for (let i = 0; i < parsers.length; i++) {
    parser = parsers[i]
    patterns = [].concat(parser.pattern)

    for (let j = 0; j < patterns.length;  j++) {
      parts = patterns[j].exec(value)

      if (parts) {
        date = isValidDate(date) ?
          new Date(date) :
          new Date();

        return parser.builder(parts, date);
      }
    }
  }
}
