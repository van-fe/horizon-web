import fs from 'node:fs';
import path from 'node:path';
import versionsJson from '../versions.json';

export const publishPackages = [
  'core',
  'theme',
  'horizon-core',
  'utils',
  'colors',
  'locale',
  'locale-vue',
  'locale-react',
  'horizon-vue',
  'horizon-react',
  'unplugin-resolver',
  'upload-adapters',
] as const;

export interface ReleasePlanEntry {
  directory: (typeof publishPackages)[number];
  name: string;
  version: string;
  dependencies: Record<string, string>;
}

export function createReleasePlan(packagesRoot = path.resolve(__dirname, '../packages')) {
  const versions = versionsJson as Record<string, string>;
  return publishPackages.map(directory => {
    const packagePath = path.resolve(packagesRoot, directory, 'package.json');
    if (!fs.existsSync(packagePath)) throw new Error(`Release package is missing: ${directory}`);
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8')) as {
      name: string;
      dependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };
    const version = versions[directory];
    if (!version) throw new Error(`Release version is missing: ${directory}`);
    const dependencies = Object.fromEntries(
      Object.entries({ ...packageJson.dependencies, ...packageJson.peerDependencies })
        .filter(([name]) => versions[name.replace(/^@aurora\//, '')])
        .map(([name]) => [name, versions[name.replace(/^@aurora\//, '')]]),
    );
    return { directory, name: packageJson.name, version, dependencies } satisfies ReleasePlanEntry;
  });
}
