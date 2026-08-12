import Schema from 'async-validator';
import type { ValidateError } from 'async-validator';
import {
  cloneFormValue,
  formatFormRequiredMessage,
  getFormPathValue,
  normalizeFormFields,
  setFormPathValue,
} from './algorithms';
import type { FormModel, FormRule } from './contract';

export interface FormValidationError {
  /** 错误消息。 @en Validation message. */
  message: string;
  /** 字段值。 @en Field value. */
  fieldValue: unknown;
  /** 字段路径。 @en Field path. */
  field: string;
}

export interface FormValidationResult {
  /** 全部错误。 @en All validation errors. */
  errors: FormValidationError[];
  /** 按字段分组的错误。 @en Validation errors grouped by field. */
  fields: Record<string, FormValidationError[]>;
}

export interface FormFieldRegistration {
  readonly id: PropertyKey;
  readonly field?: string;
  validate(): Promise<void>;
  reset(): void;
  clear(): void;
}

export interface FormControllerOptions {
  onFirstInvalid?: (field: string) => void;
}

/** 管理字段注册、批量校验、重置与清理。 @en Manages field registration, aggregate validation, reset and clearing. */
export class FormController {
  private readonly fields: FormFieldRegistration[] = [];
  private options: FormControllerOptions;

  constructor(options: FormControllerOptions = {}) {
    this.options = options;
  }

  setOptions(options: FormControllerOptions): void {
    this.options = options;
  }

  snapshot(): Readonly<{ fieldCount: number }> {
    return { fieldCount: this.fields.length };
  }

  register(field: FormFieldRegistration): () => void {
    const existing = this.fields.findIndex(item => item.id === field.id);
    if (existing >= 0) this.fields.splice(existing, 1, field);
    else this.fields.push(field);
    return () => this.unregister(field.id);
  }

  unregister(id: PropertyKey): void {
    const index = this.fields.findIndex(field => field.id === id);
    if (index >= 0) this.fields.splice(index, 1);
  }

  validate(): Promise<void> {
    return this.validateRegistrations(this.fields);
  }

  async validateField(fields: string | readonly string[]): Promise<readonly string[]> {
    const selected = normalizeFormFields(fields) ?? [];
    const registrations = this.fields.filter(item => item.field && selected.includes(item.field));
    if (!registrations.length) return selected;
    await this.validateRegistrations(registrations);
    return selected;
  }

  resetFields(fields?: string | readonly string[]): void {
    for (const field of this.select(fields)) field.reset();
  }

  clearValidate(fields?: string | readonly string[]): void {
    for (const field of this.select(fields)) field.clear();
  }

  private select(fields?: string | readonly string[]): FormFieldRegistration[] {
    const selected = normalizeFormFields(fields);
    return selected
      ? this.fields.filter(item => item.field && selected.includes(item.field))
      : this.fields.filter(item => item.field);
  }

  private async validateRegistrations(fields: readonly FormFieldRegistration[]): Promise<void> {
    if (!fields.length) return;
    const results = await Promise.allSettled(fields.map(field => field.validate()));
    const errors = results.flatMap(result =>
      result.status === 'rejected' ? normalizeValidationErrors(result.reason) : [],
    );
    if (!errors.length) return;
    this.options.onFirstInvalid?.(errors[0].field);
    throw errors;
  }
}

export interface FormFieldControllerOptions {
  field?: string;
  model?: FormModel;
  rules?: FormRule | FormRule[];
  required?: boolean;
  requiredMessage?: string;
  requiredName?: string;
  externalError?: string;
  onlyRender?: boolean;
  onErrorChange?: (error: string) => void;
  onValidate?: (field: string, valid: boolean, message?: string) => void;
}

/** 管理单个字段的值快照与异步校验状态。 @en Manages one field value snapshot and asynchronous validation state. */
export class FormFieldController {
  private options: FormFieldControllerOptions;
  private initialValue: unknown;
  private error = '';

  constructor(options: FormFieldControllerOptions = {}) {
    this.options = options;
    this.initialValue = this.readValue();
    if (options.onlyRender) this.setError(options.externalError ?? '');
  }

  snapshot(): Readonly<{ error: string }> {
    return { error: this.error };
  }

  setOptions(options: FormFieldControllerOptions): void {
    const fieldChanged =
      options.field !== this.options.field || options.model !== this.options.model;
    this.options = options;
    if (fieldChanged) this.initialValue = cloneFormValue(this.readValue());
    if (options.onlyRender) this.setError(options.externalError ?? '');
  }

  captureInitialValue(): void {
    this.initialValue = cloneFormValue(this.readValue());
  }

  validate(): Promise<void> {
    const { field, onlyRender } = this.options;
    if (onlyRender || !field) return Promise.resolve();
    const rules = this.resolveRules();
    if (!rules) return Promise.resolve();
    const value = this.readValue();
    const normalizedValue = typeof value === 'string' ? value.trim() : value;
    const schema = new Schema({ [field]: rules });
    return new Promise((resolve, reject) => {
      void schema.validate({ [field]: normalizedValue }, (errors, fields) => {
        if (!errors?.length) {
          this.setError('');
          this.options.onValidate?.(field, true, '');
          resolve();
          return;
        }
        const result = normalizeValidationResult({ errors, fields }, field, normalizedValue);
        const message = result.errors[0]?.message ?? '';
        this.setError(message);
        this.options.onValidate?.(field, false, message);
        reject(result);
      });
    });
  }

  reset(): void {
    const { field, model } = this.options;
    if (field && model) setFormPathValue(model, field, cloneFormValue(this.initialValue));
    this.clear();
  }

  clear(): void {
    this.setError('');
  }

  private resolveRules(): FormRule | FormRule[] | undefined {
    if (this.options.rules) return this.options.rules;
    if (!this.options.required) return undefined;
    return {
      required: true,
      message: formatFormRequiredMessage(
        this.options.requiredMessage ?? '{prop} is required.',
        this.options.requiredName ?? this.options.field ?? '',
      ),
    };
  }

  private readValue(): unknown {
    const { field, model } = this.options;
    return field && model ? cloneFormValue(getFormPathValue(model, field)) : undefined;
  }

  private setError(error: string): void {
    if (this.error === error) return;
    this.error = error;
    this.options.onErrorChange?.(error);
  }
}

function normalizeValidationErrors(reason: unknown): FormValidationError[] {
  if (Array.isArray(reason)) return reason.flatMap(item => normalizeValidationErrors(item));
  if (
    reason &&
    typeof reason === 'object' &&
    Array.isArray((reason as FormValidationResult).errors)
  ) {
    return (reason as FormValidationResult).errors;
  }
  return [];
}

function normalizeValidationResult(
  reason: unknown,
  fallbackField: string,
  fallbackValue: unknown,
): FormValidationResult {
  const source = reason as { errors?: ValidateError[]; fields?: Record<string, ValidateError[]> };
  const errors = (source.errors ?? []).map(error => ({
    message: String(error.message ?? ''),
    fieldValue: error.fieldValue ?? fallbackValue,
    field: error.field ?? fallbackField,
  }));
  const normalizedErrors = errors.length
    ? errors
    : [{ message: 'Validation failed', fieldValue: fallbackValue, field: fallbackField }];
  const fields = Object.fromEntries(
    Object.entries(source.fields ?? {}).map(([field, fieldErrors]) => [
      field,
      fieldErrors.map(error => ({
        message: String(error.message ?? ''),
        fieldValue: error.fieldValue ?? fallbackValue,
        field: error.field ?? field,
      })),
    ]),
  );
  if (!Object.keys(fields).length) fields[fallbackField] = normalizedErrors;
  return { errors: normalizedErrors, fields };
}
