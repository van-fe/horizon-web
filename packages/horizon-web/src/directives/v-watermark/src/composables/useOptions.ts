import type { ExtractDirectiveOptionTypes } from '@aurora/shared';
import { declareDirectiveOptionType } from '@aurora/shared';
import { useWatermarkProps } from '~/components/Watermark/src/composables/useProps';

export const useWatermarkOptions = declareDirectiveOptionType(useWatermarkProps);

export type WatermarkOptions = ExtractDirectiveOptionTypes<typeof useWatermarkOptions>;
