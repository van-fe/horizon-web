import type { DrawerProps } from '~/components/Drawer/src/composables/useProps';
import type { DrawerEmits } from '~/components/Drawer/src/composables/useEmits';
import type { HorizonWebComponentInstance, MaybeRef } from '@aurora/utils';
import HDrawer from '~/components/Drawer/src/Drawer';
import type { Mock } from 'vitest';
import type { SetupContext } from 'vue';
import { Fragment, ref, unref } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import HButton from '~/components/Button/src/Button';
import { sleep } from '~/utils/tools';
import type { DrawerExposes } from '~/components/Drawer/src/composables/useExposes';
import type { ButtonExposes } from '~/components/Button/src/composables/useExposes';
import type { DrawerSlots } from '~/components/Drawer/src/composables/useSlots';
import type { JSX } from 'vue/jsx-runtime';

export default class DrawerHelper<
  T extends keyof DrawerProps | `on${Capitalize<keyof DrawerEmits>}`,
> {
  public visible = ref(false);
  public propsOrEmits?: Partial<
    Record<T, T extends keyof DrawerProps ? MaybeRef<DrawerProps[T]> : Mock | Function>
  >;
  public slots?: Partial<SetupContext<{}, DrawerSlots>['slots']>;
  public outer?: () => JSX.Element;
  public wrapper!: VueWrapper<any, any>;
  public element!: VueWrapper<HorizonWebComponentInstance<typeof HDrawer, DrawerExposes>>;
  public openButton!: VueWrapper<HorizonWebComponentInstance<typeof HButton, ButtonExposes>>;

  constructor(
    propsOrEmits?: Partial<
      Record<T, T extends keyof DrawerProps ? MaybeRef<DrawerProps[T]> : Mock | Function>
    >,
    slots?: Partial<SetupContext<{}, DrawerSlots>['slots']>,
    mountDirectly?: boolean,
    outer?: () => JSX.Element,
  ) {
    this.propsOrEmits = propsOrEmits;
    this.slots = slots;
    this.outer = outer;
    this.mountComponent(mountDirectly ?? true);
  }

  private mountDirectly() {
    this.wrapper = mount(
      () => (
        <Fragment>
          <HDrawer
            v-model:visible={this.visible.value}
            {...Object.fromEntries(
              Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
            )}
            v-slots={this.slots}
          />
          {this.outer}
          {/**@ts-ignore**/}
          <HButton id="open" onClick={() => (this.visible.value = true)}>
            OPEN
          </HButton>
        </Fragment>
      ),
      {
        attachTo: document.body,
      },
    );
  }

  private mountByVisible() {
    this.wrapper = mount(
      () => (
        <>
          {this.visible.value ? (
            <HDrawer
              visible={true}
              {...Object.fromEntries(
                Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
              )}
              v-slots={this.slots}
            />
          ) : undefined}
          {this.outer}
          {/**@ts-ignore**/}
          <HButton id="open" onClick={() => (this.visible.value = true)}>
            OPEN
          </HButton>
        </>
      ),
      {
        attachTo: document.body,
      },
    );
  }

  private mountComponent(mountDirectly = true) {
    mountDirectly ? this.mountDirectly() : this.mountByVisible();

    this.element = this.wrapper.findComponent(HDrawer);
    this.openButton = this.wrapper
      .findAllComponents(HButton)
      .find(comp => comp.attributes('id') === 'open') as VueWrapper<
      HorizonWebComponentInstance<typeof HButton, ButtonExposes>
    >;
  }

  public async open(waitTime = 300) {
    await this.openButton.trigger('click');
    await sleep(waitTime);
  }

  public async close(maskClose = true, waitTime = 300) {
    await this.wrapper.find(maskClose ? '.h-drawer__mask' : '.h-drawer__closable').trigger('click');
    await sleep(waitTime);
  }
}
