import type { VNodeArrayChildren } from 'vue';
import { inject, defineComponent } from 'vue';
import { cls, ComponentClassBlock } from '@aurora/utils';
import { getFixedStyle, getFooterStyle, isLastFixedColumn } from '../hooks/useLayout';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import {
  HTableColumnAnalysisInjectKey,
  HTableFlattenDataInjectKey,
  HTableFooterRowHeightInjectKey,
  HTableGetColumnFixedStateInjectKey,
  HTablePropsInjectKey,
} from '../utils/injectKeys';
import type { HTableColumnData } from '../utils/types';
import { HTableColumnContextKey } from '../utils/types';
import useLocaleLang from '~/utils/useLocaleLang';
import { Decimal } from 'decimal.js';
import get from 'lodash/get';
import type { JSX } from 'vue/jsx-runtime';

export default defineComponent({
  name: 'TableFooter',
  setup() {
    const classHelper = new ComponentClassBlock('table-v3');

    const parentProps = inject(HTablePropsInjectKey)!;
    const flattenData = inject(HTableFlattenDataInjectKey)!;
    const columns = inject(HTableColumnAnalysisInjectKey)!;
    const footerRowHeight = inject(HTableFooterRowHeightInjectKey)!;
    const getFixedState = inject(HTableGetColumnFixedStateInjectKey)!;

    return () => {
      const summaryMethodCallback = parentProps.summaryMethod?.({
        columns: columns.value.flattenColumns,
        data: parentProps.data,
        flattenData: flattenData.value,
      });

      const summaryRender = (
        column: HTableColumnData,
        columnIndex: number,
        rowIndex: number,
      ): JSX.Element => {
        const cellContent: VNodeArrayChildren = [];

        if (parentProps.summaryMethod) {
          cellContent.push(summaryMethodCallback?.[rowIndex]?.[columnIndex]);
        } else {
          if (columnIndex === 0) {
            cellContent.push(
              parentProps.summaryTexts?.at(rowIndex) ??
                (useLocaleLang('table.sumText').value as string),
            );
          } else {
            if (column.props.field) {
              let summary = new Decimal(0);

              for (const row of flattenData.value) {
                if (Number.isNaN(Number(get(row, column.props.field)))) {
                  break;
                } else {
                  summary = summary.add(Number(get(row, column.props.field)));
                }
              }

              cellContent.push(summary.eq(0) ? '' : summary.toString());
            }
          }
        }

        const contentRender = (content: VNodeArrayChildren) => {
          return column.props.showFooterOverflowTooltip ? (
            <HTooltip overflow {...(column.props.headerTooltipOptions || {})}>
              {{
                default: () => <div class={classHelper.e('cell-inner')}>{content}</div>,
                content: () => content,
              }}
            </HTooltip>
          ) : (
            <div class={classHelper.e('cell-inner')}>{cellContent}</div>
          );
        };

        return (
          <td
            class={cls(
              classHelper.e('cell'),
              classHelper.is(`text-${column.props.footerAlign}`),
              classHelper.is('footer-bold', !column.slots.summaryFooter),
              classHelper.has(
                'tooltip',
                column.props.showFooterOverflowTooltip && !column.slots.summaryFooter,
              ),
              classHelper.is(`fixed-${getFixedState(column.uuid)}`, !!getFixedState(column.uuid)),
              classHelper.is('last-fixed-column', isLastFixedColumn(column, getFixedState)),
              classHelper.is(column.props.type),
            )}
            style={{
              ...getFixedStyle(column, getFixedState),
              ...getFooterStyle(rowIndex, footerRowHeight),
            }}
          >
            <div
              class={classHelper.e('cell-wrap')}
              style={
                column.props.showFooterOverflowTooltip
                  ? column[HTableColumnContextKey].overflowStyle
                  : ''
              }
            >
              {contentRender(
                column.slots.summaryFooter?.({
                  column,
                  columnIndex: column.index,
                  fixed: getFixedState(column.uuid),
                  rowIndex,
                }) ?? cellContent,
              )}
            </div>
          </td>
        );
      };

      return (
        <tfoot v-show={parentProps.showSummary} class={cls(classHelper.e('table-foot'))}>
          {new Array(parentProps.summaryRowAmount).fill(0).map((_, rowIndex) => (
            <tr class={cls(classHelper.e('row'), classHelper.em('row', 'footer'))}>
              {columns.value.flattenColumns.map((column: HTableColumnData, columnIndex) =>
                summaryRender(column, columnIndex, rowIndex),
              )}
            </tr>
          ))}
        </tfoot>
      );
    };
  },
});
