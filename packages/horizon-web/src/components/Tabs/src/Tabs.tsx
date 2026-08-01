import { AIcon } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace, cls } from '@aurora/utils';
import type { ComputedRef, Ref } from 'vue';
import { computed, defineComponent, inject, provide, reactive, ref, toRefs, watch } from 'vue';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import { useDnd } from './composables/useDnd';
import type { TabsEmits } from './composables/useEmits';
import { useTabsEmits } from './composables/useEmits';
import type { HTabSize, HTabValue } from './composables/useProps';
import { useTabsProps } from './composables/useProps';
import useResponsive from './composables/useResponsive';
import type { TabsSlots } from './composables/useSlots';
import { useTabsSlots } from './composables/useSlots';
import { tabsContextKey } from './constants';

export default defineComponent({
  name: `${useNamespace()}Tabs`,
  desc: '页签通常用来快速切换不同的选项',
  descLocales: { en: 'Tabs let users switch quickly between related views or options.' },
  components: { AIcon },
  inheritAttrs: false,
  props: useTabsProps,
  emits: useTabsEmits,
  slots: useTabsSlots,
  setup(props, context: HorizonWebSetupContext<TabsEmits, TabsSlots>) {
    const classHelper = new ComponentClassBlock('tabs');
    const { slots, emit, attrs } = context;

    const globalSize = inject<Ref<HTabSize>>(GlobalSizeInjectedKey, ref('small'));
    // FIXME: 下一个版本移除页签和form耦合
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const rootDomRef = ref<HTMLElement>();
    const wrapperDomRef = ref<HTMLElement>();
    const navListDomRef = ref<HTMLElement>();
    const activeKey = ref(props.activeKey ?? props.defaultActiveKey);

    const size = computed(() => {
      return props.size || globalSize.value;
    }) as ComputedRef<HApplicationSizeType>;
    const editable = computed(() => props.editable ?? false);
    const underline = computed(() => props.type === 'line' && props.underline);
    const indicator = computed(() => props.type === 'line' && props.indicator);
    const showSpace = computed(() => !!(slots.extra?.length || props.arrow) && scrollable.value);
    const showNextBlur = computed(() => !lastViewport.value && scrollable.value);
    const showAddButton = computed(() => {
      return editable.value;
    });
    const showFollowAddButton = computed(() => showAddButton.value && !scrollable.value);

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
      editable,
      size,
      underline,
    };

    const {
      indicatorStyle,
      scrollable,
      firstViewport,
      lastViewport,
      items,
      keys,
      move,
      createTab,
    } = useResponsive(indicatorOptions);

    const dragContext = useDnd(
      toRefs(reactive({ ...props, activeKey, editable, size, underline, keys })),
      context,
    );

    const updateTabValue = (key: HTabValue, fromProps = false) => {
      if (activeKey.value === key) return;

      activeKey.value = key;
      // 当从 props 更新时，不触发事件
      if (fromProps) return;
      emit('update:activeKey', key);
      emit('change', key);
      formItemTrigger?.('change');
    };

    const onAdd = () => emit('add');

    const onArrowLeft = () => move('left');
    const onArrowRight = () => move('right');

    const onBlur = () => formItemTrigger?.('blur');

    const getEnabledTabs = () =>
      Array.from(rootDomRef.value?.querySelectorAll<HTMLElement>('[role="tab"]') ?? []).filter(
        tab => tab.getAttribute('aria-disabled') !== 'true',
      );

    const focusTabFromKeyboard = (evt: KeyboardEvent) => {
      const tabs = getEnabledTabs();
      if (!tabs.length) return;
      const eventTab = (evt.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
      const currentIndex = tabs.indexOf(eventTab ?? (document.activeElement as HTMLElement));
      let nextIndex: number | undefined;
      if (evt.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      if (evt.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (evt.key === 'Home') nextIndex = 0;
      if (evt.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      evt.preventDefault();
      tabs[nextIndex]?.focus();
      tabs[nextIndex]?.click();
    };

    const onTabClick = async (tabKey: HTabValue) => {
      if (activeKey.value === tabKey) return;

      if (!props.beforeChange) return updateTabValue(tabKey);

      const oldKey = activeKey.value;
      const ret = await props.beforeChange(tabKey);
      // note: 1. beforeChange 返回 PromiseLike<false> 时，不切换 tab
      // 2. 当 beforeChange 执行完成时，activeKey 已经切换，则不再执行 updateTabValue
      if (ret === false || activeKey.value !== oldKey) return;
      return updateTabValue(tabKey);
    };

    const onTabClose = (tabKey: HTabValue) => {
      const iter = items.value.keys();
      const firstKey = iter.next().value;
      if (tabKey === activeKey.value && items.value.size) {
        const altKey = firstKey !== tabKey ? firstKey : iter.next().value;
        updateTabValue(altKey!);
      }
      emit('close', tabKey);
    };

    watch(
      () => props.activeKey,
      () => {
        const propActiveKey = props.activeKey;
        if (propActiveKey === activeKey.value) return;
        return updateTabValue(propActiveKey!, true);
      },
    );

    provide(tabsContextKey, {
      activeKey,
      type: computed(() => props.type),
      onClick: onTabClick,
      onClose: onTabClose,
      createTab,
      wrapperEl: wrapperDomRef,
      ...dragContext,
    });

    return () => {
      if (!slots.default) return null;

      const addButton = (
        <div
          class={cls(
            classHelper.e('icon-outer'),
            classHelper.em('icon-outer', 'add'),
            showFollowAddButton.value && classHelper.em('icon-outer', 'follow'),
          )}
          onClick={() => onAdd()}
          role="button"
          tabindex={0}
          aria-label="Add tab"
          onKeydown={(evt: KeyboardEvent) => {
            if (evt.key === 'Enter' || evt.key === ' ') {
              evt.preventDefault();
              onAdd();
            }
          }}
        >
          <AIcon name="add" class={classHelper.e('icon')} />
        </div>
      );

      const tabs = slots.default();
      return (
        <div
          {...attrs}
          ref={rootDomRef}
          class={cls(
            classHelper.block,
            classHelper.m(props.type),
            classHelper.m(size.value, props.type !== 'page'),
            classHelper.m('underline', underline.value),
          )}
          role="tablist"
          aria-orientation="horizontal"
          tabindex={activeKey.value === undefined ? 0 : undefined}
          onFocus={(evt: FocusEvent) => {
            if (evt.target === evt.currentTarget) getEnabledTabs()[0]?.focus();
          }}
          onKeydown={focusTabFromKeyboard}
          onBlur={onBlur}
        >
          <div class={classHelper.e('nav')}>
            <div ref={wrapperDomRef} class={classHelper.e('nav-wrap')}>
              <div
                ref={navListDomRef}
                class={[
                  classHelper.e('nav-list'),
                  showSpace.value && classHelper.em('nav-list', 'space'),
                ]}
              >
                {tabs}

                {indicator.value && (
                  <div class={classHelper.e('indicator')} style={indicatorStyle.value}></div>
                )}
              </div>
              {showFollowAddButton.value && addButton}
            </div>

            <div
              class={[
                classHelper.e('extra-outer'),
                showNextBlur.value && classHelper.em('extra-outer', 'blur'),
              ]}
            >
              <div class={classHelper.e('default-actions')}>
                {showAddButton.value && scrollable.value && addButton}

                {props.arrow && scrollable.value && (
                  <div class={classHelper.e('arrow')}>
                    <div
                      class={[
                        classHelper.e('icon-outer'),
                        firstViewport.value && classHelper.em('icon-outer', 'disabled'),
                      ]}
                      onClick={onArrowLeft}
                      role="button"
                      tabindex={firstViewport.value ? -1 : 0}
                      aria-disabled={firstViewport.value}
                      aria-label="Scroll tabs backward"
                      onKeydown={(evt: KeyboardEvent) => {
                        if (evt.key === 'Enter' || evt.key === ' ') {
                          evt.preventDefault();
                          onArrowLeft();
                        }
                      }}
                    >
                      <AIcon name="arrow_left" class={classHelper.e('icon')} />
                    </div>
                    <div
                      class={[
                        classHelper.e('icon-outer'),
                        lastViewport.value && classHelper.em('icon-outer', 'disabled'),
                      ]}
                      onClick={onArrowRight}
                      role="button"
                      tabindex={lastViewport.value ? -1 : 0}
                      aria-disabled={lastViewport.value}
                      aria-label="Scroll tabs forward"
                      onKeydown={(evt: KeyboardEvent) => {
                        if (evt.key === 'Enter' || evt.key === ' ') {
                          evt.preventDefault();
                          onArrowRight();
                        }
                      }}
                    >
                      <AIcon name="arrow_right" class={classHelper.e('icon')} />
                    </div>
                  </div>
                )}
              </div>

              {slots.extra && (
                <div class={classHelper.e('extra')}>{slots.extra({ size: size.value })}</div>
              )}
            </div>
          </div>

          {/* {indicator.value && <div class={classHelper.e('indicator')} style={indicatorStyle.value}></div>} */}
        </div>
      );
    };
  },
});
