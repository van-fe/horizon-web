import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { forwardRef, useMemo } from 'react';
import type { PageHeaderCommonProps } from '@aurora/core';
import { PAGE_HEADER_DEFAULTS } from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

export interface PageHeaderProps
  extends
    PageHeaderCommonProps,
    Omit<HTMLAttributes<HTMLElement>, 'children' | 'content' | 'title'> {
  /** 页头后的扩展内容。 @en Extended content below the page heading. */
  children?: ReactNode;
  /** 返回操作图标。 @en Back action icon. */
  backIcon?: ReactNode;
  /** 返回操作的可访问名称。 @en Accessible name for the back action. */
  backAriaLabel?: string;
  /** 完整标题区，自定义后替代标题、提示和标签。 @en Complete heading region replacing title, tooltip, and tags. */
  header?: ReactNode;
  /** 自定义标题内容。 @en Custom title content. */
  titleContent?: ReactNode;
  /** 完整标题容器，自定义后替代标题及其提示。 @en Complete title container replacing the title and its tooltip. */
  titleContainer?: ReactNode;
  /** 标题旁标签。 @en Tags beside the title. */
  tags?: ReactNode;
  /** 自定义说明内容。 @en Custom supporting content. */
  description?: ReactNode;
  /** 页面级操作。 @en Page-level actions. */
  actions?: ReactNode;
  /** 面包屑内容。 @en Breadcrumb content. */
  breadcrumb?: ReactNode;
  /** 返回操作回调。 @en Called when the back action is activated. */
  onBack?: () => void;
}

function DefaultBackIcon(): ReactElement {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  {
    title,
    content,
    showBack = PAGE_HEADER_DEFAULTS.showBack,
    useDivider = PAGE_HEADER_DEFAULTS.useDivider,
    disabledHeaderTooltip = PAGE_HEADER_DEFAULTS.disabledHeaderTooltip,
    children,
    backIcon,
    backAriaLabel,
    header,
    titleContent,
    titleContainer,
    tags,
    description,
    actions,
    breadcrumb,
    onBack,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('page-header', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const resolvedTitle = titleContent ?? title;
  const titleHeading = <h1 className={classes.em('header', 'title')}>{resolvedTitle}</h1>;
  const resolvedTitleContainer =
    titleContainer ??
    (disabledHeaderTooltip ? (
      titleHeading
    ) : (
      <Tooltip content={resolvedTitle} disabled={disabledHeaderTooltip} enterable>
        {titleHeading}
      </Tooltip>
    ));

  return (
    <header
      {...nativeProps}
      className={cls(classes.block, classes.has('divider', useDivider), className)}
      ref={ref}
    >
      {breadcrumb !== undefined ? (
        <div className={classes.e('breadcrumb')}>{breadcrumb}</div>
      ) : null}
      <div className={classes.e('main')}>
        {showBack ? (
          <Button
            aria-label={backAriaLabel ?? config.pageHeaderLabels.back}
            className={classes.e('back')}
            icon={backIcon ?? <DefaultBackIcon />}
            onClick={onBack}
            text
            variant="normal"
          />
        ) : null}
        <div className={classes.e('inner')}>
          <div className={classes.e('header')}>
            {header !== undefined ? (
              header
            ) : (
              <>
                {resolvedTitleContainer}
                {tags !== undefined ? (
                  <div className={classes.em('header', 'tags')}>{tags}</div>
                ) : null}
              </>
            )}
          </div>
          {description !== undefined || content ? (
            <div className={classes.em('inner', 'content')}>{description ?? content}</div>
          ) : null}
        </div>
        {actions !== undefined ? <div className={classes.e('extra')}>{actions}</div> : null}
      </div>
      {children !== undefined ? <div className={classes.e('default')}>{children}</div> : null}
    </header>
  );
});

export const HPageHeader = PageHeader;
