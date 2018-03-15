import parse from '../src/parser'

function formatOffset() {
  var date = new Date(),
    offset = -date.getTimezoneOffset(),
    hours = Math.abs(offset / 60)|0,
    minutes = Math.abs(offset % 60);

  return [
    offset >= 0 ? '+' : '-',
    hours < 10 ? '0' + hours : hours,
    ':',
    minutes < 10 ? '0' + minutes : minutes
  ].join('');
}

describe('parser', () => {
  it('parses YY (century)', function () {
    expect(parse('19')).toEqual(new Date(1900, 0));
    expect(parse('-0025')).toEqual(new Date(-2500, 0));
  });

  it('parses YYYY', function () {
    expect(parse('2020')).toEqual(new Date(2020, 0));
  });

  it('parses YYYYMM', function () {
    expect(parse('1950-02')).toEqual(new Date(1950, 1));
    expect(parse('+017098-02')).toEqual(new Date(17098, 1));
    expect(parse('1280-12')).toEqual(new Date(1280, 11));
    expect(parse('-000010-01')).toEqual(new Date(-10, 0));
  });

  // NOTE The actual range of times supported by ECMAScript Date objects is slightly smaller:
  // exactly –100,000,000 days to 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC.
  // http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
  it('parses YYYYMMDD', function () {
    expect(parse('19500205')).toEqual(new Date(1950, 1, 5));
    expect(parse('1950-02-05')).toEqual(new Date(1950, 1, 5));
    expect(parse('+2757600912')).toEqual(new Date(275760, 8, 12));
    expect(parse('+275760-09-12')).toEqual(new Date(275760, 8, 12));
    expect(parse('-271821-04-21')).toEqual(new Date(-271821, 3, 21));
    expect(parse('1612-05-30')).toEqual(new Date(1612, 4, 30));
    expect(parse('-123450-08-12')).toEqual(new Date(-123450, 7, 12));
  });

  it('parses YYYYDDD (4.1.3 Ordinal date)', function () {
    expect(parse('1950-205')).toEqual(new Date(1950, 6, 24));
    expect(parse('1950205')).toEqual(new Date(1950, 6, 24));
    expect(parse('+001950-205')).toEqual(new Date(1950, 6, 24));
    expect(parse('+001950205')).toEqual(new Date(1950, 6, 24));
  });

  it('parses YYYYWWWD (4.1.4 Week date)', function() {
    expect(parse('1960W04')).toEqual(new Date(1960, 0, 25));
    expect(parse('1960W011')).toEqual(new Date(1960, 0, 4));

    expect(parse('1985W15')).toEqual(new Date(1985, 3, 8));
    expect(parse('1985W01')).toEqual(new Date(1984, 11, 31));
    expect(parse('1985-W15')).toEqual(new Date(1985, 0, 98));
    expect(parse('2015-W02-4')).toEqual(new Date(2015, 0, 8));
    expect(parse('1997-W01-2')).toEqual(new Date(1996, 11, 31));
    expect(parse('2015W024')).toEqual(new Date(2015, 0, 8));
    expect(parse('2009-W53-7')).toEqual(new Date(2010, 0, 3));

    expect(parse('+001985W15')).toEqual(new Date(1985, 3, 8));
    expect(parse('+001985W01')).toEqual(new Date(1984, 11, 31));
    expect(parse('+001985-W15')).toEqual(new Date(1985, 0, 98));
    expect(parse('+002015-W02-4')).toEqual(new Date(2015, 0, 8));
    expect(parse('+002015W024')).toEqual(new Date(2015, 0, 8));
  });

  it('parses HHMMSS (4.2.2 Local time)', function() {
    var date = new Date();
    date.setHours(15);
    date.setMinutes(20);
    date.setSeconds(58);
    date.setMilliseconds(956);

    expect(parse('15:20:58.956')).toEqual(date);

    date = new Date();
    date.setHours(15);
    date.setMinutes(20);
    date.setSeconds(32);
    date.setMilliseconds(732);

    expect(parse('1520,54554')).toEqual(date);

    date = new Date();
    date.setHours(17);
    date.setMinutes(15);
    date.setSeconds(12);
    date.setMilliseconds(0);

    expect(parse('171512')).toEqual(date);

    date = new Date();
    date.setHours(2);
    date.setMinutes(30);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(parse('02.5')).toEqual(date);
  });

  it('parses localTime with TZ offset', function() {
    var date1 = new Date(),
      offset1 = (-10 * 60 + date1.getTimezoneOffset()) * 60000;
    date1.setHours(2);
    date1.setMinutes(30);
    date1.setSeconds(0);
    date1.setMilliseconds(0);
    expect(parse('02.5-1000').getTime()).toEqual(date1.getTime() - offset1);

    var date2 = new Date(),
      offset2 = (21 * 60 + date1.getTimezoneOffset()) * 60000;
    date2.setHours(14);
    date2.setMinutes(1);
    date2.setSeconds(5);
    date2.setMilliseconds(673);
    expect(parse('14:01:05.673+21:00').getTime()).toEqual(date2.getTime() - offset2);

    var date3 = new Date();
    date3.setUTCHours(14);
    date3.setUTCMinutes(1);
    date3.setUTCSeconds(5);
    date3.setUTCMilliseconds(673);
    expect(parse('14:01:05.673Z').getTime()).toEqual(date3.getTime());

    var date5 = new Date();
    date5.setUTCHours(14);
    date5.setUTCMinutes(5);
    date5.setUTCSeconds(30);
    date5.setUTCMilliseconds(0);
    expect(parse('1405,5Z').getTime()).toEqual(date5.getTime());
  });

  it('parses dateTime', function() {
    var date = new Date(2004, 0, 2, 10, 15, 36, 0);
    var offset = formatOffset();
    expect(parse('20040102T101536')).toEqual(date);
    expect(parse('2004W015T101536')).toEqual(date);
    expect(parse('2004002T101536')).toEqual(date);
    expect(parse('2004002T10,26')).toEqual(date);
    expect(parse('1969-12-31T24:00:00')).toEqual(new Date(1970, 0, 1));

    var date1 = new Date(1985, 9, 24, 3, 58, 59, 500);
    expect(parse('+001985-10-24T03:58:59,5')).toEqual(date1);

    var date2 = new Date(2052, 4, 9, 15, 20, 30, 0);
    expect(parse('2052-05-09T15:20.5')).toEqual(date2);

    // Leap second may occurs
    var date3 = new Date(2015, 5, 1, 23, 59, 60);
    expect(parse('2015-06-01T23:59:60')).toEqual(date3);

    expect(parse('1970-01-01T' + offset.substr(1) + ':00' + offset).getTime()).toBe(0);
    expect(parse('1970-01-01T12:00:00+12:00').getTime()).toBe(0);
    expect(parse('1969-12-31T12:00:00-12:00').getTime()).toBe(0);
    expect(parse('2001-02-03T04:05:06+07:08').getTime()).toBe(981147426000);
    expect(parse('2001-02-03T04:05:06-07:08').getTime()).toBe(981198786000);
    expect(parse('9999-12-31T12:59:59+12:59').getTime()).toBe(253402214459000);
    expect(parse('1970-01-01T00:00:00Z').getTime()).toBe(0);
  });

  it('fails: malformed iso-string', function() {
    var invalid = new Date(NaN);
    [
      '14:01:05.+21:00',  //A decimal fraction shall have at least one digit
      '14:01.:05', //A decimal fraction shall have at least one digit
      '1985W1', // Wrong format

      '1405:50', // Mixed separators
      '1405.5Z+1',
      'Z', // Time is required when Z is defined
      '12:14:15+0400', // Mix of basic and extended schemas
      '12:14:15+4:00', // Irregular offset format

      '2052-10-24T1520.5', // Mixed separators
      '2000-03-29TZ', // Local time is required

      '2015-01-32',   // day should be in [01-31]
      '2010-04-00',
      '1959-00-01',   // month is not in [01-12]
      '1150-13-20',
      '24:01',        // 24:00 is only allowed
      '20:60',        // minutes are not in [00-59]
      '20:59:61',     // seconds is greater than 60
      '1985W54',      // week should be in [01-53]
      '1985W00',
      '1985-W15-0',   // day of the week is not in [1-7]
      '2015-W20-8',
      '2012-367',     // day of the year is not in [001-366]
      '2304-000'
    ].forEach(function(d) {
      expect(isNaN(parse(d))).toBeTruthy();
    });
  });
})