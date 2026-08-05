import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import componentsAnalysis from '../../../api-generator/dist/components-analysis.json';
import directivesAnalysis from '../../../api-generator/dist/directives-analysis.json';
import methodsAnalysis from '../../../api-generator/dist/methods-analysis.json';
import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/utils';
import { pascalize } from '@aurora/utils';
import appendApi from '../markdown-analyse/utils/appendApi';
import appendPluginInfo from '../markdown-analyse/utils/appendPluginInfo';

const components = componentsAnalysis as unknown as ApiGeneratorAnalysedComponentDetail[];
const directives = directivesAnalysis as unknown as ApiGeneratorAnalysedDirectiveDetail[];
const methods = methodsAnalysis as unknown as ApiGeneratorAnalysedMethodDetail[];

function localizeApi<T>(value: T, locale: string): T {
  if (Array.isArray(value)) {
    return value.map(item => localizeApi(item, locale)) as T;
  }
  if (!value || typeof value !== 'object') return value;

  const source = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  Object.entries(source).forEach(([key, item]) => {
    if (key === 'descLocales') return;
    result[key] = localizeApi(item, locale);
  });
  if (typeof source.desc === 'string') {
    const locales = source.descLocales as Record<string, string> | undefined;
    result.desc = locales?.[locale] || source.desc;
  }
  return result as T;
}

function localizeApiLabels(html: string, locale: string) {
  if (locale !== 'en') return html;
  return (
    html
      // Replace the compound labels before their shorter Chinese substrings.
      .replaceAll('入参/出参说明', 'Input/Output Description')
      .replaceAll('入参/出参类型', 'Input/Output Type')
      .replaceAll('入参/出参名', 'Input/Output')
      .replaceAll('参数说明', 'Parameter Description')
      .replaceAll('参数类型', 'Parameter Type')
      .replaceAll('参数名', 'Parameter')
      .replaceAll('属性', 'Name')
      .replaceAll('说明', 'Description')
      .replaceAll('类型', 'Type')
      .replaceAll('是否必填', 'Required')
      .replaceAll('必填', 'Required')
      .replaceAll('默认值', 'Default')
      .replaceAll('>是<', '>Yes<')
      .replaceAll('>否<', '>No<')
  );
}

function createHtmlToken(
  state: { Token: new (type: string, tag: string, nesting: number) => Token },
  content: string,
) {
  const token = new state.Token('html_block', '', 0);
  token.content = content;
  return token;
}

/** Automatically adds component introduction and generated API to demo pages. */
export default function autoComponentDocs(md: MarkdownIt) {
  md.core.ruler.after('block', 'auto-component-docs', state => {
    const filePath = String(
      (state.env as { path?: string; filePath?: string }).path ||
        (state.env as { filePath?: string }).filePath ||
        '',
    );
    const match = filePath.match(
      /[\\/]demos[\\/](components|directives|methods)[\\/]([^\\/]+)\.md$/i,
    );

    if (!match) {
      return;
    }

    const locale = /[\\/]en[\\/]/i.test(filePath) ? 'en' : 'zh-CN';
    const kind = match[1].toLowerCase() as 'components' | 'directives' | 'methods';
    const rawName = match[2];
    let intro = '';
    let api = '';

    if (kind === 'components') {
      const name = pascalize(rawName);
      const component = components.find(item => item.name.toLowerCase() === name.toLowerCase());
      const related = components.filter(
        item => item.parentComponentName.toLowerCase() === name.toLowerCase(),
      );
      if (!component && !related.length) return;
      const modes = related.length ? related : [component!];
      if (component) {
        intro = appendPluginInfo(localizeApi(component, locale), kind);
      } else {
        intro = appendPluginInfo({ ...localizeApi(related[0], locale), name }, kind);
      }
      api = modes
        .map(mode => localizeApiLabels(appendApi(localizeApi(mode, locale), true, kind), locale))
        .join('');
    } else if (kind === 'directives') {
      const name = pascalize(rawName.replace(/^v-/, ''));
      const directive = directives.find(item => item.name.toLowerCase() === name.toLowerCase());
      if (!directive) return;
      intro = appendPluginInfo(localizeApi(directive, locale), kind);
      api = localizeApiLabels(appendApi(localizeApi(directive, locale), true, kind), locale);
    } else {
      const name = pascalize(rawName);
      const method = methods.find(item => item.dirName.toLowerCase() === name.toLowerCase());
      if (!method) return;
      const related = methods.filter(item => item.dirName.toLowerCase() === name.toLowerCase());
      intro = appendPluginInfo({ ...localizeApi(method, locale), name: method.dirName }, kind);
      api = related
        .map(mode =>
          localizeApiLabels(appendApi(localizeApi(mode, locale), related.length > 1, kind), locale),
        )
        .join('');
    }

    state.tokens.unshift(createHtmlToken(state, `${intro}\n`));
    state.tokens.push(createHtmlToken(state, `\n${api}`));
  });
}
