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
import { useTabsPropsLogWarnProperty } from './composables/useWarning';

export default defineComponent({
  name: `${useNamespace()}Tabs`,
  desc: '页签通常用来快速切换不同的选项',
  components: { AIcon },
  inheritAttrs: false,
  props: useTabsProps,
  emits: useTabsEmits,
  slots: useTabsSlots,
  setup(props, context: HorizonWebSetupContext<TabsEmits, TabsSlots>) {
    useTabsPropsLogWarnProperty(toRefs(props));
    const classHelper = new ComponentClassBlock('tabs');
    const { slots, emit, attrs } = context;

    const globalSize = inject<Ref<HTabSize>>(
      GlobalSizeInjectedKey,
      props.v2 ? ref('small') : ref('medium'),
    );
    // FIXME: 下一个版本移除页签和form耦合
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const rootDomRef = ref<HTMLElement>();
    const wrapperDomRef = ref<HTMLElement>();
    const navListDomRef = ref<HTMLElement>();
    const activeKey = ref(props.activeKey ?? props.modelValue ?? props.defaultActiveKey);

    const size = computed(() => {
      return props.size || globalSize.value;
    }) as ComputedRef<HApplicationSizeType>;
    const editable = computed(() => props.showAdd ?? props.editable ?? false);
    const underline = computed(
      () => props.type === 'line' && (props.showUnderline ?? props.underline),
    );
    const indicator = computed(
      () => (props.type === 'line' && props.indicator) || props.type === 'segment',
    );
    const showSpace = computed(() => !!(slots.extra?.length || props.arrow) && scrollable.value);
    const showNextBlur = computed(() => !lastViewport.value && scrollable.value);
    const showAddButton = computed(() => {
      return editable.value && props.type !== 'segment';
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

    // @deprecated notes: 被动收集 tabs 信息，然后当 activeKey.value 不存在时候默认选中第一个
    // @2024-04-25 更新：社区ui库调研后，当不存在 activeKey 时，默认不做选中，下次更新移除
    // const unwatchKeys = watch(keys, () => {
    //   if (!keys.value.length || !isUndefined(activeKey.value)) return;

    //   activeKey.value = keys.value[0];
    //   unwatchKeys();
    // });

    const dragContext = useDnd(
      toRefs(reactive({ ...props, activeKey, editable, size, underline, keys })),
      context,
    );

    const updateTabValue = (key: HTabValue, fromProps = false) => {
      if (activeKey.value === key) return;

      activeKey.value = key;
      // 当从 props 更新时，不触发事件
      if (fromProps) return;
      emit('update:modelValue', key);
      emit('update:activeKey', key);
      emit('change', key);
      formItemTrigger?.('change');
    };

    const onAdd = () => emit('add');

    const onArrowLeft = () => move('left');
    const onArrowRight = () => move('right');

    // FIXME: 下个 major 版本移除
    const onBlur = (evt: FocusEvent) => {
      emit('blur', evt);
      formItemTrigger?.('blur');
    };

    const onTabClick = async (tabKey: HTabValue) => {
      if (activeKey.value === tabKey) return;

      if (!props.v2 || !props.beforeChange) {
        const cb = () => updateTabValue(tabKey);
        return props.beforeChange ? props.beforeChange(tabKey, cb) : updateTabValue(tabKey);
      }

      const oldKey = activeKey.value;
      const ret = await props.beforeChange(tabKey);
      // note: 1. beforeChange 返回 PromiseLike<false> 时，不切换 tab
      // 2. 当 beforeChange 执行完成时，activeKey 已经切换，则不再执行 updateTabValue
      if (ret === false || activeKey.value !== oldKey) return;
      return updateTabValue(tabKey);
    };

    const onTabClose = (tabKey: HTabValue) => {
      if (!props.v2) return emit('close', tabKey);

      const iter = items.value.keys();
      const firstKey = iter.next().value;
      if (tabKey === activeKey.value && items.value.size) {
        const altKey = firstKey !== tabKey ? firstKey : iter.next().value;
        updateTabValue(altKey!);
      }
      emit('close', tabKey);
    };

    watch(
      () => [props.activeKey, props.modelValue],
      () => {
        const propActiveKey = props.activeKey ?? props.modelValue;
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
          tabindex={0}
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
                    >
                      <AIcon name="arrow_left" class={classHelper.e('icon')} />
                    </div>
                    <div
                      class={[
                        classHelper.e('icon-outer'),
                        lastViewport.value && classHelper.em('icon-outer', 'disabled'),
                      ]}
                      onClick={onArrowRight}
                    >
                      <AIcon name="arrow_right" class={classHelper.e('icon')} />
                    </div>
                  </div>
                )}
              </div>

              {props.type !== 'segment' && slots.extra && (
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
