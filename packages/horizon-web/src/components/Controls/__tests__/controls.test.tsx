import { mount } from '@vue/test-utils';
import HControls from '../src/Controls';
import { describe, expect, test, vi } from 'vitest';
import { HControl } from '../index';
import { IconAdd, IconEdit } from '@aurora/icon';
import { markRaw, nextTick, ref } from 'vue';
import Ellipsis from '../src/components/Ellipsis';
import {
  HControlsEmitInjectKey,
  HControlsPropsInjectKey,
} from '../src/utils/injectKeys';
import { HHoverSwitchVisibleInjectKey } from '../../Hover/src/utils/injectKeys';
import HDropdownItem from '../../Dropdown/src/DropdownItem';
import HTooltip from '../../Tooltip/src/Tooltip';
import HDropdown from '../../Dropdown/src/Dropdown';

const RawIconAdd = markRaw(IconAdd);
const RawIconEdit = markRaw(IconEdit);

function mountControl(options: { parentDisabled?: boolean; itemDisabled?: boolean } = {}) {
  const parentEmit = vi.fn();
  const wrapper = mount(HControl, {
    props: {
      icon: RawIconAdd,
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
        <HControl icon={RawIconAdd} text="Add" label="add" />
      </HControls>
    ));
    const element = wrapper.findComponent(HControls);

    expect(element.exists()).toBe(true);
  });

  test('renders the default slot as public control items', () => {
    const wrapper = mount(() => (
      <HControls>
        <HControl icon={RawIconAdd} text="Slotted action" label="slot-action" />
      </HControls>
    ));

    const items = wrapper.findComponent(Ellipsis).props('items');
    expect(items).toHaveLength(1);
    expect(items[0].props).toMatchObject({ label: 'slot-action', text: 'Slotted action' });
  });

  test('real ResizeObserver switches between direct and overflow rendering', async () => {
    const width = ref(500);
    const wrapper = mount(
      () => (
        <HControls style={{ width: `${width.value}px` }}>
          <HControl icon={RawIconAdd} text="Add" label="add" />
          <HControl icon={RawIconEdit} text="Edit" label="edit" />
        </HControls>
      ),
      { attachTo: document.body },
    );

    await vi.waitFor(() =>
      expect(wrapper.findAll('.h-controls__inner .h-control')).toHaveLength(2),
    );
    expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);

    width.value = 30;
    await nextTick();
    await vi.waitFor(() => expect(wrapper.findComponent(Ellipsis).exists()).toBe(true));
    expect(wrapper.findAll('.h-controls__inner .h-control')).toHaveLength(0);
  });

  test('overflow items preserve slot text, emit commands and close an injected hover', async () => {
    const hoverVisible = vi.fn();
    const onCommand = vi.fn();
    const wrapper = mount(
      () => (
        <HControls onCommand={onCommand}>
          <HControl icon={RawIconAdd} label="slot-action">
            {{ text: () => <span>Slot action</span> }}
          </HControl>
          <HControl icon={RawIconEdit} text="Prop action" label="prop-action" />
        </HControls>
      ),
      {
        global: {
          provide: {
            [HHoverSwitchVisibleInjectKey as symbol]: hoverVisible,
          },
        },
      },
    );
    const dropdown = wrapper.findComponent(HDropdown).getCurrentComponent().exposed as {
      handleOpen: () => void;
    };
    dropdown.handleOpen();
    await nextTick();
    const dropdownItems = wrapper.findAllComponents(HDropdownItem);
    expect(dropdownItems.map(item => item.text())).toEqual(['Slot action', 'Prop action']);

    await dropdownItems[0].trigger('click');
    expect(onCommand).toHaveBeenCalledWith('slot-action', expect.any(Event));
    expect(hoverVisible).toHaveBeenCalledWith(false);
  });

  test('tooltip and icon colors honor item and parent precedence', () => {
    const parentColor = mountControl();
    expect(parentColor.wrapper.findComponent(HTooltip).props('disabled')).toBe(true);

    const emit = vi.fn();
    const wrapper = mount(HControl, {
      props: { icon: RawIconAdd, label: 'add', iconColor: ['red'] },
      slots: { text: () => 'Add slot' },
      global: {
        provide: {
          [HControlsPropsInjectKey as symbol]: {
            disabled: false,
            useTooltip: true,
            iconColor: ['blue'],
          },
          [HControlsEmitInjectKey as symbol]: emit,
        },
      },
    });

    expect(wrapper.findComponent(HTooltip).props('disabled')).toBe(false);
    expect(wrapper.find('.h-control').classes()).toContain('is-custom-color');
    expect(wrapper.findComponent(HTooltip).vm.$slots.content?.()[0].children).toBe('Add slot');
  });

  describe('props', () => {
    test('accessList', async () => {
      const accessList = ref(['edit']);

      const wrapper = mount(() => (
        <HControls accessList={accessList.value}>
          <HControl icon={RawIconAdd} text="Add" label="add" />
          <HControl icon={RawIconEdit} text="Edit" label="edit" />
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
          <HControl icon={RawIconAdd} text="Add" label="add" />
          <HControl icon={RawIconEdit} text="Edit" label="edit" visible={visible.value} />
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
