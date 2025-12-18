import { default as Tabs } from './src/Tabs';
import { default as Tab } from './src/Tab';
import { withInstall, withNoopInstall } from '@aurora/utils';

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
