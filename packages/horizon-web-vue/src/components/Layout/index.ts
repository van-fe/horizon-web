import { default as Grid } from './src/Grid';
import { default as GridItem } from './src/GridItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HGrid = withInstall(Grid, {
  Item: GridItem,
});
export const HGridItem = withNoopInstall(GridItem);

export default HGrid;
