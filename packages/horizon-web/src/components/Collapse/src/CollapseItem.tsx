import type { Component } from 'vue';
import { defineComponent, inject, toRefs, onMounted, useId } from 'vue';
import { useCollapseItemProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import type { CollapseProvidesData } from './Collapse';
import { injectedKey } from './Collapse';
import type { CollapseItemSlots } from './composables/useSlots';
import { useCollapseItemSlots } from './composables/useSlots';
import HTransition from '~/components/Transition/src/Transition';

export default defineComponent({
  name: `${useNamespace()}CollapseItem`,
  components: { AIcon },
  props: useCollapseItemProps,
  slots: useCollapseItemSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, CollapseItemSlots>) {
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
    const headerId = useId();
    const panelId = useId();

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
            id={headerId}
            role="button"
            tabindex={disabledProp.value ? -1 : 0}
            aria-expanded={isActiveName}
            aria-controls={panelId}
            aria-disabled={disabledProp.value}
            style={{ backgroundColor: backgroundProp.value }}
            onClick={clickHeader}
            onKeydown={(evt: KeyboardEvent) => {
              if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                clickHeader();
              }
            }}
          >
            {slots?.title?.() ?? (
              <div class={[classHelper.e('header-title')]}>{titleProp.value}</div>
            )}
            <div class={[classHelper.e('icon'), isActiveName && classHelper.e('icon--expand')]}>
              {slots?.icon?.() ?? (
                <AIcon name={expandIconProp.value ? expandIconProp.value : 'arrow_down'} />
              )}
            </div>
          </div>
          <HTransition name="collapse">
            {directiveProp.value === 'show' ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                class={[`${classHelper.e('body')}`]}
                v-show={isActiveName}
              >
                <div
                  class={[`${classHelper.e('content')}`, nest && classHelper.e('content--nest')]}
                >
                  {slots?.default?.()}
                </div>
              </div>
            ) : (
              isActiveName && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  class={[`${classHelper.e('body')}`]}
                >
                  <div
                    class={[`${classHelper.e('content')}`, nest && classHelper.e('content--nest')]}
                  >
                    {slots?.default?.()}
                  </div>
                </div>
              )
            )}
          </HTransition>
        </div>
      );
    };
  },
});
