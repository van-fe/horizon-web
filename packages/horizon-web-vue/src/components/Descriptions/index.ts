import { default as Descriptions } from './src/Descriptions';
import { default as DescriptionItem } from './src/DescriptionItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HDescriptions = withInstall(Descriptions, { DescriptionItem });
export const HDescriptionItem = withNoopInstall(DescriptionItem);
export default HDescriptions;
