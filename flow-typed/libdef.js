// @flow

declare module '@antongolub/iso8601' {
  declare type ILibrary = (value: string, group?: string, date?: Date) => Date | void

  declare module.exports: ILibrary
}
