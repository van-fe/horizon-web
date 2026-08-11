import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { AffixCommonProps } from '@aurora/core';
import { AFFIX_DEFAULTS } from '@aurora/core';
import type { AffixController, AffixRenderState, AffixTarget } from '@aurora/horizon-web-core';
import { createAffixController } from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type ReactAffixTarget = AffixTarget | (() => AffixTarget);
type SharedAffixProps = AffixCommonProps<ReactAffixTarget>;

export interface AffixProps
  extends SharedAffixProps, Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  /** 被固定的内容。 @en Content that becomes affixed. */
  children?: ReactNode;
  /** 固定状态变化。 @en Called when the affixed state changes. */
  onChange?: (affixed: boolean) => void;
}

export interface AffixHandle {
  /** 立即重新计算固定位置。 @en Immediately recalculates the affixed position. */
  updatePosition(): void;
  /** 当前内容元素。 @en Current content element. */
  readonly element: HTMLDivElement | null;
}

const EMPTY_STATE: AffixRenderState = { affixed: false, contentStyle: {} };

const AffixImplementation = forwardRef<AffixHandle, AffixProps>(function Affix(
  {
    offset = AFFIX_DEFAULTS.offset,
    position = AFFIX_DEFAULTS.position,
    target,
    zIndex,
    children,
    onChange,
    className,
    style,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('affix', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AffixController | undefined>(undefined);
  const optionsRef = useRef({ offset, position, target, zIndex, onChange });
  const previousAffixedRef = useRef(false);
  const [state, setState] = useState<AffixRenderState>(EMPTY_STATE);
  optionsRef.current = { offset, position, target, zIndex, onChange };

  useEffect(() => {
    const controller = createAffixController({
      getContent: () => contentRef.current,
      getPlaceholder: () => placeholderRef.current,
      getTarget: () => {
        const value = optionsRef.current.target;
        return typeof value === 'function' ? value() : value;
      },
      getPosition: () => optionsRef.current.position,
      getOffset: () => optionsRef.current.offset,
      getZIndex: () => optionsRef.current.zIndex,
      onStateChange: next => {
        setState(next);
        if (previousAffixedRef.current !== next.affixed) {
          previousAffixedRef.current = next.affixed;
          optionsRef.current.onChange?.(next.affixed);
        }
      },
      onTargetWarning: selector => {
        console.warn(
          `[Horizon Web] Affix target "${selector}" was not found; using window instead.`,
        );
      },
    });
    controllerRef.current = controller;
    return () => controller.destroy();
  }, []);

  useEffect(() => controllerRef.current?.updatePosition(), [offset, position, target, zIndex]);
  useImperativeHandle(
    forwardedRef,
    () => ({
      updatePosition() {
        controllerRef.current?.updatePosition();
      },
      get element() {
        return contentRef.current;
      },
    }),
    [],
  );

  return (
    <Fragment>
      {state.affixed && (
        <div
          ref={placeholderRef}
          aria-hidden="true"
          style={state.placeholderStyle as CSSProperties}
        />
      )}
      <div
        {...nativeProps}
        ref={contentRef}
        className={cls(classes.block, className)}
        style={{ ...style, ...(state.contentStyle as CSSProperties) }}
      >
        {children}
      </div>
    </Fragment>
  );
});

export const Affix = AffixImplementation as ForwardRefExoticComponent<
  AffixProps & RefAttributes<AffixHandle>
>;

Affix.displayName = 'Affix';
