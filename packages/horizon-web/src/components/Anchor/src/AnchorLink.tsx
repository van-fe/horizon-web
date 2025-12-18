import { defineComponent, computed, inject, onBeforeUnmount, onMounted, watch, ref } from 'vue';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import { useAnchorLinkProps } from './composables/useProps';
import type { AnchorLinkSlots } from './composables/useSlots';
import { useAnchorLinkSlots } from './composables/useSlots';
import type { LegoSetupContext } from '@aurora/shared';
import { isNil, cls, ComponentClassBlock, useNamespace } from '@aurora/shared';
import { useCustomEllipsis } from './composables/useCustomEllipsis';
import { AnchorContextInjectedKey, AnchorPropsInjectedKey } from './utils/InjectedKeys';

export default defineComponent({
  name: `${useNamespace()}AnchorLink`,
  components: {
    NTooltip,
  },
  props: useAnchorLinkProps,
  slots: useAnchorLinkSlots,
  setup(props, { slots }: LegoSetupContext<{}, AnchorLinkSlots>) {
    const classHelper = new ComponentClassBlock('anchor');

    const linkRef = ref<HTMLElement | null>(null);
    const linkTitleTxtRef = ref<HTMLElement | null>(null);

    const { sharedProps, activeLink, addLink, removeLink, clickLinkHandle, updateHighlightLine } =
      inject(AnchorContextInjectedKey)!;
    const parentProps = inject(AnchorPropsInjectedKey)!;

    const linkTitleCls = computed(() => {
      return cls(
        classHelper.e('link-title'),
        classHelper.is('active', activeLink.value === props.href),
        classHelper.is('hide', isNil(props.href) && isNil(props.title)),
      );
    });
    // 当前导航的“子级导航”的总个数
    const childLinksNum = computed(() => {
      return Array.from(linkRef.value?.children || []).filter(it =>
        it.classList.contains(classHelper.e('link')),
      ).length;
    });
    // 是否展示“数字后缀”（仅允许“一级导航”展示）
    const showSuffix = computed(() => {
      const isDirectChildLink = !!linkRef.value?.parentElement?.classList?.contains(
        classHelper.e('wrap'),
      );
      const hasChildLinks = childLinksNum.value > 0;
      return (
        sharedProps.value.showTitleSuffix && !!props.title && isDirectChildLink && hasChildLinks
      );
    });

    // 判断当前导航的title(文本内容)是否溢出
    const judgeIsOverflow = () => {
      const curLineHeight = sharedProps.value.size === 'small' ? 18 : 22;
      const maxRows = 2;
      const maxHeight = curLineHeight * maxRows;
      return !!linkTitleTxtRef.value && linkTitleTxtRef.value.scrollHeight > maxHeight;
    };

    const { displayTitle, titleSuffix, showCustomEllipsis, tooltipDisabled, reRenderEllipsis } =
      useCustomEllipsis(
        props,
        showSuffix,
        childLinksNum,
        judgeIsOverflow,
        activeLink,
        updateHighlightLine,
      );

    const contentRender = computed(() => {
      return props.title ? displayTitle.value : slots?.title?.();
    });

    const clickHandle = (e: MouseEvent) => {
      clickLinkHandle({ href: props.href as string, title: props.title as string }, e);
    };

    onMounted(() => {
      props.href && addLink(props.href);
    });
    onBeforeUnmount(() => {
      props.href && removeLink(props.href);
    });
    watch(
      () => props.href,
      (newVal?: string, oldVal?: string) => {
        newVal && addLink(newVal);
        oldVal && removeLink(oldVal);
      },
    );

    watch(
      () => sharedProps.value.showTitleSuffix,
      () => reRenderEllipsis(),
    );

    return () => (
      <div class={`${classHelper.e('link')}`} ref={linkRef}>
        <NTooltip
          placement={sharedProps.value.placement}
          disabled={tooltipDisabled.value}
          v-slots={{
            content: () => props.title,
          }}
        >
          <div class={linkTitleCls.value}>
            <a
              ref={linkTitleTxtRef}
              class={`${classHelper.e('link-title-txt')}`}
              onClick={clickHandle}
              href={props.href}
              target={parentProps.linkTarget ?? props.target}
            >
              {contentRender.value}
              {showCustomEllipsis.value && <span>{titleSuffix.value}</span>}
            </a>
          </div>
        </NTooltip>
        {slots?.default?.()}
      </div>
    );
  },
});
