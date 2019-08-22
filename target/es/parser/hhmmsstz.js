"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _util=require("./util"),parser={pattern:[/^T?(?:(24)|(24)(00)|(24)(00)(00))(?:(Z)|([\-\+])(\d{2})(\d{2})?)?$/,/^T?(?:(24)|(24):(00)|(24):(00):(00))(?:(Z)|([\-\+])(\d{2})(?::(\d{2}))?)?$/,/^T?(?:((?:[01]\d|2[0-3])(?:\.\d+)?)|([01]\d|2[0-3])([0-5]\d(?:\.\d+)?)|([01]\d|2[0-3])([0-5]\d)((?:[0-5]\d|60)(?:\.\d+)?))(?:(Z)|([\-\+])(\d{2})(\d{2})?)?$/,/^T?(?:((?:[01]\d|2[0-3])(?:\.\d+)?)|([01]\d|2[0-3]):([0-5]\d(?:\.\d+)?)|([01]\d|2[0-3]):([0-5]\d):((?:[0-5]\d|60)(?:\.\d+)?))(?:(Z)|([\-\+])(\d{2})(?::(\d{2}))?)?$/],builder:function builder(a,b){var c=+(a[1]||a[2]||a[4]),d=+(a[3]||a[5]||0)+60*(c-(0|c)),e=+(a[6]||0)+60*(d-(0|d)),f=1e3*(e-(0|e));a[7]?(b.setUTCHours(0|c),b.setUTCMinutes(0|d),b.setUTCSeconds(0|e),b.setUTCMilliseconds(0|f)):(b.setHours(0|c),b.setMinutes(0|d),b.setSeconds(0|e),b.setMilliseconds(0|f));var g=(0,_util.getSignFactor)(a[8])*(60*+a[9]+(+a[10]||0));return(0,_util.correctOffset)(b,g),b}},_default=parser;exports.default=_default;