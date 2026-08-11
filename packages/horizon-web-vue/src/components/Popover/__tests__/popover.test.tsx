import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref, Transition } from 'vue';
import HPopover from '../src/Popover';
import HButton from '../../Button';
import HPopContent from '../src/PopContent';
import { usePopoverEmits } from '../src/composables/useEmits';
import HApplication from '../../Application/src/Application';
import { resetPopupContainerGetter } from '@aurora/utils';
import { HPopover as PublicPopover, HPopContent as PublicPopContent } from '..';

interface PopoverPublicApi {
  switchVisible: (visible: boolean) => void;
  updatePosition: () => void;
  referenceDom: HTMLSpanElement;
  popoverDom: HTMLSpanElement;
}

describe('Popover.tsx', () => {
  test('exports installable public Popover and PopContent components', () => {
    expect(PublicPopover.install).toBeTypeOf('function');
    expect(PublicPopContent.install).toBeTypeOf('function');
  });

  test('basic', async () => {
    const wrapper = shallowMount(() => <HPopover />);
    const element = wrapper.findComponent(HPopover);

    expect(element.exists()).toBe(true);
  });

  describe('props', () => {
    test('click keeps the popper open until clicking outside', async () => {
      const wrapper = mount(() => (
        <HPopover toBody={false} trigger="click">
          {{
            reference: () => <HButton>Trigger</HButton>,
            popper: () => <div class="popper">Popper</div>,
          }}
        </HPopover>
      ));

      await wrapper.findComponent(HButton).trigger('click');
      await new Promise(resolve => window.setTimeout(resolve));

      const popper = wrapper.find('.popper');
      expect(popper.exists()).toBe(true);

      await popper.trigger('click');
      expect(wrapper.find('.popper').exists()).toBe(true);

      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();

      expect(wrapper.find('.popper').exists()).toBe(false);
    });

    test('toBody', async () => {
      const wrapper = mount(() => <HPopover toBody={true} trigger="manual" visible={true} />);
      const element = wrapper.findComponent(Transition);

      expect(element.element.parentElement).toBe(document.body);
    });

    test('to', async () => {
      const el = document.createElement('div');
      el.id = 'target';
      document.body.appendChild(el);

      const wrapper = mount(() => <HPopover to="#target" trigger="manual" visible={true} />);
      const element = wrapper.findComponent(Transition);

      expect(element.element.parentElement).toBe(el);

      wrapper.unmount();
      el.remove();
    });
  });

  test('renders both slots, visual props, transition and mask in their configured targets', async () => {
    const popupTarget = document.createElement('div');
    popupTarget.id = 'popover-contract-popup';
    const maskTarget = document.createElement('div');
    maskTarget.id = 'popover-contract-mask';
    document.body.append(popupTarget, maskTarget);

    const wrapper = mount(HPopover, {
      props: {
        trigger: 'manual',
        visible: true,
        to: '#popover-contract-popup',
        arrow: false,
        popperClass: 'contract-popup',
        popperStyle: { color: 'rgb(1, 2, 3)', zIndex: 456 },
        referenceClass: 'contract-reference',
        transitionName: 'zoom-in-center',
        transitionSpeed: 'fast',
        theme: 'dark',
        zIndex: 123,
        showWithMask: {
          enable: true,
          to: '#popover-contract-mask',
          class: 'contract-mask',
          style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
        },
      },
      slots: {
        reference: () => <button data-test="popover-reference">Open</button>,
        popper: () => <div data-test="popover-content">Content</div>,
      },
    });
    await new Promise(resolve => window.setTimeout(resolve));
    await nextTick();

    expect(wrapper.get('.h-popover__reference').classes()).toEqual(
      expect.arrayContaining(['is-dark', 'contract-reference']),
    );
    expect(wrapper.get('[data-test="popover-reference"]').text()).toBe('Open');
    const popup = popupTarget.querySelector<HTMLElement>('.h-popover__popper');
    expect(popup?.classList.contains('contract-popup')).toBe(true);
    expect(popup?.style.color).toBe('rgb(1, 2, 3)');
    expect(popup?.style.zIndex).toBe('456');
    expect(popup?.querySelector('[data-test="popover-content"]')?.textContent).toBe('Content');
    expect(popup?.querySelector('[data-popper-arrow]')).toBeNull();
    const transition = wrapper.findComponent({ name: 'HTransition' });
    expect(transition.props()).toMatchObject({ name: 'zoom-in-center', speed: 'fast' });
    const mask = maskTarget.querySelector<HTMLElement>('.h-popover__mask');
    expect(mask?.classList.contains('contract-mask')).toBe(true);
    expect(mask?.style.backgroundColor).toBe('rgba(0, 0, 0, 0.2)');

    wrapper.unmount();
    popupTarget.remove();
    maskTarget.remove();
  });

  test('inherits the public Application popup container and defaults mask teleport to body', async () => {
    const popupTarget = document.createElement('div');
    document.body.appendChild(popupTarget);
    const getPopupContainer = vi.fn(() => popupTarget);
    const wrapper = mount(() => (
      <HApplication getPopupContainer={getPopupContainer}>
        <HPopover
          trigger="manual"
          visible
          toBody={false}
          showWithMask={{ enable: true, class: 'body-mask' }}
        >
          {{
            reference: () => <button>Reference</button>,
            popper: () => <span data-test="application-popup">Popup</span>,
          }}
        </HPopover>
      </HApplication>
    ));
    await new Promise(resolve => window.setTimeout(resolve));

    expect(getPopupContainer).toHaveBeenCalled();
    expect(popupTarget.querySelector('[data-test="application-popup"]')).not.toBeNull();
    expect(document.body.querySelector('.body-mask')).not.toBeNull();
    wrapper.unmount();
    resetPopupContainerGetter();
    popupTarget.remove();
  });

  test('emits hover and click events once with native payloads and honors timing props', async () => {
    const onShow = vi.fn();
    const onHide = vi.fn();
    const onEnterReference = vi.fn();
    const onLeaveReference = vi.fn();
    const wrapper = mount(HPopover, {
      props: {
        toBody: false,
        trigger: 'hover',
        hoverShowDelay: 10,
        hoverHideDelay: 10,
        onShow,
        onHide,
        onEnterReference,
        onLeaveReference,
      },
      slots: {
        reference: () => <button>Hover reference</button>,
        popper: () => <span data-test="hover-popper">Hover popup</span>,
      },
    });
    const reference = wrapper.get('.h-popover__reference');
    const initialHideCount = onHide.mock.calls.length;

    await reference.trigger('mouseenter');
    expect(onEnterReference).toHaveBeenCalledTimes(1);
    expect(onEnterReference.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    await new Promise(resolve => window.setTimeout(resolve, 15));
    expect(onShow).toHaveBeenCalledTimes(1);
    expect(wrapper.find('[data-test="hover-popper"]').exists()).toBe(true);

    await reference.trigger('mouseleave');
    expect(onLeaveReference).toHaveBeenCalledTimes(1);
    expect(onLeaveReference.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    await new Promise(resolve => window.setTimeout(resolve, 15));
    expect(onHide).toHaveBeenCalledTimes(initialHideCount + 1);

    const onClick = vi.fn();
    await wrapper.setProps({ trigger: 'click', onClick });
    await reference.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  test('hover timers cancel while moving between the reference and popper', async () => {
    const onShow = vi.fn();
    const onHide = vi.fn();
    const wrapper = mount(HPopover, {
      props: {
        toBody: false,
        trigger: 'hover',
        hoverShowDelay: 25,
        hoverHideDelay: 25,
        onShow,
        onHide,
      },
      slots: {
        reference: () => <button>Hover safely</button>,
        popper: () => <span data-test="safe-hover-popper">Popup</span>,
      },
    });
    const reference = wrapper.get('.h-popover__reference');
    const initialHideCount = onHide.mock.calls.length;

    await reference.trigger('mouseenter');
    await reference.trigger('mouseleave');
    await new Promise(resolve => window.setTimeout(resolve, 30));
    expect(onShow).not.toHaveBeenCalled();

    await reference.trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 30));
    expect(onShow).toHaveBeenCalledOnce();
    const popper = wrapper.get('.h-popover__popper');
    await reference.trigger('mouseleave');
    await popper.trigger('mouseenter');
    await new Promise(resolve => window.setTimeout(resolve, 30));
    expect(onHide).toHaveBeenCalledTimes(initialHideCount);
    expect(wrapper.find('[data-test="safe-hover-popper"]').exists()).toBe(true);

    await popper.trigger('mouseleave');
    await new Promise(resolve => window.setTimeout(resolve, 30));
    expect(onHide).toHaveBeenCalledTimes(initialHideCount + 1);
  });

  test('PopContent renders its default slot and inherits or owns the public theme', () => {
    const standalone = mount(HPopContent, {
      props: { theme: 'dark' },
      slots: { default: () => <span data-test="popcontent">Body</span> },
    });
    expect(standalone.classes()).toContain('is-dark');
    expect(standalone.get('[data-test="popcontent"]').text()).toBe('Body');

    const inherited = mount(() => (
      <HPopover toBody={false} trigger="manual" visible theme="dark">
        {{
          reference: () => <button>Open</button>,
          popper: () => <HPopContent theme="light">Inherited body</HPopContent>,
        }}
      </HPopover>
    ));
    expect(inherited.get('.h-popover__popcontent').classes()).toContain('is-dark');
  });

  test('focus trigger follows native pointer focus events', async () => {
    const onShow = vi.fn();
    const onHide = vi.fn();
    const wrapper = mount(HPopover, {
      props: { toBody: false, trigger: 'focus', onShow, onHide },
      slots: {
        reference: () => <input data-test="focus-reference" />,
        popper: () => <span data-test="focus-popper">Focused</span>,
      },
    });
    const initialHideCount = onHide.mock.calls.length;

    await wrapper.get('[data-test="focus-reference"]').trigger('mousedown');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(onShow).toHaveBeenCalledOnce();
    expect(wrapper.find('[data-test="focus-popper"]').exists()).toBe(true);

    await wrapper.get('[data-test="focus-reference"]').trigger('mouseup');
    await nextTick();
    expect(onHide).toHaveBeenCalledTimes(initialHideCount + 1);
  });

  test('switchVisible exposes DOM boundaries and destroyOnHide=false retains content', async () => {
    const popover = ref<PopoverPublicApi>();
    const onShow = vi.fn();
    const onHide = vi.fn();
    const wrapper = mount(() => (
      <HPopover
        ref={popover}
        toBody={false}
        trigger="manual"
        destroyOnHide={false}
        onShow={onShow}
        onHide={onHide}
      >
        {{
          reference: () => <button>Manual</button>,
          popper: () => <span data-test="persistent-popper">Persistent</span>,
        }}
      </HPopover>
    ));
    await nextTick();

    expect(popover.value?.referenceDom).toBeInstanceOf(HTMLSpanElement);
    expect(popover.value?.popoverDom).toBeInstanceOf(HTMLSpanElement);
    expect(wrapper.find('[data-test="persistent-popper"]').exists()).toBe(true);
    popover.value?.switchVisible(true);
    await new Promise(resolve => window.setTimeout(resolve));
    expect(onShow).toHaveBeenCalledOnce();
    popover.value?.switchVisible(true);
    await nextTick();
    expect(onShow).toHaveBeenCalledOnce();

    popover.value?.switchVisible(false);
    await nextTick();
    expect(onHide.mock.calls.length).toBeGreaterThan(1);
    expect(wrapper.find('[data-test="persistent-popper"]').exists()).toBe(true);
  });

  test('click trigger honors propagation and the configured outside hide event', async () => {
    const parentClick = vi.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <div onClick={parentClick}>
            <HPopover
              toBody={false}
              trigger="click"
              stopPropagation
              hideEventType="mousedown"
            >
              {{
                reference: () => <button data-test="click-reference">Click</button>,
                popper: () => <span data-test="click-popper">Popup</span>,
              }}
            </HPopover>
          </div>
        );
      },
    });

    await wrapper.get('[data-test="click-reference"]').trigger('click');
    await new Promise(resolve => window.setTimeout(resolve));
    expect(parentClick).not.toHaveBeenCalled();
    expect(wrapper.find('[data-test="click-popper"]').exists()).toBe(true);
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(wrapper.find('[data-test="click-popper"]').exists()).toBe(true);
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await nextTick();
    expect(wrapper.find('[data-test="click-popper"]').exists()).toBe(false);
  });

  test('emit validators accept only native mouse payloads', () => {
    const event = new MouseEvent('click');
    expect(usePopoverEmits.show()).toBe(true);
    expect(usePopoverEmits.hide()).toBe(true);
    expect(usePopoverEmits.enterReference(event)).toBe(true);
    expect(usePopoverEmits.enterReference(new Event('mouseenter') as MouseEvent)).toBe(false);
    expect(usePopoverEmits.leaveReference(event)).toBe(true);
    expect(usePopoverEmits.leaveReference({} as MouseEvent)).toBe(false);
    expect(usePopoverEmits.click(event)).toBe(true);
    expect(usePopoverEmits.click({} as MouseEvent)).toBe(false);
  });
});
