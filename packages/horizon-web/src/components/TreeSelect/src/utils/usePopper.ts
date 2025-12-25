import type { Ref, ToRefs } from 'vue';
import { provide, ref, watch } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import { HTreeSelectPopperVisibleInjectKey } from './injectKeys';
import type { HTreeSelectContext, HTreeSelectDomRefs } from './types';
import type { HTreeUuidType } from '~/components/Tree/src/utils/types';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  domRefs: HTreeSelectDomRefs,
  modelValueSet: Ref<Set<HTreeUuidType>>,
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
  provide(HTreeSelectPopperVisibleInjectKey, popperVisible);

  return {
    popperVisible,
    controlPopperVisible,
  };
}
