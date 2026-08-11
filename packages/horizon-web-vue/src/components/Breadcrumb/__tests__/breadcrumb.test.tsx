import { mount } from '@vue/test-utils';
import { HBreadcrumb, HBreadcrumbItem } from '..';
import { describe, expect, test, vi } from 'vitest';
import type { BreadcrumbProps } from '../src/composables/useProps';
import { createSSRApp, nextTick, ref } from 'vue';
import type { App } from 'vue';
import { renderToString } from 'vue/server-renderer';
import HDropdownItem from '../../Dropdown/src/DropdownItem';
import HDropdown from '../../Dropdown/src/Dropdown';
import { sleep } from '~/utils/tools';
import type { Router } from 'vue-router';

describe('Breadcrumb.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HBreadcrumb texts={[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]} />
    ));

    const element = wrapper.findComponent(HBreadcrumb);

    expect(element.exists()).toBe(true);
  });

  test('renders separator slots for prop items and emits the clicked item and native event', async () => {
    const onItemClick = vi.fn();
    const first = { text: 'Home', clickable: true };
    const wrapper = mount(() => (
      <HBreadcrumb texts={[first, { text: 'Current' }]} title onItemClick={onItemClick}>
        {{ separator: () => <i class="custom-separator">→</i> }}
      </HBreadcrumb>
    ));

    expect(wrapper.findAll('.custom-separator')).toHaveLength(2);
    expect(wrapper.findAll('.h-breadcrumb-item__text')[1].classes()).toContain(
      'h-breadcrumb-item__title',
    );
    await wrapper.findAll('.h-breadcrumb-item__text')[0].trigger('click');
    expect(onItemClick).toHaveBeenCalledOnce();
    expect(onItemClick.mock.calls[0][0]).toMatchObject(first);
    expect(onItemClick.mock.calls[0][1]).toBeInstanceOf(MouseEvent);
  });

  test('keeps the exact source payload when two items have the same visible text', async () => {
    const onItemClick = vi.fn();
    const first = { text: 'Duplicate', clickable: true, to: '/first' };
    const second = { text: 'Duplicate', clickable: true, to: '/second', replace: true };
    const wrapper = mount(() => (
      <HBreadcrumb texts={[first, second]} onItemClick={onItemClick} />
    ));

    await wrapper.findAll('.h-breadcrumb-item__text')[1].trigger('click');

    expect(onItemClick).toHaveBeenCalledOnce();
    expect(onItemClick.mock.calls[0][0]).toEqual(expect.objectContaining(second));
    expect(onItemClick.mock.calls[0][0]).not.toEqual(expect.objectContaining(first));
  });

  test('routes prop items exactly once through push and replace', async () => {
    const router = { push: vi.fn(), replace: vi.fn() };
    const wrapper = mount(
      () => (
        <HBreadcrumb
          texts={[
            { text: 'Push', to: '/push' },
            { text: 'Replace', to: '/replace', replace: true },
          ]}
        />
      ),
      {
        global: {
          plugins: [
            {
              install(app: App) {
                app.config.globalProperties.$router = router as unknown as Router;
              },
            },
          ],
        },
      },
    );

    const items = wrapper.findAll('.h-breadcrumb-item__text');
    await items[0].trigger('click');
    await items[1].trigger('click');
    expect(router.push).toHaveBeenCalledOnce();
    expect(router.push).toHaveBeenCalledWith('/push');
    expect(router.replace).toHaveBeenCalledOnce();
    expect(router.replace).toHaveBeenCalledWith('/replace');
  });

  test('collapses overflowing items, exposes them in the dropdown and restores on growth', async () => {
    const onItemClick = vi.fn();
    const width = ref(1200);
    const wrapper = mount(
      () => (
        <HBreadcrumb
          style={{ width: `${width.value}px`, display: 'block' }}
          displayType="ellipsis"
          texts={[
            { text: 'Home' },
            { text: 'Very long intermediate destination', clickable: true },
            { text: 'Read-only intermediate destination' },
            { text: 'Another very long destination', clickable: true },
            { text: 'Current page' },
          ]}
          onItemClick={onItemClick}
        />
      ),
      { attachTo: document.body },
    );

    await vi.waitFor(() => expect(wrapper.find('.h-breadcrumb__ellipsis').exists()).toBe(false));
    width.value = 90;
    await nextTick();
    await vi.waitFor(() => expect(wrapper.find('.h-breadcrumb__ellipsis').exists()).toBe(true), {
      timeout: 2000,
    });
    const dropdown = wrapper.findComponent(HDropdown).getCurrentComponent().exposed as {
      handleOpen: () => void;
    };
    dropdown.handleOpen();
    await nextTick();
    const collapsed = wrapper.findAllComponents(HDropdownItem);
    expect(collapsed.length).toBeGreaterThan(0);
    const clickable = collapsed.find(item => item.text().includes('Very long'))!;
    await clickable.trigger('click');
    expect(onItemClick).toHaveBeenCalledOnce();
    const readOnly = collapsed.find(item => item.text().includes('Read-only'))!;
    await readOnly.trigger('click');
    expect(onItemClick).toHaveBeenCalledOnce();

    width.value = 1200;
    await nextTick();
    await sleep(700);
    expect(wrapper.find('.h-breadcrumb__ellipsis').exists()).toBe(false);
  });

  test('renders the default slot instead of texts and exposes display semantics', () => {
    const wrapper = mount(() => (
      <HBreadcrumb texts={[{ text: 'Ignored' }]} displayType="ellipsis" separator="|">
        <HBreadcrumbItem>Slotted</HBreadcrumbItem>
      </HBreadcrumb>
    ));

    expect(wrapper.text()).toContain('Slotted');
    expect(wrapper.text()).not.toContain('Ignored');
    expect(wrapper.get('[role="navigation"]').attributes('aria-label')).toBe('Breadcrumb');
    expect(wrapper.classes()).toContain('is-ellipsis');
    expect(wrapper.get('.h-breadcrumb-item__suffix').text()).toBe('|');
  });

  describe('props', () => {
    test('breadcrumb size', async () => {
      const size = ref<BreadcrumbProps['size']>('medium');
      const wrapper = mount(() => (
        <HBreadcrumb
          size={size.value}
          texts={[{ text: 'Home' }, { text: 'Sub Page1' }, { text: 'Sub Page2' }]}
        />
      ));

      expect(wrapper.classes('h-breadcrumb--medium')).eq(true);

      size.value = 'small';

      await nextTick();

      expect(wrapper.classes('h-breadcrumb--small')).eq(true);
    });

    test('breadcrumb-item size', async () => {
      const wrapper = mount(() => (
        <HBreadcrumb size="medium">
          <HBreadcrumbItem>Home</HBreadcrumbItem>
          <HBreadcrumbItem>Components</HBreadcrumbItem>
          <HBreadcrumbItem size="small">Breadcrumb</HBreadcrumbItem>
        </HBreadcrumb>
      ));

      expect(wrapper.classes('h-breadcrumb--medium')).eq(true);
      expect(wrapper.findAll('.h-breadcrumb-item__text')[2].classes('h-breadcrumb-item--small')).eq(
        true,
      );
    });
  });

  describe('SSR', () => {
    test('renders items during server-side rendering', async () => {
      const app = createSSRApp({
        render: () => (
          <HBreadcrumb
            texts={[
              { text: 'Home' },
              { text: 'Sub Page1' },
              { text: 'Sub Page2' },
            ]}
          />
        ),
      });

      const html = await renderToString(app);

      expect(html).toContain('h-breadcrumb');
      expect(html).toContain('h-breadcrumb-item');
      expect(html).toContain('Home');
      expect(html).toContain('Sub Page2');
    });
  });
});
