"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const skillBenchmarks = [
    {
        skill: "Python",
        yourLevel: 4,
        peerAverage: 3.2,
        status: "Interview Ready",
        color: "text-neon-blue",
    },
    {
        skill: "JavaScript",
        yourLevel: 3,
        peerAverage: 3.5,
        status: "Intermediate",
        color: "text-neon-purple",
    },
    {
        skill: "Machine Learning",
        yourLevel: 2,
        peerAverage: 2.8,
        status: "Beginner",
        color: "text-neon-pink",
    },
    {
        skill: "Data Structures",
        yourLevel: 4,
        peerAverage: 3.0,
        status: "Interview Ready",
        color: "text-neon-green",
    },
];

const GaugeMeter = ({ value, max = 5, color }: { value: number; max?: number; color: string }) => {
    const percentage = (value / max) * 100;
    const rotation = (percentage / 100) * 180 - 90;

    return (
        <div className="relative w-32 h-16">
            <svg className="w-32 h-16" viewBox="0 0 128 64">
                {/* Background arc */}
                <path
                    d="M 10 60 A 54 54 0 0 1 118 60"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                {/* Progress arc */}
                <path
                    d="M 10 60 A 54 54 0 0 1 118 60"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(percentage / 100) * 170} 170`}
                />
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
            </svg>
            {/* Needle */}
            <div
                className="absolute bottom-0 left-1/2 w-1 h-12 bg-white origin-bottom transition-transform duration-500"
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            />
            {/* Center value */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground">/ {max}</p>
            </div>
        </div>
    );
};

export default function BenchmarkingPage() {
    return (
        <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Skill <span className="text-gradient">Benchmarking</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        See how your skills compare with peers
                    </p>
                </motion.div>

                {/* Overview Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <Award className="w-8 h-8 text-neon-blue mb-3" />
                                <p className="text-3xl font-bold mb-1">8/12</p>
                                <p className="text-sm text-muted-foreground">Skills Above Average</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <Target className="w-8 h-8 text-neon-purple mb-3" />
                                <p className="text-3xl font-bold mb-1">4</p>
                                <p className="text-sm text-muted-foreground">Interview Ready Skills</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <TrendingUp className="w-8 h-8 text-neon-green mb-3" />
                                <p className="text-3xl font-bold mb-1">Top 25%</p>
                                <p className="text-sm text-muted-foreground">Overall Ranking</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Skill Benchmarks */}
                <div className="space-y-6">
                    {skillBenchmarks.map((benchmark, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-2xl">{benchmark.skill}</CardTitle>
                                            <CardDescription className="mt-1">
                                                <Badge
                                                    variant={benchmark.status === "Interview Ready" ? "neon" : "outline"}
                                                    className="mt-2"
                                                >
                                                    {benchmark.status}
                                                </Badge>
                                            </CardDescription>
                                        </div>
                                        <GaugeMeter value={benchmark.yourLevel} color={benchmark.color} />
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Your Level */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Your Level</span>
                                                <span className={`font-bold ${benchmark.color}`}>
                                                    {benchmark.yourLevel}/5
                                                </span>
                                            </div>
                                            <Progress value={(benchmark.yourLevel / 5) * 100} />
                                        </div>

                                        {/* Peer Average */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-medium">Peer Average</span>
                                                <span className="font-bold text-muted-foreground">
                                                    {benchmark.peerAverage}/5
                                                </span>
                                            </div>
                                            <Progress value={(benchmark.peerAverage / 5) * 100} />
                                        </div>
                                    </div>

                                    {/* Comparison */}
                                    <div className="mt-4 p-4 glass rounded-lg">
                                        <p className="text-sm">
                                            {benchmark.yourLevel > benchmark.peerAverage ? (
                                                <span className="text-neon-green">
                                                    ✨ You're {((benchmark.yourLevel - benchmark.peerAverage) / benchmark.peerAverage * 100).toFixed(0)}% ahead of your peers!
                                                </span>
                                            ) : (
                                                <span className="text-neon-blue">
                                                    💪 Focus on this skill to match peer average
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
