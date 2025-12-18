import { defineComponent, ref, watch } from 'vue';
import { NButton } from '../../../../components/Button';
import { ComponentClassBlock, cssVariable, isNil, useNamespace, useZIndex } from '@aurora/shared';
import { usePopconfirmProps } from '../composables/useProps';
import clickOutside from '~/directives/v-click-outside';
import { NIcon } from '@aurora/icon';
import NTransition from '~/components/Transition/src/Transition';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: `${useNamespace()}PopConfirm`,
  components: {
    NButton,
    NIcon,
    NTransition,
  },
  directives: {
    clickOutside,
  },
  props: usePopconfirmProps,
  emits: {
    cancel: (evt?: MouseEvent) => evt instanceof MouseEvent || isNil(evt),
    ok: (evt?: MouseEvent) => evt instanceof MouseEvent || isNil(evt),
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('popconfirm');
    const getIcon = () => {
      if (props.iconName) {
        return {
          name: props.iconName,
          color: props.iconColor || '',
          size: props.iconSize || '',
        };
      }
      if (props.type) {
        let name = '';
        let color = '';
        switch (props.type) {
          case 'info':
            name = 'info_filled';
            color = cssVariable('text-info-default');
            break;
          case 'success':
            name = 'success_filled';
            color = cssVariable('text-success-default');
            break;
          case 'warning':
            name = 'warning_filled';
            color = cssVariable('text-warning-default');
            break;
          case 'error':
            name = 'warning_filled';
            color = cssVariable('text-error-default');
            break;
          default:
            name = '';
            color = '';
            break;
        }
        return {
          name,
          color,
          size: '24',
        };
      }
      // 没有传 type 则视为 warning
      return {
        name: 'warning_filled',
        color: cssVariable('text-warning-default'),
        size: '24',
      };
    };

    const zIndexHandler = useZIndex(props.zIndex);
    const zIndex = ref(zIndexHandler.current);

    watch(
      () => props.visible,
      val => {
        if (val) {
          zIndex.value = zIndexHandler.next();
        }
      },
    );

    return () => (
      <NTransition>
        <div
          v-click-outside={() => emit('cancel')}
          class={classHelper.block}
          role="tooltip"
          style={{
            zIndex: zIndex.value,
          }}
        >
          <div class={classHelper.e('body')}>
            {getIcon() ? (
              <NIcon
                class={`${classHelper.e('icon')}`}
                name={getIcon()?.name}
                color={getIcon()?.color}
                size={getIcon()?.size}
              />
            ) : undefined}
            <div class={classHelper.e('content')}>
              {props.title || useLocaleLang('popConfirm.title').value}
            </div>
          </div>
          <div class={classHelper.e('footer')}>
            <NButton
              plain={true}
              size="small"
              forceNewestSize={true}
              {...props.cancelButtonProps}
              onClick={(evt: MouseEvent) => emit('cancel', evt)}
            >
              {props.cancelText || useLocaleLang('global.cancel').value}
            </NButton>
            <NButton
              size="small"
              forceNewestSize={true}
              {...props.okButtonProps}
              onClick={(evt: MouseEvent) => emit('ok', evt)}
              style="margin-left: 12px"
            >
              {props.okText || useLocaleLang('global.confirm').value}
            </NButton>
          </div>
          <div class={classHelper.e('arrow')} data-popper-arrow="" />
        </div>
      </NTransition>
    );
  },
});
