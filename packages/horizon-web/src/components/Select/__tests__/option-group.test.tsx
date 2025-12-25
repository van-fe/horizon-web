import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test } from 'vitest';
import { HOptionGroup } from '../index';
import { sleep } from '~/utils/tools';
import type { OptionGroupProps, OptionProps } from '~/components/Select/src/composables/useProps';
import { nextTick, ref } from 'vue';

describe('OptionGroup.tsx', () => {
  test('enable filterable and the group which not includes visible options will disappear', async () => {
    const wrapper = mount(
      () => (
        <HSelect filterable={true} toBody={false}>
          <HOptionGroup>
            <HOption value={1} label={1} />
            <HOption value={2} label={2} />
          </HOptionGroup>
          <HOptionGroup>
            <HOption value={3} label={3} />
            <HOption value={4} label={4} />
          </HOptionGroup>
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HSelect).trigger('click');

    const input = wrapper.find('input');

    await input.setValue('1');

    await sleep(200);

    const [g1, g2] = wrapper.findAllComponents(HOptionGroup);

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
        <HSelect filterable={true} toBody={false}>
          {group.value.map(item => (
            <HOptionGroup label={item.label}>
              {item.children.map(option => (
                <HOption label={option.label} value={option.value} />
              ))}
            </HOptionGroup>
          ))}
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.findAllComponents(HOption).length).toBe(10);

    group.value[0].children.push({
      value: '1-6',
      label: '1-6',
    });

    await nextTick();

    expect(wrapper.findAllComponents(HOption).length).toBe(11);

    group.value[1].children.splice(0, 1);

    await nextTick();

    expect(wrapper.findAllComponents(HOption).length).toBe(10);
  });
});
