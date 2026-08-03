import versions from '../versions.json';
import fs from 'fs';
import path from 'path';

function setHorizonWebVersion() {
  const content = {
    version: versions['horizon-web'],
  };

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/horizon-web/src/styles/version.scss'),
    `$version: "${versions['horizon-web'].split('.').slice(0, 2).join('-')}";`,
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/horizon-web/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/colors/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/utils/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/docs/.vitepress/config/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );
}

setHorizonWebVersion();
