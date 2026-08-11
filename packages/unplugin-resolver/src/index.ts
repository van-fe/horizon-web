import components from './components.json';
import directives from './directives.json';
import { useNamespace, pascalize } from '@aurora/utils';
import type { Lib } from 'vite-plugin-style-import';

enum PluginResolverType {
  Component = 'component',
  Directive = 'directive',
}

export type HorizonWebRenderer = 'vue' | 'react';

export interface HorizonWebResolvedPackageImport {
  renderer: HorizonWebRenderer;
  packageName: '@aurora/horizon-web-vue' | '@aurora/horizon-web-react';
  from: string;
  name: string;
  sideEffects: string[];
}

export function getHorizonWebRendererPackage(renderer: HorizonWebRenderer) {
  return renderer === 'vue' ? '@aurora/horizon-web-vue' : '@aurora/horizon-web-react';
}

export function resolveHorizonWebPackageImport(
  renderer: HorizonWebRenderer,
  name: string,
  options: HorizonWebBaseResolverOption = {},
): HorizonWebResolvedPackageImport | undefined {
  const packageName = getHorizonWebRendererPackage(renderer);
  const importStyle = options.importStyle ?? 'css';
  const normalizedName = pascalize(name).replace(/^H(?=[A-Z])/, '');
  const matched = Object.entries(components).find(([dirName, reg]) => {
    return dirName === normalizedName || new RegExp(reg).test(`H${normalizedName}`);
  });
  if (!matched) return undefined;
  if (renderer === 'react') {
    return {
      renderer,
      packageName,
      from: packageName,
      name: normalizedName,
      sideEffects: importStyle ? [`${packageName}/style.css`] : [],
    };
  }
  const dirType = options.ssr ? 'lib' : 'es';
  const styleExt = importStyle === 'scss' ? 'scss' : 'css';
  return {
    renderer,
    packageName,
    from: `${packageName}/${dirType}/components/${matched[0]}`,
    name: `H${normalizedName}`,
    sideEffects: importStyle
      ? [
          `${packageName}/${dirType}/styles/base.${styleExt}`,
          `${packageName}/${dirType}/styles/global-variables.${styleExt}`,
          `${packageName}/${dirType}/components/${matched[0]}/src/style/index.${
            styleExt === 'scss' ? 'unplugin.scss' : 'css'
          }`,
        ]
      : [],
  };
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
    const from = `@aurora/horizon-web-vue/${dirType}/components/${matched[0]}`;
    const sideEffects: string[] = [];

    if (options.importStyle) {
      sideEffects.push(
        `@aurora/horizon-web-vue/${dirType}/styles/base.${styleExt}`,
        `@aurora/horizon-web-vue/${dirType}/styles/global-variables.${styleExt}`,
        `@aurora/horizon-web-vue/${dirType}/components/${matched[0]}/src/style/index.${
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
      `@aurora/horizon-web-vue/${dirType}/styles/base.${styleExt}`,
      `@aurora/horizon-web-vue/${dirType}/styles/global-variables.${styleExt}`,
    );

    if (directive.hasStyle) {
      sideEffects.push(
        `@aurora/horizon-web-vue/${dirType}/directives/${directive.from}/src/style/index.${
          styleExt === 'scss' ? 'unplugin.scss' : 'css'
        }`,
      );
    }
  }

  return {
    name: directive.importName,
    from: `@aurora/horizon-web-vue/${dirType}/directives/${directive.from}`,
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
    libraryName: '@aurora/horizon-web-vue',
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
        return `@aurora/horizon-web-vue/${dirType}/components/${matched[0]}/src/style/index${
          options.importStyle === 'css' ? '.css' : 'unplugin.scss'
        }`;
      }

      return '';
    },
    esModule: options.importStyle !== 'css',
  };
}

/** Style resolver for named imports from the React renderer package. */
export function HorizonWebReactVitePluginStyleImportResolver(
  options: Pick<HorizonWebBaseResolverOption, 'exclude' | 'importStyle'> = {},
): Lib {
  return {
    libraryName: '@aurora/horizon-web-react',
    resolveStyle: (name: string) => {
      if (options.importStyle === false) return '';
      if (
        (options.exclude instanceof RegExp && options.exclude.test(name)) ||
        (typeof options.exclude === 'function' && options.exclude(name))
      ) {
        return '';
      }
      return resolveHorizonWebPackageImport('react', name, options)?.sideEffects[0] ?? '';
    },
    esModule: true,
  };
}
