import type { NSuitPad } from './SuitPad';
import type { NModalCascader } from './ModalCascader';
import type { NModalPicker } from './ModalPicker';
import type { NModalSelect } from './ModalSelect';
import type { NModalTimePicker } from './ModalTimePicker';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NSuitPad: typeof NSuitPad;
    NModalCascader: typeof NModalCascader;
    NModalPicker: typeof NModalPicker;
    NModalSelect: typeof NModalSelect;
    NModalTimePicker: typeof NModalTimePicker;
  }
}
