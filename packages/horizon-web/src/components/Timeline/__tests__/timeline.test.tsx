import { mount, shallowMount } from '@vue/test-utils';
import { HTimeline, HTimelineItem } from '..';
import { describe, expect, test, vi } from 'vitest';
import { useDateFormative } from '../src/composables/useDateFormat';
import { LocaleSupportLang } from '@aurora/locale-vue';

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
        {{
          default: () => [
            <HTimelineItem timestamp="2025-03-01" name="Late" />,
            <HTimelineItem timestamp="2025-01-01" name="Early" />,
            <HTimelineItem timestamp="2025-02-01" name="Middle" />,
          ],
        }}
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

  test('applies timestamp formatting, tail presentation, offset and icon props', () => {
    const wrapper = mount(() => (
      <HTimeline>
        <HTimelineItem
          timestamp="2025-03-08 12:34:00"
          format="YYYY/MM/DD"
          placement="bottom"
          offset={9}
          type="circle"
          size="large"
          icon="check"
          color="#123456"
          borderColor="#654321"
          tailColor="#abcdef"
          dashed
          name="Deploy"
          desc="Production"
        />
      </HTimeline>
    ));
    const dot = wrapper.get('.h-timeline-item__dot');
    const tail = wrapper.get('.h-timeline-item__tail');

    expect(wrapper.get('.h-timeline-item__timestamp--bottom').text()).toBe('2025/03/08');
    expect(wrapper.get('.h-timeline-item__name').text()).toContain('Deploy');
    expect(wrapper.get('.h-timeline-item__desc').text()).toBe('Production');
    expect(dot.classes()).toContain('h-timeline-item__dot--large');
    expect(dot.classes()).toContain('h-timeline-item__dot--circle');
    expect(dot.find('svg').exists()).toBe(true);
    expect(tail.classes()).toContain('h-timeline-item__tail--dashed');
    expect((tail.element as HTMLElement).style.margin).toBe('9px 0px');
  });

  test('renders hiddenDot and fold content after the native dot click', async () => {
    const wrapper = mount(() => (
      <HTimeline>
        <HTimelineItem
          name="fold"
          foldConfig={{ number: 1, content: 'One hidden event', dot: { size: 'small' } }}
          v-slots={{ hiddenDot: () => <button data-hidden-dot>Expand one</button> }}
        />
        <HTimelineItem name="hidden item" />
      </HTimeline>
    ));

    await wrapper.get('.h-timeline-item__dot-wrapper').trigger('click');

    expect(wrapper.get('[data-hidden-dot]').text()).toBe('Expand one');
    expect(wrapper.findAll('.h-timeline-item')[1].classes()).toContain('hidden');
    expect(wrapper.findAll('.h-timeline-item')[0].text()).toContain('One hidden event');
  });

  test('normalizes every supported timestamp input and preserves invalid values', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(useDateFormative(new Date(2025, 0, 2), 'YYYY-MM-DD')).toBe('2025-01-02');
    expect(useDateFormative(1_735_776_000, 'YYYY-MM-DD')).toBe('2025-01-02');
    expect(useDateFormative('1735776000000', 'YYYY-MM-DD')).toBe('2025-01-02');
    expect(useDateFormative('2025-01-02', 'YYYY/MM/DD', LocaleSupportLang.En)).toBe('2025/01/02');
    const invalid = { date: false };
    expect(useDateFormative(invalid as never)).toBe(invalid);
    expect(warning).toHaveBeenCalledWith('无效的时间参数');
    warning.mockRestore();
  });

  test('ignores unknown fold owners and preserves an existing hidden owner marker', async () => {
    const wrapper = mount(() => (
      <HTimeline>
        <HTimelineItem name="toggle" foldConfig={{ number: 1, content: 'hidden', dot: {} }} />
        <HTimelineItem name="target" />
      </HTimeline>
    ));
    const [toggle, target] = wrapper.findAll('.h-timeline-item');
    const originalUid = toggle.attributes('data-uid');
    toggle.element.setAttribute('data-uid', '999999');
    await toggle.get('.h-timeline-item__dot-wrapper').trigger('click');
    expect(target.classes()).not.toContain('hidden');

    await toggle.get('.h-timeline-item__dot-wrapper').trigger('click');
    toggle.element.setAttribute('data-uid', originalUid!);
    target.element.setAttribute('data-hidden-uid', 'existing-owner');
    await toggle.get('.h-timeline-item__dot-wrapper').trigger('click');
    expect(target.classes()).toContain('hidden');
    expect(target.attributes('data-hidden-uid')).toBe('existing-owner');
  });

  test('renders fold dot overrides, right timestamps and ignores clicks without fold config', async () => {
    const plain = mount(() => (
      <HTimeline>
        <HTimelineItem timestamp="2025-01-02" placement="right" name="plain" />
      </HTimeline>
    ));
    await plain.get('.h-timeline-item__dot-wrapper').trigger('click');
    expect(plain.get('.h-timeline-item__timestamp--right').text()).toContain('2025');
    expect(plain.find('.h-timeline-item__desc--hidden').exists()).toBe(false);

    const folded = mount(() => (
      <HTimeline>
        <HTimelineItem
          name="fold"
          type="disc"
          size="medium"
          color="#111111"
          borderColor="#222222"
          icon="check"
          foldConfig={{
            number: 1,
            content: 'folded content',
            dot: {
              type: 'circle',
              size: 'large',
              color: '#123456',
              borderColor: '#654321',
              icon: 'check',
            },
          }}
        />
        <HTimelineItem name="hidden" />
      </HTimeline>
    ));
    await folded.get('.h-timeline-item__dot-wrapper').trigger('click');
    const dot = folded.get('.h-timeline-item__dot');
    expect(dot.classes()).toContain('h-timeline-item__dot--circle');
    expect(dot.classes()).toContain('h-timeline-item__dot--large');
    expect(dot.find('svg').exists()).toBe(true);
    expect(folded.text()).toContain('folded content');
  });
});
