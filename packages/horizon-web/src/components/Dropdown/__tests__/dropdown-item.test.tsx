import { mount } from '@vue/test-utils';
import NDropdown from '../src/Dropdown';
import { describe, expect, test } from 'vitest';
import NButton from '../../Button';
import { NDropdownItem, NDropdownMenu } from '../index';
import { nextTick, ref } from 'vue';
import NTooltip from '../../Tooltip';

describe('DropdownItem.tsx', () => {
  describe('props', () => {
    test('disabled', async () => {
      const disabled = ref(false);

      const wrapper = mount(
        () => (
          <NDropdown visible={true} toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem disabled={disabled.value}>1</NDropdownItem>
                  <NDropdownItem>2</NDropdownItem>
                  <NDropdownItem>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(NDropdownItem);

      await expect(items[0].classes('is-disabled')).toBeFalsy();

      disabled.value = true;

      await nextTick();

      await expect(items[0].classes('is-disabled')).toBeTruthy();
    });

    test('icon', async () => {
      const wrapper = mount(
        () => (
          <NDropdown visible={true} toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem icon="eye">1</NDropdownItem>
                  <NDropdownItem>2</NDropdownItem>
                  <NDropdownItem>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(NDropdownItem);

      await expect(items[0].find('.a-icon').exists()).toBeTruthy();

      await expect(items[0].find('.n-icon_eye').classes()).toBeTruthy();
    });

    test('active', async () => {
      const wrapper = mount(
        () => (
          <NDropdown visible={true} toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem active={true}>1</NDropdownItem>
                  <NDropdownItem>2</NDropdownItem>
                  <NDropdownItem>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(NDropdownItem);

      await expect(items[0].classes('is-active')).toBeTruthy();
    });

    test('divided', async () => {
      const wrapper = mount(
        () => (
          <NDropdown visible={true} toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem divided={true}>1</NDropdownItem>
                  <NDropdownItem>2</NDropdownItem>
                  <NDropdownItem>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(NDropdownItem);

      await expect(items[0].classes('is-divided')).toBeTruthy();
    });

    test('tooltip-options', async () => {
      const wrapper = mount(
        () => (
          <NDropdown visible={true} toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownItem tooltipOptions={{ visible: true, toBody: false }}>1</NDropdownItem>
                  <NDropdownItem>2</NDropdownItem>
                  <NDropdownItem>3</NDropdownItem>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        ),
        {
          attachTo: document.body,
        },
      );
      const items = wrapper.findAllComponents(NDropdownItem);

      expect(items[0].findComponent(NTooltip).exists()).toBeTruthy();
    });
  });
});
