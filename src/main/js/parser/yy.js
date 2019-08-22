// @flow

import type {IParser} from '../interface'

// 4.1.2.3 Representations with reduced accuracy: centuries
/**
 * @ignore
 */
const parser: IParser = {
  pattern: [
    /^(\d{2}|[\-\+]\d{4})$/ // NOTE There's no extended representation
  ],
  builder (parts) {
    const year = +parts[1] * 100
    return new Date(year, 0)
  }
}

export default parser
