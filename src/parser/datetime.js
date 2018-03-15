// @flow

import type {IParser} from '../interface'

// 4.3 Date and time of day
const parser: IParser = {
  // (YYYYMMDD | YYYYDDD | YYYYWwwD) T? HHMMSSTZ
  // The expression shall either be completely in basic format or completely in extended format
  pattern: [
    /^(\d{4}|[\-\+]\d{6})(?:(0[1-9]|1[012])(0[1-9]|[12]\d|30|31)|(00[1-9]|0[1-9]\d|[12]\d\d|3[0-5]\d|36[0-6])|W(0[1-9]|[1-4]\d|5[0-3])(\d))T(?:(24)|(24)(00)|(24)(00)(00))(?:(Z)|([\-\+])(\d{2})(\d{2})?)?$/,
    /^(\d{4}|[\-\+]\d{6})\-(?:(0[1-9]|1[012])\-(0[1-9]|[12]\d|30|31)|(00[1-9]|0[1-9]\d|[12]\d\d|3[0-5]\d|36[0-6])|W(0[1-9]|[1-4]\d|5[0-3])\-(\d))T(?:(24)|(24):(00)|(24):(00):(00))(?:(Z)|([\-\+])(\d{2})(?::(\d{2}))?)?$/,
    /^(\d{4}|[\-\+]\d{6})(?:(0[1-9]|1[012])(0[1-9]|[12]\d|30|31)|(00[1-9]|0[1-9]\d|[12]\d\d|3[0-5]\d|36[0-6])|W(0[1-9]|[1-4]\d|5[0-3])(\d))T(?:((?:[01]\d|2[0-3])(?:\.\d+)?)|([01]\d|2[0-3])([0-5]\d(?:\.\d+)?)|([01]\d|2[0-3])([0-5]\d)((?:[0-5]\d|60)(?:\.\d+)?))(?:(Z)|([\-\+])(\d{2})(\d{2})?)?$/,
    /^(\d{4}|[\-\+]\d{6})\-(?:(0[1-9]|1[012])\-(0[1-9]|[12]\d|30|31)|(00[1-9]|0[1-9]\d|[12]\d\d|3[0-5]\d|36[0-6])|W(0[1-9]|[1-4]\d|5[0-3])\-(\d))T(?:((?:[01]\d|2[0-3])(?:\.\d+)?)|([01]\d|2[0-3]):([0-5]\d(?:\.\d+)?)|([01]\d|2[0-3]):([0-5]\d):((?:[0-5]\d|60)(?:\.\d+)?))(?:(Z)|([\-\+])(\d{2})(?::(\d{2}))?)?$/
  ],
  builder: function(match) {
    const year = +match[1]
    const hours = +(match[7] || match[8] || match[10])
    const minutes = +(match[9] || match[11] || 0) + 60 * (hours - (hours|0))
    const seconds = +(match[12] || 0) + 60 * (minutes - (minutes|0))
    const milliseconds = Math.round(1000 * (seconds - (seconds|0)))

    let date
    let offset
    let month = 0
    let day

    switch (true) {
      case match[2] !== undefined:
        month = +match[2] - 1;
        day = +match[3];
        break;

      case match[4] !== undefined:
        day = +match[4];
        break;

      default:
        // NOTE 2.2.10 calendar week number
        // "first calendar week of a year is that one which includes the first Thursday of that year"
        day = +match[6] + 7 * +match[5] - 7 * +(new Date(year, 0, 1).getDay() < 5) - new Date(year, 0, 1).getDay() + 1;
    }

    if (match[13]) { // Zulu time
      date = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));

    } else {
      date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

      offset = (match[14] === '+' ? 1 : -1) * (+match[15] * 60 + (+match[16] || 0));

      if (!isNaN(offset)) {
        date.setMinutes(date.getMinutes() - offset - date.getTimezoneOffset());
      }
    }

    return date;
  }
}

export default parser
