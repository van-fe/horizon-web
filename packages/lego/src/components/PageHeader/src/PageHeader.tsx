import { defineComponent, Fragment } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { usePageHeaderProps } from './composables/useProps';
import { usePageHeaderEmits } from './composables/useEmits';
import { usePageHeaderSlots } from './composables/useSlots';
import { usePageHeaderExposes } from './composables/useExposes';
import type { PageHeaderProps } from './composables/useProps';
import type { PageHeaderEmits } from './composables/useEmits';
import type { PageHeaderSlots } from './composables/useSlots';
import { renderIcon } from '~/utils/useIcon';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import NButton from '~/components/Button/src/Button';

export default defineComponent({
  name: `${useNamespace()}PageHeader`,
  desc: '页头位于页面内容上方，主要作用是申明页面主题、页内信息导航、页面级内容操作',
  props: usePageHeaderProps,
  emits: usePageHeaderEmits,
  slots: usePageHeaderSlots,
  exposes: usePageHeaderExposes,
  setup(
    props: PageHeaderProps,
    { emit, slots }: LegoSetupContext<PageHeaderEmits, PageHeaderSlots>,
  ) {
    const classHelper = new ComponentClassBlock('page-header');

    function onClickBackBtn() {
      emit('back');
    }

    return () => (
      <div class={cls(classHelper.block, classHelper.has('divider', props.useDivider))}>
        {slots.breadcrumb && <div class={classHelper.e('breadcrumb')}>{slots.breadcrumb()}</div>}
        <div class={classHelper.e('main')}>
          {(slots.icon || props.icon) && props.icon !== null && (
            <NButton
              text={true}
              type="normal"
              class={classHelper.e('back')}
              onClick={onClickBackBtn}
            >
              {{
                icon: () =>
                  renderIcon(props.icon, slots.icon, {
                    size: 20,
                  }),
              }}
            </NButton>
          )}
          <div class={classHelper.e('inner')}>
            <div class={classHelper.e('header')}>
              {slots.header?.() ?? (
                <Fragment>
                  {slots.titleOuter?.() ?? (
                    <NTooltip
                      overflow={true}
                      enterable={true}
                      disabled={props.disabledHeaderTooltip}
                    >
                      {{
                        content: () => slots.title?.() ?? props.title,
                        default: () => (
                          <div class={classHelper.em('header', 'title')}>
                            {slots.title?.() ?? props.title}
                          </div>
                        ),
                      }}
                    </NTooltip>
                  )}
                  {slots.tags && <div class={classHelper.em('header', 'tags')}>{slots.tags()}</div>}
                </Fragment>
              )}
            </div>
            {(slots.content || props.content) && (
              <div class={classHelper.em('inner', 'content')}>
                {slots.content?.() ?? props.content}
              </div>
            )}
          </div>
          {slots.extra && <div class={classHelper.e('extra')}>{slots.extra()}</div>}
        </div>
        {slots.default && <div class={classHelper.e('default')}>{slots.default()}</div>}
      </div>
    );
  },
});
