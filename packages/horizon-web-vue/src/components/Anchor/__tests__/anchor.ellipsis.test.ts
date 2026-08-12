import { effectScope, nextTick, reactive, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import type { AnchorLinkProps } from '../src/composables/useProps';
import { useCustomEllipsis } from '../src/composables/useCustomEllipsis';
import { useAnchorEmits } from '../src/composables/useEmits';

async function flushTicks(count = 12) {
  for (let index = 0; index < count; index += 1) await nextTick();
}

describe('Anchor ellipsis and validators', () => {
  test('keeps an empty or unsuffixed title stable and updates tooltip state', async () => {
    const scope = effectScope();
    const props = reactive({ title: undefined }) as AnchorLinkProps;
    const showSuffix = ref(false);
    const judgeIsOverflow = vi.fn(() => false);
    const updateHighlightLine = vi.fn();
    const result = scope.run(() =>
      useCustomEllipsis(props, showSuffix, ref(0), judgeIsOverflow, ref(''), updateHighlightLine),
    )!;

    await flushTicks();
    expect(result.displayTitle.value).toBe('');
    expect(result.tooltipDisabled.value).toBe(true);

    props.title = 'Plain title';
    await flushTicks();
    expect(result.displayTitle.value).toBe('Plain title');
    expect(result.titleSuffix.value).toBe('');
    expect(result.tooltipDisabled.value).toBe(true);

    judgeIsOverflow.mockReturnValue(true);
    await result.reRenderEllipsis();
    await flushTicks();
    expect(result.tooltipDisabled.value).toBe(false);
    expect(updateHighlightLine).toHaveBeenCalledWith('');
    scope.stop();
  });

  test('bisects overflowing suffixed titles and rerenders after title changes', async () => {
    const scope = effectScope();
    const props = reactive({ title: 'ABCD' }) as AnchorLinkProps;
    const judgeIsOverflow = vi
      .fn<() => boolean>()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    const result = scope.run(() =>
      useCustomEllipsis(props, ref(true), ref(3), judgeIsOverflow, ref('#active'), vi.fn()),
    )!;

    await flushTicks(20);
    expect(result.displayTitle.value.length).toBeLessThanOrEqual(4);
    expect(result.titleSuffix.value).toMatch(/（3）$/);
    expect(result.showCustomEllipsis.value).toBe(true);

    props.title = 'XY';
    await flushTicks();
    expect(result.displayTitle.value).toContain('X');
    await result.reRenderEllipsis();
    await flushTicks();
    expect(judgeIsOverflow).toHaveBeenCalled();
    scope.stop();
  });

  test('validates each public emit with valid and invalid payload combinations', () => {
    const mouse = new MouseEvent('click');
    expect(useAnchorEmits.click({ href: '#a', title: 'A' }, mouse)).toBe(true);
    expect(useAnchorEmits.click(null as never, mouse)).toBe(false);
    expect(useAnchorEmits.click(null as never, new Event('change') as MouseEvent)).toBe(false);
    expect(useAnchorEmits.change('#a', '')).toBe(true);
    expect(useAnchorEmits.change(null as never, '#old')).toBe(false);
    expect(useAnchorEmits.change(null as never, null as never)).toBe(false);
    expect(useAnchorEmits['update:collapse'](true)).toBe(true);
    expect(useAnchorEmits['update:collapse']('true' as never)).toBe(false);
  });
});
