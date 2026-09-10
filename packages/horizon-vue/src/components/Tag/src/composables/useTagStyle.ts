import { computed, type Ref, type CSSProperties } from 'vue';
import { createTagColorStyle } from '@aurora/theme';
import { useColors } from '~/styles';
import type { TagProps } from './useProps';

interface UseTagStyleOptions {
  props: TagProps;
  active: Ref<boolean>;
  disabled: Ref<boolean>;
  hover: Ref<boolean>;
  press: Ref<boolean>;
  clickable: Ref<boolean>;
}

const isColorBar = (color: string) => color && /\[\d+]$/.test(color);
const resolveColor = (color: string | undefined) =>
  color ? (isColorBar(color) ? useColors(color) : color) : undefined;

/** Projects Tag interaction state into Theme-owned inline color styles. */
export function useTagStyle(options: UseTagStyleOptions) {
  const isColorful = computed(() => !!options.props.color);
  const isAutoFitColor = computed(
    () => isColorful.value || (!isColorful.value && options.props.clickable),
  );
  const style = computed<CSSProperties>(
    () =>
      (createTagColorStyle({
        color: resolveColor(options.props.color),
        background: resolveColor(options.props.background),
        plain: options.props.plain,
        disabled: options.disabled.value,
        active: options.active.value,
        hovered: options.hover.value,
        pressed: options.press.value,
        clickable: options.clickable.value,
      }) ?? {}) as CSSProperties,
  );

  return { isAutoFitColor, isColorful, style };
}
