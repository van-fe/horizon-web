import { computed, defineComponent, inject, toRef } from 'vue';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useResultProps } from './composables/useProps';
import { useResultEmits } from './composables/useEmits';
import { useResultSlots } from './composables/useSlots';
import { useResultExposes } from './composables/useExposes';
import type { ResultEmits } from './composables/useEmits';
import type { ResultSlots } from './composables/useSlots';
import {
  IconSuccessFilledLight,
  IconInfoFilledLight,
  IconWarningFilledLight,
  IconErrorFilledLight,
} from '@aurora/icon';
import HButton from '~/components/Button/src/Button';
import { defaultLocale, localeInjectKey } from '~/provides';
import useSize from '~/utils/useSize';
import notAllowed from '@aurora/theme/assets/result-not-allowed.svg';
import notFound from '@aurora/theme/assets/result-not-found.svg';
import serverError from '@aurora/theme/assets/result-server-error.svg';
import {
  isResultIconType,
  normalizeResultHttpType,
  RESULT_DEFAULTS,
  type ResultHttpType,
} from '@aurora/core';

export default defineComponent({
  name: `${useNamespace()}Result`,
  desc: '用于对用户的操作结果或者异常状态做反馈',
  descLocales: { en: 'Default is `success` state' },
  components: {
    HButton,
    IconSuccessFilledLight,
    IconInfoFilledLight,
    IconWarningFilledLight,
    IconErrorFilledLight,
  },
  props: useResultProps,
  emits: useResultEmits,
  slots: useResultSlots,
  exposes: useResultExposes,
  setup(props, { emit, slots }: HorizonWebSetupContext<ResultEmits, ResultSlots>) {
    const classHelper = new ComponentClassBlock('result');

    const isIcon = computed(() => isResultIconType(props.type));

    const iconComponent = computed(() => {
      switch (props.type) {
        default:
        case 'info':
          return IconInfoFilledLight;
        case 'success':
          return IconSuccessFilledLight;
        case 'warning':
          return IconWarningFilledLight;
        case 'error':
          return IconErrorFilledLight;
      }
    });

    const status = computed(() => {
      switch (normalizeResultHttpType(props.type as ResultHttpType)) {
        default:
        case 404:
          return notFound;
        case 403:
          return notAllowed;
        case 500:
          return serverError;
      }
    });

    // global size
    const size = toRef(props, 'size');
    const sizeRef = useSize(size, RESULT_DEFAULTS.size);

    const locale = inject(localeInjectKey, defaultLocale);

    return () => (
      <div class={cls(classHelper.block, classHelper.is(sizeRef.value))}>
        {isIcon.value ? (
          <div class={cls(classHelper.e('icon'))}>
            {slots.icon?.() ?? <iconComponent.value size={56} />}
          </div>
        ) : (
          <div class={cls(classHelper.e('image'))}>
            <img src={status.value} />
          </div>
        )}
        <div class={cls(classHelper.e('title'))}>{slots.title?.() ?? props.title}</div>
        <div class={cls(classHelper.e('subtitle'))}>{slots.subtitle?.() ?? props.subtitle}</div>
        <div class={cls(classHelper.e('extra'))}>
          {slots.extra?.() ?? (
            <div class={classHelper.em('extra', 'buttons')}>
              {props.secondaryButton ? (
                <HButton
                  plain={true}
                  size={sizeRef.value}
                  {...props.secondaryButtonProps}
                  onClick={evt => emit('secondaryClick', evt)}
                >
                  {props.secondaryButtonText ??
                    locale.value?.langService.td().horizonWeb.result.secondaryButtonText}
                </HButton>
              ) : undefined}
              {props.primaryButton ? (
                <HButton
                  size={sizeRef.value}
                  {...props.primaryButtonProps}
                  onClick={evt => emit('primaryClick', evt)}
                >
                  {props.primaryButtonText ??
                    locale.value?.langService.td().horizonWeb.result.primaryButtonText}
                </HButton>
              ) : undefined}
            </div>
          )}
        </div>
      </div>
    );
  },
});
