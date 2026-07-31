import type { PropType, VNodeArrayChildren } from 'vue';
import { onMounted, defineComponent, Fragment, inject } from 'vue';
import {
  cls,
  ComponentClassBlock,
  cssVariable,
  isDefined,
  isFunction,
  safelyGetEventTarget,
} from '@aurora/utils';
import {
  HTableEmitsInjectKey,
  HTableFlattenDataInjectKey,
  HTableFieldMapFormattedInjectKey,
  HTableGetColumnFixedStateInjectKey,
  HTablePropsInjectKey,
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
  HTableRowKeyType,
  HTableTransformedRowDataType,
} from '../utils/types';
import {
  HTableColumnContextKey,
  HTableColumnSelectionKey,
  HTableTransformedRowContextKey,
} from '../utils/types';
import { IconDragForm, IconLoadingLine, IconTriangleRightFilled } from '@aurora/icon';
import useExpand from '../hooks/useExpand';
import useTree from '../hooks/useTree';
import useSpan from '../hooks/useSpan';
import useRowDraggable from '../hooks/useRowDraggable';
import type { JSX } from 'vue/jsx-runtime';

export default defineComponent({
  name: 'TableBody',
  props: {
    columns: {
      type: Array as PropType<HTableColumnData[]>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('table');

    const parentProps = inject(HTablePropsInjectKey)!;
    const parentEmits = inject(HTableEmitsInjectKey)!;
    const flattenTableData = inject(HTableFlattenDataInjectKey)!;
    const fieldMapFormatted = inject(HTableFieldMapFormattedInjectKey)!;
    const sortRow = inject(HTableSortRowInjectKey)!;
    const getFixedState = inject(HTableGetColumnFixedStateInjectKey)!;

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
    );

    onMounted(() => {
      if (parentProps.defaultExpandAll) {
        expandAll();
      }
    });

    const sortRows = (rows: HTableTransformedRowDataType[]) => {
      if (!isTreeData.value) {
        return rows.toSorted(sortRow);
      }

      const rowsByParent = new Map<HTableRowKeyType | null, HTableTransformedRowDataType[]>();
      const result: HTableTransformedRowDataType[] = [];

      rows.forEach(row => {
        const parentUuid = row[HTableTransformedRowContextKey].parentUuid;
        const siblings = rowsByParent.get(parentUuid) ?? [];
        siblings.push(row);
        rowsByParent.set(parentUuid, siblings);
      });

      const appendRows = (parentUuid: HTableRowKeyType | null) => {
        rowsByParent
          .get(parentUuid)
          ?.toSorted(sortRow)
          .forEach(row => {
            result.push(row);
            appendRows(row[HTableTransformedRowContextKey].uuid);
          });
      };

      appendRows(null);
      return result;
    };

    return () => {
      const handleSelection = (
        rowData: HTableTransformedRowDataType,
        column: HTableColumnData,
        rowIndex: number,
      ) => {
        const columnKey = column.props.columnKey;

        if (columnKey && !column[HTableColumnSelectionKey].checkedRows.has(rowData[columnKey])) {
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
              otherColumn[HTableColumnSelectionKey].checkedRows.has(rowData[otherColumnKey])
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
                    modelValue={column[HTableColumnSelectionKey].checkedRows.has(value)}
                    disabled={!column[HTableColumnSelectionKey].isSelectable.value(rowIndex)}
                  />
                ) : (
                  <HRadio
                    name={column.uuid}
                    modelValue={column[HTableColumnSelectionKey].checkedRows.has(value)}
                    value={true}
                    disabled={!column[HTableColumnSelectionKey].isSelectable.value(rowIndex)}
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

        if (column.slots.default) {
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
            onClick={evt =>
              parentEmits(
                'cellClick',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              )
            }
            onDblclick={evt =>
              parentEmits(
                'cellDblclick',
                rowData,
                column,
                safelyGetEventTarget(evt) as HTMLElement,
                evt,
              )
            }
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

      const filteredRows = sortRows(
        flattenTableData.value
          .filter(row =>
            Object.values(row[HTableTransformedRowContextKey].visible).every(curr => !!curr),
          )
          .filter(isTreeRowVisible),
      );

      return (
        <tbody class={cls(classHelper.e('table-body'))}>
          {filteredRows.map(
            (
              rowData: HTableTransformedRowDataType,
              index: number,
              filteredRows: HTableTransformedRowDataType[],
            ) => {
              const rowDraggableEvents = getRowDraggableEvents(rowData);

              return (
                <Fragment key={rowData[HTableTransformedRowContextKey].uuid}>
                  <tr
                    class={cls(
                      classHelper.e('row'),
                      typeof parentProps.rowClassName === 'function'
                        ? parentProps.rowClassName(rowData, index)
                        : parentProps.rowClassName,
                      classHelper.is(
                        'expanded',
                        parentProps.expandRowSticky && isExpanded(rowData),
                      ),
                      classHelper.is(
                        'selected',
                        props.columns.some(
                          column =>
                            column.props.columnKey &&
                            column[HTableColumnSelectionKey].checkedRows.has(
                              rowData[column.props.columnKey],
                            ),
                        ),
                      ),
                      getRowDraggableClass(rowData),
                    )}
                    style={
                      isFunction(parentProps.rowStyle)
                        ? parentProps.rowStyle(rowData, index)
                        : (parentProps.rowStyle ?? '')
                    }
                    onClick={evt => handleRowClick(rowData, index, evt)}
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
            },
          )}
        </tbody>
      );
    };
  },
});
