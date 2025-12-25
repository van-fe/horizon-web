import { mount } from '@vue/test-utils';
import HDropdown from '../src/Dropdown';
import { describe, expect, test } from 'vitest';
import HButton from '../../Button';
import { HDropdownItem, HDropdownMenu, HDropdownSubmenu } from '../index';
import { sleep } from '../../../utils/tools';
import HPopover from '../../Popover';
import { Fragment, nextTick } from 'vue';

describe('DropdownSubmenu.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(
      () => (
        <Fragment>
          <HDropdown toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownSubmenu title="Submenu">
                    <HDropdownItem>1</HDropdownItem>
                    <HDropdownItem>2</HDropdownItem>
                    <HDropdownItem>3</HDropdownItem>
                  </HDropdownSubmenu>
                </HDropdownMenu>
              ),
            }}
          </HDropdown>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    const triggerEle = wrapper.findComponent(HPopover);

    await triggerEle.trigger('mouseenter');

    await sleep(200);

    expect(wrapper.findComponent(HDropdownSubmenu).exists()).toBeTruthy();
    expect(wrapper.findComponent(HDropdownSubmenu).text()).eq('Submenu123');
  });

  describe('props', () => {
    test('disabled', async () => {
      const wrapper = mount(
        () => (
          <>
            <HDropdown toBody={false}>
              {{
                default: () => <HButton>Trigger</HButton>,
                dropdown: () => (
                  <HDropdownMenu>
                    <HDropdownSubmenu disabled={true}>
                      <HDropdownItem>1</HDropdownItem>
                      <HDropdownItem>2</HDropdownItem>
                      <HDropdownItem>3</HDropdownItem>
                    </HDropdownSubmenu>
                  </HDropdownMenu>
                ),
              }}
            </HDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(HDropdownSubmenu).classes('is-disabled')).toBeTruthy();
    });

    test('icon', async () => {
      const wrapper = mount(
        () => (
          <>
            <HDropdown toBody={false}>
              {{
                default: () => <HButton>Trigger</HButton>,
                dropdown: () => (
                  <HDropdownMenu>
                    <HDropdownSubmenu title="Submenu" icon="eye">
                      <HDropdownItem>1</HDropdownItem>
                      <HDropdownItem>2</HDropdownItem>
                      <HDropdownItem>3</HDropdownItem>
                    </HDropdownSubmenu>
                  </HDropdownMenu>
                ),
              }}
            </HDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(HDropdownSubmenu).find('.a-icon').exists()).toBeTruthy();
    });

    test('active', async () => {
      const wrapper = mount(
        () => (
          <>
            <HDropdown toBody={false}>
              {{
                default: () => <HButton>Trigger</HButton>,
                dropdown: () => (
                  <HDropdownMenu>
                    <HDropdownSubmenu title="Submenu" active={true}>
                      <HDropdownItem>1</HDropdownItem>
                      <HDropdownItem>2</HDropdownItem>
                      <HDropdownItem>3</HDropdownItem>
                    </HDropdownSubmenu>
                  </HDropdownMenu>
                ),
              }}
            </HDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(HPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(HDropdownSubmenu).classes('is-active')).toBeTruthy();
    });

    test('trigger', async () => {
      const wrapper = mount(
        () => (
          <>
            <HDropdown trigger="click" toBody={false}>
              {{
                default: () => <HButton>Trigger</HButton>,
                dropdown: () => (
                  <HDropdownMenu>
                    <HDropdownSubmenu trigger="click" title="Submenu">
                      <HDropdownItem>1</HDropdownItem>
                      <HDropdownItem>2</HDropdownItem>
                      <HDropdownItem>3</HDropdownItem>
                    </HDropdownSubmenu>
                    <HDropdownSubmenu trigger="click" title="Submenu2">
                      <HDropdownItem>4</HDropdownItem>
                      <HDropdownItem>5</HDropdownItem>
                      <HDropdownItem>6</HDropdownItem>
                    </HDropdownSubmenu>
                  </HDropdownMenu>
                ),
              }}
            </HDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(HButton);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      await expect(wrapper.findComponent(HDropdownMenu).exists()).toBeFalsy();

      await triggerEle.trigger('click');

      await nextTick();

      await expect(wrapper.findComponent(HDropdownMenu).exists()).toBeTruthy();
    });
  });
});
