import type { SelectProps, OptionProps } from '~/components/Select/src/composables/useProps';
import type { SelectEmits } from '~/components/Select/src/composables/useEmits';
import type { LegoComponentInstance, MaybeRef, PartialExclude } from '@nio-fe/shared';
import { isObject } from '@nio-fe/shared';
import NSelect from '~/components/Select/src/Select';
import NOption from '~/components/Select/src/Option';
import type { Mock } from 'vitest';
import type { SetupContext } from 'vue';
import { Fragment, ref, unref } from 'vue';
import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { sleep } from '~/utils/tools';
import type { SelectExposes } from '~/components/Select/src/composables/useExposes';
import type { SelectSlots } from '~/components/Select/src/composables/useSlots';
import NPickerPopper from '~/components/Picker/src/components/NPickerPopper';
import NButton from '~/components/Button/src/Button';
import NPickerInput from '~/components/Picker/src/components/NPickerInput';
import type { PickerInputExposes } from '~/components/Picker/src/composables/useExposes';

export default class SelectHelper<
  T extends keyof SelectProps | `on${Capitalize<keyof SelectEmits>}`,
> {
  public modelValue = ref();
  public propsOrEmits?: {
    [K in T]?: K extends keyof SelectProps ? MaybeRef<SelectProps[K]> : Mock | Function;
  };
  public options = ref<PartialExclude<OptionProps, 'value' | 'label'>[]>([]);
  public slots?: Partial<SetupContext<{}, SelectSlots>['slots']>;
  public domRef = ref<LegoComponentInstance<typeof NSelect, SelectExposes>>();
  public outer!: DOMWrapper<Element>;
  public wrapper!: VueWrapper<any, any>;
  public element!: VueWrapper<LegoComponentInstance<typeof NSelect, SelectExposes>>;
  public popover!: VueWrapper<LegoComponentInstance<typeof NPickerPopper>>;
  public mainInput?: VueWrapper<LegoComponentInstance<typeof NPickerInput, PickerInputExposes>>;
  public confirmWrapper?: DOMWrapper<Element>;

  constructor(
    propsOrEmits?: {
      [K in T]?: K extends keyof SelectProps ? MaybeRef<SelectProps[K]> : Mock | Function;
    },
    options: PartialExclude<OptionProps, 'value' | 'label'>[] | string[] | 'default' = 'default',
    slots?: Partial<SetupContext<{}, SelectSlots>['slots']>,
  ) {
    this.propsOrEmits = propsOrEmits;
    this.modifyOptions(options);
    this.slots = slots;
    this.mountComponent();
  }

  private mountDirectly() {
    this.wrapper = mount(
      () => (
        <Fragment>
          <NSelect
            ref={this.domRef}
            v-model={this.modelValue.value}
            toBody={false}
            {...Object.fromEntries(
              Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
            )}
            v-slots={this.slots}
          >
            {this.options.value.map(opt => (
              <NOption {...opt} />
            ))}
          </NSelect>
          <div id="outer" />
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );
  }

  private mountComponent() {
    this.mountDirectly();
    this.element = this.wrapper.findComponent(NSelect) as VueWrapper<
      LegoComponentInstance<typeof NSelect, SelectExposes>
    >;
    this.popover = this.wrapper.findComponent(NPickerPopper) as VueWrapper<
      LegoComponentInstance<typeof NPickerPopper>
    >;
    this.outer = this.wrapper.find('#outer');
    this.mainInput = this.wrapper.findComponent(NPickerInput) as VueWrapper<
      LegoComponentInstance<typeof NPickerInput, PickerInputExposes>
    >;
  }

  public modifyOptions(
    options: PartialExclude<OptionProps, 'value' | 'label'>[] | string[] | 'default' = 'default',
  ) {
    this.options.value = Array.isArray(options)
      ? isObject(options[0])
        ? (options as PartialExclude<OptionProps, 'value' | 'label'>[])
        : (options as string[]).map(str => ({
            label: str,
            value: str,
          }))
      : new Array(3).fill(0).map((_, i) => ({ label: String.fromCharCode(65 + i), value: i }));
  }

  public async open(trigger: SelectProps['trigger'] = 'click', waitTime = 300) {
    await this.element.trigger(trigger);
    await sleep(waitTime);
    this.confirmWrapper = this.wrapper.find('.n-picker__pop-content--confirm-wrapper');
  }

  public async close(waitTime = 300) {
    await this.outer.trigger('mousedown');
    await sleep(waitTime);
  }

  public async confirm(waitTime = 300) {
    await this.confirmWrapper?.findAllComponents(NButton)[1].trigger('click');
    await sleep(waitTime);
  }

  public async cancel(waitTime = 300) {
    await this.confirmWrapper?.findAllComponents(NButton)[0].trigger('click');
    await sleep(waitTime);
  }

  public async pickOption(index = 0, waitTime = 300) {
    await this.wrapper.findAllComponents(NOption).at(index)?.trigger('click');
    await sleep(waitTime);
  }

  public async setInputValue(value: string, waitTime = 300) {
    await this.mainInput?.find('input')?.setValue(value);
    await sleep(waitTime);
  }
}
