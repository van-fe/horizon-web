import analyseComponents from './analyseComponents';
import analyseDirectives from './analyseDirectives';
import analyseMethods from './analyseMethods';
import chalk from 'chalk';
import { Project } from 'ts-morph';
import { horizonwebProjectRoot } from '@root/scripts/paths';

async function run() {
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      baseUrl: horizonwebProjectRoot,
      preserveSymlinks: true,
    },
    tsConfigFilePath: horizonwebProjectRoot + '/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  await analyseDirectives(project);
  await analyseComponents(project);
  await analyseMethods(project);
}

run()
  .then(() => {
    console.info(chalk.green('Success to analysis options!'));
  })
  .catch(e => {
    throw new Error(e);
  });
