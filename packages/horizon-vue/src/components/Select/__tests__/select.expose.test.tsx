import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '~/utils/tools';
import HPicker from '../../Picker';
import SelectHelper from './SelectHelper';
import { Fragment, nextTick, ref } from 'vue';

describe('Select.tsx', () => {
  test('change-panel-visible', async () => {
    const instance = new SelectHelper({});

    expect(instance.popover.isVisible()).eq(false);

    await instance.domRef.value?.changePanelVisible(true);
    await sleep(0);

    expect(instance.popover.isVisible()).eq(true);

    await instance.domRef.value?.changePanelVisible(false);
    await sleep(0);

    expect(instance.popover.isVisible()).eq(false);
  });

  test('focus & blur', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(
      () => (
        <Fragment>
          <HSelect toBody={false} onFocus={onFocus} onBlur={onBlur}>
            <HOption label="1" value={1} />
            <HOption label="2" value={2} />
            <HOption label="3" value={3} />
          </HSelect>
          <div id="outer"></div>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HPicker).trigger('click');

    expect(onFocus).toHaveBeenCalledOnce();

    await wrapper.find('#outer').trigger('mousedown');

    expect(onBlur).toHaveBeenCalledOnce();
  });

  test('exposes every public control through observable picker behavior', async () => {
    const value = ref<string[]>(['a']);
    const wrapper = mount(
      () => (
        <HSelect
          v-model={value.value}
          multiple
          needConfirm
          filterable
          toBody={false}
        >
          <HOption value="a" label="Alpha" />
          <HOption value="b" label="Beta" />
        </HSelect>
      ),
      { attachTo: document.body },
    );
    const exposed = wrapper.findComponent(HSelect).getCurrentComponent().exposed as unknown as {
      confirmHandle: () => void;
      cancelHandle: () => void;
      setInputAble: () => void;
      changePanelVisible: (visible: boolean) => void;
      focusOption: (value?: string) => void;
      clear: () => void;
      renderedModelValueTags: { value: unknown[] };
      focus: () => void;
      blur: () => void;
    };

    expect(Array.isArray(exposed.renderedModelValueTags.value)).toBe(true);
    exposed.changePanelVisible(true);
    await nextTick();
    await sleep(0);
    expect(wrapper.get('.h-popover__popper').isVisible()).toBe(true);

    exposed.focusOption('b');
    await nextTick();
    expect(wrapper.get('.h-select-option[data-value="b"]').classes()).toContain('is-focus');

    exposed.setInputAble();
    await nextTick();
    const input = wrapper.get('input');
    expect(document.activeElement).toBe(input.element);

    exposed.blur();
    await nextTick();
    expect(wrapper.findAll('input').some(item => item.element === document.activeElement)).toBe(
      false,
    );
    exposed.focus();
    await nextTick();
    expect(wrapper.element.contains(document.activeElement)).toBe(true);

    await wrapper.get('.h-select-option[data-value="b"]').trigger('click');
    expect(value.value).toEqual(['a']);
    exposed.confirmHandle();
    await nextTick();
    expect(value.value).toEqual(['a', 'b']);

    exposed.changePanelVisible(true);
    await nextTick();
    await wrapper.get('.h-select-option[data-value="a"]').trigger('click');
    exposed.cancelHandle();
    await nextTick();
    expect(value.value).toEqual(['a', 'b']);

    exposed.clear();
    await nextTick();
    expect(value.value).toEqual([]);
    exposed.focusOption();
    wrapper.unmount();
  });
});
