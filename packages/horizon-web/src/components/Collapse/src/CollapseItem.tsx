import type { Component } from 'vue';
import { defineComponent, inject, toRefs, onMounted } from 'vue';
import { useCollapseItemProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { NIcon } from '@aurora/icon';
import type { CollapseProvidesData } from './Collapse';
import { injectedKey } from './Collapse';
import type { CollapseItemSlots } from './composables/useSlots';
import { useCollapseItemSlots } from './composables/useSlots';
import NTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}CollapseItem`,
  components: { NIcon },
  props: useCollapseItemProps,
  slots: useCollapseItemSlots,
  setup(props, { slots }: LegoSetupContext<{}, CollapseItemSlots>) {
    const {
      title: titleProp,
      name: nameProp,
      disabled: disabledProp,
      expandIcon: expandIconProp,
      color: colorProp,
      background: backgroundProp,
      directive: directiveProp,
    } = toRefs(props);
    const injectCollapse = inject<CollapseProvidesData>(injectedKey)!;
    const classHelper = new ComponentClassBlock('collapse-item');

    const verifyNameIsActive = () => {
      return injectCollapse.accordionProp.value
        ? injectCollapse.activeKeys.value === nameProp.value
        : (injectCollapse.activeKeys.value as (string | number)[]).includes(nameProp.value);
    };

    const clickHeader = () => {
      if (!disabledProp.value) {
        injectCollapse.changeExpandItem(nameProp.value!);
      }
    };

    onMounted(() => {
      if (
        injectCollapse.expandAllProp.value === true &&
        injectCollapse.accordionProp.value === false
      ) {
        injectCollapse.handleExpandAll(nameProp.value!);
      }
    });

    return () => {
      const content = slots?.default?.();
      const nest = content?.find(
        item => (item?.type as Component)?.name === `${useNamespace()}Collapse`,
      );
      const isActiveName = verifyNameIsActive();
      return (
        <div
          class={[
            `${classHelper.block}`,
            isActiveName && classHelper.m('expand'),
            nest && classHelper.m('nest'),
            disabledProp.value && classHelper.m('disabled'),
          ]}
          style={{ borderBottomColor: colorProp.value }}
        >
          <div
            class={[classHelper.e('header')]}
            style={{ backgroundColor: backgroundProp.value }}
            onClick={clickHeader}
          >
            {slots?.title?.() ?? (
              <div class={[classHelper.e('header-title')]}>{titleProp.value}</div>
            )}
            <div class={[classHelper.e('icon'), isActiveName && classHelper.e('icon--expand')]}>
              {slots?.icon?.() ?? (
                <NIcon name={expandIconProp.value ? expandIconProp.value : 'arrow_down'} />
              )}
            </div>
          </div>
          <NTransition name="collapse">
            {directiveProp.value === 'show' ? (
              <div class={[`${classHelper.e('body')}`]} v-show={isActiveName}>
                <div
                  class={[`${classHelper.e('content')}`, nest && classHelper.e('content--nest')]}
                >
                  {slots?.default?.()}
                </div>
              </div>
            ) : (
              isActiveName && (
                <div class={[`${classHelper.e('body')}`]}>
                  <div
                    class={[`${classHelper.e('content')}`, nest && classHelper.e('content--nest')]}
                  >
                    {slots?.default?.()}
                  </div>
                </div>
              )
            )}
          </NTransition>
        </div>
      );
    };
  },
});
