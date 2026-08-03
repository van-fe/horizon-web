import { isString } from '@aurora/utils';

export const useControlsEmits = {
  /**
   * 点击 `h-control` 后触发
   * @param label `h-control` 的 `props.label`
   * @paramEn label The label value.
   * @param evt 鼠标事件或键盘事件
   * @paramEn evt The evt value.
    * @en Emitted when command changes.
   */
  command: (label: string, evt: Event) => isString(label) && evt instanceof Event,
};

export const useControlEmits = {};

export type ControlsEmits = typeof useControlsEmits;
export type ControlEmits = typeof useControlEmits;
