import { afterEach, describe, expect, it } from 'vitest';
import { measureBreadcrumbLayout } from '../index';

afterEach(() => document.body.replaceChildren());

describe('Breadcrumb browser primitives', () => {
  it('measures the expanded hierarchy and excludes endpoint items from collapse candidates', () => {
    const root = document.createElement('div');
    root.style.cssText = 'box-sizing:border-box;width:240px';
    const widths = [40, 70, 80, 50];
    for (const width of widths) {
      const item = document.createElement('span');
      item.dataset.breadcrumbItem = '';
      item.style.cssText = `display:inline-block;width:${width}px`;
      root.append(item);
    }
    const ellipsis = document.createElement('span');
    ellipsis.dataset.breadcrumbEllipsisMeasure = '';
    ellipsis.style.cssText = 'position:absolute;display:inline-block;width:24px';
    root.append(ellipsis);
    document.body.append(root);

    const measurement = measureBreadcrumbLayout(root);

    expect(measurement.containerWidth).toBe(240);
    expect(measurement.contentWidth).toBe(240);
    expect(measurement.collapsibleItemWidths).toEqual([70, 80]);
    expect(measurement.ellipsisWidth).toBe(24);
  });
});
