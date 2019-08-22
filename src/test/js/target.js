import parse from '../../../target/es5'

describe('target', () => {
  it('exposes parser as module default', () => {
    expect(parse('2020')).toEqual(new Date(2020, 0))
  })
})
