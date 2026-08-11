import type { ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type {
  TypographyCommandMap,
  TypographyCommonProps,
  TypographyEventMap,
  TypographyRegionMap,
} from '@aurora/core';
import {
  resolveTypographyEllipsisLines,
  resolveTypographyTag,
  TYPOGRAPHY_DEFAULTS,
} from '@aurora/core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button } from '../Button';
import type { ReactEventHandler, ReactRegionContent } from '../_shared/api';

export type TypographyHandle = TypographyCommandMap;

export interface TypographyProps
  extends
    TypographyCommonProps,
    Omit<
      HTMLAttributes<HTMLElement>,
      'children' | 'defaultValue' | 'onChange' | 'onCopy' | 'prefix'
    > {
  /** 文本内容。@en Text content. */
  children?: ReactRegionContent<TypographyRegionMap, 'content'>;
  /** 前置内容。@en Leading content. */
  prefix?: ReactRegionContent<TypographyRegionMap, 'prefix'>;
  /** 后置内容。@en Trailing content. */
  suffix?: ReactRegionContent<TypographyRegionMap, 'suffix'>;
  /** 文本值变化回调。@en Called when the text value changes. */
  onValueChange?: ReactEventHandler<TypographyEventMap, 'valueChange'>;
  /** 编辑提交回调。@en Called when editing is committed. */
  onChange?: ReactEventHandler<TypographyEventMap, 'change'>;
  /** 复制完成回调。@en Called after a copy attempt. */
  onCopy?: ReactEventHandler<TypographyEventMap, 'copy'>;
}

export const Typography = forwardRef<TypographyHandle, TypographyProps>(function Typography(
  {
    value,
    defaultValue = TYPOGRAPHY_DEFAULTS.defaultValue,
    tag = TYPOGRAPHY_DEFAULTS.tag,
    level,
    variant = TYPOGRAPHY_DEFAULTS.variant,
    size = TYPOGRAPHY_DEFAULTS.size,
    weight = TYPOGRAPHY_DEFAULTS.weight,
    block = TYPOGRAPHY_DEFAULTS.block,
    italic = TYPOGRAPHY_DEFAULTS.italic,
    underline = TYPOGRAPHY_DEFAULTS.underline,
    deleted = TYPOGRAPHY_DEFAULTS.deleted,
    code = TYPOGRAPHY_DEFAULTS.code,
    ellipsis = TYPOGRAPHY_DEFAULTS.ellipsis,
    copyable = TYPOGRAPHY_DEFAULTS.copyable,
    editable = TYPOGRAPHY_DEFAULTS.editable,
    disabled = TYPOGRAPHY_DEFAULTS.disabled,
    prefix,
    suffix,
    onValueChange,
    onChange,
    onCopy,
    children,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('typography', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const controlled = value !== undefined;
  const textValue = controlled ? value : internalValue;

  useEffect(() => {
    if (controlled && !editing) setDraft(value);
  }, [controlled, editing, value]);

  function currentText(): string {
    if (controlled || internalValue !== '') return textValue;
    return contentRef.current?.textContent ?? '';
  }

  function edit(): void {
    if (!editable || disabled) return;
    setDraft(currentText());
    setEditing(true);
    queueMicrotask(() => inputRef.current?.focus());
  }

  function cancelEdit(): void {
    setDraft(currentText());
    setEditing(false);
  }

  function commitEdit(): void {
    if (!editing) return;
    if (!controlled) setInternalValue(draft);
    setEditing(false);
    onValueChange?.(draft);
    onChange?.(draft);
  }

  async function copy(): Promise<boolean> {
    if (disabled) return false;
    const copiedValue = currentText();
    let success = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(copiedValue);
        success = true;
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = copiedValue;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.append(textarea);
        textarea.select();
        success = document.execCommand('copy');
        textarea.remove();
      }
    } catch {
      success = false;
    }
    onCopy?.(copiedValue, success);
    return success;
  }

  useImperativeHandle(ref, () => ({ edit, cancelEdit, copy }));

  if (editing) {
    return (
      <input
        aria-label="Edit text"
        className={classes.e('editor')}
        onBlur={commitEdit}
        onInput={event => setDraft(event.currentTarget.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.nativeEvent.isComposing) commitEdit();
          if (event.key === 'Escape') cancelEdit();
        }}
        ref={inputRef}
        value={draft}
      />
    );
  }

  const Root = resolveTypographyTag(tag, level) as ElementType;
  const lines = resolveTypographyEllipsisLines(ellipsis);
  const renderedContent: ReactNode = controlled || internalValue !== '' ? textValue : children;
  return (
    <Root
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(variant),
        classes.m(size),
        classes.m(weight),
        classes.m(`heading-${level}`, level !== undefined),
        classes.is('block', block || level !== undefined),
        classes.is('italic', italic),
        classes.is('underline', underline),
        classes.is('deleted', deleted),
        classes.is('code', code),
        classes.is('ellipsis', lines > 0),
        classes.is('disabled', disabled),
        className,
      )}
      style={{
        ...(style ?? {}),
        ...(lines > 1 ? { WebkitLineClamp: lines, '--h-typography-size-lines': lines } : {}),
      }}
    >
      {prefix}
      <span className={classes.e('content')} ref={contentRef}>
        {renderedContent}
      </span>
      {suffix}
      {copyable || editable ? (
        <span className={classes.e('actions')}>
          {copyable ? (
            <Button
              aria-label="Copy"
              disabled={disabled}
              link
              onClick={() => void copy()}
              size="small"
              variant="normal"
            >
              Copy
            </Button>
          ) : null}
          {editable ? (
            <Button
              aria-label="Edit"
              disabled={disabled}
              link
              onClick={edit}
              size="small"
              variant="normal"
            >
              Edit
            </Button>
          ) : null}
        </span>
      ) : null}
    </Root>
  );
});

export const HTypography = Typography;
export type {
  TypographyEllipsis,
  TypographyLevel,
  TypographySize,
  TypographyVariant,
  TypographyWeight,
} from '@aurora/core';
