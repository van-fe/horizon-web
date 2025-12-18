import { useNamespace } from '@aurora/utils';
import type { PropType } from 'vue';
import { onBeforeUnmount, defineComponent, onMounted, watch, ref, provide } from 'vue';
import { isPadBrowser } from './utils/deviceJudge';
import { NSuitPadIsPadModeInjectKey } from './utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}SuitPad`,
  props: {
    force: {
      type: Boolean,
      default: false,
    },
    excludes: {
      type: Array as PropType<
        Array<
          | 'button'
          | 'date-picker'
          | 'pagination'
          | 'picker'
          | 'input'
          | 'input-number'
          | 'tree'
          | 'checkbox'
          | 'radio'
          | 'dropdown'
        >
      >,
    },
  },
  setup(props, { slots }) {
    const isCurrentPadMode = ref(false);

    watch(
      () => props.force,
      val => {
        if (val) {
          setSuitPadClassName();
        } else {
          removeSuitPadClassName();
        }
      },
    );

    function setSuitPadClassName() {
      if (isPadBrowser() || props.force) {
        isCurrentPadMode.value = true;
        document.body.classList.add('is-suit-pad');

        if (props.excludes) {
          for (const exclude of props.excludes) {
            document.body.classList.add(`not-for-${exclude}`);
          }
        }
      }
    }

    function removeSuitPadClassName() {
      isCurrentPadMode.value = false;
      document.body.classList.remove('is-suit-pad');
    }

    provide(NSuitPadIsPadModeInjectKey, isCurrentPadMode);

    onMounted(() => {
      setSuitPadClassName();
    });

    onBeforeUnmount(() => {
      removeSuitPadClassName();
    });

    return () => slots.default?.();
  },
});
