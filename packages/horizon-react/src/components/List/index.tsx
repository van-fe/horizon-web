import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import { forwardRef, useMemo } from 'react';
import type { ListCommonProps, ListItemCommonProps, ListSize } from '@aurora/core';
import { LIST_DEFAULTS, LIST_ITEM_DEFAULTS, resolveListMaxHeight } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export interface ListProps<Item = unknown>
  extends ListCommonProps<Item>, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 静态列表内容。 @en Static list content. */
  children?: ReactNode;
  /** 列表头部。 @en List header. */
  header?: ReactNode;
  /** 列表尾部。 @en List footer. */
  footer?: ReactNode;
  /** 渲染数据项目。 @en Renders a source item. */
  renderItem?: (item: Item, index: number) => ReactNode;
}

function ListInner<Item>(
  {
    data,
    zebra = LIST_DEFAULTS.zebra,
    border = LIST_DEFAULTS.border,
    split = LIST_DEFAULTS.split,
    maxHeight = LIST_DEFAULTS.maxHeight,
    size,
    renderItem,
    header,
    footer,
    children,
    className,
    style,
    ...nativeProps
  }: ListProps<Item>,
  ref: Ref<HTMLDivElement>,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('list', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const resolvedSize: ListSize = size ?? (config.size === 'small' ? 'small' : 'medium');
  const resolvedMaxHeight = resolveListMaxHeight(maxHeight);
  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(resolvedSize),
        classes.is('zebra', zebra),
        classes.is('split', split),
        classes.is('border', border),
        className,
      )}
      ref={ref}
      role="list"
      style={{
        ...style,
        maxHeight: resolvedMaxHeight ?? style?.maxHeight,
        overflowY: resolvedMaxHeight ? 'auto' : style?.overflowY,
      }}
    >
      {header !== undefined ? (
        <div className={classes.e('header')} role="presentation">
          {header}
        </div>
      ) : null}
      {children}
      {data?.map((item, index) => renderItem?.(item, index))}
      {footer !== undefined ? (
        <div className={classes.e('footer')} role="presentation">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export const List = forwardRef(ListInner) as <Item = unknown>(
  props: ListProps<Item> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;

export interface ListItemProps
  extends ListItemCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /** 项目主体内容。 @en Item body content. */
  children?: ReactNode;
  /** 自定义标题内容。 @en Custom title content. */
  titleContent?: ReactNode;
  /** 左侧内容。 @en Leading content. */
  leading?: ReactNode;
  /** 自定义描述内容。 @en Custom description content. */
  descriptionContent?: ReactNode;
  /** 右侧操作区。 @en Trailing actions. */
  actions?: ReactNode;
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  {
    title,
    titleContent,
    titleSize,
    subtitle,
    titleBold = LIST_ITEM_DEFAULTS.titleBold,
    describe,
    descriptionContent,
    leading,
    actions,
    children,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('list-item', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const resolvedTitleSize: ListSize = titleSize ?? (config.size === 'small' ? 'small' : 'medium');
  return (
    <div {...nativeProps} className={cls(classes.block, className)} ref={ref} role="listitem">
      <main className={classes.e('main')}>
        {leading !== undefined ? (
          <section className={classes.em('main', 'sider')}>{leading}</section>
        ) : null}
        <section className={classes.em('main', 'content')}>
          {titleContent !== undefined ? (
            titleContent
          ) : (
            <div
              className={cls(classes.em('main', 'title-wrapper'), classes.is('bold', titleBold))}
            >
              <span
                className={cls(
                  classes.em('main', 'title'),
                  classes.em('main', `title-${resolvedTitleSize}`),
                )}
              >
                {title}
              </span>
              {subtitle ? (
                <span
                  className={cls(
                    classes.em('main', 'subtitle'),
                    classes.em('main', `subtitle-${resolvedTitleSize}`),
                  )}
                >
                  {subtitle}
                </span>
              ) : null}
            </div>
          )}
          {descriptionContent !== undefined ? (
            descriptionContent
          ) : (
            <div className={classes.em('main', 'describe')}>{describe}</div>
          )}
          <section className={classes.em('main', 'default')}>{children}</section>
        </section>
      </main>
      <section className={classes.e('right')}>{actions}</section>
    </div>
  );
});

export const HList = List;
export const HListItem = ListItem;
export type { ListSize } from '@aurora/core';
