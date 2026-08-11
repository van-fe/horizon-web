export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

export type LiteralUnion<T extends U, U> = T | (U & {});

export type Data = Record<string, unknown>;

export type Key = string | number;

export type Arrayable<T> = T | Array<T>;

export type Awaitable<T> = T | PromiseLike<T>;

export type Promisable<T> = T | Promise<T>;

export type Capitalize<T> = T extends `${infer F}${infer L}` ? `${Uppercase<F>}${L}` : never;

export type Join<
  Arr extends Array<string | number>,
  Separator extends string | number,
> = Arr extends [infer F, ...infer R]
  ? R['length'] extends 0
    ? `${F & string}`
    : `${F & string}${Separator}${Join<R & (string | number)[], Separator>}`
  : '';

export type Paths<T, K extends keyof T = keyof T> = T extends Record<any, unknown> | unknown[]
  ? K extends keyof T & (string | number)
    ? `${T extends unknown[] ? `[${K}]` | K : K}${
        | ''
        | `${T[K] extends unknown[] ? '' | '.' : '.'}${Paths<T[K]>}`}`
    : never
  : never;

export type PartialExclude<T, K extends keyof T = keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]: T[Key];
} & {
  [Key in keyof T as Key extends K ? never : Key]?: T[Key];
};

export type PartialInclude<T, K extends keyof T = keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]?: T[Key];
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};

export type EmitValueCallbackToVoid<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => void;
};

export type PartialRequired<T extends Record<string, any>, K extends keyof T = keyof T> = Required<{
  [Key in keyof T as Key extends K ? Key : never]: T[Key];
}> &
  Partial<{
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
  }>;
