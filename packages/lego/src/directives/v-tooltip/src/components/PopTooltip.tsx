import { defineComponent, ref, toRefs, watch } from 'vue';
import { useTooltipProps } from '~/components/Tooltip/src/composables/useProps';
import { ComponentClassBlock, useZIndex } from '@nio-fe/shared';
import useSize from '~/utils/useSize';
import { NTransition } from '~/components/Transition';

const zIndexHandler = useZIndex();
export default defineComponent({
  name: 'PopTooltip',
  props: useTooltipProps,
  setup(props) {
    const {
      popperClass: popperClassProp,
      visible: visibleProp,
      arrow: arrowProp,
      content: contentProp,
      size,
      theme: themeProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('tooltip');

    const sizeRef = useSize(size, 'medium');

    const zIndex = ref();
    watch(visibleProp, visible => visible && (zIndex.value = zIndexHandler.next()));

    return () =>
      visibleProp.value &&
      contentProp.value && (
        <NTransition appear name="tooltip">
          <div
            class={[
              classHelper.block,
              classHelper.m('directive'),
              popperClassProp.value,
              classHelper.m('hidden', !visibleProp.value),
              classHelper.m(sizeRef.value),
              classHelper.m(themeProp.value),
            ]}
            style={{ zIndex: zIndex.value }}
          >
            <div class={classHelper.e('content')}>{contentProp.value}</div>
            {arrowProp.value && <div class={[classHelper.e('arrow')]} data-popper-arrow></div>}
          </div>
        </NTransition>
      );
  },
});
