import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import { Children, cloneElement, forwardRef, isValidElement, useMemo, useState } from 'react';
import type {
  AdaptComponentApiShape,
  TimelineCommonProps,
  TimelineDotCommonProps,
  TimelineFoldCommonProps,
  TimelineItemCommonProps,
} from '@aurora/core';
import {
  getTimelineFoldIndexes,
  resolveTimelineDot,
  resolveTimelineEndpointDot,
  sortTimelineItems,
  TIMELINE_DEFAULTS,
  TIMELINE_ITEM_DEFAULTS,
  toTimelineOffsetCss,
} from '@aurora/core';
import { formatTimelineTimestamp } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type {
  TimelineDotSize,
  TimelineDotType,
  TimelineSort,
  TimelineTimestamp,
  TimelineTimestampPlacement,
} from '@aurora/core';

export type TimelineDotProps = TimelineDotCommonProps<ReactNode>;

export type TimelineFoldConfig = Omit<TimelineFoldCommonProps<ReactNode, ReactNode>, 'dot'> & {
  /** 折叠状态节点展示。@en Node presentation used while folded. */
  dot?: TimelineDotProps;
};

export type TimelineItemData = AdaptComponentApiShape<
  TimelineItemCommonProps<ReactNode, ReactNode, ReactNode, ReactNode>,
  {},
  'foldConfig',
  { foldConfig?: TimelineFoldConfig }
>;

export type TimelineProps = Omit<TimelineCommonProps<ReactNode>, 'first' | 'last'> &
  Omit<HTMLAttributes<HTMLOListElement>, 'children'> & {
    /** 首节点展示覆盖。@en Presentation overrides for the first item. */
    first?: TimelineDotProps;
    /** 尾节点展示覆盖。@en Presentation overrides for the final item. */
    last?: TimelineDotProps;
    /** 时间线条目。@en Timeline items. */
    children?: ReactNode;
    /** Day.js 时间格式化语言。@en Locale used by Day.js timestamp formatting. */
    locale?: string;
  };

export type TimelineItemProps = TimelineItemData &
  Omit<LiHTMLAttributes<HTMLLIElement>, 'children' | 'color' | 'hidden' | 'name' | 'title'> & {
    /** 描述内容，优先级高于 `description`。@en Description content that takes precedence over `description`. */
    children?: ReactNode;
    /** 默认节点内容。@en Default node content. */
    dot?: ReactNode;
    /** 折叠时的节点内容。@en Node content while folded. */
    hiddenDot?: ReactNode;
  };

interface TimelineItemInternalProps extends TimelineItemProps {
  folded?: boolean;
  hiddenByFold?: boolean;
  locale?: string;
  onFoldToggle?: () => void;
}

function getItemDotProps(props: TimelineItemData): TimelineDotProps {
  return {
    type: props.type,
    color: props.color,
    borderColor: props.borderColor,
    size: props.size,
    icon: props.icon,
  };
}

function getFoldLabel(config: TimelineFoldConfig, fallback: string): string {
  if (config.label) return config.label;
  return typeof config.content === 'string' ? config.content : fallback;
}

const TimelineItemImpl = forwardRef<HTMLLIElement, TimelineItemInternalProps>(function TimelineItem(
  {
    timestamp = TIMELINE_ITEM_DEFAULTS.timestamp,
    format = 'YYYY-MM-DD',
    placement = TIMELINE_ITEM_DEFAULTS.placement,
    offset = TIMELINE_ITEM_DEFAULTS.offset,
    type = TIMELINE_ITEM_DEFAULTS.type,
    color,
    borderColor,
    tailColor,
    size = 'medium',
    icon,
    name,
    description,
    dashed = TIMELINE_ITEM_DEFAULTS.dashed,
    foldConfig,
    tail = TIMELINE_ITEM_DEFAULTS.tail,
    children,
    dot,
    hiddenDot,
    folded = false,
    hiddenByFold = false,
    locale = 'en',
    onFoldToggle,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('timeline-item', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const activeDot = resolveTimelineDot(
    { type, color, borderColor, size, icon },
    foldConfig,
    folded,
  );
  const formattedTimestamp =
    timestamp === '' ? '' : formatTimelineTimestamp(timestamp, { format, locale });
  const timestampContent = formattedTimestamp ?? String(timestamp ?? '');
  const descriptionContent = folded ? foldConfig?.content : (children ?? description);
  const dotStyle: CSSProperties =
    activeDot.type === 'disc'
      ? { backgroundColor: activeDot.color, borderColor: activeDot.borderColor }
      : { color: activeDot.color, borderColor: activeDot.borderColor };
  const defaultDot = (
    <span
      className={cls(
        classes.e('dot'),
        classes.e(`dot--${activeDot.size ?? 'medium'}`),
        classes.e(`dot--${activeDot.type ?? 'disc'}`),
      )}
      style={dotStyle}
    >
      {activeDot.icon !== undefined && (
        <span className={classes.e(`icon--${activeDot.size ?? 'medium'}`)}>{activeDot.icon}</span>
      )}
    </span>
  );
  const dotContent = folded ? (hiddenDot ?? defaultDot) : (dot ?? defaultDot);
  const dotClasses = cls(
    classes.e('dot-wrapper'),
    classes.em('dot-wrapper', 'timestamp', placement === 'top' && !folded),
  );
  const dotControl = foldConfig ? (
    <button
      aria-expanded={!folded}
      aria-label={getFoldLabel(foldConfig, config.timelineLabels.toggle)}
      className={dotClasses}
      onClick={onFoldToggle}
      type="button"
    >
      {dotContent}
    </button>
  ) : (
    <span className={dotClasses}>{dotContent}</span>
  );

  const timestampNode = (position: typeof placement) => (
    <time className={cls(classes.e('timestamp'), classes.e(`timestamp--${position}`))}>
      {timestampContent}
    </time>
  );

  return (
    <li
      {...nativeProps}
      className={cls(classes.block, className)}
      hidden={hiddenByFold}
      ref={ref}
      style={style}
    >
      <div className={cls(classes.e('step'), classes.e(`step--${activeDot.size ?? 'medium'}`))}>
        {dotControl}
        {tail && (
          <div
            className={cls(classes.e('tail'), classes.e('tail--dashed', dashed))}
            style={{ borderColor: tailColor, margin: `${toTimelineOffsetCss(offset)} 0` }}
          />
        )}
      </div>
      <div
        className={cls(classes.e('wrapper'), classes.e(`wrapper--${activeDot.size ?? 'medium'}`))}
      >
        {placement === 'top' && !folded && timestampNode('top')}
        {!folded && (
          <div className={classes.e('name')}>
            <div className={classes.e('name--content')}>{name}</div>
            {placement === 'right' && timestampNode('right')}
          </div>
        )}
        {descriptionContent !== undefined && descriptionContent !== '' && (
          <div className={cls(classes.e('desc'), classes.e('desc--hidden', folded))}>
            {descriptionContent}
          </div>
        )}
        {placement === 'bottom' && !folded && timestampNode('bottom')}
      </div>
    </li>
  );
});

export const TimelineItem = TimelineItemImpl as ForwardRefExoticComponent<
  TimelineItemProps & RefAttributes<HTMLLIElement>
>;

function normalizeItems(children: ReactNode): ReactElement<TimelineItemProps>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<TimelineItemProps> =>
      isValidElement<TimelineItemProps>(child) && child.type === TimelineItem,
  );
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  {
    sort = TIMELINE_DEFAULTS.sort,
    first,
    last,
    locale = 'en',
    children,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('timeline', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [foldedOwners, setFoldedOwners] = useState<ReadonlySet<string>>(() => new Set());
  const sourceItems = useMemo(() => normalizeItems(children), [children]);
  const orderedItems = useMemo(
    () => sortTimelineItems(sourceItems, sort, item => item.props.timestamp),
    [sort, sourceItems],
  );
  const endpointItems = useMemo(
    () =>
      orderedItems.map((item, index) =>
        cloneElement(item, {
          ...resolveTimelineEndpointDot(
            getItemDotProps(item.props),
            index,
            orderedItems.length,
            first,
            last,
          ),
        }),
      ),
    [first, last, orderedItems],
  );

  const hiddenOwners = new Map<number, number>();
  for (const ownerIndex of endpointItems.keys()) {
    const ownerKey = String(endpointItems[ownerIndex]?.key ?? ownerIndex);
    if (!foldedOwners.has(ownerKey)) continue;
    const foldConfig = endpointItems[ownerIndex]?.props.foldConfig;
    if (!foldConfig) continue;
    for (const index of getTimelineFoldIndexes(
      ownerIndex,
      foldConfig.number,
      endpointItems.length,
    )) {
      if (!hiddenOwners.has(index)) hiddenOwners.set(index, ownerIndex);
    }
  }

  function toggleFold(ownerKey: string): void {
    setFoldedOwners(current => {
      const next = new Set(current);
      if (next.has(ownerKey)) next.delete(ownerKey);
      else next.add(ownerKey);
      return next;
    });
  }

  return (
    <ol {...nativeProps} className={cls(classes.block, className)} ref={ref}>
      {endpointItems.map((item, index) =>
        cloneElement(item as ReactElement<TimelineItemInternalProps>, {
          folded: foldedOwners.has(String(item.key ?? index)),
          hiddenByFold: hiddenOwners.has(index),
          locale,
          onFoldToggle: item.props.foldConfig
            ? () => toggleFold(String(item.key ?? index))
            : undefined,
        }),
      )}
    </ol>
  );
});
