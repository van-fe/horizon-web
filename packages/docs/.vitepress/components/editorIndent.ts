export interface EditorSelectionRange {
  from: number;
  to: number;
}

export interface EditorIndentChange {
  from: number;
  to?: number;
  insert?: string;
}

const INDENT = '  ';

export function getEditorIndentChanges(
  source: string,
  ranges: readonly EditorSelectionRange[],
  outdent: boolean,
): EditorIndentChange[] {
  const lineStarts = new Set<number>();

  for (const range of ranges) {
    const effectiveTo =
      range.to > range.from && source[range.to - 1] === '\n' ? range.to - 1 : range.to;
    let lineStart = source.lastIndexOf('\n', range.from - 1) + 1;
    const finalLineStart = source.lastIndexOf('\n', Math.max(0, effectiveTo - 1)) + 1;

    while (lineStart <= finalLineStart) {
      lineStarts.add(lineStart);
      const nextLine = source.indexOf('\n', lineStart);
      if (nextLine < 0 || nextLine + 1 > finalLineStart) break;
      lineStart = nextLine + 1;
    }
  }

  return Array.from(lineStarts, from => {
    if (!outdent) return { from, insert: INDENT };
    if (source[from] === '\t') return { from, to: from + 1, insert: '' };
    const spaces = source.slice(from, from + INDENT.length).match(/^ +/)?.[0].length ?? 0;
    return { from, to: from + spaces, insert: '' };
  }).filter(change => change.insert || change.to !== change.from);
}
