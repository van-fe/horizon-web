import { defineComponent, toRefs } from 'vue';
import { useListItemProps } from './composables/useProps';
import type { ListItemProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import type { ListItemSlots } from './composables/useSlots';
import { useListItemSlots } from './composables/useSlots';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}ListItem`,
  props: useListItemProps,
  slots: useListItemSlots,
  setup(props: ListItemProps, { slots }: LegoSetupContext<{}, ListItemSlots>) {
    const classHelper = new ComponentClassBlock('list-item');

    const { titleSize } = toRefs(props);

    // global size
    const sizeRef = useSize(titleSize, 'medium');

    return () => (
      <div class={classHelper.block}>
        <main class={classHelper.e('main')}>
          {slots.sider && (
            <section class={classHelper.em('main', 'sider')}>{slots.sider()}</section>
          )}
          <section class={classHelper.em('main', 'content')}>
            {slots.title?.() ?? (
              <div
                class={cls(
                  classHelper.em('main', 'title-wrapper'),
                  classHelper.is('bold', props.titleBold),
                )}
              >
                <span
                  class={cls(
                    classHelper.em('main', 'title'),
                    classHelper.em('main', `title-${sizeRef.value}`),
                  )}
                >
                  {props.title}
                </span>
                {props.subtitle && (
                  <span
                    class={cls(
                      classHelper.em('main', 'subtitle'),
                      classHelper.em('main', `subtitle-${sizeRef.value}`),
                    )}
                  >
                    {props.subtitle}
                  </span>
                )}
              </div>
            )}
            {slots.describe?.() ?? (
              <div class={classHelper.em('main', 'describe')}>{props.describe}</div>
            )}
            <section class={classHelper.em('main', 'default')}>{slots.default?.()}</section>
          </section>
        </main>
        <section class={classHelper.e('right')}>{slots.right?.()}</section>
      </div>
    );
  },
});
