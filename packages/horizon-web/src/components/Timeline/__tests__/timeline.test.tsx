import { mount, shallowMount } from '@vue/test-utils';
import { HTimeline, HTimelineItem } from '..';
import { describe, expect, test } from 'vitest';

describe('Timeline.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HTimeline />);
    const element = wrapper.findComponent(HTimeline);

    expect(element.exists()).toBe(true);
  });

  test.each([
    ['order', ['Early', 'Middle', 'Late']],
    ['reverse', ['Late', 'Middle', 'Early']],
  ] as const)('sorts items in %s chronology', (sort, expected) => {
    const wrapper = mount(() => (
      <HTimeline sort={sort}>
        <HTimelineItem timestamp="2025-03-01" name="Late" />
        <HTimelineItem timestamp="2025-01-01" name="Early" />
        <HTimelineItem timestamp="2025-02-01" name="Middle" />
      </HTimeline>
    ));

    expect(wrapper.findAll('.h-timeline-item__name--content').map(item => item.text())).toEqual(
      expected,
    );
  });

  test('renders item slots, dot styling, placement and optional tail', () => {
    const wrapper = mount(() => (
      <HTimeline>
        <HTimelineItem
          timestamp="2025-01-01"
          placement="top"
          type="circle"
          color="#123456"
          borderColor="#654321"
          dashed
          tail={false}
          v-slots={{
            dot: () => <span data-test="custom-dot">D</span>,
            name: () => <strong>Slot name</strong>,
            desc: () => <em>Slot description</em>,
          }}
        />
      </HTimeline>
    ));

    expect(wrapper.get('[data-test="custom-dot"]').text()).toBe('D');
    expect(wrapper.get('.h-timeline-item__name').text()).toContain('Slot name');
    expect(wrapper.get('.h-timeline-item__desc').text()).toContain('Slot description');
    expect(wrapper.find('.h-timeline-item__timestamp--top').exists()).toBe(true);
    expect(wrapper.find('.h-timeline-item__tail').exists()).toBe(false);
  });

  test('applies first and last dot overrides without changing middle items', () => {
    const wrapper = mount(() => (
      <HTimeline
        first={{ type: 'circle', size: 'large' }}
        last={{ type: 'circle', size: 'small' }}
      >
        <HTimelineItem name="first" />
        <HTimelineItem name="middle" />
        <HTimelineItem name="last" />
      </HTimeline>
    ));
    const dots = wrapper.findAll('.h-timeline-item__dot');

    expect(dots[0].classes()).toContain('h-timeline-item__dot--large');
    expect(dots[0].classes()).toContain('h-timeline-item__dot--circle');
    expect(dots[1].classes()).toContain('h-timeline-item__dot--medium');
    expect(dots[2].classes()).toContain('h-timeline-item__dot--small');
  });

  test('folds and restores the requested following items', async () => {
    const wrapper = mount(() => (
      <HTimeline>
        <HTimelineItem name="toggle" foldConfig={{ number: 2, content: '2 events', dot: {} }} />
        <HTimelineItem name="hidden one" />
        <HTimelineItem name="hidden two" />
        <HTimelineItem name="visible" />
      </HTimeline>
    ));
    const toggle = wrapper.findAll('.h-timeline-item__dot-wrapper')[0];

    await toggle.trigger('click');
    const items = wrapper.findAll('.h-timeline-item');
    expect(items[1].classes()).toContain('hidden');
    expect(items[2].classes()).toContain('hidden');
    expect(items[3].classes()).not.toContain('hidden');
    expect(items[0].text()).toContain('2 events');

    await toggle.trigger('click');
    expect(items[1].classes()).not.toContain('hidden');
    expect(items[2].classes()).not.toContain('hidden');
  });
});
