import {
  computed,
  defineComponent,
  Fragment,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, isNumber, useZIndex } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useGuideProps } from './composables/useProps';
import { useGuideEmits } from './composables/useEmits';
import { useGuideSlots } from './composables/useSlots';
import { useGuideExposes } from './composables/useExposes';
import type { GuideProps } from './composables/useProps';
import type { GuideEmits } from './composables/useEmits';
import type { GuideSlots } from './composables/useSlots';
import type { GuideExposes } from './composables/useExposes';
import type { NGuideCollectedItems } from './utils/injectedKeys';
import {
  NGuideCollectItemInjectKey,
  NGuideCurrentIndexInjectKey,
  NGuideIsStartedInjectKey,
  NGuideItemsInjectKey,
  NGuideOnCloseInjectKey,
  NGuideOnFinishInjectKey,
  NGuidePropsInjectKey,
  NGuideRemoveItemInjectKey,
} from './utils/injectedKeys';
import GuideMask from './components/GuideMask';
import NGuideItem from './GuideItem';

export default defineComponent({
  name: `${useNamespace()}Guide`,
  desc: '产品中的新手引导是可以让用户在短时间内快速了解产品的特色以及产品的使用方式，轻松上手去体验产品的功能，完成自己的目标。大部分的新手引导都会出现在用户首次打开产品时，让用户对产品功能或操作有个初步了解。',
  components: {
    GuideMask,
    NGuideItem,
  },
  props: useGuideProps,
  emits: useGuideEmits,
  slots: useGuideSlots,
  exposes: useGuideExposes,
  setup(
    props: GuideProps,
    { emit, slots, expose }: HorizonWebSetupContext<GuideEmits, GuideSlots, GuideExposes>,
  ) {
    const classHelper = new ComponentClassBlock('guide');

    const visible = ref(props.visible);
    const currentIndex = ref(props.modelValue);
    const guideItems = reactive<NGuideCollectedItems[]>([]);

    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(zIndexHandler.current);

    const currentItem = computed(() =>
      guideItems.find(curr => curr.getIndex() === currentIndex.value),
    );

    watch(
      () => props.visible,
      val => {
        if (val && currentIndex.value === -1) {
          currentIndex.value = 0;
        }

        visible.value = val;
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.modelValue,
      val => {
        currentIndex.value = val;
      },
    );

    watch(currentIndex, val => {
      emit('update:modelValue', val);
    });

    watch(visible, val => {
      if (val) {
        zIndex.value = zIndexHandler.next();
      }

      emit('update:visible', val);
    });

    watchEffect(
      () => {
        let prevIndex = 0;

        guideItems
          .sort((a, b) => (a.props.index ?? 0) - (b.props.index ?? 0))
          .forEach(item => {
            if (isNumber(item.props.index)) {
              item.setIndex(item.props.index);
              prevIndex = item.props.index;
            } else {
              item.setIndex(prevIndex);
            }

            prevIndex++;
          });
      },
      {
        flush: 'pre',
      },
    );

    const collectItem = (item: NGuideCollectedItems) => {
      guideItems.push(item);
    };

    const removeItem = (uuid: string) => {
      const targetIndex = guideItems.findIndex(curr => curr.uuid === uuid);
      if (targetIndex >= 0) {
        guideItems.splice(targetIndex, 1);
      }
    };

    function onClose() {
      emit('close');
      visible.value = false;
    }

    function onFinish() {
      emit('finish');
      visible.value = false;
      currentIndex.value = -1;
    }

    provide(NGuidePropsInjectKey, props);
    provide(NGuideCollectItemInjectKey, collectItem);
    provide(NGuideRemoveItemInjectKey, removeItem);
    provide(NGuideItemsInjectKey, guideItems);
    provide(NGuideCurrentIndexInjectKey, currentIndex);
    provide(NGuideOnCloseInjectKey, onClose);
    provide(NGuideOnFinishInjectKey, onFinish);
    provide(NGuideIsStartedInjectKey, visible);

    function renderItems() {
      if (slots.default) {
        return slots.default();
      } else if (props.itemList?.length) {
        return (
          <Fragment>
            {props.itemList.map(item => (
              <NGuideItem {...(item || {})} />
            ))}
          </Fragment>
        );
      }
    }

    expose({
      next: () => {
        if (currentIndex.value === guideItems.length - 1) {
          onFinish();
        } else {
          currentIndex.value = Math.min(currentIndex.value + 1, guideItems.length - 1);
        }
      },
      prev: () => {
        currentIndex.value = Math.max(currentIndex.value - 1, 0);
      },
      close: () => {
        onClose();
      },
      hide: () => {
        visible.value = false;
      },
      show: (startFromFirst = false) => {
        visible.value = true;

        if (startFromFirst) {
          currentIndex.value = 0;
        }
      },
    });

    return () => (
      <div v-show={visible.value} class={cls(classHelper.block)} style={{ zIndex: zIndex.value }}>
        {renderItems()}
        {props.mask && visible.value && <GuideMask currentItem={currentItem.value} />}
      </div>
    );
  },
});
