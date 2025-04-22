import createWebTypesJson from './web-types';
import createVeturJson from './vetur';
import chalk from 'chalk';

async function run() {
  await createWebTypesJson();
  await createVeturJson();
}

run()
  .then(() => {
    console.info(chalk.green('Success to generate jsons for all ides!'));
  })
  .catch(e => {
    throw new Error(e);
  });
