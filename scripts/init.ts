import * as shell from 'shelljs';

// workspace path check
if (__dirname.includes('components')) {
  throw new Error(
    `The workspace path CANNOT EXISTS the keyword of 'components'! Please modify the path!`,
  );
}

shell.exec(`bun run gitcase`);
