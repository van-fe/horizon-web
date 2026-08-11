import { mount } from '@vue/test-utils';
import { HBreadcrumb, HBreadcrumbItem } from '..';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { IconArrowRight } from '@aurora/icon';

describe('BreadcrumbItem.tsx', () => {
  describe('props', () => {
    test('clickable in normal render', async () => {
      const clickable = ref(false);
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <HBreadcrumb>
          <HBreadcrumbItem clickable={clickable.value} onClick={onClick}>
            HOME
          </HBreadcrumbItem>
        </HBreadcrumb>
      ));

      await wrapper.find('.h-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);

      clickable.value = true;

      await nextTick();

      await wrapper.find('.h-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
      expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    });

    test('renders item separator and title props and lets slots override the separator', () => {
      const propSeparator = mount(() => (
        <HBreadcrumbItem separator="/" title size="small">
          Current
        </HBreadcrumbItem>
      ));
      expect(propSeparator.get('.h-breadcrumb-item__suffix').text()).toBe('/');
      expect(propSeparator.get('.h-breadcrumb-item__text').classes()).toEqual(
        expect.arrayContaining(['h-breadcrumb-item--small', 'h-breadcrumb-item__title']),
      );

      const slotSeparator = mount(HBreadcrumbItem, {
        props: { separator: '/' },
        slots: {
          default: () => 'Current',
          separator: () => <b class="separator-slot">→</b>,
        },
      });
      expect(slotSeparator.get('.separator-slot').text()).toBe('→');
      expect(slotSeparator.get('.h-breadcrumb-item__suffix').text()).not.toContain('/');

      const componentSeparator = mount(() => (
        <HBreadcrumb separator={IconArrowRight}>
          <HBreadcrumbItem>Current</HBreadcrumbItem>
        </HBreadcrumb>
      ));
      expect(componentSeparator.find('.h-breadcrumb-item__suffix svg').exists()).toBe(true);

      const directComponentSeparator = mount(() => (
        <HBreadcrumbItem separator={IconArrowRight} />
      ));
      expect(directComponentSeparator.find('.h-breadcrumb-item__suffix svg').exists()).toBe(true);
      expect(directComponentSeparator.get('.h-breadcrumb-item__text').text()).toBe('');
    });

    test('warns once when standalone routing props are used without a router', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const wrapper = mount(() => <HBreadcrumbItem to="/missing">Missing</HBreadcrumbItem>);

      await wrapper.get('.h-breadcrumb-item__text').trigger('click');
      expect(warn).toHaveBeenCalledOnce();
      warn.mockRestore();
    });

    test('clickable in props render', async () => {
      const clickable = ref(false);
      const onClick = vi.fn();

      const wrapper = mount(() => (
        <HBreadcrumb
          texts={[
            {
              text: 'HOME',
              clickable: clickable.value,
            },
          ]}
          onItemClick={onClick}
        />
      ));

      await wrapper.find('.h-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(0);

      clickable.value = true;

      await nextTick();

      await wrapper.find('.h-breadcrumb-item__text').trigger('click');

      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
