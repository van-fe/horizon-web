import { defineComponent, onMounted, ref } from 'vue';
import { useMsgBoxAlertProps } from '../composables/useProps';
import NDialog from '~/components/Dialog/src/Dialog';
import { useSensor } from '~/utils/useSensor';
import { ComponentClassBlock } from '@nio-fe/shared';

export default defineComponent({
  name: 'MessageBoxAlert',
  components: {
    NDialog,
  },
  props: useMsgBoxAlertProps,
  emits: ['close', 'confirmClick'],
  setup(props, { emit, expose }) {
    const visibleRef = ref(false);
    const classHelper = new ComponentClassBlock('messagebox');

    const open = () => {
      visibleRef.value = true;
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    };

    const close = () => {
      visibleRef.value = false;
      emit('confirmClick');
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
          size: '20',
        };
      }
      return null;
    };

    expose({ open });

    onMounted(() => {
      useSensor('$alert', props, 'method');
    });

    return () => {
      return (
        <NDialog
          class={[classHelper.block, classHelper.e('pure', !props.title)]}
          classNames={{ body: classHelper.e('alert-body') }}
          visible={visibleRef.value}
          onUpdate:visible={val => (visibleRef.value = val)}
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
          cancelButtonProps={false}
          onOk={close}
          onConfirmDebounceFinished={() => close()}
          onCloseIconClick={() => emit('close')}
          onMaskClick={() => emit('close')}
          zIndex={props.zIndex}
        >
          {props.content}
        </NDialog>
      );
    };
  },
});
