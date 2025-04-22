import * as fs from 'fs-extra';
import path from 'path';
import { legoSourceRoot } from '@nio-fe/shared/plugins';
import fastGlob from 'fast-glob';

fastGlob(`${legoSourceRoot}/**/*.scss`).then(res => {
  res.forEach(item => {
    const basename = path.basename(item);
    const paths = item.replace(`${legoSourceRoot}/`, '').split('/');

    if (basename === 'variables.scss' || paths[0] === 'styles') {
      return;
    }

    let fileContent = fs.readFileSync(item, 'utf-8');

    fileContent = fileContent.replaceAll(
      new RegExp(`var\\(--n-([\\w-]+)\\)`, 'gi'),
      `mixins.css-variable('$1')`,
    );

    if (!fileContent.includes('styles/mixins')) {
      console.info(item);
    }

    fs.writeFileSync(item, fileContent);
  });
});
