import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/utils';
import { kebabCase } from '@aurora/utils';
import type { OtherInfo } from '../index';
import { escapeHtml, getHeadingId } from './utils';

export const AUTO_COMPONENT_DOCS_TITLE_MARKER = 'data-auto-component-docs-title';

export default function (
  currMode:
    | ApiGeneratorAnalysedComponentDetail
    | ApiGeneratorAnalysedDirectiveDetail
    | ApiGeneratorAnalysedMethodDetail
    | OtherInfo,
  modeType: 'components' | 'directives' | 'methods' | 'others',
) {
  let showName = '';

  switch (modeType) {
    case 'components':
      showName = currMode?.name;
      break;
    case 'directives':
      showName = `v-${kebabCase(currMode.name)}`;
      break;
    case 'methods':
      showName = (currMode as ApiGeneratorAnalysedMethodDetail).dirName;
      break;
    case 'others':
      showName = (currMode as OtherInfo).name;
      break;
  }

  const description = currMode?.desc ? escapeHtml(currMode.desc) : '';
  const headingId = getHeadingId(showName);
  const escapedName = escapeHtml(showName).replaceAll('&nbsp;', ' ');
  const heading = `<h1 id="${headingId}" tabindex="-1" ${AUTO_COMPONENT_DOCS_TITLE_MARKER}>${escapedName} <a class="header-anchor" href="#${headingId}" aria-label="Permalink to &quot;${escapedName}&quot;">​</a></h1>`;

  return `${heading}${
    description
      ? `
<p class="description">${description}</p>`
      : ''
  }`
    .replace(/\\n\s*/g, '<br>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)]\((.*?)\)/g, '<h-link href="$2" target="_blank">$1</h-link>');
}
