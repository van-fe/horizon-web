import type { ExtractDirectiveOptionTypes } from '@nio-fe/shared';
import { declareDirectiveOptionType } from '@nio-fe/shared';
import { useWatermarkProps } from '~/components/Watermark/src/composables/useProps';

export const useWatermarkOptions = declareDirectiveOptionType(useWatermarkProps);

export type WatermarkOptions = ExtractDirectiveOptionTypes<typeof useWatermarkOptions>;
