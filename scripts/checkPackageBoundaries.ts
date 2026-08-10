import { readdirSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';

type BoundaryRule = {
  root: string;
  forbidden: RegExp[];
};

const workspaceRoot = resolve(import.meta.dir, '..');

const rules: BoundaryRule[] = [
  {
    root: 'packages/core',
    forbidden: [/^vue(?:\/|$)/, /^react(?:\/|$)/, /^@vueuse\//, /^@floating-ui\/vue$/],
  },
  {
    root: 'packages/theme',
    forbidden: [/^vue(?:\/|$)/, /^react(?:\/|$)/, /^@vueuse\//, /^@floating-ui\/vue$/],
  },
  {
    root: 'packages/horizon-web-core',
    forbidden: [/^vue(?:\/|$)/, /^react(?:\/|$)/, /^@vueuse\//, /^@floating-ui\/vue$/],
  },
  {
    root: 'packages/horizon-web-react',
    forbidden: [/^vue(?:\/|$)/, /^@vueuse\//, /^@floating-ui\/vue$/, /^vue-router$/],
  },
];

const importPattern =
  /(?:\bfrom\s+|\bimport\s*(?:\(\s*)?|\brequire\s*\(\s*)['"]([^'"]+)['"]/g;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap(entry => {
    const path = resolve(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.[cm]?[jt]sx?$/.test(entry) ? [path] : [];
  });
}

const violations = rules.flatMap(rule => {
  const root = resolve(workspaceRoot, rule.root, 'src');

  return sourceFiles(root).flatMap(file => {
    const source = readFileSync(file, 'utf8');
    return Array.from(source.matchAll(importPattern)).flatMap(match => {
      const specifier = match[1];
      const forbidden = rule.forbidden.some(pattern => pattern.test(specifier));
      return forbidden
        ? [`${relative(workspaceRoot, file)} imports forbidden module ${specifier}`]
        : [];
    });
  });
});

if (violations.length) {
  violations.forEach(violation => console.error(violation));
  process.exit(1);
}

console.info(`Package boundary check passed for ${rules.length} foundation packages.`);
