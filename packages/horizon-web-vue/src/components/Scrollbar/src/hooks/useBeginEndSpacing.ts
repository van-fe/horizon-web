import type { ToRefs } from 'vue';
import { computed, provide } from 'vue';
import type { ScrollbarProps } from '../composables/useProps';
import {
  HScrollbarThumbBottomInjectKey,
  HScrollbarThumbLeftInjectKey,
  HScrollbarThumbRightInjectKey,
  HScrollbarThumbTopInjectKey,
} from '../utils/injectKeys';

export default function useBeginEndSpacing(propsRef: ToRefs<ScrollbarProps>) {
  const trackBeginEndSpacing = computed<[[number, number], [number, number]]>(() =>
    Array.isArray(propsRef.trackBeginEndSpacing.value)
      ? propsRef.trackBeginEndSpacing.value
      : [
          [propsRef.trackBeginEndSpacing.value, propsRef.trackBeginEndSpacing.value],
          [propsRef.trackBeginEndSpacing.value, propsRef.trackBeginEndSpacing.value],
        ],
  );

  const thumbTopMax = computed(() => trackBeginEndSpacing.value[0][0]);
  const thumbBottomMax = computed(() => trackBeginEndSpacing.value[0][1]);
  const thumbLeftMax = computed(() => trackBeginEndSpacing.value[1][0]);
  const thumbRightMax = computed(() => trackBeginEndSpacing.value[1][1]);

  provide(HScrollbarThumbTopInjectKey, thumbTopMax);
  provide(HScrollbarThumbBottomInjectKey, thumbBottomMax);
  provide(HScrollbarThumbLeftInjectKey, thumbLeftMax);
  provide(HScrollbarThumbRightInjectKey, thumbRightMax);

  return {
    trackBeginEndSpacing,
    thumbTopMax,
    thumbBottomMax,
    thumbLeftMax,
    thumbRightMax,
  };
}
