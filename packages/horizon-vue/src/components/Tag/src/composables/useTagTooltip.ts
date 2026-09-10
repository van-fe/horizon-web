import { computed, onUnmounted, ref, watch, type Ref } from 'vue';
import { observeTagResize, type TagResizeObserverHandle } from '@aurora/horizon-core';
import useOverflow from '~/utils/useOverflow';
import type { TagProps } from './useProps';

interface UseTagTooltipOptions {
  props: TagProps;
  size: Ref<TagProps['size']>;
  contentRef: Ref<HTMLDivElement | null>;
  hasTooltipContent: () => boolean;
  doCollapse?: () => void;
}

/** Owns overflow detection, tooltip policy and content-resize cleanup for a Tag. */
export function useTagTooltip(options: UseTagTooltipOptions) {
  const isOverflow = ref(false);
  const tooltipProps = computed(() => {
    if (typeof options.props.tooltip === 'string' || typeof options.props.tooltip === 'boolean') {
      return {};
    }
    return options.props.tooltip ?? {};
  });
  const tooltipDisabled = computed(() => {
    if (options.hasTooltipContent() && options.props.tooltip !== false) return false;
    if (options.props.tooltip === false) return true;
    if (!options.props.tooltip) return !isOverflow.value;
    return false;
  });

  function measureOverflow() {
    isOverflow.value = useOverflow(options.contentRef);
  }

  watch(
    () => [
      options.props.closable,
      options.size.value,
      options.props.bold,
      options.props.equally,
      options.props.icon,
      options.props.loading,
    ],
    () => options.doCollapse?.(),
  );

  let contentResizeObserver: TagResizeObserverHandle | undefined;
  watch(
    options.contentRef,
    element => {
      contentResizeObserver?.destroy();
      contentResizeObserver = element
        ? observeTagResize(element, () => {
            if (!options.props.isEllipsis && !options.props.isInPopover) options.doCollapse?.();
          })
        : undefined;
    },
    { flush: 'post' },
  );

  onUnmounted(() => contentResizeObserver?.destroy());

  return { isOverflow, measureOverflow, tooltipDisabled, tooltipProps };
}
