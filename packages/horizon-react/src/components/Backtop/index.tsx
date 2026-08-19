import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { BacktopCommonProps } from '@aurora/core';
import { BACKTOP_DEFAULTS } from '@aurora/core';
import type { BacktopScrollController, BacktopScrollTarget } from '@aurora/horizon-core';
import { createBacktopScrollController, resolveBacktopTarget } from '@aurora/horizon-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type BacktopTarget =
  | string
  | BacktopScrollTarget
  | null
  | (() => BacktopScrollTarget | null | undefined);

type SharedBacktopProps = BacktopCommonProps<BacktopTarget>;
type NativeBacktopProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick' | 'target'
>;

export interface BacktopProps extends SharedBacktopProps, NativeBacktopProps {
  /** 按钮内容。 @en Action content. */
  children?: ReactNode;
  /** 可访问名称。 @en Accessible name. */
  ariaLabel?: string;
  /** 按钮被激活。 @en Called when the action is activated. */
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

export interface BacktopHandle {
  /** 平滑滚动到顶部。 @en Smoothly scrolls to the top. */
  scrollToTop(): void;
  /** 聚焦返回顶部按钮。 @en Focuses the return-to-top action. */
  focus(): void;
  /** 当前按钮元素。 @en Current action element. */
  readonly element: HTMLButtonElement | null;
}

function DefaultBacktopIcon(): ReactElement {
  return (
    <svg aria-hidden="true" height="16" viewBox="0 0 24 24" width="16">
      <path
        d="m6 10 6-6 6 6M12 4v16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function resolveTarget(target: BacktopTarget | undefined): BacktopScrollTarget {
  const value = typeof target === 'function' ? target() : target;
  if (typeof value === 'string' || value == null) {
    return resolveBacktopTarget(value ?? undefined, document);
  }
  return value;
}

const BacktopImplementation = forwardRef<BacktopHandle, BacktopProps>(function Backtop(
  {
    visibilityHeight = BACKTOP_DEFAULTS.visibilityHeight,
    bottom = BACKTOP_DEFAULTS.bottom,
    right = BACKTOP_DEFAULTS.right,
    target,
    children,
    ariaLabel,
    className,
    style,
    onClick,
    ...nativeProps
  },
  forwardedRef,
): ReactElement | null {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('backtop', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const actionRef = useRef<HTMLButtonElement>(null);
  const controllerRef = useRef<BacktopScrollController | undefined>(undefined);
  const thresholdRef = useRef(visibilityHeight);
  const [visible, setVisible] = useState(false);
  thresholdRef.current = visibilityHeight;

  useEffect(() => {
    const controller = createBacktopScrollController(resolveTarget(target), {
      getVisibilityHeight: () => thresholdRef.current,
      onVisibilityChange: setVisible,
    });
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      if (controllerRef.current === controller) controllerRef.current = undefined;
    };
  }, [target]);

  useEffect(() => controllerRef.current?.sync(), [visibilityHeight]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      scrollToTop() {
        controllerRef.current?.scrollToTop();
      },
      focus() {
        actionRef.current?.focus();
      },
      get element() {
        return actionRef.current;
      },
    }),
    [],
  );

  if (!visible) return null;
  return (
    <button
      {...nativeProps}
      ref={actionRef}
      type="button"
      aria-label={ariaLabel ?? config.backtopLabels.button}
      className={cls(classes.block, className)}
      style={{ bottom, right, ...style }}
      onClick={event => {
        event.stopPropagation();
        controllerRef.current?.scrollToTop();
        onClick?.(event);
      }}
    >
      {children ?? <DefaultBacktopIcon />}
    </button>
  );
});

export const Backtop = BacktopImplementation as ForwardRefExoticComponent<
  BacktopProps & RefAttributes<BacktopHandle>
>;

Backtop.displayName = 'Backtop';
