import type {
  EmitsOptions,
  SetupContext,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  MethodOptions,
  UnwrapRef,
  SlotsType
} from 'vue';
import { defineComponent } from 'vue';

export type ExposeOptions = Record<string, any>;

type InferExposeType<T> = T extends NumberConstructor
  ? number
  : T extends StringConstructor
    ? string
    : T extends SymbolConstructor
      ? symbol
      : T extends BooleanConstructor
        ? boolean
        : T extends DateConstructor
          ? Date
          : T extends RegExpConstructor
            ? RegExp
            : T extends ObjectConstructor
              ? object
              : T extends ExposeType<infer U>
                ? U
                : T;

export type ExtractExposeTypes<T extends ExposeOptions> = {
  [K in keyof T]: InferExposeType<T[K]>;
};

export type ExposeType<T = any> =
  | {
      new (...args: any[]): UnwrapRef<T> & {};
    }
  | {
      (): UnwrapRef<T>;
    }
  | ExposeMethod<UnwrapRef<T>>;

type ExposeMethod<T, TConstructor = any> = T extends ((...args: any) => any) | undefined
  ? {
      new (): TConstructor;
      (): T;
      readonly prototype: TConstructor;
    }
  : never;

/**
 * define lego component
 */
export type LegoSetupContext<
  Em extends EmitsOptions = EmitsOptions,
  S extends SlotsType = SlotsType,
  Ex extends ExposeOptions = ExposeOptions,
> = {
  expose(exposed?: Ex | Record<string, any>): void;
} & SetupContext<Em, S>;

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    desc?: string;
    version?: string;
    slots?: Record<string, any>;
    exposes?: Record<string, any>;
  }
}

export function defineLegoComponent<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
  options: ComponentOptionsWithObjectProps<
    PropsOptions,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE
  >,
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> {
  return defineComponent(options);
}
