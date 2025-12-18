import { default as Tabs } from './src/Tabs';
import { default as Tab } from './src/Tab';
import { withInstall, withNoopInstall } from '@aurora/shared';

export type {
  NTabValue,
  TabsProps,
  TabProps,
  NTabSize,
  NTabType,
} from './src/composables/useProps';

export const NTabs = withInstall(Tabs, { Tab });
export const NTab = withNoopInstall(Tab);
export default NTabs;
