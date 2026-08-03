import Guide from './src/Guide';
import GuideItem from './src/GuideItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HGuide = withInstall(Guide, {
  GuideItem,
});
export const HGuideItem = withNoopInstall(GuideItem);
export default HGuide;
