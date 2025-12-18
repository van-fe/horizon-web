import versions from '../versions.json';
import fs from 'fs';
import path from 'path';

function setLegoVersion() {
  const content = {
    version: versions.lego,
  };

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/lego/src/styles/version.scss'),
    `$version: "${versions.lego.split('.').slice(0, 2).join('-')}";`,
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/lego/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/lego-pad/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/lego-sensor-tracker/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/colors/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/shared/src/version.json'),
    JSON.stringify(content, null, 2),
    'utf-8',
  );
}

setLegoVersion();
