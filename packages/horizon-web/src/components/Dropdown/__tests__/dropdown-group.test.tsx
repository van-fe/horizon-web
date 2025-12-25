import { mount } from '@vue/test-utils';
import HDropdown from '../src/Dropdown';
import { describe, expect, test } from 'vitest';
import HButton from '../../Button';
import { HDropdownGroup, HDropdownItem, HDropdownMenu } from '../index';
import { sleep } from '../../../utils/tools';
import HPopover from '../../Popover';
import HTooltip from '../../Tooltip';
import { Fragment } from 'vue';

describe('DropdownGroup.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(
      () => (
        <Fragment>
          <HDropdown toBody={false}>
            {{
              default: () => <HButton>Trigger</HButton>,
              dropdown: () => (
                <HDropdownMenu>
                  <HDropdownGroup title="Group">
                    <HDropdownItem>1</HDropdownItem>
                    <HDropdownItem>2</HDropdownItem>
                    <HDropdownItem>3</HDropdownItem>
                  </HDropdownGroup>
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

    expect(wrapper.find('.n-dropdown-group__title').text()).eq('Group');
  });

  describe('props', () => {
    test('title-tooltip-options', async () => {
      const wrapper = mount(
        () => (
          <>
            <HDropdown toBody={false}>
              {{
                default: () => <HButton>Trigger</HButton>,
                dropdown: () => (
                  <HDropdownMenu>
                    <HDropdownGroup
                      title="Group"
                      titleTooltipOptions={{ size: 'small', visible: true, arrow: false }}
                    >
                      <HDropdownItem>1</HDropdownItem>
                      <HDropdownItem>2</HDropdownItem>
                      <HDropdownItem>3</HDropdownItem>
                    </HDropdownGroup>
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

      const tooltip = wrapper.findComponent(HTooltip);

      await expect(tooltip.exists()).toBeTruthy();

      expect(tooltip.props('visible')).eq(true);
      expect(tooltip.props('arrow')).eq(false);
    });
  });
});
