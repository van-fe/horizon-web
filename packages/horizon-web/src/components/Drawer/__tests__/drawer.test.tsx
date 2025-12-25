import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref, defineComponent } from 'vue';
import Drawer from '../src/Drawer';

interface LocalTestContext {
  teleportEl: HTMLElement;
}

describe('Drawer.tsx v2', () => {
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
      <Drawer v2 to="#test" visible={visible.value} title={dTitle}>
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
      `"<div class="n-drawer" style="position: absolute; z-index: 2002;"><transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><div class="n-drawer__mask" style="z-index: inherit; position: absolute;"></div></transition-stub><transition-stub name="n-drawer-slide-right" appear="true" persisted="false" css="true"><div class="n-drawer__container n-drawer--right" style="z-index: 2003; width: 418.666667px; height: 100%; position: absolute;"><div class="n-drawer__main"><div class="n-drawer__header n-drawer__header--customize"><div class="n-drawer__default-title">drawer title</div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-drawer__closable n-drawer__closable" type="button" tabindex="0" autofocus="false"><div class="n-button__icon is-custom-size"><i class="a-icon n-icon__v2_11_24 n-icon_close" style="font-size: 16px; transform: rotate(undefineddeg);"></i></div><!----><!----></button></div><div class="n-drawer__body"><div>drawer content</div></div><div class="n-drawer__footer"><div class="n-drawer__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="n-button__content"><!----></div><!----></button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: var(--n-spacing-5);"><!----><div class="n-button__content"><!----></div><!----></button></div></div><!----></div></div></transition-stub></div>"`,
    );

    expect(ctx.teleportEl.querySelector('.n-drawer__header')?.textContent).toBe(dTitle);
    expect(ctx.teleportEl.querySelector('.n-drawer__body')?.textContent).toBe(dContent);
    expect(ctx.teleportEl.querySelectorAll('.n-button').length).toBe(3);
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

    await wrapper.find('.n-button--plain').trigger('click');
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
        visible={visible.value}
        onUpdate:modelValue={flag => (visible.value = flag)}
        onOk={ok}
        onCancel={cancel}
      >
        <div>Hello World</div>
      </Drawer>
    ));
    expect(wrapper.findComponent(Drawer).exists()).toBe(true);

    await wrapper.find('.n-button--primary').trigger('click');
    expect(ok).toBeCalledTimes(1);

    await wrapper.find('.n-button--plain').trigger('click');
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
      <Drawer v2 to={null} visible={visible.value} destroyOnClose={destroyOnClose.value}>
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
      <div class="n-drawer" style="position: absolute; z-index: 2009;">
        <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
          <div class="n-drawer__mask" style="z-index: inherit; position: absolute;"></div>
        </transition-stub>
        <transition-stub name="n-drawer-slide-right" appear="true" persisted="true" css="true">
          <div class="n-drawer__container n-drawer--right" style="z-index: 2010; width: 418.666667px; height: 100%; position: absolute;">
            <div class="n-drawer__main">
              <div class="n-drawer__header n-drawer__header--customize">
                <div class="n-drawer__default-title">
                  <!---->
                </div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-drawer__closable n-drawer__closable" type="button" tabindex="0" autofocus="false">
                  <div class="n-button__icon is-custom-size"><i class="a-icon n-icon__v2_11_24 n-icon_close" style="font-size: 16px; transform: rotate(undefineddeg);"></i></div>
                  <!---->
                  <!---->
                </button>
              </div>
              <div class="n-drawer__body"><input value="Hello World"></div>
              <div class="n-drawer__footer">
                <div class="n-drawer__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                    <!---->
                    <div class="n-button__content">
                      <!---->
                    </div>
                    <!---->
                  </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: var(--n-spacing-5);">
                    <!---->
                    <div class="n-button__content">
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

  // test('Drawer mask-click/icon-click #emits', async () => {
  //   const visible = ref(true);
  //   const maskClick = vi.fn();
  //   const iconClick = vi.fn();
  //   const wrapper = mount(() => (
  //     <Drawer v2 to={null} visible={visible.value} onMaskClick={maskClick} onIconClick={iconClick}>
  //       <div>Hello World</div>
  //     </Drawer>
  //   ));
  //   expect(wrapper.findComponent(Drawer).exists()).toBe(true);

  //   await wrapper.find('.n-drawer__mask').trigger('click');
  //   expect(maskClick).toBeCalledTimes(1);

  //   await wrapper.find('.n-drawer__closable').trigger('click');
  //   expect(iconClick).toBeCalledTimes(1);
  // });
});
