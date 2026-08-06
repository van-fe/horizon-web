import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HSortableList } from '..';
import { dictionaries } from '~/locales';
import { localeInjectKey } from '~/provides';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import {
  H_SORTABLE_LIST_FLIP_OPTIONS,
  moveSortableListItem,
  reorderSortableListItem,
} from '../src/hooks/useSortableList';

const createItems = () => [
  { id: 'design', label: 'Design review' },
  { id: 'qa', label: 'Quality assurance' },
  { id: 'release', label: 'Release' },
];

const createRect = (top: number, height = 40): DOMRect =>
  ({
    top,
    bottom: top + height,
    height,
    left: 0,
    right: 240,
    width: 240,
    x: 0,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

describe('SortableList', () => {
  test('reorders without mutating the input array', () => {
    const items = createItems();
    const result = reorderSortableListItem(items, 'design', 'release', 'after', 'id');

    expect(items.map(item => item.id)).toEqual(['design', 'qa', 'release']);
    expect(result).toMatchObject({ oldIndex: 0, newIndex: 2, item: items[0] });
    expect(result?.list.map(item => item.id)).toEqual(['qa', 'release', 'design']);
    expect(reorderSortableListItem(items, 'qa', 'design', 'after', 'id')).toBeUndefined();
  });

  test('moves items by index and ignores invalid moves', () => {
    const items = createItems();

    expect(moveSortableListItem(items, 2, 0)?.list.map(item => item.id)).toEqual([
      'release',
      'design',
      'qa',
    ]);
    expect(moveSortableListItem(items, 0, 0)).toBeUndefined();
    expect(moveSortableListItem(items, -1, 1)).toBeUndefined();
  });

  test('follows the pointer, shows the tree-style indicator, and reorders on release', async () => {
    const items = ref(createItems());
    const sort = vi.fn();
    const wrapper = mount(() => (
      <HSortableList v-model={items.value} itemKey="id" onSort={sort}>
        {{ item: ({ item }: { item: (typeof items.value)[number] }) => item.label }}
      </HSortableList>
    ));
    const listItems = wrapper.findAll('.h-sortable-list__item');
    listItems.forEach((listItem, index) => {
      vi.spyOn(listItem.element, 'getBoundingClientRect').mockReturnValue(createRect(index * 50));
    });

    await wrapper.find('.h-sortable-list__handle').trigger('pointerdown', {
      button: 0,
      clientY: 20,
    });
    window.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, cancelable: true, clientY: 135 }),
    );
    await nextTick();

    expect(listItems[0].attributes('style')).toContain('translate3d(0, 115px, 0)');

    const indicator = listItems[2].find('.h-sortable-list__drop-indicator');
    expect(indicator.exists()).toBe(true);
    expect(indicator.classes()).toContain('is-after');

    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientY: 135 }));
    await nextTick();

    expect(items.value.map(item => item.id)).toEqual(['qa', 'release', 'design']);
    expect(sort).toHaveBeenCalledWith(
      expect.objectContaining({ oldIndex: 0, newIndex: 2, trigger: 'drag' }),
    );
  });

  test('supports keyboard sorting and keeps disabled items fixed', async () => {
    const items = ref([...createItems(), { id: 'locked', label: 'Locked', locked: true }]);
    const localeService = new VueLocaleService({
      current: LocaleSupportLang.En,
      lang: { dictionaries },
    });
    const wrapper = mount(
      () => (
        <HSortableList v-model={items.value} itemKey="id" itemDisabled="locked">
          {{ item: ({ item }: { item: (typeof items.value)[number] }) => item.label }}
        </HSortableList>
      ),
      {
        global: {
          provide: {
            [localeInjectKey as symbol]: ref(localeService),
          },
        },
      },
    );

    const handles = wrapper.findAll('.h-sortable-list__handle');
    await handles[0].trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(items.value.map(item => item.id)).toEqual(['qa', 'design', 'release', 'locked']);
    expect(wrapper.find('[role="status"]').text()).toContain('2');

    const lockedHandle = wrapper.findAll('.h-sortable-list__handle')[3];
    expect(lockedHandle.attributes('aria-disabled')).toBe('true');
    await lockedHandle.trigger('keydown', { key: 'ArrowUp' });
    expect(items.value.map(item => item.id)).toEqual(['qa', 'design', 'release', 'locked']);
  });

  test('uses the hg-performance FLIP animation timing', () => {
    expect(H_SORTABLE_LIST_FLIP_OPTIONS).toEqual({
      duration: 220,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    });
  });

  test('plays a manual FLIP animation after pointer sorting', async () => {
    const items = ref(createItems());
    const animate = vi.fn(() => ({}) as Animation);
    const originalAnimate = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'animate');
    Object.defineProperty(HTMLElement.prototype, 'animate', {
      configurable: true,
      value: animate,
    });
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        const element = this;
        if (!element.classList.contains('h-sortable-list__item')) return createRect(0);
        const siblings = [
          ...(element.parentElement?.querySelectorAll('.h-sortable-list__item') ?? []),
        ];
        return createRect(siblings.indexOf(element) * 50);
      });

    const wrapper = mount(() => <HSortableList v-model={items.value} itemKey="id" />);
    await wrapper.find('.h-sortable-list__handle').trigger('pointerdown', {
      button: 0,
      clientY: 20,
    });
    window.dispatchEvent(
      new PointerEvent('pointermove', { bubbles: true, cancelable: true, clientY: 135 }),
    );
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientY: 135 }));
    await nextTick();
    await nextTick();

    expect(animate).toHaveBeenCalledWith(
      [{ transform: 'translateY(-100px)' }, { transform: 'translateY(0)' }],
      H_SORTABLE_LIST_FLIP_OPTIONS,
    );

    rectSpy.mockRestore();
    if (originalAnimate) {
      Object.defineProperty(HTMLElement.prototype, 'animate', originalAnimate);
    } else {
      delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
    }
  });

  test('all concrete locale dictionaries include accessibility messages', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.sortableList.dragHandle).toBeTruthy();
      expect(dictionary.horizonWeb.sortableList.moved).toBeTruthy();
    });
  });
});
