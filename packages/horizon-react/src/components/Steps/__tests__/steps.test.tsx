import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { click, getContainer, render } from '../../../__tests__/harness';
import { HorizonWebProvider, Step, Steps } from '../../../index';
import type { StepsHandle } from '..';

describe('React Steps', () => {
  it('renders native ordered semantics, statuses, layout and content regions', async () => {
    await render(
      h(
        HorizonWebProvider,
        { stepsLabels: { progress: 'Release progress' } },
        h(
          Steps,
          {
            direction: 'vertical',
            labelAlign: 'left',
            labelPlacement: 'vertical',
            progressDot: true,
            size: 'small',
            status: 'warning',
            value: 1,
          },
          h(Step, { description: 'Done', subtitle: 'Approved', title: 'Plan' }),
          h(Step, {
            description: h('em', { 'data-description': true }, 'Needs attention'),
            icon: h('span', { 'data-icon': true }, '!'),
            subtitle: h('strong', { 'data-subtitle': true }, 'Review'),
            title: h('span', { 'data-title': true }, 'Verify'),
          }),
          h(Step, { title: 'Publish' }),
        ),
      ),
    );
    const container = getContainer();
    const root = container.querySelector('ol')!;
    const items = container.querySelectorAll('li');

    expect(root.getAttribute('aria-label')).toBe('Release progress');
    expect(root.classList.contains('is-vertical')).toBe(true);
    expect(root.classList.contains('is-small')).toBe(true);
    expect(root.classList.contains('is-dot')).toBe(true);
    expect(items[0]?.classList.contains('is-finish')).toBe(true);
    expect(items[1]?.classList.contains('is-warning')).toBe(true);
    expect(items[1]?.getAttribute('aria-current')).toBe('step');
    expect(items[2]?.classList.contains('is-wait')).toBe(true);
    expect(container.querySelector('[data-title]')?.textContent).toBe('Verify');
    expect(container.querySelector('[data-subtitle]')?.textContent).toBe('Review');
    expect(container.querySelector('[data-description]')?.textContent).toBe('Needs attention');
    expect(container.querySelector('[data-icon]')?.textContent).toBe('!');
  });

  it('supports uncontrolled activation, item callbacks and the shared focus command', async () => {
    const onChange = vi.fn();
    const onClick = vi.fn();
    const stepsRef = createRef<StepsHandle>();
    await render(
      h(
        Steps,
        { clickable: true, defaultValue: 0, onChange, ref: stepsRef },
        h(Step, { title: 'One' }),
        h(Step, { onClick, title: 'Two' }),
        h(Step, { title: 'Three' }),
      ),
    );
    const buttons = getContainer().querySelectorAll('button');
    await click(buttons[1]!);

    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick.mock.calls[0]?.[1]).toBe(1);
    expect(onChange).toHaveBeenCalledWith(1);
    expect(getContainer().querySelector('[data-index="1"]')?.getAttribute('aria-current')).toBe(
      'step',
    );

    stepsRef.current?.focus(2);
    expect(document.activeElement).toBe(buttons[2]);
    expect(stepsRef.current?.root?.tagName).toBe('OL');
  });

  it('keeps controlled state authoritative until the parent updates it', async () => {
    const onChange = vi.fn();
    await render(
      h(
        Steps,
        { clickable: true, onChange, value: 0 },
        h(Step, { title: 'One' }),
        h(Step, { title: 'Two' }),
      ),
    );
    await click(getContainer().querySelectorAll('button')[1]!);
    expect(onChange).toHaveBeenCalledWith(1);
    expect(getContainer().querySelector('[data-index="0"]')?.getAttribute('aria-current')).toBe(
      'step',
    );

    await render(
      h(
        Steps,
        { clickable: true, onChange, value: 1 },
        h(Step, { title: 'One' }),
        h(Step, { title: 'Two' }),
      ),
    );
    expect(getContainer().querySelector('[data-index="1"]')?.getAttribute('aria-current')).toBe(
      'step',
    );
  });

  it('ignores stale async guards and accepts only the latest request', async () => {
    const resolutions: Array<(accepted: boolean) => void> = [];
    const onChange = vi.fn();
    const onBeforeChange = vi.fn(() => new Promise<boolean>(resolve => resolutions.push(resolve)));
    await render(
      h(
        Steps,
        { clickable: true, onBeforeChange, onChange },
        h(Step, { title: 'One' }),
        h(Step, { title: 'Two' }),
        h(Step, { title: 'Three' }),
      ),
    );
    const buttons = getContainer().querySelectorAll('button');
    await click(buttons[1]!);
    await click(buttons[2]!);

    await act(async () => resolutions[0]?.(true));
    expect(onChange).not.toHaveBeenCalled();
    await act(async () => resolutions[1]?.(true));
    expect(onChange).toHaveBeenCalledWith(2);
    expect(onBeforeChange).toHaveBeenNthCalledWith(
      2,
      2,
      0,
      expect.objectContaining({ title: 'Three' }),
      expect.objectContaining({ title: 'One' }),
    );
  });

  it('honors item clickability, disabled state and dynamic index numbering', async () => {
    const onChange = vi.fn();
    const itemRef = createRef<HTMLLIElement>();
    await render(
      h(
        Steps,
        { initial: 10, onChange },
        h(Step, { clickable: true, 'data-first': true, ref: itemRef, title: 'Start' }),
        h(Step, { index: 20, title: 'Middle' }),
        h(Step, { clickable: true, disabled: true, title: 'Blocked' }),
      ),
    );
    const items = getContainer().querySelectorAll('li');
    const buttons = getContainer().querySelectorAll('button');

    expect([...items].map(item => item.dataset.index)).toEqual(['10', '20', '21']);
    expect(items[0]?.querySelector('.h-step__icon--number')?.textContent).toBe('11');
    expect(buttons).toHaveLength(2);
    expect(buttons[1]?.hasAttribute('disabled')).toBe(true);
    expect(itemRef.current?.hasAttribute('data-first')).toBe(true);
    await click(buttons[1]!);
    expect(onChange).not.toHaveBeenCalled();
  });
});
