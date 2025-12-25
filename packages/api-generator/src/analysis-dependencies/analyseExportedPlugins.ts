import { Project } from 'ts-morph';
import { excludeFiles } from '../utils';
import glob from 'fast-glob';
import {
  componentRoot,
  directiveRoot,
  horizonwebProjectRoot,
  apiGeneratorOutPut,
  methodsRoot,
} from '@aurora/utils/plugins';
import type {
  ApiGeneratorExportedPluginType,
  ApiGeneratorExportedComponent,
  ApiGeneratorExportedDirectives,
  ApiGeneratorExportedMethod,
} from '@aurora/utils';
import { analyseComponentExports } from './components';
import { analyseDirectiveExports } from './directives';
import { analyseMethodExports } from './methods';

export default async function (): Promise<
  [
    ApiGeneratorExportedComponent[],
    ApiGeneratorExportedDirectives[],
    ApiGeneratorExportedMethod[],
    ApiGeneratorExportedPluginType[],
  ]
> {
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir: apiGeneratorOutPut,
      baseUrl: horizonwebProjectRoot,
      preserveSymlinks: true,
    },
    tsConfigFilePath: horizonwebProjectRoot + '/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  const componentsPaths = excludeFiles(
    await glob(['*/index.ts'], {
      cwd: componentRoot,
      absolute: true,
      onlyFiles: true,
    }),
  ).sort();

  const directivesPaths = excludeFiles(
    await glob(['*/index.ts'], {
      cwd: directiveRoot,
      absolute: true,
      onlyFiles: true,
    }),
  ).sort();

  const methodsPaths = excludeFiles(
    await glob(['*/index.ts'], {
      cwd: methodsRoot,
      absolute: true,
      onlyFiles: true,
    }),
  ).sort();

  const exportedComponents: ApiGeneratorExportedComponent[] = [];
  const exportedDirectives: ApiGeneratorExportedDirectives[] = [];
  const exportedMethods: ApiGeneratorExportedMethod[] = [];
  const typesResults: ApiGeneratorExportedPluginType[] = [];

  function collectPlugin(pluginPaths: string[], type: 'component' | 'directive' | 'method') {
    pluginPaths.forEach(path => {
      const exportedPluginSourceFile = project.addSourceFileAtPath(path);

      switch (type) {
        case 'component':
          {
            const [componentList, typeList] = analyseComponentExports(
              exportedPluginSourceFile,
              path,
              project,
            );
            exportedComponents.push(...componentList);
            typesResults.push(...typeList);
          }
          break;
        case 'directive':
          {
            const [directiveList, typeList] = analyseDirectiveExports(
              exportedPluginSourceFile,
              path,
              project,
            );
            exportedDirectives.push(...directiveList);
            typesResults.push(...typeList);
          }
          break;
        case 'method':
          {
            const [methodList, typeList] = analyseMethodExports(
              exportedPluginSourceFile,
              path,
              project,
            );
            exportedMethods.push(...methodList);
            typesResults.push(...typeList);
          }
          break;
      }
    });
  }

  collectPlugin(componentsPaths, 'component');
  collectPlugin(directivesPaths, 'directive');
  collectPlugin(methodsPaths, 'method');

  return [exportedComponents, exportedDirectives, exportedMethods, typesResults];
}
