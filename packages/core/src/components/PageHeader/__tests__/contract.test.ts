import { describe, expect, it } from 'vitest';
import { PAGE_HEADER_DEFAULTS, pageHeaderApiContract, pageHeaderManifest } from '..';

describe('PageHeader contract', () => {
  it('defines renderer-neutral defaults', () => {
    expect(PAGE_HEADER_DEFAULTS).toEqual({
      showBack: true,
      useDivider: true,
      disabledHeaderTooltip: false,
    });
    expect(pageHeaderApiContract.defaults).toBe(PAGE_HEADER_DEFAULTS);
  });

  it('publishes the complete semantic regions and back event', () => {
    expect(pageHeaderManifest.contract.emits.map(field => field.name)).toEqual(['back']);
    expect(pageHeaderManifest.contract.slots.map(field => field.name)).toEqual([
      'body',
      'backIcon',
      'header',
      'title',
      'titleContainer',
      'tags',
      'description',
      'actions',
      'breadcrumb',
    ]);
  });
});
