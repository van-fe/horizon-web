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
import type { AnchorListItem } from '@aurora/core';
import { resolveActiveAnchorLink } from '@aurora/core';
import type { AnchorScrollController } from '@aurora/horizon-core';
import {
  createAnchorScrollController,
  getAnchorCustomOffset,
  getAnchorOffsetTop,
  getAnchorScrollTop,
  resolveAnchorHashTarget,
  resolveAnchorScrollTarget,
  scanAnchorHeadings,
} from '@aurora/horizon-core';
import type { AnchorProps } from './composables/useProps';
import { useAnchorProps } from './composables/useProps';
import { useAnchorEmits } from './composables/useEmits';
import type { AnchorSlots } from './composables/useSlots';
import { useAnchorSlots } from './composables/useSlots';
import type { AnchorEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import AnchorLink from './AnchorLink';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import type { AnchorExposes } from './composables/useExposes';
import { useAnchorExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { AnchorContextInjectedKey, AnchorPropsInjectedKey } from './utils/InjectedKeys';
import { AIcon } from '@aurora/icon';
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
  descLocales: {
    en: 'Anchor navigation lists the sections on the current page and lets users jump to them quickly.',
  },
  components: {
    HScrollbar,
  },
  props: useAnchorProps,
  emits: useAnchorEmits,
  slots: useAnchorSlots,
  exposes: useAnchorExposes,
  setup(
    props,
    { slots, emit, expose }: HorizonWebSetupContext<AnchorEmits, AnchorSlots, AnchorExposes>,
  ) {
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
    let scrollController: AnchorScrollController | undefined;

    function updateScrollContainer() {
      scrollContainer.value = resolveAnchorScrollTarget(props.scrollContainer, document, selector =>
        console.warn(
          `[Horizon Web] Anchor scroll container "${selector}" was not found; using window instead.`,
        ),
      );
    }

    const getTarDomByLink = (link: string) => {
      return resolveAnchorHashTarget(link, document);
    };

    const scrollToHandle = (link: string) => {
      const tarDom = getTarDomByLink(link);
      if (!tarDom) {
        return;
      }
      const target = scrollContainer.value ?? window;
      const offsetTop = getAnchorOffsetTop(tarDom, target);
      const scrollTop = getAnchorScrollTop(target);
      const scrollOffset = getAnchorCustomOffset(props.scrollOffset, tarDom, target);
      const resDis = offsetTop + scrollTop - scrollOffset;

      isScrolling.value = true;
      scrollController?.scrollTo(resDis, props.scrollBehavior, () => {
        isScrolling.value = false;
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
      const target = scrollContainer.value ?? window;
      const sections: { top: number; link: string }[] = [];
      links.value.forEach(link => {
        const tarDom = getTarDomByLink(link);
        if (tarDom) sections.push({ link, top: getAnchorOffsetTop(tarDom, target) });
      });
      const firstTarget = sections.length ? getTarDomByLink(sections[0].link) : null;
      const boundsOffset = firstTarget
        ? getAnchorCustomOffset(props.boundsOffset, firstTarget, target)
        : typeof props.boundsOffset === 'number'
          ? props.boundsOffset
          : 0;
      updateActiveLink(resolveActiveAnchorLink(sections, boundsOffset), false);
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
      if (scrollContainer.value)
        scrollController = createAnchorScrollController(scrollContainer.value);
    }

    function removeEventListener() {
      if (prevScrollContainer) {
        prevScrollContainer?.removeEventListener('scroll', scrollHandle);
      }
      scrollController?.destroy();
      scrollController = undefined;
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
      return scanAnchorHeadings(containerDom, props.autoRenderRules);
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
    watch(
      () => props.collapse,
      value => (isCollapsed.value = value),
    );
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

    watch(() => props.scrollContainer, updateScrollContainer, { flush: 'post' });

    expose({
      updateActiveLink,
      refreshAnchorList,
      updateScrollContainer,
      getAnchorList,
    });

    return () => (
      <div class={anchorClassClac.value} ref={anchorRef} style={anchorStyleClac.value}>
        {props.useCollapse && (
          <button
            type="button"
            aria-expanded={!isCollapsed.value}
            class={cls(
              classHelper.e('collapse-btn'),
              classHelper.is('collapse', isCollapsed.value),
            )}
            onClick={collapseBtnHandle}
          >
            <AIcon name={isCollapsed.value ? 'toggle_left' : 'toggle_right'} size={12} />
            <HTooltip
              content={tooltipContent.value}
              disabled={tooltipDisabled.value}
              placement="bottom"
              size="small"
              overflow
            >
              <span class={classHelper.e('collapse-btn-txt')}>
                {props.collapseText ?? useLocaleLang('anchor.navigator').value}
              </span>
            </HTooltip>
          </button>
        )}
        <HScrollbar size="small" maxHeight={props.maxHeight}>
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
        </HScrollbar>
      </div>
    );
  },
});
