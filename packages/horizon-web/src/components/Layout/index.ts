import { default as Row } from './src/Row';
import { default as Column } from './src/Column';
import { withInstall, withNoopInstall } from '@aurora/utils';

export const HRow = withInstall(Row, {
  Column,
});
export const HCol = withNoopInstall(Column);

export default HRow;
