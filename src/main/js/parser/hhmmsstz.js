// @flow

import type {IParser} from '../interface'
import {correctOffset, getSignFactor} from './util'

// NOTE 4.2.2.4 Representations with decimal fraction: "A decimal fraction shall have at least one digit"
const parser: IParser = {
  pattern: [
    /* AB AC */
    /^T?(?:(24)|(24)(00)|(24)(00)(00))(?:(Z)|([\-\+])(\d{2})(\d{2})?)?$/,
    /^T?(?:(24)|(24):(00)|(24):(00):(00))(?:(Z)|([\-\+])(\d{2})(?::(\d{2}))?)?$/,
    /^T?(?:((?:[01]\d|2[0-3])(?:\.\d+)?)|([01]\d|2[0-3])([0-5]\d(?:\.\d+)?)|([01]\d|2[0-3])([0-5]\d)((?:[0-5]\d|60)(?:\.\d+)?))(?:(Z)|([\-\+])(\d{2})(\d{2})?)?$/,
    /^T?(?:((?:[01]\d|2[0-3])(?:\.\d+)?)|([01]\d|2[0-3]):([0-5]\d(?:\.\d+)?)|([01]\d|2[0-3]):([0-5]\d):((?:[0-5]\d|60)(?:\.\d+)?))(?:(Z)|([\-\+])(\d{2})(?::(\d{2}))?)?$/
  ],
  builder (parts, date) {
    const hours = +(parts[1] || parts[2] || parts[4])
    const minutes = +(parts[3] || parts[5] || 0) + 60 * (hours - (hours | 0))
    const seconds = +(parts[6] || 0) + 60 * (minutes - (minutes | 0))
    const milliseconds = 1000 * (seconds - (seconds | 0))

    // Expressions of the difference between local time and UTC of day are a component in the representations
    // ...they shall not be used as self-standing expressions.
    if (parts[7]) { // Z for UTC
      date.setUTCHours(hours | 0)
      date.setUTCMinutes(minutes | 0)
      date.setUTCSeconds(seconds | 0)
      date.setUTCMilliseconds(milliseconds | 0)
    } else {
      date.setHours(hours | 0)
      date.setMinutes(minutes | 0)
      date.setSeconds(seconds | 0)
      date.setMilliseconds(milliseconds | 0)
    }

    // NOTE Time zones in ISO 8601 are represented as local time (with the location unspecified), as UTC, or as an offset from UTC.
    const offset = getSignFactor(parts[8]) * (+parts[9] * 60 + (+parts[10] || 0))

    correctOffset(date, offset)

    return date
  }
}

export default parser
