"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var YYYYMMDD={pattern:[/^(\d{4}|[\-\+]\d{6})(?:\-(0[1-9]|1[012])(?:\-(0[1-9]|[12]\d|30|31))?)?$/,/^(\d{4}|[\-\+]\d{6})(0[1-9]|1[012])(0[1-9]|[12]\d|30|31)$/],builder:function builder(a){var b=+a[1],c=+a[2]-1||0,d=+a[3]||1;return new Date(b,c,d)}},_default=YYYYMMDD;exports.default=_default;