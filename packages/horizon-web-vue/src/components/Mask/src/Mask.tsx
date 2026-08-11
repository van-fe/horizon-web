import { defineComponent, computed } from 'vue';
import { useMaskProps } from './composables/useProps';
import { useMaskEmits } from './composables/useEmits';
import type { MaskSlots } from './composables/useSlots';
import { useMaskSlots } from './composables/useSlots';
import type { MaskEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, cssVariable, useNamespace } from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}Mask`,
  desc: '提供一个遮罩，可以覆盖在任意元素上',
  descLocales: { en: "Add a dim layer on the application (type: five types, default is default)." },
  props: useMaskProps,
  emits: useMaskEmits,
  slots: useMaskSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<MaskEmits, MaskSlots>) {
    // 默认type的情况 进行渲染
    const backgroundColorMap = new Map([
      ['default', cssVariable('bg-overlay-default')],
      ['weak', cssVariable('bg-overlay-weak')],
      ['strong', cssVariable('bg-overlay-strong')],
      ['inverse', cssVariable('bg-overlay-inverse')],
      ['transparent', cssVariable('bg-transparent')],
      ['customize', props.color],
    ]);
    const classDefault = new ComponentClassBlock('mask');
    // 根据不同的type 设置不同的状态
    const defaultStyle = computed(() => {
      return {
        absolute: !!props.absolute ? classDefault.e('absolute') : '',
        backgroundColor: props.isFuzzification
          ? {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              opacity: 1,
              backdropFilter: 'blur(8px)',
            }
          : {
              backgroundColor: props.color ? props.color : backgroundColorMap.get(props.type),
              opacity: props.opacity,
            },
      };
    });

    return () => (
      <div
        class={cls(classDefault.block, classDefault.is('absolute', props.absolute))}
        style={{
          zIndex: props.zIndex,
          opacity: props.value ? 1 : 0,
          pointerEvents: props.value ? 'auto' : 'none',
        }}
      >
        {/* 蒙层 */}
        <div
          class={cls(classDefault.e('scrim'), props.scrimClass)}
          style={{
            ...defaultStyle.value.backgroundColor,
            ...props.scrimStyle,
          }}
          onClick={() => {
            emit('clickMask');
          }}
        />
        {/* 蒙层内部内容 */}
        <div
          class={cls(
            classDefault.e('content'),
            classDefault.is('full-size', props.contentFullSize),
          )}
        >
          {slots.default?.()}
        </div>
      </div>
    );
  },
});
