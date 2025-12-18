import Guide from './src/Guide';
import GuideItem from './src/GuideItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NGuide = withInstall(Guide, {
  GuideItem,
});
export const NGuideItem = withNoopInstall(GuideItem);
export default NGuide;
