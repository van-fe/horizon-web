import md from './markdown';
import appendPluginInfo from './utils/appendPluginInfo';
import parseDemo from './utils/parseDemo';
import parseAnchor, { parseNormalAnchor } from './utils/parseAnchor';
import appendApi from './utils/appendApi';
import componentsJson from '../../json/components-analysis.json';
import directivesJson from '../../json/directives-analysis.json';
import methodsJson from '../../json/methods-analysis.json';
import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/shared';
import { pascalize } from '@aurora/shared';
import parseCode from './utils/parseCode';

const componentsAnalysis = componentsJson as unknown as ApiGeneratorAnalysedComponentDetail[];
const directivesAnalysis = directivesJson as unknown as ApiGeneratorAnalysedDirectiveDetail[];
const methodsAnalysis = methodsJson as unknown as ApiGeneratorAnalysedMethodDetail[];

export interface OtherInfo {
  name: string;
  desc: string;
  dirName: string;
}

function renderOthers(dirName: string, source: string, filePath: string, root: string) {
  let content = md.render(source);

  content = parseDemo(content, filePath, root);
  content = parseCode(content, filePath, root);

  content = parseNormalAnchor(content);

  return {
    content,
    apiContent: '',
  };
}

function renderNormal(source: string, filePath: string, root: string) {
  let content = md.render(source);
  content = parseDemo(content, filePath, root);
  content = parseCode(content, filePath, root);

  content = parseNormalAnchor(content);

  return {
    content,
    apiContent: '',
  };
}

export default function (source: string, filePath: string, root: string) {
  const dirName = pascalize(filePath.split('/').at(-2)!.replace(/^v-/, ''));
  const dirType = filePath.split('/').at(-3)! as 'components' | 'directives' | 'methods' | 'others';

  let currMode:
    | ApiGeneratorAnalysedComponentDetail
    | ApiGeneratorAnalysedDirectiveDetail
    | ApiGeneratorAnalysedMethodDetail
    | undefined;
  const relatedModes: Array<
    | ApiGeneratorAnalysedComponentDetail
    | ApiGeneratorAnalysedDirectiveDetail
    | ApiGeneratorAnalysedMethodDetail
  > = [];
  switch (dirType) {
    case 'components':
      currMode = componentsAnalysis.find(curr => curr.name.toLowerCase() === dirName.toLowerCase());
      relatedModes.push(
        ...componentsAnalysis.filter(
          curr => curr.parentComponentName.toLowerCase() === dirName.toLowerCase(),
        ),
      );
      break;
    case 'directives':
      currMode = directivesAnalysis.find(curr => curr.name === dirName);
      relatedModes.push(currMode!);
      break;
    case 'methods':
      currMode = methodsAnalysis.find(curr => curr.dirName.toLowerCase() === dirName.toLowerCase());
      relatedModes.push(
        ...methodsAnalysis.filter(curr => curr.dirName.toLowerCase() === dirName.toLowerCase()),
      );
      break;
    case 'others':
      return renderOthers(dirName, source, filePath, root);
    default:
      return renderNormal(source, filePath, root);
  }

  if (!currMode && relatedModes.length) {
    currMode = relatedModes[0];
  }

  let content = appendPluginInfo(currMode!) + md.render(source);

  content = parseDemo(content, filePath, root);
  content = parseCode(content, filePath, root);

  const apiContent = relatedModes
    .map(mode => {
      return appendApi(mode, relatedModes.length > 1, dirType);
    })
    .join('');

  content = parseAnchor(content);

  return {
    content,
    apiContent,
  };
}
