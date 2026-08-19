import type { ChangeEvent, HTMLAttributes, KeyboardEvent, ReactElement, ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  PaginationCommandMap,
  PaginationCommonProps,
  PaginationEventMap,
  PaginationLabels,
  PaginationPagerItem,
} from '@aurora/core';
import {
  clampPaginationPage,
  formatPaginationLabel,
  getPaginationJumpTarget,
  getPaginationPageCount,
  getPaginationPagerItems,
  getPaginationRange,
  isPaginationPageSize,
  normalizePaginationPageSize,
  PAGINATION_DEFAULTS,
  resolvePaginationLayout,
  resolvePaginationPageSize,
  resolvePaginationSelection,
} from '@aurora/core';
import { focusPaginationItem } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type {
  PaginationAlign,
  PaginationLabels,
  PaginationLayout,
  PaginationLayoutItem,
  PaginationSize,
  PaginationVariant,
} from '@aurora/core';

type PaginationReactEventMap = AdaptComponentApiShape<
  PaginationEventMap,
  {
    change: 'onChange';
    pageChange: 'onPageChange';
    pageSizeChange: 'onPageSizeChange';
    previous: 'onPrevious';
    currentPageClick: 'onCurrentPageClick';
    next: 'onNext';
    jump: 'onJump';
  }
>;

type PaginationReactCallbacks = ComponentEventHandlers<PaginationReactEventMap>;

export type PaginationProps = PaginationCommonProps &
  PaginationReactCallbacks &
  Omit<HTMLAttributes<HTMLElement>, 'children' | 'defaultValue' | 'onChange' | 'prefix'> & {
    /** 分页器前缀。 @en Content before the pagination controls. */
    prefix?: ReactNode;
    /** 上一页按钮内容。 @en Previous-page button content. */
    previous?: ReactNode;
    /** 下一页按钮内容。 @en Next-page button content. */
    next?: ReactNode;
    /** 分页器后缀。 @en Content after the pagination controls. */
    suffix?: ReactNode;
  };

export interface PaginationHandle extends PaginationCommandMap {
  /** 导航根元素。 @en Navigation root element. */
  readonly root: HTMLElement | null;
}

type PaginationActionSource = 'page' | 'previous' | 'next' | 'jump';

function PagerAdvance({ direction }: { direction: 'previous' | 'next' }): ReactElement {
  return (
    <span className="h-pagination__pager--advance" aria-hidden="true">
      <span className="h-pagination__pager--advance is-origin">…</span>
      <span className="h-pagination__pager--advance is-icon">
        {direction === 'previous' ? '«' : '»'}
      </span>
    </span>
  );
}

export const Pagination = forwardRef<PaginationHandle, PaginationProps>(function Pagination(
  {
    value,
    defaultValue = PAGINATION_DEFAULTS.defaultValue,
    pageSize: controlledPageSize,
    defaultPageSize = PAGINATION_DEFAULTS.defaultPageSize,
    total = PAGINATION_DEFAULTS.total,
    pageSizes = PAGINATION_DEFAULTS.pageSizes,
    pagerCount = PAGINATION_DEFAULTS.pagerCount,
    layout: requestedLayout = PAGINATION_DEFAULTS.layout,
    variant = PAGINATION_DEFAULTS.variant,
    hideOnSinglePage = PAGINATION_DEFAULTS.hideOnSinglePage,
    showRange = PAGINATION_DEFAULTS.showRange,
    align = PAGINATION_DEFAULTS.align,
    disabled = PAGINATION_DEFAULTS.disabled,
    size = PAGINATION_DEFAULTS.size,
    labels: localLabels,
    prefix,
    previous,
    next,
    suffix,
    onChange,
    onPageChange,
    onPageSizeChange,
    onPrevious,
    onCurrentPageClick,
    onNext,
    onJump,
    className,
    'aria-label': ariaLabel,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('pagination', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLElement>(null);
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultValue);
  const [uncontrolledPageSize, setUncontrolledPageSize] = useState(defaultPageSize);
  const [jumpDraft, setJumpDraft] = useState('');
  const pageSize = normalizePaginationPageSize(controlledPageSize ?? uncontrolledPageSize);
  const pageCount = getPaginationPageCount(total, pageSize);
  const currentPage = clampPaginationPage(value ?? uncontrolledPage, pageCount);
  const [simplestDraft, setSimplestDraft] = useState(String(currentPage));
  const resolvedLayout = resolvePaginationLayout(requestedLayout, variant);
  const currentRange = getPaginationRange(currentPage, pageSize, total);
  const labels = useMemo<PaginationLabels>(
    () => ({ ...config.paginationLabels, ...localLabels }),
    [config.paginationLabels, localLabels],
  );
  const availablePageSizes = useMemo(() => {
    const valid = pageSizes.filter(isPaginationPageSize);
    return valid.includes(pageSize) ? [...new Set(valid)] : [pageSize, ...new Set(valid)];
  }, [pageSize, pageSizes]);

  useEffect(() => {
    if (value === undefined) {
      setUncontrolledPage(current => clampPaginationPage(current, pageCount));
    }
  }, [pageCount, value]);

  useEffect(() => setSimplestDraft(String(currentPage)), [currentPage]);

  useImperativeHandle(
    ref,
    () => ({
      focus: page => void focusPaginationItem(rootRef.current, page),
      get root() {
        return rootRef.current;
      },
    }),
    [],
  );

  function selectPage(requested: number, source: PaginationActionSource): void {
    const selection = resolvePaginationSelection(currentPage, requested, pageCount, disabled);
    if (!selection.accepted) {
      if (selection.reason === 'same' && source === 'page') onCurrentPageClick?.(selection.page);
      return;
    }
    if (value === undefined) setUncontrolledPage(selection.page);
    onPageChange?.(selection.page);
    onChange?.(selection.page, pageSize);
    if (source === 'previous') onPrevious?.(selection.page);
    else if (source === 'next') onNext?.(selection.page);
    else if (source === 'jump') onJump?.(selection.page);
  }

  function selectPageSize(event: ChangeEvent<HTMLSelectElement>): void {
    if (disabled) return;
    const requested = normalizePaginationPageSize(Number(event.currentTarget.value));
    if (requested === pageSize) return;
    const result = resolvePaginationPageSize(currentPage, requested, total);
    if (controlledPageSize === undefined) setUncontrolledPageSize(result.pageSize);
    if (value === undefined) setUncontrolledPage(result.page);
    onPageSizeChange?.(result.pageSize);
    if (result.page !== currentPage) onPageChange?.(result.page);
    onChange?.(result.page, result.pageSize);
  }

  function commitJump(): void {
    if (jumpDraft === '') return;
    selectPage(Number(jumpDraft), 'jump');
    setJumpDraft('');
  }

  function onJumpKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    commitJump();
  }

  function renderPager(): ReactElement {
    const items = getPaginationPagerItems(currentPage, pageCount, pagerCount);

    function renderPageItem(item: PaginationPagerItem): ReactElement {
      const numeric = typeof item === 'number';
      const jumpDirection = item === 'jump-prev' ? 'previous' : 'next';
      const page = numeric
        ? item
        : getPaginationJumpTarget(currentPage, jumpDirection, pageCount, pagerCount);
      const itemLabel = numeric
        ? formatPaginationLabel(labels.page, { page: item })
        : item === 'jump-prev'
          ? labels.jumpPrevious
          : labels.jumpNext;
      return (
        <button
          aria-current={numeric && item === currentPage ? 'page' : undefined}
          aria-label={itemLabel}
          className={cls(
            classes.em('pager', 'item'),
            classes.is('active', numeric && item === currentPage),
          )}
          data-num={numeric ? item : item === 'jump-prev' ? 'prev' : 'next'}
          data-page={numeric ? item : undefined}
          disabled={disabled}
          key={item}
          onClick={() => selectPage(page, 'page')}
          type="button"
        >
          {numeric ? item : <PagerAdvance direction={jumpDirection} />}
        </button>
      );
    }

    return (
      <div className={classes.e('pager')}>
        <button
          aria-label={labels.previousPage}
          className={cls(classes.em('pager', 'item'), classes.is('prev'))}
          disabled={disabled || currentPage <= 1}
          onClick={() => selectPage(currentPage - 1, 'previous')}
          type="button"
        >
          {previous ?? <span aria-hidden="true">‹</span>}
        </button>
        {items.map(renderPageItem)}
        <button
          aria-label={labels.nextPage}
          className={cls(classes.em('pager', 'item'), classes.is('next'))}
          disabled={disabled || currentPage >= pageCount}
          onClick={() => selectPage(currentPage + 1, 'next')}
          type="button"
        >
          {next ?? <span aria-hidden="true">›</span>}
        </button>
      </div>
    );
  }

  function renderSimplestPager(): ReactElement {
    function updateSimplestPage(event: ChangeEvent<HTMLInputElement>): void {
      const draft = event.currentTarget.value;
      setSimplestDraft(draft);
      if (draft !== '') {
        selectPage(Number(draft), 'page');
        if (value !== undefined) setSimplestDraft(String(currentPage));
      }
    }

    return (
      <div className={classes.e('simplest-pager')}>
        <button
          aria-label={labels.previousPage}
          className={cls(classes.em('simplest-pager', 'item'), classes.is('clickable'))}
          disabled={disabled || currentPage <= 1}
          onClick={() => selectPage(currentPage - 1, 'previous')}
          type="button"
        >
          {previous ?? <span aria-hidden="true">‹</span>}
        </button>
        <span className={classes.em('simplest-pager', 'item')}>
          <input
            aria-label={labels.jumpToPage}
            className={classes.e('simplest-input')}
            disabled={disabled}
            max={pageCount}
            min={1}
            onChange={updateSimplestPage}
            type="number"
            value={simplestDraft}
          />
        </span>
        <span aria-hidden="true" className={classes.em('simplest-pager', 'split')}>
          /
        </span>
        <span className={classes.em('simplest-pager', 'item')}>{pageCount}</span>
        <button
          aria-label={labels.nextPage}
          className={cls(classes.em('simplest-pager', 'item'), classes.is('clickable'))}
          disabled={disabled || currentPage >= pageCount}
          onClick={() => selectPage(currentPage + 1, 'next')}
          type="button"
        >
          {next ?? <span aria-hidden="true">›</span>}
        </button>
      </div>
    );
  }

  function renderTotal(): ReactElement {
    const template = showRange && variant === 'default' ? labels.rangeTotal : labels.total;
    return (
      <span className={classes.e('total')}>
        {formatPaginationLabel(template, { range: currentRange.text, total })}
      </span>
    );
  }

  function renderPageSizes(): ReactElement {
    return (
      <select
        aria-label={labels.pageSizeSelection}
        className={classes.e('sizes-select')}
        disabled={disabled}
        onChange={selectPageSize}
        value={pageSize}
      >
        {availablePageSizes.map(option => (
          <option key={option} value={option}>
            {option}
            {labels.pageSizeOption}
          </option>
        ))}
      </select>
    );
  }

  function renderJumper(): ReactElement {
    return (
      <label className={classes.e('jumper')}>
        <span>{labels.jumpPrefix}</span>
        <input
          aria-label={labels.jumpToPage}
          className={classes.e('jumper-input')}
          disabled={disabled}
          max={pageCount}
          min={1}
          onBlur={commitJump}
          onChange={event => setJumpDraft(event.currentTarget.value)}
          onKeyDown={onJumpKeyDown}
          type="number"
          value={jumpDraft}
        />
        <span>{labels.jumpSuffix}</span>
      </label>
    );
  }

  const regions: Record<(typeof resolvedLayout)[number], () => ReactElement> = {
    pager: renderPager,
    sizes: renderPageSizes,
    jumper: renderJumper,
    total: renderTotal,
    'simplest-pager': renderSimplestPager,
  };

  return (
    <nav
      {...nativeProps}
      aria-label={ariaLabel ?? labels.navigation}
      className={cls(
        classes.block,
        classes.m(size),
        classes.m(align),
        classes.is('disabled', disabled),
        className,
      )}
      hidden={hideOnSinglePage && pageCount <= 1}
      ref={rootRef}
    >
      {prefix}
      {resolvedLayout.map(region => (
        <span key={region} style={{ display: 'contents' }}>
          {regions[region]()}
        </span>
      ))}
      {suffix}
    </nav>
  );
});
