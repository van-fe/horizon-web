import type { ChoiceSize, ChoiceValue } from '@aurora/core';

export type CheckboxUnionType = ChoiceValue;
export interface CheckboxGroupPropsProvideType {
  value?: Array<CheckboxUnionType> | false;
  changeEvent?: Function;
  blurEvent?: (evt: FocusEvent) => void;
  disabled?: boolean;
  size?: ChoiceSize;
  viewable?: boolean;
}
