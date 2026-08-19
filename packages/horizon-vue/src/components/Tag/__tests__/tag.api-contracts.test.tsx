import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HTag from '../src/Tag';
import HTagGroup from '../src/TagGroup';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import type { TagGroupExposes } from '../src/composables/useExposes';
import { useTagEmits, useTagGroupEmits } from '../src/composables/useEmits';
import type { TagProps } from '../src/composables/useProps';

describe('Tag public API contracts', () => {
  test('renders default/tooltip/icon scope and observes style, timing, ellipsis and pure props', async () => {
    let iconColor: string | undefined;
    const wrapper = mount(
      () => (
        <HTag
          type="warning"
          size="large"
          bold
          clickable
          closable
          editable
          plain
          round
          equally
          showCloseDelay={0}
          color="rgb(1, 2, 3)"
          background="rgb(4, 5, 6)"
          tooltip={{ placement: 'top' }}
          tooltipShowAfter={7}
          tooltipHideAfter={9}
          disableTransitions
          isEllipsis
          isInPopover
        >
          {{
            default: () => <span data-test="content">Contract tag</span>,
            icon: (currentColor?: string) => {
              iconColor = currentColor;
              return <i data-test="icon">I</i>;
            },
            avatar: () => <span data-test="avatar">A</span>,
            tooltipContent: () => <strong data-test="tooltip">Tooltip contract</strong>,
          }}
        </HTag>
      ),
      { attachTo: document.body },
    );
    const tag = wrapper.get('.h-tag');
    const tooltip = wrapper.getComponent(HTooltip);

    expect(tag.classes()).toEqual(
      expect.arrayContaining([
        'h-tag--large',
        'h-tag--bold',
        'h-tag--round',
        'h-tag--equally',
        'is-clickable',
        'is-closable',
        'is-plain',
        'is-disable-transitions',
        'is-ellipsis',
      ]),
    );
    expect(tag.attributes('style')).toContain('rgb(4, 5, 6)');
    expect(iconColor).toBeTruthy();
    expect(wrapper.get('[data-test="icon"]').text()).toBe('I');
    expect(wrapper.get('[data-test="avatar"]').text()).toBe('A');
    expect(wrapper.get('[data-test="content"]').text()).toBe('Contract tag');
    expect(tooltip.props()).toMatchObject({
      placement: 'top',
      showAfter: 7,
      hideAfter: 9,
      disabled: false,
    });

    await tag.trigger('mouseenter');
    await wrapper.get('.h-tag__inner').trigger('mouseenter');
    await vi.waitFor(() =>
      expect(document.body.querySelector('[data-test="tooltip"]')?.textContent).toBe(
        'Tooltip contract',
      ),
    );
    await vi.waitFor(() => expect(wrapper.find('.h-tag__close').exists()).toBe(true));
    await tag.trigger('mousedown');
    document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    wrapper.unmount();

    const pure = mount(() => (
      <HTag isPure isCreateTag>
        <span data-test="pure">Pure tag output</span>
      </HTag>
    ));
    expect(pure.find('.h-tag').exists()).toBe(false);
    expect(pure.get('[data-test="pure"]').text()).toBe('Pure tag output');
    pure.unmount();
  });

  test('supports public edit expose and preserves id in group edit/close contracts', async () => {
    const beforeEdit = vi.fn(async () => true);
    const beforeClose = vi.fn(async () => true);
    const onEdited = vi.fn();
    const onClosed = vi.fn();
    const wrapper = mount(
      () => (
        <HTagGroup
          collapse={false}
          editable
          beforeEdit={beforeEdit}
          beforeClose={beforeClose}
          onEdited={onEdited}
          onClosed={onClosed}
        >
          <HTag id="existing" closable>
            Existing
          </HTag>
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();
    await wrapper.get('.h-tag').trigger('dblclick');
    await nextTick();
    const input = wrapper.get<HTMLInputElement>('.h-tag__input');
    await input.setValue('Edited');
    await input.trigger('blur');
    await vi.waitFor(() =>
      expect(onEdited).toHaveBeenCalledWith('Edited', 'Existing', 'existing'),
    );
    expect(beforeEdit).toHaveBeenCalledWith('Edited', 'Existing', 'existing');

    await wrapper.get('.h-tag__close').trigger('click');
    await vi.waitFor(() => expect(onClosed).toHaveBeenCalledWith('existing'));
    expect(beforeClose).toHaveBeenCalledWith('existing');
    wrapper.unmount();
  });

  test('maps every TagGroup prop, scoped slot and collapse/toggle behavior', async () => {
    let createTextTags: TagProps[] = [];
    const onToggled = vi.fn();
    const onExceeded = vi.fn();
    const wrapper = mount(
      () => (
        <HTagGroup
          size="small"
          editable
          disabled={false}
          collapse
          collapseTagProps={{ type: 'warning', round: true }}
          expand
          collapseUseTooltip
          tooltipRenderType="full"
          separator=" | "
          useCreate
          createTagProps={{ type: 'success' }}
          createText="Create fallback"
          maxTags={4}
          disableTransitions
          fillUp
          minDisplayed={1}
          popperInnerClass="contract-popper-inner"
          tooltipShowAfter={11}
          tooltipHideAfter={13}
          onToggled={onToggled}
          onExceeded={onExceeded}
        >
          {{
            default: () => [
              <HTag id="a">Alpha</HTag>,
              <HTag id="b">Beta</HTag>,
              <HTag id="c">Gamma</HTag>,
            ],
            createText: (currentTags: TagProps[]) => {
              createTextTags = currentTags;
              return <span data-test="create-text">Create ({currentTags.length})</span>;
            },
            prepend: () => <span data-test="prepend">Prepend</span>,
            append: () => <span data-test="append">Append</span>,
            prefix: () => <span data-test="prefix">Prefix</span>,
            suffix: () => <span data-test="suffix">Suffix</span>,
          }}
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await nextTick();
    const group = wrapper.getComponent(HTagGroup);

    expect(group.classes()).toEqual(
      expect.arrayContaining([
        'h-tag-group--small',
        'is-fill-up',
        'is-collapsed',
        'has-min-displayed',
      ]),
    );
    expect(group.props()).toMatchObject({
      editable: true,
      disabled: false,
      collapse: true,
      expand: true,
      collapseUseTooltip: true,
      tooltipRenderType: 'full',
      separator: ' | ',
      useCreate: true,
      maxTags: 4,
      disableTransitions: true,
      fillUp: true,
      minDisplayed: 1,
      popperInnerClass: 'contract-popper-inner',
      tooltipShowAfter: 11,
      tooltipHideAfter: 13,
    });
    expect(group.props('collapseTagProps')).toMatchObject({ type: 'warning', round: true });
    expect(group.props('createTagProps')).toMatchObject({ type: 'success' });
    expect(wrapper.get('[data-test="prepend"]').text()).toBe('Prepend');
    expect(wrapper.get('[data-test="append"]').text()).toBe('Append');
    expect(wrapper.get('[data-test="prefix"]').text()).toBe('Prefix');
    expect(wrapper.get('[data-test="suffix"]').text()).toBe('Suffix');
    expect(wrapper.get('[data-test="create-text"]').text()).toBe('Create (2)');
    expect(createTextTags.map(tag => tag.id)).toEqual(['a', undefined]);
    expect(wrapper.findAll('.h-tag-group__container > .h-tag')).toHaveLength(2);

    const exposed = group.getCurrentComponent().exposed as TagGroupExposes;
    exposed.toggle(true);
    await nextTick();
    expect(onToggled).toHaveBeenCalledWith(true);
    expect(group.classes()).not.toContain('is-collapsed');
    await exposed.doCollapseCalculate();
    wrapper.unmount();
  });

  test('renders the scoped create slot and creates a tag through beforeCreate', async () => {
    const createScopes: TagProps[][] = [];
    const createOnly = mount(
      () => (
        <HTagGroup>
          {{
            default: () => [<HTag id="one">One</HTag>],
            create: (currentTags: TagProps[]) => {
              createScopes.push(currentTags);
              return <button data-test="create-slot">Custom create ({currentTags.length})</button>;
            },
          }}
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    expect(createOnly.get('[data-test="create-slot"]').text()).toBe('Custom create (1)');
    expect(createScopes.at(-1)?.[0].id).toBe('one');
    createOnly.unmount();

    const beforeCreate = vi.fn(async () => true);
    const onCreated = vi.fn();
    const creator = mount(
      () => (
        <HTagGroup useCreate editable beforeCreate={beforeCreate} onCreated={onCreated}>
          <HTag id="one">One</HTag>
        </HTagGroup>
      ),
      { attachTo: document.body },
    );
    await nextTick();
    await creator.get('.h-tag-group__create-tag').trigger('click');
    const input = creator.get<HTMLInputElement>('.h-tag__input');
    await input.setValue('Created');
    await input.trigger('blur');
    await vi.waitFor(() => expect(onCreated).toHaveBeenCalledWith('Created'));
    expect(beforeCreate).toHaveBeenCalledWith('Created');
    creator.unmount();
  });

  test('validates every Tag and TagGroup emit payload', () => {
    const click = new MouseEvent('click');
    expect(useTagEmits['update:modelValue'](true)).toBe(true);
    expect(useTagEmits.click(click)).toBe(true);
    expect(useTagEmits.close(click)).toBe(true);
    expect(useTagEmits.click(new Event('click') as never)).toBe(false);
    expect(useTagGroupEmits.created('new')).toBe(true);
    expect(useTagGroupEmits.edited('new', 'old', Symbol('id'))).toBe(true);
    expect(useTagGroupEmits.closed(undefined)).toBe(true);
    expect(useTagGroupEmits.toggled(false)).toBe(true);
    expect(useTagGroupEmits.exceeded()).toBe(true);
  });
});
