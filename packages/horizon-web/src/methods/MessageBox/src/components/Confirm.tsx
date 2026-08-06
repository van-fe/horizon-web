import { defineComponent, ref } from 'vue';
import { useMsgBoxConfirmProps } from '../composables/useProps';
import HDialog from '~/components/Dialog/src/Dialog';
import { ComponentClassBlock } from '@aurora/utils';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: 'MessageBoxConfirm',
  components: {
    HDialog,
  },
  props: useMsgBoxConfirmProps,
  emits: ['close', 'confirmClick'],
  setup(props, { emit, expose }) {
    const classHelper = new ComponentClassBlock('messagebox');

    const visibleRef = ref(false);
    const defaultOkText = useLocaleLang('global.ok', 'OK');
    const defaultCancelText = useLocaleLang('global.cancel', 'Cancel');
    const open = () => {
      visibleRef.value = true;
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    };
    const close = () => {
      visibleRef.value = false;
    };
    const getIcon = () => {
      if (props.iconName) {
        return {
          name: props.iconName,
          color: props.iconColor || '',
          size: props.iconSize || '',
        };
      }
      if (props.type) {
        let name, color;
        switch (props.type) {
          case 'info':
            name = 'info_filled';
            color = ['#1880F2', '#FFFFFF'];
            break;
          case 'success':
            name = 'success_filled';
            color = ['#26BD4B', '#FFFFFF'];
            break;
          case 'warning':
            name = 'warning_filled';
            color = ['#FDA71C', '#FFFFFF'];
            break;
          case 'error':
            name = 'error_filled';
            color = ['#E83030', '#FFFFFF'];
            break;
          default:
            name = '';
            color = '';
            break;
        }
        return {
          name,
          color,
          size: '22',
        };
      }
      return null;
    };

    expose({ open });

    return () => (
      <HDialog
        class={[classHelper.block, classHelper.e('pure', !props.title)]}
        classNames={{ body: classHelper.e('confirm-body') }}
        visible={visibleRef.value}
        title={props.title}
        size="small"
        closeButton={props.closeButton}
        iconName={getIcon()?.name}
        iconColor={getIcon()?.color}
        escClose={props.escClose}
        maskClose={props.maskClose}
        okText={props.okText || (defaultOkText.value as string)}
        okButtonProps={props.okButtonProps}
        cancelText={props.cancelText || (defaultCancelText.value as string)}
        cancelButtonProps={props.cancelButtonProps}
        onOk={() => emit('confirmClick', close)}
        onCancel={close}
        onConfirmDebounceFinished={() => emit('confirmClick', close)}
        onCancelDebounceFinished={() => close()}
        onClose={() => emit('close')}
        zIndex={props.zIndex}
        onUpdate:visible={val => (visibleRef.value = val)}
      >
        {props.content}
      </HDialog>
    );
  },
});
