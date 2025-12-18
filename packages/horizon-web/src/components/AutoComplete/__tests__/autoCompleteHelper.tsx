import type { LegoComponentInstance, MaybeRef } from '@aurora/utils';
import type { Mock } from 'vitest';
import type { SetupContext } from 'vue';
import { Fragment, ref, unref } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { sleep } from '~/utils/tools';
import type { AutoCompleteProps } from '~/components/AutoComplete/src/composables/useProps';
import type { AutoCompleteEmits } from '~/components/AutoComplete/src/composables/useEmits';
import NAutoComplete from '~/components/AutoComplete/src/AutoComplete';
import NPicker from '~/components/Picker/src/Picker';
import type { AutoCompleteExposes } from '~/components/AutoComplete/src/composables/useExposes';
import type { PickerExposes } from '~/components/Picker/src/composables/useExposes';
import type { AutoCompleteSlots } from '~/components/AutoComplete/src/composables/useSlots';
import SimpleOption from '~/components/AutoComplete/src/components/SimpleOption';

export default class AutoCompleteHelper<
  Key extends keyof AutoCompleteProps | `on${Capitalize<keyof AutoCompleteEmits>}`,
> {
  public modelValue = ref();
  public propsOrEmits?: Partial<{
    [K in Key]: K extends keyof AutoCompleteProps
      ? MaybeRef<AutoCompleteProps[K]>
      : Function | Mock;
  }>;
  public slots?: Partial<SetupContext<{}, AutoCompleteSlots>['slots']>;
  public wrapper!: VueWrapper<any, any>;
  public element!: VueWrapper<LegoComponentInstance<typeof NAutoComplete, AutoCompleteExposes>>;
  public picker!: VueWrapper<LegoComponentInstance<typeof NPicker, PickerExposes>>;

  constructor(
    propsOrEmits?: Partial<{
      [K in Key]: K extends keyof AutoCompleteProps
        ? MaybeRef<AutoCompleteProps[K]>
        : Function | Mock;
    }>,
    slots?: Partial<SetupContext<{}, AutoCompleteSlots>['slots']>,
  ) {
    this.propsOrEmits = propsOrEmits;
    this.slots = slots;
    this.mountComponent();
  }

  private mountComponent() {
    this.wrapper = mount(
      () => (
        <Fragment>
          <NAutoComplete
            v-model={this.modelValue.value}
            optionListMaxHeight={10000}
            {...Object.fromEntries(
              Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
            )}
            toBody={false}
            v-slots={this.slots}
          />
          <div id="outer" />
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    this.element = this.wrapper.findComponent(NAutoComplete) as VueWrapper<
      LegoComponentInstance<typeof NAutoComplete, AutoCompleteExposes>
    >;
    this.picker = this.element.findComponent(NPicker) as VueWrapper<
      LegoComponentInstance<typeof NPicker, PickerExposes>
    >;
  }

  public async input(inputValue: string, waitTime = 300) {
    await this.picker.find('input').setValue(inputValue);
    await sleep(waitTime);
  }

  public getAllComponents() {
    return this.element.findAllComponents(SimpleOption);
  }

  public async pickOption(order = 0) {
    const options = this.getAllComponents();
    await options.at(order)?.trigger('click');
  }

  public async open(waitTime = 300) {
    await this.picker.trigger('click');
    await sleep(waitTime);
  }

  public async close(waitTime = 300) {
    await this.wrapper.find('#outer').trigger('mousedown');
    await sleep(waitTime);
  }
}
