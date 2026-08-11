import Breadcrumb from './src/Breadcrumb';
import BreadcrumbItem from './src/BreadcrumbItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem,
});
export const HBreadcrumbItem = withNoopInstall(BreadcrumbItem);

export default HBreadcrumb;
