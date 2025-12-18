import { mount } from '@vue/test-utils';
import NDropdown from '../src/Dropdown';
import { describe, expect, test } from 'vitest';
import NButton from '../../Button';
import { NDropdownGroup, NDropdownItem, NDropdownMenu } from '../index';
import { sleep } from '../../../utils/tools';
import NPopover from '../../Popover';
import NTooltip from '../../Tooltip';
import { Fragment } from 'vue';

describe('DropdownGroup.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(
      () => (
        <Fragment>
          <NDropdown toBody={false}>
            {{
              default: () => <NButton>Trigger</NButton>,
              dropdown: () => (
                <NDropdownMenu>
                  <NDropdownGroup title="Group">
                    <NDropdownItem>1</NDropdownItem>
                    <NDropdownItem>2</NDropdownItem>
                    <NDropdownItem>3</NDropdownItem>
                  </NDropdownGroup>
                </NDropdownMenu>
              ),
            }}
          </NDropdown>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    const triggerEle = wrapper.findComponent(NPopover);

    await triggerEle.trigger('mouseenter');

    await sleep(200);

    expect(wrapper.find('.n-dropdown-group__title').text()).eq('Group');
  });

  describe('props', () => {
    test('title-tooltip-options', async () => {
      const wrapper = mount(
        () => (
          <>
            <NDropdown toBody={false}>
              {{
                default: () => <NButton>Trigger</NButton>,
                dropdown: () => (
                  <NDropdownMenu>
                    <NDropdownGroup
                      title="Group"
                      titleTooltipOptions={{ size: 'small', visible: true, arrow: false }}
                    >
                      <NDropdownItem>1</NDropdownItem>
                      <NDropdownItem>2</NDropdownItem>
                      <NDropdownItem>3</NDropdownItem>
                    </NDropdownGroup>
                  </NDropdownMenu>
                ),
              }}
            </NDropdown>
          </>
        ),
        {
          attachTo: document.body,
        },
      );

      const triggerEle = wrapper.findComponent(NPopover);

      await triggerEle.trigger('mouseenter');

      await sleep(200);

      const tooltip = wrapper.findComponent(NTooltip);

      await expect(tooltip.exists()).toBeTruthy();

      expect(tooltip.props('visible')).eq(true);
      expect(tooltip.props('arrow')).eq(false);
    });
  });
});
