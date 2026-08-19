import { default as Skeleton } from './src/Skeleton';
import { default as SkeletonItem } from './src/SkeletonItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HSkeleton = withInstall(Skeleton, { SkeletonItem });
export const HSkeletonItem = withNoopInstall(SkeletonItem);
export default HSkeleton;
