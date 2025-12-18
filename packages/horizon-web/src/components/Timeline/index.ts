import { default as Timeline } from './src/Timeline';
import { default as TimelineItem } from './src/TimelineItem';
import { withInstall } from '@aurora/utils';

export const NTimeline = withInstall(Timeline);
export const NTimelineItem = withInstall(TimelineItem);
export default NTimeline;
