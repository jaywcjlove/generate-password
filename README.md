# Generate Password

![No Dependencies](http://jaywcjlove.github.io/sb/status/no-dependencies.svg)
[![npm package](https://img.shields.io/npm/v/@wcj/generate-password.svg)](https://www.npmjs.com/package/@wcj/generate-password)
[![GitHub Actions CI](https://github.com/jaywcjlove/generate-password/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/generate-password/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/generate-password/badges.svg)](https://jaywcjlove.github.io/generate-password/lcov-report/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@wcj/generate-password)](https://bundlephobia.com/result?p=@wcj/generate-password)

Generate Password is a generating random and unique passwords.

## Install

```bash
$ npm install @wcj/generate-password --save
```

## Usage

```js
import { generate, generateMultiple, validate } from '@wcj/generate-password';

generate(); // => dK0#vA3@fG
generate({ length: 23 }); // => bB1@aO7^bF0!aA0~aQ1%aE3
generateMultiple(2, { length: 8 }); // => [ 'aG6@aC2(', 'dH0{fQ0%' ]
validate('qK0#dQ3*gG'); // => 4  Strong :) Now it's safe!
```

Or manually download and link **generate-password.js** in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/browse/@wcj/generate-password/):

CDN: [UNPKG](https://unpkg.com/browse/@wcj/generate-password/) | [jsDelivr](https://cdn.jsdelivr.net/npm/@wcj/generate-password/)

```html
<script src="https://unpkg.com/@wcj/generate-password/dist/generate-password.min.js"></script>
<script type="text/javascript">
  GeneratePassword.generate(); // => dK0#vA3@fG
  GeneratePassword.generate({ length: 23 }); // => bB1@aO7^bF0!aA0~aQ1%aE3
  GeneratePassword.generateMultiple(2, { length: 8 }); // => [ 'aG6@aC2(', 'dH0{fQ0%' ]
  GeneratePassword.validate('qK0#dQ3*gG'); // => 4,   Strong :) Now it's safe!
</script>
```

## API

### generate

Create a random password

```js
import { generate } from '@wcj/generate-password';

generate(); // => dK0#vA3@fG
generate({ length: 23 }); // => bB1@aO7^bF0!aA0~aQ1%aE3
generate({ upperCase: false }); // => n6[a3_f0$k
generate({ lowerCase: false }); // => N0(B3,C4$I
generate({ numeric: false }); // => cX*rB|jP:j
generate({ numeric: false }); // => eD3rA0gL1b
generate({ special: false, numeric: false }); // => aCaLlGfSgI
generate({ special: false, lowerCase: false, upperCase: false }); // => 4020810127
generate({ special: false, lowerCase: false, numeric: false }); // => DEEBBCBYAO
generate({ lowerCase: false, upperCase: false, numeric: false }); // => !%:#_#*&^!
```

### generateMultiple

Create a random set of passwords

```js
import { generateMultiple } from '@wcj/generate-password';

generateMultiple();
// [
//   'qK0#dQ3*gG', 'rQ1#lB0#kE', 'mO1#dH1_tQ', 'gE1$rE2)aJ',
//   'eR6#eJ5|qE', 'rP3!cH1)aK', 'iE0#dB2$iE', 'bC0&mI1#hB',
//   'kB0(eG1!lD', 'bA7>hE4)kA'
// ]
generateMultiple(2, { length: 8 }); // => [ 'aG6@aC2(', 'dH0{fQ0%' ]
```

### validate

symbols pass with lowercase and uppercase letters, numbers and special characters

```js
import { validate } from '@wcj/generate-password';

validate('qK0#dQ3*gG'); // => 4  Strong :) Now it's safe!
validate('n6[a3_f0$k'); // => 3  Medium level. Enter more symbols!
validate('aCaLlGfSgI'); // => 2  Very Weak! It's easy to crack!
validate('4020810127'); // => 1  It's easy to crack!
validate(); // => 0
```

## Options

```ts
export declare const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export declare const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export declare const NUMERIC = '0123456789';
export declare const SPECIAL_CHARACTER = '!@#$%^&*()_+~`|}{\\[\\]:;?>,.<-=\\/';
export declare type Option = {
  /**
   * Integer, length of password.
   * @default 10
   */
  length?: number;
  /** Boolean, put lowercase in password */
  lowerCase?: boolean;
  /** Boolean, use uppercase letters in password. */
  upperCase?: boolean;
  /** Boolean, put numbers in password. */
  numeric?: boolean;
  /** Special characters */
  special?: boolean;
};
/** Create a random password */
export declare function generate(opts?: Option): string;
/** Create a random set of passwords */
export declare function generateMultiple(length?: number, opts?: Option): string[];
/**
 * symbols pass with lowercase and uppercase letters, numbers and special characters
 * @return [0~4]
 *
 * `4` Strong :) Now it's safe!
 * `3` Medium level. Enter more symbols!
 * `2` Very Weak! It's easy to crack!
 * `1` It's easy to crack!
 */
export declare function validate(password?: string): number;
```

## Example

```jsx mdx:preview
import React, { useState } from 'react';
import { generate } from '@wcj/generate-password';

const Demo = () => {
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numeric, setNumeric] = useState(true);
  const [special, setSpecial] = useState(true);
  const [length, setLength] = useState(8);
  const opts = { lowerCase, upperCase, numeric, special, length };
  const [password, setPassword] = useState(generate(opts));
  return (
    <div>
      <div>{password}</div>
      <button onClick={() => setPassword(generate(opts))}>Generate Password</button>
      <div>
        <label>
          <input type="range" min="8" max="50" value={length} onChange={(evn) => setLength(Number(evn.target.value))} />{' '}
          {length} length of password.
        </label>
        <br />
        <label>
          <input type="checkbox" checked={lowerCase} onChange={() => setLowerCase(!lowerCase)} /> Lower Case
          Letter(a..z)
        </label>
        <br />
        <label>
          <input type="checkbox" checked={upperCase} onChange={() => setUpperCase(!upperCase)} /> Upper Case
          Letter(A..Z)
        </label>
        <br />
        <label>
          <input type="checkbox" checked={numeric} onChange={() => setNumeric(!numeric)} /> Number (0..9)
        </label>
        <br />
        <label>
          <input type="checkbox" checked={special} onChange={() => setSpecial(!special)} /> Special characters
        </label>
      </div>
    </div>
  );
};

export default Demo;
```

## Development

```bash
npm install      # Install dependencies

npm run build    # Build packages
npm run start    # Run Website

cd core          # Enter the `core` folder
npm run watch
npm run test
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/generate-password/graphs/contributors">
  <img src="https://jaywcjlove.github.io/generate-password/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
