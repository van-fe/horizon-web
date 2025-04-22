import { isString } from '@nio-fe/shared';

export const useControlsEmits = {
  /**
   * 点击 `n-control` 后触发
   * @param label `n-control` 的 `props.label`
   * @param evt 鼠标事件或键盘事件
   */
  command: (label: string, evt: Event) => isString(label) && evt instanceof Event,
};

export const useControlEmits = {};

export type ControlsEmits = typeof useControlsEmits;
export type ControlEmits = typeof useControlEmits;
