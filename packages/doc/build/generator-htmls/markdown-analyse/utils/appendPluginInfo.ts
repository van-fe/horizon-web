import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@nio-fe/shared';
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
    .replace(/\[(.*?)]\((.*?)\)/g, '<n-link href="$2" target="_blank">$1</n-link>');
}
