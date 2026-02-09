"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart3,
    Zap,
    Target,
    TrendingUp,
    Award,
    ShieldCheck,
    Cpu,
    Globe,
    Search,
    ChevronRight,
    Trophy,
    LineChart,
    Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const industryBenchmarks = {
    "Web Development": {
        technical: 85,
        projects: 80,
        problemSolving: 90,
        tools: 75
    },
    "AI/ML Engineering": {
        technical: 92,
        projects: 85,
        problemSolving: 95,
        tools: 80
    },
    "Data Science": {
        technical: 88,
        projects: 82,
        problemSolving: 85,
        tools: 90
    }
};

export default function BenchmarkingPage() {
    const [domain, setDomain] = useState("AI/ML Engineering");
    const [evaluating, setEvaluating] = useState(false);
    const [score, setScore] = useState<any>(null);

    const startEvaluation = () => {
        setEvaluating(true);
        setTimeout(() => {
            setScore({
                overall: 78,
                technical: 82,
                projects: 70,
                problemSolving: 85,
                tools: 65,
                percentile: "85th",
                status: "Ready for Interviews",
                gap: "Focus on Cloud Deployment and System Design to reach Top 1% level."
            });
            setEvaluating(false);
        }, 3000);
    };

    const benchmark = industryBenchmarks[domain as keyof typeof industryBenchmarks] || industryBenchmarks["Web Development"];

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge variant="neon" className="mb-4">INDUSTRY STANDARDS v4.2</Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            Preparation <span className="text-gradient">Benchmarking</span>
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-2xl">
                            Evaluate your skills against real-world data from top product companies and startups.
                        </p>
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-xl">Evaluation Parameters</CardTitle>
                                <CardDescription>Select your target domain for analysis.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {Object.keys(industryBenchmarks).map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setDomain(d)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${domain === d
                                                ? 'bg-neon-blue/10 border-neon-blue/50 text-neon-blue shadow-lg'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="font-semibold text-sm">{d}</span>
                                    </button>
                                ))}

                                <div className="pt-6">
                                    <Button
                                        variant="neon"
                                        className="w-full py-6 text-lg"
                                        onClick={startEvaluation}
                                        disabled={evaluating}
                                    >
                                        {evaluating ? "Analyzing Data..." : "Start Benchmark"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-neon-purple/20 to-transparent border-white/10">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-5 h-5 text-neon-purple" />
                                    <h4 className="font-bold">Verified Metrics</h4>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Benchmarks are calibrated weekly using hiring data from FAANG and Indian Unicorns.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {!score && !evaluating && (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <BarChart3 className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                                    <h3 className="text-2xl font-bold mb-2">Ready for Evaluation?</h3>
                                    <p className="text-muted-foreground max-w-sm">
                                        Our AI will compare your current profile against {domain} expectations.
                                    </p>
                                </motion.div>
                            )}

                            {evaluating && (
                                <motion.div
                                    key="evaluating"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center p-12"
                                >
                                    <div className="relative w-24 h-24 mb-6">
                                        <div className="absolute inset-0 border-4 border-neon-blue/20 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-neon-blue rounded-full border-t-transparent animate-spin" />
                                        <Cpu className="absolute inset-6 w-12 h-12 text-neon-blue animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Computing Percentiles</h3>
                                    <div className="w-full max-w-md space-y-2 mt-4">
                                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                            <span>Technical Skill Mapping</span>
                                            <span>72%</span>
                                        </div>
                                        <Progress value={72} className="h-1" />
                                    </div>
                                </motion.div>
                            )}

                            {score && !evaluating && (
                                <motion.div
                                    key="score"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    {/* Score Overview Card */}
                                    <Card className="bg-black/40 border-neon-blue/30 overflow-hidden relative">
                                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl" />
                                        <CardContent className="pt-8">
                                            <div className="flex flex-col md:flex-row items-center gap-8">
                                                <div className="relative w-32 h-32 flex items-center justify-center">
                                                    <svg className="w-full h-full transform -rotate-90">
                                                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                            strokeDasharray={377}
                                                            strokeDashoffset={377 - (377 * score.overall) / 100}
                                                            className="text-neon-blue transition-all duration-1000" />
                                                    </svg>
                                                    <div className="absolute text-3xl font-bold">{score.overall}%</div>
                                                </div>
                                                <div className="text-center md:text-left space-y-2">
                                                    <Badge variant="neon">{score.status}</Badge>
                                                    <h3 className="text-3xl font-bold">Top {score.percentile} Percentile</h3>
                                                    <p className="text-sm text-muted-foreground max-w-md italic">
                                                        "{score.gap}"
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Industry Gap Radar */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <Card className="bg-black/40 border-white/10">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-neon-green" />
                                                    Skill Benchmarks
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                {[
                                                    { label: "Technical Concepts", val: score.technical, bench: benchmark.technical },
                                                    { label: "Project Practicality", val: score.projects, bench: benchmark.projects },
                                                    { label: "Problem Solving", val: score.problemSolving, bench: benchmark.problemSolving },
                                                    { label: "Industry Tools", val: score.tools, bench: benchmark.tools },
                                                ].map((skill, i) => (
                                                    <div key={i} className="space-y-2">
                                                        <div className="flex justify-between text-xs">
                                                            <span className="font-medium">{skill.label}</span>
                                                            <span className="text-muted-foreground">Target: {skill.bench}%</span>
                                                        </div>
                                                        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${skill.val}%` }}
                                                                className={`absolute h-full ${skill.val >= skill.bench ? 'bg-neon-green shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-neon-blue'}`}
                                                            />
                                                            <div className="absolute top-0 bottom-0 w-[2px] bg-white/30" style={{ left: `${skill.bench}%` }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>

                                        <Card className="bg-black/40 border-white/10">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <Trophy className="w-4 h-4 text-neon-purple" />
                                                    Preparation Insights
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="p-4 rounded-xl bg-neon-green/10 border border-neon-green/20">
                                                    <h5 className="text-xs font-bold text-neon-green uppercase mb-1">Elite Area</h5>
                                                    <p className="text-sm">Your Problem Solving ability exceeds 85% of applicants in {domain}.</p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-neon-blue/10 border border-neon-blue/20">
                                                    <h5 className="text-xs font-bold text-neon-blue uppercase mb-1">Next Milestone</h5>
                                                    <p className="text-sm">Master Docker and Kubernetes to increase your "Industry Tools" score by 15%.</p>
                                                </div>
                                                <Button variant="glass" className="w-full mt-2" onClick={() => window.location.href = '/study-plan'}>
                                                    View Action Plan
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
