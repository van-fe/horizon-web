import * as shell from 'shelljs';
import * as fs from 'fs-extra';
import { apiGeneratorOutPut } from '@root/scripts/paths';
import path from 'path';

export default function (checkExist = true) {
  shell.cd('../api-generator');

  if (checkExist && !fs.existsSync(path.resolve(apiGeneratorOutPut, 'components-analysis.json'))) {
    shell.exec('bun run build');
  }

  fs.cpSync(
    path.resolve(apiGeneratorOutPut, 'components-analysis.json'),
    path.resolve(__dirname, 'json', 'components-analysis.json'),
  );

  fs.cpSync(
    path.resolve(apiGeneratorOutPut, 'directives-analysis.json'),
    path.resolve(__dirname, 'json', 'directives-analysis.json'),
  );

  fs.cpSync(
    path.resolve(apiGeneratorOutPut, 'methods-analysis.json'),
    path.resolve(__dirname, 'json', 'methods-analysis.json'),
  );
}
