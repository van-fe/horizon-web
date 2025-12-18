import { computed, defineComponent, ref, toRefs, inject } from 'vue';
import { useTimelineItemProps } from './composables/useProps';
import { useDateFormative, useDateFormative } from './composables/useDateFormat';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { useColors } from '~/globalMethods';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import { NIcon } from '@nio-fe/icon';
import type { TimelineItemSlots } from './composables/useSlots';
import { useTimelineItemSlots } from './composables/useSlots';
import useFormat from './hooks/useFormat';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}TimelineItem`,
  components: { NIcon },
  props: useTimelineItemProps,
  slots: useTimelineItemSlots,
  setup(props, { slots }: LegoSetupContext<{}, TimelineItemSlots>) {
    const {
      timestamp: timestampProp,
      placement: placementProp,
      size: sizeProp,
      type: typeProp,
      color: colorProp,
      borderColor: borderColorProp,
      tailColor: tailColorProp,
      icon: iconProp,
      name: nameProp,
      desc: descProp,
      format: formatProp,
      offset: offsetProp,
      dashed: dashedProp,
      foldConfig: foldConfigProp,
      tail: tailProp,
    } = toRefs(props);

    const locale = inject(localeInjectKey, defaultLocale);

    const { format } = useFormat(formatProp);

    // global size
    const sizeRef = useSize(sizeProp, 'medium', {
      middle: 'medium',
    });

    const classHelper = new ComponentClassBlock('timeline-item');
    const dotColor = computed(() =>
      foldConfigProp.value?.dot?.color
        ? useColors(foldConfigProp.value.dot.color)
        : useColors(colorProp.value ?? ''),
    );
    const dotBorderColor = computed(() =>
      foldConfigProp.value?.dot?.borderColor
        ? useColors(foldConfigProp.value.dot.borderColor)
        : useColors(borderColorProp.value ?? ''),
    );
    const dotType = computed(() => foldConfigProp.value?.dot?.type ?? typeProp.value);
    const dotSize = computed(() => foldConfigProp.value?.dot?.size ?? sizeRef.value);
    const dotIcon = computed(() => foldConfigProp.value?.dot?.icon ?? iconProp.value);
    const injectProp = inject<{
      show: (val: object) => void;
      hide: (val: object) => void;
      v2: boolean;
    }>('NTimeline');
    const timelineItemElRef = ref<HTMLElement | null>(null);
    const isHidden = ref(false);
    const onClickDot = () => {
      if (!foldConfigProp.value) return;
      if (!isHidden.value) {
        injectProp?.hide?.({
          ...timelineItemElRef?.value?.dataset,
          ...foldConfigProp.value,
        });
      } else {
        injectProp?.show?.({
          ...timelineItemElRef?.value?.dataset,
          ...foldConfigProp.value,
        });
      }
      isHidden.value = !isHidden.value;
    };
    return () => (
      <li class={`${classHelper.block}`} ref={timelineItemElRef}>
        <div class={[classHelper.e('step'), classHelper.e(`step--${dotSize.value}`)]}>
          <div
            class={[
              classHelper.e('dot-wrapper'),
              placementProp.value === 'top' &&
                !isHidden.value &&
                classHelper.em('dot-wrapper', 'timestamp'),
            ]}
            onClick={onClickDot}
          >
            {isHidden.value
              ? slots?.hiddenDot?.() ?? (
                  <div
                    class={[
                      classHelper.e('dot'),
                      classHelper.e(`dot--${dotSize.value}`),
                      classHelper.e(`dot--${dotType.value}`),
                    ]}
                    style={
                      dotType.value === 'disc'
                        ? {
                            'background-color': dotColor.value,
                            'border-color': dotBorderColor.value,
                          }
                        : { 'border-color': dotBorderColor.value, color: dotColor.value }
                    }
                  >
                    {dotIcon.value && (
                      <NIcon name={dotIcon.value} class={classHelper.e(`icon--${dotSize.value}`)} />
                    )}
                  </div>
                )
              : slots?.dot?.() ?? (
                  <div
                    class={[
                      classHelper.e('dot'),
                      classHelper.e(`dot--${sizeRef.value}`),
                      classHelper.e(`dot--${typeProp.value}`),
                    ]}
                    style={
                      dotType.value === 'disc'
                        ? {
                            'background-color': useColors(colorProp.value ?? ''),
                            'border-color': useColors(borderColorProp.value ?? ''),
                          }
                        : {
                            'border-color': useColors(borderColorProp.value ?? ''),
                            color: useColors(colorProp.value ?? ''),
                          }
                    }
                  >
                    {iconProp.value && (
                      <NIcon
                        name={iconProp.value}
                        class={classHelper.e(`icon--${sizeRef.value}`)}
                      />
                    )}
                  </div>
                )}
          </div>
          {tailProp.value && (
            <div
              class={[classHelper.e('tail'), dashedProp.value && classHelper.e('tail--dashed')]}
              style={{
                margin: `${offsetProp.value}px 0`,
                'border-color': useColors(tailColorProp.value ?? ''),
              }}
            ></div>
          )}
        </div>

        <div class={[classHelper.e('wrapper'), classHelper.e(`wrapper--${dotSize.value}`)]}>
          {placementProp.value === 'top' && !isHidden.value && (
            <div
              class={[
                classHelper.e('timestamp'),
                classHelper.e(`timestamp--${placementProp.value}`),
              ]}
            >
              {injectProp?.v2
                ? useDateFormative(timestampProp.value, format.value, locale.value?.current)
                : formatProp.value
                  ? useDateFormative(timestampProp.value, formatProp.value, locale.value?.current)
                  : timestampProp.value}
            </div>
          )}
          {!isHidden.value && (
            <div class={classHelper.e('name')}>
              <div class={classHelper.e('name--content')}>{slots?.name?.() ?? nameProp.value}</div>
              {placementProp.value === 'right' && (
                <div
                  class={[
                    classHelper.e('timestamp'),
                    classHelper.e(`timestamp--${placementProp.value}`),
                  ]}
                >
                  {injectProp?.v2
                    ? useDateFormative(timestampProp.value, format.value, locale.value?.current)
                    : formatProp.value
                      ? useDateFormative(
                          timestampProp.value,
                          formatProp.value,
                          locale.value?.current,
                        )
                      : timestampProp.value}
                </div>
              )}
            </div>
          )}
          <div class={[classHelper.e('desc'), isHidden.value && classHelper.e('desc--hidden')]}>
            {isHidden.value ? foldConfigProp.value?.content : slots?.desc?.() ?? descProp.value}
          </div>
          {placementProp.value === 'bottom' && !isHidden.value && (
            <div
              class={[
                classHelper.e('timestamp'),
                classHelper.e(`timestamp--${placementProp.value}`),
              ]}
            >
              {injectProp?.v2
                ? useDateFormative(timestampProp.value, format.value, locale.value?.current)
                : formatProp.value
                  ? useDateFormative(timestampProp.value, formatProp.value, locale.value?.current)
                  : timestampProp.value}
            </div>
          )}
        </div>
      </li>
    );
  },
});
