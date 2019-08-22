// @flow
export type IISOString = string

export type IISODate = {
  constructor(magic: IMagicParam): IISODate
}

export type IMagicParam = string

export type IPart = string
export type IParts = Array<IPart>
export type IBuilder = (parts: IParts, date: Date) => Date

export type IParser = {
  pattern: RegExp | Array<RegExp>,
  builder: IBuilder
}
