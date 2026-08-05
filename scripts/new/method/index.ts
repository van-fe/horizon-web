import { upperFirst, kebabCase } from 'lodash';
import writeFilesByPath from '../utils/writeFilesByPath';
import { writeDocs, registerDemosSidebar } from '../utils/writeDocs';
import { resolve } from 'path';
import fs from 'fs';
import chalk from 'chalk';

function writeFiles(replacer: Record<string, string>) {
  const mainDir = resolve(__dirname, '../../../packages/horizon-web/src/methods', replacer.capitalName);

  fs.mkdirSync(mainDir, { recursive: true });

  writeFilesByPath(resolve(__dirname, './template/main'), mainDir, replacer);

  writeDocs({
    type: 'methods',
    name: replacer.capitalName,
    templateDir: resolve(__dirname, './template/doc'),
    replacer,
  });
}

function register(replacer: Record<string, string>) {
  function registerOnDemosSidebar() {
    registerDemosSidebar(
      {
        link: `methods/${replacer.capitalName}`,
        zh: replacer.capitalName,
        en: replacer.capitalName,
      },
      'Methods',
    );
  }

  registerOnDemosSidebar();
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

  console.info(chalk.green(`Create method ${name} success! 已注册到 demos-sidebar.json`));
}
