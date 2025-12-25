import { default as Timeline } from './src/Timeline';
import { default as TimelineItem } from './src/TimelineItem';
import { withInstall } from '@aurora/utils';

export const HTimeline = withInstall(Timeline);
export const HTimelineItem = withInstall(TimelineItem);
export default HTimeline;
