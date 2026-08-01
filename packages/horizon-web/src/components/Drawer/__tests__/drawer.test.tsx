import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref, defineComponent } from 'vue';
import Drawer from '../src/Drawer';

interface LocalTestContext {
  teleportEl: HTMLElement;
}

describe('Drawer.tsx', () => {
  beforeEach<LocalTestContext>(ctx => {
    // vi.useFakeTimers();
    const el = document.createElement('div');
    el.id = 'test';
    ctx.teleportEl = el;
    document.body.appendChild(el);
  });

  afterEach(() => {
    // vi.resetAllMocks();
    document.body.innerHTML = '';
  });

  test<LocalTestContext>('Drawer default #render', async ctx => {
    const visible = ref(false);
    const dTitle = 'drawer title';
    const dContent = 'drawer content';
    const wrapper = mount(() => (
      <Drawer to="#test" visible={visible.value} title={dTitle}>
        <div>{dContent}</div>
      </Drawer>
    ));
    expect(wrapper.findComponent(Drawer).exists()).toBe(true);
    expect(wrapper.html()).toMatchInlineSnapshot(
      `
      "<!--teleport start-->
      <!--teleport end-->"
    `,
    );

    visible.value = true;
    await nextTick();
    expect(ctx.teleportEl.innerHTML).toMatchInlineSnapshot(
      `"<div class="h-drawer" style="position: absolute; z-index: 2002;"><transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><div class="h-drawer__mask" style="z-index: inherit; position: absolute;"></div></transition-stub><transition-stub name="h-drawer-slide-right" appear="true" persisted="false" css="true"><div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-drawer__container h-drawer--right" style="z-index: 2003; width: 418.666667px; height: 100%; position: absolute;"><div class="h-drawer__main"><div id="v-0" class="h-drawer__header h-drawer__header--customize"><div class="h-drawer__default-title">drawer title</div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-drawer__closable h-drawer__closable" type="button" tabindex="0" autofocus="false" aria-label="Close drawer"><div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;"><path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path></svg></div><!----><!----></button></div><div class="h-drawer__body"><div>drawer content</div></div><div class="h-drawer__footer"><div class="h-drawer__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="h-button__content"><!----></div><!----></button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: var(--h-spacing-5);"><!----><div class="h-button__content"><!----></div><!----></button></div></div><!----></div></div></transition-stub></div>"`,
    );

    expect(ctx.teleportEl.querySelector('.h-drawer__header')?.textContent).toBe(dTitle);
    expect(ctx.teleportEl.querySelector('.h-drawer__body')?.textContent).toBe(dContent);
    expect(ctx.teleportEl.querySelectorAll('.h-button').length).toBe(3);
  });

  test('Drawer open #emits', async () => {
    const visible = ref(false);
    const open = vi.fn();
    const opened = vi.fn();
    const wrapper = mount(
      () => (
        <Drawer visible={visible.value} onOpen={open} onOpened={opened}>
          <div>Hello World</div>
        </Drawer>
      ),
      { global: { stubs: { teleport: false, transition: false } } },
    );
    expect(wrapper.findComponent(Drawer).exists()).toBe(true);

    visible.value = true;
    await nextTick();
    expect(open).toBeCalledTimes(1);
    setTimeout(() => {
      expect(opened).toBeCalledTimes(1);
    }, 300);
  });

  test('Drawer close #emits', async () => {
    const visible = ref(true);
    const close = vi.fn();
    const closed = vi.fn();
    const wrapper = mount(
      () => (
        <Drawer
          to={null}
          visible={visible.value}
          onUpdate:visible={v => {
            visible.value = v;
          }}
          onClose={close}
          onClosed={closed}
        >
          <div>Hello World</div>
        </Drawer>
      ),
      { global: { stubs: { teleport: false, transition: false } } },
    );
    expect(wrapper.findComponent(Drawer).exists()).toBe(true);

    await wrapper.find('.h-button--plain').trigger('click');
    await nextTick();
    expect(close).toBeCalledTimes(1);
    expect(visible.value).toBe(false);
    setTimeout(() => {
      expect(closed).toBeCalledTimes(1);
    }, 300);
  });

  test('Drawer ok/cancel #emits', async () => {
    const visible = ref(true);
    const ok = vi.fn();
    const cancel = vi.fn();
    const wrapper = mount(() => (
      <Drawer
        to={null}
        visible={visible.value}
        onUpdate:visible={flag => (visible.value = flag)}
        onOk={ok}
        onCancel={cancel}
      >
        <div>Hello World</div>
      </Drawer>
    ));
    expect(wrapper.findComponent(Drawer).exists()).toBe(true);

    await wrapper.find('.h-button--primary').trigger('click');
    expect(ok).toBeCalledTimes(1);

    await wrapper.find('.h-button--plain').trigger('click');
    expect(cancel).toBeCalledTimes(1);
    expect(visible.value).toBe(false);
  });

  test('Drawer direction #emits', async () => {
    const visible = ref(true);
    const open = vi.fn();
    const opened = vi.fn();
    const close = vi.fn();
    const closed = vi.fn();
    const wrapper = mount(
      () => (
        <Drawer
          visible={visible.value}
          onOpen={open}
          onOpened={opened}
          onClose={close}
          onClosed={closed}
        >
          <div>Hello World</div>
        </Drawer>
      ),
      { global: { stubs: { Transition: false } } },
    );
    expect(wrapper.findComponent(Drawer).exists()).toBe(true);
    expect(open).not.toBeCalled();
    // setTimeout(() => {
    //   expect(opened).not.toBeCalled();
    // }, 300);

    visible.value = false;
    await nextTick();
    expect(close).toHaveBeenCalled();
    // setTimeout(() => {
    //   expect(closed).toHaveBeenCalledOnce();
    // }, 300);
  });

  test('Drawer destroyOnClose #props', async () => {
    const visible = ref(true);

    const UserForm = defineComponent({
      setup() {
        const username = ref('');

        return () => {
          return (
            <input
              value={username.value}
              onChange={e => {
                username.value = (e.target as HTMLInputElement).value ?? '';
              }}
            />
          );
        };
      },
    });

    const destroyOnClose = ref(false);
    const wrapper = mount(() => (
      <Drawer to={null} visible={visible.value} destroyOnClose={destroyOnClose.value}>
        <UserForm />
      </Drawer>
    ));

    expect(wrapper.findComponent(Drawer).exists()).toBe(true);

    visible.value = true;
    await nextTick();

    expect(wrapper.findComponent(UserForm).exists()).toBe(true);
    const input = wrapper.find('input');
    const testValue = 'Hello World';
    await input.setValue(testValue);
    visible.value = false;
    await nextTick();
    visible.value = true;
    await nextTick();
    expect(input.element.value).toBe(testValue);
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<!--teleport start-->
      <div class="h-drawer" style="position: absolute; z-index: 2009;">
        <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
          <div class="h-drawer__mask" style="z-index: inherit; position: absolute;"></div>
        </transition-stub>
        <transition-stub name="h-drawer-slide-right" appear="true" persisted="true" css="true">
          <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-drawer__container h-drawer--right" style="z-index: 2010; width: 418.666667px; height: 100%; position: absolute;">
            <div class="h-drawer__main">
              <div id="v-0" class="h-drawer__header h-drawer__header--customize">
                <div class="h-drawer__default-title">
                  <!---->
                </div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-drawer__closable h-drawer__closable" type="button" tabindex="0" autofocus="false" aria-label="Close drawer">
                  <div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;">
                      <path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path>
                    </svg></div>
                  <!---->
                  <!---->
                </button>
              </div>
              <div class="h-drawer__body"><input value="Hello World"></div>
              <div class="h-drawer__footer">
                <div class="h-drawer__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                    <!---->
                    <div class="h-button__content">
                      <!---->
                    </div>
                    <!---->
                  </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: var(--h-spacing-5);">
                    <!---->
                    <div class="h-button__content">
                      <!---->
                    </div>
                    <!---->
                  </button></div>
              </div>
              <!---->
            </div>
          </div>
        </transition-stub>
      </div>
      <!--teleport end-->"
    `);

    visible.value = false;
    destroyOnClose.value = true;
    await nextTick();
    visible.value = true;
    await nextTick();
    expect(wrapper.find('input').element.value).toBe('');
  });
});
