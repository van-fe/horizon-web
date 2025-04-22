import type { ExtractPropTypes, App, AppContext } from 'vue';

export type MethodOptionsType =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | Date
  | Function;

export type MethodsType<Options extends MethodOptionsType> = Record<string, MethodAnyType<Options>>;

export type MethodAnyType<Options extends MethodOptionsType> = (
  ...args: Array<any | ExtractPropTypes<Options>>
) => any | Promise<any>;

export type ExtractMethodOptions<Opt> = Opt extends Date
  ? Date
  : Opt extends object
    ? ExtractPropTypes<Opt>
    : Opt;

export interface MethodConfig<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
  Default extends MethodAnyType<Options>,
> {
  name: string;
  options?: Options;
  methods?: Methods;
  desc?: string;
  default?: Default;
  [index: string]: unknown;
}

export type DefinedMethodsType<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
> = {
  [K in keyof Methods]: Methods[K];
} & {
  _context?: AppContext;
};

export type DefinedMethod<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
  Default extends MethodAnyType<Options> | undefined,
> =
  InferMethodDefaultType<Default> extends never
    ? DefinedMethodsType<Options, Methods>
    : keyof Methods extends never
      ? InferMethodDefaultType<Default>
      : InferMethodDefaultType<Default> & DefinedMethodsType<Options, Methods>;

export type InferMethodDefaultType<Default> = Default extends (...args: infer Args) => infer Return
  ? (...args: Args) => Return
  : never;

export type MethodWithInstall<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
  Default extends MethodAnyType<Options> | undefined,
> = {
  install?: (app: App<any>) => App<any>;
} & DefinedMethod<Options, Methods, Default>;

export type MethodWithInstallRequired<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
  Default extends MethodAnyType<Options> | undefined,
> = {
  install: (app: App<any>) => App<any>;
} & MethodWithInstall<Options, Methods, Default>;

export function defineMethod<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
  Default extends MethodAnyType<Options>,
>(config: MethodConfig<Options, Methods, Default>): DefinedMethod<Options, Methods, Default> {
  const base =
    (config.default as InferMethodDefaultType<Default> | undefined) ??
    ({} as DefinedMethodsType<Options, Methods>);

  const methods = config.methods;

  if (methods) {
    Object.keys(methods).forEach((method: keyof Methods) => {
      (base as DefinedMethodsType<Options, Methods>)[method] = methods[method];
    });
  }

  return base as DefinedMethod<Options, Methods, Default>;
}
