import { mount } from '@vue/test-utils';
import HDropdown from '../src/Dropdown';
import { describe, expect, test } from 'vitest';
import HButton from '../../Button';
import { HDropdownItem, HDropdownMenu } from '../index';
import { nextTick, ref } from 'vue';
import HTooltip from '../../Tooltip';

describe('DropdownItem.tsx', () => {
  describe('props', () => {
    test('disabled', async () => {
      const disabled = ref(false);

      const wrapper = mount(
        () => (
          <HDropdown visible={true} toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem disabled={disabled.value}>1</HDropdownItem>
                  <HDropdownItem>2</HDropdownItem>
                  <HDropdownItem>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(HDropdownItem);

      await expect(items[0].classes('is-disabled')).toBeFalsy();

      disabled.value = true;

      await nextTick();

      await expect(items[0].classes('is-disabled')).toBeTruthy();
    });

    test('icon', async () => {
      const wrapper = mount(
        () => (
          <HDropdown visible={true} toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem icon="eye">1</HDropdownItem>
                  <HDropdownItem>2</HDropdownItem>
                  <HDropdownItem>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(HDropdownItem);

      await expect(items[0].find('.a-icon').exists()).toBeTruthy();

      await expect(items[0].find('.h-icon_eye').classes()).toBeTruthy();
    });

    test('active', async () => {
      const wrapper = mount(
        () => (
          <HDropdown visible={true} toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem active={true}>1</HDropdownItem>
                  <HDropdownItem>2</HDropdownItem>
                  <HDropdownItem>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(HDropdownItem);

      await expect(items[0].classes('is-active')).toBeTruthy();
    });

    test('divided', async () => {
      const wrapper = mount(
        () => (
          <HDropdown visible={true} toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem divided={true}>1</HDropdownItem>
                  <HDropdownItem>2</HDropdownItem>
                  <HDropdownItem>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(HDropdownItem);

      await expect(items[0].classes('is-divided')).toBeTruthy();
    });

    test('tooltip-options', async () => {
      const wrapper = mount(
        () => (
          <HDropdown visible={true} toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownItem tooltipOptions={{ visible: true, toBody: false }}>1</HDropdownItem>
                  <HDropdownItem>2</HDropdownItem>
                  <HDropdownItem>3</HDropdownItem>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(HDropdownItem);

      expect(items[0].findComponent(HTooltip).exists()).toBeTruthy();
    });
  });
});
