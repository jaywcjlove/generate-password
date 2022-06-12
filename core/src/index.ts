export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const NUMERIC = '0123456789';
export const SPECIAL_CHARACTER = '!@#$%^&*()_+~`|}{\\[\\]:;?>,.<-=\\/';

export type Option = {
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
export function generate(opts: Option = {}) {
  const { lowerCase = true, upperCase = true, numeric = true, special = true, length = 10 } = opts;
  let password = '';
  if (!lowerCase && !upperCase && !numeric && !special) {
    return password;
  }
  while (password.length < length) {
    const entity1 = Math.ceil(LOWERCASE.length * Math.random() * Math.random()) - 1;
    const entity2 = Math.ceil(NUMERIC.length * Math.random() * Math.random()) - 1;
    const entity3 = Math.ceil(SPECIAL_CHARACTER.length * Math.random() * Math.random()) - 1;
    const entity4 = Math.ceil(UPPERCASE.length * Math.random() * Math.random()) - 1;
    if (lowerCase && password.length < length) {
      password += LOWERCASE.charAt(entity1);
    }
    if (upperCase && password.length < length) {
      password += UPPERCASE.charAt(entity4);
    }
    if (numeric && password.length < length) {
      password += NUMERIC.charAt(entity2);
    }
    if (special && password.length < length) {
      password += SPECIAL_CHARACTER.charAt(entity3);
    }
  }
  return password.trim();
}

/** Create a random set of passwords */
export function generateMultiple(length: number = 10, opts?: Option) {
  const result: string[] = [];
  for (let i = 0; i < length; i++) {
    result.push(generate(opts));
  }
  return result;
}

/**
 * symbols pass with lowercase and uppercase letters, numbers and special characters
 */
export function validate(password: string = '') {
  // Create an array and push all possible values that you want in password
  const matchedCase = new Array();
  matchedCase.push(`[${SPECIAL_CHARACTER}]`); // Special Charector
  matchedCase.push('[A-Z]'); // Uppercase Alpabates
  matchedCase.push('[0-9]'); // Numbers
  matchedCase.push('[a-z]'); // Lowercase Alphabates
  // Check the conditions
  let ctr = 0;
  for (let i = 0; i < matchedCase.length; i++) {
    if (new RegExp(matchedCase[i]).test(password)) {
      ctr++;
    }
  }
  return ctr;
}
