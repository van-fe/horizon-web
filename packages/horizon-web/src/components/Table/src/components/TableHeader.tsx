import type { PropType, VNodeArrayChildren, VNodeChild } from 'vue';
import { defineComponent, Fragment, inject } from 'vue';
import { cls, ComponentClassBlock, cssVariable, isFunction, upperFirst } from '@aurora/utils';
import { getFixedStyle, getHeaderStyle, isLastColumn, isLastFixedColumn } from '../hooks/useLayout';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import {
  HTableFlattenDataInjectKey,
  HTableGetColumnFixedStateInjectKey,
  HTableGetLastFixedLeftColumnInjectKey,
  HTableGetLastFixedRightColumnInjectKey,
  HTablePropsInjectKey,
  HTableUseHeaderResizerPluginInjectKey,
} from '../utils/injectKeys';
import {
  useFilterPlugin,
  useSearchPlugin,
  useSortPlugin,
  useTipPlugin,
} from '../hooks/useHeaderPluginRender';
import type { HTableColumnData } from '../utils/types';
import { HTableColumnContextKey, HTableColumnSelectionKey } from '../utils/types';
import type { JSX } from 'vue/jsx-runtime';
import type { HTableHeaderDraggableProps } from '../hooks/useHeaderDraggable';

export default defineComponent({
  name: 'TableHeader',
  props: {
    columnsRow: {
      type: Array as PropType<HTableColumnData[]>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    stickyTopOffset: {
      type: Number,
      default: 0,
    },
    getDraggableProps: {
      type: Function as PropType<(column: HTableColumnData) => HTableHeaderDraggableProps>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('table');

    const parentProps = inject(HTablePropsInjectKey)!;
    const flattenData = inject(HTableFlattenDataInjectKey)!;
    const useHeaderResizerPlugin = inject(HTableUseHeaderResizerPluginInjectKey)!;
    const getLastFixedLeftColumn = inject(HTableGetLastFixedLeftColumnInjectKey)!;
    const getLastFixedRightColumn = inject(HTableGetLastFixedRightColumnInjectKey)!;
    const getFixedState = inject(HTableGetColumnFixedStateInjectKey)!;

    return () => {
      const lastFixedLeftColumn = getLastFixedLeftColumn();
      const lastFixedRightColumn = getLastFixedRightColumn();

      const columnRender = (column: HTableColumnData): JSX.Element | JSX.Element[] => {
        const draggableProps = props.getDraggableProps(column);
        const cellContent: VNodeChild = column.props.title ?? upperFirst(column.props.field ?? '');
        const cellPrepend: VNodeArrayChildren = [];
        const cellAppend: VNodeArrayChildren = [];

        const columnCellWrapPadding = () => {
          switch (column.props.type) {
            case 'selection':
              return cssVariable('table', 'spacing', 'padding', 'cell', 'selection');
            default:
              return cssVariable('table', 'spacing', 'padding', 'cell', 'x');
          }
        };

        if (
          column.props.type === 'selection' &&
          column.props.multiple &&
          column.props.useCheckAll
        ) {
          cellPrepend.push(
            <span
              class={classHelper.em('header', 'selection')}
              onClick={() => column[HTableColumnSelectionKey].handleSelectAll()}
            >
              <HCheckbox
                model-value={column[HTableColumnSelectionKey].isCheckedAll.value(flattenData.value)}
                indeterminate={column[HTableColumnSelectionKey].isIndeterminate.value(
                  flattenData.value,
                )}
              />
            </span>,
          );
        }

        if (column.props.tip) {
          cellAppend.push(useTipPlugin(column));
        }

        if (column.props.sortable) {
          cellAppend.push(useSortPlugin(column));
        }

        if (column.props.filterable) {
          if (['input', 'input-number'].includes(column.props.filterType)) {
            cellAppend.push(useSearchPlugin(column));
          } else {
            cellAppend.push(useFilterPlugin(column, flattenData));
          }
        }

        const cellRender = (
          prepend: VNodeArrayChildren,
          inner: unknown,
          append: VNodeArrayChildren,
        ) => (
          <Fragment>
            {prepend.length > 0 && <div class={classHelper.e('cell-prepend')}>{prepend}</div>}
            {column.props.showHeaderOverflowTooltip &&
            ['default', 'index'].includes(column.props.type) ? (
              <HTooltip
                overflow
                theme={parentProps.tooltipTheme}
                {...(parentProps.tooltipOptions || {})}
                {...(column.props.headerTooltipOptions || {})}
              >
                {{
                  default: () => <div class={classHelper.e('cell-inner')}>{inner}</div>,
                  content: () => inner,
                }}
              </HTooltip>
            ) : (
              <div class={classHelper.e('cell-inner')}>{inner}</div>
            )}

            {append.length > 0 && <div class={classHelper.e('cell-append')}>{append}</div>}
          </Fragment>
        );

        return (
          <th
            ref={column[HTableColumnContextKey].selfElement}
            class={cls(
              classHelper.e('cell'),
              classHelper.is(`text-${column.props.headerAlign ?? column.props.align}`),
              classHelper.is('header-bold', !column.slots.header),
              classHelper.has(
                'tooltip',
                column.props.showHeaderOverflowTooltip && !column.slots.header,
              ),
              classHelper.is(`fixed-${getFixedState(column.uuid)}`, !!getFixedState(column.uuid)),
              classHelper.is('last-fixed-column', isLastFixedColumn(column, getFixedState)),
              classHelper.is('last-column', isLastColumn(column)),
              classHelper.is(column.props.type),
              classHelper.is('resizing', column[HTableColumnContextKey].isResizing),
              draggableProps.class,
              column.props.headerClassName,
              isFunction(parentProps.headerCellClassName)
                ? parentProps.headerCellClassName(column, column.index)
                : parentProps.headerCellClassName,
            )}
            colspan={column.headerColSpan}
            rowspan={column.headerRowSpan}
            draggable={draggableProps.draggable}
            onDragstart={draggableProps.onDragstart}
            onDragover={draggableProps.onDragover}
            onDragleave={draggableProps.onDragleave}
            onDrop={draggableProps.onDrop}
            onDragend={draggableProps.onDragend}
            style={[
              getFixedStyle(column, getFixedState),
              getHeaderStyle(column, {
                minWidth: isLastColumn(column) && parentProps.useColumnManager ? '36px' : undefined,
                topOffset: props.stickyTopOffset,
              }),
              isFunction(parentProps.headerCellStyle)
                ? parentProps.headerCellStyle(column, column.index)
                : (parentProps.headerCellStyle ?? ''),
            ]}
          >
            <div
              class={cls(
                classHelper.e('cell-wrap'),
                classHelper.is(
                  'sticky',
                  column.props.headerContentSticky ?? parentProps.headerContentSticky,
                ),
              )}
              style={[
                column.props.showHeaderOverflowTooltip
                  ? column[HTableColumnContextKey].overflowStyle
                  : '',
                getFixedState(column.uuid) === undefined &&
                (column.props.headerContentSticky ?? parentProps.headerContentSticky)
                  ? {
                      left: `calc(${columnCellWrapPadding()} + ${(lastFixedLeftColumn?.[HTableColumnContextKey].prevColumnsWidthSum || 0) + (lastFixedLeftColumn?.[HTableColumnContextKey].selfElement.value?.clientWidth || 0)}px)`,
                      right: `calc(${columnCellWrapPadding()} + ${(lastFixedRightColumn?.[HTableColumnContextKey].nextColumnsWidthSum || 0) + (lastFixedRightColumn?.[HTableColumnContextKey].selfElement.value?.clientWidth || 0)}px)`,
                    }
                  : '',
              ]}
            >
              {column.slots.header
                ? cellRender(
                    cellPrepend,
                    column.slots.header({
                      column,
                      columnIndex: column.index,
                      fixed: getFixedState(column.uuid),
                    }),
                    cellAppend,
                  )
                : cellRender(cellPrepend, cellContent, cellAppend)}
            </div>
            {useHeaderResizerPlugin(column, parentProps.showHeaderDivider)}
          </th>
        );
      };

      return (
        <tr
          class={cls(
            classHelper.e('row'),
            classHelper.em('row', 'header'),
            isFunction(parentProps.headerRowClassName)
              ? parentProps.headerRowClassName(props.columnsRow, props.rowIndex)
              : parentProps.headerRowClassName,
          )}
          style={
            isFunction(parentProps.headerRowStyle)
              ? parentProps.headerRowStyle(props.columnsRow, props.rowIndex)
              : (parentProps.headerRowStyle ?? '')
          }
        >
          {props.columnsRow.map(column => (
            <Fragment key={column.uuid}>{columnRender(column)}</Fragment>
          ))}
        </tr>
      );
    };
  },
});
