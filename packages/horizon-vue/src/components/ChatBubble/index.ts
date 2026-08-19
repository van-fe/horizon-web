import ChatBubble from './src/ChatBubble';
import ChatBubbleList from './src/ChatBubbleList';
import { withInstall } from '@aurora/utils';

export const HChatBubble = withInstall(ChatBubble, { ChatBubbleList });
export const HChatBubbleList = withInstall(ChatBubbleList);
export default HChatBubble;
