import * as path from 'path';
import fs from 'fs';

const defaultConfig = {
  dir: path.resolve(__dirname, '../docs'),
  output: path.resolve(__dirname, '../src/routes/router.json'),
  extList: ['en.md'],
};

function dirScan(configDir?: string) {
  const routeObj = {};

  let config = configDir ? require(path.resolve(process.cwd(), configDir)) : {};

  config = { ...defaultConfig, ...config };

  dirWalker({
    dir: config.dir,
    cb: entry => {
      const routeStr = entry.slice(config.dir.length);
      if (routeStr) {
        const routeArr = routeStr.split('/').filter(v => v);
        // 文件格式
        const filename = routeArr[routeArr.length - 1];
        let extname = path.extname(filename);
        // 配置的特殊后缀
        for (const ext of config.extList) {
          if (filename.endsWith(ext)) {
            extname = ext;
            break;
          }
        }
        if (!routeObj[extname]) {
          routeObj[extname] = {};
        }
        let idx = 0;
        let temp = routeObj[extname];
        while (idx < routeArr.length) {
          if (!temp[routeArr[idx]]) {
            temp[routeArr[idx]] = {};
          }
          temp = temp[routeArr[idx]];
          idx++;
        }
      }
    },
  });

  if (config.output) {
    fs.writeFileSync(config.output, JSON.stringify(routeObj, null, 2));
  }

  console.info(' \u001B[32m 👏 router generated ~~~ \u001B[39m');
  return routeObj;
}

function dirWalker({ dir, cb }) {
  const stat = fs.lstatSync(dir);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(dir);
    files.forEach(function (part) {
      dirWalker({ dir: path.join(dir, part), cb });
    });
  } else if (stat.isFile()) {
    cb(dir, stat);
  }
}

dirScan();
