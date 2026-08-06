import { mount } from '@vue/test-utils';
import { nextTick, ref, TransitionGroup } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { HSortableList } from '..';
import { dictionaries } from '~/locales';
import { localeInjectKey } from '~/provides';
import VueLocaleService, { LocaleSupportLang } from '@aurora/locale-vue';
import { moveSortableListItem, reorderSortableListItem } from '../src/hooks/useSortableList';

const createItems = () => [
  { id: 'design', label: 'Design review' },
  { id: 'qa', label: 'Quality assurance' },
  { id: 'release', label: 'Release' },
];

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

  test('shows the tree-style drop indicator and emits the reordered model', async () => {
    const items = ref(createItems());
    const sort = vi.fn();
    const wrapper = mount(() => (
      <HSortableList v-model={items.value} itemKey="id" onSort={sort}>
        {{ item: ({ item }: { item: (typeof items.value)[number] }) => item.label }}
      </HSortableList>
    ));
    const [sourceHandle] = wrapper.findAll('.h-sortable-list__handle');
    const target = wrapper.findAll('.h-sortable-list__item')[2];
    vi.spyOn(target.element, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 140,
      height: 40,
      left: 0,
      right: 240,
      width: 240,
      x: 0,
      y: 100,
      toJSON: () => ({}),
    });

    await sourceHandle.trigger('dragstart');
    await target.trigger('dragover', { clientY: 135 });

    const indicator = target.find('.h-sortable-list__drop-indicator');
    expect(indicator.exists()).toBe(true);
    expect(indicator.classes()).toContain('is-after');

    await target.trigger('drop', { clientY: 135 });
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

  test('configures keyed FLIP movement animation', () => {
    const wrapper = mount(() => <HSortableList modelValue={createItems()} itemKey="id" />);

    expect(wrapper.findComponent(TransitionGroup).props('moveClass')).toBe(
      'h-sortable-list__item-move',
    );
  });

  test('all concrete locale dictionaries include accessibility messages', () => {
    Object.values(dictionaries).forEach(dictionary => {
      expect(dictionary.horizonWeb.sortableList.dragHandle).toBeTruthy();
      expect(dictionary.horizonWeb.sortableList.moved).toBeTruthy();
    });
  });
});
