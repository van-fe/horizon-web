import type { DefinedComponent, HorizonWebComponentInstance } from '@aurora/utils';
import { cls, ComponentClassBlock, isNil } from '@aurora/utils';
import { computed, inject, type Ref, ref } from 'vue';
import type { HTableColumnData, HTableTransformedRowDataType } from '../utils/types';
import { HTableColumnFilterKey, HTableSortOrderEnum } from '../utils/types';
import {
  IconArrowDown,
  IconArrowUp,
  IconCalendar,
  IconFilter,
  IconHelp,
  IconSearch,
  IconTime,
} from '@aurora/icon';
import { HTableCurrentSortsInjectKey, HTableSetSortInjectKey } from '../utils/injectKeys';
import HButton from '../../../Button/src/Button';
import HPicker from '../../../Picker/src/Picker';
import HInput from '../../../Input/src/Input';
import HInputNumber from '../../../InputNumber/src/InputNumber';
import type { PickerExposes } from '../../../Picker/src/composables/useExposes';
import useLocaleLang from '~/utils/useLocaleLang';
import HCascader from '../../../Cascader/src/Cascader';
import HDatePicker from '../../../DatePicker/src/DatePicker';
import HSelect from '../../../Select/src/Select';
import HTimePicker from '../../../TimePicker/src/TimePicker';
import HTreeSelect from '../../../TreeSelect/src/TreeSelect';
import HTooltip from '../../../Tooltip/src/Tooltip';
import type { TableColumnProps } from '../composables/useProps';
import { warn } from '~/utils/useLog';

export function useSortPlugin(column: HTableColumnData) {
  if (!column.props.field) {
    return [];
  }

  const classHelper = new ComponentClassBlock('table');

  const currentSorts = inject(HTableCurrentSortsInjectKey, undefined);
  const setSort = inject(HTableSetSortInjectKey, undefined);

  const currentSortState = computed(() => currentSorts?.value.get(column));
  const canSort = computed(() => !column.props.sortDisabled);
  const sortLabel = computed(() => String(column.props.title ?? column.props.field));

  function handleKeyboardSort(evt: KeyboardEvent, order?: HTableSortOrderEnum) {
    if (!['Enter', ' ', 'Spacebar'].includes(evt.key) || !canSort.value) return;
    evt.preventDefault();
    evt.stopPropagation();
    setSort?.(column, order, evt.ctrlKey || evt.metaKey);
  }

  return (
    <span
      class={cls(
        classHelper.em('header', 'sort'),
        classHelper.em('header', 'action-button-wrap'),
        classHelper.is('separated', column.props.sortSeparate),
        classHelper.is('disabled', column.props.sortDisabled),
      )}
      role={!column.props.sortSeparate && canSort.value ? 'button' : undefined}
      tabindex={!column.props.sortSeparate && canSort.value ? 0 : -1}
      aria-label={!column.props.sortSeparate ? sortLabel.value : undefined}
      aria-pressed={!column.props.sortSeparate ? !!currentSortState.value : undefined}
      onClick={(evt: MouseEvent) => {
        !column.props.sortSeparate &&
          !column.props.sortDisabled &&
          setSort?.(column, undefined, evt.ctrlKey || evt.metaKey);
      }}
      onKeydown={(evt: KeyboardEvent) => {
        if (!column.props.sortSeparate) handleKeyboardSort(evt);
      }}
    >
      <div
        class={cls(
          classHelper.em('header', 'sort-icon'),
          classHelper.is('asc'),
          classHelper.is('active', currentSortState.value === HTableSortOrderEnum.ASC),
        )}
        role={column.props.sortSeparate && canSort.value ? 'button' : undefined}
        tabindex={column.props.sortSeparate && canSort.value ? 0 : -1}
        aria-label={column.props.sortSeparate ? `${sortLabel.value} ↑` : undefined}
        aria-pressed={
          column.props.sortSeparate ? currentSortState.value === HTableSortOrderEnum.ASC : undefined
        }
        onClick={(evt: MouseEvent) => {
          column.props.sortSeparate &&
            !column.props.sortDisabled &&
            setSort?.(column, HTableSortOrderEnum.ASC, evt.ctrlKey || evt.metaKey);
        }}
        onKeydown={(evt: KeyboardEvent) => handleKeyboardSort(evt, HTableSortOrderEnum.ASC)}
      >
        <IconArrowUp size={10} />
      </div>
      <div
        class={cls(
          classHelper.em('header', 'sort-icon'),
          classHelper.is('desc'),
          classHelper.is('active', currentSortState.value === HTableSortOrderEnum.DESC),
        )}
        role={column.props.sortSeparate && canSort.value ? 'button' : undefined}
        tabindex={column.props.sortSeparate && canSort.value ? 0 : -1}
        aria-label={column.props.sortSeparate ? `${sortLabel.value} ↓` : undefined}
        aria-pressed={
          column.props.sortSeparate
            ? currentSortState.value === HTableSortOrderEnum.DESC
            : undefined
        }
        onClick={(evt: MouseEvent) => {
          column.props.sortSeparate &&
            !column.props.sortDisabled &&
            setSort?.(column, HTableSortOrderEnum.DESC, evt.ctrlKey || evt.metaKey);
        }}
        onKeydown={(evt: KeyboardEvent) => handleKeyboardSort(evt, HTableSortOrderEnum.DESC)}
      >
        <IconArrowDown size={10} />
      </div>
    </span>
  );
}

export function useFilterPlugin(
  column: HTableColumnData,
  flattenData: Ref<HTableTransformedRowDataType[]>,
) {
  const classHelper = new ComponentClassBlock('table');
  let RenderComponent: DefinedComponent = HSelect;
  let triggerIcon: DefinedComponent = IconFilter;
  let specialOptions: TableColumnProps['filterOptions'] = {};

  switch (column.props.filterType) {
    case 'select':
      if (!column.props.field) {
        warn('table', 'You should set field first.');
        return;
      }

      RenderComponent = HSelect;
      triggerIcon = IconFilter;
      specialOptions = {
        filterable: true,
        useBuildInPanelFilter: true,
        useCheckAll: true,
        useCheckAllCount: true,
        multiple: true,
        options: [...new Set(flattenData.value.map(row => row[column.props.field!]))].map(
          value => ({
            label: value,
            value,
          }),
        ),
      };
      break;
    case 'cascader':
      RenderComponent = HCascader;
      triggerIcon = IconFilter;
      break;
    case 'tree-select':
      RenderComponent = HTreeSelect;
      triggerIcon = IconFilter;
      break;
    case 'time-picker':
      RenderComponent = HTimePicker;
      triggerIcon = IconTime;
      break;
    case 'date-picker':
      RenderComponent = HDatePicker;
      triggerIcon = IconCalendar;
      break;
  }

  function checkValueEmpty(value = column[HTableColumnFilterKey].currentFilterValue.value) {
    if (Array.isArray(value)) {
      return value.length === 0 || value.every(checkValueEmpty);
    } else {
      return isNil(value);
    }
  }

  const isValueIsEmpty = computed(checkValueEmpty);

  return (
    <RenderComponent
      v-model={column[HTableColumnFilterKey].currentFilterValue.value}
      class={cls(
        classHelper.em('header', 'filter'),
        classHelper.em('header', 'action-button-wrap'),
      )}
      fit-input-width={false}
      need-confirm={true}
      cancelButtonText={useLocaleLang('table.resetFilter').value as string}
      placement={column.props.filterPopoverPlacement}
      panelStyle={column.props.filterPopoverStyle}
      panelClass={column.props.filterPopoverClassName}
      {...specialOptions}
      {...(column.props.filterOptions ?? {})}
      onCancel={() => (column[HTableColumnFilterKey].currentFilterValue.value = undefined)}
    >
      {{
        pickerOuter: (modelValue?: string) => (
          <HTooltip disabled={isValueIsEmpty.value} content={modelValue}>
            <HButton
              class={cls(classHelper.em('header', 'filter-icon'))}
              size="small"
              text={true}
              active={!isValueIsEmpty.value}
              type={!isValueIsEmpty.value ? 'primary' : 'normal'}
              icon={triggerIcon}
              iconSize={16}
              disabled={column.props.filterDisabled}
            />
          </HTooltip>
        ),
      }}
    </RenderComponent>
  );
}

export function useSearchPlugin(column: HTableColumnData) {
  const classHelper = new ComponentClassBlock('table');

  const pickerDomRef = ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes>>();
  const value = ref(column[HTableColumnFilterKey].currentFilterValue.value);

  let RenderComponent: DefinedComponent = HInput;

  switch (column.props.filterType) {
    case 'input':
      RenderComponent = HInput;
      break;
    case 'input-number':
      RenderComponent = HInputNumber;
      break;
  }

  return (
    <HPicker
      ref={pickerDomRef}
      class={cls(
        classHelper.em('header', 'search'),
        classHelper.em('header', 'action-button-wrap'),
      )}
      placement={column.props.filterPopoverPlacement}
      panelStyle={column.props.filterPopoverStyle}
      panelClass={column.props.filterPopoverClassName}
      fit-input-width={false}
      need-confirm={true}
      panel-width={304}
      cancelButtonText={useLocaleLang('table.resetFilter').value as string}
      onCancel={() => {
        column[HTableColumnFilterKey].currentFilterValue.value = undefined;
        pickerDomRef.value?.hidePopover();
      }}
      onConfirm={() => {
        column[HTableColumnFilterKey].currentFilterValue.value = value.value;
        pickerDomRef.value?.hidePopover();
      }}
    >
      {{
        default: () => (
          <div class={classHelper.em('header', 'search-panel-wrapper')}>
            <RenderComponent
              v-model={value.value}
              clearable
              {...(column.props.filterOptions ?? {})}
            />
          </div>
        ),
        pickerOuter: () => (
          <HTooltip
            disabled={isNil(column[HTableColumnFilterKey].currentFilterValue.value)}
            content={column[HTableColumnFilterKey].currentFilterValue.value as string | undefined}
          >
            <HButton
              class={cls(classHelper.em('header', 'search-icon'))}
              size="small"
              text={true}
              active={!!column[HTableColumnFilterKey].currentFilterValue.value}
              type={column[HTableColumnFilterKey].currentFilterValue.value ? 'primary' : 'normal'}
              icon={IconSearch}
              iconSize={16}
              disabled={column.props.filterDisabled}
            />
          </HTooltip>
        ),
      }}
    </HPicker>
  );
}

export function useTipPlugin(column: HTableColumnData) {
  const classHelper = new ComponentClassBlock('table');

  return (
    <HTooltip enterable={true}>
      {{
        default: () => (
          <div
            class={cls(
              classHelper.em('header', 'tip'),
              classHelper.em('header', 'action-button-wrap'),
            )}
          >
            <HButton
              class={cls(classHelper.em('header', 'tip-icon'))}
              size="small"
              text={true}
              type="normal"
              icon={IconHelp}
              iconSize={16}
            />
          </div>
        ),
        content: () => column.props.tip,
      }}
    </HTooltip>
  );
}
