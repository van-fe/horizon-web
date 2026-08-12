import { describe, expect, it } from 'vitest';
import {
  DESCRIPTION_ITEM_DEFAULTS,
  DESCRIPTIONS_DEFAULTS,
  descriptionItemManifest,
  descriptionsManifest,
  isDescriptionGridSpan,
  resolveDescriptionBreakpoint,
  resolveDescriptionResponsiveValue,
} from '..';

describe('Descriptions contract', () => {
  it('publishes stable defaults and manifests', () => {
    expect(DESCRIPTIONS_DEFAULTS).toEqual({
      title: '',
      border: false,
      type: 'horizontal',
      column: 1,
      labelPosition: 'left',
    });
    expect(DESCRIPTION_ITEM_DEFAULTS).toEqual({ label: '', value: '--', spanCol: 1, spanRow: 1 });
    expect(descriptionsManifest.contract.slots.map(field => field.name)).toEqual([
      'content',
      'title',
    ]);
    expect(descriptionItemManifest.contract.slots.map(field => field.name)).toEqual([
      'content',
      'label',
    ]);
  });

  it('resolves every responsive boundary', () => {
    expect([455, 456, 759, 760, 1175, 1176, 1655, 1656].map(resolveDescriptionBreakpoint)).toEqual([
      'xs',
      'sm',
      'sm',
      'md',
      'md',
      'lg',
      'lg',
      'xl',
    ]);
    const values = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };
    expect(
      [400, 600, 900, 1300, 1700].map(width => resolveDescriptionResponsiveValue(width, 6, values)),
    ).toEqual([1, 2, 3, 4, 5]);
    expect(resolveDescriptionResponsiveValue(400, 6, {})).toBe(6);
  });

  it('accepts only positive integer grid values', () => {
    expect(isDescriptionGridSpan(1)).toBe(true);
    expect(isDescriptionGridSpan(0)).toBe(false);
    expect(isDescriptionGridSpan(1.5)).toBe(false);
  });
});
