import type { CSSProperties } from 'vue';
import { calculateInputAutoSizeStyle, calculateInputNodeStyling } from '@aurora/horizon-web-core';

export const calculateNodeStyling = calculateInputNodeStyling;
export default function calculateAutoSizeStyle(
  ...args: Parameters<typeof calculateInputAutoSizeStyle>
): CSSProperties {
  return calculateInputAutoSizeStyle(...args) as CSSProperties;
}
