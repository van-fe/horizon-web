import compile from './build-scss';
import type { Plugin } from 'vite';
import { legoEsmOutput, legoLibOutput } from '@aurora/shared/plugins';

function definePlugin(plugin: (opts?: { excludes?: string[]; outputDirs?: string[] }) => Plugin) {
  return plugin;
}

export type PluginType = 'components' | 'directives' | 'methods';

type PluginDependenciesImports = {
  type: PluginType;
  name: string;
};

export type PluginDependencies = {
  [K in string]: { type: PluginType; imports: PluginDependenciesImports[] };
};

const filterImports = (imports: string[]) => {
  return imports.filter(
    (filePath: string) =>
      /^(components|directives|methods)\//.test(filePath) &&
      !/composables/.test(filePath) &&
      !/^(components|directives|methods)\/index.js/.test(filePath) &&
      !/^(components|directives|methods)\/[^/]*\/util(s)*\//.test(filePath),
  );
};

const getPathInfo = (path: string) => {
  const [, type, name] = /^(components|directives|methods)\/([^/]*)\//.exec(path) ?? [];
  return { type, name } as { type: PluginType; name: string };
};

const filterPath = (filePath: string) =>
  /^(components|directives|methods)\//.test(filePath) &&
  !/composables/.test(filePath) &&
  !/^(components|directives|methods)\/index.js/.test(filePath) &&
  !/^(components|directives|methods)\/[^/]*\/index\.js/.test(filePath) &&
  !/^(components|directives|methods)\/[^/]*\/util(s)*\//.test(filePath);

export default definePlugin(opts => ({
  name: 'vite:buildStyle',
  async writeBundle(options, bundle) {
    const keys = Object.keys(bundle).filter(filterPath);

    const getDependencies = (importName: string, analysisHistory: string[] = []): string[] => {
      if (importName in bundle) {
        const imports = filterImports((bundle[importName] as any).imports).filter(
          curr => !analysisHistory.includes(curr),
        );

        return [
          importName,
          ...imports.map(item => getDependencies(item, [...analysisHistory, importName])).flat(),
        ];
      }

      return [];
    };

    const dependencies = keys.reduce<PluginDependencies>((result, key) => {
      const { type, name } = getPathInfo(key);

      const imports = [
        ...new Set(
          filterImports((bundle[key] as any).imports).flatMap(item => getDependencies(item)),
        ),
      ]
        .map(item => getPathInfo(item))
        .filter(item => !!item && item.name !== name);

      if (name && imports.length > 0) {
        result[name] = {
          type,
          imports: [...(result[name]?.imports ?? []), ...imports].reduce((prev, curr) => {
            if (!prev.some(item => item.name === curr.name)) {
              prev.push(curr);
            }

            return prev;
          }, [] as PluginDependenciesImports[]),
        };
      }
      return result;
    }, {});

    await compile({
      dependencies,
      excludes: opts?.excludes ?? [],
      outputDirs: opts?.outputDirs ?? [legoEsmOutput, legoLibOutput],
    });
  },
}));
