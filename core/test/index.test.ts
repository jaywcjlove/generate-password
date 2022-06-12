import { generate, validate, generateMultiple, NUMERIC, LOWERCASE, UPPERCASE, SPECIAL_CHARACTER } from '../src';

test('LOWERCASE/UPPERCASE/SPECIAL_CHARACTER test case', () => {
  expect(new RegExp(`[${SPECIAL_CHARACTER}]`).test(SPECIAL_CHARACTER)).toEqual(true);
  expect(new RegExp(`[A-Z]`).test(SPECIAL_CHARACTER)).toEqual(false);
  expect(new RegExp(`[a-z]`).test(LOWERCASE)).toEqual(true);
  expect(new RegExp(`[A-Z]`).test(UPPERCASE)).toEqual(true);
  expect(new RegExp(`[0-9]`).test(NUMERIC)).toEqual(true);
});

test('generate test case', () => {
  expect(generate().length).toEqual(10);
  expect(generate({ length: 3 }).length).toEqual(3);
  expect(new RegExp(`[${SPECIAL_CHARACTER}]`).test(generate())).toEqual(true);
  expect(new RegExp(`[${SPECIAL_CHARACTER}]`).test(generate({ special: false }))).toEqual(false);
  expect(new RegExp(`[A-Z]`).test(generate())).toEqual(true);
  expect(new RegExp(`[A-Z]`).test(generate({ upperCase: false }))).toEqual(false);
  expect(new RegExp(`[a-z]`).test(generate())).toEqual(true);
  expect(new RegExp(`[a-z]`).test(generate({ lowerCase: false }))).toEqual(false);
  expect(new RegExp(`[0-9]`).test(generate())).toEqual(true);
  expect(new RegExp(`[0-9]`).test(generate({ numeric: false }))).toEqual(false);

  expect(generate({ special: false, lowerCase: false, upperCase: false, numeric: false }).length).toEqual(0);
});

test('validate test case', () => {
  expect(validate()).toEqual(0);
  expect(validate(generate())).toEqual(4);
  expect(validate(generate({ upperCase: false }))).toEqual(3);
  expect(validate(generate({ lowerCase: false }))).toEqual(3);
  expect(validate(generate({ numeric: false }))).toEqual(3);
  expect(validate(generate({ special: false }))).toEqual(3);

  expect(validate(generate({ special: false, upperCase: false }))).toEqual(2);
  expect(validate(generate({ special: false, numeric: false }))).toEqual(2);
  expect(validate(generate({ special: false, lowerCase: false }))).toEqual(2);

  expect(validate(generate({ upperCase: false, numeric: false }))).toEqual(2);
  expect(validate(generate({ upperCase: false, lowerCase: false }))).toEqual(2);

  expect(validate(generate({ lowerCase: false, numeric: false }))).toEqual(2);
  expect(validate(generate({ lowerCase: false, special: false }))).toEqual(2);

  expect(validate(generate({ numeric: false, special: false }))).toEqual(2);

  expect(validate(generate({ special: false, lowerCase: false, upperCase: false }))).toEqual(1);
  expect(validate(generate({ special: false, lowerCase: false, numeric: false }))).toEqual(1);
  expect(validate(generate({ lowerCase: false, upperCase: false, numeric: false }))).toEqual(1);
});

test('generateMultiple test case', () => {
  expect(generateMultiple().length).toEqual(10);
  expect(generateMultiple(3).length).toEqual(3);
  expect(generateMultiple(12).length).toEqual(12);
  generateMultiple(2, { length: 8 }).forEach((password) => {
    expect(password.length).toEqual(8);
  });
});
