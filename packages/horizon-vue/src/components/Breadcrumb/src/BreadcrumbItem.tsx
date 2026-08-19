import { defineComponent, toRefs, getCurrentInstance, h, inject, computed } from 'vue';
import { isBreadcrumbItemClickable } from '@aurora/core';
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
import type { BreadcrumbItem } from './composables/useProps';

export default defineComponent({
  name: `${useNamespace()}BreadcrumbItem`,
  desc: '面包屑导航中的单个层级项',
  descLocales: { en: 'A single hierarchy item within Breadcrumb.' },
  props: useBreadcrumbItemProps,
  emits: useBreadcrumbItemEmits,
  slots: useBreadcrumbItemSlots,
  inheritAttrs: false,
  setup(
    props,
    { attrs, emit, slots }: HorizonWebSetupContext<BreadcrumbItemEmits, BreadcrumbItemSlots>,
  ) {
    const classHelper = new ComponentClassBlock('breadcrumb-item');
    const { size } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium');

    const parentProps = inject(HBreadcrumbProps, undefined);
    const parentSlots = inject(HBreadcrumbSlots, undefined);
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

    const clickable = computed(() =>
      isBreadcrumbItemClickable({ route: props.to, clickable: props.clickable }),
    );

    const parentItemClick = inject(HBreadcrumbItemClickInjectKey, undefined);
    const sourceItem = computed(() => (attrs._sourceItem as BreadcrumbItem | undefined) ?? props);
    const rootAttrs = computed(() =>
      Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== '_sourceItem')),
    );

    const onClick = (evt: MouseEvent) => {
      if (clickable.value) {
        if (props.to !== undefined) evt.preventDefault();
        emit('click', evt);
        if (parentItemClick) {
          parentItemClick(sourceItem.value, evt);
        } else {
          onClickBreadcrumbItem(props, router);
        }
      }
    };

    const routeHref = computed(() => {
      if (props.to === undefined || !router || typeof router.resolve !== 'function') {
        return undefined;
      }
      return router.resolve(props.to).href;
    });
    const textElement = computed(() =>
      props.to !== undefined ? 'a' : clickable.value ? 'button' : 'span',
    );

    return () => (
      <span {...rootAttrs.value} data-breadcrumb-item="" class={cls(classHelper.block)}>
        <HTooltip overflow={true}>
          {{
            default: () => (
              <textElement.value
                type={props.to === undefined && clickable.value ? 'button' : undefined}
                href={routeHref.value}
                class={cls(
                  classHelper.e('text'),
                  classHelper.e('link', clickable.value),
                  classHelper.m(sizeRef.value),
                  classHelper.e('title', props.title),
                )}
                onClick={onClick}
              >
                {slots.default?.()}
              </textElement.value>
            ),
            content: () => slots.default?.() ?? '',
          }}
        </HTooltip>
        <span class={classHelper.e('suffix')}>
          {slots.separator?.() ??
            parentSlots?.separator?.() ??
            (props.separator
              ? typeof props.separator !== 'string'
                ? h(props.separator, {
                    size: 12,
                  })
                : props.separator
              : parentProps?.separator && typeof parentProps.separator !== 'string'
                ? h(parentProps.separator, {
                    size: 12,
                  })
                : parentProps?.separator)}
        </span>
      </span>
    );
  },
});
