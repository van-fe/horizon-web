import type { Plugin, Prop, Ref, VNode, AppContext, PropType } from 'vue';
import type { ExposeOptions, ExtractExposeTypes } from './component';

// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

/**
 * https://stackoverflow.com/a/59187769
 * Extract the type of an element of an array/tuple without performing indexing
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

/**
 * https://github.com/Microsoft/TypeScript/issues/29729
 */
export type LiteralUnion<T extends U, U> = T | (U & {});

export type Data = Record<string, unknown>;

export type Key = string | number;

export type SFCWithInstall<T> = T & Plugin;

export type Arrayable<T> = T | Array<T>;

export type Awaitable<T> = T | PromiseLike<T>;

export type Promisable<T> = T | Promise<T>;

export type DefinedComponent = new (...args: any[]) => any;

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

type DefaultFactory<T> = (props: Data) => T | null | undefined;

export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?(value: unknown): boolean;
}

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element;

export type MaybeRef<T> = T | Ref<T>;

const wrapperKey = Symbol();
export type PropWrapper<T> = { [wrapperKey]: T };
export const definePropType = <T>(val: any) => ({ [wrapperKey]: val }) as PropWrapper<T>;

export interface PropsTyped<T = unknown, U = unknown> {
  [key: string]: Prop<T, U>;
}

export interface WithDeprecatedPropsTyped<T = unknown, U = unknown> {
  [key: string]: Prop<T, U> & { deprecated?: string | boolean };
}

export function useEmitsValues<U extends Function, T extends Record<keyof T, U>>(
  val: T,
): Array<keyof T> {
  return Object.keys(val) as Array<keyof T>;
}

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export type LegoComponentInstance<
  T extends DefinedComponent,
  Exposes extends ExtractExposeTypes<ExposeOptions> = {},
> = InstanceType<T> & Exposes;

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
