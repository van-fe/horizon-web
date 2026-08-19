import type { AdaptComponentApiShape, ComponentEventValidators, InputEventMap } from '@aurora/core';
import { isInputString } from '@aurora/core';

type InputVueEventMap = AdaptComponentApiShape<
  InputEventMap<Event, MouseEvent, FocusEvent, KeyboardEvent, CompositionEvent>,
  {
    valueChange: 'update:modelValue';
    keyDown: 'keydown';
    keyPress: 'keypress';
    keyUp: 'keyup';
    compositionStart: 'compositionstart';
    compositionUpdate: 'compositionupdate';
    compositionEnd: 'compositionend';
  }
>;

export const useInputEmits = {
  /** 更新绑定值。@en Updates the bound value. */
  'update:modelValue': (value: string) => isInputString(value),
  /** 点击原生输入。@en Native input clicked. */
  click: (event: MouseEvent) => event instanceof MouseEvent,
  /** 收到输入。@en Input received. */
  input: (value: string, event: Event) => isInputString(value) && event instanceof Event,
  /** 值提交变化。@en Value change committed. */
  change: (value: string) => isInputString(value),
  /** 获得焦点。@en Input focused. */
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  /** 失去焦点。@en Input blurred. */
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  /** 值已清空。@en Value cleared. */
  clear: () => true,
  /** 按键按下。@en Key pressed down. */
  keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent,
  /** 按键输入。@en Key pressed. */
  keypress: (event: KeyboardEvent) => event instanceof KeyboardEvent,
  /** 按键抬起。@en Key released. */
  keyup: (event: KeyboardEvent) => event instanceof KeyboardEvent,
  /** 组合输入开始。@en Composition started. */
  compositionstart: (event: CompositionEvent) => event instanceof CompositionEvent,
  /** 组合输入更新。@en Composition updated. */
  compositionupdate: (event: CompositionEvent) => event instanceof CompositionEvent,
  /** 组合输入结束。@en Composition ended. */
  compositionend: (event: CompositionEvent) => event instanceof CompositionEvent,
} satisfies ComponentEventValidators<InputVueEventMap>;

export type InputEmits = typeof useInputEmits;
