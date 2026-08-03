import type { VNode } from 'vue';
import { watchEffect, watch, defineComponent, ref, computed, toRefs } from 'vue';
import { useAvatarProps } from './composables/useProps';
import type { AvatarProps } from './composables/useProps';
import { useDrawImages, useWorkText, randomAvatar } from './composables/useAvatar';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, isNumber, isString, useNamespace } from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import type { AvatarEmits } from './composables/useEmits';
import { useAvatarEmits } from './composables/useEmits';
import type { AvatarSlots } from './composables/useSlots';
import { useAvatarSlots } from './composables/useSlots';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Avatar`,
  desc: '返回页面顶部按钮',
  components: { AIcon },
  props: useAvatarProps,
  emits: useAvatarEmits,
  slots: useAvatarSlots,
  setup(props: AvatarProps, { emit, slots }: HorizonWebSetupContext<AvatarEmits, AvatarSlots>) {
    const imgRef = ref<Element | null>(null);
    const classHelper = new ComponentClassBlock('avatar');
    const { size } = toRefs(props);
    const isArray = computed(() => Array.isArray(props.src));
    const randomSrc = ref('');
    watchEffect(onCleanup => {
      let cancelled = false;
      const sources = isArray.value ? (props.src as string[]).slice(0, 9) : [];

      if (sources.length) {
        useDrawImages(sources).then(url => {
          if (!cancelled) randomSrc.value = url;
        });
      } else {
        randomSrc.value = props.randomSrc?.length
          ? props.randomSrc[Math.floor(Math.random() * props.randomSrc.length)]
          : randomAvatar[Math.floor(Math.random() * randomAvatar.length)];
      }

      onCleanup(() => {
        cancelled = true;
      });
    });
    const error = ref(false);

    const sizeRef = useSize(size, 'medium');

    const handleError = (event: Event) => {
      error.value = true;
      emit('error', event);
    };

    watch([() => props.src, () => randomSrc.value], () => {
      error.value = false;
    });

    return () => {
      let tsxStr: VNode | Array<VNode> = (
        <img
          alt="头像"
          ref={imgRef}
          onError={handleError}
          class={cls(classHelper.e('img'))}
          style={{ 'object-fit': props.fit }}
          src={
            error.value
              ? props.default
              : props.src.length && !isArray.value
                ? (props.src as string)
                : randomSrc.value
          }
        />
      );

      if (props.icon) {
        tsxStr = <AIcon name={props.icon} class={classHelper.e('icon')} />;
      } else if (props.type === 'work' && !isArray.value) {
        const strArr = useWorkText(props.src as string, sizeRef.value);
        tsxStr = strArr.map((txt: string) => <span class={classHelper.e('txt')}>{txt}</span>);
      }

      const style = computed(() => {
        if (isNumber(sizeRef.value)) {
          return {
            width: sizeRef.value + 'px',
            height: sizeRef.value + 'px',
          };
        } else {
          return {};
        }
      });

      return (
        <span
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value as string, isString(sizeRef.value)),
            classHelper.m(props.type),
            classHelper.m('error', error.value),
          )}
          style={style.value}
        >
          {slots.default?.() ?? (error.value && slots.error ? slots.error() : tsxStr)}
        </span>
      );
    };
  },
});
