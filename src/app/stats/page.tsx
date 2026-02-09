"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    Users,
    Award,
    Target,
    Zap,
    Info,
    Clock
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const skillCategories = [
    { name: "Frontend Development", level: 85, peerAvg: 65, color: "text-blue-400" },
    { name: "Backend Architecture", level: 72, peerAvg: 58, color: "text-purple-400" },
    { name: "System Design", level: 45, peerAvg: 52, color: "text-yellow-400" },
    { name: "Data Structures", level: 90, peerAvg: 70, color: "text-emerald-400" },
];

export default function SkillStats() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen pl-64 bg-background"><Sidebar /></div>;
    return (
        <div className="min-h-screen pl-64 bg-background">
            <Sidebar />

            <main className="p-10 pt-28 max-w-7xl mx-auto space-y-10">
                <header>
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        <BarChart3 className="w-10 h-10 text-primary" />
                        Skill Benchmarking
                    </h1>
                    <p className="text-muted-foreground">See how you stack up against peer averages and industry standards.</p>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Top Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skillCategories.map((cat, i) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-[40px] border border-white/5 space-y-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                                        <p className="text-sm text-muted-foreground">Current Level</p>
                                    </div>
                                    <div className={`p-4 rounded-3xl bg-white/5 ${cat.color}`}>
                                        {i === 0 && <Zap className="w-6 h-6" />}
                                        {i === 1 && <Target className="w-6 h-6" />}
                                        {i === 2 && <TrendingUp className="w-6 h-6" />}
                                        {i === 3 && <Award className="w-6 h-6" />}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-4xl font-black">{cat.level}%</span>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">Peer Avg</p>
                                            <p className="font-bold">{cat.peerAvg}%</p>
                                        </div>
                                    </div>
                                    <div className="relative h-3">
                                        <Progress value={cat.level} className="h-full rounded-full" />
                                        <div
                                            className="absolute top-0 bottom-0 w-0.5 bg-white border-x border-black/50 z-10"
                                            style={{ left: `${cat.peerAvg}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase pt-2">
                                        <span>Beginner</span>
                                        <span>Expert</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <Card className="glass border-white/5 rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
                                <CardTitle className="text-xl flex items-center gap-3">
                                    <Users className="w-6 h-6 text-primary" />
                                    Community Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-10">
                                <div className="text-center">
                                    <p className="text-muted-foreground mb-2">Overall percentile</p>
                                    <h2 className="text-6xl font-black text-primary">82nd</h2>
                                    <p className="text-sm font-medium mt-4 text-emerald-400">+5% since last week</p>
                                </div>

                                <hr className="border-white/5" />

                                <div className="space-y-6">
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Achievement Log</h4>
                                    <div className="space-y-4">
                                        {[
                                            { title: "Top 10% in Logic", time: "2d ago", icon: Award, color: "text-yellow-400" },
                                            { title: "Weekly Goal Met", time: "4d ago", icon: Zap, color: "text-blue-400" },
                                            { title: "Certified React Dev", time: "1w ago", icon: CheckCircle, color: "text-emerald-400" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-center">
                                                <div className={`p-2 rounded-xl bg-white/5 ${item.color}`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold">{item.title}</p>
                                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="p-3 rounded-2xl bg-primary/20 text-primary">
                                    <Info className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2 text-lg">AI Suggestion</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Focus on <span className="text-white font-bold">System Design</span> this week. You are currently in the 45th percentile, which is a key requirement for SDE-2 roles.
                                    </p>
                                    <Button variant="link" className="p-0 h-auto text-primary mt-4 font-bold text-sm">
                                        Explore Roadmaps <TrendingUp className="ml-1 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Mock CheckCircle since it wasn't imported
function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
