import { upperFirst, kebabCase } from 'lodash';
import writeFilesByPath from '../utils/writeFilesByPath';
import { resolve } from 'path';
import fs from 'fs';
import { green } from '../../../packages/shared/plugins';

function writeFiles(replacer: Record<string, string>) {
  const mainDir = resolve(__dirname, '../../../packages/lego/src/methods', replacer.capitalName);
  const docDir = resolve(__dirname, '../../../packages/doc/docs/methods', replacer.capitalName);

  fs.mkdirSync(mainDir, { recursive: true });
  fs.mkdirSync(docDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/main'), mainDir, replacer);

  fs.mkdirSync(mainDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/doc'), docDir, replacer);
}

function register(replacer: Record<string, string>) {
  function registerOnSensorTracker() {
    const targetFile = resolve(
      __dirname,
      '../../../packages/lego-sensor-tracker/src/setting/methods.json',
    );

    const fileContent = fs.readFileSync(targetFile, { encoding: 'utf-8' });
    let fileJson = JSON.parse(fileContent) as Record<string, string[]>;

    fileJson[replacer.nameWithPrefix] = [];

    fileJson = Object.fromEntries(
      Object.entries(fileJson).sort((a, b) => a[0].localeCompare(b[0])),
    );

    fs.writeFileSync(targetFile, JSON.stringify(fileJson, null, 2), { encoding: 'utf-8' });
  }

  registerOnSensorTracker();
}

export default function (name: string) {
  const capitalName = upperFirst(name);
  const nameWithPrefix = `$${name}`;
  const namespaceName = `N${capitalName}`;
  const kebabName = kebabCase(name);
  const kebabNamespaceName = kebabCase(namespaceName);

  const replacer = {
    name,
    capitalName,
    nameWithPrefix,
    namespaceName,
    kebabName,
    kebabNamespaceName,
  };

  writeFiles(replacer);

  register(replacer);

  green(`Create method ${name} success!`, 'info');
}
