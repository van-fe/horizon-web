/**
 * 此文件功能：
 * 主要是为了设计网站提供 `组件、指令、方法` 的 `HTML` 片段
 */
import {
  docComponentsDocs,
  docDirectivesDocs,
  docDocs,
  docMethodsDocs,
  docOthersDocs,
  docPartHtml,
} from '@nio-fe/shared/plugins';
import * as fs from 'fs-extra';
import path from 'path';
import md from './markdown-analyse/markdown';
import parseDemo from './markdown-analyse/utils/parseDemo';
import { parseNormalAnchor } from './markdown-analyse/utils/parseAnchor';
import markdownAnalyse from './markdown-analyse';

function scanAndAnalysePlugins(dir: string) {
  fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirItem => dirItem.isDirectory())
    .forEach(async dirItem => {
      const filePath = path.resolve(dir, dirItem.name, 'doc.md');
      const outputFileDir = path.resolve(docPartHtml, dir.split('/').at(-1)!, dirItem.name);
      const fileContent = fs
        .readFileSync(filePath, 'utf-8')
        .replace(/<span>\s*@[\w@.\s]+<\/span>/g, '');

      const { content, apiContent } = markdownAnalyse(fileContent, filePath, process.cwd());

      await fs.ensureDir(outputFileDir);
      fs.writeFileSync(
        path.resolve(outputFileDir, 'main.html'),
        `<section class="content">
          ${content}
        </section>`,
        'utf-8',
      );

      fs.writeFileSync(path.resolve(outputFileDir, 'api.html'), apiContent, 'utf-8');
    });
}

function scanAndAnalyseNormalDoc(dir: string) {
  fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirItem => dirItem.isDirectory())
    .forEach(async dirItem => {
      const filePath = path.resolve(dir, dirItem.name, 'doc.md');
      const outputFileDir = path.resolve(docPartHtml, dir.split('/').at(-1)!, dirItem.name);
      const fileContent = fs.readFileSync(filePath, 'utf-8').replace(/<span>[\w@.]+<\/span>/g, '');

      let content = md.render(fileContent);
      const output = parseDemo(content, filePath, process.cwd());

      content = parseNormalAnchor(output);

      await fs.ensureDir(outputFileDir);

      fs.writeFileSync(
        path.resolve(outputFileDir, 'main.html'),
        `<section class="content">
          ${content}
        </section>`,
        'utf-8',
      );
    });
}

fs.emptydir(docPartHtml).then(() => {
  scanAndAnalysePlugins(docComponentsDocs);
  scanAndAnalysePlugins(docDirectivesDocs);
  scanAndAnalysePlugins(docMethodsDocs);

  scanAndAnalyseNormalDoc(docOthersDocs);
  scanAndAnalyseNormalDoc(path.resolve(docDocs, 'getting-started'));
  scanAndAnalyseNormalDoc(path.resolve(docDocs, 'features'));
  scanAndAnalyseNormalDoc(path.resolve(docDocs, 'style-animation'));
});
