import analysisExportedPlugins from './analyseExportedPlugins';
import { apiGeneratorOutPut } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import chalk from 'chalk';

async function buildDependencies() {
  const [exportedComponents, exportedDirectives, exportedMethods, exportedTypes] =
    await analysisExportedPlugins();

  writeJsonFile(
    apiGeneratorOutPut,
    'components-dependencies.json',
    JSON.stringify(exportedComponents, null, 2),
  );
  writeJsonFile(
    apiGeneratorOutPut,
    'directives-dependencies.json',
    JSON.stringify(exportedDirectives, null, 2),
  );
  writeJsonFile(
    apiGeneratorOutPut,
    'methods-dependencies.json',
    JSON.stringify(exportedMethods, null, 2),
  );
  writeJsonFile(
    apiGeneratorOutPut,
    'types-dependencies.json',
    JSON.stringify(exportedTypes, null, 2),
  );
}

async function run() {
  await buildDependencies();
}

run().then(() => {
  console.info(chalk.green('Success to analysis dependencies'));
});
