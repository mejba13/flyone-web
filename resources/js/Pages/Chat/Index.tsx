import { useState, useRef, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/Hooks/useAuth';
import { getInitials } from '@/Lib/utils';
import { Send, Plus, Bot, Sparkles, Plane, MapPin, Tag, HelpCircle } from 'lucide-react';
import type { ChatConversation } from '@/Types';

interface Props {
    conversations: ChatConversation[];
}

const quickActions = [
    { icon: Plane, label: 'Find flights', prompt: 'Help me find cheap flights to Bali' },
    { icon: MapPin, label: 'Destination tips', prompt: 'What are the best places to visit in Thailand?' },
    { icon: Tag, label: 'Best deals', prompt: 'What are the current best travel deals?' },
    { icon: HelpCircle, label: 'Booking help', prompt: 'I need help with my booking' },
];

export default function ChatIndex({ conversations }: Props) {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(scrollToBottom, [messages]);

    const sendMessage = async (text?: string) => {
        const msg = text || message;
        if (!msg.trim() || isStreaming) return;

        setMessages((prev) => [...prev, { role: 'user', content: msg }]);
        setMessage('');
        setIsStreaming(true);
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        try {
            const response = await fetch('/chat/1/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ message: msg }),
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    const lines = chunk.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                            try {
                                const data = JSON.parse(line.slice(6));
                                if (data.text) {
                                    setMessages((prev) => {
                                        const updated = [...prev];
                                        updated[updated.length - 1] = {
                                            ...updated[updated.length - 1],
                                            content: updated[updated.length - 1].content + data.text,
                                        };
                                        return updated;
                                    });
                                }
                            } catch {}
                        }
                    }
                }
            }
        } catch (err) {
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
                return updated;
            });
        }
        setIsStreaming(false);
    };

    return (
        <MainLayout title="AI Chat" showFooter={false}>
            <div className="flex h-[calc(100vh-4rem)]">
                {/* Sidebar */}
                <div className="hidden md:flex w-72 bg-white border-r border-soft-dark/50 flex-col">
                    <div className="p-4">
                        <Button className="w-full" onClick={() => router.post('/chat')}>
                            <Plus className="h-4 w-4" /> New Chat
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2 space-y-1">
                        {conversations.map((conv) => (
                            <Link
                                key={conv.id}
                                href={`/chat/${conv.id}`}
                                className="block p-3 rounded-xl text-sm hover:bg-soft transition-colors truncate text-deep-lighter hover:text-deep"
                            >
                                {conv.title || 'New conversation'}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        {messages.length === 0 ? (
                            <div className="max-w-2xl mx-auto text-center pt-16">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="h-8 w-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-deep mb-2">Flyone AI Assistant</h2>
                                <p className="text-deep-lighter mb-8">I can help you find flights, plan trips, and answer travel questions.</p>
                                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action.label}
                                            onClick={() => sendMessage(action.prompt)}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-card hover:shadow-card-hover transition-all text-left"
                                        >
                                            <action.icon className="h-5 w-5 text-primary-500 shrink-0" />
                                            <span className="text-sm font-medium">{action.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto space-y-6">
                                <AnimatePresence>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {msg.role === 'assistant' && (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-teal flex items-center justify-center shrink-0">
                                                    <Bot className="h-4 w-4 text-white" />
                                                </div>
                                            )}
                                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                                msg.role === 'user'
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-white shadow-card'
                                            }`}>
                                                <p className="text-sm whitespace-pre-wrap">{msg.content || (isStreaming && i === messages.length - 1 ? '...' : '')}</p>
                                            </div>
                                            {msg.role === 'user' && (
                                                <Avatar className="h-8 w-8 shrink-0">
                                                    <AvatarFallback>{getInitials(user?.name || 'U')}</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t border-soft-dark/50 p-4">
                        <div className="max-w-3xl mx-auto flex gap-3">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything about travel..."
                                className="flex-1 h-12"
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                disabled={isStreaming}
                            />
                            <Button size="lg" onClick={() => sendMessage()} disabled={isStreaming || !message.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
