import { default as Tabs } from './src/Tabs';
import { default as Tab } from './src/Tab';
import { withInstall, withNoopInstall } from '@aurora/utils';

export type {
  HTabValue,
  TabsProps,
  TabProps,
  HTabSize,
  HTabType,
} from './src/composables/useProps';

export const HTabs = withInstall(Tabs, { Tab });
export const HTab = withNoopInstall(Tab);
export default HTabs;
