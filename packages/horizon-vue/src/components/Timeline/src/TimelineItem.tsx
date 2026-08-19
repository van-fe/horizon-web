import { computed, defineComponent, ref, toRefs, inject } from 'vue';
import { resolveTimelineDot, toTimelineOffsetCss } from '@aurora/core';
import { useTimelineItemProps } from './composables/useProps';
import { useDateFormative } from './composables/useDateFormat';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useColors } from '~/globalMethods';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import { AIcon } from '@aurora/icon';
import type { TimelineItemSlots } from './composables/useSlots';
import { useTimelineItemSlots } from './composables/useSlots';
import useFormat from './hooks/useFormat';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}TimelineItem`,
  desc: '时间线中的单个事件项',
  descLocales: { en: 'A single event item within Timeline.' },
  components: { AIcon },
  props: useTimelineItemProps,
  slots: useTimelineItemSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, TimelineItemSlots>) {
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
    const activeDot = computed(() =>
      resolveTimelineDot(
        {
          type: typeProp.value,
          color: colorProp.value,
          borderColor: borderColorProp.value,
          size: sizeRef.value,
          icon: iconProp.value,
        },
        foldConfigProp.value,
        isHidden.value,
      ),
    );
    const injectProp = inject<{
      show: (val: { number: number; uid: string }) => void;
      hide: (val: { number: number; uid: string }) => void;
    }>('HTimeline');
    const timelineItemElRef = ref<HTMLElement | null>(null);
    const isHidden = ref(false);
    const onClickDot = () => {
      if (!foldConfigProp.value) return;
      const uid = timelineItemElRef.value?.dataset.uid;
      if (!uid) return;
      const request = { uid, number: foldConfigProp.value.number };
      if (!isHidden.value) {
        injectProp?.hide?.(request);
      } else {
        injectProp?.show?.(request);
      }
      isHidden.value = !isHidden.value;
    };

    const renderDot = () =>
      isHidden.value
        ? (slots?.hiddenDot?.() ?? renderDefaultDot())
        : (slots?.dot?.() ?? renderDefaultDot());

    function renderDefaultDot() {
      const dot = activeDot.value;
      const color = useColors(dot.color ?? '');
      const borderColor = useColors(dot.borderColor ?? '');
      return (
        <div
          class={[
            classHelper.e('dot'),
            classHelper.e(`dot--${dot.size}`),
            classHelper.e(`dot--${dot.type}`),
          ]}
          style={
            dot.type === 'disc'
              ? { 'background-color': color, 'border-color': borderColor }
              : { 'border-color': borderColor, color }
          }
        >
          {dot.icon && <AIcon name={dot.icon} class={classHelper.e(`icon--${dot.size}`)} />}
        </div>
      );
    }

    const renderDotControl = () => {
      const classes = [
        classHelper.e('dot-wrapper'),
        placementProp.value === 'top' &&
          !isHidden.value &&
          classHelper.em('dot-wrapper', 'timestamp'),
      ];
      if (!foldConfigProp.value) return <div class={classes}>{renderDot()}</div>;
      return (
        <button
          type="button"
          class={classes}
          aria-expanded={!isHidden.value}
          aria-label={foldConfigProp.value.label ?? foldConfigProp.value.content}
          onClick={onClickDot}
        >
          {renderDot()}
        </button>
      );
    };

    return () => (
      <li class={`${classHelper.block}`} ref={timelineItemElRef}>
        <div class={[classHelper.e('step'), classHelper.e(`step--${activeDot.value.size}`)]}>
          {renderDotControl()}
          {tailProp.value && (
            <div
              class={[classHelper.e('tail'), dashedProp.value && classHelper.e('tail--dashed')]}
              style={{
                margin: `${toTimelineOffsetCss(offsetProp.value)} 0`,
                'border-color': useColors(tailColorProp.value ?? ''),
              }}
            ></div>
          )}
        </div>

        <div class={[classHelper.e('wrapper'), classHelper.e(`wrapper--${activeDot.value.size}`)]}>
          {placementProp.value === 'top' && !isHidden.value && (
            <div
              class={[
                classHelper.e('timestamp'),
                classHelper.e(`timestamp--${placementProp.value}`),
              ]}
            >
              {useDateFormative(timestampProp.value, format.value, locale.value?.current)}
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
                  {useDateFormative(timestampProp.value, format.value, locale.value?.current)}
                </div>
              )}
            </div>
          )}
          <div class={[classHelper.e('desc'), isHidden.value && classHelper.e('desc--hidden')]}>
            {isHidden.value ? foldConfigProp.value?.content : (slots?.desc?.() ?? descProp.value)}
          </div>
          {placementProp.value === 'bottom' && !isHidden.value && (
            <div
              class={[
                classHelper.e('timestamp'),
                classHelper.e(`timestamp--${placementProp.value}`),
              ]}
            >
              {useDateFormative(timestampProp.value, format.value, locale.value?.current)}
            </div>
          )}
        </div>
      </li>
    );
  },
});
