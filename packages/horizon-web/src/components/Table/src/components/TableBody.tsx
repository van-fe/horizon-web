import type { PropType, VNodeArrayChildren } from 'vue';
import { onMounted, defineComponent, Fragment, inject } from 'vue';
import {
  cls,
  ComponentClassBlock,
  cssVariable,
  isDefined,
  isFunction,
  safelyGetEventTarget,
} from '@aurora/shared';
import {
  NTableEmitsInjectKey,
  NTableFlattenDataInjectKey,
  NTableGetColumnFixedStateInjectKey,
  NTablePropsInjectKey,
  NTableSortRowInjectKey,
} from '../utils/injectKeys';
import get from 'lodash/get';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import { getBodyStyle, getFixedStyle, isLastFixedColumn } from '../hooks/useLayout';
import NCheckbox from '~/components/Checkbox/src/Checkbox';
import NRadio from '~/components/Radio/src/Radio';
import { warn } from '~/utils/useLog';
import type { NTableColumnData, NTableTransformedRowDataType } from '../utils/types';
import {
  NTableColumnContextKey,
  NTableColumnSelectionKey,
  NTableTransformedRowContextKey,
} from '../utils/types';
import { IconLoadingLine, IconTriangleRightFilled } from '@aurora/icon';
import useExpand from '../hooks/useExpand';
import useTree from '../hooks/useTree';
import useSpan from '../hooks/useSpan';
import type { JSX } from 'vue/jsx-runtime';

export default defineComponent({
  name: 'TableBody',
  props: {
    columns: {
      type: Array as PropType<NTableColumnData[]>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('table-v3');

    const parentProps = inject(NTablePropsInjectKey)!;
    const parentEmits = inject(NTableEmitsInjectKey)!;
    const flattenTableData = inject(NTableFlattenDataInjectKey)!;
    const sortRow = inject(NTableSortRowInjectKey)!;
    const getFixedState = inject(NTableGetColumnFixedStateInjectKey)!;

    const { expandRows, toggleExpandRows } = useExpand(flattenTableData.value);
    const {
      treeExpandRows,
      syncLoadingRows,
      isTreeData,
      expandAll,
      toggleTreeExpandRows,
      isRowCanBeExpand,
      shouldSelectionBeVisible,
    } = useTree(parentProps, flattenTableData.value);

    const { spanMethod } = useSpan(parentProps);

    onMounted(() => {
      if (parentProps.defaultExpandAll) {
        expandAll();
      }
    });

    return () => {
      const rowRender = (
        rowData: NTableTransformedRowDataType,
        column: NTableColumnData,
        rowIndex: number,
        filteredRows: NTableTransformedRowDataType[],
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
                ? column.props.index(rowData[NTableTransformedRowContextKey].index + 1, rowData)
                : (column.props.index ?? rowData[NTableTransformedRowContextKey].index + 1),
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
                onClick={() => column[NTableColumnSelectionKey].handleSelect(rowData, rowIndex)}
              >
                {column.props.multiple ? (
                  <NCheckbox
                    modelValue={column[NTableColumnSelectionKey].checkedRows.has(value)}
                    disabled={!column[NTableColumnSelectionKey].isSelectable.value(rowIndex)}
                  />
                ) : (
                  <NRadio
                    name={column.uuid}
                    modelValue={column[NTableColumnSelectionKey].checkedRows.has(value)}
                    value={true}
                    disabled={!column[NTableColumnSelectionKey].isSelectable.value(rowIndex)}
                  />
                )}
              </span>,
            );
            break;
        }

        if (column.props.type === 'expand') {
          cellPrepend.push(
            <div
              class={cls(
                classHelper.e('expand-icon'),
                classHelper.is('active', expandRows.value.get(rowData) ?? false),
              )}
              onClick={() => toggleExpandRows(rowData)}
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
          marginLeft = rowData[NTableTransformedRowContextKey].level * parentProps.indent;

          if (syncLoadingRows.value.has(rowData[NTableTransformedRowContextKey].uuid)) {
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
                    treeExpandRows.value.has(rowData[NTableTransformedRowContextKey].uuid),
                  ),
                )}
                style={{ marginLeft: `${marginLeft}px` }}
                onClick={() => toggleTreeExpandRows(rowData)}
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

        if (column.props.field || column.slots.default) {
          cellContent.push(
            column.slots.default?.({
              column,
              columnIndex: column.index,
              rowIndex,
              row: rowData,
              fixed: getFixedState(column.uuid),
            }) ??
              (column.props.field && get(rowData, column.props.field)),
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
                <NTooltip overflow {...(column.props.tooltipOptions || {})}>
                  {{
                    default: () => <div class={classHelper.e('cell-inner')}>{inner}</div>,
                    content: () => inner,
                  }}
                </NTooltip>
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
              isFunction(parentProps.cellClassName)
                ? parentProps.cellClassName(rowData)
                : parentProps.cellClassName,
            )}
            style={[
              getFixedStyle(column, getFixedState),
              getBodyStyle(column),
              isFunction(parentProps.cellStyle)
                ? parentProps.cellStyle(rowData)
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
                column.props.showOverflowTooltip &&
                column[NTableColumnContextKey].resizeWidth <= 0
                  ? column[NTableColumnContextKey].overflowStyle
                  : ''
              }
            >
              {cellInner(cellPrepend, cellContent, cellAppend)}
            </div>
          </td>
        );
      };

      const expandRender = (rowData: NTableTransformedRowDataType, rowIndex: number) => {
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

      // todo
      let hasExpandedRow = false;

      return (
        <tbody class={cls(classHelper.e('table-body'))}>
          {flattenTableData.value
            .filter(row =>
              Object.values(row[NTableTransformedRowContextKey].visible).every(curr => !!curr),
            )
            .filter(row =>
              row[NTableTransformedRowContextKey].parentUuid
                ? treeExpandRows.value.has(row[NTableTransformedRowContextKey].parentUuid)
                : true,
            )
            .toSorted(sortRow)
            .map(
              (
                rowData: NTableTransformedRowDataType,
                index: number,
                filteredRows: NTableTransformedRowDataType[],
              ) => {
                if (parentProps.expandRowSticky && (expandRows.value.get(rowData) ?? false)) {
                  hasExpandedRow = true;
                }

                return (
                  <Fragment>
                    <tr
                      key={parentProps.rowKey ? rowData[parentProps.rowKey] : undefined}
                      class={cls(
                        classHelper.e('row'),
                        typeof parentProps.rowClassName === 'function'
                          ? parentProps.rowClassName(rowData, index)
                          : parentProps.rowClassName,
                        classHelper.is('expanded', hasExpandedRow),
                        classHelper.is(
                          'selected',
                          props.columns.some(
                            column =>
                              column.props.columnKey &&
                              column[NTableColumnSelectionKey].checkedRows.has(
                                rowData[column.props.columnKey],
                              ),
                          ),
                        ),
                      )}
                      style={
                        isFunction(parentProps.rowStyle)
                          ? parentProps.rowStyle(rowData, index)
                          : (parentProps.rowStyle ?? '')
                      }
                      onClick={evt => parentEmits('rowClick', rowData, evt)}
                      onDblclick={evt => parentEmits('rowDblclick', rowData, evt)}
                      onContextmenu={evt => parentEmits('rowContextmenu', rowData, evt)}
                    >
                      {props.columns.map(column => rowRender(rowData, column, index, filteredRows))}
                    </tr>
                    {expandRows.value.get(rowData) && expandRender(rowData, index)}
                  </Fragment>
                );
              },
            )}
        </tbody>
      );
    };
  },
});
