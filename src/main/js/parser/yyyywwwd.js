// @flow

import type {IParser} from '../interface'

// 4.1.4 Week date
const YYYYWWWD: IParser = {
  pattern: [
    /^(\d{4}|[\-\+]\d{6})W(0[1-9]|[1-4]\d|5[0-3])([1-7])?$/,             // Basic
    /^(\d{4}|[\-\+]\d{6})\-W(0[1-9]|[1-4]\d|5[0-3])(?:\-([1-7]))?$/      // Extended
  ],
  builder (parts) {
    const year = +parts[1]
    const week = +parts[2]
    const offset = 7 * +(new Date(year, 0, 1).getDay() < 5) + new Date(year, 0, 1).getDay() - 1
    const day = +(parts[3] || 1) + 7 * week - offset

    return new Date(year, 0, day)
  }
}

export default YYYYWWWD
