"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var YYYYWWWD={pattern:[/^(\d{4}|[\-\+]\d{6})W(0[1-9]|[1-4]\d|5[0-3])([1-7])?$/,/^(\d{4}|[\-\+]\d{6})\-W(0[1-9]|[1-4]\d|5[0-3])(?:\-([1-7]))?$/],builder:function builder(a){var b=+a[1],c=+a[2],d=7*+(5>new Date(b,0,1).getDay())+new Date(b,0,1).getDay()-1,e=+(a[3]||1)+7*c-d;return new Date(b,0,e)}},_default=YYYYWWWD;exports.default=_default;