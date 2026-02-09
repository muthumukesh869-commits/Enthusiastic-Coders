"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, MinusSquare, Maximize2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm MindMaple. Ask me anything about your career roadmap or resume!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });
            const data = await response.json();
            setMessages(prev => [...prev, data]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass-darker border border-white/10 w-[400px] h-[600px] rounded-[32px] shadow-2xl overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header */}
                        <header className="p-6 border-b border-white/5 bg-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <Bot className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">MindMaple</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5" onClick={() => setIsOpen(false)}>
                                    <MinusSquare className="w-4 h-4 text-muted-foreground" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5" onClick={() => setIsOpen(false)}>
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>
                        </header>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-hidden relative">
                            <ScrollArea className="h-full p-6">
                                <div className="space-y-6">
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn(
                                                "flex gap-3 max-w-[85%]",
                                                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border",
                                                msg.role === 'assistant'
                                                    ? "bg-primary/10 border-primary/20"
                                                    : "bg-white/5 border-white/10"
                                            )}>
                                                {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-muted-foreground" />}
                                            </div>
                                            <div className={cn(
                                                "p-4 rounded-2xl text-sm leading-relaxed",
                                                msg.role === 'assistant'
                                                    ? "glass border-white/5 text-foreground"
                                                    : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            )}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-3 max-w-[85%]">
                                            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="glass p-4 rounded-2xl border-white/5 flex gap-1 items-center">
                                                <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                                                <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Footer */}
                        <footer className="p-6 border-t border-white/5 bg-black/20">
                            <div className="relative">
                                <Input
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl pr-14 focus:ring-primary shadow-inner"
                                    placeholder="Type your doubt here..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:scale-105 active:scale-95 transition-transform"
                                    onClick={handleSend}
                                    disabled={isLoading}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative overflow-hidden",
                    isOpen ? "bg-white/10 glass rotate-90" : "bg-primary glow-blue"
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {isOpen ? (
                    <X className="w-8 h-8 text-foreground" />
                ) : (
                    <div className="relative">
                        <Zap className="w-8 h-8 text-primary-foreground absolute animate-ping opacity-20" />
                        <MessageSquare className="w-8 h-8 text-primary-foreground" />
                    </div>
                )}
            </motion.button>
        </div>
    );
}
