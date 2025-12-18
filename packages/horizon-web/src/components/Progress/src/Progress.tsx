import { defineComponent, computed, ref, toRefs } from 'vue';
import type { CSSProperties } from 'vue';
import { useProgressProps } from './composables/useProps';
import { ComponentClassBlock, cssVariable, useNamespace } from '@aurora/utils';
import { NIcon } from '@aurora/icon';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import useSize from '~/utils/useSize';
export default defineComponent({
  name: `${useNamespace()}Progress`,
  desc: '给予用户当前系统执行中任务运行状态的反馈，多用于需要用户等待的场景，有效减轻用户在等待中产生的焦虑感',
  props: useProgressProps,
  setup(props) {
    const classHelper = new ComponentClassBlock('progress');
    const { size } = toRefs(props);
    const iconMap = {
      success: {
        icon: 'check',
        color: cssVariable('bg-success-default'),
      },
      warning: {
        icon: 'remind',
        color: cssVariable('bg-warning-default'),
      },
      exception: {
        icon: 'close',
        color: cssVariable('bg-error-default'),
      },
      error: {
        icon: 'close',
        color: cssVariable('bg-error-default'),
      },
    };

    const sizeMap: Record<NApplicationSizeType | 'mini', string> = {
      mini: '2px',
      small: '4px',
      medium: '6px',
      large: '8px',
    };

    const strokeWidthMap = {
      mini: 12.5,
      small: 7,
      medium: 6,
      large: 5.5,
    };

    const circleIconSize = {
      mini: '7.5',
      small: '12',
      medium: '20',
      large: '24',
    };

    const radiusMap = {
      mini: 16,
      small: 40,
      medium: 56,
      large: 72,
    };

    // global size
    const sizeRef = useSize(size, 'medium', {
      xs: 'mini',
      s: 'small',
      m: 'medium',
      l: 'large',
    });

    const progressRef = ref<HTMLElement | null>(null);
    const textRef = ref<HTMLElement | null>(null);
    const radius = computed(() => {
      if (props.type === 'circle' || props.type === 'dashboard') {
        return parseInt(`${50 - parseFloat(relativeStrokeWidth.value) / 2}`, 10);
      } else {
        return 0;
      }
    });

    const getCurrentColor = (percentage: number) => {
      const { color } = props;
      if (typeof color === 'function') {
        return color(percentage);
      } else if (typeof color === 'string') {
        return color;
      } else {
        const span = 100 / color.length;
        const seriesColors = color.map((seriesColor, index) => {
          if (typeof seriesColor === 'string') {
            return {
              color: seriesColor,
              percentage: (index + 1) * span,
            };
          }
          return seriesColor;
        });
        const colors = seriesColors.sort((a, b) => a.percentage - b.percentage);

        for (const color of colors) {
          if (color.percentage > percentage) return color.color;
        }
        return colors[colors.length - 1]?.color;
      }
    };

    const stroke = computed(() => {
      let ret: string;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        switch (props.status) {
          case 'success':
            ret = cssVariable('bg-success-default');
            break;
          case 'exception':
          case 'error':
            ret = cssVariable('bg-error-default');
            break;
          case 'warning':
            ret = cssVariable('bg-warning-default');
            break;
          default:
            ret = cssVariable('bg-info-default');
        }
      }
      return ret;
    });

    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === 'dashboard';
      return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
          `;
    });
    const strokeWidth = 6;
    const width = radiusMap[sizeRef.value] * 2; //126;
    const relativeStrokeWidth = computed(() => ((strokeWidth / width) * 100).toFixed(1));
    const perimeter = computed(() => 2 * Math.PI * radius.value);
    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.value * (1 - rate.value)) / 2;
      return `${offset}px`;
    });
    const rate = computed(() => (props.type === 'dashboard' ? 0.75 : 1));
    const trailPathStyle = computed(
      (): CSSProperties => ({
        strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
      }),
    );
    const circlePathStyle = computed(
      (): CSSProperties => ({
        strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${
          perimeter.value
        }px`,
        strokeDashoffset: strokeDashoffset.value,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
      }),
    );
    const formatContent = computed(() => props.format(props.percentage));
    return () => {
      const { type, status, percentage, duration, content, placement, showText, textBold } = props;
      const classes = {
        [classHelper.block]: true,
        [`${classHelper.block}-${type}`]: true,
        [`${classHelper.block}-status-${status}`]: true,
        [`${classHelper.block}-${sizeRef.value}`]: true,
      };
      const barStyle: CSSProperties = {
        width: percentage ? `${percentage}%` : sizeMap[sizeRef.value],
        animationDuration: `${duration}s`,
        backgroundColor: getCurrentColor(percentage),
      };

      const placementStyle =
        placement == 'follow'
          ? {
              right: `${100 - percentage}%`,
              left:
                (progressRef.value?.offsetWidth || 0) <= (textRef.value?.offsetWidth || 0) ? 0 : '',
              marginLeft: 0,
              minWidth: 'auto',
            }
          : {};

      return (
        <div class={classes}>
          {type == 'line' ? (
            <div class={`${classHelper.block}-bar`}>
              <div
                class={`${classHelper.block}-bar__outer`}
                style={{ height: sizeMap[sizeRef.value] }}
              >
                <div
                  ref={progressRef}
                  class={`${classHelper.block}-bar__inner`}
                  style={barStyle}
                ></div>
              </div>
            </div>
          ) : (
            <div
              class={classHelper.m('circle')}
              style={{
                height: `${radiusMap[sizeRef.value]}px`,
                width: `${radiusMap[sizeRef.value]}px`,
              }}
            >
              <svg viewBox="0 0 100 100">
                <path
                  d={trackPath.value}
                  stroke={cssVariable('bg-hover')}
                  stroke-width={strokeWidthMap[sizeRef.value]}
                  fill="none"
                  style={trailPathStyle.value}
                />
                <path
                  d={trackPath.value}
                  stroke={stroke.value}
                  fill="none"
                  stroke-linecap="round"
                  stroke-width={percentage ? strokeWidthMap[sizeRef.value] : 0}
                  style={circlePathStyle.value}
                />
              </svg>
            </div>
          )}
          {!(type === 'circle' && sizeRef.value === 'mini') && showText && (
            <div
              style={placementStyle}
              class={`${classHelper.e('text')} ${classHelper.e('text')}-${placement}`}
            >
              {!status ? (
                <span style={{ fontWeight: textBold ? 'bold' : 'normal' }} ref={textRef}>
                  {content || formatContent.value}
                </span>
              ) : (
                <NIcon
                  size={type == 'circle' ? circleIconSize[sizeRef.value] : 14}
                  name={iconMap[props.status]?.icon}
                  color={iconMap[props.status]?.color}
                />
              )}
            </div>
          )}
        </div>
      );
    };
  },
});
