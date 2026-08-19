import type { MouseEvent as ReactMouseEvent, MouseEventHandler, ReactElement, Ref } from 'react';
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { HoverCommandMap, HoverCommonProps } from '@aurora/core';
import { HoverController } from '@aurora/core';

export interface HoverRenderState {
  /** 当前是否处于悬停状态。 @en Whether the target is currently hovered. */
  hover: boolean;
}

interface HoverTargetProps {
  onMouseEnter?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export interface HoverProps extends HoverCommonProps {
  /** 单个目标元素或返回目标元素的函数。 @en One target element or a function returning it. */
  children:
    | ReactElement<HoverTargetProps>
    | ((state: HoverRenderState) => ReactElement<HoverTargetProps>);
  /** 鼠标进入回调。 @en Called when the pointer enters the target. */
  onMouseEnter?: (event: ReactMouseEvent) => void;
  /** 鼠标移动回调。 @en Called when the pointer moves within the target. */
  onMouseMove?: (event: ReactMouseEvent) => void;
  /** 鼠标离开回调。 @en Called when the pointer leaves the target. */
  onMouseLeave?: (event: ReactMouseEvent) => void;
  /** 悬停状态变化回调。 @en Called when hover visibility changes. */
  onVisibleChange?: (visible: boolean) => void;
}

export type HoverHandle = HoverCommandMap;

function callMouseHandler(handler: MouseEventHandler | undefined, event: ReactMouseEvent): void {
  handler?.(event);
}

export const Hover = forwardRef(function Hover(
  {
    disabled,
    showDelay,
    hideDelay,
    children,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onVisibleChange,
  }: HoverProps,
  ref: Ref<HoverHandle>,
): ReactElement {
  const [hover, setHover] = useState(false);
  const onVisibleChangeRef = useRef(onVisibleChange);
  onVisibleChangeRef.current = onVisibleChange;
  const controllerRef = useRef<HoverController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new HoverController({
      disabled,
      showDelay,
      hideDelay,
      onVisibleChange: visible => {
        setHover(visible);
        onVisibleChangeRef.current?.(visible);
      },
    });
  }
  const controller = controllerRef.current;

  useEffect(() => {
    controller.setOptions({
      disabled,
      showDelay,
      hideDelay,
      onVisibleChange: visible => {
        setHover(visible);
        onVisibleChangeRef.current?.(visible);
      },
    });
  }, [controller, disabled, hideDelay, showDelay]);

  useEffect(() => () => controller.destroy(), [controller]);
  useImperativeHandle(
    ref,
    () => ({ show: () => controller.show(), hide: () => controller.hide() }),
    [controller],
  );

  const rendered = typeof children === 'function' ? children({ hover }) : children;
  const target = Children.only(rendered);
  if (!isValidElement<HoverTargetProps>(target)) {
    throw new TypeError('Hover requires one valid React element.');
  }

  return cloneElement(target, {
    onMouseEnter: event => {
      callMouseHandler(target.props.onMouseEnter, event);
      controller.requestVisible(true, 'mouse-enter');
      onMouseEnter?.(event);
    },
    onMouseMove: event => {
      callMouseHandler(target.props.onMouseMove, event);
      onMouseMove?.(event);
    },
    onMouseLeave: event => {
      callMouseHandler(target.props.onMouseLeave, event);
      controller.requestVisible(false, 'mouse-leave');
      onMouseLeave?.(event);
    },
  });
});

Hover.displayName = 'Hover';
export const HHover = Hover;
