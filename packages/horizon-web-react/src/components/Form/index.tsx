import type {
  CSSProperties,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  FormCommandMap,
  FormCommonProps,
  FormFieldRegistration,
  FormItemCommandMap,
  FormItemCommonProps,
  FormModel,
  FormRule,
} from '@aurora/core';
import {
  FORM_DEFAULTS,
  FORM_ITEM_DEFAULTS,
  FormController,
  FormFieldController,
  getFormPathValue,
  resolveFormRequiredMark,
  resolveFormValidateEvents,
} from '@aurora/core';
import {
  resolveGridContainerStyle,
  resolveGridItemStyle,
  scrollFormFieldIntoView,
} from '@aurora/horizon-web-core';
import { cls, ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { FormContext, FormFieldContext } from './context';

export interface FormHandle extends FormCommandMap {
  /** 原生表单元素。 @en Native form element. */
  readonly form: HTMLFormElement | null;
}

export type FormProps = FormCommonProps &
  Omit<FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit' | 'size'> & {
    /** 表单字段。 @en Form fields. */
    children?: ReactNode;
    /** 原生提交回调。 @en Native submit callback. */
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    /** 字段校验结果回调。 @en Field-validation result callback. */
    onValidate?: (field: string, valid: boolean, message?: string) => void;
  };

export interface FormItemRenderState {
  /** 当前错误。 @en Current validation error. */
  error: string;
  /** 当前字段是否无效。 @en Whether the field is invalid. */
  invalid: boolean;
  /** 表单禁用状态。 @en Form disabled state. */
  disabled?: boolean;
}

export interface FormItemHandle extends FormItemCommandMap {
  /** 原生字段容器。 @en Native field container. */
  readonly element: HTMLDivElement | null;
}

export type FormItemProps = Omit<
  FormItemCommonProps<ReactNode>,
  'error' | 'helper' | 'label' | 'tip'
> &
  Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** 字段标签。 @en Field label. */
    label?: ReactNode;
    /** 字段控件或按校验状态渲染的控件。 @en Field control or a state-aware renderer. */
    children?: ReactNode | ((state: FormItemRenderState) => ReactNode);
    /** 标签尾部内容。 @en Label trailing content. */
    labelAppend?: ReactNode;
    /** 帮助内容。 @en Helper content. */
    helper?: ReactNode;
    /** 提示内容。 @en Tip content. */
    tip?: ReactNode;
    /** 外部错误信息。 @en External error message. */
    error?: string;
    /** 自定义错误渲染。 @en Custom error renderer. */
    renderError?: (error: string) => ReactNode;
  };

export const Form = forwardRef<FormHandle, FormProps>(function Form(
  {
    model,
    inline = FORM_DEFAULTS.inline,
    cols,
    gap,
    columnGap,
    rowGap,
    align,
    justify,
    size,
    labelPosition = FORM_DEFAULTS.labelPosition,
    labelJustifyAlign = FORM_DEFAULTS.labelJustifyAlign,
    labelVerticalAlign = FORM_DEFAULTS.labelVerticalAlign,
    labelWidth = FORM_DEFAULTS.labelWidth,
    showRequireMark = FORM_DEFAULTS.showRequireMark,
    rules,
    requireMarkPosition = FORM_DEFAULTS.requireMarkPosition,
    scrollToError = FORM_DEFAULTS.scrollToError,
    preventSubmitDefault = FORM_DEFAULTS.preventSubmitDefault,
    validateOnRuleChange = FORM_DEFAULTS.validateOnRuleChange,
    validateTrigger = FORM_DEFAULTS.validateTrigger,
    onlyRender = FORM_DEFAULTS.onlyRender,
    helperPlacement = FORM_DEFAULTS.helperPlacement,
    helperTheme = FORM_DEFAULTS.helperTheme,
    disabled,
    spacing = FORM_DEFAULTS.spacing,
    requiredUseLabel = FORM_DEFAULTS.requiredUseLabel,
    children,
    onSubmit,
    onValidate,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const namespace = config.namespace.toLowerCase();
  const classes = useMemo(() => new ComponentClassBlock('form', namespace), [namespace]);
  const formRef = useRef<HTMLFormElement>(null);
  const defaultModelRef = useRef<FormModel>({});
  const resolvedModel = model ?? defaultModelRef.current;
  const fieldElements = useRef(new Map<PropertyKey, HTMLElement | null>());
  const registrations = useRef(new Map<PropertyKey, FormFieldRegistration>());
  const [autoLabelWidth, setAutoLabelWidth] = useState(0);
  const callbackRef = useRef({ onValidate, scrollToError });
  callbackRef.current = { onValidate, scrollToError };
  const controllerRef = useRef<FormController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new FormController({
      onFirstInvalid: field => {
        if (callbackRef.current.scrollToError) scrollToField(field);
      },
    });
  }
  const controller = controllerRef.current;
  controller.setOptions({
    onFirstInvalid: field => {
      if (callbackRef.current.scrollToError) scrollToField(field);
    },
  });

  const grid = useMemo(
    () =>
      cols === undefined
        ? undefined
        : resolveGridContainerStyle({ cols, gap, columnGap, rowGap, align, justify }, namespace, 1),
    [align, cols, columnGap, gap, justify, namespace, rowGap],
  );
  const resolvedSize = size ?? config.size ?? FORM_DEFAULTS.size;

  const registerField = useCallback(
    (registration: FormFieldRegistration, element: HTMLElement | null) => {
      registrations.current.set(registration.id, registration);
      fieldElements.current.set(registration.id, element);
      const unregister = controller.register(registration);
      return () => {
        unregister();
        registrations.current.delete(registration.id);
        fieldElements.current.delete(registration.id);
      };
    },
    [controller],
  );
  const updateFieldElement = useCallback((id: PropertyKey, element: HTMLElement | null) => {
    fieldElements.current.set(id, element);
  }, []);
  const measureLabel = useCallback((width: number) => {
    setAutoLabelWidth(current => Math.max(current, width));
  }, []);
  const emitValidate = useCallback((field: string, valid: boolean, message?: string) => {
    callbackRef.current.onValidate?.(field, valid, message);
  }, []);

  function findFieldElement(field: string): HTMLElement | null {
    for (const [id, element] of fieldElements.current) {
      const registration = registrations.current.get(id);
      if (registration?.field === field) return element;
    }
    return null;
  }

  function scrollToField(field: string): void {
    scrollFormFieldIntoView(findFieldElement(field));
  }

  const context = useMemo(
    () => ({
      model: resolvedModel,
      rules,
      inline,
      size: resolvedSize,
      labelPosition,
      labelJustifyAlign,
      labelVerticalAlign,
      labelWidth,
      showRequireMark,
      requireMarkPosition,
      validateTrigger,
      onlyRender,
      helperPlacement,
      helperTheme,
      disabled,
      spacing,
      requiredUseLabel,
      grid: grid?.context,
      autoLabelWidth,
      registerField,
      updateFieldElement,
      measureLabel,
      emitValidate,
    }),
    [
      autoLabelWidth,
      disabled,
      grid?.context,
      helperPlacement,
      helperTheme,
      inline,
      labelJustifyAlign,
      labelPosition,
      labelVerticalAlign,
      labelWidth,
      resolvedModel,
      emitValidate,
      measureLabel,
      onlyRender,
      requireMarkPosition,
      requiredUseLabel,
      resolvedSize,
      rules,
      registerField,
      showRequireMark,
      spacing,
      validateTrigger,
      updateFieldElement,
    ],
  );

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (validateOnRuleChange) void controller.validate().catch(() => undefined);
  }, [controller, rules, validateOnRuleChange]);

  useImperativeHandle(
    ref,
    () => ({
      get form() {
        return formRef.current;
      },
      validate: () => controller.validate(),
      validateField: fields => controller.validateField(fields),
      resetFields: fields => controller.resetFields(fields),
      scrollToField,
      clearValidate: fields => controller.clearValidate(fields),
    }),
    [controller],
  );

  return (
    <FormContext.Provider value={context}>
      <form
        {...nativeProps}
        className={cls(
          classes.block,
          classes.m('inline', inline && !grid),
          classes.m(resolvedSize),
          classes.is('grid', Boolean(grid)),
          classes.is(`position-${labelPosition}`),
          classes.is(`justify-${labelJustifyAlign}`),
          classes.is(`vertical-${labelVerticalAlign}`),
          classes.is(`spacing-${spacing}`),
          className,
        )}
        onSubmit={event => {
          if (preventSubmitDefault) event.preventDefault();
          onSubmit?.(event);
        }}
        ref={formRef}
        style={{ ...(grid?.style as CSSProperties), ...style }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});

export const FormItem = forwardRef<FormItemHandle, FormItemProps>(function FormItem(
  {
    label,
    labelPosition,
    span = FORM_ITEM_DEFAULTS.span,
    offset = FORM_ITEM_DEFAULTS.offset,
    field,
    rules,
    tip,
    helper,
    helperPlacement,
    helperTheme: _helperTheme,
    labelJustifyAlign,
    labelVerticalAlign,
    labelWidth,
    required = FORM_ITEM_DEFAULTS.required,
    requiredUseLabel,
    showRequireMark = FORM_ITEM_DEFAULTS.showRequireMark,
    error: externalError = FORM_ITEM_DEFAULTS.error,
    validateTrigger,
    children,
    labelAppend,
    renderError,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const form = useContext(FormContext);
  if (!form) throw new Error('FormItem must be rendered inside Form.');
  const formContext = form;
  const config = useHorizonWebConfig();
  const namespace = config.namespace.toLowerCase();
  const classes = useMemo(() => new ComponentClassBlock('form-item', namespace), [namespace]);
  const id = useId();
  const registrationId = useRef(Symbol('form-field')).current;
  const elementRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [validationError, setValidationError] = useState(
    formContext.onlyRender ? externalError : '',
  );
  const currentRules =
    rules ??
    (field && formContext.rules
      ? getFormPathValue<FormRule | FormRule[]>(formContext.rules, field)
      : undefined);
  const fieldControllerRef = useRef<FormFieldController | null>(null);
  if (!fieldControllerRef.current) {
    fieldControllerRef.current = new FormFieldController({ onErrorChange: setValidationError });
  }
  const fieldController = fieldControllerRef.current;
  const fieldName =
    (requiredUseLabel ?? formContext.requiredUseLabel) && typeof label === 'string' ? label : field;

  function syncController(): void {
    fieldController.setOptions({
      field,
      model: formContext.model,
      rules: currentRules,
      required,
      requiredMessage: externalError || config.formLabels.required,
      requiredName: fieldName,
      externalError,
      onlyRender: formContext.onlyRender,
      onErrorChange: setValidationError,
      onValidate: formContext.emitValidate,
    });
  }
  const syncControllerRef = useRef(syncController);
  syncControllerRef.current = syncController;

  useLayoutEffect(() => {
    syncControllerRef.current();
    fieldController.captureInitialValue();
    const registration: FormFieldRegistration = {
      id: registrationId,
      field,
      validate: () => {
        syncControllerRef.current();
        return fieldController.validate();
      },
      reset: () => {
        syncControllerRef.current();
        fieldController.reset();
      },
      clear: () => fieldController.clear(),
    };
    return form.registerField(registration, elementRef.current);
  }, [field, fieldController, form.model, form.registerField, registrationId]);

  useLayoutEffect(() => {
    form.updateFieldElement(registrationId, elementRef.current);
    if (labelRef.current) form.measureLabel(labelRef.current.scrollWidth);
  });

  useEffect(() => {
    if (!form.onlyRender) return;
    syncController();
  }, [externalError, form.onlyRender]);

  useImperativeHandle(ref, () => ({
    get element() {
      return elementRef.current;
    },
    validate: () => {
      syncController();
      return fieldController.validate();
    },
    resetFields: () => {
      syncController();
      fieldController.reset();
    },
    clearValidate: () => fieldController.clear(),
  }));

  const resolvedLabelPosition = labelPosition ?? form.labelPosition;
  const resolvedJustify = labelJustifyAlign ?? form.labelJustifyAlign;
  const resolvedVertical = labelVerticalAlign ?? form.labelVerticalAlign;
  const resolvedHelperPlacement = helperPlacement ?? form.helperPlacement;
  const resolvedLabelWidth = labelWidth ?? form.labelWidth;
  const labelStyle =
    resolvedLabelPosition === 'left'
      ? {
          width:
            resolvedLabelWidth === 'auto'
              ? form.autoLabelWidth
                ? `${form.autoLabelWidth}px`
                : 'auto'
              : typeof resolvedLabelWidth === 'number'
                ? `${resolvedLabelWidth}px`
                : resolvedLabelWidth,
        }
      : undefined;
  const requiredMark = resolveFormRequiredMark({
    formVisible: form.showRequireMark,
    fieldVisible: showRequireMark,
    label: typeof label === 'string' ? label : label === undefined ? undefined : 'label',
    field,
    rules: currentRules,
    required,
  });
  const errorId = `${id}-error`;
  const tipId = `${id}-tip`;
  const labelId = label === undefined ? undefined : `${id}-label`;
  const describedBy = validationError ? errorId : tip ? tipId : undefined;
  const renderState = {
    error: validationError,
    invalid: Boolean(validationError),
    disabled: form.disabled,
  } satisfies FormItemRenderState;
  const itemStyle = form.grid
    ? (resolveGridItemStyle({ span, offset }, form.grid, 'flex', namespace) as CSSProperties)
    : undefined;
  const fieldContext = useMemo(
    () => ({
      controlId: id,
      labelId,
      disabled: form.disabled,
      invalid: Boolean(validationError),
      describedBy,
      notify(event: 'change' | 'blur') {
        if (!resolveFormValidateEvents(validateTrigger, form.validateTrigger).includes(event))
          return;
        syncControllerRef.current();
        void fieldController.validate().catch(() => undefined);
      },
    }),
    [
      describedBy,
      fieldController,
      form.disabled,
      form.validateTrigger,
      id,
      labelId,
      validateTrigger,
      validationError,
    ],
  );

  return (
    <div
      {...nativeProps}
      className={cls(
        classes.block,
        classes.m(form.size),
        classes.is(`position-${resolvedLabelPosition}`),
        classes.is(`justify-${resolvedJustify}`),
        classes.is(`vertical-${resolvedVertical}`),
        classes.is('inline', form.inline && !form.grid),
        classes.is('grid-item', Boolean(form.grid)),
        classes.is(`spacing-${form.spacing}`),
        classes.is('error', Boolean(validationError)),
        className,
      )}
      data-field={field}
      ref={elementRef}
      style={{ ...itemStyle, ...style }}
    >
      {label !== undefined ? (
        <label
          className={classes.e('label')}
          htmlFor={id}
          id={labelId}
          ref={labelRef}
          style={labelStyle}
        >
          {resolvedHelperPlacement === 'before-label'
            ? renderHelper(helper, classes, id, resolvedHelperPlacement)
            : null}
          <span
            className={cls(
              classes.e('text'),
              classes.is('required', requiredMark),
              classes.is(`required-mark-${form.requireMarkPosition}`),
            )}
          >
            {label}
          </span>
          {resolvedHelperPlacement === 'after-label'
            ? renderHelper(helper, classes, id, resolvedHelperPlacement)
            : null}
          {labelAppend && resolvedLabelPosition === 'top' ? (
            <span className={classes.e('label-append')}>{labelAppend}</span>
          ) : null}
        </label>
      ) : null}
      <div className={classes.e('wrap')}>
        <div
          className={cls(
            classes.e('content'),
            classes.has('helper', resolvedHelperPlacement === 'right' && helper !== undefined),
          )}
        >
          <FormFieldContext.Provider value={fieldContext}>
            {typeof children === 'function' ? children(renderState) : children}
          </FormFieldContext.Provider>
          {resolvedHelperPlacement === 'right'
            ? renderHelper(helper, classes, id, resolvedHelperPlacement)
            : null}
        </div>
        <div className={classes.e('ext')}>
          {validationError ? (
            <div className={classes.e('error')} id={errorId} role="alert">
              {renderError?.(validationError) ?? validationError}
            </div>
          ) : null}
          {tip ? (
            <div className={classes.e('tip')} id={tipId}>
              {tip}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

function renderHelper(
  helper: ReactNode,
  classes: ComponentClassBlock,
  id: string,
  placement: 'right' | 'after-label' | 'before-label',
): ReactNode {
  if (helper === undefined || helper === null) return null;
  return (
    <span
      aria-describedby={`${id}-helper`}
      className={classes.em('helper', `reference-${placement}`)}
      title={typeof helper === 'string' ? helper : undefined}
    >
      <span aria-hidden="true">?</span>
      <span className={classes.em('helper', 'sr-content')} id={`${id}-helper`}>
        {helper}
      </span>
    </span>
  );
}

Form.displayName = 'Form';
FormItem.displayName = 'FormItem';
export const HForm = Object.assign(Form, { Item: FormItem });
export const HFormItem = FormItem;
export { useFormFieldControl } from './context';
export type {
  FormHelperPlacement,
  FormHelperTheme,
  FormLabelPosition,
  FormRule,
  FormRules,
  FormSpacing,
  FormValidateTrigger,
} from '@aurora/core';
