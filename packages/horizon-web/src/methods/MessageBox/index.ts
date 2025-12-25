import { AlertMethod } from './src/Alert';
import { ConfirmMethod } from './src/Confirm';

export const HAlert = AlertMethod;

export const HConfirm = ConfirmMethod;

export type {
  MessageBoxProps as HMessageBoxProps,
  MessageBoxConfirmProps as HMessageBoxConfirmProps,
} from './src/composables/useProps';
