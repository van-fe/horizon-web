import { mount } from '@vue/test-utils';
import HControls from '../src/Controls';
import { describe, expect, test, vi } from 'vitest';
import { HControl } from '../index';
import { IconAdd, IconEdit } from '@aurora/icon';
import { nextTick, ref } from 'vue';
import Ellipsis from '../src/components/Ellipsis';
import {
  HControlsEmitInjectKey,
  HControlsPropsInjectKey,
} from '../src/utils/injectKeys';

function mountControl(options: { parentDisabled?: boolean; itemDisabled?: boolean } = {}) {
  const parentEmit = vi.fn();
  const wrapper = mount(HControl, {
    props: {
      icon: IconAdd,
      text: 'Add',
      label: 'add',
      disabled: options.itemDisabled,
    },
    global: {
      provide: {
        [HControlsPropsInjectKey as symbol]: {
          disabled: options.parentDisabled ?? false,
          useTooltip: false,
          iconColor: undefined,
        },
        [HControlsEmitInjectKey as symbol]: parentEmit,
      },
    },
  });
  return { wrapper, parentEmit };
}

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
    test('accessList', async () => {
      const accessList = ref(['edit']);

      const wrapper = mount(() => (
        <HControls accessList={accessList.value}>
          <HControl icon={IconAdd} text="Add" label="add" />
          <HControl icon={IconEdit} text="Edit" label="edit" />
        </HControls>
      ));

      const overflowItems = wrapper.findComponent(Ellipsis).props('items');

      expect(overflowItems).toHaveLength(1);
      expect(overflowItems[0].props?.label).toBe('edit');
    });

    test('filters invisible controls and reacts to access changes', async () => {
      const accessList = ref(['add']);
      const visible = ref(false);
      const wrapper = mount(() => (
        <HControls accessList={accessList.value}>
          <HControl icon={IconAdd} text="Add" label="add" />
          <HControl icon={IconEdit} text="Edit" label="edit" visible={visible.value} />
        </HControls>
      ));

      expect(wrapper.findComponent(Ellipsis).props('items').map(item => item.props?.label)).toEqual([
        'add',
      ]);

      accessList.value = ['edit'];
      visible.value = true;
      await nextTick();

      expect(wrapper.findComponent(Ellipsis).props('items').map(item => item.props?.label)).toEqual([
        'edit',
      ]);
    });

    test('applies the selected theme reactively', async () => {
      const theme = ref<'light' | 'dark'>('light');
      const wrapper = mount(() => <HControls theme={theme.value} />);

      expect(wrapper.classes()).toContain('h-controls--light');

      theme.value = 'dark';
      await nextTick();

      expect(wrapper.classes()).toContain('h-controls--dark');
    });
  });

  test('emits the control label and original pointer event', async () => {
    const { wrapper, parentEmit } = mountControl();

    await wrapper.find('.h-control').trigger('click');

    expect(parentEmit).toHaveBeenCalledWith('command', 'add', expect.any(MouseEvent));
  });

  test.each([
    ['parent', true, false],
    ['item', false, true],
  ] as const)('%s disabled state prevents direct commands', async (_, parentDisabled, itemDisabled) => {
    const { wrapper, parentEmit } = mountControl({ parentDisabled, itemDisabled });

    await wrapper.find('.h-control').trigger('click');

    expect(wrapper.find('.h-control').classes()).toContain('is-disabled');
    expect(parentEmit).not.toHaveBeenCalled();
  });
});
