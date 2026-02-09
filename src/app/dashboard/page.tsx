"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    CheckCircle2,
    Clock,
    Zap,
    ArrowUpRight,
    ShieldCheck,
    BrainCircuit,
    Rocket,
    RefreshCw
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';

const dashboardStats = [
    { label: "Placement Readiness", value: "68%", icon: Rocket, color: "text-orange-400" },
    { label: "Skills Gained", value: "24", icon: Zap, color: "text-yellow-400" },
    { label: "Tests Completed", value: "12", icon: CheckCircle2, color: "text-emerald-400" },
    { label: "Hours Studied", value: "156h", icon: Clock, color: "text-blue-400" },
];

export default function Dashboard() {
    const { recommendations, fetchRecommendations, isLoading } = useAppStore();

    useEffect(() => {
        if (recommendations.length === 0) {
            fetchRecommendations();
        }
    }, [fetchRecommendations, recommendations.length]);

    return (
        <div className="min-h-screen pl-64 bg-background">
            <Sidebar />

            <main className="p-10 pt-28 max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Welcome Back, <span className="text-primary">Alex</span> 👋</h1>
                        <p className="text-muted-foreground">Here's your career progress at a glance.</p>
                    </div>
                    <Button className="rounded-xl gap-2 h-12 px-6">
                        <BrainCircuit className="w-5 h-5" />
                        Ask AI Assistant
                    </Button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-6 rounded-3xl border border-white/5 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground/50" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-3xl font-bold">{stat.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Recommendations */}
                    <section className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Recommended Paths</h2>
                            <Button
                                variant="ghost"
                                className="text-primary hover:text-primary/80"
                                onClick={() => fetchRecommendations()}
                                disabled={isLoading}
                            >
                                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Refresh AI'}
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {isLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="glass p-6 rounded-[24px] border border-white/5 animate-pulse h-28" />
                                ))
                            ) : recommendations.map((role, i) => (
                                <motion.div
                                    key={role.role}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                    whileHover={{ x: 10 }}
                                    className="glass p-6 rounded-[24px] border border-white/5 flex items-center gap-6 group cursor-pointer"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex flex-col items-center justify-center text-primary border border-white/10 group-hover:border-primary/50 transition-colors">
                                        <span className="text-xl font-bold leading-none">{role.matchPercentage}%</span>
                                        <span className="text-[10px] uppercase tracking-wider font-medium opacity-60">Match</span>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold mb-1">{role.role}</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            {role.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="bg-white/5 font-normal text-muted-foreground">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-emerald-400 font-bold mb-1">
                                            <TrendingUp className="w-4 h-4" />
                                            {role.growth}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Market Trend</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Readiness Card */}
                        <Card className="glass border-white/10 rounded-[32px] overflow-hidden">
                            <CardHeader className="bg-primary/10 border-b border-white/5">
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    Review Required
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium">ATS Score Prediction</span>
                                        <span className="text-2xl font-bold">72%</span>
                                    </div>
                                    <Progress value={72} className="h-2" />
                                    <p className="text-xs text-muted-foreground">Boost your score by 15% by adding "Cloud Architecture" keywords to your resume.</p>
                                </div>
                                <Button className="w-full rounded-2xl h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground">
                                    Analyze Resume
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Next Milestone */}
                        <div className="glass p-6 rounded-[32px] border border-white/5">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-yellow-400">
                                <Clock className="w-4 h-4" />
                                Upcoming Task
                            </h3>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <h4 className="font-bold mb-1">System Design Workshop</h4>
                                <p className="text-sm text-muted-foreground mb-3">Learn how to build scalable microservices.</p>
                                <div className="flex justify-between items-center text-xs">
                                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">Due in 2h</Badge>
                                    <span className="text-muted-foreground">+50 XP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
