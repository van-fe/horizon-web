import components from './components.json';
import directives from './directives.json';
import { useNamespace, pascalize } from '@nio-fe/shared';
import type { Lib } from 'vite-plugin-style-import';

enum PluginResolverType {
  Component = 'component',
  Directive = 'directive',
}

export interface LegoBaseResolverOption {
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

export interface LegoResolverOption extends LegoBaseResolverOption {
  /**
   * Whether directive is included
   * @default true
   */
  directives?: boolean;
  /**
   * Namespace. Do not set it at will
   * @default 'N'
   */
  namespace?: string;
  /**
   * Whether to use reset style
   * @default true
   */
  useResetStyle?: boolean;
  /**
   * Whether to use preset style
   * The font family preset will import in any case.
   * @default true
   */
  usePresetStyle?: boolean;
}

const resolveComponents = (name: string, options: LegoResolverOption) => {
  name = name.replace(new RegExp(`^${useNamespace()}`), 'N');
  const dirType = options.ssr ? 'lib' : 'es';
  const styleExt = options.importStyle ?? 'css';
  const pattern = new RegExp(`^${options.namespace}[A-Z]`);
  if (!pattern.test(name)) {
    return;
  }

  if (
    (options?.exclude instanceof RegExp && options.exclude.test(name)) ||
    (typeof options.exclude === 'function' && options.exclude(name))
  )
    return;

  const iconPattern = new RegExp(`^${options.namespace}Icon$`);
  if (iconPattern.test(name)) {
    return {
      name,
      from: '@nio-fe/icon',
      sideEffects: options.importStyle
        ? [`@nio-fe/icon/dist/${options.importStyle === 'scss' ? 'index.scss' : 'style.css'}`]
        : [],
    };
  }

  const tablePattern = new RegExp(`^${options.namespace}Table$`);
  if (tablePattern.test(name)) {
    return {
      name,
      from: '@nio-fe/lego-table',
      sideEffects: options.importStyle
        ? [
            `@nio-fe/lego-table/dist/${
              options.importStyle === 'scss' ? 'styles/index.scss' : 'style.css'
            }`,
          ]
        : [],
    };
  }

  const matched = Object.entries(components).find(([, reg]) => {
    return new RegExp(reg).test(name);
  });

  if (matched) {
    const from = `@nio-fe/lego/${dirType}/components/${matched[0]}`;
    const sideEffects: string[] = [];

    if (options.importStyle) {
      sideEffects.push(
        `@nio-fe/lego/${dirType}/styles/base.${styleExt}`,
        `@nio-fe/lego/${dirType}/styles/global-variables.${styleExt}`,
        `@nio-fe/lego/${dirType}/components/${matched[0]}/src/style/index.${
          styleExt === 'scss' ? 'unplugin.scss' : 'css'
        }`,
      );

      if (options.useResetStyle !== false) {
        sideEffects.push(`@nio-fe/lego/${dirType}/styles/presets/reset.${styleExt}`);
      }

      if (options.usePresetStyle !== false) {
        sideEffects.push(`@nio-fe/lego/${dirType}/styles/presets/index.${styleExt}`);
      }
    }

    return {
      name,
      from,
      sideEffects,
    };
  }
};

const resolveDirectives = (name: string, options: LegoResolverOption) => {
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
      `@nio-fe/lego/${dirType}/styles/base.${styleExt}`,
      `@nio-fe/lego/${dirType}/styles/global-variables.${styleExt}`,
    );

    if (options.useResetStyle === true || options.useResetStyle === undefined) {
      sideEffects.push(`@nio-fe/lego/${dirType}/styles/presets/reset.${styleExt}`);
    }

    if (directive.hasStyle) {
      sideEffects.push(
        `@nio-fe/lego/${dirType}/directives/${directive.from}/src/style/index.${
          styleExt === 'scss' ? 'unplugin.scss' : 'css'
        }`,
      );
    }
  }

  return {
    name: directive.importName,
    from: `@nio-fe/lego/${dirType}/directives/${directive.from}`,
    sideEffects,
  };
};

export function LegoPluginResolvers(options: LegoResolverOption = {}) {
  options = {
    directives: true,
    importStyle: 'css',
    useResetStyle: true,
    namespace: 'N',
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

export function LegoVitePluginStyleImportResolvers(options: LegoBaseResolverOption = {}): Lib {
  options = {
    importStyle: 'css',
    ...options,
  };

  return {
    libraryName: '@nio-fe/lego',
    resolveStyle: (name: string) => {
      name = pascalize(name);

      const dirType = options.ssr ? 'lib' : 'es';

      const iconPattern = new RegExp(`^NIcon$`);
      if (iconPattern.test(name)) {
        return '@nio-fe/icon/dist/style.css';
      }

      const matched = Object.entries(components).find(([, reg]) => {
        return new RegExp(reg).test(name);
      });

      if (matched) {
        return `@nio-fe/lego/${dirType}/components/${matched[0]}/src/style/index${
          options.importStyle === 'css' ? '.css' : 'unplugin.scss'
        }`;
      }

      return '';
    },
    esModule: options.importStyle !== 'css',
  };
}
