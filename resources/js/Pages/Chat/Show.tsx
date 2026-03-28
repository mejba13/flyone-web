import ChatIndex from './Index';
import type { ChatConversation } from '@/Types';

interface Props {
    conversation: ChatConversation;
    conversations?: ChatConversation[];
}

export default function ChatShow({ conversation, conversations = [] }: Props) {
    return <ChatIndex conversations={conversations} />;
}
