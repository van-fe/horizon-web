import type { LegoComponentInstance, MaybeRef } from '@aurora/shared';
import type { Mock } from 'vitest';
import { Fragment, ref, unref } from 'vue';
import type { SetupContext } from 'vue';
import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { sleep } from '~/utils/tools';
import type { ColorPickerProps } from '../src/composables/useProps';
import type { ColorPickerEmits } from '../src/composables/useEmits';
import type { ColorPickerSlots } from '../src/composables/useSlots';
import type { ColorPickerExposes } from '../src/composables/useExposes';
import NColorPicker from '../src/ColorPicker';
import ColorPickerTrigger from '../src/components/ColorPickerTrigger';
import ColorPickerPanel from '../src/components/ColorPickerPanel';

export default class ColorPickerHelper<
  T extends keyof ColorPickerProps | `on${Capitalize<keyof ColorPickerEmits>}`,
> {
  public modelValue = ref();
  public propsOrEmits?: Partial<
    Record<T, T extends keyof ColorPickerProps ? MaybeRef<ColorPickerProps[T]> : Mock | Function>
  >;
  public slots?: Partial<SetupContext<{}, ColorPickerSlots>['slots']>;
  public outer!: DOMWrapper<Element>;
  public wrapper!: VueWrapper<any, any>;
  public element!: VueWrapper<LegoComponentInstance<typeof NColorPicker, ColorPickerExposes>>;

  constructor(
    propsOrEmits?: Partial<
      Record<T, T extends keyof ColorPickerProps ? MaybeRef<ColorPickerProps[T]> : Mock | Function>
    >,
    slots?: Partial<SetupContext<{}, ColorPickerSlots>['slots']>,
  ) {
    this.propsOrEmits = propsOrEmits;
    this.slots = slots;
    this.mountComponent();
  }

  private mountComponent() {
    this.wrapper = mount(
      () => (
        <Fragment>
          <NColorPicker
            v-model={this.modelValue.value}
            popoverProps={{ toBody: false }}
            {...Object.fromEntries(
              Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
            )}
            v-slots={this.slots}
          />
          <div id="outer"></div>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );

    this.element = this.wrapper.findComponent(NColorPicker) as VueWrapper<
      LegoComponentInstance<typeof NColorPicker, ColorPickerExposes>
    >;
    this.outer = this.wrapper.find('#outer');
  }

  public async open(waitTime = 300) {
    await this.element.findComponent(ColorPickerTrigger).trigger('click');
    await sleep(waitTime);

    return this.wrapper.findComponent(ColorPickerPanel) as VueWrapper<
      LegoComponentInstance<typeof ColorPickerPanel>
    >;
  }

  public async close(waitTime = 300) {
    await this.outer.trigger('click');
    await sleep(waitTime);

    return this.wrapper.findComponent(ColorPickerPanel) as VueWrapper<
      LegoComponentInstance<typeof ColorPickerPanel>
    >;
  }
}
