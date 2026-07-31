import { AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { computed, defineComponent } from 'vue';
import HSpin from '~/components/Spin/src/Spin';
import { getCurrentLocale } from '~/utils/useLocaleLang';
import useLocaleLang from '~/utils/useLocaleLang';
import { useStatisticProps } from './composables/useProps';
import type { StatisticSlots } from './composables/useSlots';
import { useStatisticSlots } from './composables/useSlots';

const localeMap: Record<string, string> = {
  AE: 'ar-AE',
  DE: 'de-DE',
  En: 'en',
  EnGB: 'en-GB',
  EnUS: 'en-US',
  SG: 'en-SG',
  SvSE: 'sv-SE',
  ZhCN: 'zh-CN',
  ZhTW: 'zh-TW',
};

export default defineComponent({
  name: `${useNamespace()}Statistic`,
  desc: '展示关键统计数值、单位和业务趋势',
  descLocales: { en: 'Displays a key statistic, unit, and business trend.' },
  props: useStatisticProps,
  slots: useStatisticSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, StatisticSlots>) {
    const classHelper = new ComponentClassBlock('statistic');
    const currentLocale = getCurrentLocale();
    const increaseText = useLocaleLang('statistic.increase', 'Increased');
    const decreaseText = useLocaleLang('statistic.decrease', 'Decreased');

    const formattedValue = computed(() => {
      if (props.formatter) return props.formatter(props.value);
      if (typeof props.value !== 'number' || !Number.isFinite(props.value)) return props.value;
      const locale = props.locale || localeMap[currentLocale.value ?? 'En'] || 'en';
      const precision = props.precision;
      return new Intl.NumberFormat(locale, {
        useGrouping: props.useGrouping,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(props.value);
    });

    return () => {
      const trendLabel = props.trend === 'up' ? increaseText.value : decreaseText.value;
      return (
        <div class={classHelper.block} aria-busy={props.loading ? 'true' : 'false'}>
          {(slots.title || props.title) && (
            <div class={classHelper.e('title')}>{slots.title?.() ?? props.title}</div>
          )}
          <HSpin spinning={props.loading} size="small">
            <div class={classHelper.e('body')}>
              <div class={classHelper.e('value')}>
                {(slots.prefix || props.prefix) && (
                  <span class={classHelper.e('prefix')}>{slots.prefix?.() ?? props.prefix}</span>
                )}
                <span class={classHelper.e('number')}>
                  {slots.default?.() ?? formattedValue.value}
                </span>
                {(slots.suffix || props.suffix) && (
                  <span class={classHelper.e('suffix')}>{slots.suffix?.() ?? props.suffix}</span>
                )}
              </div>
              {(slots.trend || props.trend !== 'none' || props.trendValue !== undefined) && (
                <div
                  class={[classHelper.e('trend'), classHelper.m(`trend-${props.trendType}`)]}
                  aria-label={props.trend !== 'none' ? (trendLabel as string) : undefined}
                >
                  {slots.trend?.() ?? (
                    <>
                      {props.trend !== 'none' && (
                        <AIcon
                          name={props.trend === 'up' ? 'arrow_up' : 'arrow_down'}
                          aria-hidden="true"
                        />
                      )}
                      {props.trendValue !== undefined && <span>{props.trendValue}</span>}
                    </>
                  )}
                </div>
              )}
            </div>
          </HSpin>
        </div>
      );
    };
  },
});
