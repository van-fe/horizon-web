import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test } from 'vitest';
import HPickerInput from '../../Picker/src/components/PickerInput';
import { sleep } from '~/utils/tools';
import HOptionGroup from '../src/OptionGroup';

describe('Select.tsx special 2', () => {
  test("disabled option won't focus when keyboard press up or down", async () => {
    const wrapper = mount(
      () => (
        <HSelect toBody={false} filterable>
          <HOption value={1} label="A" disabled={true} />
          <HOption value={2} label="B" />
          <HOption value={3} label="C" />
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HPickerInput);

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
        <HSelect toBody={false} filterable>
          <HOptionGroup disabled={true}>
            <HOption value={1} label="A" />
            <HOption value={2} label="B" />
            <HOption value={3} label="C" />
          </HOptionGroup>
          <HOptionGroup>
            <HOption value={4} label="D" />
            <HOption value={5} label="E" disabled={true} />
            <HOption value={6} label="F" />
          </HOptionGroup>
        </HSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(HPickerInput);

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
