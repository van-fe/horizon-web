import { mount } from '@vue/test-utils';
import HCard from '../src/Card';
import { describe, expect, test } from 'vitest';
import { nextTick, ref } from 'vue';

describe('Card.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HCard />);
    const element = wrapper.findComponent(HCard);

    expect(element.exists()).toBe(true);
  });

  test('renders named slots around the main content', () => {
    const wrapper = mount(() => (
      <HCard>
        {{
          header: () => <header class="custom-header">Header</header>,
          default: () => <p class="body">Body</p>,
          footer: () => <footer class="custom-footer">Footer</footer>,
        }}
      </HCard>
    ));

    expect(wrapper.find('.custom-header').text()).toBe('Header');
    expect(wrapper.find('.h-card__content .body').text()).toBe('Body');
    expect(wrapper.find('.custom-footer').text()).toBe('Footer');
  });

  test('title takes precedence over the header slot', () => {
    const wrapper = mount(() => (
      <HCard title="Account">{{ header: () => <span class="custom-header">Ignored</span> }}</HCard>
    ));

    expect(wrapper.find('.h-card__header').text()).toBe('Account');
    expect(wrapper.find('.custom-header').exists()).toBe(false);
  });

  test('reacts to border, radius and divider props', async () => {
    const border = ref(false);
    const radius = ref<'small' | 'large'>('small');
    const dividers = ref(false);
    const wrapper = mount(() => (
      <HCard
        border={border.value}
        radius={radius.value}
        topDivider={dividers.value}
        bottomDivider={dividers.value}
      />
    ));

    expect(wrapper.classes()).toContain('h-card--small');
    expect(wrapper.classes()).not.toContain('is-border');
    expect(wrapper.findAll('.h-card__divider')).toHaveLength(0);

    border.value = true;
    radius.value = 'large';
    dividers.value = true;
    await nextTick();

    expect(wrapper.classes()).toContain('h-card--large');
    expect(wrapper.classes()).toContain('is-border');
    expect(wrapper.findAll('.h-card__divider')).toHaveLength(2);
  });
});
