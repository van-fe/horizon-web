import { mount } from '@vue/test-utils';
import HControls from '../src/Controls';
import { describe, expect, test } from 'vitest';
import { HControl } from '../index';
import { IconAdd, IconEdit } from '@aurora/icon';
import { ref } from 'vue';

describe('Controls.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HControls>
        <HControl icon={IconAdd} text="Add" label="add" />
      </HControls>
    ));
    const element = wrapper.findComponent(HControls);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    // happy-dom not support ResizeObserver API
    test.todo('accessList', async () => {
      const accessList = ref(['edit']);

      const wrapper = mount(() => (
        <HControls accessList={accessList.value}>
          <HControl icon={IconAdd} text="Add" label="add" />
          <HControl icon={IconEdit} text="Edit" label="edit" />
        </HControls>
      ));

      const elements = wrapper.findAllComponents(HControl);

      expect(elements.length).eq(1);
    });
  });
});
