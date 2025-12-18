import * as path from 'path';
import fs from 'fs';
import { legoSourceRoot } from '@aurora/utils/plugins';

function completeFilePath(filePath: string): undefined | string {
  const basename = path.basename(filePath);
  const parentPath = path.dirname(filePath);

  const foundTarget = fs.readdirSync(parentPath, { withFileTypes: true }).find(curr => {
    return curr.name === basename + path.extname(curr.name);
  });

  if (!foundTarget) return undefined;
  else if (foundTarget.isDirectory()) {
    return completeFilePath(path.resolve(filePath, 'index'));
  } else {
    return path.resolve(path.dirname(filePath), foundTarget.name);
  }
}

export default function (filePath: string) {
  if (path.extname(filePath)) return filePath;

  if (filePath.includes('~')) {
    const absolutePath = filePath.replace(/^.*?~\//, '');
    filePath = path.resolve(legoSourceRoot, absolutePath);
  }

  return completeFilePath(filePath);
}
