import { createElement as h, createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { click, getContainer, render } from '../../../__tests__/harness';
import { HorizonWebProvider, Timeline, TimelineItem } from '../../../index';

describe('React Timeline', () => {
  it('sorts items and applies first and final node overrides', async () => {
    await render(
      h(
        Timeline,
        {
          sort: 'order',
          first: { type: 'circle', size: 'large' },
          last: { type: 'circle', size: 'small' },
        },
        h(TimelineItem, { name: 'Late', timestamp: '2025-03-01' }),
        h(TimelineItem, { name: 'Early', timestamp: '2025-01-01' }),
        h(TimelineItem, { name: 'Middle', timestamp: '2025-02-01' }),
      ),
    );
    const container = getContainer();
    const names = [...container.querySelectorAll('.h-timeline-item__name--content')].map(
      item => item.textContent,
    );
    const dots = container.querySelectorAll('.h-timeline-item__dot');

    expect(names).toEqual(['Early', 'Middle', 'Late']);
    expect(dots[0]?.classList).toContain('h-timeline-item__dot--large');
    expect(dots[0]?.classList).toContain('h-timeline-item__dot--circle');
    expect(dots[2]?.classList).toContain('h-timeline-item__dot--small');
  });

  it('formats timestamps and renders native React content regions', async () => {
    await render(
      h(
        Timeline,
        { locale: 'en-US' },
        h(
          TimelineItem,
          {
            name: h('strong', { 'data-name': true }, 'Deploy'),
            timestamp: '2025-03-08 12:34:00',
            format: 'YYYY/MM/DD',
            placement: 'right',
            dot: h('span', { 'data-dot': true }, 'D'),
          },
          h('em', { 'data-description': true }, 'Production'),
        ),
      ),
    );
    const container = getContainer();

    expect(container.querySelector('[data-name]')?.textContent).toBe('Deploy');
    expect(container.querySelector('[data-dot]')?.textContent).toBe('D');
    expect(container.querySelector('[data-description]')?.textContent).toBe('Production');
    expect(container.querySelector('time')?.textContent).toBe('2025/03/08');
  });

  it('renders tail presentation, spacing and custom node styles', async () => {
    await render(
      h(
        Timeline,
        null,
        h(TimelineItem, {
          name: 'Build',
          dashed: true,
          offset: '1rem',
          type: 'circle',
          size: 'large',
          icon: h('span', { 'data-icon': true }, '✓'),
          color: 'rgb(18, 52, 86)',
          borderColor: 'rgb(101, 67, 33)',
          tailColor: 'rgb(10, 20, 30)',
        }),
        h(TimelineItem, { name: 'Done', tail: false }),
      ),
    );
    const container = getContainer();
    const tail = container.querySelector('.h-timeline-item__tail') as HTMLElement;
    const dot = container.querySelector('.h-timeline-item__dot') as HTMLElement;

    expect(tail.classList).toContain('h-timeline-item__tail--dashed');
    expect(tail.style.margin).toBe('1rem 0px');
    expect(tail.style.borderColor).toBe('rgb(10, 20, 30)');
    expect(dot.style.color).toBe('rgb(18, 52, 86)');
    expect(container.querySelector('[data-icon]')?.textContent).toBe('✓');
    expect(container.querySelectorAll('.h-timeline-item__tail')).toHaveLength(1);
  });

  it('folds following items with an accessible provider-localized control', async () => {
    await render(
      h(
        HorizonWebProvider,
        { timelineLabels: { toggle: 'Toggle release history' } },
        h(
          Timeline,
          null,
          h(TimelineItem, {
            name: 'Toggle',
            foldConfig: {
              number: 2,
              content: h('span', { 'data-fold-content': true }, '2 hidden events'),
              dot: { type: 'circle', size: 'large' },
            },
            hiddenDot: h('span', { 'data-hidden-dot': true }, '+2'),
          }),
          h(TimelineItem, { name: 'Hidden one' }),
          h(TimelineItem, { name: 'Hidden two' }),
          h(TimelineItem, { name: 'Visible' }),
        ),
      ),
    );
    const container = getContainer();
    const button = container.querySelector('button')!;
    const items = container.querySelectorAll('li');

    expect(button.getAttribute('aria-label')).toBe('Toggle release history');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    await click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(items[1]?.hasAttribute('hidden')).toBe(true);
    expect(items[2]?.hasAttribute('hidden')).toBe(true);
    expect(items[3]?.hasAttribute('hidden')).toBe(false);
    expect(container.querySelector('[data-hidden-dot]')?.textContent).toBe('+2');
    expect(container.querySelector('[data-fold-content]')?.textContent).toBe('2 hidden events');

    await click(button);
    expect(items[1]?.hasAttribute('hidden')).toBe(false);
    expect(items[2]?.hasAttribute('hidden')).toBe(false);
  });

  it('forwards native list attributes and item refs', async () => {
    const itemRef = createRef<HTMLLIElement>();
    const timelineRef = createRef<HTMLOListElement>();
    await render(
      h(
        Timeline,
        { 'aria-label': 'Release history', 'data-timeline': true, ref: timelineRef },
        h(TimelineItem, { 'data-item': true, name: 'Release', ref: itemRef }),
      ),
    );

    expect(timelineRef.current?.tagName).toBe('OL');
    expect(timelineRef.current?.getAttribute('aria-label')).toBe('Release history');
    expect(itemRef.current?.tagName).toBe('LI');
    expect(itemRef.current?.hasAttribute('data-item')).toBe(true);
  });
});
