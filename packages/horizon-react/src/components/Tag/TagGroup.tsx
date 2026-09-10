import type { ReactElement } from 'react';
import { Children, forwardRef, isValidElement, useImperativeHandle, useMemo, useRef } from 'react';
import type { TagCommonProps } from '@aurora/core';
import { TAG_GROUP_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Tooltip } from '../Tooltip';
import { TagGroupContext, type TagGroupContextValue } from './context';
import { useTagGroupRuntime } from './hooks/useTagGroupRuntime';
import { Tag } from './Tag';
import type { TagGroupHandle, TagGroupProps, TagHandle, TagProps } from './types';
import { getReactText } from './utils';

const CREATE_TAG_ID = Symbol('react-tag-create');

export const TagGroup = forwardRef<TagGroupHandle, TagGroupProps>(function TagGroup(
  {
    size = TAG_GROUP_DEFAULTS.size,
    editable,
    disabled,
    collapse = TAG_GROUP_DEFAULTS.collapse,
    expand = TAG_GROUP_DEFAULTS.expand,
    collapseUseTooltip = TAG_GROUP_DEFAULTS.collapseUseTooltip,
    tooltipRenderType = TAG_GROUP_DEFAULTS.tooltipRenderType,
    separator = TAG_GROUP_DEFAULTS.separator,
    useCreate = TAG_GROUP_DEFAULTS.useCreate,
    beforeCreate,
    beforeEdit,
    beforeClose,
    createText,
    maxTags = TAG_GROUP_DEFAULTS.maxTags,
    disableTransitions = TAG_GROUP_DEFAULTS.disableTransitions,
    fillUp = TAG_GROUP_DEFAULTS.fillUp,
    minDisplayed,
    tooltipShowAfter,
    tooltipHideAfter,
    collapseTagProps,
    createTagProps,
    renderCreateText,
    renderCreate,
    prepend,
    append,
    prefix,
    suffix,
    popperInnerClass,
    onCreated,
    onEdited,
    onClosed,
    onToggled,
    onExceeded,
    children,
    className,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('tag-group', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const createRef = useRef<TagHandle | null>(null);
  const items = Children.toArray(children);
  const {
    visibleCount,
    collapsed,
    pending,
    lines,
    calculate,
    calculateAsync,
    toggle,
    edit,
    close,
  } = useTagGroupRuntime({
    containerRef,
    itemCount: items.length,
    minDisplayed,
    collapse,
    fillUp,
    beforeCreate,
    beforeEdit,
    beforeClose,
    onCreated,
    onEdited,
    onClosed,
    onToggled,
    onExceeded,
  });

  useImperativeHandle(
    forwardedRef,
    () => ({
      get element() {
        return rootRef.current;
      },
      toggle,
      calculate: calculateAsync,
    }),
    [calculateAsync, toggle],
  );

  const context = useMemo<TagGroupContextValue>(
    () => ({ size, editable, disabled, pending, calculate, edit, close }),
    [calculate, close, disabled, edit, editable, pending, size],
  );
  const visibleItems = collapse && collapsed ? items.slice(0, visibleCount) : items;
  const hiddenItems = items.slice(visibleCount);
  const tagDescriptors = items.flatMap(item =>
    isValidElement<TagProps>(item) ? [item.props as TagCommonProps] : [],
  );
  const hiddenText = hiddenItems
    .map(item =>
      isValidElement<TagProps>(item) ? getReactText(item.props.children) : getReactText(item),
    )
    .filter(Boolean)
    .join(separator);
  const summary = hiddenItems.length ? (
    <Tag
      {...collapseTagProps}
      aria-label={config.tagLabels.expand}
      clickable={collapseUseTooltip || expand}
      disableTransitions={disableTransitions}
      onClick={() => {
        if (expand) toggle(true);
      }}
      tooltipHideAfter={tooltipHideAfter}
      tooltipShowAfter={tooltipShowAfter}
    >
      +{hiddenItems.length}
    </Tag>
  ) : null;
  const summaryWithTooltip =
    summary && collapseUseTooltip ? (
      <Tooltip
        content={
          <span className={cls(classes.e('popper-inner'), popperInnerClass)}>
            {tooltipRenderType === 'full' ? hiddenItems : hiddenText}
          </span>
        }
        hideAfter={tooltipHideAfter}
        showAfter={tooltipShowAfter}
      >
        {summary}
      </Tooltip>
    ) : (
      summary
    );

  return (
    <TagGroupContext.Provider value={context}>
      <div
        {...nativeProps}
        aria-busy={pending || undefined}
        className={cls(
          classes.block,
          classes.m(size),
          classes.m('collapse', minDisplayed === undefined && collapse && collapsed),
          classes.is('fill-up', fillUp),
          classes.is('collapsed', collapsed),
          classes.has('min-displayed', minDisplayed !== undefined),
          className,
        )}
        ref={rootRef}
        role={nativeProps.role ?? 'group'}
      >
        {prepend}
        <div className={classes.e('container')} ref={containerRef}>
          {prefix}
          {visibleItems}
          {summaryWithTooltip}
          {collapse && !collapsed && lines > 1 && (
            <Tag
              {...collapseTagProps}
              aria-label={config.tagLabels.collapse}
              clickable
              equally
              icon="▴"
              onClick={() => toggle(false)}
            />
          )}
          {renderCreate !== undefined
            ? renderCreate(tagDescriptors)
            : useCreate &&
              items.length < maxTags && (
                <Tag
                  {...createTagProps}
                  __create
                  className={cls(classes.e('create-tag', !pending), createTagProps?.className)}
                  clickable
                  editable={editable}
                  icon="＋"
                  id={CREATE_TAG_ID}
                  onClick={() => !pending && createRef.current?.edit('')}
                  plain
                  ref={createRef}
                >
                  {renderCreateText?.(tagDescriptors) ?? createText ?? config.tagLabels.create}
                </Tag>
              )}
          {suffix}
        </div>
        {append}
      </div>
    </TagGroupContext.Provider>
  );
});
