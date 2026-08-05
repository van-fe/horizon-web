import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import newComponent from './component';
import newDirective from './directive';
import newMethod from './method';
import chalk from 'chalk';

// note: 先这样简单处理下 @archie.zheng
const argv = yargs(hideBin(process.argv)) as any;

function main() {
  const type = argv.argv._[0];
  const name = argv.argv._[1];

  switch (type) {
    case 'component':
      newComponent(name);
      break;
    case 'directive':
      if (!name.startsWith('v-')) {
        console.error(chalk.red('The directive name must start with "v-"'));
        return;
      }
      newDirective(name);
      break;
    case 'method':
      newMethod(name);
      break;
    default:
      console.error(
        chalk.red(
          `Unknown create type: '${type}' ! Only support 'component', 'directive' and 'method'`,
        ),
      );
  }
}

main();
