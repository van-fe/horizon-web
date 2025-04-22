import * as fs from 'fs';
import path, { resolve } from 'path';
import * as cssTree from 'css-tree';
import * as sass from 'sass';
import { styleRoot } from '@nio-fe/shared/plugins';

export type OneDeepRecordType<T = string> = {
  [key: string]: string | OneDeepRecordType<T>;
};

export function getBasicElementCssVariables(filePath: string, withVersion = true) {
  const fileBaseName = path.basename(filePath, '.scss');
  const tempFilePath = path.resolve(path.dirname(filePath), `${fileBaseName}.temp.scss`);
  const mixinsFilePath = path.relative(
    path.dirname(tempFilePath),
    path.resolve(styleRoot, 'mixins/mixins.scss'),
  );
  const functionFilePath = path.relative(
    path.dirname(tempFilePath),
    path.resolve(styleRoot, 'mixins/function.scss'),
  );
  let content = fs.readFileSync(filePath, 'utf-8');

  let prevContent = '';

  if (withVersion) {
    const forwardConfigFilePath = path.relative(
      path.dirname(tempFilePath),
      path.resolve(styleRoot, 'mixins/config.scss'),
    );

    prevContent = `@forward '${forwardConfigFilePath}' with (
  $css-variable-with-version: true
);`;
  }

  if (!content.includes('mixins/mixins')) {
    prevContent += `\n@use '${mixinsFilePath}';\n`;
  }

  if (!content.includes('/function')) {
    prevContent += `\n@use '${functionFilePath}';\n`;
  }

  content =
    prevContent +
    content +
    `
@include mixins.create-root(function.flatten-variables($values, '${
      ['index', 'adapter'].includes(fileBaseName) ? '' : fileBaseName
    }'));`;

  fs.writeFileSync(tempFilePath, content, 'utf-8');

  const res = sass.renderSync({ file: tempFilePath });

  fs.rmSync(tempFilePath);

  return getPropertyName(res.css.toString()).propertyNameMap;
}

export function recursionCollectFiles(absolutePath: string, ignoreIndexFile = true) {
  const results: OneDeepRecordType = {};

  const filesOrDirs = fs.readdirSync(absolutePath, { withFileTypes: true });

  filesOrDirs.forEach(fileOrDir => {
    if (
      fileOrDir.isFile() &&
      ignoreIndexFile &&
      !/^index\./.test(fileOrDir.name) &&
      !/^\./.test(fileOrDir.name)
    ) {
      results[getFileName(fileOrDir.name)] = resolve(absolutePath, fileOrDir.name);
    } else if (fileOrDir.isDirectory()) {
      results[getFileName(fileOrDir.name)] = recursionCollectFiles(
        resolve(absolutePath, fileOrDir.name),
      );
    }
  });

  return results;
}

export function getVariablesFile(root: string) {
  const results: string[] = [];
  const dirs = fs.readdirSync(root, { withFileTypes: true }).filter(dir => dir.isDirectory());

  dirs.forEach(dir => {
    const path = resolve(root, `${dir.name}/src/style/variables.scss`);

    if (fs.existsSync(path)) {
      results.push(path);
    }
  });

  return results;
}

export function getPropertyName(cssStr: string) {
  const propertyNameMap: Record<string, string> = {};
  const ast = cssTree.parse(cssStr);

  cssTree.walk(ast, node => {
    if (node.type === 'Declaration') {
      if (!propertyNameMap[node.property]) {
        // @ts-ignore
        propertyNameMap[node.property.trim()] = node.value?.value?.trim().replace(/['"]/g, '');
      }
    }
  });

  return {
    propertyNameMap,
  };
}

export function getFileName(fileRawName: string) {
  return fileRawName.replace(path.extname(fileRawName), '');
}

export function getScssProperties(filePath: string) {
  const cssItem = sass.renderSync({ file: filePath });

  const { propertyNameMap } = getPropertyName(cssItem.css.toString());

  return propertyNameMap;
}

export function safetyGetFilePath(filePath: string) {
  let file = `${getFileName(filePath)}.scss`;

  if (!fs.existsSync(file)) {
    file = `${getFileName(filePath)}/index.scss`;
  }

  return file;
}
