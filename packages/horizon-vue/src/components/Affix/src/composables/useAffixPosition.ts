import type { AffixPosition } from '@aurora/core';
import type { AffixController } from '@aurora/horizon-core';
import { createAffixController } from '@aurora/horizon-core';
import type { CSSProperties, Ref } from 'vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

export type { AffixPosition } from '@aurora/core';
export type AffixTarget = string | HTMLElement | undefined;

export interface UseAffixPositionOptions {
  target: Ref<AffixTarget>;
  position: Ref<AffixPosition>;
  offset: Ref<number>;
  zIndex: Ref<number | undefined>;
  onChange?: (affixed: boolean) => void;
}

export interface UseAffixPositionReturn {
  contentRef: Ref<HTMLElement | null>;
  contentStyle: Ref<CSSProperties>;
  isAffixed: Ref<boolean>;
  placeholderRef: Ref<HTMLElement | null>;
  placeholderStyle: Ref<CSSProperties>;
  updatePosition: () => void;
}

/** 使用共享 Web Core 控制器管理 Affix DOM 交互。 @en Uses the shared Web Core controller for Affix DOM interaction. */
export function useAffixPosition(options: UseAffixPositionOptions): UseAffixPositionReturn {
  const contentRef = ref<HTMLElement | null>(null);
  const placeholderRef = ref<HTMLElement | null>(null);
  const isAffixed = ref(false);
  const contentStyle = ref<CSSProperties>({});
  const placeholderStyle = ref<CSSProperties>({});
  let controller: AffixController | undefined;

  const updatePosition = () => controller?.updatePosition();
  onMounted(() => {
    controller = createAffixController({
      getContent: () => contentRef.value,
      getPlaceholder: () => placeholderRef.value,
      getTarget: () => options.target.value,
      getPosition: () => options.position.value,
      getOffset: () => options.offset.value,
      getZIndex: () => options.zIndex.value,
      onStateChange: state => {
        const changed = isAffixed.value !== state.affixed;
        isAffixed.value = state.affixed;
        contentStyle.value = state.contentStyle as CSSProperties;
        placeholderStyle.value = (state.placeholderStyle ?? {}) as CSSProperties;
        if (changed) options.onChange?.(state.affixed);
      },
      onTargetWarning: selector => {
        console.warn(
          `[Horizon Web] Affix target "${selector}" was not found; using window instead.`,
        );
      },
    });
  });
  onBeforeUnmount(() => controller?.destroy());
  watch([options.target, options.position, options.offset, options.zIndex], updatePosition, {
    flush: 'post',
  });

  return {
    contentRef,
    contentStyle,
    isAffixed,
    placeholderRef,
    placeholderStyle,
    updatePosition,
  };
}
