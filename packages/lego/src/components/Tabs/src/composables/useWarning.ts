import { useDeprecatedWarnProperty } from '@nio-fe/shared';
import { type ToRefs } from 'vue';
import { type TabProps, type TabsProps } from './useProps';

export function useTabsPropsLogWarnProperty(props: ToRefs<TabsProps>) {
  useDeprecatedWarnProperty(props.type, value => value === 'segment', 'type', 'NSegmented');
  useDeprecatedWarnProperty(props.modelValue, value => !!value, 'modelValue', 'activeKey');
  useDeprecatedWarnProperty(props.showUnderline, value => !!value, 'showUnderline', 'underline');
  useDeprecatedWarnProperty(props.showAdd, value => !!value, 'showAdd', 'editable');
}

export function useTabPropsLogWarnProperty(props: ToRefs<TabProps>) {
  useDeprecatedWarnProperty(props.minWidth, value => !!value, 'minWidth', 'style');
  useDeprecatedWarnProperty(props.maxWidth, value => !!value, 'maxWidth', 'style');
  useDeprecatedWarnProperty(props.showClose, value => value === true, 'showClose', 'closable');
}
