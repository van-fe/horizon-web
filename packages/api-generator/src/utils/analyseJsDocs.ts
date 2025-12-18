import type { ts } from 'ts-morph';

type StatementJsDocTagName =
  | 'params'
  | 'param'
  | 'deprecated'
  | 'version'
  | 'return'
  | 'returns'
  | string;

export interface StatementJsDoc {
  comment: string;
  tags: Record<StatementJsDocTagName, Record<string, string>>;
}

export default function (node: ts.Node) {
  const jsDoc = node?.jsDoc?.[0];

  const res: StatementJsDoc = {
    comment: jsDoc?.comment?.toString() || '',
    tags: {},
  };

  (jsDoc?.tags || []).forEach(tag => {
    const tagName = tag.tagName.getText().replace(/['"]/g, '');
    const name = tag.name?.getText().replace(/['"]/g, '') || 'default';

    if (!res.tags[tagName]) {
      res.tags[tagName] = {};
    }

    res.tags[tagName][name] = tag.comment?.toString() || '';
  });

  return res;
}
