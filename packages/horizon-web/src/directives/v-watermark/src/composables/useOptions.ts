import type { ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';
import { useWatermarkProps } from '~/components/Watermark/src/composables/useProps';

export const useWatermarkOptions = declareDirectiveOptionType(useWatermarkProps);

export type WatermarkOptions = ExtractDirectiveOptionTypes<typeof useWatermarkOptions>;
