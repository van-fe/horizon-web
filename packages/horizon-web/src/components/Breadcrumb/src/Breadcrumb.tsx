import type { VNode } from 'vue';
import {
  computed,
  defineComponent,
  Fragment,
  getCurrentInstance,
  nextTick,
  provide,
  ref,
  render,
  toRef,
  toRefs,
  watch,
} from 'vue';
import { IconEllipsis } from '@aurora/icon';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace, getSymbolNodeChildren } from '@aurora/utils';
import tooltip from '~/directives/v-tooltip';
import HDropdown from '~/components/Dropdown/src/Dropdown';
import HDropdownMenu from '~/components/Dropdown/src/DropdownMenu';
import HDropdownItem from '~/components/Dropdown/src/DropdownItem';
import HBreadcrumbItem from './BreadcrumbItem';
import type { BreadcrumbItem, BreadcrumbItemProps } from './composables/useProps';
import { useBreadcrumbProps } from './composables/useProps';
import type { BreadcrumbSlots } from './composables/useSlots';
import { useBreadcrumbSlots } from './composables/useSlots';
import HLink from '~/components/Link/src/Link';
import useSize from '~/utils/useSize';
import type { ResizeObserverEntry } from '@vueuse/core';
import { useResizeObserver } from '@vueuse/core';
import {
  HBreadcrumbItemClickInjectKey,
  HBreadcrumbProps,
  HBreadcrumbSlots,
} from './utils/injectedKeys';
import debounce from 'lodash/debounce';
import { onClickBreadcrumbItem } from './utils/helpers';
import type { BreadcrumbEmits } from './composables/useEmits';
import { useBreadcrumbEmits } from './composables/useEmits';

export default defineComponent({
  name: `${useNamespace()}Breadcrumb`,
  desc: '面包屑导航主要用来呈现系统页面的架构层级，帮助用户快速定位和了解网站内容和组织方式，从而形成很好的位置感，知晓当前所处位置，以及页面的往返路径。同时提供快速的跳转操作，快速返回各个层级的页面',
  descLocales: { en: 'Breadcrumb navigation showing the current hierarchy.' },
  directives: { tooltip },
  components: {
    HBreadcrumbItem,
    HLink,
    IconEllipsis,
    HDropdown,
    HDropdownMenu,
    HDropdownItem,
  },
  props: useBreadcrumbProps,
  emits: useBreadcrumbEmits,
  slots: useBreadcrumbSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<BreadcrumbEmits, BreadcrumbSlots>) {
    const classHelper = new ComponentClassBlock('breadcrumb');

    const breadcrumbRef = ref<null | HTMLElement>(null);

    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

    provide(HBreadcrumbProps, props);
    provide(HBreadcrumbSlots, slots);

    // global size
    const sizeRef = useSize(toRef(props, 'size'), 'medium');

    const { texts, title } = toRefs(props);

    const renderItem = (arr: BreadcrumbItem[] = []) => {
      return arr.map((v, k) => (
        <HBreadcrumbItem key={k} size={sizeRef.value} {...v} title={title.value}>
          {{
            default: () => v.text,
            separator: slots.separator,
          }}
        </HBreadcrumbItem>
      ));
    };

    function onClickItem(props: BreadcrumbItem, e: MouseEvent) {
      onClickBreadcrumbItem(props, router);

      if (isItemClickable(props)) {
        emit('itemClick', props, e);
      }
    }

    provide(HBreadcrumbItemClickInjectKey, onClickItem);

    const ellipsisItemsAmount = ref(0);
    const needRenderedItems = computed(() =>
      slots.default
        ? getSymbolNodeChildren(slots.default)
        : getSymbolNodeChildren(() => renderItem(texts.value)),
    );

    watch(
      needRenderedItems,
      val => {
        // to get items' real dom element. Then can get its innerText to show on dropdown.
        const invisibleContainer = document.createElement('div');
        render(<Fragment>{val}</Fragment>, invisibleContainer);
        render(null, invisibleContainer);
        invisibleContainer.remove();
      },
      {
        immediate: true,
      },
    );

    function isItemClickable(props: BreadcrumbItem) {
      return !!props.to || props.clickable;
    }

    let stopObserve: null | (() => void) = null;
    let prevClientWidth = 0;

    async function doCollapse(entry: ResizeObserverEntry) {
      if (entry.target.clientWidth > prevClientWidth) {
        ellipsisItemsAmount.value = 0;
      }
      await nextTick();

      while (
        entry.target.scrollWidth > entry.target.clientWidth &&
        ellipsisItemsAmount.value < needRenderedItems.value.length - 2
      ) {
        ellipsisItemsAmount.value++;
        await nextTick();
      }

      prevClientWidth = entry.target.clientWidth;
    }

    const debouncedDoCollapse = debounce(doCollapse, 500);

    watch(
      () => props.displayType,
      val => {
        if (val === 'ellipsis') {
          stopObserve = useResizeObserver(breadcrumbRef, async ([entry]) => {
            await debouncedDoCollapse(entry);
          }).stop;
        } else {
          ellipsisItemsAmount.value = 0;
          stopObserve?.();
        }
      },
      {
        immediate: true,
      },
    );

    function onClickItemNode(item: VNode, e: Event) {
      const props = item.props as BreadcrumbItemProps;
      onClickBreadcrumbItem(props, router);

      if (isItemClickable(props)) {
        emit('itemClick', props, e);
      }
    }

    return () => {
      return (
        <div
          ref={breadcrumbRef}
          role="navigation"
          aria-label="Breadcrumb"
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value),
            classHelper.is(props.displayType),
          )}
        >
          {needRenderedItems.value[0]}
          {ellipsisItemsAmount.value > 0 && (
            <HBreadcrumbItem>
              <HDropdown>
                {{
                  default: () => (
                    <div class={classHelper.e('ellipsis')}>
                      <IconEllipsis size={12} />
                    </div>
                  ),
                  dropdown: () => (
                    <HDropdownMenu>
                      {needRenderedItems.value.slice(1, ellipsisItemsAmount.value + 1).map(curr => (
                        <HDropdownItem onClick={e => onClickItemNode(curr, e)}>
                          {curr.el?.innerText ?? ''}
                        </HDropdownItem>
                      ))}
                    </HDropdownMenu>
                  ),
                }}
              </HDropdown>
            </HBreadcrumbItem>
          )}
          {...needRenderedItems.value.slice(ellipsisItemsAmount.value + 1)}
        </div>
      );
    };
  },
});
