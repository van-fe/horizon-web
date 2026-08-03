import type { ts } from 'ts-morph';

type StatementJsDocTagName =
  | 'params'
  | 'param'
  | 'paramEn'
  | 'version'
  | 'return'
  | 'returns'
  | string;

export interface StatementJsDoc {
  comment: string;
  tags: Record<StatementJsDocTagName, Record<string, string>>;
  locales: Record<string, string>;
}

export default function (node: ts.Node) {
  const jsDoc = node?.jsDoc?.[0];

  const res: StatementJsDoc = {
    comment: jsDoc?.comment?.toString() || '',
    tags: {},
    locales: {},
  };

  (jsDoc?.tags || []).forEach(tag => {
    const tagName = tag.tagName.getText().replace(/['"]/g, '');
    const name = tag.name?.getText().replace(/['"]/g, '') || 'default';

    if (/^[a-z]{2}(?:-[A-Z]{2})?$/.test(tagName)) {
      res.locales[tagName] = tag.comment?.toString() || '';
      return;
    }

    if (tagName === 'locale' && tag.name) {
      res.locales[name] = tag.comment?.toString() || '';
      return;
    }

    if (tagName === 'paramEn') {
      if (!res.tags.paramEn) res.tags.paramEn = {};
      const raw = tag.comment?.toString() || '';
      // TypeScript does not assign `name` for custom @param-like tags.
      const match = raw.match(/^([\w$]+)\s+([\s\S]*)$/);
      res.tags.paramEn[tag.name?.getText() || match?.[1] || name] = tag.name
        ? raw
        : match?.[2] || raw;
      return;
    }

    // Version markers are intentionally ignored. API metadata is not a
    // changelog and the project no longer exposes version annotations.
    if (tagName === 'version') return;

    if (!res.tags[tagName]) {
      res.tags[tagName] = {};
    }

    res.tags[tagName][name] = tag.comment?.toString() || '';
  });

  return res;
}
