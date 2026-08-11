import { mount } from '@vue/test-utils';
import { HFloatButton, HFloatButtonGroup } from '..';
import { describe, expect, test, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { useFloatButtonEmits, useFloatButtonGroupEmits } from '../src/composables/useEmits';
import { useFloatButtonExposes } from '../src/composables/useExposes';
import { getBadgeDefaultOption } from '../src/utils/badgeOptions';
import useDrag from '../src/utils/useDrag';

describe('FloatButton.tsx', () => {
  test('validates emits, empty exposes and every badge-layout branch', () => {
    expect(useFloatButtonEmits.click(new MouseEvent('click'))).toBe(true);
    expect(useFloatButtonEmits.click(new Event('click') as MouseEvent)).toBe(false);
    expect(useFloatButtonEmits.dragStart()).toBe(true);
    expect(useFloatButtonEmits.dragging()).toBe(true);
    expect(useFloatButtonEmits.dragEnd()).toBe(true);
    expect(useFloatButtonGroupEmits.expand()).toBe(true);
    expect(useFloatButtonGroupEmits.fold()).toBe(true);
    expect(useFloatButtonGroupEmits.click()).toBe(true);
    expect(useFloatButtonExposes).toEqual({});

    expect(getBadgeDefaultOption(true, 'circle', false, false)).toMatchObject({
      align: undefined,
      offset: { top: '5px', right: '5px' },
    });
    expect(
      getBadgeDefaultOption({ type: 'num', content: 2 }, 'circle', true, false),
    ).toMatchObject({ align: 'fix-left', offset: { top: '3px', right: '3px' } });
    expect(
      getBadgeDefaultOption({ type: 'num', content: 2 }, 'circle', true, true),
    ).toMatchObject({ align: undefined });
    expect(
      getBadgeDefaultOption({ type: 'num', content: 2 }, 'circle', false, false),
    ).toMatchObject({ align: undefined });
    expect(getBadgeDefaultOption({ type: 'dot' }, 'square', false, false)).toMatchObject({
      offset: { top: '0px', right: '0px' },
    });
  });

  test('basic', async () => {
    const wrapper = mount(() => <HFloatButton />);
    const element = wrapper.findComponent(HFloatButton);

    expect(element.exists()).toBe(true);
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

  test('emits one drag lifecycle for a real mouse gesture and applies adsorbed coordinates', async () => {
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
      new MouseEvent('mousedown', { bubbles: true, clientX: 10, clientY: 10 }),
    );
    document.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, clientX: 30, clientY: 40 }),
    );
    await nextTick();
    expect(button.classes()).toContain('is-dragging');
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 30, clientY: 40 }));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await nextTick();

    expect(onDragStart).toHaveBeenCalledTimes(1);
    expect(onDragging).toHaveBeenCalledTimes(1);
    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(button.classes()).toContain('is-draggable');
    expect(button.attributes('style')).toContain('left:');
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
    const gesture = () => {
      target.element.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 10, clientY: 10 }),
      );
      document.dispatchEvent(
        new MouseEvent('mousemove', { bubbles: true, clientX: 20, clientY: 25 }),
      );
      document.dispatchEvent(
        new MouseEvent('mouseup', { bubbles: true, clientX: 30, clientY: 35 }),
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
    expect(target.attributes()).toMatchObject({ 'data-x': '30', 'data-y': '35' });

    updatePosition({ x: 48, y: 52 });
    await nextTick();
    expect(target.attributes()).toMatchObject({ 'data-x': '48', 'data-y': '52' });
    expect(target.attributes('style')).toContain('left: 48px');

    disabled.value = true;
    await nextTick();
    gesture();
    expect(onStart).toHaveBeenCalledTimes(2);
    wrapper.unmount();

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
      new MouseEvent('mousedown', { bubbles: true, clientX: 5, clientY: 5 }),
    );
    document.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, clientX: 16, clientY: 20 }),
    );
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 21, clientY: 25 }));
    await nextTick();
    expect(plainTarget.attributes('style')).toContain('left: 21px');
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
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(onExpand).toHaveBeenCalledTimes(1);
    await popoverReference.trigger('mouseleave');
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(onFold).toHaveBeenCalledTimes(1);

    collapseButton.element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 12, clientY: 12 }),
    );
    document.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, clientX: 40, clientY: 44 }),
    );
    await nextTick();
    expect(wrapper.findComponent({ name: 'HTooltip' }).props('content')).toBe('');
    expect(wrapper.findComponent({ name: 'HPopover' }).props('disabled')).toBe(true);
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 40, clientY: 44 }));
    await new Promise(resolve => setTimeout(resolve, 320));
    await nextTick();
    expect(wrapper.findComponent({ name: 'HPopover' }).props('disabled')).toBe(false);
    wrapper.unmount();
    await new Promise(resolve => setTimeout(resolve, 320));
  });
});
