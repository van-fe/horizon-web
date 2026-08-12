import { describe, expect, it } from 'vitest';
import {
  ANCHOR_DEFAULTS,
  anchorManifest,
  buildAnchorList,
  isAnchorOffset,
  resolveActiveAnchorLink,
  resolveAnchorOffset,
} from '..';

describe('Anchor contract and algorithms', () => {
  it('defines defaults, validators and commands', () => {
    expect(ANCHOR_DEFAULTS.size).toBe('medium');
    expect(ANCHOR_DEFAULTS.scrollOffset).toBe('start');
    expect(isAnchorOffset('center')).toBe(true);
    expect(isAnchorOffset(-12)).toBe(true);
    expect(isAnchorOffset('middle')).toBe(false);
    expect(anchorManifest.contract.exposes.map(field => field.name)).toEqual([
      'updateActiveLink',
      'refreshAnchorList',
      'updateScrollContainer',
      'getAnchorList',
    ]);
  });

  it('resolves offsets and active sections', () => {
    expect(resolveAnchorOffset('start', 200, 40)).toBe(0);
    expect(resolveAnchorOffset('center', 200, 40)).toBe(80);
    expect(resolveAnchorOffset('end', 200, 40)).toBe(160);
    expect(resolveAnchorOffset(12, 200, 40)).toBe(12);
    expect(
      resolveActiveAnchorLink(
        [
          { link: '#a', top: -20 },
          { link: '#b', top: -4 },
          { link: '#c', top: 30 },
        ],
        5,
      ),
    ).toBe('#b');
  });

  it('builds nested lists and fills skipped levels', () => {
    expect(
      buildAnchorList([
        { id: 'a', title: 'A', level: 0 },
        { id: 'a-1', title: 'A1', level: 1 },
        { id: 'b', title: 'B', level: 0 },
      ]),
    ).toEqual([
      { id: 'a', title: 'A', children: [{ id: 'a-1', title: 'A1', children: [] }] },
      { id: 'b', title: 'B', children: [] },
    ]);
    expect(
      buildAnchorList([{ id: 'deep', title: 'Deep', level: 2 }])[0].children?.[0].children?.[0],
    ).toEqual({ id: 'deep', title: 'Deep', children: [] });
  });
});
