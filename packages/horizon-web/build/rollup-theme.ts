import * as path from 'path';
import * as fsExtra from 'fs-extra';
import fastGlob from 'fast-glob';
import * as sass from 'sass';

const scanDir = path.resolve(__dirname, '../src');

let scssFiles: string[] = [];
export async function getScssFiles(source = `${scanDir}/**/*.scss`) {
  if (!scssFiles.length) {
    scssFiles = await fastGlob(source);
  }

  return scssFiles;
}

export async function copyFilesToTargets(targets: string[]) {
  (await getScssFiles()).forEach(file => {
    const currFilePath = file.replace(scanDir, '');
    const fileName = path.basename(currFilePath);
    const currPath = path.dirname(currFilePath).replace(/^\//, '');

    targets.forEach(target => {
      fsExtra.mkdirpSync(path.resolve(target, currPath));
      fsExtra.copyFileSync(file, path.resolve(target, currPath, fileName));
    });
  });
}

async function buildStyle(targets: string[]) {
  for (const file of await getScssFiles(`${scanDir}/styles/*.scss`)) {
    const currFilePath = file.replace(scanDir, '');
    const fileName = path.basename(currFilePath);
    const currPath = path.dirname(currFilePath).replace(/^\//, '');

    if (/^(components|directives|methods)/.test(currPath) && fileName !== 'index.scss') {
      continue;
    }

    const res = sass.compile(file, {
      style: 'compressed',
    });

    targets.forEach(target => {
      fsExtra.mkdirpSync(path.resolve(target, currPath));
      fsExtra.writeFileSync(
        path.resolve(target, currPath, fileName.replace('.scss', '.css')),
        res.css,
        'utf-8',
      );
    });
  }
}

export async function rollupTheme(targets: string[]) {
  await copyFilesToTargets(targets);
  await buildStyle(targets);
}
