import { NIconSVG } from '@aurora/icon';
import type { LegoSetupContext } from '@aurora/shared';
import { ComponentClassBlock, useNamespace } from '@aurora/shared';
import {
  type ComputedRef,
  type Ref,
  computed,
  defineComponent,
  inject,
  provide,
  ref,
  toRefs,
  watch,
} from 'vue';
import { type NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import { NFormItemTriggerInjectedKey } from '~/injectedKeys';
import type { SegmentedEmits } from './composables/useEmits';
import { useSegmentedEmits } from './composables/useEmits';
import type { SegmentedExposes } from './composables/useExposes';
import { useSegmentedExposes } from './composables/useExposes';
import type { NSegmentedSize, NSegmentedValue } from './composables/useProps';
import { useSegmentedProps } from './composables/useProps';
import type { SegmentedSlots } from './composables/useSlots';
import { useSegmentedSlots } from './composables/useSlots';
import useResponsive from './composables/useResponsive';
import { contextKey } from './constants';

export default defineComponent({
  name: `${useNamespace()}Segmented`,
  desc: '分段控制器',
  inheritAttrs: false,
  props: useSegmentedProps,
  emits: useSegmentedEmits,
  slots: useSegmentedSlots,
  exposes: useSegmentedExposes,
  setup(
    props,
    { emit, slots, attrs }: LegoSetupContext<SegmentedEmits, SegmentedSlots, SegmentedExposes>,
  ) {
    const cls = new ComponentClassBlock('segmented');

    const globalSize = inject<Ref<NSegmentedSize>>(GlobalSizeInjectedKey, ref('medium'));
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    const rootDomRef = ref<HTMLElement>();
    const wrapperDomRef = ref<HTMLElement>();
    const navListDomRef = ref<HTMLElement>();
    const activeKey = ref(props.activeKey ?? props.defaultActiveKey);

    const size = computed(() => {
      return props.size || globalSize.value;
    }) as ComputedRef<NApplicationSizeType>;
    const showSpace = computed(() => !!props.arrow && scrollable.value);
    const showNextBlur = computed(() => !lastViewport.value && scrollable.value);

    const computedActiveKey = computed({
      set: key => updateTabValue(key!),
      get: () => activeKey.value,
    });

    const indicatorOptions = {
      ...toRefs(props),
      root: rootDomRef,
      container: navListDomRef,
      wrapper: wrapperDomRef,
      activeKey: computedActiveKey,
      size,
    };

    const { indicatorStyle, scrollable, firstViewport, lastViewport, createTab, move } =
      useResponsive(indicatorOptions);

    const onArrowLeft = () => move('left');
    const onArrowRight = () => move('right');

    const updateTabValue = (key: NSegmentedValue, fromProps = false) => {
      if (activeKey.value === key) return;

      activeKey.value = key;
      // 当从 props 更新时，不触发事件
      if (fromProps) return;
      emit('update:activeKey', key);
      emit('change', key);
      if (props.form) formItemTrigger?.('change');
    };

    const onTabClick = async (tabKey: NSegmentedValue) => {
      if (activeKey.value === tabKey) return;

      return updateTabValue(tabKey);
    };

    watch(
      () => props.activeKey,
      () => {
        const propActiveKey = props.activeKey;
        if (propActiveKey === activeKey.value) return;
        return updateTabValue(propActiveKey!, true);
      },
    );

    provide(contextKey, {
      activeKey,
      onClick: onTabClick,
      createTab,
    });

    return () => {
      if (!slots.default) return null;

      const items = slots.default();
      return (
        <div
          role="tablist"
          {...attrs}
          ref={rootDomRef}
          class={[cls.block, cls.m(size.value), props.block && cls.m('block')]}
          tabindex={0}
        >
          <div class={cls.e('nav')}>
            <div ref={wrapperDomRef} class={cls.e('nav-wrap')}>
              <div
                ref={navListDomRef}
                class={[cls.e('nav-list'), showSpace.value && cls.em('nav-list', 'space')]}
              >
                {items}

                <div class={cls.e('indicator')} style={indicatorStyle.value}></div>
              </div>
            </div>

            <div
              class={[cls.e('extra-outer'), showNextBlur.value && cls.em('extra-outer', 'blur')]}
            >
              {props.arrow && scrollable.value && (
                <div class={cls.e('arrow')}>
                  <div
                    class={[
                      cls.e('icon-outer'),
                      firstViewport.value && cls.em('icon-outer', 'disabled'),
                    ]}
                    onClick={onArrowLeft}
                    test-id="left-btn"
                  >
                    <NIconSVG name="arrow_left" class={cls.e('icon')} />
                  </div>
                  <div
                    class={[
                      cls.e('icon-outer'),
                      lastViewport.value && cls.em('icon-outer', 'disabled'),
                    ]}
                    onClick={onArrowRight}
                    test-id="right-btn"
                  >
                    <NIconSVG name="arrow_right" class={cls.e('icon')} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };
  },
});
