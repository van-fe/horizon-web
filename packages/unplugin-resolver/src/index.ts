import components from './components.json';
import directives from './directives.json';
import { useNamespace, pascalize } from '@aurora/utils';
import type { Lib } from 'vite-plugin-style-import';

enum PluginResolverType {
  Component = 'component',
  Directive = 'directive',
}

export interface HorizonWebBaseResolverOption {
  /**
   * exclusions
   */
  exclude?: RegExp | ((name: string) => boolean);
  /**
   * Whether to enable ssr
   * @default false
   */
  ssr?: boolean;
  /**
   * Imported file type
   * @default 'css'
   */
  importStyle?: 'scss' | 'css' | false;
}

export interface HorizonWebResolverOption extends HorizonWebBaseResolverOption {
  /**
   * Whether directive is included
   * @default true
   */
  directives?: boolean;
  /**
   * Namespace. Do not set it at will
   * @default 'H'
   */
  namespace?: string;
}

const resolveComponents = (name: string, options: HorizonWebResolverOption) => {
  const dirType = options.ssr ? 'lib' : 'es';
  const styleExt = options.importStyle ?? 'css';
  const pattern = new RegExp(`^${options.namespace}[A-Z]`);
  if (!pattern.test(name)) {
    return;
  }

  const importName = name.replace(new RegExp(`^${options.namespace}`), useNamespace());

  if (
    (options?.exclude instanceof RegExp && options.exclude.test(name)) ||
    (typeof options.exclude === 'function' && options.exclude(name))
  )
    return;

  const iconPattern = new RegExp(`^${useNamespace()}Icon$`);
  if (iconPattern.test(importName)) {
    return {
      name: importName,
      from: '@aurora/icon',
      sideEffects: options.importStyle
        ? [`@aurora/icon/dist/${options.importStyle === 'scss' ? 'index.scss' : 'style.css'}`]
        : [],
    };
  }

  const tablePattern = new RegExp(`^${useNamespace()}Table(?:Column)?V3$`);
  if (tablePattern.test(importName)) {
    return {
      name: importName,
      from: '@aurora/horizon-web-table',
      sideEffects: options.importStyle
        ? [
            `@aurora/horizon-web-table/dist/${
              options.importStyle === 'scss' ? 'styles/index.scss' : 'style.css'
            }`,
          ]
        : [],
    };
  }

  const matched = Object.entries(components).find(([, reg]) => {
    return new RegExp(reg).test(importName);
  });

  if (matched) {
    const from = `@aurora/horizon-web/${dirType}/components/${matched[0]}`;
    const sideEffects: string[] = [];

    if (options.importStyle) {
      sideEffects.push(
        `@aurora/horizon-web/${dirType}/styles/base.${styleExt}`,
        `@aurora/horizon-web/${dirType}/styles/global-variables.${styleExt}`,
        `@aurora/horizon-web/${dirType}/components/${matched[0]}/src/style/index.${
          styleExt === 'scss' ? 'unplugin.scss' : 'css'
        }`,
      );
    }

    return {
      name: importName,
      from,
      sideEffects,
    };
  }
};

const resolveDirectives = (name: string, options: HorizonWebResolverOption) => {
  if (!options.directives) return;

  const dirType = options.ssr ? 'lib' : 'es';
  const styleExt = options.importStyle ?? 'css';
  const directive = directives[name as keyof typeof directives];
  if (!directive) return;

  if (
    (options?.exclude instanceof RegExp && options.exclude.test(name)) ||
    (typeof options.exclude === 'function' && options.exclude(name))
  )
    return;

  const sideEffects: string[] = [];

  if (options.importStyle) {
    sideEffects.push(
      `@aurora/horizon-web/${dirType}/styles/base.${styleExt}`,
      `@aurora/horizon-web/${dirType}/styles/global-variables.${styleExt}`,
    );

    if (directive.hasStyle) {
      sideEffects.push(
        `@aurora/horizon-web/${dirType}/directives/${directive.from}/src/style/index.${
          styleExt === 'scss' ? 'unplugin.scss' : 'css'
        }`,
      );
    }
  }

  return {
    name: directive.importName,
    from: `@aurora/horizon-web/${dirType}/directives/${directive.from}`,
    sideEffects,
  };
};

export function HorizonWebPluginResolvers(options: HorizonWebResolverOption = {}) {
  options = {
    directives: true,
    importStyle: 'css',
    namespace: 'H',
    ...options,
  };

  return [
    {
      type: PluginResolverType.Component,
      resolve: (name: string) => resolveComponents(name, options),
    },
    {
      type: PluginResolverType.Directive,
      resolve: (name: string) => resolveDirectives(name, options),
    },
  ];
}

export function HorizonWebVitePluginStyleImportResolvers(options: HorizonWebBaseResolverOption = {}): Lib {
  options = {
    importStyle: 'css',
    ...options,
  };

  return {
    libraryName: '@aurora/horizon-web',
    resolveStyle: (name: string) => {
      name = pascalize(name);

      const dirType = options.ssr ? 'lib' : 'es';

      const iconPattern = new RegExp(`^AIcon$`);
      if (iconPattern.test(name)) {
        return '@aurora/icon/dist/style.css';
      }

      const matched = Object.entries(components).find(([, reg]) => {
        return new RegExp(reg).test(name);
      });

      if (matched) {
        return `@aurora/horizon-web/${dirType}/components/${matched[0]}/src/style/index${
          options.importStyle === 'css' ? '.css' : 'unplugin.scss'
        }`;
      }

      return '';
    },
    esModule: options.importStyle !== 'css',
  };
}
