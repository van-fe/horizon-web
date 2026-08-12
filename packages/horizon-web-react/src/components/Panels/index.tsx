import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
  Children,
  Fragment,
  forwardRef,
  isValidElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import type {
  PanelCommonProps,
  PanelsCommonProps,
  PanelsKey,
  PanelsTransitionDirection,
} from '@aurora/core';
import {
  PANEL_DEFAULTS,
  PANELS_DEFAULTS,
  findEnabledPanelIndex,
  resolvePanelsTransitionDirection,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';

export type { PanelsKey, PanelsTransitionDirection } from '@aurora/core';

export interface PanelsProps
  extends PanelsCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 面板条目。 @en Composed panel items. */
  children?: ReactNode;
  /** 当前 tabpanel 的可访问名称来源。 @en Element id labelling the current tabpanel. */
  panelLabelledBy?: string;
}

export interface PanelProps
  extends PanelCommonProps, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 面板内容。 @en Panel content. */
  children?: ReactNode;
}

interface LeavingPanel {
  direction: PanelsTransitionDirection;
  element: ReactElement<PanelProps>;
  value: PanelsKey;
}

function flattenPanelElements(children: ReactNode): ReactElement<PanelProps>[] {
  return Children.toArray(children).flatMap(child => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return [];
    if (child.type === Fragment) return flattenPanelElements(child.props.children);
    return child.type === Panel ? [child as ReactElement<PanelProps>] : [];
  });
}

export const Panels = forwardRef<HTMLDivElement, PanelsProps>(function Panels(
  {
    value,
    animated = PANELS_DEFAULTS.animated,
    vertical = PANELS_DEFAULTS.vertical,
    children,
    panelLabelledBy,
    className,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('panels', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const previousValue = useRef<PanelsKey>(value);
  const previousPanel = useRef<ReactElement<PanelProps> | undefined>(undefined);
  const [leaving, setLeaving] = useState<LeavingPanel>();
  const items = flattenPanelElements(children);
  const descriptors = items.map(item => ({
    name: item.props.name,
    disabled: item.props.disabled,
  }));
  const activeIndex = findEnabledPanelIndex(descriptors, value);
  const active = activeIndex >= 0 ? items[activeIndex] : undefined;
  const direction = resolvePanelsTransitionDirection(
    descriptors,
    previousValue.current,
    value,
    vertical,
  );

  useLayoutEffect(() => {
    if (previousValue.current !== value && animated && previousPanel.current) {
      setLeaving({
        direction,
        element: previousPanel.current,
        value: previousValue.current,
      });
    } else if (previousValue.current !== value) {
      setLeaving(undefined);
    }
    previousValue.current = value;
    previousPanel.current = active;
  }, [active, animated, direction, value]);

  useEffect(() => {
    if (!leaving) return;
    const timeout = window.setTimeout(() => setLeaving(undefined), 350);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  const activeDirection = leaving?.direction ?? direction;

  return (
    <div {...nativeProps} className={cls(classes.block, className)} ref={ref}>
      {leaving ? (
        <div
          aria-hidden="true"
          className={cls(
            classes.e('panel'),
            classes.em('panel', 'animated'),
            classes.em('panel', 'leaving'),
            classes.em('panel', `leave-${leaving.direction}`),
          )}
          data-panel-value={leaving.value}
          onAnimationEnd={() => setLeaving(undefined)}
        >
          {leaving.element}
        </div>
      ) : null}
      <div
        aria-labelledby={panelLabelledBy}
        className={cls(
          classes.e('panel'),
          classes.em('panel', 'animated', Boolean(leaving)),
          classes.em('panel', activeDirection, Boolean(leaving)),
        )}
        key={String(value)}
        role="tabpanel"
      >
        {active}
      </div>
    </div>
  );
});

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { name: _name, disabled = PANEL_DEFAULTS.disabled, children, className, hidden, ...nativeProps },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('panels', config.namespace.toLowerCase()),
    [config.namespace],
  );

  return (
    <div
      {...nativeProps}
      aria-disabled={disabled || undefined}
      className={cls(classes.e('content'), className)}
      hidden={hidden}
      ref={ref}
    >
      {children}
    </div>
  );
});

export const HPanels = Panels;
export const HPanel = Panel;
