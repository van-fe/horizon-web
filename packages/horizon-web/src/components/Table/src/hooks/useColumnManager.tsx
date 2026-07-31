import type { Ref, SetupContext } from 'vue';
import { nextTick, onMounted, ref } from 'vue';
import type { HTableFixedValue, HTableInsertedColumnData } from '../utils/types';
import type { TableColumnProps } from '../composables/useProps';
import type { HTreeData, HTreeNodeDataWithLevel } from '~/components/Tree/src/utils/types';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import { ComponentClassBlock, cls, upperFirst } from '@aurora/utils';
import HButton from '~/components/Button/src/Button';
import HTreeSelect from '~/components/TreeSelect/src/TreeSelect';
import { IconLock, IconPin, IconPinned, IconSetting } from '@aurora/icon';
import HDropdown from '~/components/Dropdown/src/Dropdown';
import HDropdownItem from '~/components/Dropdown/src/DropdownItem';
import HDropdownMenu from '~/components/Dropdown/src/DropdownMenu';
import useLocaleLang from '~/utils/useLocaleLang';
import type { DropdownSlots } from '~/components/Dropdown/src/composables/useSlots';
import type { TreeSelectExposes } from '~/components/TreeSelect/src/composables/useExposes';
import type { TreeSelectSlots } from '~/components/TreeSelect/src/composables/useSlots';

export default function useColumnManager(options: {
  columns: Ref<HTableInsertedColumnData[]>;
  fixedStore: Ref<Map<string, HTableFixedValue>>;
  getFixedState: (
    columnUuid: string,
    checkStore?: Map<string, HTableFixedValue>,
  ) => HTableFixedValue;
  visibleStore: Ref<Map<string, boolean>>;
  getVisibleState: (columnUuid: string, checkStore?: Map<string, boolean>) => boolean;
}) {
  const classHelper = new ComponentClassBlock('table');
  const pickerClassHelper = new ComponentClassBlock('picker');

  const treeSelectDomRef =
    ref<HorizonWebComponentInstance<typeof HTreeSelect, TreeSelectExposes>>();

  const visibleColumnsTemp = ref<string[]>([]);
  const fixedStoreTemp = ref(new Map<string, HTableFixedValue>());
  const treeDataTemp = ref<HTreeData[]>([]);

  let initialTreeData: HTreeData[] = [];
  let initialFixedStore = new Map<string, HTableFixedValue>();
  let initialVisibleStore = new Map<string, boolean>();
  let initialColumnUuids = new Set<string>();

  function sortColumnsMethod(a: HTreeData, b: HTreeData) {
    const getRank = (state: HTableFixedValue) =>
      state === 'left' ? 0 : state === 'right' || state === 'hover' ? 2 : 1;

    return (
      getRank(options.getFixedState(a.value as string)) -
      getRank(options.getFixedState(b.value as string))
    );
  }

  function gatherTreeData(tree: HTableInsertedColumnData[]) {
    const res: HTreeData[] = [];

    tree.forEach(item => {
      let children: HTreeData[] = [];

      if (item.children && item.children.length) {
        children = gatherTreeData(item.children);
      }

      res.push({
        value: item.uuid,
        label: item.props.title?.toString() || upperFirst(item.props.field || '') || '',
        children,
        draggable: !item.props.lockPosition,
        selectable: !item.props.lockVisible,
        props: item.props,
      });
    });

    return res.toSorted(sortColumnsMethod);
  }

  function cloneTreeData(tree: HTreeData[]): HTreeData[] {
    return tree.map(item => ({
      ...item,
      children: Array.isArray(item.children) ? cloneTreeData(item.children as HTreeData[]) : [],
    }));
  }

  function collectTreeUuids(tree: HTreeData[], target = new Set<string>()) {
    tree.forEach(item => {
      target.add(item.value as string);

      if (Array.isArray(item.children)) {
        collectTreeUuids(item.children as HTreeData[], target);
      }
    });

    return target;
  }

  function isSameUuidSet(a: Set<string>, b: Set<string>) {
    return a.size === b.size && [...a].every(uuid => b.has(uuid));
  }

  function captureInitialState(treeData = gatherTreeData(options.columns.value)) {
    if (treeData.length === 0) {
      return;
    }

    initialTreeData = cloneTreeData(treeData);
    initialFixedStore = new Map(options.fixedStore.value);
    initialVisibleStore = new Map(options.visibleStore.value);
    initialColumnUuids = collectTreeUuids(treeData);
  }

  function ensureInitialState(currentTreeData: HTreeData[]) {
    const currentColumnUuids = collectTreeUuids(currentTreeData);

    if (initialTreeData.length === 0 || !isSameUuidSet(initialColumnUuids, currentColumnUuids)) {
      captureInitialState(currentTreeData);
    }
  }

  function getVisibleColumns(store: Map<string, boolean>) {
    return [...store].filter(([, visible]) => visible).map(([uuid]) => uuid);
  }

  function handleVisibleChange(visible: boolean) {
    if (visible) {
      const currentTreeData = gatherTreeData(options.columns.value);
      ensureInitialState(currentTreeData);

      fixedStoreTemp.value = new Map(options.fixedStore.value);
      visibleColumnsTemp.value = getVisibleColumns(options.visibleStore.value);
      treeDataTemp.value = cloneTreeData(currentTreeData);

      void nextTick(() => {
        treeSelectDomRef.value?.setAllCollapseStatus(true);
      });
    }
  }

  function cancelPinned(evt: MouseEvent, columnUuid: string) {
    evt.stopPropagation();

    fixedStoreTemp.value.set(columnUuid, undefined);
  }

  function setPin(evt: Event, columnUuid: string, fixed: HTableFixedValue) {
    evt.stopPropagation();
    fixedStoreTemp.value.set(columnUuid, fixed);
  }

  function onReset() {
    ensureInitialState(gatherTreeData(options.columns.value));

    fixedStoreTemp.value = new Map(initialFixedStore);
    visibleColumnsTemp.value = getVisibleColumns(initialVisibleStore);
    treeDataTemp.value = cloneTreeData(initialTreeData);

    void nextTick(() => {
      treeSelectDomRef.value?.setAllCollapseStatus(true);
    });
  }

  function reorderColumns(target: HTableInsertedColumnData[], orderedData: HTreeData[]) {
    const reorder = (target: HTableInsertedColumnData[], orderedData: HTreeData[]) => {
      const columnsByUuid = new Map(target.map(column => [column.uuid, column]));
      const nextColumns = orderedData
        .map(item => columnsByUuid.get(item.value as string))
        .filter((column): column is HTableInsertedColumnData => !!column);

      if (nextColumns.length !== target.length) {
        return;
      }

      target.splice(0, target.length, ...nextColumns);

      orderedData.forEach(item => {
        const column = columnsByUuid.get(item.value as string);

        if (column && Array.isArray(item.children)) {
          reorder(column.children, item.children as HTreeData[]);
        }
      });
    };

    reorder(target, orderedData);
  }

  function onConfirm() {
    void nextTick(() => {
      reorderColumns(options.columns.value, treeDataTemp.value);
      options.fixedStore.value = new Map(fixedStoreTemp.value);

      const visibleColumns = new Set(visibleColumnsTemp.value);
      const nextVisibleStore = new Map(options.visibleStore.value);
      nextVisibleStore.forEach((_, columnUuid) => {
        nextVisibleStore.set(columnUuid, visibleColumns.has(columnUuid));
      });
      options.visibleStore.value = nextVisibleStore;
    });
  }

  function handleUpdateTreeData(data: HTreeData[]) {
    treeDataTemp.value = cloneTreeData(data);
  }

  onMounted(() => {
    void nextTick(() => {
      captureInitialState();
    });
  });

  return () => (
    <HTreeSelect
      ref={treeSelectDomRef}
      v-model={visibleColumnsTemp.value}
      class={cls(classHelper.e('column-manager'))}
      popperClassName={classHelper.em('column-manager', 'popper')}
      treeData={treeDataTemp.value}
      checkStrictly={true}
      multiple
      draggable
      draggableIconAlwaysVisible={true}
      undraggableIcon={IconLock}
      fitInputWidth="fit-content"
      panelFilterable={true}
      useBuildInPanelFilter={true}
      filterToHideChildren={false}
      needConfirm
      isDefaultExpandAll={true}
      onConfirm={onConfirm}
      onVisibleChange={handleVisibleChange}
      onUpdate:treeData={handleUpdateTreeData}
    >
      {{
        default: ({
          visible,
        }: NonNullable<
          Parameters<NonNullable<SetupContext<{}, TreeSelectSlots>['slots']['default']>>[0]
        >) => (
          <HButton
            icon={IconSetting}
            iconSize={16}
            size="small"
            type="normal"
            text
            class={classHelper.is('hover', visible.value)}
          />
        ),
        confirmRender: ({ confirmHandle }: { confirmHandle: () => void }) => (
          <div class={pickerClassHelper.em('pop-content', 'confirm-wrapper')}>
            <i />
            <div class={pickerClassHelper.em('pop-content', 'confirm-wrapper-buttons')}>
              <HButton size="small" plain type="normal" onClick={onReset}>
                {useLocaleLang('table.resetFilter').value}
              </HButton>
              <HButton size="small" onClick={confirmHandle}>
                {useLocaleLang('table.confirmFilter').value}
              </HButton>
            </div>
          </div>
        ),
        treeNodeRender: (value: { data: HTreeNodeDataWithLevel }) => (
          <div class={cls(classHelper.em('column-manager', 'item'))}>
            <div
              class={cls(
                classHelper.em('column-manager', 'item-content'),
                classHelper.is('disabled', !value.data.selectable),
              )}
            >
              {value.data.label}
            </div>
            <div class={classHelper.em('column-manager', 'item-action')}>
              {value.data.level === 0 &&
                (options.getFixedState(value.data.value as string, fixedStoreTemp.value) ? (
                  <HButton
                    v-tooltip={
                      (value.data.props as TableColumnProps).lockFixed
                        ? useLocaleLang('table.lockPin').value
                        : useLocaleLang('table.unPin').value
                    }
                    size="small"
                    type="normal"
                    text
                    icon={IconPinned}
                    iconSize={16}
                    disabled={(value.data.props as TableColumnProps).lockFixed}
                    class={cls(
                      classHelper.em('column-manager', 'item-action-button'),
                      classHelper.is('always-visible'),
                    )}
                    onClick={evt => cancelPinned(evt, value.data.value as string)}
                  />
                ) : (
                  <HDropdown toBody={false}>
                    {{
                      default: ({
                        popperVisible,
                      }: Parameters<SetupContext<{}, DropdownSlots>['slots']['default']>[0]) => (
                        <HButton
                          size="small"
                          type="normal"
                          text
                          icon={IconPin}
                          iconSize={16}
                          class={cls(
                            classHelper.em('column-manager', 'item-action-button'),
                            classHelper.is('hover', popperVisible),
                          )}
                          onClick={evt => evt.stopPropagation()}
                        />
                      ),
                      dropdown: () => (
                        <HDropdownMenu>
                          <HDropdownItem
                            onClick={evt => setPin(evt, value.data.value as string, 'left')}
                          >
                            {useLocaleLang('table.pinToLeft').value}
                          </HDropdownItem>
                          <HDropdownItem
                            onClick={evt => setPin(evt, value.data.value as string, 'right')}
                          >
                            {useLocaleLang('table.pinToRight').value}
                          </HDropdownItem>
                        </HDropdownMenu>
                      ),
                    }}
                  </HDropdown>
                ))}
            </div>
          </div>
        ),
      }}
    </HTreeSelect>
  );
}
