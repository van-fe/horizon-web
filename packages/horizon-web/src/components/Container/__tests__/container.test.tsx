import { mount, shallowMount } from '@vue/test-utils';
import { HAside, HContainer, HFooter, HHeader, HMain } from '..';
import { describe, expect, test } from 'vitest';

describe('Container.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HContainer />);
    const element = wrapper.findComponent(HContainer);

    expect(element.exists()).toBe(true);
  });

  test('uses semantic layout elements and preserves slot content', () => {
    const wrapper = mount(() => (
      <HContainer>
        <HHeader height={72}>Header</HHeader>
        <HAside width="18rem">Aside</HAside>
        <HMain>Main</HMain>
        <HFooter height="48px">Footer</HFooter>
      </HContainer>
    ));

    expect(wrapper.get('section').classes()).toContain('is-vertical');
    expect(wrapper.get('header').attributes('style')).toContain('height: 72px');
    expect(wrapper.get('aside').attributes('style')).toContain('width: 18rem');
    expect(wrapper.get('main').text()).toBe('Main');
    expect(wrapper.get('footer').attributes('style')).toContain('height: 48px');
  });

  test('infers horizontal layout without header/footer and respects an explicit direction', () => {
    const horizontal = mount(() => (
      <HContainer>
        <HAside />
        <HMain />
      </HContainer>
    ));
    const forcedVertical = mount(() => <HContainer direction="vertical" />);
    const forcedHorizontal = mount(() => (
      <HContainer direction="horizontal">
        <HHeader />
      </HContainer>
    ));

    expect(horizontal.get('section').classes()).not.toContain('is-vertical');
    expect(forcedVertical.get('section').classes()).toContain('is-vertical');
    expect(forcedHorizontal.get('section').classes()).not.toContain('is-vertical');
  });
});
