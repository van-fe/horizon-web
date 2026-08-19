import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test } from 'vitest';
import HPopover from '../../Popover/src/Popover';
import HOption from '../src/Option';
import HSelect from '../src/Select';
import { sleep } from '~/utils/tools';

describe('Select tag rendering branches', () => {
  test('summarizes an all-selected model and clears it from the real close control', async () => {
    const value = ref<any[]>(['a', 'b']);
    const wrapper = mount(() => (
      <HSelect
        v-model={value.value}
        multiple
        toBody={false}
        options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
        useCheckAllSummary
        checkAllSummaryText="Everything"
        collapseTagsTooltip={false}
      />
    ));
    await nextTick();

    expect(wrapper.text()).toContain('Everything');
    await wrapper.get('.h-tag__close').trigger('click');
    expect(value.value).toEqual([]);
  });

  test('renders and removes unmatched values through the scoped tagRender slot', async () => {
    const value = ref<any[]>(['remote']);
    const wrapper = mount(() => (
      <HSelect
        v-model={value.value}
        multiple
        toBody={false}
        options={[]}
        showValueUnMatch
        v-slots={{
          tagRender: (option: any) => <span data-unmatched>{option.value}</span>,
        }}
      />
    ));
    await nextTick();

    expect(wrapper.get('[data-unmatched]').text()).toBe('remote');
    // Custom tag render owns its close affordance; controlled value remains untouched.
    expect(value.value).toEqual(['remote']);
  });

  test('renders, hides and closes an unmatched value with the built-in tag contract', async () => {
    const value = ref<unknown[]>(['remote']);
    const showValueUnMatch = ref(true);
    const wrapper = mount(() => (
      <HSelect
        v-model={value.value}
        multiple
        toBody={false}
        options={[]}
        showValueUnMatch={showValueUnMatch.value}
      />
    ));
    await nextTick();

    expect(wrapper.get('.h-tag').text()).toBe('remote');
    showValueUnMatch.value = false;
    await nextTick();
    expect(wrapper.find('.h-tag').exists()).toBe(false);

    showValueUnMatch.value = true;
    await nextTick();
    await wrapper.get('.h-tag__close').trigger('click');
    expect(value.value).toEqual([]);
  });

  test('preserves a previously rendered option tag when its remote option is removed', async () => {
    const value = ref<unknown[]>(['a']);
    const options = ref<Array<{ value: string; label: string }>>([
      { value: 'a', label: 'Alpha' },
    ]);
    const wrapper = mount(() => (
      <HSelect v-model={value.value} multiple toBody={false} options={options.value} />
    ));
    await nextTick();
    expect(wrapper.get('.h-tag').text()).toBe('Alpha');

    options.value = [];
    await nextTick();
    expect(wrapper.get('.h-tag').text()).toBe('Alpha');
  });

  test('renders option label slots and protects disabled option tags from close', async () => {
    const value = ref<unknown[]>(['a', 'disabled']);
    const wrapper = mount(() => (
      <HSelect v-model={value.value} multiple toBody={false}>
        <HOption value="a" v-slots={{ label: () => 'Slot Alpha' }} />
        <HOption value="disabled" label="Disabled" disabled />
      </HSelect>
    ));
    await nextTick();

    const tags = wrapper.findAll('.h-tag');
    expect(tags.map(tag => tag.text())).toEqual(['Slot Alpha', 'Disabled']);
    expect(tags[0].find('.h-tag__close').exists()).toBe(true);
    expect(tags[1].find('.h-tag__close').exists()).toBe(false);
    await tags[0].get('.h-tag__close').trigger('click');
    expect(value.value).toEqual(['disabled']);
  });

  test('uses localized all-selected summary and enables its real popover tooltip', async () => {
    const value = ref<unknown[]>(['a', 'b']);
    const wrapper = mount(() => (
      <HSelect
        v-model={value.value}
        multiple
        toBody={false}
        options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
        useCheckAllSummary
        collapseTagsTooltip
      />
    ));
    await nextTick();

    expect(wrapper.findAll('.h-tag').some(tag => tag.text().length > 0)).toBe(true);
    const summaryPopover = wrapper
      .findAllComponents(HPopover)
      .find(popover => popover.find('.h-tag').exists());
    expect(summaryPopover?.props('disabled')).toBe(false);
    await summaryPopover?.get('.h-popover__reference').trigger('mouseenter');
    await sleep(0);
    await nextTick();
    expect(summaryPopover?.get('.h-popover__popper').isVisible()).toBe(true);
    expect(summaryPopover?.get('.h-popover__popper').text()).toContain('A');
    expect(summaryPopover?.get('.h-popover__popper').text()).toContain('B');
    wrapper.unmount();
  });

  test('moves non-closable picker tags into the opened panel with real styles', async () => {
    const value = ref<unknown[]>(['a', 'b']);
    const wrapper = mount(
      () => (
        <HSelect v-model={value.value} multiple showTagsInPanel toBody={false}>
          <HOption value="a" label="Alpha" />
          <HOption value="b" label="Beta" />
        </HSelect>
      ),
      { attachTo: document.body },
    );
    await nextTick();

    expect(wrapper.find('.h-picker__input .h-tag__close').exists()).toBe(false);
    await wrapper.findComponent(HSelect).trigger('click');
    await sleep(0);
    const panelTags = wrapper.get('.h-select__panel-tags');
    expect(panelTags.isVisible()).toBe(true);
    expect(panelTags.text()).toContain('Alpha');
    expect(panelTags.text()).toContain('Beta');
    expect(panelTags.findAll('.h-tag__close')).toHaveLength(2);
    wrapper.unmount();
  });
});
