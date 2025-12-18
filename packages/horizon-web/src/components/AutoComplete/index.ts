import { default as AutoComplete } from './src/AutoComplete';
import { withInstall } from '@aurora/shared';
export type { NAutoCompleteOption } from './src/utils/typed';

export const NAutoComplete = withInstall(AutoComplete);
export default NAutoComplete;
