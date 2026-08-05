import { defineComponent, toRefs, getCurrentInstance, h, inject, computed } from 'vue';
import { useBreadcrumbItemProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { BreadcrumbItemSlots } from './composables/useSlots';
import { useBreadcrumbItemSlots } from './composables/useSlots';
import useSize from '~/utils/useSize';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import {
  HBreadcrumbItemClickInjectKey,
  HBreadcrumbProps,
  HBreadcrumbSlots,
} from './utils/injectedKeys';
import { onClickBreadcrumbItem } from './utils/helpers';
import type { BreadcrumbItemEmits } from './composables/useEmits';
import { useBreadcrumbItemEmits } from './composables/useEmits';

export default defineComponent({
  name: `${useNamespace()}BreadcrumbItem`,
  desc: "面包屑导航中的单个层级项",
  descLocales: { en: "A single hierarchy item within Breadcrumb." },
  props: useBreadcrumbItemProps,
  emits: useBreadcrumbItemEmits,
  slots: useBreadcrumbItemSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<BreadcrumbItemEmits, BreadcrumbItemSlots>) {
    const classHelper = new ComponentClassBlock('breadcrumb-item');
    const { size } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium');

    const parentProps = inject(HBreadcrumbProps, undefined);
    const parentSlots = inject(HBreadcrumbSlots, undefined);
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

    const clickable = computed(() => !!props.to || props.clickable);

    const parentItemClick = inject(HBreadcrumbItemClickInjectKey, undefined);

    const onClick = (evt: MouseEvent) => {
      if (clickable.value) {
        onClickBreadcrumbItem(props, router);
        emit('click', evt);
        parentItemClick?.(props, evt);
      }
    };

    return () => (
      <span class={cls(classHelper.block)}>
        <HTooltip overflow={true}>
          {{
            default: () => (
              <div
                class={cls(
                  classHelper.e('text'),
                  classHelper.e('link', clickable.value),
                  classHelper.m(sizeRef.value),
                  classHelper.e('title', props.title),
                )}
                onClick={onClick}
              >
                {slots.default?.()}
              </div>
            ),
            content: () => slots.default?.() ?? '',
          }}
        </HTooltip>
        <span class={classHelper.e('suffix')}>
          {slots.separator?.() ??
            parentSlots?.separator?.() ??
            (props.separator
              ? typeof props.separator === 'object'
                ? h(props.separator, {
                    size: 12,
                  })
                : props.separator
              : typeof parentProps?.separator === 'object'
                ? h(parentProps.separator, {
                    size: 12,
                  })
                : parentProps?.separator)}
        </span>
      </span>
    );
  },
});
