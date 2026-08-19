import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  DescriptionBreakpoint,
  DescriptionItemCommonProps,
  DescriptionsCommonProps,
  DescriptionSize,
} from '@aurora/core';
import {
  DESCRIPTION_ITEM_DEFAULTS,
  DESCRIPTIONS_DEFAULTS,
  resolveDescriptionBreakpoint,
  resolveDescriptionResponsiveValue,
} from '@aurora/core';
import { createDescriptionsResizeController } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

interface DescriptionsContextValue {
  classes: ComponentClassBlock;
  type: NonNullable<DescriptionsCommonProps['type']>;
  labelPosition: NonNullable<DescriptionsCommonProps['labelPosition']>;
  width?: number;
  breakpoint?: DescriptionBreakpoint;
  labelClass?: string;
  valueClass?: string;
  labelWidth: string;
  reportLabelWidth(id: symbol, width?: number): void;
}

const DescriptionsContext = createContext<DescriptionsContextValue | undefined>(undefined);

export interface DescriptionsProps
  extends DescriptionsCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 描述项。 @en Description items. */
  children?: ReactNode;
  /** 自定义标题内容。 @en Custom title content. */
  titleContent?: ReactNode;
}

export const Descriptions = forwardRef<HTMLDivElement, DescriptionsProps>(function Descriptions(
  {
    title = DESCRIPTIONS_DEFAULTS.title,
    titleContent,
    border = DESCRIPTIONS_DEFAULTS.border,
    size,
    type = DESCRIPTIONS_DEFAULTS.type,
    column = DESCRIPTIONS_DEFAULTS.column,
    labelPosition = DESCRIPTIONS_DEFAULTS.labelPosition,
    xs,
    sm,
    md,
    lg,
    xl,
    labelClass,
    valueClass,
    children,
    className,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('descriptions', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>();
  const labelWidths = useRef(new Map<symbol, number>());
  const [labelWidth, setLabelWidth] = useState('auto');
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const controller = createDescriptionsResizeController(rootRef.current, { onResize: setWidth });
    return () => controller.destroy();
  }, []);
  const reportLabelWidth = useCallback((id: symbol, value?: number) => {
    if (value === undefined) labelWidths.current.delete(id);
    else labelWidths.current.set(id, value);
    setLabelWidth(
      labelWidths.current.size ? `${Math.max(...labelWidths.current.values())}px` : 'auto',
    );
  }, []);
  const responsiveValues = { xs, sm, md, lg, xl };
  const resolvedColumn =
    width === undefined
      ? column
      : resolveDescriptionResponsiveValue(width, column, responsiveValues);
  const resolvedSize: DescriptionSize = size ?? config.size;
  const context = useMemo<DescriptionsContextValue>(
    () => ({
      classes,
      type,
      labelPosition,
      width,
      breakpoint: width === undefined ? undefined : resolveDescriptionBreakpoint(width),
      labelClass,
      valueClass,
      labelWidth,
      reportLabelWidth,
    }),
    [classes, labelClass, labelPosition, labelWidth, reportLabelWidth, type, valueClass, width],
  );
  return (
    <DescriptionsContext.Provider value={context}>
      <div
        {...nativeProps}
        className={cls(
          classes.block,
          classes.m(type),
          type === 'vertical' && classes.e(`col-${resolvedColumn}`),
          className,
        )}
        ref={node => {
          rootRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
      >
        {titleContent !== undefined || title ? (
          <div className={cls(classes.e('title'), classes.e(`title--${resolvedSize}`))}>
            {titleContent ?? title}
          </div>
        ) : null}
        <dl
          className={cls(
            classes.e('content'),
            classes.m(resolvedSize),
            border && classes.m('border'),
          )}
          role="list"
          style={{ gridTemplateColumns: `repeat(${resolvedColumn}, 1fr)` }}
        >
          {children}
        </dl>
      </div>
    </DescriptionsContext.Provider>
  );
});

export interface DescriptionItemProps
  extends DescriptionItemCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 自定义值内容。 @en Custom value content. */
  children?: ReactNode;
  /** 自定义标签内容。 @en Custom label content. */
  labelContent?: ReactNode;
}

export const DescriptionItem = forwardRef<HTMLDivElement, DescriptionItemProps>(
  function DescriptionItem(
    {
      label = DESCRIPTION_ITEM_DEFAULTS.label,
      labelContent,
      value = DESCRIPTION_ITEM_DEFAULTS.value,
      spanCol = DESCRIPTION_ITEM_DEFAULTS.spanCol,
      spanRow = DESCRIPTION_ITEM_DEFAULTS.spanRow,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      className,
      style,
      ...nativeProps
    },
    ref,
  ): ReactElement {
    const context = useContext(DescriptionsContext);
    if (!context) throw new Error('DescriptionItem must be rendered inside Descriptions.');
    const labelRef = useRef<HTMLDivElement | null>(null);
    const labelId = useRef(Symbol('description-label'));
    useEffect(() => {
      if (!labelRef.current) return;
      const controller = createDescriptionsResizeController(labelRef.current, {
        onResize: width => {
          if (context.type === 'vertical')
            context.reportLabelWidth(labelId.current, Math.ceil(width));
        },
      });
      return () => {
        controller.destroy();
        context.reportLabelWidth(labelId.current);
      };
    }, [context.reportLabelWidth, context.type]);
    const resolvedSpan =
      context.width === undefined
        ? spanCol
        : resolveDescriptionResponsiveValue(context.width, spanCol, { xs, sm, md, lg, xl });
    return (
      <div
        {...nativeProps}
        className={cls(
          context.classes.e('item'),
          context.labelPosition === 'top' && context.classes.e('item--vertical'),
          context.labelPosition === 'top' && context.classes.e('item--top'),
          className,
        )}
        ref={ref}
        role="listitem"
        style={{
          display: context.labelPosition === 'left' ? 'flex' : 'block',
          gridColumn: `span ${resolvedSpan}`,
          gridRow: `span ${spanRow}`,
          ...style,
        }}
      >
        <dt
          className={cls(context.classes.e('label'), context.labelClass)}
          ref={labelRef}
          role="term"
          style={{ width: context.labelPosition === 'left' ? context.labelWidth : 'auto' }}
        >
          {labelContent ?? label}
        </dt>
        <dd className={cls(context.classes.e('value'), context.valueClass)} role="definition">
          {children ?? value}
        </dd>
      </div>
    );
  },
);

export const HDescriptions = Descriptions;
export const HDescriptionItem = DescriptionItem;
export type {
  DescriptionBreakpoint,
  DescriptionLabelPosition,
  DescriptionSize,
  DescriptionType,
} from '@aurora/core';
