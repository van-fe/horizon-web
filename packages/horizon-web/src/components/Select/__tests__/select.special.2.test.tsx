import { mount } from '@vue/test-utils';
import NSelect from '../src/Select';
import NOption from '../src/Option';
import { describe, expect, test } from 'vitest';
import NPickerInput from '../../Picker/src/components/NPickerInput';
import { sleep } from '~/utils/tools';
import NOptionGroup from '../src/OptionGroup';

describe('Select.tsx special 2', () => {
  test("disabled option won't focus when keyboard press up or down", async () => {
    const wrapper = mount(
      () => (
        <NSelect toBody={false} filterable>
          <NOption value={1} label="A" disabled={true} />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NPickerInput);

    await select.trigger('click');
    await select.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('2');

    await sleep(200);

    await select.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('2');

    await sleep(200);

    await select.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('3');

    await sleep(200);

    await select.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('3');
  });

  test("disabled group and disabled option mixin won't focus when keyboard press up or down", async () => {
    const wrapper = mount(
      () => (
        <NSelect toBody={false} filterable>
          <NOptionGroup disabled={true}>
            <NOption value={1} label="A" />
            <NOption value={2} label="B" />
            <NOption value={3} label="C" />
          </NOptionGroup>
          <NOptionGroup>
            <NOption value={4} label="D" />
            <NOption value={5} label="E" disabled={true} />
            <NOption value={6} label="F" />
          </NOptionGroup>
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NPickerInput);

    await select.trigger('click');
    await select.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('4');

    await sleep(150);

    await select.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('4');

    await sleep(150);

    await select.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('6');

    await sleep(150);

    await select.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('6');
  });
});
