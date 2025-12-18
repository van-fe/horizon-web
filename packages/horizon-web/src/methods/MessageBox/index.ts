import { AlertMethod } from './src/Alert';
import { ConfirmMethod } from './src/Confirm';

export const NAlert = AlertMethod;

export const NConfirm = ConfirmMethod;

export type {
  MessageBoxProps as NMessageBoxProps,
  MessageBoxConfirmProps as NMessageBoxConfirmProps,
} from './src/composables/useProps';
