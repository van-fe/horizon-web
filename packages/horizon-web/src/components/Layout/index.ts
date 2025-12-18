import { default as Row } from './src/Row';
import { default as Column } from './src/Column';
import { withInstall, withNoopInstall } from '@aurora/shared';

export const NRow = withInstall(Row, {
  Column,
});
export const NCol = withNoopInstall(Column);

export default NRow;
