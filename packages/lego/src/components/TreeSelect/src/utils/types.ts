import type { Ref } from 'vue';
import type { LegoSetupContext, LegoComponentInstance } from '@nio-fe/shared';
import type { TreeSelectEmits } from '~/components/TreeSelect/src/composables/useEmits';
import type { TreeSelectSlots } from '~/components/TreeSelect/src/composables/useSlots';
import type { TreeSelectExposes } from '~/components/TreeSelect/src/composables/useExposes';
import type { NPicker } from '~/components/Picker';
import type { NTagGroup } from '~/components/Tag';
import type { NTree } from '~/components/Tree';
import type {
  PickerExposes,
  PickerFitContentInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type NPickerFitContentInput from '~/components/Picker/src/components/NPickerFitContentInput';
import type { TagGroupExposes } from '~/components/Tag/src/composables/useExposes';
import type { TreeExposes } from '~/components/Tree/src/composables/useExposes';

export type NTreeSelectModelValueType = Array<string | number> | string | number | null | undefined;
export type NTreeSelectModelValueSetType = Array<string | number>;

export type NTreeSelectContext = LegoSetupContext<
  TreeSelectEmits,
  TreeSelectSlots,
  TreeSelectExposes
>;

export interface NTreeSelectDomRefs {
  picker: Ref<LegoComponentInstance<typeof NPicker, PickerExposes> | null>;
  filterInput: Ref<LegoComponentInstance<
    typeof NPickerFitContentInput,
    PickerFitContentInputExposes
  > | null>;
  tagGroup: Ref<LegoComponentInstance<typeof NTagGroup, TagGroupExposes> | null>;
  tree: Ref<LegoComponentInstance<typeof NTree, TreeExposes> | null>;
}
