import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  withModifiers,
} from 'vue';
import { cls, ComponentClassBlock, getClientXY } from '@aurora/utils';
import { ColorTypeEnum } from '../utils/ColorPickerColor';
import { defaultLocale, localeInjectKey } from '~/provides';
import { ColorPickerCurrentValue, ColorPickerProps } from '../utils/InjectedKeys';
import type { Position } from '@vueuse/core';
import { clamp, useDraggable, useResizeObserver } from '@vueuse/core';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import HInputNumber from '~/components/InputNumber/src/InputNumber';

export default defineComponent({
  name: 'ColorType',
  components: {
    HTooltip,
    HInputNumber,
  },
  setup() {
    const classHelper = new ComponentClassBlock('color-picker-panel__color-type');
    const currentColor = inject(ColorPickerCurrentValue)!;
    const trackRef = ref<HTMLElement | null>(null);
    const trackWidth = ref(200);
    const itemRef = ref<Record<string, HTMLElement>>({});
    const locale = inject(localeInjectKey, defaultLocale);
    const isDuringDrag = ref(false);
    const parentProps = inject(ColorPickerProps);

    useResizeObserver(trackRef, params => {
      trackWidth.value = params[0].contentRect.width;
    });

    function switchColorType(type: ColorTypeEnum) {
      currentColor.setColorType(type);
    }

    function getItemToLeft(percent: number) {
      const cursorWidth = Object.values(itemRef.value)?.[0]?.offsetWidth || 16;

      return (percent / 100) * trackWidth.value - cursorWidth / 2 + 'px';
    }

    function addGradient(e: MouseEvent) {
      if (!isDuringDrag.value) {
        const rect = trackRef.value!.getBoundingClientRect();
        const { clientX } = getClientXY(e);

        const left = clamp(clientX - rect.left, 0, rect.width); // 鼠标到轨道最左侧的距离

        const percent = (left / trackWidth.value) * 100;

        currentColor.addColor(currentColor.currentActiveColorTarget.color.value, percent);
      }
    }

    function onRefAppend(ref: HTMLElement | null, id: string) {
      if (ref === null) {
        delete itemRef.value[id];
      } else {
        itemRef.value[id] = ref;
      }

      setDraggable(id);
    }

    function setDraggable(id: string) {
      function handleDrag(position: Position, event: MouseEvent | TouchEvent) {
        if (isDuringDrag.value) {
          const rect = trackRef.value!.getBoundingClientRect();
          const { clientX } = getClientXY(event);

          const left = clamp(clientX - rect.left, 0, rect.width); // 鼠标到轨道最左侧的距离

          currentColor.setColorPercent((left / rect.width) * 100);
        }
      }

      useDraggable(itemRef.value[id], {
        onStart: () => {
          currentColor.setCurrentActiveColorTargetById(id);
          isDuringDrag.value = true;
        },
        onMove: handleDrag,
        onEnd: () => {
          setTimeout(() => {
            isDuringDrag.value = false;
          }, 200);
        },
      });
    }

    function onKeyUp(evt: KeyboardEvent) {
      if (
        evt.key === 'Backspace' &&
        currentColor.colorType.value !== ColorTypeEnum.Pure &&
        currentColor.values.value.length > 2
      ) {
        currentColor.removeColor();
      }
    }

    watch(
      () => parentProps?.gradientList,
      val => {
        if (val && val.length === 1) {
          switchColorType(val[0] as ColorTypeEnum);
        }
      },
      {
        immediate: true,
      },
    );

    onMounted(() => {
      window.addEventListener('keyup', onKeyUp);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keyup', onKeyUp);
    });

    return () => (
      <div class={cls(classHelper.block)}>
        <div
          v-show={(parentProps?.gradientList?.length || 0) > 1}
          class={cls(classHelper.em('list', 'wrapper'))}
        >
          <div class={cls(classHelper.e('list'))}>
            {['pure', ...(parentProps?.gradientList || [])].map(key => {
              const colorTypeKey = key as 'pure' | 'linear' | 'radial' | 'conic';
              return (
                <HTooltip
                  showAfter={200}
                  content={locale?.value?.langService.td().horizonWeb.colorPicker[colorTypeKey]}
                >
                  <div
                    class={cls(
                      classHelper.e('item'),
                      classHelper.is(colorTypeKey),
                      classHelper.is('active', currentColor?.colorType.value === colorTypeKey),
                    )}
                    onClick={() => switchColorType(colorTypeKey as ColorTypeEnum)}
                  />
                </HTooltip>
              );
            })}
          </div>
        </div>
        <div
          v-show={currentColor.colorType.value !== ColorTypeEnum.Pure}
          class={cls(classHelper.em('gradient', 'wrapper'))}
        >
          <div class={cls(classHelper.e('gradient'))}>
            <div ref={trackRef} class={classHelper.em('gradient', 'track')}>
              <div
                class={classHelper.em('gradient', 'track-color')}
                style={{ background: currentColor.getTrackResultColor() }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    addGradient(e);
                  }
                }}
              />
              {currentColor.values.value.map((item, index) => (
                <div
                  ref={ref => onRefAppend(ref as HTMLElement, item.id)}
                  class={cls(
                    classHelper.em('gradient', 'item'),
                    classHelper.is('active', index === currentColor.activeIndex.value),
                  )}
                  style={{ left: getItemToLeft(item.percent), background: item.color.value }}
                  onClick={withModifiers(() => {
                    currentColor.activeIndex.value = index;
                  }, ['stop'])}
                />
              ))}
            </div>
          </div>

          {currentColor.colorType.value === ColorTypeEnum.Linear && (
            <div class={cls(classHelper.em('gradient', 'input'))}>
              <HInputNumber
                modelValue={currentColor.degree.value}
                size="small"
                controls={false}
                placeholder=""
                formatter={val => `${val}°`}
                parser={val => val.replace(/°/g, '')}
                onChange={val => val && currentColor.setDegree(Number(val || '0'))}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
});
