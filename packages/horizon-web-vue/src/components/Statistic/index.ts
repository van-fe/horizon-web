import { withInstall } from '@aurora/utils';
import Statistic from './src/Statistic';

export const HStatistic = withInstall(Statistic);
export default HStatistic;

export type { StatisticProps as HStatisticProps } from './src/composables/useProps';
export type { StatisticSlots as HStatisticSlots } from './src/composables/useSlots';
