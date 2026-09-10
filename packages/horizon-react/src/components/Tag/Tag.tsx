import type { CSSProperties, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { forwardRef, useContext, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { canActivateTag, TAG_DEFAULTS, toggleTagActive } from '@aurora/core';
import { cls, ComponentClassBlock, createTagColorStyle } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Avatar } from '../Avatar';
import { Tooltip } from '../Tooltip';
import { TagGroupContext } from './context';
import { useTagRuntime } from './hooks/useTagRuntime';
import type { TagHandle, TagProps } from './types';

export const Tag = forwardRef<TagHandle, TagProps>(function Tag(
  {
    id,
    active,
    variant = TAG_DEFAULTS.variant,
    size,
    bold = TAG_DEFAULTS.bold,
    clickable = TAG_DEFAULTS.clickable,
    closable = TAG_DEFAULTS.closable,
    editable = TAG_DEFAULTS.editable,
    disabled = TAG_DEFAULTS.disabled,
    plain = TAG_DEFAULTS.plain,
    round = TAG_DEFAULTS.round,
    avatar,
    equally = TAG_DEFAULTS.equally,
    showCloseDelay = TAG_DEFAULTS.showCloseDelay,
    color,
    background,
    loading = TAG_DEFAULTS.loading,
    tooltip,
    tooltipShowAfter = TAG_DEFAULTS.tooltipShowAfter,
    tooltipHideAfter = TAG_DEFAULTS.tooltipHideAfter,
    disableTransitions = TAG_DEFAULTS.disableTransitions,
    pure = TAG_DEFAULTS.pure,
    icon,
    avatarContent,
    tooltipContent,
    tooltipOptions,
    onActiveChange,
    onClick,
    onClose,
    onDoubleClick,
    onKeyDown,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    children,
    className,
    style,
    __create = false,
    ...nativeProps
  },
  forwardedRef,
): ReactElement {
  const config = useHorizonWebConfig();
  const group = useContext(TagGroupContext);
  const classes = useMemo(
    () => new ComponentClassBlock('tag', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [showEqualClose, setShowEqualClose] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const previousValue = useRef('');
  const { mountedRef, startPress, cancelPendingClose, enterClose, leaveClose } = useTagRuntime({
    rootRef,
    contentRef,
    inputRef,
    editing,
    showCloseDelay,
    calculate: group?.calculate,
    setPressed,
    setShowEqualClose,
  });
  const effectiveSize = size ?? group?.size ?? TAG_DEFAULTS.size;
  const effectiveDisabled = group?.disabled ?? disabled;
  const effectiveEditable = group?.editable ?? editable;
  const interactive = canActivateTag({ active, clickable, disabled: effectiveDisabled });
  const activated = typeof active === 'boolean' && active;
  const showClose = closable && !effectiveDisabled && (!equally || showEqualClose);

  useImperativeHandle(
    forwardedRef,
    () => ({
      get element() {
        return rootRef.current;
      },
      edit(content) {
        const value = content ?? contentRef.current?.innerText ?? '';
        previousValue.current = value;
        setInputValue(value);
        setEditing(true);
      },
    }),
    [],
  );

  function startEdit(content?: string): void {
    if (effectiveDisabled || waiting || !effectiveEditable) return;
    const value = content ?? contentRef.current?.innerText ?? '';
    previousValue.current = value;
    setInputValue(value);
    setEditing(true);
  }

  async function commitEdit(): Promise<void> {
    if (waiting) return;
    setEditing(false);
    const nextValue = inputValue.trim();
    const oldValue = previousValue.current.trim();
    if (!nextValue || nextValue === oldValue || !group) return;
    setWaiting(true);
    await group.edit(nextValue, oldValue, id, __create);
    if (mountedRef.current) setWaiting(false);
  }

  function handleClick(event: MouseEvent<HTMLSpanElement>): void {
    cancelPendingClose();
    if (effectiveDisabled || !interactive) return;
    onClick?.(event);
    const nextActive = toggleTagActive(active);
    if (nextActive !== undefined) onActiveChange?.(nextActive);
  }

  async function handleClose(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (effectiveDisabled || waiting) return;
    if (group) {
      setWaiting(true);
      const accepted = await group.close(id);
      if (mountedRef.current) setWaiting(false);
      if (!accepted) return;
    }
    onClose?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>): void {
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive || (event.key !== 'Enter' && event.key !== ' '))
      return;
    event.preventDefault();
    rootRef.current?.click();
  }

  if (pure) return <>{children}</>;

  const colorStyle = createTagColorStyle({
    color,
    background,
    plain: plain || editing,
    disabled: effectiveDisabled,
    active: activated,
    hovered,
    pressed,
    clickable: interactive,
  });
  const root = (
    <span
      {...nativeProps}
      aria-busy={loading || waiting || undefined}
      aria-checked={typeof active === 'boolean' ? active : undefined}
      aria-disabled={effectiveDisabled || undefined}
      className={cls(
        classes.block,
        classes.m(variant || 'default', !color),
        classes.m(effectiveSize),
        classes.m('bold', bold),
        classes.m('round', round),
        classes.m('equally', equally),
        classes.is('active', activated),
        classes.is('loading', loading || waiting),
        classes.is('plain', plain || editing),
        classes.is('disabled', effectiveDisabled),
        classes.is('closable', closable),
        classes.is('clickable', interactive),
        classes.is('disable-transitions', disableTransitions),
        classes.is('show-close', showClose),
        classes.is('colorful', Boolean(color)),
        classes.is('colored', Boolean(color || variant)),
        classes.is('auto-fit-color', Boolean(color || clickable)),
        classes.is('editing', editing),
        className,
      )}
      onClick={handleClick}
      onDoubleClick={event => {
        onDoubleClick?.(event);
        if (!event.defaultPrevented) startEdit();
      }}
      onKeyDown={handleKeyDown}
      onMouseDown={event => {
        onMouseDown?.(event);
        if (event.defaultPrevented || effectiveDisabled) return;
        startPress();
      }}
      onMouseEnter={event => {
        onMouseEnter?.(event);
        setHovered(true);
        enterClose(equally, clickable);
        if (contentRef.current) {
          setOverflowing(contentRef.current.scrollWidth > contentRef.current.clientWidth);
        }
      }}
      onMouseLeave={event => {
        onMouseLeave?.(event);
        setHovered(false);
        leaveClose();
      }}
      ref={rootRef}
      role={typeof active === 'boolean' ? 'checkbox' : interactive ? 'button' : undefined}
      style={{ ...colorStyle, ...style } as CSSProperties}
      tabIndex={
        interactive && !effectiveDisabled ? (nativeProps.tabIndex ?? 0) : nativeProps.tabIndex
      }
    >
      <span className={classes.e('inner')}>
        {editing ? (
          <span className={classes.e('input-wrapper')}>
            <span aria-hidden className={classes.e('input-opacity-content')}>
              {inputValue || ' '}
            </span>
            <input
              aria-label={config.tagLabels.create}
              className={classes.e('input')}
              onBlur={() => void commitEdit()}
              onChange={event => setInputValue(event.target.value)}
              onKeyUp={event => {
                if (event.key === 'Enter') event.currentTarget.blur();
                if (event.key === 'Escape') {
                  setEditing(false);
                  setInputValue(previousValue.current);
                }
              }}
              ref={inputRef}
              value={inputValue}
            />
          </span>
        ) : waiting ? (
          <span className={classes.e('content')}>{inputValue || children}</span>
        ) : (
          <>
            {(avatar || avatarContent) && (
              <span className={classes.e('avatar')}>
                {avatarContent ?? (
                  <Avatar
                    alt=""
                    size={effectiveSize === 'large' ? 24 : effectiveSize === 'small' ? 14 : 16}
                    src={avatar}
                  />
                )}
              </span>
            )}
            {icon && <span className={classes.e('icon')}>{icon}</span>}
            {children != null && (
              <span className={classes.e('content')} ref={contentRef}>
                {children}
              </span>
            )}
            {showClose && (
              <button
                aria-label={config.tagLabels.close}
                className={cls(classes.e('icon'), classes.e('close'))}
                onClick={event => void handleClose(event)}
                type="button"
              >
                ×
              </button>
            )}
          </>
        )}
        {(loading || waiting) && (
          <span aria-hidden className={classes.e('loading')}>
            ↻
          </span>
        )}
      </span>
    </span>
  );
  const tooltipDisabled = tooltip === false || (tooltipContent == null && !tooltip && !overflowing);
  return (
    <Tooltip
      {...tooltipOptions}
      content={tooltipContent ?? (typeof tooltip === 'string' ? tooltip : children)}
      disabled={tooltipDisabled}
      enterable
      hideAfter={tooltipHideAfter}
      showAfter={tooltipShowAfter}
    >
      {root}
    </Tooltip>
  );
});
