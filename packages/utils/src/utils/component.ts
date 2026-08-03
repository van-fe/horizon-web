import type {
  EmitsOptions,
  SetupContext,
  UnwrapRef,
  SlotsType
} from 'vue';

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
 * define horizon-web component
 */
export type HorizonWebSetupContext<
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

