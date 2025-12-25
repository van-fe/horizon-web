import type { RendererElement } from 'vue';
import { computed, defineComponent, ref, Transition, TransitionGroup } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useTransitionProps } from './composables/useProps';
import { useTransitionEmits } from './composables/useEmits';
import { useTransitionSlots } from './composables/useSlots';
import { useTransitionExposes } from './composables/useExposes';
import type { TransitionEmits } from './composables/useEmits';
import type { TransitionSlots } from './composables/useSlots';
import { useNamespace, useLowCaseNamespace } from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}Transition`,
  desc: '内置过渡动画',
  version: '1.6.2',
  props: useTransitionProps,
  emits: useTransitionEmits,
  slots: useTransitionSlots,
  exposes: useTransitionExposes,
  setup(props, { slots, emit, attrs }: HorizonWebSetupContext<TransitionEmits, TransitionSlots>) {
    const isEntered = ref(false);
    const isLeaved = ref(true);

    function onBeforeEnter(el: RendererElement) {
      if (!el.dataset) el.dataset = {};

      if (props.name === 'collapse') {
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      } else if (props.name === 'collapse-horizontal') {
        el.dataset.oldPaddingLeft = el.style.paddingLeft;
        el.dataset.oldPaddingRight = el.style.paddingRight;

        el.style.maxWidth = 0;
        el.style.paddingLeft = 0;
        el.style.paddingRight = 0;
      }

      emit('beforeEnter', el);
    }

    function onEnter(el: RendererElement) {
      if (props.name === 'collapse') {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = `${el.scrollHeight}px`;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
          el.style.maxHeight = 0;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
        el.style.overflow = 'hidden';
      } else if (props.name === 'collapse-horizontal') {
        el.dataset.oldOverflow = el.style.overflow;

        if (el.scrollWidth !== 0) {
          el.style.maxWidth = `${el.scrollWidth}px`;
          el.style.paddingLeft = el.dataset.oldPaddingLeft;
          el.style.paddingRight = el.dataset.oldPaddingRight;
        } else {
          el.style.maxWidth = 0;
          el.style.paddingLeft = el.dataset.oldPaddingLeft;
          el.style.paddingRight = el.dataset.oldPaddingRight;
        }
        el.style.overflow = 'hidden';
      }

      isLeaved.value = false;
      emit('enter', el);
    }

    function onAfterEnter(el: RendererElement) {
      if (props.name === 'collapse') {
        el.style.maxHeight = '';
        el.style.overflow = el.dataset.oldOverflow;
      } else if (props.name === 'collapse-horizontal') {
        el.style.maxWidth = '';
        el.style.overflow = el.dataset.oldOverflow;
      }

      isEntered.value = true;
      emit('afterEnter', el);
    }

    function onBeforeLeave(el: RendererElement) {
      if (props.name === 'collapse') {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = 'hidden';
      } else if (props.name === 'collapse-horizontal') {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingLeft = el.style.paddingLeft;
        el.dataset.oldPaddingRight = el.style.paddingRight;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxWidth = `${el.scrollWidth}px`;
        el.style.overflow = 'hidden';
      }

      emit('beforeLeave', el);
    }

    function onLeave(el: RendererElement) {
      if (props.name === 'collapse') {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      } else if (props.name === 'collapse-horizontal') {
        if (el.scrollWidth !== 0) {
          el.style.maxWidth = 0;
          el.style.paddingLeft = 0;
          el.style.paddingRight = 0;
        }
      }

      isEntered.value = false;
      emit('leave', el);
    }

    function onAfterLeave(el: RendererElement) {
      if (props.name === 'collapse') {
        el.style.maxHeight = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else if (props.name === 'collapse-horizontal') {
        el.style.maxWidth = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingLeft = el.dataset.oldPaddingLeft;
        el.style.paddingRight = el.dataset.oldPaddingRight;
      }

      isLeaved.value = true;
      emit('afterLeave', el);
    }

    const componentName = computed(() => (props.group ? TransitionGroup : Transition));

    const appendAttrs = computed(() => {
      const res: Record<string, unknown> = {};

      if (!props.group && props.mode) {
        res.mode = props.mode;
      }

      if (props.persisted) {
        res.persisted = props.persisted;
      }

      if (props.appear) {
        res.appear = props.appear;
      }

      if (props.css) {
        res.css = props.css;
      }

      return { ...res, ...attrs };
    });

    const transitionName = computed(() => {
      if (props.name.startsWith('dropdown') || props.name.startsWith('tooltip')) {
        return `${useLowCaseNamespace()}-${props.name}`;
      } else {
        return `${useLowCaseNamespace()}-${props.name}-${props.speed}`;
      }
    });

    const duration = computed(() => {
      if (props.name.includes('collapse')) return undefined;

      if (props.name.startsWith('dropdown') || props.name.startsWith('tooltip')) {
        return isLeaved.value ? 400 : 200;
      }

      switch (props.speed) {
        case 'extra-fast':
          return 180;
        case 'fast':
          return 200;
        case 'slow':
          return 400;
        default:
          return 300;
      }
    });

    return () => (
      <componentName.value
        name={transitionName.value}
        duration={duration.value}
        onBeforeEnter={onBeforeEnter}
        onEnter={onEnter}
        onAfterEnter={onAfterEnter}
        onBeforeLeave={onBeforeLeave}
        onLeave={onLeave}
        onAfterLeave={onAfterLeave}
        {...appendAttrs.value}
      >
        {slots.default?.()}
      </componentName.value>
    );
  },
});
