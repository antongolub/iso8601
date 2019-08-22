// @flow

import type {IParser} from '../interface'

// 4.1.3 Ordinal date
const YYYYDDD: IParser = {
  pattern: [
    /^(\d{4}|[\-\+]\d{6})\-?(00[1-9]|0[1-9]\d|[12]\d\d|3[0-5]\d|36[0-6])$/
  ],
  builder (parts) {
    const year = +parts[1]
    const day = +parts[2]

    return new Date(year, 0, day)
  }
}

export default YYYYDDD
