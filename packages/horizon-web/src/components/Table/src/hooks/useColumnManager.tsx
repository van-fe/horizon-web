import type { Ref, SetupContext } from 'vue';
import { nextTick, ref, computed } from 'vue';
import type { NTableFixedValue, NTableInsertedColumnData } from '../utils/types';
import type { TableColumnProps } from '../composables/useProps';
import type { NTreeData, NTreeNodeDataWithLevel } from '~/components/Tree/src/utils/types';
import type { LegoComponentInstance } from '@aurora/shared';
import { ComponentClassBlock, cls, upperFirst } from '@aurora/shared';
import NButton from '~/components/Button/src/Button';
import NTreeSelect from '~/components/TreeSelect/src/TreeSelect';
import { IconLock, IconPin, IconPinned, IconSetting } from '@aurora/icon';
import NDropdown from '~/components/Dropdown/src/Dropdown';
import NDropdownItem from '~/components/Dropdown/src/DropdownItem';
import NDropdownMenu from '~/components/Dropdown/src/DropdownMenu';
import useLocaleLang from '~/utils/useLocaleLang';
import type { DropdownSlots } from '~/components/Dropdown/src/composables/useSlots';
import type { TreeSelectExposes } from '~/components/TreeSelect/src/composables/useExposes';
import type { TreeSelectSlots } from '~/components/TreeSelect/src/composables/useSlots';

export default function useColumnManager(options: {
  columns: Ref<NTableInsertedColumnData[]>;
  fixedStore: Ref<Map<string, NTableFixedValue>>;
  getFixedState: (
    columnUuid: string,
    checkStore?: Map<string, NTableFixedValue>,
  ) => NTableFixedValue;
  resetFixedState: () => void;
  visibleStore: Ref<Map<string, boolean>>;
  getVisibleState: (columnUuid: string, checkStore?: Map<string, boolean>) => boolean;
  resetVisibleState: () => void;
}) {
  const classHelper = new ComponentClassBlock('table-v3');

  const treeSelectDomRef = ref<LegoComponentInstance<typeof NTreeSelect, TreeSelectExposes>>();

  const visibleColumnsTemp = ref<string[]>([]);
  const fixedStoreTemp = ref(new Map<string, NTableFixedValue>());

  const treeData = computed(() => gatherTreeData(options.columns.value));

  function sortColumnsMethod(a: NTreeData, b: NTreeData) {
    switch (options.getFixedState(a.value as string)) {
      case 'left':
        switch (options.getFixedState(b.value as string)) {
          case 'left':
            return 1;
          case 'hover':
          case 'right':
          default:
            return -1;
        }
      case 'right':
      case 'hover':
        return 1;
      default:
        switch (options.getFixedState(b.value as string)) {
          case 'left':
            return 1;
          default:
            return 0;
          case 'hover':
          case 'right':
            return -1;
        }
    }
  }

  function gatherTreeData(tree: NTableInsertedColumnData[]) {
    const res: NTreeData[] = [];

    tree.forEach(item => {
      let children: NTreeData[] = [];

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

  function handleVisibleChange(visible: boolean) {
    if (visible) {
      fixedStoreTemp.value = new Map(options.fixedStore.value);

      visibleColumnsTemp.value = [];
      options.visibleStore.value.forEach((visible, uuid) => {
        if (visible) {
          visibleColumnsTemp.value.push(uuid);
        }
      });

      treeSelectDomRef.value?.setAllCollapseStatus(true);
    }
  }

  function cancelPinned(evt: MouseEvent, columnUuid: string) {
    evt.stopPropagation();

    fixedStoreTemp.value.set(columnUuid, undefined);
  }

  function setPin(evt: Event, columnUuid: string, fixed: NTableFixedValue) {
    evt.stopPropagation();
    fixedStoreTemp.value.set(columnUuid, fixed);
  }

  function onReset() {
    options.resetFixedState();
    options.resetVisibleState();
  }

  function onConfirm() {
    void nextTick(() => {
      options.fixedStore.value = new Map(fixedStoreTemp.value);

      new Set(options.visibleStore.value.keys())
        .difference(new Set(visibleColumnsTemp.value))
        .forEach(hiddenColumn => {
          options.visibleStore.value.set(hiddenColumn, false);
        });

      visibleColumnsTemp.value.forEach(uuid => {
        options.visibleStore.value.set(uuid, true);
      });
    });
  }

  function handleUpdateTreeData() {}

  return () => (
    <NTreeSelect
      ref={treeSelectDomRef}
      v-model={visibleColumnsTemp.value}
      class={cls(classHelper.e('column-manager'))}
      popperClassName={classHelper.em('column-manager', 'popper')}
      treeData={treeData.value}
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
      cancelButtonText={useLocaleLang('table.resetFilter').value as string}
      onConfirm={onConfirm}
      onCancel={onReset}
      onVisibleChange={handleVisibleChange}
      onUpdate:treeData={handleUpdateTreeData}
    >
      {{
        default: ({ visible }: NonNullable<Parameters<NonNullable<SetupContext<{}, TreeSelectSlots>['slots']['default']>>[0]>) => (
          <NButton
            icon={IconSetting}
            iconSize={16}
            size="small"
            type="normal"
            text
            class={classHelper.is('hover', visible.value)}
          />
        ),
        treeNodeRender: (value: { data: NTreeNodeDataWithLevel }) => (
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
                  <NButton
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
                  <NDropdown toBody={false}>
                    {{
                      default: ({ popperVisible }: Parameters<SetupContext<{}, DropdownSlots>['slots']['default']>[0]) => (
                        <NButton
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
                        <NDropdownMenu>
                          <NDropdownItem
                            onClick={evt => setPin(evt, value.data.value as string, 'left')}
                          >
                            {useLocaleLang('table.pinToLeft').value}
                          </NDropdownItem>
                          <NDropdownItem
                            onClick={evt => setPin(evt, value.data.value as string, 'right')}
                          >
                            {useLocaleLang('table.pinToRight').value}
                          </NDropdownItem>
                        </NDropdownMenu>
                      ),
                    }}
                  </NDropdown>
                ))}
            </div>
          </div>
        ),
      }}
    </NTreeSelect>
  );
}
