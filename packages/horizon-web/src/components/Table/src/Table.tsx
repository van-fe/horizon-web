import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  toRef,
  toRefs,
  watch,
} from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  cls,
  ComponentClassBlock,
  cssVariableKey,
  isBoolean,
  isDefined,
  sizeUnitTransform,
  useNamespace,
} from '@aurora/utils';
import type { TableProps } from './composables/useProps';
import { useTableProps } from './composables/useProps';
import type { TableEmits } from './composables/useEmits';
import { useTableEmits } from './composables/useEmits';
import type { TableSlots } from './composables/useSlots';
import { useTableSlots } from './composables/useSlots';
import type { TableExposes } from './composables/useExposes';
import { useTableExposes } from './composables/useExposes';
import {
  HTableColumnAnalysisInjectKey,
  HTableEmitsInjectKey,
  HTableFieldMapFormattedInjectKey,
  HTableFlattenDataInjectKey,
  HTableFooterRowHeightInjectKey,
  HTablePropsInjectKey,
  HTableSlotsInjectKey,
} from './utils/injectKeys';
import useColumn from './hooks/useColumn';
import TableHeader from './components/TableHeader';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import useSize from '~/utils/useSize';
import TableBody from './components/TableBody';
import useBorder from './hooks/useBorder';
import useScroll from './hooks/useScroll';
import useResizeListener from './hooks/useResizeListener';
import useLayout from './hooks/useLayout';
import useDataAnalysis from './hooks/useDataAnalysis';
import useSortable from './hooks/useSortable';
import loading from '~/directives/v-loading/src';
import tooltip from '~/directives/v-tooltip/src';
import useLocaleLang from '~/utils/useLocaleLang';
import HEmpty from '~/components/Empty/src/Empty';
import { formatTreeFieldMap } from './hooks/useTree';
import TableFooter from './components/TableFooter';
import useHeaderSticky from './hooks/useHeaderSticky';
import { HTableColumnContextKey } from './utils/types';
import useHeaderDraggable from './hooks/useHeaderDraggable';
import useHeaderResizer from './hooks/useHeaderResizer';
import useColumnManager from './hooks/useColumnManager';

export default defineComponent({
  name: `${useNamespace()}Table`,
  desc: '用行与列的形式，展示结构化数据展示的组件；常和按钮、搜索、筛选、分页等其他界面组件一起协同',
  descLocales: {
    en: 'Displays structured data in rows and columns and works well with actions, search, filters, and pagination.',
  },
  directives: {
    loading,
    tooltip,
  },
  props: useTableProps,
  emits: useTableEmits,
  slots: useTableSlots,
  exposes: useTableExposes,
  setup(
    props: TableProps,
    { emit, slots, expose }: HorizonWebSetupContext<TableEmits, TableSlots, TableExposes>,
  ) {
    const classHelper = new ComponentClassBlock('table');

    const propsRef = toRefs(props);
    const tableDomRef = ref<HTMLTableElement>();
    const headDomRef = ref<HTMLTableSectionElement>();

    const size = useSize(toRef(props, 'size'), 'medium');
    const isLoading = computed(() =>
      isBoolean(props.loading) ? props.loading : !!props.loading?.isShow,
    );

    const fieldMapFormatted = formatTreeFieldMap(propsRef);
    const { flattenData, reloadData } = useDataAnalysis(propsRef, emit, { fieldMapFormatted });
    const {
      columns,
      analysisColumns,
      fixedStore,
      getFixedState,
      visibleStore,
      getVisibleState,
      sortStore,
    } = useColumn(flattenData, emit);

    const { border } = useBorder(propsRef, analysisColumns);
    const {} = useSortable(emit, analysisColumns, propsRef.defaultSort);
    const { scrollbarDomRef, handleScroll, initialScrollState, scrollComputedClassName } =
      useScroll();

    const {
      tableFooterDomRef,
      footerRowHeight,
      scrollbarBeginEndSpacing,
      calculateColumnsLayout,
      refreshScrollbarSpacing,
      refreshLayout,
      firstHeaderRowHeight,
    } = useLayout(analysisColumns, getFixedState);

    const { wrapperDomRef, wrapperHeight } = useResizeListener(analysisColumns, [
      initialScrollState,
      calculateColumnsLayout,
      refreshScrollbarSpacing,
    ]);

    const { scrollOffset, setScrollListener, removeScrollListener } = useHeaderSticky(
      propsRef,
      wrapperDomRef,
      headDomRef,
    );

    const { getDraggableProps } = useHeaderDraggable({
      columns,
      columnAnalysis: analysisColumns,
      sortStore,
      getFixedState,
    });

    const { cursorLineStyle } = useHeaderResizer(refreshLayout, emit);

    const columnManagerRender = useColumnManager({
      columns,
      fixedStore,
      getFixedState,
      visibleStore,
      getVisibleState,
    });

    watch(
      [fixedStore, visibleStore],
      () => {
        nextTick(() => {
          refreshLayout();
        });
      },
      {
        deep: true,
      },
    );

    provide(HTablePropsInjectKey, props);
    provide(HTableEmitsInjectKey, emit);
    provide(HTableSlotsInjectKey, slots);
    provide(HTableColumnAnalysisInjectKey, analysisColumns);
    provide(HTableFlattenDataInjectKey, flattenData);
    provide(HTableFieldMapFormattedInjectKey, fieldMapFormatted);
    provide(HTableFooterRowHeightInjectKey, footerRowHeight);

    expose({
      reloadData,
      refreshLayout,
      getScrollWrap: () => scrollbarDomRef.value?.wrapRef,
    });

    onMounted(() => {
      void nextTick(() => {
        initialScrollState();
        refreshLayout();
        setScrollListener();
      });
    });

    onBeforeUnmount(() => {
      removeScrollListener();
    });

    return () => (
      <div
        v-loading={
          isBoolean(props.loading)
            ? {
                isShow: props.loading,
                text: props.loadingText ?? useLocaleLang('table.loading').value,
              }
            : props.loading
        }
        ref={wrapperDomRef}
        class={cls(
          classHelper.block,
          classHelper.is(size.value),
          classHelper.is('stripe', props.stripe),
          classHelper.is(`border-${border.value}`, !!border.value),
          classHelper.is('hoverable', props.hoverable),
          classHelper.is('highlight-selected', props.highlightSelected),
          classHelper.has('footer', props.showSummary),
          classHelper.has('column-manager', props.useColumnManager),
          classHelper.has('height', isDefined(props.height)),
          classHelper.has('empty', flattenData.value.length === 0 && !isLoading.value),
          scrollComputedClassName.value,
        )}
        style={{
          height: sizeUnitTransform(props.height),
          minHeight: sizeUnitTransform(props.minHeight),
          [cssVariableKey('table', 'wrapper', 'height')]: `${wrapperHeight.value}px`,
          [cssVariableKey('table', 'header', 'height')]:
            `${scrollbarBeginEndSpacing.value[0][0]}px`,
          [cssVariableKey('table', 'header', 'row', 'height')]:
            firstHeaderRowHeight.value > 0 ? `${firstHeaderRowHeight.value}px` : undefined,
          ['--table-border-width']: border.value === 'full' ? '1px' : '0px',
        }}
      >
        <div class={cls(classHelper.e('hidden-columns'))}>{slots.default?.()}</div>
        <HScrollbar
          ref={scrollbarDomRef}
          always={props.scrollbarAlwaysOn}
          height={props.height}
          maxHeight={props.maxHeight}
          trackBeginEndSpacing={scrollbarBeginEndSpacing.value}
          zIndex={`var(${cssVariableKey('table', 'z-index', 'default')})`}
          updateDelay={50}
          onScroll={handleScroll}
          onReachTop={() => emit('scrollTop')}
          onReachBottom={() => emit('scrollBottom')}
        >
          <table
            ref={tableDomRef}
            class={cls(classHelper.e('table'), classHelper.is(`layout-${props.tableLayout}`))}
            style={{ tableLayout: props.tableLayout }}
          >
            <colgroup>
              {props.tableLayout === 'fixed' &&
                analysisColumns.value.colStyle.map(info => {
                  return (
                    <col
                      key={info.column.uuid}
                      style={
                        info.column[HTableColumnContextKey].resizeWidth === -1
                          ? info.style
                          : {
                              width: `${info.column[HTableColumnContextKey].resizeWidth}px`,
                            }
                      }
                    />
                  );
                })}
            </colgroup>
            {props.showHeader && (
              <thead
                ref={headDomRef}
                class={cls(
                  classHelper.e('table-head'),
                  classHelper.is('sticky-header', props.headerSticky),
                )}
                style={{
                  transform: props.headerSticky ? `translateY(${scrollOffset.value}px)` : undefined,
                }}
              >
                {analysisColumns.value.columnGroups.map((columns, rowIndex) => (
                  <TableHeader
                    key={rowIndex}
                    columnsRow={columns}
                    rowIndex={rowIndex}
                    getDraggableProps={getDraggableProps}
                  />
                ))}
              </thead>
            )}
            <TableBody columns={analysisColumns.value.flattenColumns} />
            <TableFooter ref={tableFooterDomRef} />
          </table>
          {flattenData.value.length === 0 && !isLoading.value && (
            <div class={classHelper.em('table', 'empty')}>
              {slots.empty?.() ?? (
                <HEmpty
                  description={
                    props.emptyText ?? (useLocaleLang('table.emptyText').value as string)
                  }
                />
              )}
            </div>
          )}
          {props.useColumnManager && columnManagerRender()}
        </HScrollbar>
        <div class={classHelper.e('resizing-cursor-line')} style={cursorLineStyle.value} />
        {slots.append ? (
          <div class={classHelper.e('table-append')}>{slots.append()}</div>
        ) : undefined}
      </div>
    );
  },
});
