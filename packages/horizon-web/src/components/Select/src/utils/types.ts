import type { HorizonWebComponentInstance } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { OptionProps } from '../composables/useProps';
import type { Ref } from 'vue';
import type { PickerExposes, ScrollbarExposes, TagGroupExposes } from '~/components/exposes';
import type HPicker from '~/components/Picker';
import type HPickerFitContentInput from '~/components/Picker/src/components/PickerFitContentInput';
import type { PickerFitContentInputExposes } from '~/components/Picker/src/composables/useExposes';
import type HScrollbar from '~/components/Scrollbar';
import type { HTagGroup } from '~/components/Tag';
import type VirtualScrollList from '../components/VirtualScrollList';
import type { SelectVirtualScrollListExposes } from '../composables/useExposes';

export const HSelectValueFormatSymbol = Symbol.for(
  generatorInjectedKeyName('select', 'value-format-symbol'),
);

export const HSelectInitialValueUndefined = Symbol.for(
  generatorInjectedKeyName('select', 'initial-value-undefined'),
);

export type ModelValueFormattedType = {
  [HSelectValueFormatSymbol]?: OptionProps['value'];
};

export type ModelValueSingleType = OptionProps['value'] | ModelValueFormattedType;
export type ModelValueType = ModelValueSingleType | undefined | null | Array<ModelValueSingleType>;

export type HSelectFilterFunction = (
  input: string,
  option: OptionProps & Record<string, unknown>,
) => boolean;

export type SelectDomRefs = {
  pickerDomRef: Ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | undefined>;
  scrollbarDomRef: Ref<HorizonWebComponentInstance<typeof HScrollbar, ScrollbarExposes> | undefined>;
  filterInputDomRef: Ref<
    HorizonWebComponentInstance<typeof HPickerFitContentInput, PickerFitContentInputExposes> | undefined
  >;
  tagGroupDomRef: Ref<HorizonWebComponentInstance<typeof HTagGroup, TagGroupExposes> | undefined>;
  virtualScrollListDomRef: Ref<
    HorizonWebComponentInstance<typeof VirtualScrollList, SelectVirtualScrollListExposes> | undefined
  >;
};
