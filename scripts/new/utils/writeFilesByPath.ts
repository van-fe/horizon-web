import fs from 'fs';
import { resolve } from 'path';

function doReplace(content: string, replacer: Record<string, string>) {
  Object.entries(replacer).forEach(([key, value]) => {
    content = content.replaceAll(`\$\{${key}\}`, value);
  });

  return content;
}

export default function (templateDir: string, targetDir: string, replacer: Record<string, string>) {
  const recursion = (tierPaths: string[]) => {
    const currPath = resolve(templateDir, ...tierPaths);

    fs.mkdirSync(resolve(targetDir, ...tierPaths), { recursive: true });

    fs.readdirSync(currPath, { withFileTypes: true }).forEach(dir => {
      if (dir.isFile()) {
        const content = doReplace(
          fs.readFileSync(resolve(currPath, dir.name), { encoding: 'utf-8' }),
          replacer,
        );

        fs.writeFileSync(
          doReplace(resolve(targetDir, ...tierPaths, dir.name.replace('.tpl', '')), replacer),
          content,
          {
            encoding: 'utf-8',
          },
        );
      } else {
        recursion(tierPaths.concat(dir.name));
      }
    });
  };

  recursion([]);
}
