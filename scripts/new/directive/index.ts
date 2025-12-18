import { camelCase, upperFirst, kebabCase } from 'lodash';
import writeFilesByPath from '../utils/writeFilesByPath';
import { resolve } from 'path';
import fs from 'fs';
import { green } from '../../../packages/shared/plugins';

function writeFiles(replacer: Record<string, string>) {
  const mainDir = resolve(
    __dirname,
    '../../../packages/lego/src/directives',
    replacer.nameWithPrefix,
  );
  const docDir = resolve(
    __dirname,
    '../../../packages/doc/docs/directives',
    replacer.nameWithPrefix,
  );

  fs.mkdirSync(mainDir, { recursive: true });
  fs.mkdirSync(docDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/main'), mainDir, replacer);

  fs.mkdirSync(mainDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/doc'), docDir, replacer);
}

function register(replacer: Record<string, string>) {
  function registerOnUnpluginResolver() {
    const targetFile = resolve(
      __dirname,
      '../../../packages/unplugin-resolver/src/directives.json',
    );

    const fileContent = fs.readFileSync(targetFile, { encoding: 'utf-8' });
    let fileJson = JSON.parse(fileContent) as Record<string, object>;

    fileJson[replacer.capitalName] = {
      importName: replacer.namespaceName,
      from: replacer.nameWithPrefix,
      hasStyle: true,
    };

    fileJson = Object.fromEntries(
      Object.entries(fileJson).sort((a, b) => a[0].localeCompare(b[0])),
    );

    fs.writeFileSync(targetFile, JSON.stringify(fileJson, null, 2), { encoding: 'utf-8' });
  }

  function registerOnSensorTracker() {
    const targetFile = resolve(
      __dirname,
      '../../../packages/lego-sensor-tracker/src/setting/directives.json',
    );

    const fileContent = fs.readFileSync(targetFile, { encoding: 'utf-8' });
    let fileJson = JSON.parse(fileContent) as Record<string, string[]>;

    fileJson[replacer.nameWithPrefix] = [];

    fileJson = Object.fromEntries(
      Object.entries(fileJson).sort((a, b) => a[0].localeCompare(b[0])),
    );

    fs.writeFileSync(targetFile, JSON.stringify(fileJson, null, 2), { encoding: 'utf-8' });
  }

  registerOnUnpluginResolver();
  registerOnSensorTracker();
}

export default function (nameWithPrefix: string) {
  const name = camelCase(nameWithPrefix.replace(/^v-/, ''));
  const capitalName = upperFirst(name);
  const namespaceName = `NV${capitalName}`;
  const kebabName = kebabCase(name);
  const kebabNamespaceName = kebabCase(namespaceName);

  const replacer = {
    name,
    nameWithPrefix,
    capitalName,
    namespaceName,
    kebabName,
    kebabNamespaceName,
  };

  writeFiles(replacer);

  register(replacer);

  green(`Create directives ${nameWithPrefix} success!`, 'info');
}
