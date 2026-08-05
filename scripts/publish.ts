import { resolve } from 'path';
import * as fs from 'fs';
import shell from 'shelljs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import versionsJson from '../versions.json';
import { cloneBrowserBuildFileToDist } from './copyFileToDist';

const versions = versionsJson as Record<string, string>;
const argv = yargs(hideBin(process.argv)).argv as {
  confirm?: boolean;
  tag?: 'beta' | string;
};

const { confirm, tag } = argv;

// the packages of need to be published
const publishPackages = [
  'horizon-web',
  'utils',
  'locale',
  'locale-vue',
  'unplugin-resolver',
  'colors',
  'upload-adapters',
];

const packageJsonOrigin: Record<string, string> = {};
const packagesPath = resolve(__dirname, '../packages');
const packageJsonModified: Record<string, string> = {};

const rmHorizonWeb = () => {
  // shell.exec(`rm -rf ${resolve(__dirname, './.horizon-web')}`);
};

const replacePackageJson = (packageName: string, jsonStr: string) => {
  const filePath = resolve(packagesPath, packageName, 'package.json');
  fs.writeFileSync(filePath, jsonStr, 'utf-8');
};

const resetPackageVersion = () => {
  Object.entries(packageJsonOrigin).forEach(([pkgName, jsonStr]) => {
    replacePackageJson(pkgName, jsonStr);
  });
};

async function ensureVersion() {
  if (!fs.existsSync(resolve(__dirname, './.horizon-web'))) {
    rmHorizonWeb();
    shell.exec(
      `git clone -b keep-version git@git.nevint.com:horizon-web/horizon-web.git ${resolve(__dirname, './.horizon-web')}`,
    );
  } else {
    shell.exec(`cd ${resolve(__dirname, './.horizon-web')} && git pull`);
  }

  if (!confirm) {
    throw new Error(
      `Please confirm ./versions.json file is modified. Then enter 'bun run pub -- --confirm'.`,
    );
  }

  for (const pkg of publishPackages) {
    // console.info(
    //   resolve(packagesPath, pkg, 'package.json'),
    //   fs.readFileSync(resolve(packagesPath, pkg, 'package.json'), 'utf-8'),
    // );
    // throw new Error();
    const jsonStr = fs.readFileSync(resolve(packagesPath, pkg, 'package.json'), 'utf-8');
    packageJsonOrigin[pkg] = jsonStr;

    const json = JSON.parse(jsonStr);

    // version
    json.version = versions[pkg];

    function replaceDependenciesVersion(pkgName: string, type = 'dependencies') {
      const noScopeName = pkgName.replace(/^@aurora\//, '');
      if (Object.keys(versions).includes(noScopeName)) {
        json[type][pkgName] = versions[noScopeName];
      }
    }

    // dependencies
    Object.keys(json.dependencies || {}).forEach(pkgName => replaceDependenciesVersion(pkgName));

    // devDependencies
    Object.keys(json.devDependencies || {}).forEach(pkgName =>
      replaceDependenciesVersion(pkgName, 'devDependencies'),
    );

    packageJsonModified[pkg] = JSON.stringify(json, null, 2);
  }

  Object.entries(packageJsonModified).forEach(([pkgName, jsonStr]) => {
    replacePackageJson(pkgName, jsonStr);
  });

  shell.cd(resolve(__dirname, '../packages'));

  publish();

  resetPackageVersion();

  writeVersionFileAndPush(versions);

  chalk.green('~~ publish packages success');

  shell.cd(__dirname);

  // create dir
  shell.mkdir(['../dist']);
  // empty dir
  shell.rm('-rf', '../dist/*');

  cloneBrowserBuildFileToDist(versions.horizon-web);
  cloneBrowserBuildFileToDist(tag || 'latest');

  // publish doc to fx manually
}

function publish() {
  Object.keys(packageJsonModified).forEach(pkgName => {
    shell.cd(resolve(__dirname, '../packages', pkgName));
    shell.exec(`bun publish --registry https://registry.npmmirror.com/ ${tag ? `--tag ${tag}` : ''}`);
  });
}

function writeVersionFileAndPush(versions: unknown) {
  fs.writeFileSync(resolve(__dirname, './.horizon-web/version.json'), JSON.stringify(versions, null, 2));

  shell.exec(
    `cd ${resolve(
      __dirname,
      './.horizon-web',
    )} && git add . && git commit -m "release: update version" && git push`,
  );
  rmHorizonWeb();
}

function checkPublishedVersion() {
  const result: Array<{
    name: string;
    expect: string;
    returned: string;
    platform: 'npmMirror';
  }> = [];
  Object.entries(versions).forEach(([pkgName, version]) => {
    const npmMirrorVersion = shell.exec(
      `curl -fsSL https://registry.npmmirror.com/@aurora%2F${pkgName} | sed -n 's/.*"latest":{"version":"\([^"]*\)".*/\1/p'`,
      { silent: true },
    );

    if (npmMirrorVersion.trim() !== version.trim()) {
      result.push({
        name: pkgName,
        expect: version,
        returned: npmMirrorVersion,
        platform: 'npmMirror',
      });
    }
  });

  if (result.length) {
    result.forEach(item => {
      console.error(`[${item.platform}] ${item.name}: expect ${item.expect}, got ${item.returned}`);
    });
  }
}

ensureVersion().then(() => {
  checkPublishedVersion();
});

process.on('uncaughtException', err => {
  console.error(chalk.bgRed(err));
  rmHorizonWeb();
  resetPackageVersion();
});
