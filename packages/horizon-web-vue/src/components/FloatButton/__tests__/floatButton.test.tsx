import { mount } from '@vue/test-utils';
import { HFloatButton, HFloatButtonGroup } from '..';
import { describe, expect, test, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { useFloatButtonEmits, useFloatButtonGroupEmits } from '../src/composables/useEmits';
import { useFloatButtonExposes, useFloatButtonGroupExposes } from '../src/composables/useExposes';
import { getBadgeDefaultOption } from '../src/utils/badgeOptions';
import useDrag from '../src/utils/useDrag';

describe('FloatButton.tsx', () => {
  test('validates emits, exposes and every badge-layout branch', () => {
    expect(useFloatButtonEmits.click(new MouseEvent('click'))).toBe(true);
    expect(useFloatButtonEmits.click(new Event('click') as MouseEvent)).toBe(false);
    expect(useFloatButtonEmits.dragStart()).toBe(true);
    expect(useFloatButtonEmits.dragging()).toBe(true);
    expect(useFloatButtonEmits.dragEnd()).toBe(true);
    expect(useFloatButtonGroupEmits.expand()).toBe(true);
    expect(useFloatButtonGroupEmits.fold()).toBe(true);
    expect(useFloatButtonGroupEmits.click()).toBe(true);
    expect(useFloatButtonEmits['update:visible'](false)).toBe(true);
    expect(useFloatButtonGroupEmits['update:visible'](true)).toBe(true);
    expect(useFloatButtonGroupEmits['update:expanded'](true, { reason: 'imperative' })).toBe(true);
    expect(Object.keys(useFloatButtonExposes)).toEqual(['show', 'hide', 'focus']);
    expect(Object.keys(useFloatButtonGroupExposes)).toEqual([
      'show',
      'hide',
      'expand',
      'fold',
      'toggle',
    ]);

    expect(getBadgeDefaultOption(true, 'circle', false, false)).toMatchObject({
      align: undefined,
      offset: { top: '5px', right: '5px' },
    });
    expect(getBadgeDefaultOption({ type: 'num', content: 2 }, 'circle', true, false)).toMatchObject(
      { align: 'fix-left', offset: { top: '3px', right: '3px' } },
    );
    expect(getBadgeDefaultOption({ type: 'num', content: 2 }, 'circle', true, true)).toMatchObject({
      align: undefined,
    });
    expect(
      getBadgeDefaultOption({ type: 'num', content: 2 }, 'circle', false, false),
    ).toMatchObject({ align: undefined });
    expect(getBadgeDefaultOption({ type: 'dot' }, 'square', false, false)).toMatchObject({
      offset: { top: '0px', right: '0px' },
    });
  });

  test('basic', async () => {
    const wrapper = mount(() => <HFloatButton ariaLabel="Quick action" />);
    const element = wrapper.findComponent(HFloatButton);

    expect(element.exists()).toBe(true);
    expect(wrapper.get('.h-float-button').element.tagName).toBe('BUTTON');
    expect(wrapper.get('.h-float-button').attributes()).toMatchObject({
      type: 'button',
      'aria-label': 'Quick action',
    });
  });

  test('renders public content, shape/type, tooltip and badge options', () => {
    const wrapper = mount(() => (
      <HFloatButton
        type="primary"
        shape="square"
        description="Create"
        tooltip="Create item"
        badge={{ type: 'num', content: 7 }}
        data-test="create"
      />
    ));
    const button = wrapper.get('.h-float-button');

    expect(button.classes()).toContain('h-float-button--primary');
    expect(button.classes()).toContain('h-float-button--square');
    expect(button.attributes('data-test')).toBe('create');
    expect(wrapper.get('.h-float-button__description').text()).toBe('Create');
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('content')).toBe('Create item');
    expect(wrapper.findComponent({ name: 'HBadge' }).props('content')).toBe(7);

    const objectTooltip = mount(HFloatButton, {
      props: { tooltip: { content: 'Object tooltip', placement: 'right' } },
    });
    expect(objectTooltip.findComponent({ name: 'HTooltip' }).props()).toMatchObject({
      content: 'Object tooltip',
      placement: 'right',
    });
    expect(objectTooltip.findComponent({ name: 'HBadge' }).props('hidden')).toBe(true);
  });

  test('emits the native click event and honors dynamic visibility', async () => {
    const visible = ref(true);
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <HFloatButton visible={visible.value} description="Action" onClick={onClick} />
    ));

    await wrapper.get('.h-float-button').trigger('click');
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);

    visible.value = false;
    await nextTick();
    expect(wrapper.get('.h-float-button').attributes('style')).toContain('display: none');
  });

  test('group overrides child shape and type', () => {
    const wrapper = mount(() => (
      <HFloatButtonGroup shape="square" type="primary">
        <HFloatButton shape="circle" type="normal" description="Grouped" />
      </HFloatButtonGroup>
    ));
    const button = wrapper.get('.h-float-button');

    expect(button.classes()).toContain('h-float-button--square');
    expect(button.classes()).toContain('h-float-button--primary');
  });

  test('renders a semantic link and gives named slots precedence over prop content', () => {
    const wrapper = mount(HFloatButton, {
      props: {
        href: '/settings',
        target: '_blank',
        icon: 'settings',
        description: 'Fallback',
      },
      slots: {
        icon: () => <span data-test="float-icon">Custom icon</span>,
        description: () => <span data-test="float-description">Custom description</span>,
      },
    });
    const link = wrapper.get('a.h-float-button');

    expect(link.attributes()).toMatchObject({ href: '/settings', target: '_blank' });
    expect(wrapper.get('[data-test="float-icon"]').text()).toBe('Custom icon');
    expect(wrapper.get('[data-test="float-description"]').text()).toBe('Custom description');
  });

  test('emits one drag lifecycle for a real pointer gesture and applies adsorbed coordinates', async () => {
    const onDragStart = vi.fn();
    const onDragging = vi.fn();
    const onDragEnd = vi.fn();
    const wrapper = mount(() => (
      <HFloatButton
        draggable
        adsorbBottom
        onDragStart={onDragStart}
        onDragging={onDragging}
        onDragEnd={onDragEnd}
      />
    ));
    await nextTick();
    const button = wrapper.get('.h-float-button');

    button.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 10,
        clientY: 10,
        isPrimary: true,
        pointerId: 1,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 30,
        clientY: 40,
        isPrimary: true,
        pointerId: 1,
      }),
    );
    await nextTick();
    expect(button.classes()).toContain('is-dragging');
    document.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 30,
        clientY: 40,
        isPrimary: true,
        pointerId: 1,
      }),
    );
    await new Promise(resolve => requestAnimationFrame(resolve));
    await nextTick();

    expect(onDragStart).toHaveBeenCalledTimes(1);
    expect(onDragging).toHaveBeenCalledTimes(1);
    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(button.classes()).toContain('is-draggable');
    expect(button.attributes('style')).toContain(`left: ${window.innerWidth - 64}px`);
  });

  test('useDrag honors reactive disabled state, rejected starts and public position output', async () => {
    const disabled = ref(true);
    const allowStart = ref(false);
    const onStart = vi.fn((): false | undefined => (allowStart.value ? undefined : false));
    const onMove = vi.fn();
    const onEnd = vi.fn();
    let updatePosition!: ReturnType<typeof useDrag>['updatePosition'];

    const Harness = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null);
        const drag = useDrag(target, {
          disabled,
          initialValue: { x: 12, y: 18 },
          onStart,
          onMove,
          onEnd,
        });
        updatePosition = drag.updatePosition;

        return () => (
          <div
            ref={target}
            data-test="drag-target"
            data-x={drag.x.value}
            data-y={drag.y.value}
            style={drag.style.value}
          />
        );
      },
    });
    const wrapper = mount(Harness);
    await nextTick();
    const target = wrapper.get('[data-test="drag-target"]');
    let pointerId = 1;
    const gesture = () => {
      const currentPointerId = pointerId++;
      target.element.dispatchEvent(
        new PointerEvent('pointerdown', {
          bubbles: true,
          button: 0,
          clientX: 10,
          clientY: 10,
          isPrimary: true,
          pointerId: currentPointerId,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          clientX: 20,
          clientY: 25,
          isPrimary: true,
          pointerId: currentPointerId,
        }),
      );
      document.dispatchEvent(
        new PointerEvent('pointerup', {
          bubbles: true,
          clientX: 30,
          clientY: 35,
          isPrimary: true,
          pointerId: currentPointerId,
        }),
      );
    };

    gesture();
    expect(onStart).not.toHaveBeenCalled();

    disabled.value = false;
    await nextTick();
    gesture();
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onMove).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();

    allowStart.value = true;
    gesture();
    await nextTick();
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(target.attributes()).toMatchObject({ 'data-x': '20', 'data-y': '25' });

    updatePosition({ x: 48, y: 52 });
    await nextTick();
    expect(target.attributes()).toMatchObject({ 'data-x': '48', 'data-y': '52' });
    expect(target.attributes('style')).toContain('left: 48px');

    disabled.value = true;
    await nextTick();
    gesture();
    expect(onStart).toHaveBeenCalledTimes(2);

    disabled.value = false;
    await nextTick();
    target.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 10,
        clientY: 10,
        isPrimary: true,
        pointerId: 99,
      }),
    );
    expect(onStart).toHaveBeenCalledTimes(3);
    wrapper.unmount();
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 100,
        clientY: 100,
        isPrimary: true,
        pointerId: 99,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 100,
        clientY: 100,
        isPrimary: true,
        pointerId: 99,
      }),
    );
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledTimes(1);

    const NoOptionsHarness = defineComponent({
      setup() {
        const target = ref<HTMLElement | null>(null);
        const drag = useDrag(target);
        return () => <div ref={target} data-test="plain-drag-target" style={drag.style.value} />;
      },
    });
    const plainWrapper = mount(NoOptionsHarness);
    await nextTick();
    const plainTarget = plainWrapper.get('[data-test="plain-drag-target"]');
    plainTarget.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 5,
        clientY: 5,
        isPrimary: true,
        pointerId: 20,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 16,
        clientY: 20,
        isPrimary: true,
        pointerId: 20,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 21,
        clientY: 25,
        isPrimary: true,
        pointerId: 20,
      }),
    );
    await nextTick();
    expect(plainTarget.attributes('style')).toContain('left: 16px');
    plainWrapper.unmount();
  });

  test('group collapse button emits click, expand and fold around controlled popup changes', async () => {
    const onClick = vi.fn();
    const onExpand = vi.fn();
    const onFold = vi.fn();
    const wrapper = mount(() => (
      <HFloatButtonGroup
        useCollapse
        trigger="click"
        expandTooltip="Expand actions"
        foldTooltip="Fold actions"
        badge={{ type: 'dot' }}
        onClick={onClick}
        onExpand={onExpand}
        onFold={onFold}
      >
        <HFloatButton description="Child action" />
      </HFloatButtonGroup>
    ));
    const collapseButton = wrapper.get('.h-float-button-group__collapse-button');
    const initialFoldCount = onFold.mock.calls.length;

    await collapseButton.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onExpand).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.h-float-button-group__container')).not.toBeNull();

    await collapseButton.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onFold).toHaveBeenCalledTimes(initialFoldCount + 1);
    wrapper.unmount();
  });

  test('dynamically removes and restores visible buttons in stack order', async () => {
    const secondVisible = ref(true);
    const wrapper = mount(() => (
      <>
        <HFloatButton data-test="stack-first" description="First" />
        <HFloatButton data-test="stack-second" visible={secondVisible.value} description="Second" />
      </>
    ));
    const first = wrapper.get<HTMLElement>('[data-test="stack-first"]');
    const second = wrapper.get<HTMLElement>('[data-test="stack-second"]');
    expect(first.element.style.bottom).toContain('* 0');
    expect(second.element.style.bottom).toContain('* 1');

    secondVisible.value = false;
    await nextTick();
    expect(second.element.style.display).toBe('none');
    expect(first.element.style.bottom).toContain('* 0');

    secondVisible.value = true;
    await nextTick();
    expect(second.element.style.bottom).toContain('* 1');
  });

  test('nested groups apply the nearest provided shape and type', () => {
    const wrapper = mount(() => (
      <HFloatButtonGroup type="primary" shape="circle">
        <HFloatButton data-test="outer-action" description="Outer" />
        <HFloatButtonGroup type="normal" shape="square">
          <HFloatButton data-test="inner-action" description="Inner" />
        </HFloatButtonGroup>
      </HFloatButtonGroup>
    ));
    expect(wrapper.get('[data-test="outer-action"]').classes()).toContain(
      'h-float-button--primary',
    );
    expect(wrapper.get('[data-test="inner-action"]').classes()).toEqual(
      expect.arrayContaining(['h-float-button--normal', 'h-float-button--square']),
    );
  });

  test('group expandIcon, foldIcon and default slot follow the expanded state', async () => {
    const wrapper = mount(HFloatButtonGroup, {
      props: {
        useCollapse: true,
        trigger: 'click',
        expandIcon: <span data-test="expand-icon">Expand</span>,
        foldIcon: <span data-test="fold-icon">Fold</span>,
      },
      slots: {
        default: () => <HFloatButton data-test="group-default" description="Child" />,
      },
    });

    expect(wrapper.get('[data-test="expand-icon"]').text()).toBe('Expand');
    await wrapper.get('.h-float-button-group__collapse-button').trigger('click');
    await nextTick();
    expect(wrapper.get('[data-test="fold-icon"]').text()).toBe('Fold');
    expect(document.querySelector('[data-test="group-default"]')).toBeInstanceOf(HTMLElement);
    wrapper.unmount();
  });

  test('keeps controlled expansion authoritative and exposes group commands', async () => {
    const onExpanded = vi.fn();
    const onVisible = vi.fn();
    const onExpand = vi.fn();
    const wrapper = mount(HFloatButtonGroup, {
      props: {
        useCollapse: true,
        expanded: false,
        'onUpdate:expanded': onExpanded,
        'onUpdate:visible': onVisible,
        onExpand,
      },
      slots: { default: () => <HFloatButton description="Controlled child" /> },
    });
    const commands = wrapper.vm as unknown as {
      expand: () => void;
      hide: () => void;
    };

    await wrapper.get('.h-float-button-group__collapse-button').trigger('click');
    expect(onExpanded).toHaveBeenCalledWith(true, { reason: 'click' });
    expect(onExpand).toHaveBeenCalledOnce();
    expect(wrapper.find('.h-float-button-group__collapse-button.is-expanded').exists()).toBe(false);

    commands.expand();
    expect(onExpanded).toHaveBeenLastCalledWith(true, { reason: 'imperative' });
    commands.hide();
    expect(onVisible).toHaveBeenCalledWith(false);
  });

  test('group visibility hides both the collapse trigger and expanded children', async () => {
    const visible = ref(true);
    const wrapper = mount(() => (
      <HFloatButtonGroup useCollapse expanded visible={visible.value}>
        <HFloatButton data-test="visible-child" description="Visible child" />
      </HFloatButtonGroup>
    ));
    await nextTick();
    const trigger = wrapper.get<HTMLElement>('.h-float-button-group__collapse-button');
    const child = document.querySelector<HTMLElement>('[data-test="visible-child"]')!;
    expect(trigger.element.style.display).toBe('');
    expect(child.style.display).toBe('');

    visible.value = false;
    await nextTick();
    expect(trigger.element.style.display).toBe('none');
    expect(child.style.display).toBe('none');
    wrapper.unmount();
  });

  test('hover group follows native hover and suppresses tooltip while its collapse button drags', async () => {
    const onExpand = vi.fn();
    const onFold = vi.fn();
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <HFloatButtonGroup
        useCollapse
        trigger="hover"
        draggable
        expandTooltip="Expand on hover"
        foldTooltip="Fold on leave"
        onExpand={onExpand}
        onFold={onFold}
        onClick={onClick}
      >
        <HFloatButton description="Hover child" />
      </HFloatButtonGroup>
    ));
    await nextTick();
    const collapseButton = wrapper.get('.h-float-button-group__collapse-button');
    const popoverReference = wrapper.get('.h-popover__reference');

    await collapseButton.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
    await popoverReference.trigger('mouseenter');
    await new Promise(resolve => setTimeout(resolve, 120));
    expect(onExpand).toHaveBeenCalledTimes(1);
    await popoverReference.trigger('mouseleave');
    await new Promise(resolve => setTimeout(resolve, 120));
    expect(onFold).toHaveBeenCalledTimes(1);

    collapseButton.element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 12,
        clientY: 12,
        isPrimary: true,
        pointerId: 30,
      }),
    );
    document.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 40,
        clientY: 44,
        isPrimary: true,
        pointerId: 30,
      }),
    );
    await nextTick();
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('content')).toBe('');
    expect(wrapper.findComponent({ name: 'HPopover' }).props('disabled')).toBe(true);
    document.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 40,
        clientY: 44,
        isPrimary: true,
        pointerId: 30,
      }),
    );
    await new Promise(resolve => setTimeout(resolve, 320));
    await nextTick();
    expect(wrapper.findComponent({ name: 'HPopover' }).props('disabled')).toBe(false);
    wrapper.unmount();
    await new Promise(resolve => setTimeout(resolve, 320));
  });
});
