import { defineComponent } from 'vue';
import { useSkeletonProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/shared';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/shared';
import SkeletonItem from './SkeletonItem';
import type { SkeletonSlots } from './composables/useSlots';
import { useSkeletonSlots } from './composables/useSlots';
import NTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}Skeleton`,
  desc:
    '从功能本质上,Skeleton和loading没有什么区别，都是为了给用户反馈现在正在处于等待加载的阶段，但是从体验感上，骨架屏会比loading更加具有引导性，能更好的帮助用户聚焦。 \n' +
    '那么哪些加载的过程更合适使用骨架屏呢？ \n' +
    '1.当页面内呈现重复性内容较多时 \n' +
    '2.大段文本 \n' +
    '3.列表和表格',
  components: {
    NTransition,
  },
  props: useSkeletonProps,
  slots: useSkeletonSlots,
  setup(props, { slots }: LegoSetupContext<{}, SkeletonSlots>) {
    const classHelper = new ComponentClassBlock('skeleton');
    return () => (
      <NTransition name="fade-in">
        {props.loading ? (
          <div class={classHelper.block}>
            <div
              class={cls({
                [classHelper.e('animated')]: props.animated,
              })}
            >
              {slots.default ? (
                slots.loadingTemplate?.()
              ) : (
                <div>
                  <SkeletonItem shape={'text'}></SkeletonItem>
                  <SkeletonItem shape={'text'}></SkeletonItem>
                  <SkeletonItem shape={'text'} style={'width: 55%'}></SkeletonItem>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div class={classHelper.block}>
            <div class={classHelper.e('content')}>{slots?.default?.()}</div>
          </div>
        )}
      </NTransition>
    );
  },
});
