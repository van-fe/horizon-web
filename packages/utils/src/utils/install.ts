import type { SFCWithInstall, SFCInstallWithContext } from './tsHelper';
import type { App } from 'vue';
import type { DirectiveWithInstall, DirectiveWithInstallRequired } from './directive';
import type {
  MethodAnyType,
  MethodOptionsType,
  MethodsType,
  MethodWithInstall,
  MethodWithInstallRequired,
} from './methods';
export const NOOP = () => void 0;

export const withInstall = <T, E extends Record<string, any>, M extends Record<string, any>>(
  main: T,
  extra?: E,
  staticMethods?: M,
): SFCWithInstall<T> & E & M => {
  (main as SFCWithInstall<T>).install = (app: App): void => {
    [main, ...Object.values(extra ?? {})].forEach(comp => {
      app.component(comp.name, comp);
    });
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }

  if (staticMethods) {
    Object.keys(staticMethods).forEach(sm => {
      (main as any)[sm] = staticMethods[sm];
    });
  }

  return main as SFCWithInstall<T> & E & M;
};

export const withNoopInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = NOOP;

  return component as SFCWithInstall<T>;
};

export function withDirectiveInstall<T, O>(
  plugin: DirectiveWithInstall<T, O>,
): DirectiveWithInstallRequired<T, O> {
  plugin.install = (app: App) => {
    if (plugin.preInstall) {
      app = plugin.preInstall(app);
    }

    app.directive(plugin.name, plugin);
    return app;
  };

  return plugin as DirectiveWithInstallRequired<T, O>;
}

export function withMethodInstall<
  Options extends MethodOptionsType,
  Methods extends MethodsType<Options>,
  Default extends MethodAnyType<Options> | undefined,
>(
  method: MethodWithInstall<Options, Methods, Default>,
  name: string,
): MethodWithInstallRequired<Options, Methods, Default> {
  method.install = (app: App) => {
    (method as SFCInstallWithContext<MethodWithInstall<Options, Methods, Default>>)._context =
      app._context;
    app.config.globalProperties[name] = method;

    return app;
  };

  return method as MethodWithInstallRequired<Options, Methods, Default>;
}
