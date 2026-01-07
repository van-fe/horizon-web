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
      <div class="n-dialog" style="z-index: 2001;">
        <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
          <div class="n-dialog__mask" style="z-index: 2001;"></div>
        </transition-stub>
        <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
          <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2002;">
            <div class="n-dialog__inner">
              <!---->
              <div class="n-dialog__main">
                <!---->
                <div class="n-dialog__body"></div>
                <div class="n-dialog__footer">
                  <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                      <!---->
                      <div class="n-button__content">
                        <!---->
                      </div>
                      <!---->
                    </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                      <!---->
                      <div class="n-button__content">
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
      <div class="n-dialog" style="z-index: 2002;">
        <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
          <div class="n-dialog__mask" style="z-index: 2002;"></div>
        </transition-stub>
        <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
          <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2003;">
            <div class="n-dialog__inner">
              <!---->
              <div class="n-dialog__main">
                <div class="n-dialog__header">
                  <div class="n-dialog__default-title">
                    <div class="n-dialog__default-title--text">Title</div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-dialog__header-close n-dialog__header-close" type="button" tabindex="0" autofocus="false">
                      <div class="n-button__icon is-custom-size"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__close" style="transform: rotate(undefineddeg);">
                          <path fill="currentColor" d="M12 10.95L19.94 3a1.5 1.5 0 010 2.12L13.06 12 21 19.96a1.5 1.5 0 01-2.11 0L12 13.06l-6.89 6.9a1.5 1.5 0 01-2.11 0l7.94-7.95-6.88-6.9a1.5 1.5 0 010-2.11L12 10.95z"></path>
                        </svg></div>
                      <!---->
                      <!---->
                    </button>
                  </div>
                </div>
                <div class="n-dialog__body"></div>
                <div class="n-dialog__footer">
                  <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                      <!---->
                      <div class="n-button__content">
                        <!---->
                      </div>
                      <!---->
                    </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                      <!---->
                      <div class="n-button__content">
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
        <div class="n-dialog" style="z-index: 2003;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <!---->
          </transition-stub>
          <transition-stub name="n-dialog__normal" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2004; top: 200px; transform: translateY(0); display: none;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <!---->
                  <div class="n-dialog__body"></div>
                  <div class="n-dialog__footer">
                    <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="n-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="n-button__content">
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

      expect(wrapper.find('.h-dialog__container').classes('n-dialog--medium')).eq(true);

      size.value = 'huge';

      await nextTick();

      expect(wrapper.find('.h-dialog__container').classes('n-dialog--huge')).eq(true);

      size.value = 416;

      await nextTick();

      expect(wrapper.find('.h-dialog__container').attributes('style')).contain('width: 416px');
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
        <div class="n-dialog" style="z-index: 2004;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="n-dialog__mask" style="z-index: 2004;"></div>
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2005;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <!---->
                  <div class="n-dialog__body"></div>
                  <div class="n-dialog__footer">
                    <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="n-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="n-button__content">
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
        <div class="n-dialog" style="z-index: 2004;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <!---->
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="false" css="true">
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
        <div class="n-dialog" style="z-index: 2005;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="n-dialog__mask" style="z-index: 2005;"></div>
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2006;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <div class="n-dialog__header n-dialog__header--draggable">
                    <div class="n-dialog__default-title">
                      <div class="n-dialog__default-title--text">Title</div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-dialog__header-close n-dialog__header-close" type="button" tabindex="0" autofocus="false">
                        <div class="n-button__icon is-custom-size"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__close" style="transform: rotate(undefineddeg);">
                            <path fill="currentColor" d="M12 10.95L19.94 3a1.5 1.5 0 010 2.12L13.06 12 21 19.96a1.5 1.5 0 01-2.11 0L12 13.06l-6.89 6.9a1.5 1.5 0 01-2.11 0l7.94-7.95-6.88-6.9a1.5 1.5 0 010-2.11L12 10.95z"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="n-dialog__body"></div>
                  <div class="n-dialog__footer">
                    <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="n-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="n-button__content">
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
        `"<div data-v-app=""><!--teleport start--><!--teleport end--></div><div class="n-dialog" style="z-index: 2003;"><transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><div class="n-dialog__mask" style="z-index: 2003;"></div></transition-stub><transition-stub name="n-dialog__move" appear="true" persisted="true" css="true"><div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2004;"><div class="n-dialog__inner"><!----><div class="n-dialog__main"><!----><div class="n-dialog__body"></div><div class="n-dialog__footer"><div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="n-button__content"><!----></div><!----></button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;"><!----><div class="n-button__content"><!----></div><!----></button></div></div></div></div></div></transition-stub></div><div data-v-app=""><!--teleport start--><div class="n-dialog" style="z-index: 2003;"><transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><!----></transition-stub><transition-stub name="n-dialog__normal" appear="true" persisted="true" css="true"><div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2004; top: 200px; transform: translateY(0); display: none;"><div class="n-dialog__inner"><!----><div class="n-dialog__main"><!----><div class="n-dialog__body"></div><div class="n-dialog__footer"><div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="n-button__content"><!----></div><!----></button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;"><!----><div class="n-button__content"><!----></div><!----></button></div></div></div></div></div></transition-stub></div><!--teleport end--></div><div data-v-app=""><!--teleport start--><div class="n-dialog" style="z-index: 2003;"><transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><!----></transition-stub><transition-stub name="n-dialog__move" appear="true" persisted="true" css="true"><div class="n-dialog__container n-dialog--center" style="z-index: 2004; display: none; width: 416px;"><div class="n-dialog__inner"><!----><div class="n-dialog__main"><!----><div class="n-dialog__body"></div><div class="n-dialog__footer"><div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="n-button__content"><!----></div><!----></button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;"><!----><div class="n-button__content"><!----></div><!----></button></div></div></div></div></div></transition-stub></div><!--teleport end--></div><div data-v-app=""><!--teleport start--><div class="n-dialog" style="z-index: 2004;"><transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><!----></transition-stub><transition-stub name="n-dialog__move" appear="true" persisted="false" css="true"><!----></transition-stub></div><!--teleport end--></div><div><div class="n-dialog" style="z-index: 2006;"><transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true"><div class="n-dialog__mask" style="z-index: 2006;"></div></transition-stub><transition-stub name="n-dialog__move" appear="true" persisted="true" css="true"><div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2007;"><div class="n-dialog__inner"><!----><div class="n-dialog__main"><!----><div class="n-dialog__body"><div>Hello World</div></div><div class="n-dialog__footer"><div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false"><!----><div class="n-button__content"><!----></div><!----></button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;"><!----><div class="n-button__content"><!----></div><!----></button></div></div></div></div></div></transition-stub></div></div>"`,
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
        <div class="n-dialog" style="z-index: 2007;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="n-dialog__mask" style="z-index: 2007;"></div>
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2008;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <div class="n-dialog__header">
                    <div class="n-dialog__default-title">
                      <div class="n-dialog__default-title--text">Title</div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-dialog__header-close n-dialog__header-close" type="button" tabindex="0" autofocus="false">
                        <div class="n-button__icon is-custom-size"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__close" style="transform: rotate(undefineddeg);">
                            <path fill="currentColor" d="M12 10.95L19.94 3a1.5 1.5 0 010 2.12L13.06 12 21 19.96a1.5 1.5 0 01-2.11 0L12 13.06l-6.89 6.9a1.5 1.5 0 01-2.11 0l7.94-7.95-6.88-6.9a1.5 1.5 0 010-2.11L12 10.95z"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="n-dialog__body"></div>
                  <div class="n-dialog__footer">
                    <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="n-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="n-button__content">
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
      expect(dialog.emitted()).toHaveProperty('secondaryClick');
      expect(dialog.emitted()).toHaveProperty('ok');
      expect(dialog.emitted()).toHaveProperty('primaryClick');
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
        <div class="n-dialog" style="z-index: 2008;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="n-dialog__mask" style="z-index: 2008;"></div>
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2009;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <div class="n-dialog__header">
                    <div class="n-dialog__default-title">
                      <div class="n-dialog__default-title--text">Title</div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-dialog__header-close n-dialog__header-close" type="button" tabindex="0" autofocus="false">
                        <div class="n-button__icon is-custom-size"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__close" style="transform: rotate(undefineddeg);">
                            <path fill="currentColor" d="M12 10.95L19.94 3a1.5 1.5 0 010 2.12L13.06 12 21 19.96a1.5 1.5 0 01-2.11 0L12 13.06l-6.89 6.9a1.5 1.5 0 01-2.11 0l7.94-7.95-6.88-6.9a1.5 1.5 0 010-2.11L12 10.95z"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="n-dialog__body"></div>
                  <div class="n-dialog__footer">
                    <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="n-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="n-button__content">
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
        <div class="n-dialog" style="z-index: 2009;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="n-dialog__mask" style="z-index: 2009;"></div>
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2010;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <div class="n-dialog__header">
                    <div class="n-dialog__default-title">
                      <div class="n-dialog__default-title--text">Title</div><button class="n-button n-button--normal n-button--small n-button--text n-button--equally is-solid is-with-icon n-dialog__header-close n-dialog__header-close" type="button" tabindex="0" autofocus="false">
                        <div class="n-button__icon is-custom-size"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__close" style="transform: rotate(undefineddeg);">
                            <path fill="currentColor" d="M12 10.95L19.94 3a1.5 1.5 0 010 2.12L13.06 12 21 19.96a1.5 1.5 0 01-2.11 0L12 13.06l-6.89 6.9a1.5 1.5 0 01-2.11 0l7.94-7.95-6.88-6.9a1.5 1.5 0 010-2.11L12 10.95z"></path>
                          </svg></div>
                        <!---->
                        <!---->
                      </button>
                    </div>
                  </div>
                  <div class="n-dialog__body"></div>
                  <div class="n-dialog__footer">
                    <div class="n-dialog__default-footer"><button class="n-button n-button--normal n-button--medium n-button--plain is-solid" type="button" tabindex="0" autofocus="false">
                        <!---->
                        <div class="n-button__content">
                          <!---->
                        </div>
                        <!---->
                      </button><button class="n-button n-button--primary n-button--medium is-solid" type="button" tabindex="0" autofocus="false" style="margin-left: 16px;">
                        <!---->
                        <div class="n-button__content">
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
        <div class="n-dialog" style="z-index: 2010;">
          <transition-stub name="n-fade-in-normal" duration="300" appear="true" persisted="false" css="true">
            <div class="n-dialog__mask" style="z-index: 2010;"></div>
          </transition-stub>
          <transition-stub name="n-dialog__move" appear="true" persisted="true" css="true">
            <div class="n-dialog__container n-dialog--medium n-dialog--center" style="z-index: 2011;">
              <div class="n-dialog__inner">
                <!---->
                <div class="n-dialog__main">
                  <div class="n-dialog__header">
                    <div class="c-title">Header</div>
                  </div>
                  <div class="n-dialog__body">
                    <div class="c-body">Body</div>
                  </div>
                  <div class="n-dialog__footer">
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
