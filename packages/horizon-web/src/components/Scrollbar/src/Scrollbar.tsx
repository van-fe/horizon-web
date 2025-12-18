import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  onUpdated,
  provide,
  ref,
  toRefs,
  watch,
} from 'vue';
import { ComponentClassBlock, cls, sizeUnitTransform, useNamespace } from '@aurora/utils';
import type { LegoSetupContext } from '@aurora/utils';
import type { ScrollbarProps } from './composables/useProps';
import { useScrollbarProps } from './composables/useProps';
import { useScrollbarEmits } from './composables/useEmits';
import { useScrollbarSlots } from './composables/useSlots';
import { useScrollbarExposes } from './composables/useExposes';
import type { ScrollbarEmits } from './composables/useEmits';
import type { ScrollbarSlots } from './composables/useSlots';
import type { ScrollbarExposes } from './composables/useExposes';
import ScrollbarTrack from './components/ScrollbarTrack';
import {
  NScrollbarPropsInjectKey,
  NScrollbarUpdateDelayInjectKey,
  NScrollbarViewSizeInjectKey,
} from './utils/injectKeys';
import NHover from '~/components/Hover/src/Hover';
import NTransition from '~/components/Transition/src/Transition';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import useSize from '~/utils/useSize';
import useBeginEndSpacing from './hooks/useBeginEndSpacing';

export default defineComponent({
  name: `${useNamespace()}Scrollbar`,
  desc: '用于替换浏览器原生滚动条，统一不同系统的滚动条差异',
  inheritAttrs: false,
  props: useScrollbarProps,
  emits: useScrollbarEmits,
  slots: useScrollbarSlots,
  exposes: useScrollbarExposes,
  setup(
    props: ScrollbarProps,
    {
      emit,
      slots,
      expose,
      attrs,
    }: LegoSetupContext<ScrollbarEmits, ScrollbarSlots, ScrollbarExposes>,
  ) {
    const classHelper = new ComponentClassBlock('scrollbar');
    const propsRef = toRefs(props);

    const {
      size: sizeProp,
      horizontalVisible: horizontalVisibleProp,
      verticalVisible: verticalVisibleProp,
    } = propsRef;

    const { trackBeginEndSpacing, thumbTopMax, thumbLeftMax, thumbBottomMax, thumbRightMax } =
      useBeginEndSpacing(propsRef);

    const scrollbarRef = ref<HTMLElement | null>(null);
    const wrapRef = ref<HTMLElement | null>(null);
    const viewRef = ref<HTMLElement | null>(null);

    const wrapSize = ref({ width: 0, height: 0 });
    const viewSize = ref({ width: 0, height: 0 });
    const toTop = ref(0);
    const toLeft = ref(0);
    const isDragging = ref(false);

    const size = useSize(sizeProp, 'medium');

    const updateDelay = inject(NScrollbarUpdateDelayInjectKey, props.updateDelay);

    const widthRatio = computed(() => wrapSize.value.width / viewSize.value.width);
    const heightRatio = computed(() => wrapSize.value.height / viewSize.value.height);
    const thumbOriginWidth = computed(() => widthRatio.value * wrapSize.value.width);
    const thumbOriginHeight = computed(() => heightRatio.value * wrapSize.value.height);
    const thumbWidth = computed(() => Math.max(thumbOriginWidth.value, props.minSize));
    const thumbHeight = computed(() => Math.max(thumbOriginHeight.value, props.minSize));
    const horizonBarVisible = computed(() => thumbWidth.value < wrapSize.value.width);
    const verticalBarVisible = computed(() => thumbHeight.value < wrapSize.value.height);

    const overflowSetting = ref({
      x: 'auto',
      y: 'auto',
    });

    const toLeftSkewing = computed(
      () =>
        (toLeft.value / (viewSize.value.width - thumbOriginWidth.value)) *
        (thumbWidth.value - thumbOriginWidth.value),
    );
    const toTopSkewing = computed(
      () =>
        (toTop.value / (viewSize.value.height - thumbOriginHeight.value)) *
        (thumbHeight.value - thumbOriginHeight.value),
    );

    const thumbToLeft = computed(() => toLeft.value * widthRatio.value - toLeftSkewing.value);
    const thumbToTop = computed(() => toTop.value * heightRatio.value - toTopSkewing.value);

    provide(NScrollbarPropsInjectKey, props);
    provide(NScrollbarViewSizeInjectKey, viewSize);

    let stopResizeObserver: (() => void) | undefined = undefined;
    let stopResizeListener: (() => void) | undefined = undefined;

    watch(
      () => props.noResize,
      val => {
        if (val) {
          stopResizeObserver?.();
          stopResizeListener?.();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(viewRef, update));
          stopResizeListener = useEventListener('resize', update);
        }
      },
      {
        immediate: true,
      },
    );

    watch(trackBeginEndSpacing, () => {
      update();
    });

    let scrollEndTimer: NodeJS.Timeout | undefined = undefined;
    function handleScrollEnd() {
      if (scrollEndTimer) {
        clearTimeout(scrollEndTimer);
      }

      scrollEndTimer = setTimeout(() => {
        emit('scrollEnd');
      }, 50);
    }

    function handleScroll(e: Event) {
      updatePosition();

      emit(
        'scroll',
        {
          scrollTop: toTop.value,
          scrollLeft: toLeft.value,
        },
        e,
      );

      if (horizonBarVisible.value) {
        if (toLeft.value === 0) {
          emit('reachLeft', e);
        }

        if (Math.ceil(toLeft.value) >= viewSize.value.width - wrapSize.value.width) {
          emit('reachRight', e);
        }
      }

      if (verticalBarVisible.value) {
        if (toTop.value === 0) {
          emit('reachTop', e);
        }

        if (Math.ceil(toTop.value) >= viewSize.value.height - wrapSize.value.height) {
          emit('reachBottom', e);
        }
      }

      handleScrollEnd();
    }

    function setScrollTop(top: number) {
      wrapRef.value?.scrollTo({
        top,
      });
    }

    function setScrollLeft(left: number) {
      wrapRef.value?.scrollTo({
        left,
      });
    }

    function scrollTo(positionOrToLeft: ScrollToOptions | number, toTop?: number) {
      if (typeof positionOrToLeft === 'object') {
        wrapRef.value?.scrollTo(positionOrToLeft);
      } else {
        wrapRef.value?.scrollTo(positionOrToLeft, toTop!);
      }
    }

    function updateSize() {
      const rect = wrapRef.value?.getBoundingClientRect();

      wrapSize.value.width = rect?.width
        ? Math.max(0, Math.ceil(rect?.width) - thumbLeftMax.value - thumbRightMax.value)
        : 0;
      wrapSize.value.height = rect?.height
        ? Math.max(0, Math.ceil(rect?.height) - thumbTopMax.value - thumbBottomMax.value)
        : 0;

      viewSize.value.width = wrapRef.value?.scrollWidth
        ? Math.max(0, wrapRef.value?.scrollWidth - thumbLeftMax.value - thumbRightMax.value)
        : 0;
      viewSize.value.height = wrapRef.value?.scrollHeight
        ? Math.max(0, wrapRef.value?.scrollHeight - thumbTopMax.value - thumbBottomMax.value)
        : 0;
    }

    function updatePosition() {
      toTop.value = wrapRef.value?.scrollTop || 0;
      toLeft.value = wrapRef.value?.scrollLeft || 0;
    }

    function update() {
      setTimeout(() => {
        updateSize();
        updatePosition();

        emit('update');
      }, updateDelay);
    }

    function handleMouseMove(evt: MouseEvent) {
      overflowSetting.value.x = 'auto';
      overflowSetting.value.y = 'auto';

      if (props.preventScrollByTrackBeginEndSpacing && wrapRef.value) {
        const wrapRect = wrapRef.value.getBoundingClientRect();

        const x = evt.x - wrapRect.x;
        const y = evt.y - wrapRect.y;

        if (x < thumbLeftMax.value || x > wrapRef.value.clientWidth - thumbRightMax.value) {
          overflowSetting.value.x = 'hidden';
        }

        if (y < thumbTopMax.value || y > wrapRef.value.clientHeight - thumbBottomMax.value) {
          overflowSetting.value.y = 'hidden';
        }
      }
    }

    expose({
      handleScroll() {
        wrapRef.value?.scroll();
      },
      setScrollTop,
      setScrollLeft,
      scrollTo,
      update,
      wrapRef,
      viewRef,
    });

    onMounted(() => {
      update();
    });

    onUpdated(() => {
      update();
    });

    return () => (
      <NHover
        onMouseEnter={evt => emit('mouseEnter', evt)}
        onMouseMove={handleMouseMove}
        onMouseLeave={evt => emit('mouseLeave', evt)}
      >
        {{
          default: ({ hover }: { hover: boolean }) => (
            <div
              ref={scrollbarRef}
              class={cls(
                classHelper.block,
                classHelper.m(size.value),
                classHelper.is('track-sticky', props.trackSticky),
              )}
              {...attrs}
            >
              <div
                ref={wrapRef}
                class={cls(
                  classHelper.e('wrap'),
                  classHelper.is('native', props.native),
                  props.wrapClass,
                )}
                style={{
                  height: sizeUnitTransform(props.height),
                  maxHeight: sizeUnitTransform(props.maxHeight),
                  ...props.wrapStyle,
                  ['--scrollbar-height']: sizeUnitTransform(props.height),
                  ['--scrollbar-max-height']: sizeUnitTransform(props.maxHeight),
                  overflow: `${overflowSetting.value.x} ${overflowSetting.value.y}`,
                }}
                onScroll={handleScroll}
              >
                {h(
                  props.tag,
                  {
                    ref: viewRef,
                    class: cls(classHelper.e('view'), props.viewClass),
                    style: props.viewStyle,
                  },
                  slots.default?.(),
                )}
              </div>
              {!props.native && (
                <NTransition name="fade-in-linear" group={true}>
                  {verticalBarVisible.value && verticalVisibleProp.value && (
                    <ScrollbarTrack
                      v-show={hover || isDragging.value || props.always}
                      key="vertical-track"
                      size={thumbHeight.value}
                      position={thumbToTop.value}
                      skewing={toTopSkewing.value}
                      zIndex={props.zIndex}
                      begin={thumbTopMax.value}
                      end={thumbBottomMax.value}
                      onSetScrollTop={val => setScrollTop(val)}
                      onSetDragging={val => (isDragging.value = val)}
                    />
                  )}
                  {horizonBarVisible.value && horizontalVisibleProp.value && (
                    <ScrollbarTrack
                      v-show={hover || isDragging.value || props.always}
                      key="horizon-tarck"
                      size={thumbWidth.value}
                      position={thumbToLeft.value}
                      skewing={toLeftSkewing.value}
                      zIndex={props.zIndex}
                      vertical={false}
                      begin={thumbLeftMax.value}
                      end={thumbRightMax.value}
                      onSetScrollLeft={val => setScrollLeft(val)}
                      onSetDragging={val => (isDragging.value = val)}
                    />
                  )}
                </NTransition>
              )}
            </div>
          ),
        }}
      </NHover>
    );
  },
});
