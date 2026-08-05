import { camelCase, upperFirst, kebabCase } from 'lodash';
import writeFilesByPath from '../utils/writeFilesByPath';
import { writeDocs, registerDemosSidebar } from '../utils/writeDocs';
import { resolve } from 'path';
import fs from 'fs';
import chalk from 'chalk';

function writeFiles(replacer: Record<string, string>) {
  const mainDir = resolve(
    __dirname,
    '../../../packages/horizon-web/src/directives',
    replacer.nameWithPrefix,
  );

  fs.mkdirSync(mainDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/main'), mainDir, replacer);

  writeDocs({
    type: 'directives',
    name: replacer.nameWithPrefix,
    templateDir: resolve(__dirname, './template/doc'),
    replacer,
  });
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

  function registerOnDemosSidebar() {
    registerDemosSidebar(
      {
        link: `directives/${replacer.nameWithPrefix}`,
        zh: replacer.nameWithPrefix,
        en: replacer.nameWithPrefix,
      },
      'Directives',
    );
  }

  registerOnUnpluginResolver();
  registerOnDemosSidebar();
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

  console.info(chalk.green(`Create directives ${nameWithPrefix} success! 已注册到 demos-sidebar.json`));
}
