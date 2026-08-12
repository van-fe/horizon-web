import type { AnchorListItem, AnchorOffset } from './contract';

export interface AnchorHeadingEntry {
  id?: string;
  title?: string;
  level: number;
}

export interface AnchorSectionPosition {
  link: string;
  top: number;
}

/** 将命名偏移转换为像素值。 @en Converts a named alignment offset into pixels. */
export function resolveAnchorOffset(
  offset: AnchorOffset,
  containerHeight: number,
  targetHeight: number,
): number {
  if (typeof offset === 'number') return offset;
  if (offset === 'center') return containerHeight / 2 - targetHeight / 2;
  if (offset === 'end') return containerHeight - targetHeight;
  return 0;
}

/** 从已越过边界的章节中选择最接近边界的链接。 @en Selects the section nearest the boundary among sections that crossed it. */
export function resolveActiveAnchorLink(
  sections: readonly AnchorSectionPosition[],
  boundaryOffset: number,
): string {
  let active: AnchorSectionPosition | undefined;
  for (const section of sections) {
    if (section.top >= boundaryOffset) continue;
    if (!active || section.top > active.top) active = section;
  }
  return active?.link ?? '';
}

function buildLevel(entries: readonly AnchorHeadingEntry[], level: number): AnchorListItem[] {
  if (entries.length === 0) return [];
  const indexes = entries
    .map((entry, index) => ({ entry, index }))
    .filter(item => item.entry.level === level);
  if (indexes.length === 0) {
    return [{ children: buildLevel(entries, level + 1) }];
  }
  if (indexes[0].index !== 0) {
    indexes.unshift({ entry: { level }, index: -1 });
  }
  return indexes.map((item, index) => {
    const end = indexes[index + 1]?.index ?? entries.length;
    return {
      id: item.entry.id,
      title: item.entry.title,
      children: buildLevel(entries.slice(item.index + 1, end), level + 1),
    };
  });
}

/** 根据按文档顺序排列的标题构建嵌套目录。 @en Builds a nested table of contents from document-ordered headings. */
export function buildAnchorList(entries: readonly AnchorHeadingEntry[]): AnchorListItem[] {
  return buildLevel(entries, 0);
}
