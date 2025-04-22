import type { ExtractPropTypes, PropType, ObjectDirective, App } from 'vue';

export type DirectiveOptionType<T> = PropType<T>;

export type ExtractDirectiveOptionTypes<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Array<infer U>
        ? Array<U>
        : T extends (...args: infer U) => boolean
          ? (...args: U) => void
          : Partial<ExtractPropTypes<T>>;

export interface OptionType<T, D> {
  type: DirectiveOptionType<T>;
  required?: boolean;
  default?: D | null | undefined | object;
}

export type OptionTyped<T = unknown, D = unknown> =
  | Record<string, OptionType<T, D>>
  | string
  | number
  | Function;

export function declareDirectiveOptionType<T extends OptionTyped>(val: T): T {
  return val;
}

export interface DirectiveOption<Target, Option>
  extends ObjectDirective<Target, ExtractDirectiveOptionTypes<Option>> {
  name: string;
  options: Option;
  desc?: string;
}

export interface DirectiveWithInstall<Target, Option> extends DirectiveOption<Target, Option> {
  /**
   * 实际的安装方法
   * @param app
   */
  install?: (app: App<any>) => App<any>;
  /**
   * 预安装执行
   * @param app
   */
  preInstall?: (app: App<any>) => App<any>;
}

export interface DirectiveWithInstallRequired<T, O> extends DirectiveWithInstall<T, O> {
  install: (app: App<any>) => App<any>;
}

export function defineDirective<Target extends HTMLElement, Option>(
  option: DirectiveOption<Target, Option>,
) {
  return option;
}
