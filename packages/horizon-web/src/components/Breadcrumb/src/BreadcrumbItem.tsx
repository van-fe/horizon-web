import { defineComponent, toRefs, getCurrentInstance, h, inject, computed } from 'vue';
import { useBreadcrumbItemProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { BreadcrumbItemSlots } from './composables/useSlots';
import { useBreadcrumbItemSlots } from './composables/useSlots';
import useSize from '~/utils/useSize';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import {
  NBreadcrumbItemClickInjectKey,
  NBreadcrumbProps,
  NBreadcrumbSlots,
} from './utils/injectedKeys';
import { onClickBreadcrumbItem } from './utils/helpers';
import type { BreadcrumbItemEmits } from './composables/useEmits';
import { useBreadcrumbItemEmits } from './composables/useEmits';

export default defineComponent({
  name: `${useNamespace()}BreadcrumbItem`,
  props: useBreadcrumbItemProps,
  emits: useBreadcrumbItemEmits,
  slots: useBreadcrumbItemSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<BreadcrumbItemEmits, BreadcrumbItemSlots>) {
    const classHelper = new ComponentClassBlock('breadcrumb-item');
    const { size } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium');

    const parentProps = inject(NBreadcrumbProps, undefined);
    const parentSlots = inject(NBreadcrumbSlots, undefined);
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

    const clickable = computed(() => !!props.to || props.clickable);

    const parentItemClick = inject(NBreadcrumbItemClickInjectKey, undefined);

    const onClick = (evt: MouseEvent) => {
      if (clickable.value) {
        onClickBreadcrumbItem(props, router);
        emit('click', evt);
        parentItemClick?.(props, evt);
      }
    };

    return () => (
      <span class={cls(classHelper.block)}>
        <NTooltip overflow={true}>
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
        </NTooltip>
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
