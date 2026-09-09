import { act, createElement as h, createRef, StrictMode } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';
import { HorizonWebProvider } from '../../../provider';
import { Tag, TagGroup, type TagGroupHandle, type TagHandle } from '..';

function inputText(input: HTMLInputElement, value: string): void {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
  input.dispatchEvent(new InputEvent('input', { bubbles: true, data: value }));
}

describe('React Tag', () => {
  it('renders native semantics, regions and the shared visual contract', async () => {
    await render(
      h(
        Tag,
        {
          active: true,
          avatar: '/avatar.png',
          bold: true,
          icon: h('i', { 'data-icon': true }),
          round: true,
          size: 'large',
          variant: 'success',
        },
        'Ready',
      ),
    );
    const tag = getContainer().querySelector<HTMLElement>('.h-tag')!;
    expect(tag.classList).toContain(
      'h-tag--success',
      'h-tag--large',
      'h-tag--bold',
      'h-tag--round',
    );
    expect(tag.getAttribute('role')).toBe('checkbox');
    expect(tag.getAttribute('aria-checked')).toBe('true');
    expect(tag.querySelector('[data-icon]')).not.toBeNull();
    expect(tag.querySelector('img')?.getAttribute('src')).toBe('/avatar.png');
  });

  it('proposes controlled activation without changing rejected state', async () => {
    const onActiveChange = vi.fn();
    const onClick = vi.fn();
    await render(h(Tag, { active: false, clickable: false, onActiveChange, onClick }, 'Filter'));
    const tag = getContainer().querySelector('.h-tag')!;
    await click(tag);
    expect(onActiveChange).toHaveBeenCalledWith(true);
    expect(onClick).toHaveBeenCalledOnce();
    expect(tag.getAttribute('aria-checked')).toBe('false');
    await dispatch(tag, new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    expect(onActiveChange).toHaveBeenCalledTimes(2);
  });

  it('blocks disabled interaction and keeps close separate from the tag action', async () => {
    const onClick = vi.fn();
    const onClose = vi.fn();
    await render(h(Tag, { closable: true, disabled: true, onClick, onClose }, 'Locked'));
    expect(getContainer().querySelector('.h-tag__close')).toBeNull();
    await click(getContainer().querySelector('.h-tag')!);
    expect(onClick).not.toHaveBeenCalled();

    await render(h(Tag, { closable: true, onClick, onClose }, 'Open'));
    await click(getContainer().querySelector('.h-tag__close')!);
    expect(onClose).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports custom colors, delayed equal close and pointer release', async () => {
    vi.useFakeTimers();
    await render(
      h(Tag, { closable: true, color: 'brand', equally: true, showCloseDelay: 20 }, 'A'),
    );
    const tag = getContainer().querySelector<HTMLElement>('.h-tag')!;
    await dispatch(tag, new MouseEvent('mouseover', { bubbles: true }));
    await act(async () => vi.advanceTimersByTime(20));
    expect(getContainer().querySelector('.h-tag__close')).not.toBeNull();
    await dispatch(tag, new MouseEvent('mousedown', { bubbles: true }));
    expect(tag.style.background).not.toBe('');
    await dispatch(document, new MouseEvent('mouseup', { bubbles: true }));
    await dispatch(tag, new MouseEvent('mouseleave', { bubbles: true }));
    vi.useRealTimers();
  });

  it('exposes edit, commits accepted group edits and restores rejected edits', async () => {
    const ref = createRef<TagHandle>();
    const onEdited = vi.fn();
    await render(
      h(
        TagGroup,
        { beforeEdit: async () => true, editable: true, onEdited },
        h(Tag, { id: 'one', ref }, 'Original'),
      ),
    );
    act(() => ref.current?.edit('Preset'));
    let input = getContainer().querySelector<HTMLInputElement>('.h-tag__input')!;
    expect(input.value).toBe('Preset');
    await act(async () => {
      inputText(input, 'Edited');
    });
    await act(async () => input.dispatchEvent(new FocusEvent('focusout', { bubbles: true })));
    expect(onEdited).toHaveBeenCalledWith('Edited', 'Preset', 'one');

    await render(
      h(
        TagGroup,
        { beforeEdit: () => false, editable: true, onEdited },
        h(Tag, { id: 'two' }, 'Safe'),
      ),
    );
    await dispatch(
      getContainer().querySelector('.h-tag')!,
      new MouseEvent('dblclick', { bubbles: true }),
    );
    input = getContainer().querySelector<HTMLInputElement>('.h-tag__input')!;
    await act(async () => {
      inputText(input, 'Rejected');
    });
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    expect(onEdited).toHaveBeenCalledTimes(1);
  });

  it('runs guarded close and create once while pending', async () => {
    const gate = Promise.withResolvers<boolean>();
    const beforeCreate = vi.fn(() => gate.promise);
    const onCreated = vi.fn();
    const onClosed = vi.fn();
    await render(
      h(
        TagGroup,
        {
          beforeClose: () => true,
          beforeCreate,
          editable: true,
          onClosed,
          onCreated,
          useCreate: true,
        },
        h(Tag, { closable: true, id: 'old' }, 'Old'),
      ),
    );
    await click(getContainer().querySelector('.h-tag__close')!);
    expect(onClosed).toHaveBeenCalledWith('old');
    const create = [...getContainer().querySelectorAll('.h-tag')].at(-1)!;
    await click(create);
    const input = getContainer().querySelector<HTMLInputElement>('.h-tag__input')!;
    await act(async () => {
      inputText(input, 'New');
    });
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    expect(beforeCreate).toHaveBeenCalledOnce();
    await click(create);
    expect(beforeCreate).toHaveBeenCalledOnce();
    await act(async () => gate.resolve(true));
    expect(onCreated).toHaveBeenCalledWith('New');
  });

  it('collapses by minimum count and exposes expansion commands', async () => {
    const ref = createRef<TagGroupHandle>();
    const onToggled = vi.fn();
    await render(
      h(
        TagGroup,
        { collapse: true, expand: true, minDisplayed: 1, onToggled, ref },
        h(Tag, { id: 'a' }, 'Alpha'),
        h(Tag, { id: 'b' }, 'Beta'),
        h(Tag, { id: 'c' }, 'Gamma'),
      ),
    );
    expect(getContainer().querySelector('.h-tag-group__container')?.textContent).toContain('+2');
    act(() => ref.current?.toggle(true));
    expect(onToggled).toHaveBeenCalledWith(true);
    expect(
      getContainer().querySelectorAll('.h-tag-group__container > .h-tag').length,
    ).toBeGreaterThanOrEqual(3);
    await act(async () => ref.current?.calculate());
    expect(ref.current?.element?.getAttribute('role')).toBe('group');
  });

  it('renders custom group regions and create renderers', async () => {
    await render(
      h(
        TagGroup,
        {
          append: h('span', { 'data-append': true }, 'After'),
          prefix: h('span', { 'data-prefix': true }, 'Prefix'),
          prepend: h('span', { 'data-prepend': true }, 'Before'),
          renderCreate: tags => h('button', { 'data-create': true }, tags.length),
          suffix: h('span', { 'data-suffix': true }, 'Suffix'),
        },
        h(Tag, { id: 'one' }, 'One'),
      ),
    );
    expect(getContainer().querySelector('[data-prepend]')).not.toBeNull();
    expect(getContainer().querySelector('[data-prefix]')).not.toBeNull();
    expect(getContainer().querySelector('[data-suffix]')).not.toBeNull();
    expect(getContainer().querySelector('[data-append]')).not.toBeNull();
    expect(getContainer().querySelector('[data-create]')?.textContent).toBe('1');
  });

  it('uses provider labels, survives StrictMode and renders on the server', async () => {
    await render(
      h(
        StrictMode,
        null,
        h(
          HorizonWebProvider,
          { tagLabels: { close: 'Delete label', create: 'New label' } },
          h(TagGroup, { editable: true, useCreate: true }, h(Tag, { closable: true }, 'Label')),
        ),
      ),
    );
    expect(getContainer().querySelector('[aria-label="Delete label"]')).not.toBeNull();
    expect(getContainer().textContent).toContain('New label');
    expect(renderToString(h(Tag, null, 'SSR'))).toContain('h-tag--medium');
  });

  it('supports pure output, native event cancellation and the complete edit keyboard lifecycle', async () => {
    const ref = createRef<TagHandle>();
    const onDoubleClick = vi.fn((event: ReactMouseEvent<HTMLSpanElement>) =>
      event.preventDefault(),
    );
    const onKeyDown = vi.fn((event: ReactKeyboardEvent<HTMLSpanElement>) => {
      if (event.key === 'Enter') event.preventDefault();
    });
    const onMouseDown = vi.fn((event: ReactMouseEvent<HTMLSpanElement>) => event.preventDefault());
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    await render(
      h(
        Tag,
        { editable: true, onDoubleClick, onKeyDown, onMouseDown, onMouseEnter, onMouseLeave, ref },
        h('strong', null, 'Nested'),
      ),
    );
    const tag = ref.current!.element!;
    const content = tag.querySelector<HTMLElement>('.h-tag__content')!;
    Object.defineProperties(content, {
      clientWidth: { configurable: true, value: 10 },
      scrollWidth: { configurable: true, value: 100 },
    });
    await dispatch(tag, new MouseEvent('mouseover', { bubbles: true }));
    await dispatch(tag, new MouseEvent('mouseout', { bubbles: true }));
    await dispatch(tag, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    await dispatch(tag, new MouseEvent('dblclick', { bubbles: true, cancelable: true }));
    await dispatch(
      tag,
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter' }),
    );
    expect(getContainer().querySelector('input')).toBeNull();
    expect(onMouseEnter).toHaveBeenCalledOnce();
    expect(onMouseLeave).toHaveBeenCalledOnce();

    act(() => ref.current?.edit());
    let input = getContainer().querySelector<HTMLInputElement>('input')!;
    await dispatch(input, new KeyboardEvent('keyup', { bubbles: true, key: 'Escape' }));
    expect(getContainer().querySelector('input')).toBeNull();
    act(() => ref.current?.edit('Commit'));
    input = getContainer().querySelector<HTMLInputElement>('input')!;
    await dispatch(input, new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));
    expect(getContainer().querySelector('input')).toBeNull();

    await render(h(Tag, { pure: true }, h('em', { 'data-pure': true }, 'Pure')));
    expect(getContainer().querySelector('[data-pure]')?.textContent).toBe('Pure');
    expect(getContainer().querySelector('.h-tag')).toBeNull();
  });

  it('rejects guarded close, supports nested tooltip text and expands from the summary', async () => {
    const onClosed = vi.fn();
    const onExceeded = vi.fn();
    const ref = createRef<TagGroupHandle>();
    await render(
      h(
        TagGroup,
        {
          beforeClose: () => false,
          collapse: true,
          expand: true,
          minDisplayed: 1,
          onClosed,
          onExceeded,
          ref,
          tooltipRenderType: 'innerText',
        },
        h(Tag, { closable: true, id: 'a' }, h('span', null, 'Alpha')),
        h(Tag, { id: 'b' }, h('span', null, 'Beta')),
        'plain child',
      ),
    );
    await click(getContainer().querySelector('.h-tag__close')!);
    expect(onClosed).not.toHaveBeenCalled();
    expect(onExceeded).toHaveBeenCalledOnce();
    const summary = getContainer().querySelector('[aria-label="Show hidden tags"]')!;
    await click(summary);
    expect(getContainer().textContent).toContain('Beta');
    act(() => ref.current?.toggle());
    expect(getContainer().querySelector('[aria-label="Show hidden tags"]')).not.toBeNull();
  });

  it('renders full collapsed content, collapse control and explicit empty create renderer', async () => {
    const ref = createRef<TagGroupHandle>();
    await render(
      h(
        TagGroup,
        {
          collapse: true,
          expand: true,
          minDisplayed: 1,
          ref,
          renderCreate: () => null,
          tooltipRenderType: 'full',
          useCreate: true,
        },
        h(Tag, { id: 'a' }, 'Alpha'),
        h(Tag, { id: 'b' }, 'Beta'),
      ),
    );
    const container = getContainer().querySelector<HTMLElement>('.h-tag-group__container')!;
    Object.defineProperty(container, 'clientHeight', { configurable: true, value: 48 });
    await act(async () => ref.current?.calculate());
    act(() => ref.current?.toggle(true));
    const collapse = getContainer().querySelector('[aria-label="Collapse tags"]')!;
    await click(collapse);
    expect(getContainer().querySelector('[aria-label="Show hidden tags"]')).not.toBeNull();
    expect(getContainer().querySelector('.h-tag-group__create-tag')).toBeNull();
  });

  it('covers empty content, avatar sizes, string tooltips and Space activation', async () => {
    const ref = createRef<TagHandle>();
    await render(h(Tag, { editable: true, ref }));
    await dispatch(ref.current!.element!, new MouseEvent('mouseover', { bubbles: true }));
    await dispatch(ref.current!.element!, new MouseEvent('dblclick', { bubbles: true }));
    let input = getContainer().querySelector<HTMLInputElement>('input')!;
    expect(input.value).toBe('');
    await dispatch(input, new KeyboardEvent('keyup', { bubbles: true, key: 'Escape' }));
    await render(h(Tag, { ref }));
    act(() => ref.current?.edit());
    input = getContainer().querySelector<HTMLInputElement>('input')!;
    expect(input.value).toBe('');

    const onActiveChange = vi.fn();
    await render(
      h(
        'div',
        null,
        h(Tag, { active: false, avatar: '/small.png', onActiveChange, size: 'small' }, 'Small'),
        h(Tag, { avatar: '/medium.png', tooltip: 'Medium tooltip' }, 'Medium'),
        h(Tag, { editable: false }, 'Static'),
      ),
    );
    const tags = getContainer().querySelectorAll('.h-tag');
    await dispatch(tags[0]!, new KeyboardEvent('keydown', { bubbles: true, key: ' ' }));
    await dispatch(tags[2]!, new MouseEvent('dblclick', { bubbles: true }));
    expect(onActiveChange).toHaveBeenCalledWith(true);
    expect(getContainer().querySelector('input')).toBeNull();
  });

  it('does not update unmounted tags when asynchronous guards settle', async () => {
    const editGate = Promise.withResolvers<boolean>();
    const editRef = createRef<TagHandle>();
    await render(
      h(
        TagGroup,
        { beforeEdit: () => editGate.promise, editable: true },
        h(Tag, { id: 'edit', ref: editRef }, 'Edit'),
      ),
    );
    act(() => editRef.current?.edit('Before'));
    let input = getContainer().querySelector<HTMLInputElement>('input')!;
    await act(async () => inputText(input, 'After'));
    await dispatch(input, new FocusEvent('focusout', { bubbles: true }));
    await render(h(Tag, null, 'Replacement'));
    await act(async () => editGate.resolve(true));

    const closeGate = Promise.withResolvers<boolean>();
    await render(
      h(
        TagGroup,
        { beforeClose: () => closeGate.promise },
        h(Tag, { closable: true, id: 'close' }, 'Close'),
      ),
    );
    await click(getContainer().querySelector('.h-tag__close')!);
    await render(h(Tag, null, 'Replacement'));
    await act(async () => closeGate.resolve(true));
    expect(getContainer().textContent).toContain('Replacement');
  });

  it('supports summary actions without expansion and without tooltip-driven clickability', async () => {
    await render(
      h(
        TagGroup,
        { collapseUseTooltip: true, expand: false, minDisplayed: 1 },
        h(Tag, null, 'One'),
        h(Tag, null, 'Two'),
      ),
    );
    await click(getContainer().querySelector('[aria-label="Show hidden tags"]')!);
    expect(getContainer().textContent).not.toContain('Two');

    await render(
      h(
        TagGroup,
        { collapseUseTooltip: false, expand: true, minDisplayed: 1 },
        h(Tag, null, 'One'),
        h(Tag, null, 'Two'),
      ),
    );
    await click(getContainer().querySelector('[aria-label="Show hidden tags"]')!);
    expect(getContainer().textContent).toContain('Two');
  });
});
