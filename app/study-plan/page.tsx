"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Brain,
    Target,
    Sparkles,
    Calendar,
    Clock,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const domains = ["Web Development", "AI/ML Engineering", "Cybersecurity", "Cloud Computing", "Data Science"];

export default function StudyPlanGenerator() {
    const [step, setStep] = useState(1);
    const [domain, setDomain] = useState("");
    const [strengths, setStrengths] = useState<string[]>([]);
    const [weaknesses, setWeaknesses] = useState<string[]>([]);
    const [generating, setGenerating] = useState(false);
    const [plan, setPlan] = useState<any>(null);

    const toggleStrength = (item: string) => {
        setStrengths(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const toggleWeakness = (item: string) => {
        setWeaknesses(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const generatePlan = () => {
        setGenerating(true);
        setTimeout(() => {
            const mockPlan = {
                title: `${domain} Mastery Plan`,
                duration: "8 Weeks",
                dailyCommitment: "3-4 Hours",
                focusAreas: [
                    {
                        title: "Bridge the Gap",
                        description: `Since you're strong in ${strengths.slice(0, 2).join(", ")}, we'll leverage those to tackle ${weaknesses.slice(0, 2).join(", ")}.`,
                        tasks: ["Advanced Concept Mapping", "Peer Review Session", "Project-based Application"]
                    },
                    {
                        title: "Foundation Reinforcement",
                        description: `Deep dive into ${weaknesses[0] || "core concepts"} with hands-on labs.`,
                        tasks: ["Video Tutorials", "Documentation Sprint", "Hands-on Workshop"]
                    }
                ],
                schedule: [
                    { week: 1, topic: `Deep Dive: ${weaknesses[0] || "Foundations"}`, intensity: "High" },
                    { week: 2, topic: `Advanced ${strengths[0] || "Core"} Integration`, intensity: "Medium" },
                    { week: 3, topic: "Project Implementation Phase I", intensity: "High" },
                    { week: 4, topic: "Review & Testing", intensity: "Medium" },
                ]
            };
            setPlan(mockPlan);
            setGenerating(false);
            setStep(4);
        }, 2500);
    };

    const currentDomainSkills = {
        "Web Development": ["HTML/CSS", "JavaScript", "React", "Node.js", "System Design", "Databases"],
        "AI/ML Engineering": ["Python", "Linear Algebra", "Calculus", "Neural Networks", "Pandas/NumPy", "Deep Learning"],
        "Cybersecurity": ["Networking", "Linux Mastery", "Penetration Testing", "Encryption", "Security Auditing"],
        "Cloud Computing": ["AWS/Azure", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
        "Data Science": ["Statistics", "R/Python", "Data Visualization", "Big Data", "Machine Learning Foundation"],
    };

    const skills = domain ? currentDomainSkills[domain as keyof typeof currentDomainSkills] : [];

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.1),transparent_50%)] -z-10" />

            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            AI Study <span className="text-gradient">Plan Architect</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Custom study paths based on what you know and what you need to master.
                        </p>
                    </motion.div>
                </header>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Card className="glass-card">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-neon-blue/20 flex items-center justify-center mb-4 text-neon-blue">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <CardTitle>Step 1: Choose Your Path</CardTitle>
                                    <CardDescription>Select the domain you want to master.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {domains.map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => { setDomain(d); setStep(2); }}
                                                className="p-4 text-left rounded-xl border border-white/10 bg-white/5 hover:border-neon-blue/50 hover:bg-neon-blue/5 transition-all group"
                                            >
                                                <span className="font-semibold transition-colors group-hover:text-neon-blue">{d}</span>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Card className="glass-card">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center mb-4 text-neon-green">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <CardTitle>Step 2: Define your Strengths</CardTitle>
                                    <CardDescription>What are you already comfortable with in {domain}?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant={strengths.includes(skill) ? "neon" : "outline"}
                                                className="px-4 py-2 cursor-pointer text-sm"
                                                onClick={() => toggleStrength(skill)}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex justify-between">
                                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                        <Button variant="neon" disabled={strengths.length === 0} onClick={() => setStep(3)}>Next: Weaknesses</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <Card className="glass-card">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-red-400/20 flex items-center justify-center mb-4 text-red-400">
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <CardTitle>Step 3: Identify Weaknesses</CardTitle>
                                    <CardDescription>Which areas feel challenging or new?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {skills.filter(s => !strengths.includes(s)).map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant={weaknesses.includes(skill) ? "neon" : "outline"}
                                                className={`px-4 py-2 cursor-pointer text-sm ${weaknesses.includes(skill) ? 'bg-red-400/20 text-red-400 border-red-400/50' : ''}`}
                                                onClick={() => toggleWeakness(skill)}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    {generating ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-center gap-3 text-neon-blue">
                                                <Sparkles className="w-6 h-6 animate-spin" />
                                                <span className="font-bold">Architecting your plan...</span>
                                            </div>
                                            <Progress value={66} className="h-2" />
                                        </div>
                                    ) : (
                                        <div className="flex justify-between">
                                            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                                            <Button variant="neon" disabled={weaknesses.length === 0} onClick={generatePlan}>Generate Study Plan</Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 4 && plan && (
                        <motion.div key="plan" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="space-y-8">
                                <Card className="border-neon-blue/50 bg-neon-blue/5 shadow-2xl shadow-neon-blue/10">
                                    <CardHeader className="text-center pb-2">
                                        <Badge variant="neon" className="mx-auto mb-4">PERSONALIZED PLAN</Badge>
                                        <CardTitle className="text-3xl">{plan.title}</CardTitle>
                                        <div className="flex justify-center gap-6 mt-4">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">{plan.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm">{plan.dailyCommitment}/day</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {plan.focusAreas.map((area: any, i: number) => (
                                        <Card key={i} className="bg-black/40 border-white/10">
                                            <CardHeader>
                                                <div className="flex items-center gap-2 text-neon-blue mb-2">
                                                    <Lightbulb className="w-5 h-5" />
                                                    <CardTitle className="text-lg">{area.title}</CardTitle>
                                                </div>
                                                <CardDescription className="text-sm">{area.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    {area.tasks.map((task: string, j: number) => (
                                                        <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
                                                            {task}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <Card className="bg-black/40 border-white/10">
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-neon-purple" />
                                            Weekly Roadmap
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {plan.schedule.map((item: any, i: number) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all">
                                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm shrink-0">
                                                        W{item.week}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">{item.topic}</h4>
                                                        <p className="text-xs text-muted-foreground">Intensity: <span className={item.intensity === 'High' ? 'text-red-400' : 'text-neon-green'}>{item.intensity}</span></p>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="flex justify-center pt-8">
                                    <Button variant="outline" onClick={() => setStep(1)}>
                                        Create New Plan
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
