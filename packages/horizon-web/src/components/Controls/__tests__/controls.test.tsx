import { mount } from '@vue/test-utils';
import NControls from '../src/Controls';
import { describe, expect, test } from 'vitest';
import { NControl } from '../index';
import { IconAdd, IconEdit } from '@aurora/icon';
import { ref } from 'vue';

describe('Controls.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NControls>
        <NControl icon={IconAdd} text="Add" label="add" />
      </NControls>
    ));
    const element = wrapper.findComponent(NControls);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    // happy-dom not support ResizeObserver API
    test.todo('accessList', async () => {
      const accessList = ref(['edit']);

      const wrapper = mount(() => (
        <NControls accessList={accessList.value}>
          <NControl icon={IconAdd} text="Add" label="add" />
          <NControl icon={IconEdit} text="Edit" label="edit" />
        </NControls>
      ));

      const elements = wrapper.findAllComponents(NControl);

      expect(elements.length).eq(1);
    });
  });
});
