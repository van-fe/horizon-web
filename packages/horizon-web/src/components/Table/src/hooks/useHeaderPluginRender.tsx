import type { DefinedComponent, LegoComponentInstance } from '@aurora/shared';
import { cls, ComponentClassBlock, isNil } from '@aurora/shared';
import { computed, inject, type Ref, ref } from 'vue';
import type { NTableColumnData, NTableTransformedRowDataType } from '../utils/types';
import { NTableColumnFilterKey, NTableSortOrderEnum } from '../utils/types';
import {
  IconArrowDown,
  IconArrowUp,
  IconCalendar,
  IconFilter,
  IconHelp,
  IconSearch,
  IconTime,
} from '@aurora/icon';
import { NTableCurrentSortsInjectKey, NTableSetSortInjectKey } from '../utils/injectKeys';
import NButton from '../../../Button/src/Button';
import NPicker from '../../../Picker/src/Picker';
import NInput from '../../../Input/src/Input';
import NInputNumber from '../../../InputNumber/src/InputNumber';
import type { PickerExposes } from '../../../Picker/src/composables/useExposes';
import useLocaleLang from '~/utils/useLocaleLang';
import NCascader from '../../../Cascader/src/Cascader';
import NDatePicker from '../../../DatePicker/src/DatePicker';
import NSelect from '../../../Select/src/Select';
import NTimePicker from '../../../TimePicker/src/TimePicker';
import NTreeSelect from '../../../TreeSelect/src/TreeSelect';
import NTooltip from '../../../Tooltip/src/Tooltip';
import type { TableColumnProps } from '../composables/useProps';
import { warn } from '~/utils/useLog';

export function useSortPlugin(column: NTableColumnData) {
  if (!column.props.field) {
    return [];
  }

  const classHelper = new ComponentClassBlock('table-v3');

  const currentSorts = inject(NTableCurrentSortsInjectKey, undefined);
  const setSort = inject(NTableSetSortInjectKey, undefined);

  const currentSortState = computed(() => currentSorts?.value.get(column));

  return (
    <span
      class={cls(
        classHelper.em('header', 'sort'),
        classHelper.em('header', 'action-button-wrap'),
        classHelper.is('separated', column.props.sortSeparate),
        classHelper.is('disabled', column.props.sortDisabled),
      )}
      onClick={(evt: MouseEvent) => {
        !column.props.sortSeparate &&
          !column.props.sortDisabled &&
          setSort?.(column, undefined, evt.ctrlKey || evt.metaKey);
      }}
    >
      <div
        class={cls(
          classHelper.em('header', 'sort-icon'),
          classHelper.is('asc'),
          classHelper.is('active', currentSortState.value === NTableSortOrderEnum.ASC),
        )}
        onClick={(evt: MouseEvent) => {
          column.props.sortSeparate &&
            !column.props.sortDisabled &&
            setSort?.(column, NTableSortOrderEnum.ASC, evt.ctrlKey || evt.metaKey);
        }}
      >
        <IconArrowUp size={10} />
      </div>
      <div
        class={cls(
          classHelper.em('header', 'sort-icon'),
          classHelper.is('desc'),
          classHelper.is('active', currentSortState.value === NTableSortOrderEnum.DESC),
        )}
        onClick={(evt: MouseEvent) => {
          column.props.sortSeparate &&
            !column.props.sortDisabled &&
            setSort?.(column, NTableSortOrderEnum.DESC, evt.ctrlKey || evt.metaKey);
        }}
      >
        <IconArrowDown size={10} />
      </div>
    </span>
  );
}

export function useFilterPlugin(
  column: NTableColumnData,
  flattenData: Ref<NTableTransformedRowDataType[]>,
) {
  const classHelper = new ComponentClassBlock('table-v3');
  let RenderComponent: DefinedComponent = NSelect;
  let triggerIcon: DefinedComponent = IconFilter;
  let specialOptions: TableColumnProps['filterOptions'] = {};

  switch (column.props.filterType) {
    case 'select':
      if (!column.props.field) {
        warn('table', 'You should set field first.');
        return;
      }

      RenderComponent = NSelect;
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
      RenderComponent = NCascader;
      triggerIcon = IconFilter;
      break;
    case 'tree-select':
      RenderComponent = NTreeSelect;
      triggerIcon = IconFilter;
      break;
    case 'time-picker':
      RenderComponent = NTimePicker;
      triggerIcon = IconTime;
      break;
    case 'date-picker':
      RenderComponent = NDatePicker;
      triggerIcon = IconCalendar;
      break;
  }

  function checkValueEmpty(value = column[NTableColumnFilterKey].currentFilterValue.value) {
    if (Array.isArray(value)) {
      return value.length === 0 || value.every(checkValueEmpty);
    } else {
      return isNil(value);
    }
  }

  const isValueIsEmpty = computed(checkValueEmpty);

  return (
    <RenderComponent
      v-model={column[NTableColumnFilterKey].currentFilterValue.value}
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
      onCancel={() => (column[NTableColumnFilterKey].currentFilterValue.value = undefined)}
    >
      {{
        pickerOuter: (modelValue?: string) => (
          <NTooltip disabled={isValueIsEmpty.value} content={modelValue}>
            <NButton
              class={cls(classHelper.em('header', 'filter-icon'))}
              size="small"
              text={true}
              active={!isValueIsEmpty.value}
              type={!isValueIsEmpty.value ? 'primary' : 'normal'}
              icon={triggerIcon}
              iconSize={16}
              disabled={column.props.filterDisabled}
            />
          </NTooltip>
        ),
      }}
    </RenderComponent>
  );
}

export function useSearchPlugin(column: NTableColumnData) {
  const classHelper = new ComponentClassBlock('table-v3');

  const pickerDomRef = ref<LegoComponentInstance<typeof NPicker, PickerExposes>>();
  const value = ref(column[NTableColumnFilterKey].currentFilterValue.value);

  let RenderComponent: DefinedComponent = NInput;

  switch (column.props.filterType) {
    case 'input':
      RenderComponent = NInput;
      break;
    case 'input-number':
      RenderComponent = NInputNumber;
      break;
  }

  return (
    <NPicker
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
        column[NTableColumnFilterKey].currentFilterValue.value = undefined;
        pickerDomRef.value?.hidePopover();
      }}
      onConfirm={() => {
        column[NTableColumnFilterKey].currentFilterValue.value = value.value;
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
          <NTooltip
            disabled={isNil(column[NTableColumnFilterKey].currentFilterValue.value)}
            content={column[NTableColumnFilterKey].currentFilterValue.value as string | undefined}
          >
            <NButton
              class={cls(classHelper.em('header', 'search-icon'))}
              size="small"
              text={true}
              active={!!column[NTableColumnFilterKey].currentFilterValue.value}
              type={column[NTableColumnFilterKey].currentFilterValue.value ? 'primary' : 'normal'}
              icon={IconSearch}
              iconSize={16}
              disabled={column.props.filterDisabled}
            />
          </NTooltip>
        ),
      }}
    </NPicker>
  );
}

export function useTipPlugin(column: NTableColumnData) {
  const classHelper = new ComponentClassBlock('table-v3');

  return (
    <NTooltip enterable={true}>
      {{
        default: () => (
          <div
            class={cls(
              classHelper.em('header', 'tip'),
              classHelper.em('header', 'action-button-wrap'),
            )}
          >
            <NButton
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
    </NTooltip>
  );
}
