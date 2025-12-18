import { getHeadingContent } from './utils';

export default function (content: string) {
  return content.replace(/<h3>(.*?)<\/h3>/g, h3 => {
    const title = h3.replace(/<.*?>/g, '');
    return getHeadingContent(title, 'h3');
  });
}

export function parseNormalAnchor(content: string) {
  return content.replace(/<h3>(.*?)<\/h3>/g, h3 => {
    const title = h3.replace(/<.*?>/g, '');

    return getHeadingContent(title, 'h3');
  });
}
