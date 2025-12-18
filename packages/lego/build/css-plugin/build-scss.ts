import path from 'path';
import { componentRoot, directiveRoot, legoSourceRoot, methodsRoot } from '@nio-fe/shared/plugins';
import * as sass from 'sass';
import type { PluginDependencies, PluginType } from './vite.css.plugin';
import fs from 'fs-extra';
import { rollupTheme } from '../rollup-theme';

function getPluginStyleIndexPath(pluginName: string, type: PluginType, relativeFrom: string) {
  return path.relative(
    relativeFrom,
    path.resolve(legoSourceRoot, type, pluginName, 'src/style/index.scss'),
  );
}

function getScssImportString(pluginName: string, type: PluginType, relativeFrom = legoSourceRoot) {
  const importPath = getPluginStyleIndexPath(pluginName, type, relativeFrom);

  if (fs.pathExistsSync(path.resolve(relativeFrom, importPath))) {
    return `@import "${importPath}"; \n`;
  } else {
    return '';
  }
}

function getAllPluginName() {
  const action = (rootPath: string, type: PluginType) => {
    return fs
      .readdirSync(rootPath, { withFileTypes: true })
      .filter(curr => curr.isDirectory())
      .map(curr => ({
        name: curr.name,
        type,
      }));
  };

  return [
    ...action(componentRoot, 'components'),
    ...action(directiveRoot, 'directives'),
    ...action(methodsRoot, 'methods'),
  ];
}

export default async ({
  excludes = [],
  dependencies,
  outputDirs,
}: {
  excludes?: string[];
  dependencies: PluginDependencies;
  outputDirs: string[];
}) => {
  await rollupTheme(outputDirs);

  const styleFiles = getAllPluginName()
    .filter(({ name }) => !excludes.includes(name))
    .map(({ name, type }) => ({
      name,
      info: {
        type,
        imports: dependencies[name]?.imports ?? [],
      },
    }));

  styleFiles.forEach(({ name, info }) => {
    function buildCssFile() {
      let scssContent = getScssImportString(name, info.type);

      info.imports.forEach(({ type, name }) => {
        scssContent += getScssImportString(name, type);
      });

      const currResult = sass.compileString(scssContent, {
        style: 'compressed',
        loadPaths: ['src', 'node_modules'],
      });

      outputDirs.forEach(dir => {
        const cssStyleFilePath = path.resolve(dir, info.type, name, 'src/style/index.css');

        fs.ensureFileSync(cssStyleFilePath);
        fs.writeFileSync(cssStyleFilePath, currResult.css);
      });
    }

    function buildScssFile(currComponentPath: string, dir: string) {
      let scssContent = getScssImportString(name, info.type, currComponentPath);

      info.imports.forEach(({ type, name }) => {
        scssContent += getScssImportString(name, type, currComponentPath);
      });

      const scssStyleFilePath = path.resolve(dir, info.type, name, 'src/style/index.unplugin.scss');

      fs.ensureFileSync(scssStyleFilePath);
      fs.writeFileSync(scssStyleFilePath, scssContent);
    }

    buildCssFile();
    outputDirs.forEach(dir => {
      buildScssFile(
        path.resolve(dir, path.resolve(legoSourceRoot, info.type, name, 'src/style')),
        dir,
      );
    });
  });
};
