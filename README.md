# ISO 8601
> Strict ISO8601 datetime parser

[![Build Status](https://travis-ci.com/antongolub/iso8601.svg?branch=master)](https://travis-ci.com/antongolub/iso8601)
[![npm (tag)](https://img.shields.io/npm/v/@antongolub/iso8601/latest.svg)](https://www.npmjs.com/package/@antongolub/iso8601)
[![dependencyStatus](https://img.shields.io/david/antongolub/iso8601.svg?maxAge=3600)](https://david-dm.org/antongolub/iso8601)
[![devDependencyStatus](https://img.shields.io/david/dev/antongolub/iso8601.svg?maxAge=3600)](https://david-dm.org/antongolub/iso8601)
[![Maintainability](https://api.codeclimate.com/v1/badges/ed234c819b9e225b2bab/maintainability)](https://codeclimate.com/github/antongolub/iso8601/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ed234c819b9e225b2bab/test_coverage)](https://codeclimate.com/github/antongolub/iso8601/test_coverage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Greenkeeper badge](https://badges.greenkeeper.io/antongolub/iso8601.svg)](https://greenkeeper.io/)

## Yet another one date parser?
It's 20** and if you operate with dates, you should take one of these:
* [momentjs](https://momentjs.com/)
* [date-fns](https://date-fns.org/)

But if you need _only_ iso strings and bundle size matters, try out this lib.

## Install
```bash
npm add @antongolub/iso8601
yarn add @antongolub/iso8601
```

## Usage
```javascript
    import parser from '@antongolub/iso8601'

    const date1 = parser('2004002T10,26')  // YYYYWwwDThh,hh → new Date(2004, 0, 2, 10, 15, 36, 0)
    
    // 4.3.3 Representations other than complete
    // For reduced accuracy, decimal or expanded representations of date and time of day,
    // any of the representations in 4.1.2 (calendar dates), 4.1.3 (ordinal dates) 
    // or 4.1.4 (week dates) followed immediately by the time designator [T] 
    // may be combined with any of the representations in 4.2.2.2 through 4.2.2.4 (local time),
    // 4.2.4 (UTC of day) or 4.2.5.2 (local time and the difference from UTC) provided that
    
    const date2 = parser('2015-W02-4')    // YYYYWWWD (4.1.4 Week date) → new Date(2015, 0, 8)
    const date3 = parser('19')            // YY (century) → new Date(1900, 0)
    const date4 = parser('1969-12-31T12:00:00-12:00')  // Full dataTime → new Date(0)
```

#### API
```javascript
parser (value: string, group?: string | string[], date?: Date | number | string): Date | void
```
* `value` — ISO string
* `group` — optional pattern group name to specify parsing case. 
For example, `1900` matches to `hhmm` (4.2.2.3 p. a) and `YYYY` (4.1.2.3 p. b) and requires clarification.
Supported values: `date`, `time` / `localtime`, `datetime` and `all`
* `date` — optional date reference to resolve local time values. Defaults to `Date.now()`
```javascript
    const date5 = parser('12:00') // 2019-09-03T09:00:00.000Z based on Date.now() for Moscow TZ (+03:00)
    const date6 = parser('12:00', 'localtime', new Date(Date.UTC(2010, 0, 1))) // 2000-01-01T09:00:00.000Z
```
