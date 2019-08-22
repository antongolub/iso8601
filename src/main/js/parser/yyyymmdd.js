// @flow

import type {IParser} from '../interface'

// 4.1.2 Calendar date
const YYYYMMDD: IParser = {
  pattern: [
    /^(\d{4}|[\-\+]\d{6})(?:\-(0[1-9]|1[012])(?:\-(0[1-9]|[12]\d|30|31))?)?$/,     // Extended
    /^(\d{4}|[\-\+]\d{6})(0[1-9]|1[012])(0[1-9]|[12]\d|30|31)$/                    // Basic
  ],
  builder (parts) {
    const year = +parts[1]
    const month = +parts[2] - 1 || 0
    const day = +parts[3] || 1

    return new Date(year, month, day)
  }
}

export default YYYYMMDD
