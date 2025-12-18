import { mount } from '@vue/test-utils';
import NSelect from '../src/Select';
import NOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '~/utils/tools';
import NPicker from '../../Picker';
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
          <NSelect toBody={false} onFocus={onFocus} onBlur={onBlur}>
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NPicker).trigger('click');

    expect(onFocus).toHaveBeenCalledOnce();

    await wrapper.find('#outer').trigger('mousedown');

    expect(onBlur).toHaveBeenCalledOnce();
  });
});
