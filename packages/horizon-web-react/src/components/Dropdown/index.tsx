import type {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type {
  DropdownCommandMap,
  DropdownCommonProps,
  DropdownGroupCommonProps,
  DropdownItemCommonProps,
  DropdownSubmenuCommonProps,
  TooltipChangeDetails,
} from '@aurora/core';
import {
  DROPDOWN_DEFAULTS,
  DROPDOWN_SUBMENU_DEFAULTS,
  resolveDropdownPlacement,
  TooltipOpenController,
} from '@aurora/core';
import {
  createPopoverDismissableLayer,
  focusDropdownItem,
  resolveDropdownContextMenuPosition,
  resolvePortalContainer,
  type PortalTarget,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { PopContent, Popover } from '../Popover';
import { useHorizonWebConfig } from '../../provider';

export type {
  DropdownAlign,
  DropdownSize,
  DropdownSubmenuTrigger,
  DropdownTheme,
  DropdownTrigger,
} from '@aurora/core';

type TriggerElement = ReactElement<HTMLAttributes<HTMLElement>>;

export type DropdownProps = DropdownCommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    children: TriggerElement;
    menu: ReactNode;
    portalContainer?: PortalTarget;
    popperClassName?: string;
    onOpenChange?: (open: boolean, details: TooltipChangeDetails) => void;
    onCommand?: (command: unknown) => void;
  };

export interface DropdownHandle extends DropdownCommandMap {}

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement>;
export type DropdownGroupProps = DropdownGroupCommonProps &
  HTMLAttributes<HTMLDivElement> & { titleContent?: ReactNode };
export type DropdownItemProps = DropdownItemCommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    children?: ReactNode;
    icon?: ReactNode;
    onPress?: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
  };
export type DropdownSubmenuProps = DropdownSubmenuCommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'> & {
    children?: ReactNode;
    icon?: ReactNode;
    submenu: ReactNode;
    onPress?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  };

interface DropdownContextValue {
  close: () => void;
  command: (command: unknown) => void;
  size: 'small' | 'medium';
  submenuLeft: boolean;
  theme: 'default' | 'gray' | 'midnight';
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);
const exclusiveClosers = new Set<() => void>();

function useClasses(block: string): ComponentClassBlock {
  const config = useHorizonWebConfig();
  return useMemo(
    () => new ComponentClassBlock(block, config.namespace.toLowerCase()),
    [block, config.namespace],
  );
}

export const Dropdown = forwardRef<DropdownHandle, DropdownProps>(function Dropdown(
  {
    children,
    menu,
    theme = DROPDOWN_DEFAULTS.theme,
    trigger = DROPDOWN_DEFAULTS.trigger,
    open,
    defaultOpen = DROPDOWN_DEFAULTS.defaultOpen,
    size = DROPDOWN_DEFAULTS.size,
    disabled = DROPDOWN_DEFAULTS.disabled,
    align = DROPDOWN_DEFAULTS.align,
    placement,
    zIndex = 1000,
    width,
    submenuLeft = DROPDOWN_DEFAULTS.submenuLeft,
    portal = DROPDOWN_DEFAULTS.portal,
    showDelay = DROPDOWN_DEFAULTS.showDelay,
    hideDelay = DROPDOWN_DEFAULTS.hideDelay,
    distance = DROPDOWN_DEFAULTS.distance,
    exclusive = DROPDOWN_DEFAULTS.exclusive,
    hideEvent = DROPDOWN_DEFAULTS.hideEvent,
    portalContainer = 'body',
    popperClassName,
    onOpenChange,
    onCommand,
    className,
    onKeyDown,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  if (!isValidElement(children)) throw new Error('Dropdown requires one valid trigger element.');
  const classes = useClasses('dropdown');
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [contextPosition, setContextPosition] = useState<{ x: number; y: number }>();
  const [portalElement, setPortalElement] = useState<Element>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const controlledRef = useRef(open !== undefined);
  const callbackRef = useRef(onOpenChange);
  controlledRef.current = open !== undefined;
  callbackRef.current = onOpenChange;
  const currentOpen = !disabled && (open ?? uncontrolledOpen);
  const controllerRef = useRef<TooltipOpenController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new TooltipOpenController({
      disabled,
      hideDelay,
      open: currentOpen,
      showDelay,
      onOpenChange: (nextOpen, details) => {
        if (!controlledRef.current) setUncontrolledOpen(nextOpen);
        callbackRef.current?.(nextOpen, details);
      },
    });
  }
  const controller = controllerRef.current;

  useEffect(() => {
    controller.setOptions({ disabled, hideDelay, showDelay });
    controller.syncOpen(currentOpen);
  }, [controller, currentOpen, disabled, hideDelay, showDelay]);
  useEffect(() => () => controller.destroy(), [controller]);
  useEffect(() => {
    setPortalElement(resolvePortalContainer(portalContainer, wrapperRef.current?.ownerDocument));
  }, [portalContainer]);

  const close = useCallback(() => controller.closeImmediately('imperative'), [controller]);
  useEffect(() => {
    if (!currentOpen || !exclusive) return;
    for (const closeOther of exclusiveClosers) if (closeOther !== close) closeOther();
    exclusiveClosers.add(close);
    return () => {
      exclusiveClosers.delete(close);
    };
  }, [close, currentOpen, exclusive]);

  useEffect(() => {
    if (trigger !== 'context-menu' || !currentOpen || !menuRef.current) return;
    return createPopoverDismissableLayer({
      floating: menuRef.current,
      reference: wrapperRef.current,
      eventName: hideEvent,
      onDismiss: reason => {
        controller.closeImmediately(reason);
        if (reason === 'escape') {
          wrapperRef.current?.querySelector<HTMLElement>('[aria-haspopup="menu"]')?.focus();
        }
      },
    });
  }, [controller, currentOpen, hideEvent, trigger]);

  const focusFirst = () => focusDropdownItem(menuRef.current!, 'Home');
  useImperativeHandle(forwardedRef, () => ({
    open: () => controller.openImmediately(),
    close,
    focusFirst,
  }));

  const context: DropdownContextValue = {
    close,
    command(command) {
      if (command !== undefined) onCommand?.(command);
      close();
    },
    size,
    submenuLeft,
    theme,
  };
  const menuStyle = {
    ...(width === undefined
      ? undefined
      : { '--h-dropdown-size-container-width': typeof width === 'number' ? `${width}px` : width }),
  } as CSSProperties;
  const menuContent = (
    <DropdownContext.Provider value={context}>
      <PopContent
        className={cls(
          classes.e('inner'),
          classes.em('inner', theme),
          classes.em('inner', size),
          popperClassName,
        )}
        hidden={!currentOpen}
        ref={menuRef}
        style={menuStyle}
      >
        {menu}
      </PopContent>
    </DropdownContext.Provider>
  );

  const handleNavigation = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === 'Escape' && currentOpen) {
      event.preventDefault();
      close();
      wrapperRef.current?.querySelector<HTMLElement>('[aria-haspopup="menu"]')?.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (!currentOpen) {
      controller.openImmediately('imperative');
      queueMicrotask(focusFirst);
    } else {
      focusDropdownItem(menuRef.current!, event.key as 'ArrowDown' | 'ArrowUp' | 'Home' | 'End');
    }
  };

  if (trigger === 'context-menu') {
    const triggerElement = cloneElement(children, {
      'aria-expanded': currentOpen,
      'aria-haspopup': 'menu',
      onContextMenu: (event: MouseEvent<HTMLElement>) => {
        children.props.onContextMenu?.(event);
        if (event.defaultPrevented || disabled) return;
        event.preventDefault();
        const position = resolveDropdownContextMenuPosition(event.clientX, event.clientY);
        setContextPosition({ x: position.x, y: position.y });
        controller.openImmediately('click');
      },
    });
    const floating = (
      <div
        style={{
          left: 0,
          position: 'fixed',
          top: 0,
          transform: `translate(${contextPosition?.x ?? 0}px, ${contextPosition?.y ?? 0}px)`,
          zIndex,
        }}
      >
        {menuContent}
      </div>
    );
    return (
      <div
        {...nativeProps}
        className={cls(classes.block, classes.m(theme), className)}
        onKeyDown={handleNavigation}
        ref={wrapperRef}
      >
        {triggerElement}
        {currentOpen
          ? portal && portalElement
            ? createPortal(floating, portalElement)
            : floating
          : null}
      </div>
    );
  }

  return (
    <div
      {...nativeProps}
      className={cls(classes.block, classes.m(theme), classes.m(size), className)}
      data-placement={resolveDropdownPlacement(placement, align)}
      onKeyDown={handleNavigation}
      ref={wrapperRef}
    >
      <Popover
        arrow={false}
        content={menuContent}
        disabled={disabled}
        distance={distance}
        hideDelay={hideDelay}
        hideEvent={hideEvent}
        onOpenChange={(nextOpen, details) => {
          if (nextOpen) controller.openImmediately(details.reason);
          else controller.closeImmediately(details.reason);
        }}
        open={currentOpen}
        placement={resolveDropdownPlacement(placement, align)}
        portal={portal}
        portalContainer={portalContainer}
        showDelay={showDelay}
        stopPropagation
        trigger={trigger}
        zIndex={zIndex}
      >
        {cloneElement(children, { 'aria-haspopup': 'menu' })}
      </Popover>
    </div>
  );
});

export function DropdownMenu({ className, children, ...props }: DropdownMenuProps): ReactElement {
  const classes = useClasses('dropdown-menu');
  return (
    <div {...props} className={cls(classes.block, className)} role="menu">
      {children}
    </div>
  );
}

export function DropdownGroup({
  title,
  titleContent,
  className,
  children,
  ...props
}: DropdownGroupProps): ReactElement {
  const classes = useClasses('dropdown-group');
  const labelId = useId();
  const heading = titleContent ?? title;
  return (
    <div
      {...props}
      aria-labelledby={heading ? labelId : undefined}
      className={cls(classes.block, classes.has('title', Boolean(heading)), className)}
      role="group"
    >
      {heading ? (
        <div className={classes.e('title')} id={labelId}>
          {heading}
        </div>
      ) : null}
      <div className={classes.e('inner')}>{children}</div>
    </div>
  );
}

export function DropdownItem({
  disabled = false,
  active = false,
  allowImmediatePropagation = false,
  command,
  divided = false,
  icon,
  children,
  className,
  onPress,
  ...props
}: DropdownItemProps): ReactElement {
  const classes = useClasses('dropdown-item');
  const context = useContext(DropdownContext);
  const activate = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    onPress?.(event);
    context?.command(command);
    if (!allowImmediatePropagation) event.nativeEvent.stopImmediatePropagation();
  };
  return (
    <div
      {...props}
      className={cls(
        classes.block,
        classes.is('active', active),
        classes.is('disabled', disabled),
        classes.is('divided', divided),
        className,
      )}
      role="none"
    >
      <button
        aria-disabled={disabled}
        className={classes.e('inner')}
        disabled={disabled}
        onClick={activate}
        role="menuitem"
        type="button"
      >
        {icon ? <span className={classes.e('icon')}>{icon}</span> : null}
        <span className={classes.e('content')}>{children}</span>
      </button>
    </div>
  );
}

export function DropdownSubmenu({
  disabled = false,
  title,
  active = false,
  trigger = DROPDOWN_SUBMENU_DEFAULTS.trigger,
  selected = false,
  icon,
  submenu,
  children,
  className,
  onPress,
  ...props
}: DropdownSubmenuProps): ReactElement {
  const classes = useClasses('dropdown-submenu');
  const context = useContext(DropdownContext);
  const [open, setOpen] = useState(false);
  const label = children ?? title;
  return (
    <div
      {...props}
      className={cls(
        classes.block,
        classes.is('active', active),
        classes.is('selected', selected),
        classes.is('disabled', disabled),
        className,
      )}
    >
      <Popover
        arrow={false}
        content={
          <PopContent className={classes.e('inner')}>
            <DropdownMenu>{submenu}</DropdownMenu>
          </PopContent>
        }
        destroyOnHide={false}
        disabled={disabled}
        distance={2}
        onOpenChange={setOpen}
        open={open}
        placement={context?.submenuLeft ? 'left-start' : 'right-start'}
        portal={false}
        trigger={trigger}
      >
        <button
          aria-disabled={disabled}
          aria-expanded={open}
          aria-haspopup="menu"
          className={classes.em('item', 'inner')}
          disabled={disabled}
          onClick={event => onPress?.(event)}
          role="menuitem"
          type="button"
        >
          <span className={classes.em('item', 'content')}>
            {icon ? <span className={classes.em('item', 'icon')}>{icon}</span> : null}
            <span className={classes.em('item', 'title')}>{label}</span>
          </span>
          <span aria-hidden className={classes.em('item', 'arrow')}>
            ›
          </span>
        </button>
      </Popover>
    </div>
  );
}

export const HDropdown = Dropdown;
export const HDropdownMenu = DropdownMenu;
export const HDropdownGroup = DropdownGroup;
export const HDropdownItem = DropdownItem;
export const HDropdownSubmenu = DropdownSubmenu;
