import { mount } from '@vue/test-utils';
import NSelect from '../src/Select';
import NOption from '../src/Option';
import { describe, expect, test } from 'vitest';
import { NOptionGroup } from '../index';
import { sleep } from '~/utils/tools';
import type { OptionGroupProps, OptionProps } from '~/components/Select/src/composables/useProps';
import { nextTick, ref } from 'vue';

describe('OptionGroup.tsx', () => {
  test('enable filterable and the group which not includes visible options will disappear', async () => {
    const wrapper = mount(
      () => (
        <NSelect filterable={true} toBody={false}>
          <NOptionGroup>
            <NOption value={1} label={1} />
            <NOption value={2} label={2} />
          </NOptionGroup>
          <NOptionGroup>
            <NOption value={3} label={3} />
            <NOption value={4} label={4} />
          </NOptionGroup>
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const input = wrapper.find('input');

    await input.setValue('1');

    await sleep(200);

    const [g1, g2] = wrapper.findAllComponents(NOptionGroup);

    expect(g1.isVisible()).toBeTruthy();
    expect(g2.isVisible()).toBeFalsy();
  });

  test('dynamic add option to group should render correctly', async () => {
    const group = ref<
      Array<Partial<OptionGroupProps> & { children: Pick<OptionProps, 'label' | 'value'>[] }>
    >([
      {
        label: '1',
        children: [
          { value: '1-1', label: '1-1' },
          { value: '1-2', label: '1-2' },
          { value: '1-3', label: '1-3' },
          { value: '1-4', label: '1-4' },
          { value: '1-5', label: '1-5' },
        ],
      },
      {
        label: '2',
        children: [
          { value: '2-1', label: '2-1' },
          { value: '2-2', label: '2-2' },
          { value: '2-3', label: '2-3' },
          { value: '2-4', label: '2-4' },
          { value: '2-5', label: '2-5' },
        ],
      },
    ]);

    const wrapper = mount(
      () => (
        <NSelect filterable={true} toBody={false}>
          {group.value.map(item => (
            <NOptionGroup label={item.label}>
              {item.children.map(option => (
                <NOption label={option.label} value={option.value} />
              ))}
            </NOptionGroup>
          ))}
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findAllComponents(NOption).length).toBe(10);

    group.value[0].children.push({
      value: '1-6',
      label: '1-6',
    });

    await nextTick();

    expect(wrapper.findAllComponents(NOption).length).toBe(11);

    group.value[1].children.splice(0, 1);

    await nextTick();

    expect(wrapper.findAllComponents(NOption).length).toBe(10);
  });
});
