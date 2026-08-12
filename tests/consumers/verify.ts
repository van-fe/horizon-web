import fs from 'node:fs';
import path from 'node:path';

function readJavaScript(directory: string): string {
  return fs
    .readdirSync(directory, { recursive: true })
    .filter(file => String(file).endsWith('.js'))
    .map(file => fs.readFileSync(path.join(directory, String(file)), 'utf8'))
    .join('\n');
}

const root = path.resolve(__dirname, '.output');
const reactOutput = readJavaScript(path.join(root, 'react'));
const vueOutput = readJavaScript(path.join(root, 'vue'));

if (!reactOutput.includes('React consumer')) throw new Error('React consumer bundle is missing.');
if (!vueOutput.includes('Vue consumer')) throw new Error('Vue consumer bundle is missing.');
if (!reactOutput.includes('React mask consumer')) throw new Error('React Mask bundle is missing.');
if (!vueOutput.includes('Vue mask consumer')) throw new Error('Vue Mask bundle is missing.');
if (!reactOutput.includes('React spin consumer')) throw new Error('React Spin bundle is missing.');
if (!vueOutput.includes('Vue spin consumer')) throw new Error('Vue Spin bundle is missing.');
if (!reactOutput.includes('React time consumer')) throw new Error('React Time bundle is missing.');
if (!vueOutput.includes('Vue time consumer')) throw new Error('Vue Time bundle is missing.');
if (!reactOutput.includes('React descriptions consumer'))
  throw new Error('React Descriptions bundle is missing.');
if (!vueOutput.includes('Vue descriptions consumer'))
  throw new Error('Vue Descriptions bundle is missing.');
if (!reactOutput.includes('React list consumer')) throw new Error('React List bundle is missing.');
if (!vueOutput.includes('Vue list consumer')) throw new Error('Vue List bundle is missing.');
if (reactOutput.includes('Tooltip requires one valid React element child')) {
  throw new Error('React consumer retained an unused Tooltip implementation.');
}

console.info('Vite Vue/React consumer bundles and React tree-shaking verified.');
