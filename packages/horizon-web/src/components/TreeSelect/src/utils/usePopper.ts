import type { Ref, ToRefs } from 'vue';
import { provide, ref, watch } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import { NTreeSelectPopperVisibleInjectKey } from './injectKeys';
import type { NTreeSelectContext, NTreeSelectDomRefs } from './types';
import type { NTreeUuidType } from '~/components/Tree/src/utils/types';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: NTreeSelectContext,
  domRefs: NTreeSelectDomRefs,
  modelValueSet: Ref<Set<NTreeUuidType>>,
) {
  const popperVisible = ref(false);

  function controlPopperVisible(visible: boolean) {
    if (visible) {
      domRefs.picker.value?.show();
    } else {
      domRefs.picker.value?.hide();
    }
  }

  watch(popperVisible, val => {
    if (val && modelValueSet.value.size) {
      domRefs.tree.value?.setCollapseStatusByValue(Array.from(modelValueSet.value.values()), true);
    }

    context.emit('visibleChange', val);
  });

  /** provides **/
  provide(NTreeSelectPopperVisibleInjectKey, popperVisible);

  return {
    popperVisible,
    controlPopperVisible,
  };
}
