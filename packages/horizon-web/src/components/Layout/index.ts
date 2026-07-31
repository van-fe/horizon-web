import { default as Row } from './src/Row';
import { default as Column } from './src/Column';
import { default as Grid } from './src/Grid';
import { default as GridItem } from './src/GridItem';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HRow = withInstall(Row, {
  Column,
});
export const HCol = withNoopInstall(Column);
export const HGrid = withInstall(Grid, {
  Item: GridItem,
});
export const HGridItem = withNoopInstall(GridItem);

export default HRow;
