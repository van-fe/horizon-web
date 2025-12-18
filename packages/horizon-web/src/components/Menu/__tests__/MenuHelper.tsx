import type { LegoComponentInstance, MaybeRef } from '@aurora/utils';
import type { Mock } from 'vitest';
import type { SetupContext } from 'vue';
import { ref, unref } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import type { MenuProps } from '../src/composables/useProps';
import type { MenuEmits } from '../src/composables/useEmits';
import type { MenuSlots } from '../src/composables/useSlots';
import type { MenuExposes } from '../src/composables/useExposes';
import NMenu from '../src/Menu';
import options from './options.json';
import NSubMenu from '../src/SubMenu';
import NMenuItem from '../src/MenuItem';

type OptionType = {
  value: string;
  label: string;
  children?: OptionType[];
};

export default class MenuHelper<T extends keyof MenuProps | `on${Capitalize<keyof MenuEmits>}`> {
  public modelValue = ref();
  public propsOrEmits?: Partial<
    Record<T, T extends keyof MenuProps ? MaybeRef<MenuProps[T]> : Mock | Function>
  >;
  public slots?: SetupContext<{}, MenuSlots>['slots'];
  public domRef = ref<LegoComponentInstance<typeof NMenu, MenuExposes> | null>(null);
  public wrapper!: VueWrapper<any, any>;
  public element!: VueWrapper<LegoComponentInstance<typeof NMenu, MenuExposes>>;

  constructor(
    propsOrEmits?: Partial<
      Record<T, T extends keyof MenuProps ? MaybeRef<MenuProps[T]> : Mock | Function>
    >,
    slots?: SetupContext<{}, MenuSlots>['slots'],
  ) {
    this.propsOrEmits = propsOrEmits;
    this.slots = slots;
    this.mountComponent();
  }

  private renderChildren(children: OptionType[]) {
    return children.map(curr => {
      if (Array.isArray(curr.children) && curr.children.length > 0) {
        return (
          <NSubMenu name={curr.label} value={curr.value}>
            {this.renderChildren(curr.children)}
          </NSubMenu>
        );
      } else {
        return <NMenuItem name={curr.label} value={curr.value} />;
      }
    });
  }

  private mountComponent() {
    this.wrapper = mount(
      () => (
        <NMenu
          ref={this.domRef}
          v-model={this.modelValue.value}
          {...Object.fromEntries(
            Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
          )}
          v-slots={this.slots}
        >
          {this.renderChildren(options as OptionType[])}
        </NMenu>
      ),
      {
        attachTo: document.body,
      },
    );

    this.element = this.wrapper.findComponent(NMenu) as VueWrapper<
      LegoComponentInstance<typeof NMenu, MenuExposes>
    >;
  }
}
