import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  toRefs,
  watch,
} from 'vue';
import type { Ref, CSSProperties, ComputedRef } from 'vue';
import type { AnchorProps } from './composables/useProps';
import { useAnchorProps } from './composables/useProps';
import { useAnchorEmits } from './composables/useEmits';
import type { AnchorSlots } from './composables/useSlots';
import { useAnchorSlots } from './composables/useSlots';
import type { AnchorEmits } from './composables/useEmits';
import type { LegoSetupContext } from '@aurora/shared';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/shared';
import { customScrollTo, getCustomOffset, getOffsetTop, getScrollTop } from './utils/base';
import { deepSearch, genListByDomList } from './utils/extra';
import type { AnchorListItem } from './utils/extra';
import AnchorLink from './AnchorLink';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import type { AnchorExposes } from './composables/useExposes';
import { useAnchorExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { AnchorContextInjectedKey, AnchorPropsInjectedKey } from './utils/InjectedKeys';
import { NIcon } from '@aurora/icon';
import useLocaleLang from '~/utils/useLocaleLang';

export interface AnchorContext {
  sharedProps: ComputedRef<Pick<AnchorProps, 'size' | 'showTitleSuffix' | 'placement'>>;
  activeLink: Ref<string>;
  addLink: (link: string) => void;
  removeLink: (link: string) => void;
  clickLinkHandle: (linkInfo: { href: string; title: string }, e: MouseEvent) => void;
  updateHighlightLine: (link: string) => void;
}
const sharpLinkRegx = /#([\S ]+)$/;

const highLightLineDefaultStyle = {
  top: '0px',
  height: '0px',
};

export default defineComponent({
  name: `${useNamespace()}Anchor`,
  desc: '电梯导航用来展示当前页面中，有哪些具体内容，并可以快速定位',
  components: {
    NScrollbar,
  },
  props: useAnchorProps,
  emits: useAnchorEmits,
  slots: useAnchorSlots,
  exposes: useAnchorExposes,
  setup(props, { slots, emit, expose }: LegoSetupContext<AnchorEmits, AnchorSlots, AnchorExposes>) {
    const classHelper = new ComponentClassBlock('anchor');
    const { size } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium');

    const links = ref<string[]>([]);
    const activeLink = ref<string>('');
    const anchorRef = ref<HTMLElement | null>(null);
    const isScrolling = ref(false);

    const highLightLineStyle = ref<CSSProperties>(highLightLineDefaultStyle);

    const anchorClassClac = computed(() => cls(classHelper.block, classHelper.m(sizeRef.value)));
    const anchorStyleClac = computed(() => ({ ...props.style, maxHeight: `${props.maxHeight}px` }));

    const scrollContainer = ref<Window | HTMLElement | null>(null);

    function updateScrollContainer() {
      if (typeof props.scrollContainer === 'string') {
        scrollContainer.value = document.querySelector(props.scrollContainer) as HTMLElement | null;
      } else {
        scrollContainer.value = props.scrollContainer ?? window;
      }
    }

    const getTarDomByLink = (link: string) => {
      const resMatch = link.match(sharpLinkRegx);
      if (!resMatch) {
        return null;
      }
      const tarDom = document.getElementById(resMatch[1]);
      if (!tarDom) {
        return null;
      }
      return tarDom;
    };

    const scrollToHandle = (link: string) => {
      const tarDom = getTarDomByLink(link);
      if (!tarDom) {
        return;
      }
      const offsetTop = getOffsetTop(tarDom, scrollContainer.value);
      const scrollTop = getScrollTop(scrollContainer.value);
      const scrollOffset = getCustomOffset(props.scrollOffset, tarDom, scrollContainer.value);
      const resDis = offsetTop + scrollTop - scrollOffset;

      isScrolling.value = true;
      customScrollTo(resDis, {
        behavior: props.scrollBehavior,
        scrollContainer: scrollContainer.value,
        callback: () => {
          isScrolling.value = false;
        },
      });
    };

    const updateHighlightLine = (link: string) => {
      if (!link) {
        highLightLineStyle.value = highLightLineDefaultStyle;
        return;
      }
      const activeLink = anchorRef.value?.querySelector(`[href='${link}']`)?.parentElement;
      if (!activeLink) {
        return;
      }
      const { offsetTop, clientHeight } = activeLink;

      highLightLineStyle.value = {
        top: `${offsetTop}px`,
        height: `${clientHeight}px`,
      };
    };

    const updateActiveLink = (link: string, needScroll = true) => {
      const prevLink = activeLink.value;
      activeLink.value = link;
      if (prevLink !== link) {
        emit('change', link, prevLink);
      }
      updateHighlightLine(link);
      needScroll && scrollToHandle(link);
    };

    const scrollHandle = () => {
      if (isScrolling.value) {
        return;
      }
      const resLinks: { top: number; link: string }[] = [];
      let curActiveLink = '';
      // 找到所有至“滚动容器顶部”的距离小于bounds的link(对应一个DOM元素)
      links.value.forEach(link => {
        const tarDom = getTarDomByLink(link);
        if (!tarDom) {
          return;
        }
        const top = getOffsetTop(tarDom, scrollContainer.value);
        const boundsOffset = getCustomOffset(props.boundsOffset, tarDom, scrollContainer.value);
        if (top < boundsOffset) {
          resLinks.push({ link, top });
        }
      });
      // 找出上述集合中距离最远的一个link(对应一个DOM元素)
      if (resLinks.length) {
        const latest = resLinks.reduce((prev, cur) => (prev.top > cur.top ? prev : cur));
        curActiveLink = latest.link;
      }
      updateActiveLink(curActiveLink, false);
    };

    const sharedProps = computed(() => ({
      size: sizeRef.value,
      showTitleSuffix: props.showTitleSuffix,
      placement: props.placement,
    }));
    const addLink = (link: string) => {
      if (!sharpLinkRegx.test(link) || links.value.includes(link)) {
        return;
      }
      links.value.push(link);
    };
    const removeLink = (link: string) => {
      links.value = links.value.filter(it => it !== link);
    };
    const clickLinkHandle = (linkInfo: { href: string; title: string }, e: MouseEvent) => {
      if (!props.changeHash) {
        e.preventDefault();
      }
      emit('click', linkInfo, e);
      updateActiveLink(linkInfo.href);
    };

    provide(AnchorContextInjectedKey, {
      sharedProps,
      activeLink,
      addLink,
      removeLink,
      clickLinkHandle,
      updateHighlightLine,
    });

    provide(AnchorPropsInjectedKey, props);

    // 动态监听变化，重新设置监听

    let prevScrollContainer: null | HTMLElement | Window = null;

    watch(
      scrollContainer,
      () => {
        setEventListener();
      },
      {
        immediate: true,
      },
    );

    function setEventListener() {
      removeEventListener();
      scrollContainer.value?.addEventListener('scroll', scrollHandle);
      prevScrollContainer = scrollContainer.value;
    }

    function removeEventListener() {
      if (prevScrollContainer) {
        prevScrollContainer?.removeEventListener('scroll', scrollHandle);
      }
    }

    watch(sizeRef, () => {
      void nextTick(() => updateHighlightLine(activeLink.value));
    });

    const anchorList = ref<AnchorListItem[]>();
    const getAnchorList = () => {
      const containerDom =
        scrollContainer.value instanceof HTMLElement
          ? scrollContainer.value
          : document.documentElement;
      const allDoms = props.autoRenderRules.map(it => {
        const rules = typeof it === 'string' ? [it] : it;
        return rules
          .map(it => Array.from(containerDom.querySelectorAll(it)))
          .flat() as HTMLElement[];
      });
      const resDomList = deepSearch(containerDom, ele => allDoms.findIndex(it => it.includes(ele)));
      return genListByDomList(resDomList) as AnchorListItem[];
    };

    const renderLinks = (list?: AnchorListItem[]) => {
      if (!list) {
        return null;
      }
      return list?.map(item => {
        return (
          <AnchorLink href={item.id && `#${item.id}`} title={item.title} key={item.id}>
            {renderLinks(item.children)}
          </AnchorLink>
        );
      });
    };

    function refreshAnchorList() {
      anchorList.value = getAnchorList();
    }

    const isCollapsed = ref(props.collapse);
    const showWrap = computed(() => (props.useCollapse ? !isCollapsed.value : true));
    const collapseBtnHandle = () => {
      const tarStatus = !isCollapsed.value;
      isCollapsed.value = tarStatus;
      emit('update:collapse', tarStatus);
    };
    const tooltipContent = computed(() =>
      typeof props.collapseText === 'string' ? props.collapseText : '',
    );
    const tooltipDisabled = computed(() => tooltipContent.value === '');

    onMounted(() => {
      nextTick(() => {
        updateScrollContainer();
        location.hash && updateActiveLink(decodeURI(location.hash));
        setEventListener();
        props.autoRender && refreshAnchorList();
      });
    });

    onBeforeUnmount(() => {
      removeEventListener();
    });

    expose({
      updateActiveLink,
      refreshAnchorList,
      updateScrollContainer,
      getAnchorList,
    });

    return () => (
      <div class={anchorClassClac.value} ref={anchorRef} style={anchorStyleClac.value}>
        {props.useCollapse && (
          <div
            class={cls(
              classHelper.e('collapse-btn'),
              classHelper.is('collapse', isCollapsed.value),
            )}
            onClick={collapseBtnHandle}
          >
            <NIcon name={isCollapsed.value ? 'toggle_left' : 'toggle_right'} size={12} />
            <NTooltip
              content={tooltipContent.value}
              disabled={tooltipDisabled.value}
              placement="bottom"
              size="small"
              overflow
            >
              <span class={classHelper.e('collapse-btn-txt')}>
                {props.collapseText ?? useLocaleLang('anchor.navigator').value}
              </span>
            </NTooltip>
          </div>
        )}
        <NScrollbar size="small" maxHeight={props.maxHeight}>
          <div class={classHelper.e('wrap')} v-show={showWrap.value}>
            <div v-show={props.showLine} class={`${classHelper.e('line')}`}>
              <div
                v-show={props.showHighlightLine}
                class={`${classHelper.e('line--highlight')}`}
                style={highLightLineStyle.value}
              />
            </div>
            {props.autoRender ? renderLinks(anchorList.value) : slots?.default?.()}
          </div>
        </NScrollbar>
      </div>
    );
  },
});
