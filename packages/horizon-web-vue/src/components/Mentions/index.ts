import { withInstall } from '@aurora/utils';
import Mentions from './src/Mentions';

export const HMentions = withInstall(Mentions);
export default HMentions;
export type { HMentionsOption, MentionOption } from './src/composables/useProps';
