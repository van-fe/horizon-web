import { defineComponent } from 'vue';
import { useSkeletonItemProps } from './composables/useProps';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import HTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}SkeletonItem`,
  desc: "骨架屏中的单个占位元素",
  descLocales: { en: "A single placeholder element within Skeleton." },
  components: {
    HTransition,
  },
  props: useSkeletonItemProps,
  setup(props) {
    const classHelper = new ComponentClassBlock('skeleton__item');
    return () => (
      <HTransition name="fade-in">
        <div>
          <div class={cls({}, [classHelper.e(props.shape), classHelper.block])}></div>
        </div>
      </HTransition>
    );
  },
});
