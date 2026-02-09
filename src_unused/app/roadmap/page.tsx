"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Circle,
    Lock,
    Play,
    BookOpen,
    Code2,
    ChevronDown,
    ChevronRight,
    Target,
    Sparkles
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const roadmapData = [
    {
        week: "Month 1",
        title: "Foundations & Basics",
        status: "completed",
        modules: [
            { name: "Advanced Data Structures", type: "Concepts", completed: true, duration: "4h" },
            { name: "Time Complexity Analysis", type: "Practice", completed: true, duration: "2h" },
            { name: "Standard Template Library", type: "Code", completed: true, duration: "5h" },
        ]
    },
    {
        week: "Month 2",
        title: "Algorithm Mastery",
        status: "active",
        modules: [
            { name: "Dynamic Programming Patterns", type: "Concepts", completed: false, active: true, duration: "8h" },
            { name: "Graph Algorithms (BFS/DFS)", type: "Practice", completed: false, duration: "6h" },
            { name: "Sorting & Searching", type: "Code", completed: true, duration: "3h" },
        ]
    },
    {
        week: "Month 3",
        title: "Project Development",
        status: "locked",
        modules: [
            { name: "System Design Fundamentals", type: "Concepts", completed: false, duration: "10h" },
            { name: "Scalability Strategies", type: "Concepts", completed: false, duration: "6h" },
            { name: "Database Optimization", type: "Practice", completed: false, duration: "5h" },
        ]
    },
    {
        week: "Month 4",
        title: "Placement Preparation",
        status: "locked",
        modules: [
            { name: "Mock Technical Interviews", type: "Practice", completed: false, duration: "12h" },
            { name: "HR Round Preparation", type: "Practice", completed: false, duration: "4h" },
            { name: "Resume Finalization", type: "Task", completed: false, duration: "2h" },
        ]
    }
];

export default function RoadmapPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen pl-64 bg-background"><Sidebar /></div>;
    return (
        <div className="min-h-screen pl-64 bg-background">
            <Sidebar />

            <main className="p-10 pt-28 max-w-5xl mx-auto">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4"
                        >
                            <Target className="w-3 h-3" />
                            TARGET: GOOGLE / MICROSOFT
                        </motion.div>
                        <h1 className="text-4xl font-bold mb-2">Technical Mastery Roadmap</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            AI-Adaptive path adjusted to your current pace.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Progress</p>
                        <p className="text-3xl font-bold text-primary">42%</p>
                    </div>
                </header>

                <section className="space-y-12">
                    {roadmapData.map((phase, phaseIdx) => (
                        <div key={phase.week} className="relative">
                            {/* Connection Line */}
                            {phaseIdx !== roadmapData.length - 1 && (
                                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
                            )}

                            <div className="flex gap-10">
                                {/* Status Icon */}
                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-background shadow-lg ${phase.status === 'completed' ? 'border-emerald-500 text-emerald-500 shadow-emerald-500/20' :
                                            phase.status === 'active' ? 'border-primary text-primary shadow-primary/20 animate-pulse' :
                                                'border-white/10 text-muted-foreground'
                                            }`}
                                    >
                                        {phase.status === 'completed' && <CheckCircle2 className="w-6 h-6" />}
                                        {phase.status === 'active' && <Play className="w-5 h-5 fill-current" />}
                                        {phase.status === 'locked' && <Lock className="w-5 h-5" />}
                                    </motion.div>
                                </div>

                                {/* Phase Content */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-sm font-bold tracking-widest uppercase ${phase.status === 'completed' ? 'text-emerald-500' :
                                                phase.status === 'active' ? 'text-primary' : 'text-muted-foreground'
                                                }`}>
                                                {phase.week}
                                            </span>
                                            {phase.status === 'active' && (
                                                <Badge className="bg-primary/20 text-primary border-none text-[10px]">CURRENT PHASE</Badge>
                                            )}
                                        </div>
                                        <h2 className="text-2xl font-bold">{phase.title}</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {phase.modules.map((mod, modIdx) => (
                                            <motion.div
                                                key={mod.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: modIdx * 0.1 }}
                                                className={`glass p-5 rounded-2xl border transition-all ${mod.active ? 'border-primary/40 bg-primary/5' : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                                                    } ${phase.status === 'locked' ? 'opacity-50' : ''}`}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="p-2 rounded-xl bg-white/5">
                                                        {mod.type === 'Concepts' && <BookOpen className="w-4 h-4 text-purple-400" />}
                                                        {mod.type === 'Practice' && <Target className="w-4 h-4 text-cyan-400" />}
                                                        {mod.type === 'Code' && <Code2 className="w-4 h-4 text-orange-400" />}
                                                        {mod.type === 'Task' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-60 mb-1">{mod.type}</span>
                                                        <span className="text-xs font-medium text-muted-foreground">{mod.duration}</span>
                                                    </div>
                                                </div>
                                                <h4 className="font-bold mb-4">{mod.name}</h4>
                                                <div className="flex items-center justify-between">
                                                    {mod.completed ? (
                                                        <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                                                            <CheckCircle2 className="w-3" />
                                                            COMPLETED
                                                        </div>
                                                    ) : (
                                                        <Button size="sm" variant={mod.active ? "default" : "outline"} className={`h-8 rounded-lg text-xs gap-1 ${!mod.active && 'bg-white/5 border-white/10'}`}>
                                                            {mod.active ? 'Continue' : 'Start'}
                                                            <ChevronRight className="w-3 h-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}
