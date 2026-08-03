import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '~/utils/tools';
import HPicker from '../../Picker';
import SelectHelper from './SelectHelper';
import { Fragment } from 'vue';

describe('Select.tsx', () => {
  test('change-panel-visible', async () => {
    const instance = new SelectHelper({});

    expect(instance.popover.isVisible()).eq(false);

    await instance.domRef.value?.changePanelVisible(true);
    await sleep(0);

    expect(instance.popover.isVisible()).eq(true);

    await instance.domRef.value?.changePanelVisible(false);
    await sleep(0);

    expect(instance.popover.isVisible()).eq(false);
  });

  test('focus & blur', async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(
      () => (
        <Fragment>
          <HSelect toBody={false} onFocus={onFocus} onBlur={onBlur}>
            <HOption label="1" value={1} />
            <HOption label="2" value={2} />
            <HOption label="3" value={3} />
          </HSelect>
          <div id="outer"></div>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(HPicker).trigger('click');

    expect(onFocus).toHaveBeenCalledOnce();

    await wrapper.find('#outer').trigger('mousedown');

    expect(onBlur).toHaveBeenCalledOnce();
  });
});
