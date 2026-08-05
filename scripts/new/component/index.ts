import { upperFirst, kebabCase, lowerFirst } from 'lodash';
import writeFilesByPath from '../utils/writeFilesByPath';
import { writeDocs, registerDemosSidebar } from '../utils/writeDocs';
import { resolve } from 'path';
import fs from 'fs';
import chalk from 'chalk';

function writeFiles(replacer: Record<string, string>) {
  const mainDir = resolve(__dirname, '../../../packages/horizon-web/src/components', replacer.capitalName);

  fs.mkdirSync(mainDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/main'), mainDir, replacer);

  writeDocs({
    type: 'components',
    name: replacer.capitalName,
    templateDir: resolve(__dirname, './template/doc'),
    replacer,
  });
}

function register(replacer: Record<string, string>) {
  function registerOnUnpluginResolver() {
    const targetFile = resolve(
      __dirname,
      '../../../packages/unplugin-resolver/src/components.json',
    );

    const fileContent = fs.readFileSync(targetFile, { encoding: 'utf-8' });
    let fileJson = JSON.parse(fileContent) as Record<string, string>;

    fileJson[replacer.capitalName] = `^N${replacer.capitalName}$`;

    fileJson = Object.fromEntries(
      Object.entries(fileJson).sort((a, b) => a[0].localeCompare(b[0])),
    );

    fs.writeFileSync(targetFile, JSON.stringify(fileJson, null, 2), { encoding: 'utf-8' });
  }

  function registerOnDemosSidebar() {
    registerDemosSidebar(
      {
        link: `components/${replacer.capitalName}`,
        zh: replacer.capitalName,
        en: replacer.capitalName,
      },
      'Basic Components',
    );
  }

  registerOnUnpluginResolver();
  registerOnDemosSidebar();
}

export default function (name: string) {
  const capitalName = upperFirst(name);
  const lowerFirstName = lowerFirst(name);
  const namespaceName = `N${capitalName}`;
  const kebabName = kebabCase(name);
  const kebabNamespaceName = kebabCase(namespaceName);

  const replacer = {
    name,
    lowerFirstName,
    capitalName,
    namespaceName,
    kebabName,
    kebabNamespaceName,
  };

  writeFiles(replacer);

  register(replacer);

  console.info(chalk.green(`Create component ${name} success! 已注册到 demos-sidebar.json（如分类不合适请手动调整）`));
}
