import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/utils';
import { kebabCase } from '@aurora/utils';
import type { OtherInfo } from '../index';

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

  return `<n-link anchor="${
    currMode?.name
  }" anchor-position="left" type="text" class="no-underline h1">${showName}</n-link>
<div class="description">${currMode?.desc}</div>`
    .replace(/\\n\s*/g, '<br>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)]\((.*?)\)/g, '<n-link href="$2" target="_blank">$1</n-link>');
}
