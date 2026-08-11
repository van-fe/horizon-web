import { describe, expect, it } from 'vitest';
import {
  clampPaginationPage,
  formatPaginationLabel,
  getPaginationJumpTarget,
  getPaginationPageCount,
  getPaginationPagerItems,
  getPaginationRange,
  isPaginationPageSizes,
  isPaginationPagerCount,
  normalizePaginationPageSize,
  PAGINATION_DEFAULTS,
  paginationApiContract,
  resolvePaginationLayout,
  resolvePaginationPageSize,
  resolvePaginationSelection,
} from '..';

describe('Pagination contract', () => {
  it('publishes immutable defaults and validates odd pager counts', () => {
    expect(paginationApiContract.defaults).toBe(PAGINATION_DEFAULTS);
    expect(isPaginationPagerCount(7)).toBe(true);
    expect(isPaginationPagerCount(6)).toBe(false);
    expect(isPaginationPageSizes([10, 20])).toBe(true);
    expect(isPaginationPageSizes([10, 0])).toBe(false);
    expect(isPaginationPageSizes([])).toBe(false);
  });

  it('normalizes page sizes, totals and page boundaries', () => {
    expect(normalizePaginationPageSize(-20)).toBe(20);
    expect(normalizePaginationPageSize(0)).toBe(10);
    expect(getPaginationPageCount(101, 10)).toBe(11);
    expect(getPaginationPageCount(0, 10)).toBe(1);
    expect(clampPaginationPage(0, 5)).toBe(1);
    expect(clampPaginationPage(8, 5)).toBe(5);
  });

  it('resolves default, simple and simplest layouts without duplicates', () => {
    expect(resolvePaginationLayout('pager, sizes, pager, unknown', 'default')).toEqual([
      'pager',
      'sizes',
    ]);
    expect(resolvePaginationLayout(['jumper', 'total'], 'default')).toEqual(['jumper', 'total']);
    expect(resolvePaginationLayout([], 'simple')).toEqual(['total', 'pager']);
    expect(resolvePaginationLayout([], 'simplest')).toEqual(['simplest-pager']);
  });

  it('creates stable collapsed pager windows and jump targets', () => {
    expect(getPaginationPagerItems(5, 20, 5)).toEqual([1, 'jump-prev', 5, 'jump-next', 20]);
    expect(getPaginationPagerItems(1, 1, 7)).toEqual([1]);
    expect(getPaginationJumpTarget(5, 'previous', 20, 5)).toBe(2);
    expect(getPaginationJumpTarget(2, 'next', 20, 5)).toBe(5);
  });

  it('returns explicit selection reasons and clamps page-size changes', () => {
    expect(resolvePaginationSelection(1, 2, 10)).toEqual({
      accepted: true,
      page: 2,
      reason: 'change',
    });
    expect(resolvePaginationSelection(2, 2, 10).reason).toBe('same');
    expect(resolvePaginationSelection(2, 5, 10, true)).toEqual({
      accepted: false,
      page: 2,
      reason: 'disabled',
    });
    expect(resolvePaginationPageSize(10, 20, 100)).toEqual({
      page: 5,
      pageCount: 5,
      pageSize: 20,
    });
  });

  it('calculates empty and populated ranges and formats labels', () => {
    expect(getPaginationRange(3, 10, 24)).toEqual({ start: 21, end: 24, text: '21-24' });
    expect(getPaginationRange(1, 10, 0)).toEqual({ start: 0, end: 0, text: '0-0' });
    expect(formatPaginationLabel('{range} of {total}', { range: '11-20', total: 35 })).toBe(
      '11-20 of 35',
    );
  });
});
