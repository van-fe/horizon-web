import { default as AutoComplete } from './src/AutoComplete';
import { withInstall } from '@aurora/utils';
export type { HAutoCompleteOption } from './src/utils/typed';

export const HAutoComplete = withInstall(AutoComplete);
export default HAutoComplete;
