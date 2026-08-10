import type { Plugin, Prop, Ref, VNode, AppContext, PropType, ComputedRef } from 'vue';
import type { Data } from '@aurora/core';
import type { ExposeOptions, ExtractExposeTypes } from './component';
import type { JSX } from 'vue/jsx-runtime';

export { tuple, tupleNum } from '@aurora/core';
export type {
  Arrayable,
  Awaitable,
  Capitalize,
  Data,
  ElementOf,
  EmitValueCallbackToVoid,
  Join,
  Key,
  LiteralUnion,
  PartialExclude,
  PartialInclude,
  PartialRequired,
  Paths,
  Promisable,
} from '@aurora/core';

export type SFCWithInstall<T> = T & Plugin;

export type DefinedComponent = new (...args: any[]) => any;

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
export type MaybeComputedRef<T> = T | ComputedRef<T>;

const wrapperKey = Symbol();
export type PropWrapper<T> = { [wrapperKey]: T };
export const definePropType = <T>(val: any) => ({ [wrapperKey]: val }) as PropWrapper<T>;

export interface PropsTyped<T = unknown, U = unknown> {
  [key: string]: Prop<T, U>;
}

export function useEmitsValues<U extends Function, T extends Record<keyof T, U>>(
  val: T,
): Array<keyof T> {
  return Object.keys(val) as Array<keyof T>;
}

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export type HorizonWebComponentInstance<
  T extends DefinedComponent,
  Exposes extends ExtractExposeTypes<ExposeOptions> = {},
> = InstanceType<T> & Exposes;
