import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/utils';
import type { OtherInfo } from '../index';

export default function (
  currMode:
    | ApiGeneratorAnalysedComponentDetail
    | ApiGeneratorAnalysedDirectiveDetail
    | ApiGeneratorAnalysedMethodDetail
    | OtherInfo,
) {
  return `<div class="description">${currMode.desc}</div>`
    .replace(/\\n\s*/g, '<br>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)]\((.*?)\)/g, '<h-link href="$2" target="_blank">$1</h-link>');
}
