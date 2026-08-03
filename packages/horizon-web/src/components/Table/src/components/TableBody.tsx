import type { PropType, VNodeArrayChildren } from 'vue';
import { computed, onMounted, defineComponent, Fragment, inject, nextTick, ref, watch } from 'vue';
import {
  cls,
  ComponentClassBlock,
  cssVariable,
  isDefined,
  isFunction,
  isObject,
  safelyGetEventTarget,
  type DefinedComponent,
  type HorizonWebComponentInstance,
} from '@aurora/utils';
import {
  HTableEmitsInjectKey,
  HTableFlattenDataInjectKey,
  HTableFieldMapFormattedInjectKey,
  HTableGetColumnFixedStateInjectKey,
  HTablePropsInjectKey,
  HTableScrollWrapInjectKey,
  HTableSizeInjectKey,
  HTableSlotsInjectKey,
  HTableSortRowInjectKey,
} from '../utils/injectKeys';
import get from 'lodash/get';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import { getBodyStyle, getFixedStyle, isLastFixedColumn } from '../hooks/useLayout';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import HRadio from '~/components/Radio/src/Radio';
import { warn } from '~/utils/useLog';
import type {
  HTableColumnData,
  HTableEditorType,
  HTableRowKeyType,
  HTableTransformedRowDataType,
  HTableVisibleRange,
  HTableVirtualOptions,
  HTableGroupRowDataType,
} from '../utils/types';
import {
  HTableColumnContextKey,
  HTableColumnSelectionKey,
  HTableGroupContextKey,
  HTableTransformedRowContextKey,
} from '../utils/types';
import { IconDragForm, IconLoadingLine, IconTriangleRightFilled } from '@aurora/icon';
import useExpand from '../hooks/useExpand';
import useTree from '../hooks/useTree';
import useSpan from '../hooks/useSpan';
import useRowDraggable from '../hooks/useRowDraggable';
import type { JSX } from 'vue/jsx-runtime';
import useVisibleRows from '../hooks/useVisibleRows';
import HVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import HVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import type { VirtualScrollerRenderlessScope } from '~/components/VirtualScroller/src/composables/useSlots';
import useEditing from '../hooks/useEditing';
import HInput from '~/components/Input/src/Input';
import HInputNumber from '~/components/InputNumber/src/InputNumber';
import HSelect from '~/components/Select/src/Select';
import HTreeSelect from '~/components/TreeSelect/src/TreeSelect';
import HCascader from '~/components/Cascader/src/Cascader';
import HDatePicker from '~/components/DatePicker/src/DatePicker';
import HTimePicker from '~/components/TimePicker/src/TimePicker';
import useGrouping from '../hooks/useGrouping';

export interface TableBodyExposes {
  scrollToIndex: (index: number) => void;
  scrollToRow: (rowKey: HTableRowKeyType) => void;
  getVisibleRange: () => HTableVisibleRange;
  startCellEdit: (rowKey: HTableRowKeyType, columnKey: string) => Promise<boolean>;
  commitEdit: () => Promise<boolean>;
  cancelEdit: () => void;
}

const defaultRowHeights = {
  mini: 31,
  small: 37,
  medium: 45,
  large: 53,
} as const;

const editorComponents: Record<HTableEditorType, DefinedComponent> = {
  input: HInput,
  'input-number': HInputNumber,
  select: HSelect,
  'tree-select': HTreeSelect,
  cascader: HCascader,
  'date-picker': HDatePicker,
  'time-picker': HTimePicker,
};

export default defineComponent({
  name: 'TableBody',
  props: {
    columns: {
      type: Array as PropType<HTableColumnData[]>,
      required: true,
    },
  },
  setup(props, { expose }) {
    const classHelper = new ComponentClassBlock('table');

    const parentProps = inject(HTablePropsInjectKey)!;
    const parentEmits = inject(HTableEmitsInjectKey)!;
    const parentSlots = inject(HTableSlotsInjectKey)!;
    const flattenTableData = inject(HTableFlattenDataInjectKey)!;
    const fieldMapFormatted = inject(HTableFieldMapFormattedInjectKey)!;
    const sortRow = inject(HTableSortRowInjectKey)!;
    const getFixedState = inject(HTableGetColumnFixedStateInjectKey)!;
    const scrollWrap = inject(HTableScrollWrapInjectKey)!;
    const tableSize = inject(HTableSizeInjectKey)!;
    const virtualScrollerRef =
      ref<HorizonWebComponentInstance<typeof HVirtualScroller, VirtualScrollerExposes>>();
    const activeRowIndex = ref(0);
    const rowElements = new Map<HTableRowKeyType, HTMLTableRowElement>();
    let currentVisibleRange: HTableVisibleRange = {
      startIndex: 0,
      endIndex: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
    };

    const { isExpanded, toggleExpandRows } = useExpand(flattenTableData, parentProps, parentEmits);
    const {
      treeExpandRows,
      syncLoadingRows,
      isTreeData,
      expandAll,
      toggleTreeExpandRows,
      isRowCanBeExpand,
      isTreeRowVisible,
      shouldSelectionBeVisible,
    } = useTree(parentProps, flattenTableData);

    const { spanMethod } = useSpan(parentProps);
    const { getDragHandleProps, getRowDraggableClass, getRowDraggableEvents } = useRowDraggable(
      parentProps,
      parentEmits,
      fieldMapFormatted,
      scrollWrap,
    );

    onMounted(() => {
      if (parentProps.defaultExpandAll) {
        expandAll();
      }
    });

    const { visibleRows } = useVisibleRows({
      flattenData: flattenTableData,
      isTreeData,
      isTreeRowVisible,
      sortRow,
    });
    const grouping = useGrouping({ props: parentProps, rows: visibleRows, emit: parentEmits });
    const displayRows = computed(() =>
      isTreeData.value ? visibleRows.value : grouping.rows.value,
    );

    const virtualOptions = computed<HTableVirtualOptions>(() =>
      isObject(parentProps.virtual) ? parentProps.virtual : {},
    );
    const virtualEnabled = computed(
      () =>
        !!parentProps.virtual &&
        isDefined(parentProps.height) &&
        isDefined(parentProps.rowKey) &&
        !parentProps.spanMethod,
    );
    const virtualItemSize = computed(() => {
      if (virtualOptions.value.dynamic) return undefined;
      return virtualOptions.value.itemSize ?? defaultRowHeights[tableSize.value];
    });
    const virtualMinItemSize = computed(
      () =>
        virtualOptions.value.minItemSize ??
        virtualOptions.value.itemSize ??
        defaultRowHeights[tableSize.value],
    );

    function focusEditor() {
      requestAnimationFrame(() => {
        const editor = scrollWrap.value?.querySelector<HTMLElement>(
          '[data-table-editor="true"] input:not([disabled]), [data-table-editor="true"] textarea:not([disabled]), [data-table-editor="true"] [tabindex="0"]',
        );
        editor?.focus({ preventScroll: true });
        if (editor instanceof HTMLInputElement && editor.type !== 'number') {
          editor.select();
        }
      });
    }

    const editingApi = useEditing({
      tableProps: parentProps,
      columns: computed(() => props.columns),
      fieldMapFormatted,
      emit: parentEmits,
      focusEditor,
    });

    watch(
      () => displayRows.value.length,
      length => {
        activeRowIndex.value = Math.max(0, Math.min(activeRowIndex.value, length - 1));
      },
    );

    watch(
      [() => parentProps.groupBy, isTreeData],
      ([groupBy, tree]) => {
        if (groupBy && tree) {
          warn('table', 'Grouping is ignored when the table uses tree data.');
        }
      },
      { immediate: true },
    );

    watch(
      () => parentProps.virtual,
      virtual => {
        if (!virtual) return;

        if (!isDefined(parentProps.height)) {
          warn('table', "Virtual scrolling requires the 'height' prop.");
        }
        if (!isDefined(parentProps.rowKey)) {
          warn('table', "Virtual scrolling requires the 'rowKey' prop.");
        }
        if (parentProps.spanMethod) {
          warn('table', "Virtual scrolling doesn't support 'spanMethod' yet.");
        }
        if (parentProps.tableLayout === 'auto') {
          warn('table', "Virtual scrolling uses the 'fixed' table layout.");
        }
      },
      { immediate: true },
    );

    function scrollToIndex(index: number) {
      const safeIndex = Math.min(displayRows.value.length - 1, Math.max(0, Math.floor(index)));
      if (safeIndex < 0) return;

      if (virtualEnabled.value) {
        virtualScrollerRef.value?.scrollToItem(safeIndex);
        return;
      }

      const row = scrollWrap.value?.querySelectorAll<HTMLTableRowElement>(
        `.${new ComponentClassBlock('table').e('table-body')} > .${new ComponentClassBlock('table').e('row')}:not(.${new ComponentClassBlock('table').em('row', 'expand')})`,
      )[safeIndex];
      if (row && scrollWrap.value) {
        scrollWrap.value.scrollTop = row.offsetTop;
      }
    }

    function scrollToRow(rowKey: HTableRowKeyType) {
      const index = displayRows.value.findIndex(
        row => row[HTableTransformedRowContextKey].uuid === rowKey,
      );
      if (index >= 0) scrollToIndex(index);
    }

    function setRowElement(rowKey: HTableRowKeyType, element: HTMLTableRowElement | null) {
      if (element) {
        rowElements.set(rowKey, element);
      } else {
        rowElements.delete(rowKey);
      }
    }

    function focusRow(index: number, retry = 2) {
      const safeIndex = Math.min(displayRows.value.length - 1, Math.max(0, Math.floor(index)));
      if (safeIndex < 0) return;

      activeRowIndex.value = safeIndex;
      scrollToIndex(safeIndex);
      void nextTick(() => {
        requestAnimationFrame(() => {
          const row = displayRows.value[safeIndex];
          const element = rowElements.get(row?.[HTableTransformedRowContextKey].uuid);

          if (element) {
            element.focus({ preventScroll: true });
          } else if (retry > 0) {
            focusRow(safeIndex, retry - 1);
          }
        });
      });
    }

    function getVisibleRange(): HTableVisibleRange {
      if (virtualEnabled.value) return { ...currentVisibleRange };

      return {
        startIndex: 0,
        endIndex: displayRows.value.length,
        visibleStartIndex: 0,
        visibleEndIndex: displayRows.value.length,
      };
    }

    function startCellEdit(rowKey: HTableRowKeyType, columnKey: string) {
      const rowIndex = displayRows.value.findIndex(
        row => row[HTableTransformedRowContextKey].uuid === rowKey,
      );
      const column = props.columns.find(
        current =>
          current.props.columnKey === columnKey ||
          current.props.field === columnKey ||
          current.uuid === columnKey,
      );
      if (rowIndex < 0 || !column || grouping.isGroupRow(displayRows.value[rowIndex])) {
        return Promise.resolve(false);
      }
      return editingApi.startEdit(displayRows.value[rowIndex], column, rowIndex);
    }

    expose({
      scrollToIndex,
      scrollToRow,
      getVisibleRange,
      startCellEdit,
      commitEdit: editingApi.commitEdit,
      cancelEdit: editingApi.cancelEdit,
    });

    return () => {
      const handleSelection = (
        rowData: HTableTransformedRowDataType,
        column: HTableColumnData,
        rowIndex: number,
      ) => {
        const columnKey = column.props.columnKey;

        if (columnKey && !column[HTableColumnSelectionKey].isRowChecked.value(rowData)) {
          const exclusionFields = new Set(column.props.exclusionFields ?? []);

          props.columns.forEach(otherColumn => {
            const otherColumnKey = otherColumn.props.columnKey;
            const otherField = otherColumn.props.field ?? otherColumnKey;

            if (
              otherColumn.uuid !== column.uuid &&
              otherColumn.props.type === 'selection' &&
              otherColumnKey &&
              otherField &&
              exclusionFields.has(otherField) &&
              otherColumn[HTableColumnSelectionKey].isRowChecked.value(rowData)
            ) {
              otherColumn[HTableColumnSelectionKey].toggleRowSelection(
                rowData[otherColumnKey],
                false,
                true,
              );
            }
          });
        }

        column[HTableColumnSelectionKey].handleSelect(rowData, rowIndex);
      };

      const renderEditor = (
        rowData: HTableTransformedRowDataType,
        column: HTableColumnData,
        rowIndex: number,
      ) => {
        const state = editingApi.editing.value!;
        const value = editingApi.getValue(column);
        const oldValue = state.oldValues.get(
          column.props.columnKey ?? column.props.field ?? column.uuid,
        );
        const editorType = column.props.editorType as HTableEditorType;
        const EditorComponent = editorComponents[editorType] as any;
        const editorOptions = column.props.editorOptions ?? {};
        const isTextEditor = ['input', 'input-number'].includes(editorType);
        const errorText =
          state.error instanceof Error
            ? state.error.message
            : isDefined(state.error)
              ? String(state.error)
              : undefined;

        const commit = () => editingApi.commitEdit();
        const cancel = () => editingApi.cancelEdit();
        const update = (nextValue: unknown) => editingApi.updateValue(column, nextValue);
        const customEditor = column.slots.editor?.({
          column,
          columnIndex: column.index,
          rowIndex,
          row: rowData,
          fixed: getFixedState(column.uuid),
          value,
          oldValue,
          pending: state.pending,
          error: state.error,
          update,
          commit,
          cancel,
        });

        return (
          <div
            class={cls(
              classHelper.e('cell-editor'),
              classHelper.is('pending', state.pending),
              classHelper.is('invalid', isDefined(state.error)),
            )}
            data-table-editor="true"
            data-table-editing-row={String(state.rowKey)}
            aria-busy={state.pending || undefined}
            aria-invalid={isDefined(state.error) || undefined}
            title={errorText}
            onClick={evt => evt.stopPropagation()}
            onDblclick={evt => evt.stopPropagation()}
            onFocusout={evt => {
              if (!parentProps.commitEditOnBlur || !isTextEditor) return;

              const nextEditorRow = (evt.relatedTarget as HTMLElement | null)
                ?.closest('[data-table-editing-row]')
                ?.getAttribute('data-table-editing-row');
              if (parentProps.editMode === 'row' && nextEditorRow === String(state.rowKey)) return;
              void commit();
            }}
            onKeydown={evt => {
              if (!isTextEditor) return;
              if (evt.key === 'Enter' && editorOptions.type !== 'textarea') {
                evt.preventDefault();
                evt.stopPropagation();
                void commit();
              } else if (evt.key === 'Escape') {
                evt.preventDefault();
                evt.stopPropagation();
                cancel();
              }
            }}
          >
            {customEditor ?? (
              <EditorComponent
                {...editorOptions}
                modelValue={value}
                size={tableSize.value}
                disabled={state.pending || editorOptions.disabled}
                onUpdate:modelValue={update}
                onChange={() => {
                  if (!isTextEditor && !editorOptions.multiple && !editorOptions.needConfirm) {
                    void commit();
                  }
                }}
                onConfirm={() => void commit()}
                onCancel={cancel}
              />
            )}
          </div>
        );
      };

      const rowRender = (
        rowData: HTableTransformedRowDataType,
        column: HTableColumnData,
        rowIndex: number,
        filteredRows: HTableTransformedRowDataType[],
      ): JSX.Element | JSX.Element[] => {
        const spanStatus = spanMethod(rowData, column, rowIndex, column.index);

        if (spanStatus.rowSpan === 0 || spanStatus.colSpan === 0) {
          return [];
        }

        const cellContent: VNodeArrayChildren = [];
        const cellPrepend: VNodeArrayChildren = [];
        const cellAppend: VNodeArrayChildren = [];

        let marginLeft = 0;

        switch (column.props.type) {
          case 'index':
            cellContent.push(
              isFunction(column.props.index)
                ? column.props.index(rowData[HTableTransformedRowContextKey].index + 1, rowData)
                : (column.props.index ?? rowData[HTableTransformedRowContextKey].index + 1),
            );
            break;
          case 'selection':
            if (!isDefined(column.props.columnKey) || column.props.columnKey === '') {
              warn('table', `Column hasn't set columnKey.`);
              break;
            }

            const value = rowData[column.props.columnKey];

            cellPrepend.push(
              <span
                class={cls(
                  classHelper.e('selection'),
                  classHelper.is('hidden', !shouldSelectionBeVisible(rowData, column)),
                )}
                onClick={evt => {
                  evt.stopPropagation();
                  handleSelection(rowData, column, rowIndex);
                }}
              >
                {column.props.multiple ? (
                  <HCheckbox
                    modelValue={column[HTableColumnSelectionKey].isRowChecked.value(rowData)}
                    indeterminate={column[HTableColumnSelectionKey].isRowIndeterminate.value(
                      rowData,
                    )}
                    disabled={
                      !column[HTableColumnSelectionKey].isSelectable.value(rowData, rowIndex)
                    }
                  />
                ) : (
                  <HRadio
                    name={column.uuid}
                    modelValue={column[HTableColumnSelectionKey].checkedRows.has(value)}
                    value={true}
                    disabled={
                      !column[HTableColumnSelectionKey].isSelectable.value(rowData, rowIndex)
                    }
                  />
                )}
              </span>,
            );
            break;
          case 'drag': {
            const dragHandleProps = getDragHandleProps(rowData);

            cellContent.push(
              <div
                class={classHelper.e('drag-handle')}
                draggable={dragHandleProps.draggable}
                onDragstart={dragHandleProps.onDragstart}
                onDragend={dragHandleProps.onDragend}
                onClick={evt => evt.stopPropagation()}
              >
                <IconDragForm size={16} />
              </div>,
            );
            break;
          }
        }

        if (column.props.type === 'expand') {
          cellPrepend.push(
            <div
              class={cls(
                classHelper.e('expand-icon'),
                classHelper.is('active', isExpanded(rowData)),
              )}
              onClick={evt => {
                evt.stopPropagation();
                toggleExpandRows(rowData);
              }}
            >
              <IconTriangleRightFilled size={16} />
            </div>,
          );
        }

        if (
          isTreeData.value &&
          (isDefined(parentProps.treeExpandField)
            ? parentProps.treeExpandField === column.props.field
            : isDefined(parentProps.rowKey) &&
                props.columns.some(curr => curr.props.field === parentProps.rowKey)
              ? parentProps.rowKey === column.props.field
              : column.index === 0)
        ) {
          marginLeft = rowData[HTableTransformedRowContextKey].level * parentProps.indent;

          if (syncLoadingRows.value.has(rowData[HTableTransformedRowContextKey].uuid)) {
            cellPrepend.push(
              <div
                class={cls(classHelper.e('expand-icon'), classHelper.em('expand-icon', 'loading'))}
                style={{ marginLeft: `${marginLeft}px` }}
              >
                <IconLoadingLine size={16} spin="cw" color={cssVariable('text', 'brand-default')} />
              </div>,
            );
          } else if (isRowCanBeExpand(rowData)) {
            cellPrepend.push(
              <div
                class={cls(
                  classHelper.e('expand-icon'),
                  classHelper.is(
                    'active',
                    treeExpandRows.value.has(rowData[HTableTransformedRowContextKey].uuid),
                  ),
                )}
                style={{ marginLeft: `${marginLeft}px` }}
                onClick={evt => {
                  evt.stopPropagation();
                  void toggleTreeExpandRows(rowData);
                }}
              >
                <IconTriangleRightFilled size={16} />
              </div>,
            );
          } else {
            cellPrepend.push(
              <div
                class={cls(
                  classHelper.e('expand-icon'),
                  classHelper.em('expand-icon', 'placeholder'),
                )}
                style={{ marginLeft: `${marginLeft}px` }}
              />,
            );
          }
        }

        if (editingApi.isEditing(rowData, column)) {
          cellContent.push(renderEditor(rowData, column, rowIndex));
        } else if (column.slots.default) {
          cellContent.push(
            column.slots.default({
              column,
              columnIndex: column.index,
              rowIndex,
              row: rowData,
              fixed: getFixedState(column.uuid),
            }),
          );
        } else if (column.props.field) {
          const cellValue = get(rowData, column.props.field);

          cellContent.push(
            column.props.formatter
              ? column.props.formatter(rowData, column, cellValue, rowIndex)
              : cellValue,
          );
        }

        const cellInner = (
          prepend: VNodeArrayChildren,
          inner: VNodeArrayChildren,
          append: VNodeArrayChildren,
        ) => (
          <Fragment>
            {prepend.length > 0 && <div class={classHelper.e('cell-prepend')}>{prepend}</div>}
            {inner.length > 0 &&
              (column.props.showOverflowTooltip &&
              ['default', 'index'].includes(column.props.type) ? (
                <HTooltip
                  overflow
                  theme={parentProps.tooltipTheme}
                  {...(parentProps.tooltipOptions || {})}
                  {...(column.props.tooltipOptions || {})}
                >
                  {{
                    default: () => <div class={classHelper.e('cell-inner')}>{inner}</div>,
                    content: () => inner,
                  }}
                </HTooltip>
              ) : (
                <div class={classHelper.e('cell-inner')}>{inner}</div>
              ))}

            {append.length > 0 && <div class={classHelper.e('cell-append')}>{append}</div>}
          </Fragment>
        );

        return (
          <td
            class={cls(
              classHelper.e('cell'),
              classHelper.is(`text-${column.props.align}`),
              classHelper.has('tooltip', column.props.showOverflowTooltip),
              classHelper.is(`fixed-${getFixedState(column.uuid)}`, !!getFixedState(column.uuid)),
              classHelper.is('last-fixed-column', isLastFixedColumn(column, getFixedState)),
              classHelper.is(column.props.type),
              classHelper.is('editable', editingApi.canEdit(rowData, column, rowIndex)),
              classHelper.is('editing', editingApi.isEditing(rowData, column)),
              classHelper.is('row-span-cell', spanStatus.rowSpan > 1),
              classHelper.is(
                'last-row-span-cell',
                spanStatus.rowSpan > 1 && spanStatus.rowSpan > filteredRows.length - rowIndex - 1,
              ),
              column.props.className,
              isFunction(parentProps.cellClassName)
                ? parentProps.cellClassName(rowData, column, rowIndex, column.index)
                : parentProps.cellClassName,
            )}
            style={[
              getFixedStyle(column, getFixedState),
              getBodyStyle(column),
              isFunction(parentProps.cellStyle)
                ? parentProps.cellStyle(rowData, column, rowIndex, column.index)
                : (parentProps.cellStyle ?? ''),
            ]}
            {...spanStatus}
            onMouseenter={evt =>
              parentEmits(
                'cellMouseEnter',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              )
            }
            onMouseleave={evt =>
              parentEmits(
                'cellMouseLeave',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              )
            }
            onClick={evt => {
              parentEmits(
                'cellClick',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              );
              if (column.props.editTrigger === 'click') {
                void editingApi.startEdit(rowData, column, rowIndex);
              }
            }}
            onDblclick={evt => {
              parentEmits(
                'cellDblclick',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              );
              if (column.props.editTrigger === 'dblclick') {
                void editingApi.startEdit(rowData, column, rowIndex);
              }
            }}
            onContextmenu={evt =>
              parentEmits(
                'cellContextmenu',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              )
            }
          >
            <div
              class={classHelper.e('cell-wrap')}
              style={
                column.props.showOverflowTooltip && column[HTableColumnContextKey].resizeWidth <= 0
                  ? column[HTableColumnContextKey].overflowStyle
                  : ''
              }
            >
              {cellInner(cellPrepend, cellContent, cellAppend)}
            </div>
          </td>
        );
      };

      const expandRender = (rowData: HTableTransformedRowDataType, rowIndex: number) => {
        const column = props.columns.find(column => column.props.type === 'expand');

        if (column) {
          return (
            <tr
              class={cls(
                classHelper.e('row'),
                classHelper.em('row', 'expand'),
                isFunction(parentProps.rowClassName)
                  ? parentProps.rowClassName(rowData, rowIndex)
                  : parentProps.rowClassName,
              )}
              style={
                isFunction(parentProps.rowStyle)
                  ? parentProps.rowStyle(rowData, rowIndex)
                  : (parentProps.rowStyle ?? '')
              }
            >
              <td colspan={props.columns.length} class={cls(classHelper.e('cell'))}>
                <div class={classHelper.e('cell-wrap')}>
                  <div class={classHelper.e('cell-inner')}>
                    {column?.slots?.expand?.({
                      column,
                      columnIndex: column.index,
                      rowIndex,
                      row: rowData,
                      fixed: getFixedState(column.uuid),
                    })}
                  </div>
                </div>
              </td>
            </tr>
          );
        } else {
          return undefined;
        }
      };

      const handleRowClick = (
        rowData: HTableTransformedRowDataType,
        rowIndex: number,
        evt: MouseEvent,
      ) => {
        props.columns.forEach(column => {
          if (column.props.type === 'selection' && column.props.selectOnClickRow) {
            handleSelection(rowData, column, rowIndex);
          }
        });

        parentEmits('rowClick', rowData, evt);
      };

      const handleRowKeydown = (
        rowData: HTableTransformedRowDataType,
        rowIndex: number,
        evt: KeyboardEvent,
      ) => {
        if (!parentProps.keyboardNavigation) return;

        const group = grouping.isGroupRow(rowData)
          ? (rowData as HTableGroupRowDataType)[HTableGroupContextKey]
          : undefined;
        const estimatedRowSize = virtualItemSize.value ?? virtualMinItemSize.value;
        const pageSize = Math.max(
          1,
          Math.floor((scrollWrap.value?.clientHeight ?? estimatedRowSize) / estimatedRowSize),
        );
        let nextIndex: number | undefined;

        switch (evt.key) {
          case 'ArrowDown':
            nextIndex = rowIndex + 1;
            break;
          case 'ArrowUp':
            nextIndex = rowIndex - 1;
            break;
          case 'Home':
            nextIndex = 0;
            break;
          case 'End':
            nextIndex = filteredRows.length - 1;
            break;
          case 'PageDown':
            nextIndex = rowIndex + pageSize;
            break;
          case 'PageUp':
            nextIndex = rowIndex - pageSize;
            break;
          case ' ':
          case 'Spacebar': {
            if (group) return;
            const selectionColumn = props.columns.find(column => column.props.type === 'selection');
            if (selectionColumn) {
              handleSelection(rowData, selectionColumn, rowIndex);
              evt.preventDefault();
            }
            return;
          }
          case 'Enter':
            if (group) {
              grouping.toggleGroup(group.key);
              evt.preventDefault();
            } else if (props.columns.some(column => column.props.type === 'expand')) {
              toggleExpandRows(rowData);
              evt.preventDefault();
            } else if (isRowCanBeExpand(rowData)) {
              void toggleTreeExpandRows(rowData);
              evt.preventDefault();
            }
            return;
          case 'ArrowRight':
            if (group && !group.expanded) {
              grouping.toggleGroup(group.key);
              evt.preventDefault();
            } else if (
              isRowCanBeExpand(rowData) &&
              !treeExpandRows.value.has(rowData[HTableTransformedRowContextKey].uuid)
            ) {
              void toggleTreeExpandRows(rowData);
              evt.preventDefault();
            }
            return;
          case 'ArrowLeft': {
            if (group) {
              if (group.expanded) {
                grouping.toggleGroup(group.key);
                evt.preventDefault();
                return;
              }
              nextIndex = filteredRows.findLastIndex(
                (row, index) =>
                  index < rowIndex &&
                  grouping.isGroupRow(row) &&
                  (row as HTableGroupRowDataType)[HTableGroupContextKey].level < group.level,
              );
              break;
            }
            const rowKey = rowData[HTableTransformedRowContextKey].uuid;
            if (treeExpandRows.value.has(rowKey)) {
              void toggleTreeExpandRows(rowData);
              evt.preventDefault();
              return;
            }

            const parentKey = rowData[HTableTransformedRowContextKey].parentUuid;
            if (parentKey !== null) {
              nextIndex = filteredRows.findIndex(
                row => row[HTableTransformedRowContextKey].uuid === parentKey,
              );
            }
            break;
          }
          default:
            return;
        }

        if (isDefined(nextIndex)) {
          evt.preventDefault();
          focusRow(nextIndex);
        }
      };

      const filteredRows = displayRows.value;

      const renderGroupRow = (rowData: HTableGroupRowDataType, index: number) => {
        const group = rowData[HTableGroupContextKey];
        const customContent = parentSlots.group?.({
          ...group,
          toggle: () => grouping.toggleGroup(group.key),
        });

        return (
          <tr
            key={group.key}
            ref={element => setRowElement(group.key, element as HTMLTableRowElement | null)}
            class={cls(
              classHelper.e('row'),
              classHelper.em('row', 'group'),
              classHelper.is('active', activeRowIndex.value === index),
              classHelper.is('stripe-row', parentProps.stripe && index % 2 === 1),
            )}
            tabindex={parentProps.keyboardNavigation && activeRowIndex.value === index ? 0 : -1}
            data-focus-visible-inset=""
            aria-rowindex={index + 1}
            aria-level={group.level + 1}
            aria-expanded={group.expanded}
            onFocus={() => (activeRowIndex.value = index)}
            onKeydown={evt => handleRowKeydown(rowData, index, evt)}
            onClick={() => (activeRowIndex.value = index)}
          >
            <td colspan={Math.max(1, props.columns.length)} class={classHelper.e('cell')}>
              <div
                class={classHelper.e('group-wrap')}
                style={{ paddingLeft: `${group.level * parentProps.indent}px` }}
              >
                {customContent ?? (
                  <Fragment>
                    <button
                      type="button"
                      class={classHelper.e('group-toggle')}
                      aria-expanded={group.expanded}
                      onClick={evt => {
                        evt.stopPropagation();
                        grouping.toggleGroup(group.key);
                      }}
                    >
                      <IconTriangleRightFilled
                        class={cls(
                          classHelper.e('group-icon'),
                          classHelper.is('active', group.expanded),
                        )}
                        size={16}
                      />
                      <span class={classHelper.e('group-label')}>{group.label}</span>
                      <span class={classHelper.e('group-count')}>({group.rows.length})</span>
                    </button>
                    <span class={classHelper.e('group-aggregates')}>
                      {Object.entries(group.aggregates).map(([field, value]) => {
                        const column = props.columns.find(current => current.props.field === field);
                        return (
                          <span key={field} class={classHelper.e('group-aggregate')}>
                            {column?.props.title ?? field}: {String(value ?? '—')}
                          </span>
                        );
                      })}
                    </span>
                  </Fragment>
                )}
              </div>
            </td>
          </tr>
        );
      };

      const renderDataRow = (rowData: HTableTransformedRowDataType, index: number) => {
        if (grouping.isGroupRow(rowData)) {
          return renderGroupRow(rowData as HTableGroupRowDataType, index);
        }

        const rowDraggableEvents = getRowDraggableEvents(rowData);
        const rowKey = rowData[HTableTransformedRowContextKey].uuid;
        const selected = props.columns.some(
          column =>
            column.props.columnKey && column[HTableColumnSelectionKey].isRowChecked.value(rowData),
        );
        const expandable =
          props.columns.some(column => column.props.type === 'expand') || isRowCanBeExpand(rowData);

        return (
          <Fragment key={rowKey}>
            <tr
              ref={element => setRowElement(rowKey, element as HTMLTableRowElement | null)}
              class={cls(
                classHelper.e('row'),
                typeof parentProps.rowClassName === 'function'
                  ? parentProps.rowClassName(rowData, index)
                  : parentProps.rowClassName,
                classHelper.is('stripe-row', parentProps.stripe && index % 2 === 1),
                classHelper.is('expanded', parentProps.expandRowSticky && isExpanded(rowData)),
                classHelper.is('active', activeRowIndex.value === index),
                classHelper.is('selected', selected),
                getRowDraggableClass(rowData),
              )}
              tabindex={parentProps.keyboardNavigation && activeRowIndex.value === index ? 0 : -1}
              data-focus-visible-inset=""
              aria-rowindex={index + 1}
              aria-selected={selected || undefined}
              aria-expanded={
                expandable ? isExpanded(rowData) || treeExpandRows.value.has(rowKey) : undefined
              }
              style={
                isFunction(parentProps.rowStyle)
                  ? parentProps.rowStyle(rowData, index)
                  : (parentProps.rowStyle ?? '')
              }
              onFocus={() => (activeRowIndex.value = index)}
              onKeydown={evt => handleRowKeydown(rowData, index, evt)}
              onClick={evt => {
                activeRowIndex.value = index;
                handleRowClick(rowData, index, evt);
              }}
              onDblclick={evt => parentEmits('rowDblclick', rowData, evt)}
              onContextmenu={evt => parentEmits('rowContextmenu', rowData, evt)}
              onDragover={rowDraggableEvents.onDragover}
              onDragleave={rowDraggableEvents.onDragleave}
              onDrop={rowDraggableEvents.onDrop}
            >
              {props.columns.map(column => (
                <Fragment key={column.uuid}>
                  {rowRender(rowData, column, index, filteredRows)}
                </Fragment>
              ))}
            </tr>
            {isExpanded(rowData) && expandRender(rowData, index)}
          </Fragment>
        );
      };

      const renderSpacer = (position: 'top' | 'bottom', height: number) =>
        height > 0 ? (
          <tr
            class={cls(classHelper.e('virtual-spacer'), classHelper.is(position))}
            aria-hidden="true"
          >
            <td colspan={Math.max(1, props.columns.length)} style={{ height: `${height}px` }} />
          </tr>
        ) : undefined;

      if (virtualEnabled.value) {
        return (
          <HVirtualScroller
            ref={virtualScrollerRef}
            items={filteredRows}
            keyField={String(parentProps.rowKey)}
            itemSize={virtualItemSize.value}
            minItemSize={virtualMinItemSize.value}
            buffer={virtualOptions.value.buffer ?? 200}
            scrollerHeight={parentProps.height}
            scrollContainer={scrollWrap.value}
            renderless
          >
            {{
              renderless: (scope: VirtualScrollerRenderlessScope<HTableTransformedRowDataType>) => {
                currentVisibleRange = {
                  startIndex: scope.startIndex,
                  endIndex: scope.endIndex,
                  visibleStartIndex: scope.visibleStartIndex,
                  visibleEndIndex: scope.visibleEndIndex,
                };

                if (virtualOptions.value.dynamic) {
                  return (
                    <Fragment>
                      {scope.startOffset > 0 && (
                        <tbody class={cls(classHelper.e('table-body'), classHelper.is('virtual'))}>
                          {renderSpacer('top', scope.startOffset)}
                        </tbody>
                      )}
                      {scope.views.map(view => (
                        <HVirtualScrollerItem
                          key={view.item[HTableTransformedRowContextKey].uuid}
                          tag="tbody"
                          class={cls(classHelper.e('table-body'), classHelper.is('virtual'))}
                          item={view.item}
                          index={view.index}
                          active={view.active}
                        >
                          {renderDataRow(view.item, view.index)}
                        </HVirtualScrollerItem>
                      ))}
                      {scope.endOffset > 0 && (
                        <tbody class={cls(classHelper.e('table-body'), classHelper.is('virtual'))}>
                          {renderSpacer('bottom', scope.endOffset)}
                        </tbody>
                      )}
                    </Fragment>
                  );
                }

                return (
                  <tbody class={cls(classHelper.e('table-body'), classHelper.is('virtual'))}>
                    {renderSpacer('top', scope.startOffset)}
                    {scope.views.map(view => renderDataRow(view.item, view.index))}
                    {renderSpacer('bottom', scope.endOffset)}
                  </tbody>
                );
              },
            }}
          </HVirtualScroller>
        );
      }

      return (
        <tbody class={cls(classHelper.e('table-body'))}>{filteredRows.map(renderDataRow)}</tbody>
      );
    };
  },
});
