import getAnalysisJsonFiles from './getAnalysisJsonFiles';
import * as shell from 'shelljs';

function runLegoCreateIndexScript() {
  shell.cd('../lego');
  shell.exec('pnpm run build:index');
}

runLegoCreateIndexScript();
getAnalysisJsonFiles();
