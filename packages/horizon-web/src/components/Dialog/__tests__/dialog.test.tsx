import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { resetPopupContainerGetter } from '@aurora/utils';
import { HApplication } from '../../Application';
import { HButton } from '../../Button/index';
import type { DialogProps } from '../src/composables/useProps';
import HDialog from '../src/Dialog';

const createUglinessDebounce = () => {
  let resolve: () => void;
  let timer: NodeJS.Timeout;
  const promise = new Promise<void>(r => {
    resolve = r;
  });
  return async (ms = 300) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      resolve();
    }, ms);
    return promise;
  };
};

describe('Dialog.tsx', () => {
  test('basic', async () => {
    const visible = ref(true);
    const wrapper = mount(() => <HDialog visible={visible.value} to={null} />);
    const element = wrapper.findComponent(HDialog);

    expect(element.exists()).toBe(true);
    expect(wrapper.html()).toMatchInlineSnapshot(
      `
      "<!--teleport start-->
      <div class="h-dialog" style="z-index: 2001;">
        <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
          <div class="h-dialog__mask" style="z-index: 2001;"></div>
        </transition-stub>
        <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
          <div role="dialog" aria-modal="true" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2002;">
            <div class="h-dialog__inner">
              <!---->
              <div class="h-dialog__main">
                <!---->
                <div class="h-dialog__body"></div>
                <div class="h-dialog__footer">
                  <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                      <!---->
                      <div class="h-button__content">
                        <!---->
                      </div>
                      <!---->
                    </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                      <!---->
                      <div class="h-button__content">
                        <!---->
                      </div>
                      <!---->
                    </button></div>
                </div>
              </div>
            </div>
          </div>
        </transition-stub>
      </div>
      <!--teleport end-->"
    `,
    );
  });

  test('direct render', async () => {
    const wrapper = mount(() => <HDialog title="Title" to={null} visible={true} />);
    const element = wrapper.findComponent(HDialog);

    expect(element.exists()).toBe(true);
    expect(wrapper.find('.h-dialog__header').text()).toBe('Title');
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<!--teleport start-->
      <div class="h-dialog" style="z-index: 2002;">
        <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
          <div class="h-dialog__mask" style="z-index: 2002;"></div>
        </transition-stub>
        <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
          <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2003;">
            <div class="h-dialog__inner">
              <!---->
              <div class="h-dialog__main">
                <div id="v-0" class="h-dialog__header">
                  <div class="h-dialog__default-title">
                    <div class="h-dialog__default-title--text">Title</div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-dialog__header-close h-dialog__header-close" type="button" tabindex="0" autofocus="false" aria-label="Close dialog">
                      <div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;">
                          <path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path>
                        </svg></div>
                      <!---->
                      <!---->
                    </button>
                  </div>
                </div>
                <div class="h-dialog__body"></div>
                <div class="h-dialog__footer">
                  <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                      <!---->
                      <div class="h-button__content">
                        <!---->
                      </div>
                      <!---->
                    </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                      <!---->
                      <div class="h-button__content">
                        <!---->
                      </div>
                      <!---->
                    </button></div>
                </div>
              </div>
            </div>
          </div>
        </transition-stub>
      </div>
      <!--teleport end-->"
    `);
  });

  describe('props', () => {
    test('lockScroll', () => {
      mount(() => <HDialog visible={true} />, {
        attachTo: document.body,
      });

      expect(document.body.dataset.popupParentHidden).not.toBeUndefined();
    });

    test('top', async () => {
      const top = 200;
      const wrapper = mount(() => <HDialog top={top} visible={false} to={null} />, {
        attachTo: document.body,
      });

      expect(wrapper.find('.h-dialog__container').attributes('style')).toContain(`top: ${top}px`);
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2003;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <!---->
          </transition-stub>
          <transition-stub name="h-dialog__normal" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2004; top: 200px; transform: translateY(0); display: none;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <!---->
                  <div class="h-dialog__body"></div>
                  <div class="h-dialog__footer">
                    <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button></div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);
    });

    test('size', async () => {
      const size = ref<DialogProps['size']>('medium');
      const wrapper = mount(() => <HDialog visible={false} to={null} size={size.value} />, {
        attachTo: document.body,
      });

      expect(wrapper.find('.h-dialog__container').classes('h-dialog--medium')).eq(true);

      size.value = 'huge';

      await nextTick();

      expect(wrapper.find('.h-dialog__container').classes('h-dialog--huge')).eq(true);
    });

    test('destroyOnClose', async () => {
      const destroyOnClose = ref(false);
      const visible = ref(false);
      const wrapper = mount(
        () => <HDialog visible={visible.value} to={null} destroyOnClose={destroyOnClose.value} />,
        { attachTo: document.body },
      );

      visible.value = true;
      await nextTick();
      expect(wrapper.find('.h-dialog__container').exists()).eq(true);
      visible.value = false;
      expect(wrapper.find('.h-dialog__container').exists()).eq(true);

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2004;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="h-dialog__mask" style="z-index: 2004;"></div>
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2005;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <!---->
                  <div class="h-dialog__body"></div>
                  <div class="h-dialog__footer">
                    <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button></div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);

      destroyOnClose.value = true;
      visible.value = true;
      await nextTick();
      expect(wrapper.find('.h-dialog__container').exists()).eq(true);
      visible.value = false;
      await nextTick();
      expect(wrapper.find('.h-dialog__container').exists()).eq(false);
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2004;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <!---->
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="false" css="true">
            <!---->
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);
    });

    test('draggable', async () => {
      const wrapper = mount(() => <HDialog visible={true} title="Title" to={null} draggable />);

      expect(wrapper.find('.h-dialog__header--draggable').exists()).eq(true);
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2005;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="h-dialog__mask" style="z-index: 2005;"></div>
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2006;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <div id="v-0" class="h-dialog__header h-dialog__header--draggable">
                    <div class="h-dialog__default-title">
                      <div class="h-dialog__default-title--text">Title</div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-dialog__header-close h-dialog__header-close" type="button" tabindex="0" autofocus="false" aria-label="Close dialog">
                        <div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;">
                            <path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="h-dialog__body"></div>
                  <div class="h-dialog__footer">
                    <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button></div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);
    });

    test('to', async () => {
      const el = document.createElement('div');
      document.body.appendChild(el);

      const getPopupContainer = vi.fn(() => el);
      const wrapper = mount(() => (
        <HApplication getPopupContainer={getPopupContainer}>
          <HDialog visible={true} to={el}>
            <div>Hello World</div>
          </HDialog>
        </HApplication>
      ));

      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div data-v-app=""></div><div data-v-app=""></div><div data-v-app=""></div><div data-v-app=""></div><div><div class="h-dialog" style="z-index: 2006;"><transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><div class="h-dialog__mask" style="z-index: 2006;"></div></transition-stub><transition-stub name="h-dialog__move" appear="true" persisted="true" css="true"><div role="dialog" aria-modal="true" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2007;"><div class="h-dialog__inner"><!----><div class="h-dialog__main"><!----><div class="h-dialog__body"><div>Hello World</div></div><div class="h-dialog__footer"><div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="h-button__content"><!----></div><!----></button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;"><!----><div class="h-button__content"><!----></div><!----></button></div></div></div></div></div></transition-stub></div></div>"`,
      );

      expect(wrapper.findComponent(HDialog).exists()).toBe(true);
      expect(el.querySelector('.h-dialog')).not.toBeNull();

      document.body.innerHTML = '';
      resetPopupContainerGetter();
    });
  });

  describe('emits', () => {
    test('button click', async () => {
      const onOk = vi.fn();
      const onCancel = vi.fn();
      const onIconClose = vi.fn();

      const wrapper = mount(
        () => (
          <HDialog
            title="Title"
            to={null}
            visible={true}
            onOk={onOk}
            onCancel={onCancel}
            onCloseIconClick={onIconClose}
          />
        ),
        { attachTo: 'body' },
      );

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2007;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="h-dialog__mask" style="z-index: 2007;"></div>
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2008;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <div id="v-0" class="h-dialog__header">
                    <div class="h-dialog__default-title">
                      <div class="h-dialog__default-title--text">Title</div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-dialog__header-close h-dialog__header-close" type="button" tabindex="0" autofocus="false" aria-label="Close dialog">
                        <div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;">
                            <path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="h-dialog__body"></div>
                  <div class="h-dialog__footer">
                    <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button></div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);

      const dialog = wrapper.findComponent(HDialog);
      expect(onOk).not.toHaveBeenCalled();
      expect(onCancel).not.toHaveBeenCalled();
      const buttons = wrapper.findAllComponents(HButton);
      expect(buttons.length).toBe(3);
      await buttons[0].trigger('click');
      expect(onIconClose).toBeCalledTimes(1);
      await buttons[1].trigger('click');

      expect(onCancel).toBeCalledTimes(1);
      await buttons[2].trigger('click');
      expect(onOk).toBeCalledTimes(1);

      expect(dialog.emitted()).toHaveProperty('closeIconClick');
      expect(dialog.emitted()).toHaveProperty('cancel');
      expect(dialog.emitted()).toHaveProperty('ok');
    });

    test('lifecycle', async () => {
      const visible = ref(false);
      const wrapper = mount(() => <HDialog title="Title" visible={visible.value} to={null} />);

      const dialog = wrapper.findComponent(HDialog);

      expect(dialog.emitted()).not.toHaveProperty('open');
      expect(dialog.emitted()).not.toHaveProperty('opened');
      expect(dialog.emitted()).not.toHaveProperty('close');
      expect(dialog.emitted()).not.toHaveProperty('closed');

      visible.value = true;
      await nextTick();
      expect(dialog.emitted()).toHaveProperty('open');
      setTimeout(() => {
        expect(dialog.emitted()).toHaveProperty('opened');
      }, 300);

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2008;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="h-dialog__mask" style="z-index: 2008;"></div>
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2009;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <div id="v-0" class="h-dialog__header">
                    <div class="h-dialog__default-title">
                      <div class="h-dialog__default-title--text">Title</div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-dialog__header-close h-dialog__header-close" type="button" tabindex="0" autofocus="false" aria-label="Close dialog">
                        <div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;">
                            <path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="h-dialog__body"></div>
                  <div class="h-dialog__footer">
                    <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button></div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);
      visible.value = false;
      await nextTick();
      expect(dialog.emitted()).toHaveProperty('close');
      setTimeout(() => {
        expect(dialog.emitted()).toHaveProperty('closed');
      }, 300);
    });

    test('misc event', async () => {
      vi.useFakeTimers();
      const confirmDebounceFinished = vi.fn();
      const cancelDebounceFinished = vi.fn();
      const wrapper = mount(() => (
        <HDialog
          title="Title"
          visible={true}
          to={null}
          okButtonProps={{ debounceType: 'none', debounceFn: createUglinessDebounce() }}
          cancelButtonProps={{ debounceType: 'none', debounceFn: createUglinessDebounce() }}
          onConfirmDebounceFinished={confirmDebounceFinished}
          onCancelDebounceFinished={cancelDebounceFinished}
        />
      ));

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2009;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="h-dialog__mask" style="z-index: 2009;"></div>
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2010;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <div id="v-0" class="h-dialog__header">
                    <div class="h-dialog__default-title">
                      <div class="h-dialog__default-title--text">Title</div><button class="h-button h-button--normal h-button--small h-button--text h-button--equally is-solid is-with-icon h-dialog__header-close h-dialog__header-close" type="button" tabindex="0" autofocus="false" aria-label="Close dialog">
                        <div class="h-button__icon is-custom-size"><svg class="a-icon h-icon_close h-icon__close" viewBox="0 0 24 24" fill="none" style="width: 16px; height: 16px; font-size: 16px; display: inline-block; vertical-align: inherit;">
                            <path d="M11.9999 10.9517L19.9429 3C20.5267 3.58446 20.5267 4.53206 19.9429 5.11652L13.057 12.01L21 19.9617C20.4162 20.5461 19.4696 20.5461 18.8858 19.9617L11.9999 13.0682L5.11419 19.9615C4.53038 20.546 3.58382 20.546 3 19.9615L10.9428 12.01L4.0571 5.11664C3.47328 4.53217 3.47328 3.58458 4.0571 3.00011L11.9999 10.9517Z" fill="currentColor"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="h-dialog__body"></div>
                  <div class="h-dialog__footer">
                    <div class="h-dialog__default-footer"><button class="h-button h-button--normal h-button--medium h-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="h-button h-button--primary h-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="h-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button></div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);
      const dialog = wrapper.findComponent(HDialog);

      expect(dialog.emitted()).not.toHaveProperty('maskClick');
      expect(dialog.emitted()).not.toHaveProperty('confirmDebounceFinished');
      expect(dialog.emitted()).not.toHaveProperty('cancelDebounceFinished');

      await wrapper.find('.h-dialog__mask').trigger('click');
      expect(dialog.emitted()).toHaveProperty('maskClick');

      const okButton = wrapper.find('.h-dialog__footer .h-button--primary');
      const cancelButton = wrapper.find('.h-dialog__footer .h-button--normal');
      const cc = 10;
      await Promise.all([
        ...Array(cc)
          .fill(0)
          .map(() => okButton.trigger('click')),
        ...Array(cc)
          .fill(0)
          .map(() => cancelButton.trigger('click')),
      ]);
      vi.runAllTimers();
      await flushPromises();
      expect(dialog.emitted()).toHaveProperty('confirmDebounceFinished');
      expect(dialog.emitted()).toHaveProperty('cancelDebounceFinished');
      expect(confirmDebounceFinished).toBeCalledTimes(1);
      expect(cancelDebounceFinished).toBeCalledTimes(1);

      vi.restoreAllMocks();
    });
  });

  describe('slots', () => {
    test('layout', async () => {
      const customizeTitle = 'Header';
      const customizeFooter = 'Footer';
      const customizeBody = 'Body';

      const wrapper = mount(() => (
        <HDialog title="Title" to={null} visible={true}>
          {{
            title: () => <div class="c-title">{customizeTitle}</div>,
            default: () => <div class="c-body">{customizeBody}</div>,
            footer: () => <div class="c-footer">{customizeFooter}</div>,
          }}
        </HDialog>
      ));

      const dialog = wrapper.findComponent(HDialog);

      expect(dialog.find('.c-title').exists()).eq(true);
      expect(dialog.find('.c-body').exists()).eq(true);
      expect(dialog.find('.c-footer').exists()).eq(true);
      expect(dialog.find('.c-title').text()).eq(customizeTitle);
      expect(dialog.find('.c-body').text()).eq(customizeBody);
      expect(dialog.find('.c-footer').text()).eq(customizeFooter);

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<!--teleport start-->
        <div class="h-dialog" style="z-index: 2010;">
          <transition-stub name="h-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="h-dialog__mask" style="z-index: 2010;"></div>
          </transition-stub>
          <transition-stub name="h-dialog__move" appear="true" persisted="true" css="true">
            <div role="dialog" aria-modal="true" aria-labelledby="v-0" tabindex="-1" class="h-dialog__container h-dialog--medium h-dialog--center" style="z-index: 2011;">
              <div class="h-dialog__inner">
                <!---->
                <div class="h-dialog__main">
                  <div id="v-0" class="h-dialog__header">
                    <div class="c-title">Header</div>
                  </div>
                  <div class="h-dialog__body">
                    <div class="c-body">Body</div>
                  </div>
                  <div class="h-dialog__footer">
                    <div class="c-footer">Footer</div>
                  </div>
                </div>
              </div>
            </div>
          </transition-stub>
        </div>
        <!--teleport end-->"
      `);
    });
  });
});
