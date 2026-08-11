import { mount } from '@vue/test-utils';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { describe, expect, test } from 'vitest';
import { useHighlightOption } from '../src/hooks/useHighlight';
import {
  HSelectFilterInputValueInjectKey,
  HSelectHighlightContentRangesInjectKey,
  HSelectHighlightDescriptionRangesInjectKey,
} from '../src/utils/injectKeys';

describe('Select highlight browser branches', () => {
  test('tracks and removes real DOM ranges for input and panel keywords', async () => {
    const content = document.createElement('span');
    content.textContent = 'Alpha label';
    const description = document.createElement('span');
    description.textContent = 'Alpha description';
    const contentRef = ref<HTMLElement>();
    const descriptionRef = ref<HTMLElement>();
    contentRef.value = content;
    descriptionRef.value = description;
    const filterInputValue = ref('');
    const contentRanges = ref(new Map<unknown, Range>());
    const descriptionRanges = ref(new Map<unknown, Range>());
    const selectProps = reactive({ panelFilterInputValue: '', descriptionFilterable: true });
    let api!: ReturnType<typeof useHighlightOption>;
    const Harness = defineComponent({
      setup() {
        api = useHighlightOption(selectProps as any, { value: 'a' } as any, {
          contentDomRef: contentRef,
          descriptionDomRef: descriptionRef,
        });
        api.startWatch();
        return () => <div data-highlight-harness />;
      },
    });
    const wrapper = mount(Harness, {
      global: {
        provide: {
          [HSelectFilterInputValueInjectKey as symbol]: filterInputValue,
          [HSelectHighlightContentRangesInjectKey as symbol]: contentRanges,
          [HSelectHighlightDescriptionRangesInjectKey as symbol]: descriptionRanges,
        },
      },
    });

    filterInputValue.value = 'alpha';
    await nextTick();
    expect(contentRanges.value.get('a')?.toString()).toBe('Alpha');
    expect(descriptionRanges.value.get('a')?.toString()).toBe('Alpha');

    filterInputValue.value = 'missing';
    await nextTick();
    expect(contentRanges.value.has('a')).toBe(false);
    expect(descriptionRanges.value.has('a')).toBe(false);

    contentRef.value = undefined;
    descriptionRef.value = undefined;
    filterInputValue.value = 'alpha';
    await nextTick();
    expect(contentRanges.value.has('a')).toBe(false);
    expect(descriptionRanges.value.has('a')).toBe(false);

    descriptionRef.value = description;
    selectProps.descriptionFilterable = false;
    filterInputValue.value = '';
    selectProps.panelFilterInputValue = 'alpha';
    await nextTick();
    expect(descriptionRanges.value.has('a')).toBe(false);

    selectProps.panelFilterInputValue = '';
    await nextTick();
    expect(contentRanges.value.has('a')).toBe(false);
    api.stopWatch();
    wrapper.unmount();
  });

  test('allows stopping before a watcher is started', () => {
    const Harness = defineComponent({
      setup() {
        const api = useHighlightOption({ panelFilterInputValue: '' } as any, { value: 'b' } as any, {
          contentDomRef: ref(),
          descriptionDomRef: ref(),
        });
        api.stopWatch();
        return () => <div />;
      },
    });
    mount(Harness, {
      global: {
        provide: {
          [HSelectFilterInputValueInjectKey as symbol]: ref(''),
          [HSelectHighlightContentRangesInjectKey as symbol]: ref(new Map()),
          [HSelectHighlightDescriptionRangesInjectKey as symbol]: ref(new Map()),
        },
      },
    });
    expect(true).toBe(true);
  });
});
