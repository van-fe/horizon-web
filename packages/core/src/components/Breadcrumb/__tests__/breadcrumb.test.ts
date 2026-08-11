import { describe, expect, it } from 'vitest';
import {
  BREADCRUMB_DEFAULTS,
  BREADCRUMB_ITEM_DEFAULTS,
  breadcrumbApiContract,
  breadcrumbItemApiContract,
  calculateBreadcrumbCollapseCount,
  isBreadcrumbDisplayType,
  isBreadcrumbItemClickable,
  isBreadcrumbSize,
  resolveBreadcrumbNavigation,
} from '..';

describe('Breadcrumb contract', () => {
  it('owns defaults and validators for both renderers', () => {
    expect(breadcrumbApiContract.defaults).toBe(BREADCRUMB_DEFAULTS);
    expect(breadcrumbItemApiContract.defaults).toBe(BREADCRUMB_ITEM_DEFAULTS);
    expect(isBreadcrumbSize('small')).toBe(true);
    expect(isBreadcrumbSize('large')).toBe(false);
    expect(isBreadcrumbDisplayType('ellipsis')).toBe(true);
    expect(isBreadcrumbDisplayType('hidden')).toBe(false);
  });

  it('resolves item interaction and navigation without renderer types', () => {
    expect(isBreadcrumbItemClickable({})).toBe(false);
    expect(isBreadcrumbItemClickable({ clickable: true })).toBe(true);
    expect(isBreadcrumbItemClickable({ route: '' })).toBe(true);
    expect(resolveBreadcrumbNavigation({ route: '/guide' }, false)).toBe('none');
    expect(resolveBreadcrumbNavigation({ route: '/guide' }, true)).toBe('push');
    expect(resolveBreadcrumbNavigation({ route: '/guide', replace: true }, true)).toBe('replace');
  });

  it('collapses only as many middle items as the measured width requires', () => {
    expect(
      calculateBreadcrumbCollapseCount({
        containerWidth: 300,
        contentWidth: 280,
        collapsibleItemWidths: [80, 80],
        ellipsisWidth: 24,
      }),
    ).toBe(0);
    expect(
      calculateBreadcrumbCollapseCount({
        containerWidth: 220,
        contentWidth: 320,
        collapsibleItemWidths: [80, 70, 60],
        ellipsisWidth: 30,
      }),
    ).toBe(2);
    expect(
      calculateBreadcrumbCollapseCount({
        containerWidth: 20,
        contentWidth: 320,
        collapsibleItemWidths: [80, 70],
        ellipsisWidth: 30,
      }),
    ).toBe(2);
  });
});
