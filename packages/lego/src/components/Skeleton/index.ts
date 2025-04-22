import { default as Skeleton } from './src/Skeleton';
import { default as SkeletonItem } from './src/SkeletonItem';
import { withInstall, withNoopInstall } from '@nio-fe/shared';

export const NSkeleton = withInstall(Skeleton, { SkeletonItem });
export const NSkeletonItem = withNoopInstall(SkeletonItem);
export default NSkeleton;
