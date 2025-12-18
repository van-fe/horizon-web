import type { DOMWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import NSelect from '../src/Select';
import NOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { Fragment, nextTick, ref } from 'vue';
import NPickerInput from '../../Picker/src/components/NPickerInput';
import NTag from '../../Tag';
import type { PartialExclude } from '@aurora/utils';
import { isNumber } from '@aurora/utils';
import { sleep } from '~/utils/tools';
import NPickerPopper from '../../Picker/src/components/NPickerPopper';
import { NOptionGroup } from '../index';
import type { OptionProps } from '../src/composables/useProps';
import NPicker from '../../Picker';
import SimpleOption from '../src/components/SimpleOption';
import SelectHelper from '~/components/Select/__tests__/SelectHelper';

describe('Select.tsx', () => {
  test('do not trigger update:modelValue before mounted', async () => {
    const modelValue = ref();
    const onUpdate = vi.fn();
    const wrapper = mount(() => (
      <NSelect modelValue={modelValue.value} onUpdate:modelValue={onUpdate}>
        <NOption value={1} label={1} />
        <NOption value={2} label={2} />
      </NSelect>
    ));

    const options = wrapper.findAllComponents(NOption);

    expect(onUpdate).toHaveBeenCalledTimes(0);

    await options[0].trigger('click');

    expect(onUpdate).toHaveBeenCalledOnce();
    expect(onUpdate).toHaveBeenCalledWith(1);
  });

  test('do not trigger change before mounted', async () => {
    const modelValue = ref();
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <NSelect v-model={modelValue.value} onChange={onChange}>
        <NOption value={1} label={1} />
        <NOption value={2} label={2} />
      </NSelect>
    ));

    const options = wrapper.findAllComponents(NOption);

    expect(onChange).toHaveBeenCalledTimes(0);

    await options[0].trigger('click');

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(null, 1);
  });

  test('do not trigger change/update before mounted when modelValue is undefined and in multiple mode', async () => {
    const modelValue = ref();
    const onChange = vi.fn();
    const onUpdate = vi.fn();

    const wrapper = mount(
      () => (
        <Fragment>
          <span id="outside"></span>
          <NSelect
            v-model={modelValue.value}
            multiple
            onChange={onChange}
            onUpdate:modelValue={onUpdate}
          >
            <NOption value={1} label={1} />
            <NOption value={2} label={2} />
          </NSelect>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    const options = wrapper.findAllComponents(NOption);

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onUpdate).toHaveBeenCalledTimes(0);

    await options[0].trigger('click');
    await wrapper.find('#outside').trigger('click');

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(null, [1]);

    expect(onUpdate).toHaveBeenCalledOnce();
    expect(onUpdate).toHaveBeenCalledWith([1]);
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('multiple switch', async () => {
    const modelValue = ref();
    const multiple = ref(true);
    const wrapper = mount(() => (
      <NSelect v-model={modelValue.value} multiple={multiple.value}>
        <NOption value={1} label={1} />
        <NOption value={2} label={2} />
      </NSelect>
    ));

    expect(Array.isArray(modelValue.value)).toBeFalsy();

    const options = wrapper.findAllComponents(NOption);

    await options[0].trigger('click');
    await options[1].trigger('click');

    expect(modelValue.value.toString()).eq('1,2');

    const switchToMultiple = async () => {
      multiple.value = true;

      await nextTick();

      expect(Array.isArray(modelValue.value)).toBeTruthy();
      expect(modelValue.value.toString()).eq('1');
    };

    const switchToSingle = async () => {
      multiple.value = false;

      await nextTick();

      expect(isNumber(modelValue.value)).toBeTruthy();
      expect(modelValue.value.toString()).eq('1');
    };

    await switchToSingle();
    await switchToMultiple();
    await switchToSingle();
    await switchToMultiple();
  });

  test('unMatch.success', async () => {
    const modelValue = ref([1, 2, 333]);
    const wrapper = mount(() => <NSelect modelValue={modelValue.value} multiple={true}></NSelect>);

    await nextTick();
    const htmlList = wrapper.findAllComponents(NTag).map(item => item.html());

    expect(
      htmlList.length > 0 && htmlList.every(html => html.includes('<div class="n-tag__content">')),
    ).toBe(true);
  });

  test('unMatch.empty', () => {
    const modelValue = ref([1, 2, 333]);
    const wrapper = mount(() => (
      <NSelect modelValue={modelValue.value} multiple={true} showValueUnMatch={false}></NSelect>
    ));
    expect(wrapper.findAllComponents(NTag).length).toBe(0);
  });

  test('model-value set null while in multiple enabled', async () => {
    const modelValue = ref<null | number[]>(null);
    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} multiple={true} toBody={false}>
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const trigger = wrapper.findComponent(NPickerInput);

    await trigger.trigger('click');

    const value1 = wrapper.find('.n-select-option[data-value=1]');

    await value1.trigger('click');
    expect(modelValue.value?.length).eq(1);
  });

  test("don't emit change and update:modelValue while select same option", async () => {
    const modelValue = ref<null | number[]>(null);
    const onUpdateModelValueTrigger = vi.fn();
    const onChange = vi.fn();

    function onUpdateModelValue(val: any) {
      modelValue.value = val;
      onUpdateModelValueTrigger(val);
    }

    const wrapper = mount(
      () => (
        <NSelect
          modelValue={modelValue.value}
          toBody={false}
          onUpdate:modelValue={onUpdateModelValue}
          onChange={onChange}
        >
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const trigger = wrapper.findComponent(NPickerInput);

    await trigger.trigger('click');

    const value1 = wrapper.find('.n-select-option[data-value=1]');

    await value1.trigger('click');

    await nextTick();

    await value1.trigger('click');

    expect(onUpdateModelValueTrigger).toHaveBeenCalledOnce();

    expect(onChange).toHaveBeenCalledOnce();
  });

  test('use-check-all in single', async () => {
    const modelValue = ref(1);
    const useCheckAll = ref(false);

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} toBody={false} useCheckAll={useCheckAll.value}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('.n-select__check-all').exists()).toBeFalsy();
  });

  test('change event only trigger once when pick one option', async () => {
    const modelValue = ref();

    const onChange = vi.fn();

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} toBody={false} filterable onChange={onChange}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const input = wrapper.find('input.n-picker__input--inner') as DOMWrapper<HTMLInputElement>;

    await input.setValue('A');
    await sleep(200);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('A', undefined);

    await wrapper.findAllComponents(NOption)[0].trigger('click');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(null, 1);
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('change event only trigger once when pick one option in multiple', async () => {
    const modelValue = ref();

    const onChange = vi.fn();

    const wrapper = mount(
      () => (
        <>
          <span id="outside"></span>
          <NSelect
            v-model={modelValue.value}
            multiple
            toBody={false}
            filterable
            onChange={onChange}
          >
            <NOption value={1} label="A" />
            <NOption value={2} label="B" />
            <NOption value={3} label="C" />
          </NSelect>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const input = wrapper.find('input.n-picker__input--inner') as DOMWrapper<HTMLInputElement>;

    await input.setValue('A');
    await sleep(200);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('A', undefined);

    await wrapper.findAllComponents(NOption)[0].trigger('click');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(null, [1]);
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();

    expect(
      (wrapper.find('input:not([type="checkbox"])') as DOMWrapper<HTMLInputElement>).element.value,
    ).toEqual('A');

    await wrapper.find('#outside').trigger('mousedown');

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('the create option should be visible when no options with creatable', async () => {
    const modelValue = ref();

    const wrapper = mount(() => <NSelect v-model={modelValue.value} toBody={false} allowCreate />, {
      attachTo: document.body,
    });

    await wrapper.findComponent(NPicker).trigger('click');
    await sleep(0);

    expect(wrapper.find('.n-select__create-option').isVisible()).toBeTruthy();
  });

  test('search event only trigger once when pick one option', async () => {
    const modelValue = ref();
    const options = ref<number[]>([]);

    const onSearchTrigger = vi.fn();

    function onSearch(val: string) {
      onSearchTrigger(val);

      options.value = Array.from(new Array(10).keys());
    }

    const wrapper = mount(
      () => (
        <>
          <span id="outside"></span>
          <NSelect v-model={modelValue.value} toBody={false} showSearch onSearch={onSearch}>
            {options.value.map(opt => (
              <NOption value={opt} label={opt} />
            ))}
          </NSelect>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const input = wrapper.find('input.n-picker__input--inner') as DOMWrapper<HTMLInputElement>;

    await input.setValue('A');
    await sleep(200);

    await nextTick();

    expect(onSearchTrigger).toHaveBeenCalledOnce();
    expect(onSearchTrigger).toHaveBeenCalledWith('A');

    await wrapper.findAllComponents(NOption)[0].trigger('click');

    expect(modelValue.value).toEqual(0);

    await wrapper.find('#outside').trigger('click');

    expect(onSearchTrigger).toHaveBeenCalledOnce();
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test('search event only trigger once when pick one option in multiple', async () => {
    const modelValue = ref();
    const options = ref<number[]>([]);

    const onSearchTrigger = vi.fn();

    function onSearch(val: string) {
      onSearchTrigger(val);

      options.value = Array.from(new Array(10).keys());
    }

    const wrapper = mount(
      () => (
        <>
          <span id="outside"></span>
          <NSelect
            v-model={modelValue.value}
            toBody={false}
            multiple
            showSearch
            onSearch={onSearch}
          >
            {options.value.map(opt => (
              <NOption value={opt} label={opt} />
            ))}
          </NSelect>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    const input = wrapper.find('input.n-picker__input--inner') as DOMWrapper<HTMLInputElement>;

    await input.setValue('A');
    await sleep(200);

    await nextTick();

    expect(onSearchTrigger).toHaveBeenCalledOnce();
    expect(onSearchTrigger).toHaveBeenCalledWith('A');

    await wrapper.findAllComponents(NOption)[0].trigger('click');

    expect(modelValue.value).toEqual([0]);

    expect(
      (wrapper.find('input:not([type="checkbox"])') as DOMWrapper<HTMLInputElement>).element.value,
    ).toEqual('A');

    await wrapper.find('#outside').trigger('mousedown');

    expect(onSearchTrigger).toHaveBeenCalledOnce();
    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();
  });

  test("custom render tag when pick one option and clear, the input won't show again", async () => {
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} clearable={true} toBody={false}>
          {{
            default: () => (
              <>
                <NOption value={1} label="A">
                  {{
                    label: () => <NTag>A</NTag>,
                  }}
                </NOption>
                <NOption value={2} label="B">
                  {{
                    label: () => <NTag>B</NTag>,
                  }}
                </NOption>
                <NOption value={3} label="C">
                  {{
                    label: () => <NTag>C</NTag>,
                  }}
                </NOption>
              </>
            ),
            tagRender: (props: OptionProps & Record<string, unknown>) => <NTag>{props.value}</NTag>,
          }}
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    await wrapper.findComponent(NOption).trigger('click');

    expect(modelValue.value).toEqual(1);

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(wrapper.find('.n-picker__input--inner').isVisible()).toBeTruthy();
  });

  test('focus correct when keyboard press up or down and allowCreate', async () => {
    const wrapper = mount(
      () => (
        <NSelect toBody={false} allowCreate>
          <NOption value={1} label="AAA" />
          <NOption value={2} label="BBB" />
          <NOption value={3} label="CCC" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const pickerInput = wrapper.findComponent(NPickerInput);
    const input = wrapper.find('input');

    await pickerInput.trigger('click');
    await input.setValue('A');
    await sleep(200);

    expect(wrapper.find('.n-select__create-option').exists()).toBeTruthy();

    const [opt1, opt2, opt3] = wrapper.findAllComponents(NOption);
    expect(opt1.classes('is-hide')).toBeFalsy();
    expect(opt2.classes('is-hide')).toBeTruthy();
    expect(opt3.classes('is-hide')).toBeTruthy();

    await pickerInput.trigger('keydown.ArrowDown');
    expect(wrapper.find('.n-select__create-option').classes('is-focus')).toBeFalsy();
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('1');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowUp');
    expect(wrapper.find('.n-select__create-option').classes('is-focus')).toBeTruthy();
  });

  test('when parent node set click.stop and then click, the popover should disappear', async () => {
    const modelValue = ref();

    function onClick(evt: MouseEvent) {
      evt.stopPropagation();
    }

    const wrapper = mount(
      () => (
        <div onClick={onClick}>
          <NSelect v-model={modelValue.value} multiple toBody={false}>
            <NOption value={1} label="A" />
            <NOption value={2} label="B" />
            <NOption value={3} label="C" />
          </NSelect>
          <span id="outside"></span>
        </div>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NSelect).trigger('click');

    await sleep(500);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();

    await wrapper.find('#outside').trigger('click');

    await sleep(500);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();
  });

  test('jsx mode with Array.map to render options should mount on dom', async () => {
    const modelValue = ref(1);

    const options = ref<{ label: string; value: number }[]>([]);

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} toBody={false}>
          {options.value.map(opt => (
            <NOption value={opt.value} label={opt.label} />
          ))}
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    expect(wrapper.find('input').element.value).toEqual('1');

    options.value = [{ label: 'A', value: 1 }];

    await nextTick();

    expect(wrapper.find('input').element.value).toEqual('A');
  });

  test('blur remote search should not emit search event while not input anything', async () => {
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const onSearch = vi.fn();

    const wrapper = mount(
      () => (
        <>
          <NSelect
            toBody={false}
            showSearch={true}
            onSearch={onSearch}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    const picker = wrapper.findComponent(NPicker);
    const outer = wrapper.find('#outer');

    await picker.trigger('click');
    await sleep(1);

    expect(onFocus).toHaveBeenCalledOnce();

    await picker.trigger('click');
    await sleep(1);

    expect(onFocus).toHaveBeenCalledOnce();

    await outer.trigger('mousedown');

    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledTimes(0);
  });

  test('blur remote search should not emit search event while not input anything while empty panel is visible', async () => {
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const onSearch = vi.fn();

    const wrapper = mount(
      () => (
        <>
          <NSelect
            toBody={false}
            showSearch={true}
            hidePanelWhenShowSearchAndEmptyList={false}
            onSearch={onSearch}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    const select = wrapper.findComponent(NSelect);
    // const outer = wrapper.find('#outer');

    await select.trigger('click');

    expect(onFocus).toHaveBeenCalledOnce();

    await select.trigger('click');

    expect(onFocus).toHaveBeenCalledOnce();

    await wrapper.find('#outer').trigger('mousedown');

    expect(onFocus).toHaveBeenCalledOnce();
    expect(onBlur).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledTimes(0);
  });

  test('click clear icon should not switch panel visible status', async () => {
    const modelValue = ref();

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} clearable={true} toBody={false}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NPicker).trigger('click');
    await sleep(0);

    expect(wrapper.findComponent(NOption).isVisible()).toBeTruthy();

    await wrapper.findComponent(NOption).trigger('click');

    expect(modelValue.value).toEqual(1);

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toEqual(undefined);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeFalsy();

    modelValue.value = 1;

    await nextTick();

    await wrapper.findComponent(NPicker).trigger('click');
    await sleep(0);

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn2 = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn2.trigger('click');

    expect(modelValue.value).toEqual(undefined);

    expect(wrapper.findComponent(NPickerPopper).isVisible()).toBeTruthy();
  });

  test('set selected-option-order-to-top should focus correct when keyboard press up or down', async () => {
    const wrapper = mount(
      () => (
        <NSelect modelValue={3} toBody={false} selectedOptionOrderToTop={true}>
          <NOption value={1} label="A" />
          <NOption value={2} label="B" />
          <NOption value={3} label="C" />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const pickerInput = wrapper.findComponent(NPickerInput);

    await pickerInput.trigger('click');

    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('3');

    await pickerInput.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('1');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('3');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('1');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('2');
  });

  test('set selected-option-order-to-top with group should focus correct when keyboard press up or down', async () => {
    const wrapper = mount(
      () => (
        <NSelect modelValue={4} toBody={false} selectedOptionOrderToTop={true}>
          <NOptionGroup>
            <NOption value={1} label="A" />
            <NOption value={2} label="B" />
          </NOptionGroup>
          <NOption value={3} label="C" />
          <NOptionGroup>
            <NOption value={4} label="D" />
            <NOption value={5} label="E" />
          </NOptionGroup>
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    const pickerInput = wrapper.findComponent(NPickerInput);

    await pickerInput.trigger('click');

    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('4');

    await pickerInput.trigger('keydown.ArrowDown');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('5');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('4');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('3');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('2');

    await sleep(150);

    await pickerInput.trigger('keydown.ArrowUp');
    expect(wrapper.find('.is-focus').attributes('data-value')).toEqual('1');
  });

  test('multiple and after clear should be []', async () => {
    const modelValue = ref<number[]>();

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} multiple={true} clearable={true} toBody={false}>
          <NOption label="1" value={1} />
          <NOption label="2" value={2} />
          <NOption label="3" value={3} />
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    modelValue.value = [1];

    await nextTick();

    await wrapper.findComponent(NPickerInput).trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toEqual([]);
  });

  test('reserve-keyword set reserve-special', async () => {
    const wrapper = mount(
      () => (
        <>
          <NSelect
            multiple={true}
            reserveKeyword="reserve-special"
            filterable={true}
            toBody={false}
          >
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    const input = wrapper.find('input');

    async function filterAndPick(value: string, index: number) {
      await input.setValue(value);

      await sleep(200);

      await wrapper.findAllComponents(NOption)[index].trigger('click');

      await sleep(200);

      await nextTick();
    }

    await wrapper.findComponent(NSelect).trigger('click');

    await filterAndPick('1', 0);

    expect(
      (
        wrapper.find(
          '.n-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    const options = wrapper.findAllComponents(NOption);
    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeTruthy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    await filterAndPick('2', 1);

    expect(
      (
        wrapper.find(
          '.n-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    expect(options[0].classes('is-hide')).toBeTruthy();
    expect(options[1].classes('is-hide')).toBeFalsy();
    expect(options[2].classes('is-hide')).toBeTruthy();

    await wrapper.find('#outer').trigger('mousedown');
    await wrapper.findComponent(NSelect).trigger('click');

    expect(
      (
        wrapper.find(
          '.n-picker-fit-content-input__input:not(.is-main)',
        ) as DOMWrapper<HTMLInputElement>
      ).element.value,
    ).toEqual('');

    expect(options[0].classes('is-hide')).toBeFalsy();
    expect(options[1].classes('is-hide')).toBeFalsy();
    expect(options[2].classes('is-hide')).toBeFalsy();
  });

  test('remote-search when set multiple and has more than one tag rendered, the input will not be displayed', async () => {
    const modelValue = ref([0]);

    const instance = new SelectHelper(
      {
        modelValue,
        collapseTags: true,
        multiple: true,
        showSearch: true,
        'onUpdate:modelValue': val => (modelValue.value = val),
      },
      [],
    );

    await sleep(0);

    expect(
      instance.wrapper.find('.n-picker-fit-content-input__wrapper.is-main').isVisible(),
    ).toBeFalsy();

    await instance.wrapper.findComponent(NPicker).trigger('click');
    await sleep(200);

    expect(
      instance.wrapper.find('.n-picker-fit-content-input__wrapper:not(.is-main)').isVisible(),
    ).toBeTruthy();
  });

  test('remote-search when set multiple and has more than one tag rendered, and the input value is empty string, the input will not be displayed', async () => {
    const onBlur = vi.fn();
    const onSearch = vi.fn();

    const values = ref<number[]>([]);

    function handleSearch(val: string) {
      onSearch(val);
      if (val) {
        values.value = [1, 2, 3];
      } else {
        values.value = [];
      }
    }

    const instance = new SelectHelper(
      {
        collapseTags: true,
        multiple: true,
        showSearch: true,
        onSearch: handleSearch,
        onBlur,
      },
      [],
      {
        default: () => values.value.map(val => <NOption label={val} value={val} />),
      },
    );

    await instance.wrapper.findComponent(NPicker).trigger('click');
    await instance.wrapper.find('input').setValue('A');
    await sleep(200);
    await instance.wrapper.findComponent(NOption).trigger('click');
    expect(onBlur).toHaveBeenCalledTimes(0);

    await nextTick();

    expect(instance.modelValue.value).toStrictEqual([1]);

    expect(
      instance.wrapper.find('.n-picker-fit-content-input__wrapper:not(.is-main)').isVisible(),
    ).toBeTruthy();

    await instance.wrapper.find('input').setValue('');
    await sleep(200);

    expect(
      instance.wrapper.find('.n-picker-fit-content-input__wrapper:not(.is-main)').isVisible(),
    ).toBeTruthy();

    await instance.wrapper.find('#outer').trigger('mousedown');

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(1);

    await instance.wrapper.findComponent(NPicker).trigger('click');
    await sleep(0);
  });

  test('emit change only once when clear on single', async () => {
    const modelValue = ref(1);
    const onChange = vi.fn();
    const filterable = ref(false);

    const wrapper = mount(
      () => (
        <>
          <NSelect
            v-model={modelValue.value}
            filterable={filterable.value}
            clearable
            toBody={false}
            onChange={onChange}
          >
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    const input = wrapper.findComponent(NPickerInput);

    await input.trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toBeUndefined();

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenLastCalledWith(null, undefined);

    filterable.value = true;

    await nextTick();

    await wrapper.findComponent(NOption).trigger('click');

    expect(onChange).toHaveBeenLastCalledWith(null, 1);

    await wrapper.find('input').setValue('1');
    await sleep(200);

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith('1', 1);

    await clearBtn.trigger('click');

    expect(modelValue.value).toBeUndefined();

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenLastCalledWith(null, undefined);
  });

  test('emit change only once when clear on multiple', async () => {
    const modelValue = ref([1]);
    const onChange = vi.fn();
    const filterable = ref(false);

    const wrapper = mount(
      () => (
        <>
          <NSelect
            v-model={modelValue.value}
            filterable={filterable.value}
            multiple
            clearable
            toBody={false}
            onChange={onChange}
          >
            <NOption label="1" value={1} />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    const input = wrapper.findComponent(NPickerInput);

    await input.trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toStrictEqual([]);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenLastCalledWith(null, []);

    filterable.value = true;

    await nextTick();

    await wrapper.findComponent(NOption).trigger('click');

    expect(onChange).toHaveBeenLastCalledWith(null, [1]);

    await wrapper.find('input').setValue('1');
    await sleep(200);

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith('1', [1]);

    await clearBtn.trigger('click');

    expect(modelValue.value).toStrictEqual([]);

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenLastCalledWith(null, []);
  });

  test('emit change only once when clear on multiple and one option is disabled', async () => {
    const modelValue = ref([1]);
    const onChange = vi.fn();
    const filterable = ref(false);

    const wrapper = mount(
      () => (
        <>
          <NSelect
            v-model={modelValue.value}
            filterable={filterable.value}
            multiple
            clearable
            toBody={false}
            onChange={onChange}
          >
            <NOption label="1" value={1} disabled />
            <NOption label="2" value={2} />
            <NOption label="3" value={3} />
          </NSelect>
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    const input = wrapper.findComponent(NPickerInput);

    await input.trigger('mouseenter');

    const clearBtn = wrapper.find('.n-picker__input--icon.is-clear');

    await clearBtn.trigger('click');

    expect(modelValue.value).toStrictEqual([1]);

    expect(onChange).toHaveBeenCalledTimes(0);

    filterable.value = true;

    await nextTick();

    debugger;

    await wrapper.findAllComponents(NOption).at(-1)?.trigger('click');

    expect(onChange).toHaveBeenLastCalledWith(null, [1, 3]);

    await wrapper.find('input').setValue('1');
    await sleep(200);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('1', [1, 3]);

    await clearBtn.trigger('click');

    expect(modelValue.value).toStrictEqual([1]);

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith(null, [1]);
  });

  test('option disabled', async () => {
    const options = new Array(20).fill(0).map((_, idx) => ({
      name: idx,
      value: idx,
      disabled: true,
    }));

    const wrapper = mount(
      () => (
        <>
          <NSelect multiple clearable toBody={false} options={options} />
          <div id="outer"></div>
        </>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NPicker).trigger('click');

    wrapper.findAllComponents(SimpleOption).forEach(option => {
      expect(option.classes('is-disabled')).toBeTruthy();
    });
  });

  test('show-search press ArrowDown and change search result, then enter Enter key, should not picked the old focused option', async () => {
    const modelValue = ref();
    const onSearch = vi.fn();

    const options = ref<string[]>([]);

    function doSearch(val: string) {
      onSearch();
      options.value = [val, val.repeat(2), val.repeat(3)];
    }

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} toBody={false} showSearch onSearch={doSearch}>
          {options.value.map(opt => (
            <NOption label={opt} value={opt} key={opt} />
          ))}
        </NSelect>
      ),
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NPickerInput).trigger('click');

    await wrapper.find('input').setValue('1');
    await sleep(200);
    await sleep();

    await wrapper.findComponent(NPickerInput).trigger('keydown', {
      key: 'ArrowDown',
    });

    await sleep(100);

    expect(wrapper.find('.is-focus').attributes('data-value')).toBe('1');

    await wrapper.findComponent(NPickerInput).trigger('keydown', {
      key: 'ArrowDown',
    });

    await sleep(100);

    expect(wrapper.find('.is-focus').attributes('data-value')).toBe('11');

    await wrapper.find('input').setValue('2');
    await sleep(200);
    await sleep();

    expect(onSearch).toHaveBeenCalledTimes(2);
    expect(wrapper.find('.is-focus').exists()).toBeFalsy();

    await wrapper.findComponent(NPickerInput).trigger('keydown', {
      key: 'Enter',
    });

    await sleep(200);

    expect(modelValue.value).toBeUndefined();
  });

  test('show-search: set single with not empty value, then focus the input, expect the input should render correct', async () => {
    const modelValue = ref('DEFAULT');

    const onFocus = vi.fn();

    const wrapper = mount(
      () => <NSelect v-model={modelValue.value} toBody={false} showSearch onFocus={onFocus} />,
      {
        attachTo: document.body,
      },
    );

    await wrapper.findComponent(NPickerInput).trigger('click');
    await sleep();

    expect(onFocus).toHaveBeenCalledOnce();

    expect(wrapper.find('input').element.value).toBe('');
    expect(wrapper.find('input').attributes('placeholder')).toBe('DEFAULT');
  });

  test('show-search or other inputable props set, the multiple select with default value, click the select cannot trigger tag appended input to be focused', async () => {
    const modelValue = ref(['1', '2', '3']);

    const onFocus = vi.fn();

    const wrapper = mount(
      () => (
        <NSelect v-model={modelValue.value} toBody={false} multiple showSearch onFocus={onFocus} />
      ),
      {
        attachTo: document.body,
      },
    );

    await sleep();
    await wrapper.findComponent(NPickerInput).trigger('click');
    await sleep();

    expect(onFocus).toHaveBeenCalledOnce();
  });

  test('disabled option should not be checked or unchecked by check-all', async () => {
    const instance = new SelectHelper(
      {
        useCheckAll: true,
        multiple: true,
      },
      new Array(4).fill(0).map((_, i) => ({ label: i, value: i, disabled: i % 2 === 0 })),
    );

    await instance.open();

    await instance.popover.find('.n-select__check-all').trigger('click');
    await nextTick();
    expect(instance.modelValue.value?.length).eq(2);

    await instance.popover.find('.n-select__check-all').trigger('click');
    await nextTick();
    expect(instance.modelValue.value?.length).eq(0);

    await instance.popover.find('.n-select__check-all').trigger('click');
    await nextTick();
    expect(instance.modelValue.value?.length).eq(2);
  });

  test('use-virtual-scroller set false and change options will changed correctly', async () => {
    const options = ref<
      Array<PartialExclude<Omit<OptionProps, 'maxLines' | 'descriptionPosition'>, 'value'>>
    >(new Array(100).fill(0).map((_, i) => ({ label: i, value: i })));

    const instance = new SelectHelper(
      {
        useVirtualScroll: false,
        options,
      },
      [],
    );

    expect(instance.wrapper.findAllComponents(NOption).length).toBe(100);
    instance.wrapper.findAllComponents(NOption).forEach(opt => {
      expect(opt.classes('is-hide')).toBeFalsy();
    });

    options.value = new Array(10).fill(0).map((_, i) => ({ label: i, value: i }));

    await sleep();

    expect(instance.wrapper.findAllComponents(NOption).length).toBe(10);
    instance.wrapper.findAllComponents(NOption).forEach(opt => {
      expect(opt.classes('is-hide')).toBeFalsy();
    });
  });

  test('remote-search when selected option is disappear when do new search, tagRender slots should still render correct', async () => {
    const modelValue = ref('');
    const onSearch = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const options = ref<{ value: string; label: string }[]>([]);

    function handleSearch(val: string) {
      onSearch(val);

      if (val) {
        options.value = new Array(10).fill(0).map((_, i) => ({
          label: `${val}-${String.fromCharCode(65 + i)}`,
          value: `${val}-${String.fromCharCode(65 + i)}`,
        }));
      } else {
        options.value = [];
      }
    }

    const instance = new SelectHelper(
      {
        modelValue,
        showSearch: true,
        'onUpdate:modelValue': val => (modelValue.value = val),
        onSearch: handleSearch,
        onFocus,
        onBlur,
      },
      [],
      {
        default() {
          return options.value.map(opt => (
            <NOption key={opt.value} value={opt.value} label={opt.label} />
          ));
        },
        tagRender(data) {
          return [<div class="custom-tag-render">{data?.label}</div>];
        },
      },
    );

    await instance.open();
    await instance.setInputValue('a');
    expect(onFocus).toHaveBeenCalledOnce();
    await instance.pickOption();
    expect(onBlur).toHaveBeenCalledOnce();
    expect(instance.modelValue.value).eq('a-A');
    expect(instance.mainInput?.find('.custom-tag-render')?.text()).eq('a-A');

    await instance.open();
    await instance.setInputValue('b');
    expect(onFocus).toHaveBeenCalledTimes(2);
    expect(instance.modelValue.value).eq('a-A');
    expect(instance.mainInput?.find('.custom-tag-render')?.text()).eq('a-A');
    expect(
      instance.wrapper
        .findAllComponents(NOption)
        .some(opt => opt.attributes('data-value') === 'a-A'),
    ).toBeFalsy();
    expect(onBlur).toHaveBeenCalledOnce();
  });

  test('use panelHeaderRender slots to create input should not close panel when press backspace', async () => {
    const instance = new SelectHelper({}, 'default', {
      panelHeaderRender() {
        return [<input type="text" id="panel-header-input" />];
      },
    });

    await instance.open();
    await instance.pickOption(0);

    expect(instance.modelValue.value).eq(0);

    await instance.open();
    await instance.popover.find('input').setValue('A');

    expect(instance.popover.isVisible()).eq(true);

    await instance.popover.find('input').trigger('keydown.backspace');

    expect(instance.popover.isVisible()).eq(true);
  });

  test('use-check-all with filter', async () => {
    const instance = new SelectHelper(
      {
        filterable: true,
        multiple: true,
        useCheckAll: true,
      },
      new Array(5).fill(0).map((_, i) => ({ label: `A${i % 2 === 0 ? '1' : '2'}`, value: i })),
    );

    await instance.open();

    const checkAll = instance.wrapper.find('.n-select__check-all');

    expect(checkAll.exists()).toBeTruthy();

    await instance.setInputValue('1');

    expect(
      instance.wrapper.findAllComponents(NOption).filter(curr => !curr.classes('is-hide')).length,
    ).toBe(3);

    await checkAll.trigger('click');

    expect(checkAll.find('label').classes('n-checkbox--checked')).toBeTruthy();
    expect(Array.isArray(instance.modelValue.value)).toBeTruthy();
    expect(instance.modelValue.value).toStrictEqual([0, 2, 4]);

    await instance.setInputValue('');

    expect(checkAll.find('label').classes('n-checkbox--indeterminate')).toBeTruthy();

    await instance.setInputValue('2');

    expect(checkAll.find('label').classes('n-checkbox--indeterminate')).toBeFalsy();

    await checkAll.trigger('click');

    expect(checkAll.find('label').classes('n-checkbox--checked')).toBeTruthy();
    expect(instance.modelValue.value).toStrictEqual([0, 2, 4, 1, 3]);
  });
});
