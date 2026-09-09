import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTag from '../src/Tag';
import HTagGroup from '../src/TagGroup';
import InputTag from '../src/components/InputTag';
import { useTagGroupProps, useTagProps } from '../src/composables/useProps';
import { createTagColorPalette } from '@aurora/theme';

describe('Tag browser coverage', () => {
  test('validates every public constrained prop and its legacy warning branches', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const tagType = useTagProps.type.validator!;
    const tagSize = useTagProps.size.validator!;
    const tagIcon = useTagProps.icon.validator!;
    const groupSize = useTagGroupProps.size.validator!;
    const minDisplayed = useTagGroupProps.minDisplayed.validator!;

    expect(tagType('hollow')).toBe(false);
    expect(tagType(undefined)).toBe(true);
    expect(tagType('success')).toBe(true);
    expect(tagType(1)).toBe(false);
    expect(tagSize('mini')).toBe(false);
    expect(tagSize('large')).toBe(true);
    expect(tagSize(1)).toBe(false);
    expect(tagIcon({})).toBe(true);
    expect(tagIcon('add')).toBe(true);
    expect(tagIcon(undefined)).toBe(true);
    expect(tagIcon(1)).toBe(false);
    expect(groupSize('mini')).toBe(false);
    expect(groupSize('small')).toBe(true);
    expect(groupSize(null)).toBe(false);
    expect(minDisplayed('1')).toBe(false);
    expect(minDisplayed(-1)).toBe(false);
    expect(minDisplayed(0)).toBe(true);
    expect(error).toHaveBeenCalledTimes(2);
    warn.mockRestore();
    error.mockRestore();
  });

  test('generates plain and filled palettes for light and dark source colors', () => {
    const plain = createTagColorPalette('#1677ff', '#ffffff', true);
    const light = createTagColorPalette('#ffffff', '#ffffff');
    const dark = createTagColorPalette('#000000', '#ffffff');

    expect(plain.background.default).toBe('#FFF');
    expect(plain.border.active).toBe(plain.text.active);
    expect(light.border.default).toBe('transparent');
    expect(dark.border.disabled).toBe('transparent');
    expect(light.background.disabled).toMatch(/^#[\da-f]{8}$/i);
    expect(dark.text.default).toBeTruthy();
  });

  test('InputTag synchronizes values, composition text, browser focus and Enter blur', async () => {
    const wrapper = mount(InputTag, {
      props: { modelValue: 'A B' },
      attachTo: document.body,
    });
    const input = wrapper.get<HTMLInputElement>('input');
    await nextTick();
    expect(document.activeElement).toBe(input.element);
    expect(wrapper.get('.h-tag__input-opacity-content').element.innerHTML).toContain('&nbsp;');

    input.element.dispatchEvent(
      new CompositionEvent('compositionupdate', { bubbles: true, data: '拼' }),
    );
    await nextTick();
    expect(wrapper.get('.h-tag__input-opacity-content').text()).toContain('拼');
    input.element.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
    await nextTick();
    expect(wrapper.get('.h-tag__input-opacity-content').text()).not.toContain('拼');

    await input.setValue('Changed');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['Changed']);
    await wrapper.setProps({ modelValue: 'External' });
    expect(input.element.value).toBe('External');
    input.element.dispatchEvent(
      new KeyboardEvent('keyup', { bubbles: true, code: 'Escape', key: 'Escape' }),
    );
    expect(wrapper.emitted('blur')).toBeUndefined();
    input.element.dispatchEvent(
      new KeyboardEvent('keyup', { bubbles: true, code: 'Enter', key: 'Enter' }),
    );
    await nextTick();
    expect(wrapper.emitted('blur')).toHaveLength(1);
    wrapper.unmount();
  });

  test.each([
    ['false result', vi.fn(async () => false)],
    ['rejection', vi.fn(async () => Promise.reject(new Error('blocked')))],
  ])(
    'restores a tag after a beforeClose %s without an unhandled rejection',
    async (_, beforeClose) => {
      const onClosed = vi.fn();
      const wrapper = mount(
        () => (
          <HTagGroup beforeClose={beforeClose} onClosed={onClosed}>
            <HTag id="protected" closable>
              Protected
            </HTag>
          </HTagGroup>
        ),
        { attachTo: document.body },
      );
      await nextTick();
      await wrapper.get('.h-tag__close').trigger('click');
      await vi.waitFor(() => expect(beforeClose).toHaveBeenCalledWith('protected'));
      await vi.waitFor(() => expect(wrapper.get('.h-tag').classes()).not.toContain('is-loading'));
      expect(onClosed).not.toHaveBeenCalled();
      wrapper.unmount();
    },
  );

  test.each([
    ['false result', vi.fn(async () => false)],
    ['rejection', vi.fn(async () => Promise.reject(new Error('blocked')))],
  ])('restores edited content after a beforeEdit %s', async (_, beforeEdit) => {
    const onEdited = vi.fn();
    const wrapper = mount(
      () => (
        <HTagGroup editable beforeEdit={beforeEdit} onEdited={onEdited}>
          <HTag id="protected-edit">Original</HTag>
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await wrapper.get('.h-tag').trigger('dblclick');
    const input = wrapper.get<HTMLInputElement>('.h-tag__input');
    await input.setValue('Rejected edit');
    await input.trigger('blur');
    await vi.waitFor(() =>
      expect(beforeEdit).toHaveBeenCalledWith('Rejected edit', 'Original', 'protected-edit'),
    );
    await vi.waitFor(() => expect(wrapper.get('.h-tag').classes()).not.toContain('is-loading'));
    expect(onEdited).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  test.each([
    ['false result', vi.fn(async () => false)],
    ['rejection', vi.fn(async () => Promise.reject(new Error('blocked')))],
  ])('restores the create affordance after a beforeCreate %s', async (_, beforeCreate) => {
    const onCreated = vi.fn();
    const wrapper = mount(
      () => (
        <HTagGroup useCreate editable beforeCreate={beforeCreate} onCreated={onCreated}>
          <HTag id="existing">Existing</HTag>
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await wrapper.get('.h-tag-group__create-tag').trigger('click');
    const input = wrapper.get<HTMLInputElement>('.h-tag__input');
    await input.setValue('Rejected create');
    await input.trigger('blur');
    await vi.waitFor(() => expect(beforeCreate).toHaveBeenCalledWith('Rejected create'));
    await vi.waitFor(() =>
      expect(wrapper.get('.h-tag-group__create-tag').classes()).not.toContain('is-loading'),
    );
    expect(onCreated).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  test('uses real container geometry to shrink, expand and render both collapse details', async () => {
    const tags = ref(['Alpha', 'Beta', 'Gamma']);
    let clientWidth = 300;
    const onToggled = vi.fn();
    const wrapper = mount(
      () => (
        <HTagGroup
          collapse
          expand
          collapseUseTooltip
          tooltipRenderType="full"
          separator=" / "
          onToggled={onToggled}
        >
          {tags.value.map(label => (
            <HTag id={label} key={label}>
              {label}
            </HTag>
          ))}
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    const group = wrapper.getComponent(HTagGroup);
    const container = wrapper.get<HTMLElement>('.h-tag-group__container').element;
    Object.defineProperties(container, {
      clientWidth: { configurable: true, get: () => clientWidth },
      clientHeight: { configurable: true, get: () => 48 },
      scrollWidth: {
        configurable: true,
        get: () => container.querySelectorAll(':scope > .h-tag').length * 100,
      },
    });
    const exposed = group.getCurrentComponent().exposed as {
      toggle: (expanded?: boolean) => void;
      doCollapseCalculate: () => Promise<void>;
    };
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    await exposed.doCollapseCalculate();
    await nextTick();
    expect(container.querySelectorAll(':scope > .h-tag')).toHaveLength(3);

    clientWidth = 200;
    tags.value.push('Delta');
    await nextTick();
    await exposed.doCollapseCalculate();
    await nextTick();
    expect(wrapper.get('.h-tag-group').classes()).toContain('is-collapsed');
    expect(wrapper.findAll('.h-tag-group__container > .h-tag').length).toBeGreaterThan(1);
    expect(wrapper.get('.h-tag-group__container > .h-popover__reference .h-tag').text()).toMatch(
      /^\+\d+$/,
    );

    await wrapper.get('.h-tag-group__container > .h-popover__reference').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(document.body.querySelector('.h-tag-group__popper-inner')?.textContent).toContain(
        'Delta',
      ),
    );
    clientWidth = 100;
    await exposed.doCollapseCalculate();
    await nextTick();
    expect(wrapper.findAll('.h-tag-group__container > .h-tag')).toHaveLength(1);
    exposed.toggle(true);
    await nextTick();
    expect(onToggled).toHaveBeenLastCalledWith(true);
    expect(wrapper.get('.h-tag-group').classes()).not.toContain('is-collapsed');
    expect(wrapper.find('.h-tag-group__container > .h-tag').exists()).toBe(true);
    wrapper.unmount();
  });

  test('guards collapsed clicks when expansion is disabled and allows a manual default toggle', async () => {
    const onToggled = vi.fn();
    const wrapper = mount(HTagGroup, {
      props: { collapse: true, expand: false, minDisplayed: 1, onToggled },
      slots: {
        default: () => [
          <HTag id="one">One</HTag>,
          <HTag id="two">Two</HTag>,
          <HTag id="three">Three</HTag>,
        ],
      },
      attachTo: document.body,
    });
    await nextTick();
    await wrapper.get('.h-popover__reference .h-tag').trigger('click');
    expect(onToggled).not.toHaveBeenCalled();
    const exposed = wrapper.getCurrentComponent().exposed as { toggle: () => void };
    exposed.toggle();
    await nextTick();
    expect(onToggled).toHaveBeenCalledWith(true);
    await wrapper.setProps({ fillUp: true, useCreate: true });
    await nextTick();
    wrapper.unmount();
  });

  test('blocks duplicate create actions while beforeCreate is pending', async () => {
    const gate = Promise.withResolvers<boolean>();
    const beforeCreate = vi.fn(() => gate.promise);
    const wrapper = mount(HTagGroup, {
      props: { useCreate: true, editable: true, beforeCreate },
      attachTo: document.body,
    });
    await nextTick();
    await wrapper.get('.h-tag-group__container > .h-tag').trigger('click');
    const input = wrapper.get<HTMLInputElement>('.h-tag__input');
    await input.setValue('Pending');
    await input.trigger('blur');
    await vi.waitFor(() => expect(beforeCreate).toHaveBeenCalledOnce());
    await wrapper.get('.h-tag-group__container > .h-tag').trigger('click');
    expect(beforeCreate).toHaveBeenCalledOnce();
    gate.resolve(true);
    await vi.waitFor(() =>
      expect(wrapper.get('.h-tag-group__create-tag').classes()).not.toContain('is-loading'),
    );
    wrapper.unmount();
  });

  test('renders the collapsed innerText tooltip path with minimum displayed geometry', async () => {
    const wrapper = mount(
      () => (
        <HTagGroup
          collapse
          expand
          minDisplayed={1}
          collapseUseTooltip
          tooltipRenderType="innerText"
          separator=", "
          tooltipShowAfter={0}
          tooltipHideAfter={0}
        >
          <HTag id="one">One</HTag>
          <HTag id="two">Two</HTag>
          <HTag id="three">Three</HTag>
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    const group = wrapper.getComponent(HTagGroup);
    const container = wrapper.get<HTMLElement>('.h-tag-group__container').element;
    Object.defineProperty(container, 'clientHeight', { configurable: true, value: 48 });
    const exposed = group.getCurrentComponent().exposed as {
      toggle: (expanded?: boolean) => void;
      doCollapseCalculate: () => Promise<void>;
    };
    await exposed.doCollapseCalculate();
    await nextTick();
    const collapsed = wrapper.get('.h-tag-group__container > .h-popover__reference .h-tag');
    expect(collapsed.text()).toBe('+2');
    await collapsed.trigger('mouseenter');
    await collapsed.get('.h-tag__inner').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(document.body.querySelector('.h-tooltip__content')?.textContent ?? '').toContain(
        'Two',
      ),
    );
    expect(document.body.querySelector('.h-tooltip__content')?.textContent).toContain('Three');
    exposed.toggle(true);
    await nextTick();
    expect(wrapper.findAll('.h-tag-group__container > .h-tag').length).toBeGreaterThanOrEqual(3);
    wrapper.unmount();
  });

  test('covers colorful disabled, hover, press, active and token-background styles', async () => {
    const disabled = mount(() => (
      <HTag color="brand[6]" background="brand[1]" disabled clickable closable>
        Disabled token
      </HTag>
    ));
    const disabledTag = disabled.get('.h-tag');
    expect(disabledTag.classes()).toContain('is-disabled');
    expect(disabledTag.attributes('style')).toContain('background');
    await disabledTag.trigger('click');
    await disabledTag.trigger('dblclick');
    await disabledTag.trigger('mousedown');
    expect(disabled.getComponent(HTag).emitted('click')).toBeUndefined();
    disabled.unmount();

    const disabledFallback = mount(() => (
      <HTag color="brand" disabled>
        Disabled fallback
      </HTag>
    ));
    expect(disabledFallback.get('.h-tag').attributes('style')).toContain('background');
    disabledFallback.unmount();

    const interactive = mount(HTag, {
      props: {
        color: 'brand',
        background: 'brand[2]',
        clickable: true,
        closable: true,
        equally: true,
        showCloseDelay: 0,
      },
      slots: { default: () => 'Interactive' },
      attachTo: document.body,
    });
    const tag = interactive.get('.h-tag');
    await tag.trigger('mouseenter');
    await vi.waitFor(() => expect(interactive.find('.h-tag__close').exists()).toBe(true));
    expect(tag.attributes('style')).toContain('background');
    await tag.trigger('mousedown');
    expect(tag.attributes('style')).toContain('background');
    document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    await tag.trigger('mouseleave');
    interactive.unmount();

    const paletteFallback = mount(() => (
      <HTag color="brand" clickable>
        Palette fallback
      </HTag>
    ));
    await paletteFallback.get('.h-tag').trigger('mouseenter');
    await paletteFallback.get('.h-tag').trigger('mousedown');
    document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    await paletteFallback.get('.h-tag').trigger('mouseleave');
    expect(paletteFallback.get('.h-tag').attributes('style')).toContain('background');
    paletteFallback.unmount();

    const active = mount(() => (
      <HTag modelValue color="#1677ff" background="#ffffff">
        Active
      </HTag>
    ));
    expect(active.get('.h-tag').classes()).toContain('is-active');
    expect(active.get('.h-tag').attributes('style')).toContain('background');
    await active.get('.h-tag').trigger('click');
    expect(active.getComponent(HTag).emitted('update:modelValue')?.at(-1)).toEqual([false]);
    active.unmount();

    const activeFallback = mount(() => (
      <HTag modelValue color="brand">
        Active fallback
      </HTag>
    ));
    expect(activeFallback.get('.h-tag').attributes('style')).toContain('background');
    activeFallback.unmount();

    const defaultFallback = mount(() => <HTag color="brand">Default fallback</HTag>);
    expect(defaultFallback.get('.h-tag').attributes('style')).toContain('background');
    defaultFallback.unmount();

    const backgroundOnly = mount(() => (
      <HTag background="brand[1]" equally closable>
        Background only
      </HTag>
    ));
    await backgroundOnly.get('.h-tag').trigger('mouseenter');
    await nextTick();
    expect(backgroundOnly.get('.h-tag').attributes('style')).toContain('background');
    backgroundOnly.unmount();
  });

  test('covers standalone edit guards, empty edits, preset exposes and tooltip variants', async () => {
    const wrapper = mount(HTag, {
      props: { editable: true, closable: true, tooltip: false },
      slots: { default: () => 'Original' },
      attachTo: document.body,
    });
    const exposed = wrapper.getCurrentComponent().exposed as { edit: (value?: string) => void };
    exposed.edit('Preset');
    await nextTick();
    let input = wrapper.get<HTMLInputElement>('.h-tag__input');
    expect(input.element.value).toBe('Preset');
    await input.setValue('');
    await input.trigger('blur');
    expect(wrapper.emitted('close')).toBeUndefined();

    await wrapper.get('.h-tag').trigger('dblclick');
    await wrapper.get('.h-tag').trigger('dblclick');
    input = wrapper.get<HTMLInputElement>('.h-tag__input');
    await input.setValue('Standalone change');
    await input.trigger('blur');
    expect(wrapper.find('.h-tag__input').exists()).toBe(false);
    wrapper.unmount();

    const stringTooltip = mount(() => (
      <HTag tooltip="Explicit tooltip" icon="add" tooltipShowAfter={0} tooltipHideAfter={0}>
        Label
      </HTag>
    ));
    await stringTooltip.get('.h-tag').trigger('mouseenter');
    await stringTooltip.get('.h-tag__inner').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(document.body.querySelector('.h-tooltip__content')?.textContent ?? '').toContain(
        'Explicit tooltip',
      ),
    );
    expect(stringTooltip.find('.h-tag__icon').exists()).toBe(true);
    stringTooltip.unmount();

    const nonEditable = mount(() => <HTag>Static</HTag>);
    await nonEditable.get('.h-tag').trigger('dblclick');
    expect(nonEditable.find('.h-tag__input').exists()).toBe(false);
    nonEditable.unmount();

    const overflowTooltip = mount(() => <HTag tooltipShowAfter={0}>Overflow label</HTag>, {
      attachTo: document.body,
    });
    const content = overflowTooltip.get<HTMLElement>('.h-tag__content').element;
    Object.defineProperties(content, {
      clientWidth: { configurable: true, value: 10 },
      scrollWidth: { configurable: true, value: 100 },
    });
    await overflowTooltip.get('.h-tag').trigger('mouseenter');
    await overflowTooltip.get('.h-tag__inner').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(document.body.querySelector('.h-tooltip__content')?.textContent ?? '').toContain(
        'Overflow label',
      ),
    );
    overflowTooltip.unmount();
  });

  test('updates guard functions after mount', async () => {
    const wrapper = mount(HTagGroup, { props: { beforeCreate: () => false } });
    const updated = vi.fn(() => true);
    await wrapper.setProps({ beforeCreate: updated });
    await nextTick();
    wrapper.unmount();
  });
});
