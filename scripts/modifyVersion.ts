import * as shell from 'shelljs';
import version from '../versions.json';

shell.exec(
  `grep -rl '@version latest' ./packages | xargs sed -i '' 's/@version latest/@version ${version.lego}/g'`,
);
