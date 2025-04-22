import * as shell from 'shelljs';

// workspace path check
if (__dirname.includes('components')) {
  throw new Error(
    `The workspace path CANNOT EXISTS the keyword of 'components'! Please modify the path!`,
  );
}

// node/pnpm version check
const nodeVersionStr = shell.exec('node -v', { silent: true });
const pnpmVersionStr = shell.exec('pnpm -v', { silent: true });

console.info('=============');
console.info(`node version: ${nodeVersionStr}`);
console.info(`pnpm version: ${pnpmVersionStr}`);
console.info('=============');

const nodeVersion = nodeVersionStr.stdout.match(/\d+/)?.[0];
const pnpmVersion = pnpmVersionStr.stdout.match(/\d+/)?.[0];

if (!nodeVersion || parseInt(nodeVersion) < 20) {
  shell.echo('Your node version must be gather than 20!');
  shell.exit(1);
}

if (!pnpmVersion || parseInt(pnpmVersion) < 9) {
  shell.echo('Your pnpm version must be gather than 9!');
  shell.exit(1);
}

shell.exec(`pnpm run gitcase`);
