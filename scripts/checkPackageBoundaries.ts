import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';

type BoundaryRule = {
  roots: string[];
  forbidden: RegExp[];
};

const workspaceRoot = resolve(import.meta.dir, '..');
const legacyWebPackageName = '@aurora/horizon-web';
const ignoredDirectories = new Set(['.git', 'coverage', 'dist', 'es', 'lib', 'node_modules']);
const legacyReferenceAllowlist = new Set([
  'packages/eslint-plugin-horizon-web/configs/recommended.js',
  'scripts/checkPackageBoundaries.ts',
]);

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>;
}

function checkLegacyWebPackage(): string[] {
  const violations: string[] = [];
  const legacyPackageJson = resolve(workspaceRoot, 'packages/horizon-web/package.json');
  const rootPackageJson = readJson(resolve(workspaceRoot, 'package.json'));
  const versions = readJson(resolve(workspaceRoot, 'versions.json'));
  const lockfile = readFileSync(resolve(workspaceRoot, 'bun.lock'), 'utf8');
  const releasePlan = readFileSync(resolve(workspaceRoot, 'scripts/releasePlan.ts'), 'utf8');
  const rootDependencies = {
    ...(rootPackageJson.dependencies as Record<string, string> | undefined),
    ...(rootPackageJson.devDependencies as Record<string, string> | undefined),
  };

  if (existsSync(legacyPackageJson)) {
    violations.push(
      'packages/horizon-web/package.json recreates the removed legacy component package',
    );
  }
  if (legacyWebPackageName in rootDependencies) {
    violations.push(`root package.json depends on removed package ${legacyWebPackageName}`);
  }
  if ('horizon-web' in versions) {
    violations.push('versions.json contains the removed horizon-web release key');
  }
  if (lockfile.includes(`"${legacyWebPackageName}":`)) {
    violations.push(`bun.lock contains the removed package ${legacyWebPackageName}`);
  }
  if (/(?:^|[\s,])['"]horizon-web['"](?:\s*,|\s*\])/m.test(releasePlan)) {
    violations.push('releasePlan.ts publishes the removed horizon-web package');
  }

  return violations;
}

function checkLegacyWebReferences(): string[] {
  const legacyPackageReference = /@aurora\/horizon-web(?![-A-Za-z0-9_])/;

  return sourceFiles(workspaceRoot).flatMap(file => {
    const relativePath = relative(workspaceRoot, file);
    if (legacyReferenceAllowlist.has(relativePath)) return [];

    return legacyPackageReference.test(readFileSync(file, 'utf8'))
      ? [`${relativePath} references removed package ${legacyWebPackageName}`]
      : [];
  });
}

const rules: BoundaryRule[] = [
  {
    roots: ['packages/core/src'],
    forbidden: [
      /^vue(?:\/|$)/,
      /^react(?:\/|$)/,
      /^@vueuse\//,
      /^@floating-ui\/vue$/,
      /^@aurora\/(?:horizon|skyline)-/,
    ],
  },
  {
    roots: ['packages/theme/src', 'packages/theme/styles'],
    forbidden: [
      /^vue(?:\/|$)/,
      /^react(?:\/|$)/,
      /^@vueuse\//,
      /^@floating-ui\/vue$/,
      /^@aurora\/(?:horizon|skyline)-/,
    ],
  },
  {
    roots: ['packages/horizon-web-core/src'],
    forbidden: [/^vue(?:\/|$)/, /^react(?:\/|$)/, /^@vueuse\//, /^@floating-ui\/vue$/],
  },
  {
    roots: ['packages/horizon-web-react/src'],
    forbidden: [/^vue(?:\/|$)/, /^@vueuse\//, /^@floating-ui\/vue$/, /^vue-router$/],
  },
];

const importPattern = /(?:\bfrom\s+|\bimport\s*(?:\(\s*)?|\brequire\s*\(\s*)['"]([^'"]+)['"]/g;
const sassImportPattern = /@(?:use|forward|import)\s+['"]([^'"]+)['"]/g;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(entry => {
    if (ignoredDirectories.has(entry)) return [];
    const path = resolve(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    const relativePath = relative(workspaceRoot, path);
    const isHuskyHook = relativePath.startsWith('.husky/');
    return isHuskyHook || /(?:\.[cm]?[jt]sx?|\.json|\.s?css|\.vue|\.ya?ml|\.sh)$/.test(entry)
      ? [path]
      : [];
  });
}

const violations = [
  ...checkLegacyWebPackage(),
  ...checkLegacyWebReferences(),
  ...rules.flatMap(rule => {
    return rule.roots.flatMap(root => {
      return sourceFiles(resolve(workspaceRoot, root)).flatMap(file => {
        const source = readFileSync(file, 'utf8');
        const pattern = file.endsWith('.scss') ? sassImportPattern : importPattern;
        return Array.from(source.matchAll(pattern)).flatMap(match => {
          const specifier = match[1].replace(/^pkg:/, '');
          const forbidden = rule.forbidden.some(forbiddenPattern =>
            forbiddenPattern.test(specifier),
          );
          return forbidden
            ? [`${relative(workspaceRoot, file)} imports forbidden module ${specifier}`]
            : [];
        });
      });
    });
  }),
];

if (violations.length) {
  violations.forEach(violation => console.error(violation));
  process.exit(1);
}

console.info(
  `Package boundary check passed for ${rules.length} foundation packages and the renderer package-name invariant.`,
);
