import type { CSSProperties } from 'vue';
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue';
import { ComponentClassBlock, cls, useNamespace, getElement } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { GuideItemProps } from './composables/useProps';
import { useGuideItemProps } from './composables/useProps';
import { useGuideItemEmits } from './composables/useEmits';
import { useGuideItemSlots } from './composables/useSlots';
import { useGuideItemExposes } from './composables/useExposes';
import type { GuideItemExposes } from './composables/useExposes';
import type { GuideItemEmits } from './composables/useEmits';
import type { GuideItemSlots } from './composables/useSlots';
import { IconClose } from '@aurora/icon';
import {
  HGuideCollectItemInjectKey,
  HGuideCurrentIndexInjectKey,
  HGuideIsStartedInjectKey,
  HGuideItemsInjectKey,
  HGuideOnCloseInjectKey,
  HGuideOnFinishInjectKey,
  HGuidePropsInjectKey,
  HGuideRemoveItemInjectKey,
} from './utils/injectedKeys';
import { nanoid } from 'nanoid';
import { usePopper } from '~/utils/popper';
import HButton from '~/components/Button/src/Button';
import useLocaleLang from '~/utils/useLocaleLang';
import { useDrag } from './utils/useDrag';

export default defineComponent({
  name: `${useNamespace()}GuideItem`,
  components: {
    IconClose,
    HButton,
  },
  props: useGuideItemProps,
  emits: useGuideItemEmits,
  slots: useGuideItemSlots,
  exposes: useGuideItemExposes,
  setup(
    props: GuideItemProps,
    { emit, slots, expose }: HorizonWebSetupContext<GuideItemEmits, GuideItemSlots, GuideItemExposes>,
  ) {
    const classHelper = new ComponentClassBlock('guide-item');

    const uuid = nanoid();
    const itemDomRef = ref<HTMLElement | null>(null);
    const targetRef = ref<HTMLElement | null>(null);
    const currentIndex = ref<number | null>(props.index ?? null);

    const parentProps = inject(HGuidePropsInjectKey);
    const collectItem = inject(HGuideCollectItemInjectKey);
    const removeItem = inject(HGuideRemoveItemInjectKey);
    const guideItems = inject(HGuideItemsInjectKey)!;
    const current = inject(HGuideCurrentIndexInjectKey)!;
    const onParentClose = inject(HGuideOnCloseInjectKey)!;
    const onParentFinish = inject(HGuideOnFinishInjectKey)!;
    const isStarted = inject(HGuideIsStartedInjectKey)!;

    const triggerExist = ref(true);
    const customStyle = ref<CSSProperties>({});

    const visible = computed(() => current?.value === currentIndex.value);
    const draggable = computed(() => props.draggable || parentProps?.draggable || false);

    watch([isStarted, visible], ([isStartedValue, isVisibleValue]) => {
      if (isStartedValue && isVisibleValue) {
        void doMount();
      }
    });
    useDrag(itemDomRef, targetRef, draggable);

    async function doMount() {
      const trigger = getElement(props.target);
      if (trigger && itemDomRef.value) {
        triggerExist.value = true;
        customStyle.value = {};

        if (props.scrollIntoView ?? parentProps?.scrollIntoView) {
          trigger.scrollIntoView(
            typeof props.scrollIntoView === 'object'
              ? props.scrollIntoView
              : typeof parentProps?.scrollIntoView === 'object'
                ? parentProps?.scrollIntoView
                : { behavior: 'smooth', block: 'center', inline: 'center' },
          );
        }

        await nextTick();

        usePopper(trigger, itemDomRef.value, {
          placement: props.placement ?? parentProps?.placement,
          arrow: props.arrow ?? parentProps?.arrow,
          distance:
            ((props.distance ?? parentProps?.distance) || 8) +
            (props.mask ?? parentProps?.mask
              ? (props.maskTriggerPadding ?? parentProps?.maskTriggerPadding) || 8
              : 0) +
            4,
          skidding: props.skidding ?? parentProps?.skidding,
          flip: props.flip ?? parentProps?.flip,
          resizeObserve: true,
        });
      } else {
        triggerExist.value = false;
        customStyle.value = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      }
    }

    const closeable = computed(() => props.closable ?? parentProps?.closable ?? true);

    expose({});

    function onClickClose() {
      emit('close');
      onParentClose();
    }

    function onFinish() {
      emit('finish');
      onParentFinish();
    }

    function onClickPrev() {
      current.value = Math.max(0, current.value - 1);
    }

    function onClickNext() {
      if (currentIndex.value === guideItems.length - 1) {
        onFinish();
      } else {
        current.value++;
      }
    }

    onMounted(() => {
      collectItem?.({
        uuid,
        props,
        getIndex: () => currentIndex.value ?? 0,
        setIndex: (index: number) => {
          currentIndex.value = index;
        },
      });
    });

    onBeforeUnmount(() => {
      removeItem?.(uuid);
    });

    return () => (
      <div
        ref={itemDomRef}
        v-show={visible.value}
        class={cls(classHelper.block, classHelper.m(props.type || parentProps?.type))}
        style={customStyle.value}
        data-index={currentIndex.value}
      >
        <div ref={targetRef} class={classHelper.e('header')}>
          {(slots.title || props.title) && (
            <div class={classHelper.em('header', 'title')}>{slots.title?.() ?? props.title}</div>
          )}
          {closeable.value && (
            <div class={classHelper.em('header', 'close')}>
              <HButton
                type="normal"
                text={true}
                icon={<IconClose />}
                iconSize={16}
                size="small"
                onClick={onClickClose}
              ></HButton>
            </div>
          )}
        </div>
        <div class={classHelper.e('body')}>
          {(slots.image || props.image) && (
            <div class={classHelper.em('body', 'image')}>
              {slots.image?.() ?? typeof props.image === 'object' ? (
                props.image
              ) : (
                <img src={props.image} alt={`guide item's image`} />
              )}
            </div>
          )}
          {(slots.content || props.content) && (
            <div class={classHelper.em('body', 'content')}>
              {slots.content?.() ?? props.content}
            </div>
          )}
        </div>
        <div class={classHelper.e('footer')}>
          <div class={classHelper.em('footer', 'steps')}>
            {guideItems?.length === 1
              ? ''
              : `${(currentIndex.value || 0) + 1} / ${guideItems?.length}`}
          </div>
          {(props.useControls ?? parentProps?.useControls) && (
            <div class={classHelper.em('footer', 'controls')}>
              {(currentIndex.value || 0) > 0 && (
                <HButton
                  plain={true}
                  size="small"
                  class={classHelper.em('footer', 'control-cancel')}
                  onClick={onClickPrev}
                >
                  {useLocaleLang('guide.prev').value}
                </HButton>
              )}
              <HButton
                size="small"
                class={classHelper.em('footer', 'control-confirm')}
                onClick={onClickNext}
              >
                {currentIndex.value === guideItems.length - 1
                  ? props.finishText ??
                    parentProps?.finishText ??
                    useLocaleLang('guide.finish').value
                  : useLocaleLang('guide.next').value}
              </HButton>
            </div>
          )}
        </div>
        {(props.arrow ?? parentProps?.arrow) && triggerExist.value && (
          <div class={classHelper.e('arrow')} data-popper-arrow={true} />
        )}
      </div>
    );
  },
});
