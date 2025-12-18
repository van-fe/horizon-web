import type { DrawerProps } from '~/components/Drawer/src/composables/useProps';
import type { DrawerEmits } from '~/components/Drawer/src/composables/useEmits';
import type { LegoComponentInstance, MaybeRef } from '@aurora/shared';
import NDrawer from '~/components/Drawer/src/Drawer';
import type { Mock } from 'vitest';
import type { SetupContext } from 'vue';
import { Fragment, ref, unref } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import NButton from '~/components/Button/src/Button';
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
  public element!: VueWrapper<LegoComponentInstance<typeof NDrawer, DrawerExposes>>;
  public openButton!: VueWrapper<LegoComponentInstance<typeof NButton, ButtonExposes>>;

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
          <NDrawer
            v-model:visible={this.visible.value}
            {...Object.fromEntries(
              Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
            )}
            v-slots={this.slots}
          />
          {this.outer}
          {/**@ts-ignore**/}
          <NButton id="open" onClick={() => (this.visible.value = true)}>
            OPEN
          </NButton>
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
            <NDrawer
              visible={true}
              {...Object.fromEntries(
                Object.entries(this.propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
              )}
              v-slots={this.slots}
            />
          ) : undefined}
          {this.outer}
          {/**@ts-ignore**/}
          <NButton id="open" onClick={() => (this.visible.value = true)}>
            OPEN
          </NButton>
        </>
      ),
      {
        attachTo: document.body,
      },
    );
  }

  private mountComponent(mountDirectly = true) {
    mountDirectly ? this.mountDirectly() : this.mountByVisible();

    this.element = this.wrapper.findComponent(NDrawer);
    this.openButton = this.wrapper
      .findAllComponents(NButton)
      .find(comp => comp.attributes('id') === 'open') as VueWrapper<
      LegoComponentInstance<typeof NButton, ButtonExposes>
    >;
  }

  public async open(waitTime = 300) {
    await this.openButton.trigger('click');
    await sleep(waitTime);
  }

  public async close(maskClose = true, waitTime = 300) {
    await this.wrapper.find(maskClose ? '.n-drawer__mask' : '.n-drawer__closable').trigger('click');
    await sleep(waitTime);
  }
}
