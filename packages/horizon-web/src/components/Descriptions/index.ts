import { default as Descriptions } from './src/Descriptions';
import { default as DescriptionItem } from './src/DescriptionItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const NDescriptions = withInstall(Descriptions, { DescriptionItem });
export const NDescriptionItem = withNoopInstall(DescriptionItem);
export default NDescriptions;
