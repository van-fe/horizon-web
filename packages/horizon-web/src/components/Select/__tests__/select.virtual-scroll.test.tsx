import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import HSelect from '../src/Select';
import SimpleOption from '../src/components/SimpleOption';
import HVirtualScroller from '../../VirtualScroller/src/VirtualScroller';
import { sleep } from '~/utils/tools';

describe('Select.tsx virtual scroll', () => {
  test('renders every object-valued option with an identity-safe key', async () => {
    const options = [
      { label: 'A', value: { id: 1 } },
      { label: 'B', value: { id: 2 } },
      { label: 'C', value: { id: 3 } },
    ];
    const wrapper = mount(() => <HSelect options={options} toBody={false} />);

    await wrapper.findComponent(HSelect).trigger('click');
    await sleep(300);

    expect(wrapper.findComponent(HVirtualScroller).exists()).toBe(true);
    expect(wrapper.findAllComponents(SimpleOption).map(option => option.text())).toEqual([
      'A',
      'B',
      'C',
    ]);
  });
});
