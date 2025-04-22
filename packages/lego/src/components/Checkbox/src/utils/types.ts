export type CheckboxUnionType = string | boolean | number;
export interface CheckboxGroupPropsProvideType {
  value?: Array<CheckboxUnionType> | false;
  changeEvent?: Function;
  blurEvent?: (evt: FocusEvent) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  viewable?: boolean;
}
