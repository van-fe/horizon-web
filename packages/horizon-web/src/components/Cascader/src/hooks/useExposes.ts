import type { VNode } from 'vue';
import type { JSX } from 'vue/jsx-runtime';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderExposes } from '../composables/useExposes';
import type { CascaderDomRefs, ModelValueSingleType } from '../utils/types';

export default function useExposes(
  context: Pick<HorizonWebSetupContext<{}, {}, CascaderExposes>, 'expose'>,
  options: {
    domRefs: CascaderDomRefs;
    confirmHandle: (hidePopper?: boolean, isTriggerByConfirmClick?: boolean) => void;
    cancelHandle: () => void;
    focusInput: () => void;
    manualControlPopperVisible: (visible: boolean) => void;
    handleClear: () => void;
    inputValue: { value: string };
    renderedModelValueTags: { value: Array<VNode | JSX.Element> };
  },
) {
  context.expose({
    confirmHandle: options.confirmHandle,
    cancelHandle: options.cancelHandle,
    setInputAble: options.focusInput,
    changePanelVisible: options.manualControlPopperVisible,
    focusOption: (valuePath: ModelValueSingleType) =>
      options.domRefs.cascaderPanelsDomRef.value?.focusOption(valuePath),
    inputChange: (value: string | null) => {
      options.inputValue.value = value || '';
    },
    clear: options.handleClear,
    renderedModelValueTags: options.renderedModelValueTags,
    focus: () => {
      options.domRefs.pickerDomRef.value?.focus();
    },
    blur: () => {
      options.domRefs.pickerDomRef.value?.forceBlur();
    },
  });
}
