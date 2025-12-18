import { defineComponent, onMounted, ref } from 'vue';
import { useMsgBoxConfirmProps } from '../composables/useProps';
import NDialog from '~/components/Dialog/src/Dialog';
import { useSensor } from '~/utils/useSensor';
import { ComponentClassBlock } from '@nio-fe/shared';

export default defineComponent({
  name: 'MessageBoxConfirm',
  components: {
    NDialog,
  },
  props: useMsgBoxConfirmProps,
  emits: ['close', 'confirmClick'],
  setup(props, { emit, expose }) {
    const classHelper = new ComponentClassBlock('messagebox');

    const visibleRef = ref(false);
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
            color = '#1880F2';
            break;
          case 'success':
            name = 'success_filled';
            color = '#26BD4B';
            break;
          case 'warning':
            name = 'warning_filled';
            color = '#FDA71C';
            break;
          case 'error':
            name = 'warning_filled';
            color = '#E83030';
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

    onMounted(() => {
      useSensor('$confirm', props, 'method');
    });

    return () => (
      <NDialog
        class={[classHelper.block, classHelper.e('pure', !props.title)]}
        classNames={{ body: classHelper.e('confirm-body') }}
        visible={visibleRef.value}
        title={props.title}
        size="small"
        closeButton={props.closeButton}
        iconName={getIcon()?.name}
        iconColor={getIcon()?.color}
        iconSize={getIcon()?.size}
        escClose={props.escClose}
        maskClose={props.maskClose}
        okText={props.okText}
        okButtonProps={props.okButtonProps}
        cancelText={props.cancelText}
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
      </NDialog>
    );
  },
});
