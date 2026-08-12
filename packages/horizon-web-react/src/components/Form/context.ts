import { createContext, useContext } from 'react';
import type {
  FormFieldRegistration,
  FormHelperPlacement,
  FormHelperTheme,
  FormLabelJustifyAlignment,
  FormLabelPosition,
  FormLabelVerticalAlignment,
  FormModel,
  FormRequiredMarkPosition,
  FormRules,
  FormSize,
  FormSpacing,
  FormValidateEvent,
  FormValidateTrigger,
  ResolvedGridContainer,
} from '@aurora/core';

export interface FormContextValue {
  model: FormModel;
  rules?: FormRules;
  inline: boolean;
  size: FormSize;
  labelPosition: FormLabelPosition;
  labelJustifyAlign: FormLabelJustifyAlignment;
  labelVerticalAlign: FormLabelVerticalAlignment;
  labelWidth: 'auto' | string | number;
  showRequireMark: boolean;
  requireMarkPosition: FormRequiredMarkPosition;
  validateTrigger: FormValidateTrigger;
  onlyRender: boolean;
  helperPlacement: FormHelperPlacement;
  helperTheme: FormHelperTheme;
  disabled?: boolean;
  spacing: FormSpacing;
  requiredUseLabel: boolean;
  grid?: ResolvedGridContainer;
  autoLabelWidth: number;
  registerField(registration: FormFieldRegistration, element: HTMLElement | null): () => void;
  updateFieldElement(id: PropertyKey, element: HTMLElement | null): void;
  measureLabel(width: number): void;
  emitValidate(field: string, valid: boolean, message?: string): void;
}

export interface FormFieldContextValue {
  controlId: string;
  labelId?: string;
  disabled?: boolean;
  invalid: boolean;
  describedBy?: string;
  notify(event: FormValidateEvent): void;
}

export const FormContext = createContext<FormContextValue | null>(null);
export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/** 读取当前表单字段状态。 @en Reads the current form-field state. */
export function useFormFieldControl(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}
