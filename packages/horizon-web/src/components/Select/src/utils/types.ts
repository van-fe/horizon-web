import type { HorizonWebComponentInstance } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { OptionProps } from '../composables/useProps';
import type { Ref } from 'vue';
import type { PickerExposes, ScrollbarExposes, TagGroupExposes } from '~/components/exposes';
import type NPicker from '~/components/Picker';
import type NPickerFitContentInput from '~/components/Picker/src/components/NPickerFitContentInput';
import type { PickerFitContentInputExposes } from '~/components/Picker/src/composables/useExposes';
import type NScrollbar from '~/components/Scrollbar';
import type { NTagGroup } from '~/components/Tag';
import type VirtualScrollList from '../components/VirtualScrollList';
import type { SelectVirtualScrollListExposes } from '../composables/useExposes';

export const NSelectValueFormatSymbol = Symbol.for(
  generatorInjectedKeyName('select', 'value-format-symbol'),
);

export const NSelectInitialValueUndefined = Symbol.for(
  generatorInjectedKeyName('select', 'initial-value-undefined'),
);

export type ModelValueFormattedType = {
  [NSelectValueFormatSymbol]?: OptionProps['value'];
};

export type ModelValueSingleType = OptionProps['value'] | ModelValueFormattedType;
export type ModelValueType = ModelValueSingleType | undefined | null | Array<ModelValueSingleType>;

export type NSelectFilterFunction = (
  input: string,
  option: OptionProps & Record<string, unknown>,
) => boolean;

export type SelectDomRefs = {
  pickerDomRef: Ref<HorizonWebComponentInstance<typeof NPicker, PickerExposes> | undefined>;
  scrollbarDomRef: Ref<HorizonWebComponentInstance<typeof NScrollbar, ScrollbarExposes> | undefined>;
  filterInputDomRef: Ref<
    HorizonWebComponentInstance<typeof NPickerFitContentInput, PickerFitContentInputExposes> | undefined
  >;
  tagGroupDomRef: Ref<HorizonWebComponentInstance<typeof NTagGroup, TagGroupExposes> | undefined>;
  virtualScrollListDomRef: Ref<
    HorizonWebComponentInstance<typeof VirtualScrollList, SelectVirtualScrollListExposes> | undefined
  >;
};
