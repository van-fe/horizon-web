import { readdirSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';

type BoundaryRule = {
  roots: string[];
  forbidden: RegExp[];
};

const workspaceRoot = resolve(import.meta.dir, '..');

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
    const path = resolve(directory, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /(?:\.[cm]?[jt]sx?|\.scss)$/.test(entry) ? [path] : [];
  });
}

const violations = rules.flatMap(rule => {
  return rule.roots.flatMap(root => {
    return sourceFiles(resolve(workspaceRoot, root)).flatMap(file => {
      const source = readFileSync(file, 'utf8');
      const pattern = file.endsWith('.scss') ? sassImportPattern : importPattern;
      return Array.from(source.matchAll(pattern)).flatMap(match => {
        const specifier = match[1].replace(/^pkg:/, '');
        const forbidden = rule.forbidden.some(forbiddenPattern => forbiddenPattern.test(specifier));
        return forbidden
          ? [`${relative(workspaceRoot, file)} imports forbidden module ${specifier}`]
          : [];
      });
    });
  });
});

if (violations.length) {
  violations.forEach(violation => console.error(violation));
  process.exit(1);
}

console.info(`Package boundary check passed for ${rules.length} foundation packages.`);
