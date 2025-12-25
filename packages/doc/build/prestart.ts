import getAnalysisJsonFiles from './getAnalysisJsonFiles';
import * as shell from 'shelljs';

function runHorizonWebCreateIndexScript() {
  shell.cd('../horizon-web');
  shell.exec('bun run build:index');
}

runHorizonWebCreateIndexScript();
getAnalysisJsonFiles();
