import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(repositoryRoot, 'packages/docs');

type Rule = { message: string; pattern: RegExp };

const vueDocRules: Rule[] = [
  { message: 'references the React package', pattern: /@aurora\/horizon-web-react/ },
  { message: 'uses a React demo container', pattern: /:::react-demo\b/ },
  { message: 'references the React demo tree', pattern: /(?:^|[/'"`])demos\/react\//m },
];
const reactDocRules: Rule[] = [
  {
    message: 'references the Vue package',
    pattern: /@aurora\/horizon-web(?!-react)/,
  },
  { message: 'uses a Vue demo container', pattern: /:::demo\b/ },
  { message: 'references the Vue demo tree', pattern: /(?:^|[/'"`])demos\/vue\//m },
];
const vueDemoRules: Rule[] = [
  { message: 'imports the React package', pattern: /@aurora\/horizon-web-react/ },
  { message: 'imports React', pattern: /from\s+['"]react(?:-dom(?:\/client)?|\/[^'"]*)?['"]/ },
];
const reactDemoRules: Rule[] = [
  {
    message: 'imports the Vue package',
    pattern: /@aurora\/horizon-web(?!-react)/,
  },
  { message: 'imports Vue', pattern: /from\s+['"]vue(?:\/[^'"]*)?['"]/ },
];

function collectFiles(directory: string, extensions: Set<string>): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(filePath, extensions);
    return extensions.has(path.extname(entry.name)) ? [filePath] : [];
  });
}

function checkFiles(files: string[], rules: Rule[], problems: string[]) {
  for (const filePath of files) {
    const source = readFileSync(filePath, 'utf8');
    for (const rule of rules) {
      if (rule.pattern.test(source)) {
        problems.push(`${path.relative(repositoryRoot, filePath)}: ${rule.message}`);
      }
    }
  }
}

function componentPageNames(locale: 'zh' | 'en', renderer: 'vue' | 'react') {
  const directory = path.join(docsRoot, locale, renderer, 'components');
  return collectFiles(directory, new Set(['.md']))
    .map(filePath => path.basename(filePath))
    .sort();
}

function checkLocaleParity(renderer: 'vue' | 'react', problems: string[]) {
  const zhPages = componentPageNames('zh', renderer);
  const enPages = componentPageNames('en', renderer);
  const zhSet = new Set(zhPages);
  const enSet = new Set(enPages);

  zhPages
    .filter(page => !enSet.has(page))
    .forEach(page => {
      problems.push(`packages/docs/en/${renderer}/components/${page}: missing English page`);
    });
  enPages
    .filter(page => !zhSet.has(page))
    .forEach(page => {
      problems.push(`packages/docs/zh/${renderer}/components/${page}: missing Chinese page`);
    });
}

const markdownExtensions = new Set(['.md']);
const demoExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue']);
const problems: string[] = [];

for (const locale of ['zh', 'en'] as const) {
  checkFiles(
    collectFiles(path.join(docsRoot, locale, 'vue'), markdownExtensions),
    vueDocRules,
    problems,
  );
  checkFiles(
    collectFiles(path.join(docsRoot, locale, 'react'), markdownExtensions),
    reactDocRules,
    problems,
  );
}

checkFiles(collectFiles(path.join(docsRoot, 'demos/vue'), demoExtensions), vueDemoRules, problems);
checkFiles(
  collectFiles(path.join(docsRoot, 'demos/react'), demoExtensions),
  reactDemoRules,
  problems,
);
checkLocaleParity('vue', problems);
checkLocaleParity('react', problems);

if (problems.length > 0) {
  console.error(`Renderer documentation check failed with ${problems.length} problem(s):`);
  problems.forEach(problem => console.error(`- ${problem}`));
  process.exit(1);
}

console.info('Renderer documentation check passed: Vue and React pages and demos are isolated.');
