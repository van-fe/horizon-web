import type { PropType, VNodeArrayChildren, VNodeChild } from 'vue';
import { defineComponent, Fragment, inject, computed } from 'vue';
import { cls, ComponentClassBlock, cssVariable, upperFirst } from '@aurora/shared';
import { getFixedStyle, getHeaderStyle, isLastColumn, isLastFixedColumn } from '../hooks/useLayout';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NCheckbox from '~/components/Checkbox/src/Checkbox';
import {
  NTableFlattenDataInjectKey,
  NTableGetColumnFixedStateInjectKey,
  NTableGetLastFixedLeftColumnInjectKey,
  NTableGetLastFixedRightColumnInjectKey,
  NTablePropsInjectKey,
  NTableUseHeaderResizerPluginInjectKey,
} from '../utils/injectKeys';
import {
  useFilterPlugin,
  useSearchPlugin,
  useSortPlugin,
  useTipPlugin,
} from '../hooks/useHeaderPluginRender';
import type { NTableColumnData } from '../utils/types';
import { NTableColumnContextKey, NTableColumnSelectionKey } from '../utils/types';
import type { JSX } from 'vue/jsx-runtime';

export default defineComponent({
  name: 'TableHeader',
  props: {
    columnsRow: {
      type: Array as PropType<NTableColumnData[]>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('table-v3');

    const parentProps = inject(NTablePropsInjectKey)!;
    const flattenData = inject(NTableFlattenDataInjectKey)!;
    const useHeaderResizerPlugin = inject(NTableUseHeaderResizerPluginInjectKey)!;
    const getLastFixedLeftColumn = inject(NTableGetLastFixedLeftColumnInjectKey)!;
    const getLastFixedRightColumn = inject(NTableGetLastFixedRightColumnInjectKey)!;
    const getFixedState = inject(NTableGetColumnFixedStateInjectKey)!;

    return () => {
      const lastFixedLeftColumn = getLastFixedLeftColumn();
      const lastFixedRightColumn = getLastFixedRightColumn();

      const columnRender = (column: NTableColumnData): JSX.Element | JSX.Element[] => {
        const cellContent: VNodeChild = column.props.title ?? upperFirst(column.props.field ?? '');
        const cellPrepend: VNodeArrayChildren = [];
        const cellAppend: VNodeArrayChildren = [];

        const getColumnCellWrapPadding = computed(() => {
          switch (column.props.type) {
            case 'selection':
              return cssVariable('table', 'spacing', 'padding', 'cell', 'selection');
            default:
              return cssVariable('table', 'spacing', 'padding', 'cell', 'x');
          }
        });

        if (
          column.props.type === 'selection' &&
          column.props.multiple &&
          column.props.useCheckAll
        ) {
          cellPrepend.push(
            <span
              class={classHelper.em('header', 'selection')}
              onClick={() => column[NTableColumnSelectionKey].handleSelectAll()}
            >
              <NCheckbox
                model-value={column[NTableColumnSelectionKey].isCheckedAll.value(parentProps.data)}
                indeterminate={column[NTableColumnSelectionKey].isIndeterminate.value(
                  parentProps.data,
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
              <NTooltip overflow {...(column.props.headerTooltipOptions || {})}>
                {{
                  default: () => <div class={classHelper.e('cell-inner')}>{inner}</div>,
                  content: () => inner,
                }}
              </NTooltip>
            ) : (
              <div class={classHelper.e('cell-inner')}>{inner}</div>
            )}

            {append.length > 0 && <div class={classHelper.e('cell-append')}>{append}</div>}
          </Fragment>
        );

        return (
          <th
            ref={column[NTableColumnContextKey].selfElement}
            class={cls(
              classHelper.e('cell'),
              classHelper.is(`text-${column.props.headerAlign}`),
              classHelper.is('header-bold', !column.slots.header),
              classHelper.has(
                'tooltip',
                column.props.showHeaderOverflowTooltip && !column.slots.header,
              ),
              classHelper.is(`fixed-${getFixedState(column.uuid)}`, !!getFixedState(column.uuid)),
              classHelper.is('last-fixed-column', isLastFixedColumn(column, getFixedState)),
              classHelper.is('last-column', isLastColumn(column)),
              classHelper.is(column.props.type),
              classHelper.is('resizing', column[NTableColumnContextKey].isResizing),
            )}
            colspan={column.headerColSpan}
            rowspan={column.headerRowSpan}
            style={[
              getFixedStyle(column, getFixedState),
              getHeaderStyle(column, {
                minWidth: isLastColumn(column) && parentProps.useColumnManager ? '36px' : undefined,
              }),
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
                  ? column[NTableColumnContextKey].overflowStyle
                  : '',
                getFixedState(column.uuid) === undefined &&
                (column.props.headerContentSticky ?? parentProps.headerContentSticky)
                  ? {
                      left: `calc(${getColumnCellWrapPadding} + ${(lastFixedLeftColumn?.[NTableColumnContextKey].prevColumnsWidthSum || 0) + (lastFixedLeftColumn?.[NTableColumnContextKey].selfElement.value?.clientWidth || 0)}px)`,
                      right: `calc(${getColumnCellWrapPadding} + ${(lastFixedRightColumn?.[NTableColumnContextKey].nextColumnsWidthSum || 0) + (lastFixedRightColumn?.[NTableColumnContextKey].selfElement.value?.clientWidth || 0)}px)`,
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
        <tr class={cls(classHelper.e('row'), classHelper.em('row', 'header'))}>
          {props.columnsRow.map(column => columnRender(column))}
        </tr>
      );
    };
  },
});
