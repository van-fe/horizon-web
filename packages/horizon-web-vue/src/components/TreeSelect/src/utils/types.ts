import type { Ref } from 'vue';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import type { TreeSelectEmits } from '~/components/TreeSelect/src/composables/useEmits';
import type { TreeSelectSlots } from '~/components/TreeSelect/src/composables/useSlots';
import type { TreeSelectExposes } from '~/components/TreeSelect/src/composables/useExposes';
import type HPicker from '~/components/Picker/src/Picker';
import type HTagGroup from '~/components/Tag/src/TagGroup';
import type HTree from '~/components/Tree/src/Tree';
import type {
  PickerExposes,
  PickerFitContentInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type HPickerFitContentInput from '~/components/Picker/src/components/PickerFitContentInput';
import type { TagGroupExposes } from '~/components/Tag/src/composables/useExposes';
import type { TreeExposes } from '~/components/Tree/src/composables/useExposes';

export type HTreeSelectModelValueType = Array<string | number> | string | number | null | undefined;
export type HTreeSelectModelValueSetType = Array<string | number>;

export type HTreeSelectContext = HorizonWebSetupContext<
  TreeSelectEmits,
  TreeSelectSlots,
  TreeSelectExposes
>;

export interface HTreeSelectDomRefs {
  picker: Ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | null>;
  filterInput: Ref<HorizonWebComponentInstance<
    typeof HPickerFitContentInput,
    PickerFitContentInputExposes
  > | null>;
  tagGroup: Ref<HorizonWebComponentInstance<typeof HTagGroup, TagGroupExposes> | null>;
  tree: Ref<HorizonWebComponentInstance<typeof HTree, TreeExposes> | null>;
}
