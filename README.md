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
    
    const input = '2004002T10,26' // YYYYWwwDThh,hh — *
    const parsed = parser(input)  // new Date(2004, 0, 2, 10, 15, 36, 0)
    
    // 4.3.3 Representations other than complete
    // For reduced accuracy, decimal or expanded representations of date and time of day,
    // any of the representations in 4.1.2 (calendar dates), 4.1.3 (ordinal dates) 
    // or 4.1.4 (week dates) followed immediately by the time designator [T] 
    // may be combined with any of the representations in 4.2.2.2 through 4.2.2.4 (local time),
    // 4.2.4 (UTC of day) or 4.2.5.2 (local time and the difference from UTC) provided that 
```


