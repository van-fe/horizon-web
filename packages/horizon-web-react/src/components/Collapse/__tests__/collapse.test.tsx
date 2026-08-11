import type { ReactElement } from 'react';
import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Collapse, CollapseItem } from '../../../index';
import type { CollapseHandle } from '..';
import { click, getContainer, render } from '../../../__tests__/harness';

function panel(name: string, title = name, extra = {}): ReactElement {
  return h(CollapseItem, { name, title, ...extra }, `${title} body`);
}

describe('React Collapse', () => {
  it('renders native accessible headers, appearance classes and persistent bodies', async () => {
    await render(
      h(
        Collapse,
        {
          border: true,
          className: 'consumer-collapse',
          defaultValue: ['first'],
          expandIconPosition: 'right',
          filled: true,
          size: 'large',
        },
        panel('first', 'First'),
        panel('second', 'Second'),
      ),
    );
    const root = getContainer().querySelector('.h-collapse')!;
    const headers = root.querySelectorAll('button');
    const regions = root.querySelectorAll<HTMLElement>('[role="region"]');

    expect(root.classList.contains('h-collapse--border')).toBe(true);
    expect(root.classList.contains('h-collapse--filled')).toBe(true);
    expect(root.classList.contains('h-collapse--right')).toBe(true);
    expect(root.classList.contains('h-collapse--large')).toBe(true);
    expect(root.classList.contains('consumer-collapse')).toBe(true);
    expect(headers[0].getAttribute('aria-expanded')).toBe('true');
    expect(headers[0].getAttribute('aria-controls')).toBe(regions[0].id);
    expect(regions[0].getAttribute('aria-labelledby')).toBe(headers[0].id);
    expect(regions[0].hidden).toBe(false);
    expect(regions[1].hidden).toBe(true);
  });

  it('toggles uncontrolled panels, reports semantic values and ignores disabled items', async () => {
    const onChange = vi.fn();
    await render(
      h(
        Collapse,
        { onChange },
        panel('first', 'First'),
        panel('disabled', 'Disabled', { disabled: true }),
      ),
    );

    await click(getContainer().querySelector('[data-collapse-key="first"] button')!);
    expect(onChange).toHaveBeenLastCalledWith(['first']);
    expect(
      getContainer()
        .querySelector('[data-collapse-key="first"]')
        ?.classList.contains('h-collapse-item--expand'),
    ).toBe(true);

    const disabled = getContainer().querySelector<HTMLButtonElement>(
      '[data-collapse-key="disabled"] button',
    )!;
    expect(disabled.disabled).toBe(true);
    await click(disabled);
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('keeps controlled accordion state authoritative until the parent updates it', async () => {
    const onChange = vi.fn();
    await render(
      h(Collapse, { accordion: true, onChange, value: 'first' }, panel('first'), panel('second')),
    );

    await click(getContainer().querySelector('[data-collapse-key="second"] button')!);
    expect(onChange).toHaveBeenCalledWith('second');
    expect(
      getContainer()
        .querySelector('[data-collapse-key="first"]')
        ?.classList.contains('h-collapse-item--expand'),
    ).toBe(true);

    await render(
      h(Collapse, { accordion: true, value: 'second' }, panel('first'), panel('second')),
    );
    expect(
      getContainer()
        .querySelector('[data-collapse-key="second"]')
        ?.classList.contains('h-collapse-item--expand'),
    ).toBe(true);
  });

  it('supports conditional bodies, rich title and icon regions, styles and nesting', async () => {
    await render(
      h(
        Collapse,
        null,
        h(
          CollapseItem,
          {
            background: 'rgb(4, 5, 6)',
            color: 'rgb(1, 2, 3)',
            directive: 'if',
            expandIcon: h('span', { 'data-icon': true }, '+'),
            name: 'rich',
            title: h('strong', { 'data-title': true }, 'Rich'),
          },
          h(Collapse, null, panel('nested')),
        ),
      ),
    );
    const item = getContainer().querySelector<HTMLElement>('[data-collapse-key="rich"]')!;

    expect(item.querySelector('[role="region"]')).toBeNull();
    expect(item.querySelector('[data-title]')?.textContent).toBe('Rich');
    expect(item.querySelector('[data-icon]')?.textContent).toBe('+');
    expect(item.classList.contains('h-collapse-item--nest')).toBe(true);
    expect(item.style.borderBottomColor).toBe('rgb(1, 2, 3)');
    expect((item.querySelector('button') as HTMLElement).style.backgroundColor).toBe(
      'rgb(4, 5, 6)',
    );

    await click(item.querySelector('button')!);
    expect(item.querySelector('[role="region"]')).not.toBeNull();
  });

  it('expands enabled direct items initially and exposes keyed focus', async () => {
    const collapseRef = createRef<CollapseHandle>();
    await render(
      h(
        Collapse,
        { expandAll: true, ref: collapseRef },
        panel('first'),
        panel('disabled', 'Disabled', { disabled: true }),
        panel('third'),
      ),
    );

    expect(getContainer().querySelectorAll('.h-collapse-item--expand')).toHaveLength(2);
    collapseRef.current?.focus();
    expect(document.activeElement?.textContent).toContain('first');
    collapseRef.current?.focus('third');
    expect(document.activeElement?.textContent).toContain('third');
    expect(collapseRef.current?.root?.classList.contains('h-collapse')).toBe(true);
  });
});
