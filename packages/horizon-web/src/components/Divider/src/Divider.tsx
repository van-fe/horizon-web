import { computed, defineComponent, Fragment } from 'vue';
import { useDividerProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/utils';
import type { DividerSlots } from './composables/useSlots';
import { useDividerSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Divider`,
  desc: '分割线用于分割内容\n有两种颜色的分割线，通常使用常规分割线，特殊情况下，如分割内部的元素或区块，可使用辅助分割线（次要分割线）',
  descLocales: { en: "By configuring `line-style`, you can change the line type" },
  props: useDividerProps,
  slots: useDividerSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, DividerSlots>) {
    const classHelper = new ComponentClassBlock('divider');

    const borderStyle = computed(() => {
      return {
        [`border-${props.direction === 'horizontal' ? 'top' : 'right'}-style`]: props.lineStyle,
      };
    });

    const type = computed(() =>
      props.type === 'primary' ? 'default' : props.type === 'secondary' ? 'strong' : props.type,
    );

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m(props.direction),
          classHelper.m(type.value),
          classHelper.m(`title-${props.titlePlacement}`),
        )}
        style={{
          margin:
            props.direction === 'horizontal'
              ? `${sizeUnitTransform(props.horizontalMargin)} 0`
              : `0 ${sizeUnitTransform(props.verticalMargin)}`,
        }}
      >
        <div class={classHelper.e('line-left')} style={borderStyle.value}></div>
        {slots.default ? (
          <Fragment>
            <span class={classHelper.e('title')}>{slots.default()}</span>
            <div class={classHelper.e('line-right')} style={borderStyle.value}></div>
          </Fragment>
        ) : undefined}
      </div>
    );
  },
});
