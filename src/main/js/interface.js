// @flow
export type IISOString = string

export type IISODate = {
  constructor(input: IInput): IISODate
}

export type IInput = string

export type IPart = string
export type IParts = Array<IPart>
export type IBuilder = (parts: IParts, date: Date) => Date

export type IParser = {
  pattern: Array<RegExp>,
  builder: IBuilder
}
