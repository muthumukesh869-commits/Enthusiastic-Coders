"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Sparkles,
    ArrowUpRight,
    Lightbulb,
    AlertTriangle,
    RefreshCw,
    Zap,
    ChevronRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';

const ICON_MAP: Record<string, any> = {
    Lightbulb,
    RefreshCw,
    AlertTriangle,
    Sparkles,
    Zap
};

export default function AIFeedback() {
    const { feedbacks, fetchFeedbacks, isLoading } = useAppStore();

    useEffect(() => {
        if (feedbacks.length === 0) {
            fetchFeedbacks();
        }
    }, [fetchFeedbacks, feedbacks.length]);

    return (
        <div className="min-h-screen pl-64 bg-background">
            <Sidebar />

            <main className="p-10 pt-28 max-w-5xl mx-auto space-y-12">
                <header className="flex justify-between items-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <MessageSquare className="w-10 h-10 text-primary" />
                            Adaptive Feedback
                        </h1>
                        <p className="text-muted-foreground text-lg">AI-generated insights tailored to your learning pace and market trends.</p>
                    </div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="p-4 rounded-full bg-primary/20 text-primary"
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>
                </header>

                <section className="space-y-6">
                    <AnimatePresence>
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="glass p-12 rounded-[40px] border border-white/5 animate-pulse h-40" />
                            ))
                        ) : feedbacks.map((fb, i) => {
                            const Icon = ICON_MAP[fb.icon] || MessageSquare;
                            return (
                                <motion.div
                                    key={fb.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass relative p-8 rounded-[40px] border border-white/5 overflow-hidden group"
                                >
                                    <div className={`absolute top-0 right-0 w-64 h-64 ${fb.bg} blur-[120px] opacity-20 -z-10`} />

                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className={`p-5 rounded-[24px] ${fb.bg} ${fb.color}`}>
                                            <Icon className="w-10 h-10" />
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className={`${fb.color} border-current border-opacity-30 bg-white/5 px-3 py-1 rounded-full uppercase text-[10px] font-bold tracking-widest`}>
                                                    {fb.type}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground font-medium">Just now</span>
                                            </div>
                                            <h3 className="text-2xl font-bold">{fb.title}</h3>
                                            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                                                {fb.content}
                                            </p>
                                        </div>

                                        <Button className="shrink-0 h-14 px-8 rounded-2xl gap-2 font-bold shadow-lg shadow-black/20 group-hover:scale-105 transition-transform">
                                            {fb.action}
                                            <ArrowUpRight className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </section>

                {/* Global Stats/Pulse */}
                <footer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-[40px] border border-white/5 flex items-center gap-6">
                        <div className="p-4 rounded-3xl bg-emerald-500/10 text-emerald-400">
                            <Zap className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black">12.5h</h4>
                            <p className="text-muted-foreground font-medium">Study time saved this week by AI optimization</p>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[40px] border border-white/5 flex items-center gap-6 group cursor-pointer hover:bg-white/5">
                        <div className="p-4 rounded-3xl bg-primary/10 text-primary">
                            <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold">Resume Updated</h4>
                            <p className="text-sm text-muted-foreground">AI auto-added 'Cloud Arch' to your experience section.</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                </footer>
            </main>
        </div>
    );
}
