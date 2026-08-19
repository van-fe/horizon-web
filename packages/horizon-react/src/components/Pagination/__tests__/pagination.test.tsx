import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider, Pagination } from '../../../index';
import type { PaginationHandle } from '..';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';

function setNativeValue(element: HTMLInputElement | HTMLSelectElement, value: string): void {
  const prototype =
    element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(element, value);
}

describe('React Pagination', () => {
  it('renders native navigation, provider labels, regions and range copy', async () => {
    await render(
      h(
        HorizonWebProvider,
        {
          paginationLabels: {
            navigation: 'Results pagination',
            pageSizeSelection: 'Rows per page',
            rangeTotal: '{range} / {total}',
          },
        },
        h(Pagination, {
          defaultValue: 2,
          prefix: h('strong', { 'data-prefix': true }, 'Before'),
          suffix: h('strong', { 'data-suffix': true }, 'After'),
          total: 35,
        }),
      ),
    );
    const root = getContainer().querySelector('nav')!;

    expect(root.getAttribute('aria-label')).toBe('Results pagination');
    expect(root.classList.contains('h-pagination--medium')).toBe(true);
    expect(root.classList.contains('h-pagination--right')).toBe(true);
    expect(root.querySelector('.h-pagination__total')?.textContent).toBe('11-20 / 35');
    expect(root.querySelector('[aria-current="page"]')?.textContent).toBe('2');
    expect(root.querySelector('select')?.getAttribute('aria-label')).toBe('Rows per page');
    expect(root.querySelector('[data-prefix]')?.textContent).toBe('Before');
    expect(root.querySelector('[data-suffix]')?.textContent).toBe('After');
  });

  it('handles uncontrolled pages, collapsed windows, callbacks and the focus command', async () => {
    const onChange = vi.fn();
    const onPageChange = vi.fn();
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    const onCurrentPageClick = vi.fn();
    const paginationRef = createRef<PaginationHandle>();
    await render(
      h(Pagination, {
        defaultValue: 5,
        layout: 'pager',
        onChange,
        onCurrentPageClick,
        onNext,
        onPageChange,
        onPrevious,
        pagerCount: 5,
        ref: paginationRef,
        total: 200,
      }),
    );

    await click(getContainer().querySelector('[data-num="prev"]')!);
    expect(onPageChange).toHaveBeenLastCalledWith(2);
    expect(onChange).toHaveBeenLastCalledWith(2, 10);
    expect(getContainer().querySelector('[aria-current="page"]')?.textContent).toBe('2');

    await click(getContainer().querySelector('[aria-label="Previous page"]')!);
    expect(onPrevious).toHaveBeenCalledWith(1);
    await click(getContainer().querySelector('[aria-label="Next page"]')!);
    expect(onNext).toHaveBeenCalledWith(2);
    await click(getContainer().querySelector('[data-page="2"]')!);
    expect(onCurrentPageClick).toHaveBeenCalledWith(2);

    paginationRef.current?.focus(2);
    expect(document.activeElement).toBe(getContainer().querySelector('[data-page="2"]'));
    expect(paginationRef.current?.root?.tagName).toBe('NAV');
  });

  it('keeps controlled pages authoritative until the parent updates them', async () => {
    const onChange = vi.fn();
    const onPageChange = vi.fn();
    await render(h(Pagination, { layout: 'pager', onChange, onPageChange, total: 50, value: 2 }));

    await click(getContainer().querySelector('[data-page="3"]')!);
    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(onChange).toHaveBeenCalledWith(3, 10);
    expect(getContainer().querySelector('[aria-current="page"]')?.textContent).toBe('2');

    await render(h(Pagination, { layout: 'pager', onChange, onPageChange, total: 50, value: 3 }));
    expect(getContainer().querySelector('[aria-current="page"]')?.textContent).toBe('3');

    await render(h(Pagination, { onChange, total: 50, value: 2, variant: 'simplest' }));
    const simplestInput = getContainer().querySelector('input')!;
    setNativeValue(simplestInput, '4');
    await dispatch(simplestInput, new Event('input', { bubbles: true }));
    expect(onChange).toHaveBeenLastCalledWith(4, 10);
    expect((getContainer().querySelector('input') as HTMLInputElement).value).toBe('2');
  });

  it('changes page size, clamps the page and reports one semantic change', async () => {
    const onChange = vi.fn();
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    await render(
      h(Pagination, {
        defaultValue: 10,
        onChange,
        onPageChange,
        onPageSizeChange,
        pageSizes: [10, 20],
        total: 100,
      }),
    );
    const select = getContainer().querySelector('select')!;
    setNativeValue(select, '20');
    await dispatch(select, new Event('change', { bubbles: true }));

    expect(onPageSizeChange).toHaveBeenCalledWith(20);
    expect(onPageChange).toHaveBeenCalledWith(5);
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(5, 20);
    expect(getContainer().querySelector('[aria-current="page"]')?.textContent).toBe('5');
  });

  it('supports jump and simplest inputs while respecting disabled boundaries', async () => {
    const onJump = vi.fn();
    const onChange = vi.fn();
    await render(h(Pagination, { layout: 'jumper', onChange, onJump, total: 100 }));
    const jumpInput = getContainer().querySelector('input')!;
    setNativeValue(jumpInput, '7');
    await dispatch(jumpInput, new Event('input', { bubbles: true }));
    await dispatch(jumpInput, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));

    expect(onJump).toHaveBeenCalledWith(7);
    expect(onChange).toHaveBeenCalledWith(7, 10);
    expect(jumpInput.value).toBe('');

    await render(h(Pagination, { defaultValue: 2, total: 30, variant: 'simplest' }));
    const simplestInput = getContainer().querySelector('input')!;
    setNativeValue(simplestInput, '3');
    await dispatch(simplestInput, new Event('input', { bubbles: true }));
    expect((getContainer().querySelector('input') as HTMLInputElement).value).toBe('3');
    expect(
      (getContainer().querySelector('[aria-label="Next page"]') as HTMLButtonElement).disabled,
    ).toBe(true);

    await render(h(Pagination, { disabled: true, total: 30, variant: 'simplest' }));
    expect(
      [...getContainer().querySelectorAll('button, input')].every(
        element => (element as HTMLButtonElement).disabled,
      ),
    ).toBe(true);
  });

  it('hides a single page without unmounting its semantic root', async () => {
    await render(h(Pagination, { hideOnSinglePage: true, total: 1 }));
    const root = getContainer().querySelector('nav')!;
    expect(root.hidden).toBe(true);
    expect(getComputedStyle(root).display).toBe('none');
    expect(root.querySelector('[data-page="1"]')).not.toBeNull();
  });
});
