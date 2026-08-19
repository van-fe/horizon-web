import type { ExtractExposeTypes } from '@aurora/utils';
import type { TimelineCommandMap } from '@aurora/core';

export const useTimelineExposes = {} satisfies TimelineCommandMap;

export type TimelineExposes = ExtractExposeTypes<typeof useTimelineExposes>;
