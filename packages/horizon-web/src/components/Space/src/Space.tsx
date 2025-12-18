import type { LegoSetupContext } from '@aurora/utils';
import { ComponentClassBlock, getUnitString, isVNodeEmpty, useNamespace } from '@aurora/utils';
import type { CSSProperties, Ref, VNode } from 'vue';
import { Fragment, computed, defineComponent, inject, ref } from 'vue';
import { type NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import Divider from '~/components/Divider/src/Divider';
import type { SpaceEmits } from './composables/useEmits';
import { useSpaceEmits } from './composables/useEmits';
import type { SpaceExposes } from './composables/useExposes';
import { useSpaceExposes } from './composables/useExposes';
import type { NSpaceSize, SpaceProps } from './composables/useProps';
import { useSpaceProps } from './composables/useProps';
import type { SpaceSlots } from './composables/useSlots';
import { useSpaceSlots } from './composables/useSlots';
import SpaceItem from './SpaceItem';

export default defineComponent({
  name: `${useNamespace()}Space`,
  desc: '设置元素之间的间距',
  inheritAttrs: false,
  props: useSpaceProps,
  emits: useSpaceEmits,
  slots: useSpaceSlots,
  exposes: useSpaceExposes,
  setup(
    props: SpaceProps,
    { slots, attrs }: LegoSetupContext<SpaceEmits, SpaceSlots, SpaceExposes>,
  ) {
    const classHelper = new ComponentClassBlock('space');

    const globalSize = inject<Ref<NApplicationSizeType>>(GlobalSizeInjectedKey, ref('small'));

    const size = computed<NSpaceSize>(() =>
      Array.isArray(props.size)
        ? (props.size.slice(0, 2) as [number, number])
        : (getUnitString(props.size || globalSize.value) as string),
    );

    const isStdSize = computed(() => ['small', 'medium', 'large'].includes(props.size as any));

    const direction = computed(() => {
      return ['horizontal', 'vertical'].includes(props.direction) ? props.direction : 'horizontal';
    });

    const align = computed(() => {
      if (props.align) return props.align;

      return direction.value === 'horizontal' ? 'center' : null;
    });

    const style = computed<CSSProperties>(() => {
      const result: CSSProperties = { ...(attrs.style as CSSProperties) };

      if (isStdSize.value) return result;

      if (Array.isArray(size.value)) {
        result.gap = size.value.map(getUnitString).join(' ');
      } else {
        if (direction.value === 'horizontal') result.columnGap = size.value;
        if (direction.value === 'vertical') result.rowGap = size.value;
        if (props.wrap) result.gap = size.value;
      }
      return result;
    });

    const separatorDirection = computed(() => {
      return direction.value === 'horizontal' ? 'vertical' : 'horizontal';
    });

    return () => {
      const separator =
        slots?.separator?.() ??
        (props.separator ? (
          <Divider horizontalMargin={0} verticalMargin={0} direction={separatorDirection.value} />
        ) : undefined);

      let children = (slots.default?.() ?? [])
        // 过滤掉空白节点
        .filter(node => !isVNodeEmpty([node]))
        // 处理 Fragment 多节点
        .reduce((acc, vnode) => {
          if (props.fragment && vnode.type === Fragment) {
            // case: 如果 v-for 和 v-if 嵌套使用，则连续生成多个 fragment 节点
            const children = (vnode.children as VNode[]).filter(node => !isVNodeEmpty([node]));
            return acc.concat(...children);
          }
          return acc.concat(vnode);
        }, [] as VNode[])
        .map(vnode =>
          vnode.type === SpaceItem ? (
            vnode
          ) : (
            <SpaceItem key={vnode.key ?? undefined}>{vnode}</SpaceItem>
          ),
        );

      if (separator) {
        children = children.reduce((acc, vnode, i, list) => {
          return i !== list.length - 1 ? acc.concat(vnode, separator) : acc.concat(vnode);
        }, [] as VNode[]);
      }

      return (
        <div
          class={[
            classHelper.block,
            classHelper.m('block', !!props.block),
            classHelper.m(direction.value),
            classHelper.m(align.value!, !!align.value),
            classHelper.m('wrap', direction.value === 'horizontal' && props.wrap),
            classHelper.m(props.size as string, isStdSize.value),
          ]}
          {...attrs}
          style={style.value}
        >
          {children}
        </div>
      );
    };
  },
});
