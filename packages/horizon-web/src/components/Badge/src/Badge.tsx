import { computed, defineComponent, toRefs } from 'vue';
import { useBadgeProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { slotVNodes, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { NIcon } from '@aurora/icon';
import type { BadgeSlots } from './composables/useSlots';
import { useBadgeSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Badge`,
  desc: '元素上的状态或数字标记',
  components: {
    NIcon,
  },
  props: useBadgeProps,
  slots: useBadgeSlots,
  setup(props, { slots }: LegoSetupContext<{}, BadgeSlots>) {
    const {
      type: typeRef,
      content: contentRef,
      hidden: hiddenRef,
      numMax: numMaxRef,
      iconSize: iconSizeRef,
      iconColor: iconColorRef,
      bottom: bottomRef,
      align: alignRef,
      offset: offsetRef,
      color: colorRef,
    } = toRefs(props);
    const numDisplayRef = computed(() => {
      if (Number(contentRef.value) <= numMaxRef.value) {
        return contentRef.value;
      }
      return `${numMaxRef.value}+`;
    });
    const cls = new ComponentClassBlock('badge');
    return () => {
      const vnodes = slotVNodes(slots.default);
      return (
        <div
          class={[
            cls.block,
            typeRef.value === 'dot' && cls.m('dot'),
            typeRef.value === 'num' && cls.m('num'),
            typeRef.value === 'icon' && cls.m('icon'),
            bottomRef.value && cls.m('bottom'),
            cls.m(alignRef.value),
          ]}
        >
          {vnodes}
          {hiddenRef.value ? null : (
            <div
              class={cls.e('content')}
              style={{
                backgroundColor: colorRef.value,
                ...offsetRef.value,
              }}
            >
              {typeRef.value === 'num' && <span>{numDisplayRef.value}</span>}
              {typeRef.value === 'icon' && (
                <NIcon
                  name={contentRef.value.toString()}
                  size={iconSizeRef.value}
                  color={iconColorRef.value}
                />
              )}
            </div>
          )}
        </div>
      );
    };
  },
});
