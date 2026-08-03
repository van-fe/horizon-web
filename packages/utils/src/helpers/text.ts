export { default as camelCase } from 'lodash/camelCase';
export { default as capitalize } from 'lodash/capitalize';
export { default as snakeCase } from 'lodash/snakeCase';
import capitalize from 'lodash/capitalize';

export type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

export type CamelCase<S extends string> = S extends `${infer L}_${infer R1}${infer R2}`
  ? Uppercase<R1> extends Lowercase<R1>
    ? `${Lowercase<L>}_${CamelCase<`${R1}${R2}`>}`
    : `${Lowercase<L>}${Uppercase<R1>}${CamelCase<R2>}`
  : Lowercase<S>;

export type KebabCaseToCamelCase<S extends string> = S extends `${infer L}-${infer R1}${infer R2}`
  ? Uppercase<R1> extends Lowercase<R1>
    ? `${Lowercase<L>}-${KebabCaseToCamelCase<`${R1}${R2}`>}`
    : `${Lowercase<L>}${Uppercase<R1>}${KebabCaseToCamelCase<R2>}`
  : Lowercase<S>;

export type KebabCaseToLowerCase<S extends string> = S extends `${infer L}-${infer R1}${infer R2}`
  ? Uppercase<R1> extends Lowercase<R1>
    ? `${Lowercase<L>}-${KebabCaseToLowerCase<`${R1}${R2}`>}`
    : `${Lowercase<L>}${Lowercase<R1>}${KebabCaseToLowerCase<R2>}`
  : Lowercase<S>;

/**
 * 转换为连字符模式
 *
 * e.g FormItem -> form-item
 */
export const kebabCase = camelCapitalCaseToKebabCase;

export function camelCapitalCaseToKebabCase<T extends string>(str: T): KebabCase<T> {
  return str.replace(
    /[A-Z]/g,
    (char, index) => (index > 0 ? '-' : '') + char.toLowerCase(),
  ) as KebabCase<T>;
}

/**
 * 将连字符模式转换为驼峰模式
 *
 * e.g form-item -> FormItem
 */
export const pascalize = (str: string) => str.split('-').map(capitalize).join('');

/**
 * 将连字符全部转换为小写字符串
 *
 * e.g form-item -> formitem
 */
export const kebabCaseToLowerCase = <T extends string>(str: T): KebabCaseToLowerCase<T> =>
  str.replaceAll('-', '').toLowerCase() as KebabCaseToLowerCase<T>;

/**
 * 将字符串的首字母转换为大写字母
 *
 * e.g formItem -> FormItem
 */
export const upperFirst = <T extends string>(str: T) =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as T extends `${infer L}${infer R}`
    ? `${Uppercase<L>}${R}`
    : T;
