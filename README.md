# ISO 8601

[![Greenkeeper badge](https://badges.greenkeeper.io/antongolub/iso8601.svg)](https://greenkeeper.io/)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![buildStatus](https://img.shields.io/travis/antongolub/iso8601.svg?maxAge=3600&branch=master)](https://travis-ci.org/antongolub/iso8601)
[![Coveralls](https://img.shields.io/coveralls/antongolub/iso8601.svg?maxAge=3600)](https://coveralls.io/github/antongolub/iso8601)
[![dependencyStatus](https://img.shields.io/david/antongolub/iso8601.svg?maxAge=3600)](https://david-dm.org/antongolub/iso8601)
[![devDependencyStatus](https://img.shields.io/david/dev/antongolub/iso8601.svg?maxAge=3600)](https://david-dm.org/antongolub/iso8601)


Strict ISO8601 datetime parser

##### Yet another one iso date parser? Oh...
It's 2018 and if you operate with dates, you should take one of these:
* [momentjs](https://momentjs.com/)
* [date-fns](https://date-fns.org/)

But if you need _only_ iso strings and bundle size matters, try out this lib.
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
