import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsRoot = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptsRoot, '../packages/docs');
const publicRoot = path.join(docsRoot, 'public');
const sourceExtensions = new Set(['.md', '.ts', '.tsx', '.vue']);
const mediaExtension = /\.(?:avif|gif|jpe?g|m3u8|mov|mp4|png|svg|webm|webp)(?:[?#][^\s"'`<>]*)?$/i;
const externalUrlPattern = /https?:\/\/[^\s"'`<>]+/g;
const localMediaPattern =
  /['"`](\/(?!\/)[a-zA-Z0-9_./-]+\.(?:avif|gif|jpe?g|m3u8|mov|mp4|png|svg|webm|webp)(?:[?#][^'"`\s<>]*)?)/gi;
const demoAssetPattern =
  /demoAssetUrl\(\s*['"`]([a-zA-Z0-9_./-]+\.(?:avif|gif|jpe?g|m3u8|mov|mp4|png|svg|webm|webp)(?:[?#][^'"`\s<>]*)?)['"`]\s*\)/gi;

// These sources are deliberately broken so their demos continue to exercise
// the component error states.
const intentionalErrorMedia = [
  /^https:\/\/cdn-app\.example\.com\/us\/.*\.jpg$/i,
  /^https:\/\/www\.example\.com\/not-found\.mp4$/i,
];

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.temp' || entry.name === 'dist') return [];
      return collectSourceFiles(absolutePath);
    }
    return sourceExtensions.has(path.extname(entry.name)) ? [absolutePath] : [];
  });
}

const problems: string[] = [];
let localReferenceCount = 0;
let externalMediaCount = 0;

for (const filePath of collectSourceFiles(docsRoot)) {
  const source = readFileSync(filePath, 'utf8');
  const relativeFile = path.relative(docsRoot, filePath);

  for (const match of source.matchAll(localMediaPattern)) {
    const reference = match[1];
    const pathname = reference.split(/[?#]/, 1)[0];
    localReferenceCount += 1;
    if (pathname.startsWith('/demo-assets/')) {
      problems.push(`${relativeFile}: use demoAssetUrl() for base-aware media ${reference}`);
      continue;
    }
    if (!existsSync(path.join(publicRoot, pathname.slice(1)))) {
      problems.push(`${relativeFile}: missing local media ${reference}`);
    }
  }

  for (const match of source.matchAll(demoAssetPattern)) {
    const reference = match[1];
    const pathname = reference.split(/[?#]/, 1)[0];
    localReferenceCount += 1;
    if (!existsSync(path.join(publicRoot, 'demo-assets', pathname))) {
      problems.push(`${relativeFile}: missing demo asset ${reference}`);
    }
  }

  for (const url of source.match(externalUrlPattern) ?? []) {
    if (!mediaExtension.test(url)) continue;
    if (intentionalErrorMedia.some(pattern => pattern.test(url))) continue;
    externalMediaCount += 1;
    problems.push(`${relativeFile}: external media must be localized: ${url}`);
  }
}

if (problems.length > 0) {
  console.error(`Documentation media check failed with ${problems.length} problem(s):`);
  problems.forEach(problem => console.error(`- ${problem}`));
  process.exit(1);
}

console.info(
  `Documentation media check passed (${localReferenceCount} local references, ${externalMediaCount} external media references).`,
);
