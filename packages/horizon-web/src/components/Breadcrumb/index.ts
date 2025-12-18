import Breadcrumb from './src/Breadcrumb';
import BreadcrumbItem from './src/BreadcrumbItem';
import { withInstall, withNoopInstall } from '@aurora/shared';

export const NBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem,
});
export const NBreadcrumbItem = withNoopInstall(BreadcrumbItem);

export default NBreadcrumb;
