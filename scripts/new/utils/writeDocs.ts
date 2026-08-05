import { resolve } from 'path';
import fs from 'fs';
import writeFilesByPath, { renderTemplate } from './writeFilesByPath';

interface WriteDocsOptions {
  /** 文档类型：components | directives | methods */
  type: 'components' | 'directives' | 'methods';
  /** 文档名称：组件/方法使用 PascalCase 名称，指令使用 v-xxx */
  name: string;
  /** 文档模板目录（包含 doc.md.tpl、doc.en.md.tpl 与 demos/ 目录） */
  templateDir: string;
  replacer: Record<string, string>;
}

export function writeDocs({ type, name, templateDir, replacer }: WriteDocsOptions) {
  const docsRoot = resolve(__dirname, '../../../packages/docs');
  const zhDocFile = resolve(docsRoot, `zh/demos/${type}`, `${name}.md`);
  const enDocFile = resolve(docsRoot, `en/demos/${type}`, `${name}.md`);
  const demosDir = resolve(docsRoot, `demos/${type}`, name);

  fs.mkdirSync(demosDir, { recursive: true });

  writeFilesByPath(resolve(templateDir, './demos'), demosDir, replacer);

  const zhContent = renderTemplate(
    fs.readFileSync(resolve(templateDir, './doc.md.tpl'), { encoding: 'utf-8' }),
    replacer,
  );
  const enContent = renderTemplate(
    fs.readFileSync(resolve(templateDir, './doc.en.md.tpl'), { encoding: 'utf-8' }),
    replacer,
  );

  fs.writeFileSync(zhDocFile, zhContent, { encoding: 'utf-8' });
  fs.writeFileSync(enDocFile, enContent, { encoding: 'utf-8' });
}

export function registerDemosSidebar(
  entry: { link: string; zh: string; en: string },
  categoryEn: string,
) {
  const targetFile = resolve(
    __dirname,
    '../../../packages/docs/.vitepress/config/demos-sidebar.json',
  );

  const sidebar = JSON.parse(fs.readFileSync(targetFile, { encoding: 'utf-8' })) as {
    zh: string;
    en: string;
    items: { link: string; zh: string; en: string }[];
  }[];

  const category = sidebar.find(item => item.en === categoryEn);
  if (!category) {
    throw new Error(`Demos sidebar category not found: ${categoryEn}`);
  }

  if (category.items.some(item => item.link === entry.link)) {
    return;
  }

  category.items.push(entry);
  category.items.sort((a, b) => a.link.localeCompare(b.link));

  fs.writeFileSync(targetFile, `${JSON.stringify(sidebar, null, 2)}\n`, { encoding: 'utf-8' });
}
