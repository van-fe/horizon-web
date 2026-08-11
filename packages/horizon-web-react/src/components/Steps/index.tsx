import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  LiHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  AdaptComponentApiShape,
  ComponentEventHandlers,
  StepCommonProps,
  StepEventMap,
  StepsBeforeChange,
  StepsCommandMap,
  StepsCommonProps,
  StepsEventMap,
} from '@aurora/core';
import {
  getStepDisplayNumber,
  getStepLayout,
  getStepNextStatus,
  getStepStatus,
  isStepClickable,
  resolveStepIndexes,
  resolveStepsBeforeChange,
  resolveStepsSelection,
  STEP_DEFAULTS,
  STEPS_DEFAULTS,
} from '@aurora/core';
import { focusStepsItem } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type {
  StepResolvedStatus,
  StepsDirection,
  StepsLabelAlign,
  StepsLabelPlacement,
  StepsSize,
  StepsStatus,
} from '@aurora/core';

type StepReactEventMap = AdaptComponentApiShape<
  StepEventMap<MouseEvent<HTMLButtonElement>>,
  { click: 'onClick' }
>;
type StepReactCallbacks = ComponentEventHandlers<StepReactEventMap>;
type StepsReactEventMap = AdaptComponentApiShape<StepsEventMap, { change: 'onChange' }>;
type StepsReactCallbacks = ComponentEventHandlers<StepsReactEventMap>;

export type StepProps = StepCommonProps<ReactNode, ReactNode, ReactNode> &
  StepReactCallbacks &
  Omit<LiHTMLAttributes<HTMLLIElement>, 'children' | 'onClick' | 'title'> & {
    /** 节点图标内容。 @en Node icon content. */
    icon?: ReactNode;
    /** 原生交互按钮属性。 @en Native interactive button attributes. */
    buttonProps?: Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'disabled' | 'onClick' | 'type'
    > & { onClick?: MouseEventHandler<HTMLButtonElement> };
  };

export type StepsProps = Omit<StepsCommonProps<StepProps>, 'beforeChange'> &
  StepsReactCallbacks &
  Omit<HTMLAttributes<HTMLOListElement>, 'children' | 'defaultValue' | 'onChange'> & {
    /** 组合的步骤条目。 @en Composed step items. */
    children?: ReactNode;
    /** 切换步骤前的异步守卫。 @en Async guard invoked before changing steps. */
    onBeforeChange?: StepsBeforeChange<StepProps>;
  };

export interface StepsHandle extends StepsCommandMap {
  /** 有序列表根元素。 @en Ordered-list root element. */
  readonly root: HTMLOListElement | null;
}

interface StepRuntimeContext {
  activeIndex: number;
  direction: NonNullable<StepsCommonProps['direction']>;
  index: number;
  itemCount: number;
  labelAlign: NonNullable<StepsCommonProps['labelAlign']>;
  labelPlacement: NonNullable<StepsCommonProps['labelPlacement']>;
  parentClickable: boolean;
  position: number;
  progressDot: boolean;
  size: NonNullable<StepsCommonProps['size']>;
  status: NonNullable<StepsCommonProps['status']>;
  requestChange: (index: number) => void;
}

interface StepInternalProps extends StepProps {
  runtime?: StepRuntimeContext;
}

const StepImpl = forwardRef<HTMLLIElement, StepInternalProps>(function Step(
  {
    title = STEP_DEFAULTS.title,
    subtitle,
    description = STEP_DEFAULTS.description,
    index: explicitIndex,
    clickable,
    disabled = STEP_DEFAULTS.disabled,
    icon,
    buttonProps,
    onClick,
    className,
    style,
    runtime,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('step', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const index = runtime?.index ?? explicitIndex ?? STEPS_DEFAULTS.initial;
  const activeIndex = runtime?.activeIndex ?? STEPS_DEFAULTS.defaultValue;
  const activeStatus = runtime?.status ?? STEPS_DEFAULTS.status;
  const parentClickable = runtime?.parentClickable ?? STEPS_DEFAULTS.clickable;
  const interactive = isStepClickable(clickable, parentClickable, disabled);
  const hasAction = clickable ?? parentClickable;
  const currentStatus = getStepStatus(index, activeIndex, activeStatus, disabled);
  const nextStatus = getStepNextStatus(index, activeIndex, activeStatus);
  const position = runtime?.position ?? 0;
  const itemCount = runtime?.itemCount ?? 1;
  const layout = getStepLayout(
    position,
    itemCount,
    runtime?.direction ?? STEPS_DEFAULTS.direction,
    runtime?.labelPlacement ?? STEPS_DEFAULTS.labelPlacement,
    runtime?.labelAlign ?? STEPS_DEFAULTS.labelAlign,
    runtime?.progressDot ?? STEPS_DEFAULTS.progressDot,
  ) as CSSProperties;
  const rootClassName = cls(
    classes.block,
    classes.is(currentStatus),
    classes.is('dot', runtime?.progressDot),
    classes.is(`next-${nextStatus}`, position < itemCount - 1),
    classes.is('clickable', interactive),
    className,
  );

  function activate(event: MouseEvent<HTMLButtonElement>): void {
    buttonProps?.onClick?.(event);
    if (event.defaultPrevented || !interactive) return;
    onClick?.(event, index);
    runtime?.requestChange(index);
  }

  let iconContent = icon;
  if (iconContent === undefined && !runtime?.progressDot) {
    if (currentStatus === 'finish') iconContent = <span aria-hidden="true">✓</span>;
    else if (currentStatus === 'error') iconContent = <span aria-hidden="true">×</span>;
    else
      iconContent = (
        <span className={classes.em('icon', 'number')}>{getStepDisplayNumber(index)}</span>
      );
  }

  const content = (
    <div className={classes.e('wrapper')}>
      <div aria-hidden="true" className={classes.e('tail')} />
      <div aria-hidden="true" className={classes.e('icon')}>
        {iconContent}
      </div>
      <div className={classes.e('content')}>
        <div className={classes.em('content', 'title')}>{title}</div>
        {subtitle !== undefined && subtitle !== null && (
          <div className={classes.em('content', 'subtitle')}>{subtitle}</div>
        )}
        {description !== undefined && description !== null && description !== '' && (
          <div className={classes.em('content', 'description')}>{description}</div>
        )}
      </div>
    </div>
  );

  return (
    <li
      {...nativeProps}
      aria-current={activeIndex === index ? 'step' : undefined}
      aria-disabled={disabled || undefined}
      className={rootClassName}
      data-index={index}
      ref={ref}
      style={{ ...layout, ...style }}
    >
      {hasAction ? (
        <button
          {...buttonProps}
          aria-current={activeIndex === index ? 'step' : undefined}
          className={cls(classes.e('action'), buttonProps?.className)}
          disabled={disabled}
          onClick={activate}
          type="button"
        >
          {content}
        </button>
      ) : (
        content
      )}
    </li>
  );
});

export const Step = StepImpl as ForwardRefExoticComponent<StepProps & RefAttributes<HTMLLIElement>>;

function flattenChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return flattenChildren(child.props.children);
    }
    return child;
  });
}

function normalizeSteps(children: ReactNode): ReactElement<StepProps>[] {
  return flattenChildren(children).filter(
    (child): child is ReactElement<StepProps> =>
      isValidElement<StepProps>(child) && child.type === Step,
  );
}

export const Steps = forwardRef<StepsHandle, StepsProps>(function Steps(
  {
    value,
    defaultValue = STEPS_DEFAULTS.defaultValue,
    direction = STEPS_DEFAULTS.direction,
    labelPlacement = STEPS_DEFAULTS.labelPlacement,
    size = STEPS_DEFAULTS.size,
    status = STEPS_DEFAULTS.status,
    progressDot = STEPS_DEFAULTS.progressDot,
    clickable = STEPS_DEFAULTS.clickable,
    controllable = STEPS_DEFAULTS.controllable,
    initial = STEPS_DEFAULTS.initial,
    labelAlign = STEPS_DEFAULTS.labelAlign,
    onBeforeChange,
    children,
    onChange,
    className,
    'aria-label': ariaLabel,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('steps', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLOListElement>(null);
  const requestVersion = useRef(0);
  const currentRef = useRef(value ?? defaultValue);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const current = value ?? uncontrolledValue;
  currentRef.current = current;
  const items = useMemo(() => normalizeSteps(children), [children]);
  const indexes = resolveStepIndexes(
    items.map(item => item.props),
    initial,
  );

  useImperativeHandle(
    ref,
    () => ({
      focus: index => void focusStepsItem(rootRef.current, index),
      get root() {
        return rootRef.current;
      },
    }),
    [],
  );

  function requestChange(next: number): void {
    const selection = resolveStepsSelection(currentRef.current, next, {
      clickable: true,
      controllable,
    });
    if (!selection.accepted) return;
    const currentAtRequest = currentRef.current;
    const version = ++requestVersion.current;
    const nextItem = items[indexes.indexOf(next)]?.props;
    const currentItem = items[indexes.indexOf(currentAtRequest)]?.props;
    void resolveStepsBeforeChange(
      onBeforeChange,
      next,
      currentAtRequest,
      nextItem,
      currentItem,
    ).then(accepted => {
      if (
        !accepted ||
        version !== requestVersion.current ||
        currentRef.current !== currentAtRequest
      )
        return;
      if (value === undefined) {
        currentRef.current = next;
        setUncontrolledValue(next);
      }
      onChange?.(next);
    });
  }

  const renderedItems = items.map((item, position) =>
    cloneElement(item as ReactElement<StepInternalProps>, {
      key: item.key ?? `step-${indexes[position]}`,
      runtime: {
        activeIndex: current,
        direction,
        index: indexes[position] ?? initial,
        itemCount: items.length,
        labelAlign,
        labelPlacement,
        parentClickable: clickable,
        position,
        progressDot,
        requestChange,
        size,
        status,
      },
    }),
  );

  return (
    <ol
      {...nativeProps}
      aria-label={ariaLabel ?? config.stepsLabels.progress}
      className={cls(
        classes.block,
        classes.is(size),
        classes.is(direction),
        classes.is('dot', progressDot),
        classes.is('clickable', clickable),
        classes.is(`label-placement-${labelPlacement}`),
        classes.is(`label-align-${labelAlign}`),
        className,
      )}
      ref={rootRef}
    >
      {renderedItems}
    </ol>
  );
});
