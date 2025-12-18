import analyseComponents from './analyseComponents';
import analyseDirectives from './analyseDirectives';
import analyseMethods from './analyseMethods';
import chalk from 'chalk';

async function run() {
  await analyseDirectives();
  await analyseComponents();
  await analyseMethods();
}

run()
  .then(() => {
    console.info(chalk.green('Success to analysis options!'));
  })
  .catch(e => {
    throw new Error(e);
  });
