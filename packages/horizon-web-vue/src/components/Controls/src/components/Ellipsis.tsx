import type { PropType, RendererElement, RendererNode, VNode } from 'vue';
import { defineComponent, inject } from 'vue';
import {
  cls,
  ComponentClassBlock,
  useNamespace,
  isRawSlotsForVNodeNormalizedChildren,
} from '@aurora/utils';
import type { ControlProps } from '../composables/useProps';
import { useControlSlots } from '../composables/useSlots';
import { HControlsEmitInjectKey, HControlsPropsInjectKey } from '../utils/injectKeys';
import HDropdown from '~/components/Dropdown/src/Dropdown';
import HDropdownItem from '~/components/Dropdown/src/DropdownItem';
import HDropdownMenu from '~/components/Dropdown/src/DropdownMenu';
import { IconMoreTwo } from '@aurora/icon';
import { renderIcon } from '~/utils/useIcon';

export default defineComponent({
  name: `${useNamespace()}Ellipsis`,
  components: {
    HDropdown,
  },
  props: {
    items: {
      type: Array as PropType<VNode<RendererNode, RendererElement, ControlProps>[]>,
      required: true,
    },
  },
  emits: {
    /**
     * 下拉菜单点击事件
     */
    dropdownItemClick: () => true,
  },
  slots: useControlSlots,
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('control');

    const parentProps = inject(HControlsPropsInjectKey)!;
    const parentEmits = inject(HControlsEmitInjectKey)!;

    function onClick(item: VNode<RendererNode, RendererElement, ControlProps>, evt: Event) {
      parentEmits('command', item.props!.label, evt);
      emit('dropdownItemClick');
    }

    return () => (
      <HDropdown disabled={parentProps.disabled} toBody={false}>
        {{
          default: () => (
            <div class={cls(classHelper.block, classHelper.is('ellipsis'))}>
              <IconMoreTwo color={parentProps.iconColor} />
            </div>
          ),
          dropdown: () => (
            <HDropdownMenu>
              {props.items.map(item => (
                <HDropdownItem onClick={evt => onClick(item, evt)}>
                  {renderIcon(item.props?.icon)}
                  {isRawSlotsForVNodeNormalizedChildren(item.children)
                    ? item.children.text?.()
                    : item.props?.text}
                </HDropdownItem>
              ))}
            </HDropdownMenu>
          )
        }}
      </HDropdown>
    );
  },
});
