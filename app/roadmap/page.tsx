"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Target, Sparkles, Send, ArrowRight, Loader2, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const interestsList = [
    { id: "web", label: "Web Development", icon: "🌐" },
    { id: "ai", label: "AI & Machine Learning", icon: "🤖" },
    { id: "mobile", label: "Mobile App Dev", icon: "📱" },
    { id: "cloud", label: "Cloud & DevOps", icon: "☁️" },
    { id: "cyber", label: "Cybersecurity", icon: "🛡️" },
    { id: "data", label: "Data Science", icon: "📊" },
];

const domains = {
    web: { title: "Full Stack Web Development", description: "Build modern, scalable web applications from scratch." },
    ai: { title: "AI/ML Engineering", description: "Design and implement intelligent algorithms and data models." },
    mobile: { title: "Mobile Application Development", description: "Create native and cross-platform mobile experiences." },
    cloud: { title: "Cloud & Devops Engineering", description: "Master infrastructure, automation, and scaling." },
    cyber: { title: "Cybersecurity Analyst", description: "Protect systems and networks from digital attacks." },
    data: { title: "Data Scientist", description: "Extract meaningful insights from complex datasets." },
};

export default function RoadmapEntryPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [interest, setInterest] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [suggestedDomain, setSuggestedDomain] = useState<string | null>(null);

    const handleAnalyze = () => {
        setAnalyzing(true);
        // Artificial delay for "Analysis" feel
        setTimeout(() => {
            setSuggestedDomain(interest || "ai");
            setAnalyzing(false);
            setStep(3);
        }, 2000);
    };

    const handleGenerate = () => {
        router.push(`/roadmap/${suggestedDomain}`);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Smart <span className="text-gradient">Roadmap Architect</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Let AI design your career path based on your current skills and future goals.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="glass-card">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-neon-blue/20 flex items-center justify-center mb-4">
                                        <Brain className="w-6 h-6 text-neon-blue" />
                                    </div>
                                    <CardTitle className="text-2xl">What interests you the most?</CardTitle>
                                    <CardDescription>Select a domain you'd like to explore or advance in.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {interestsList.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setInterest(item.id)}
                                                className={`p-4 rounded-xl border text-left transition-all duration-300 ${interest === item.id
                                                        ? 'border-neon-blue bg-neon-blue/10 shadow-lg shadow-neon-blue/20'
                                                        : 'border-white/10 bg-white/5 hover:border-white/30'
                                                    }`}
                                            >
                                                <span className="text-2xl mb-2 block">{item.icon}</span>
                                                <span className="font-medium">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="neon"
                                        className="w-full"
                                        disabled={!interest}
                                        onClick={() => setStep(2)}
                                    >
                                        Next Step
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="glass-card">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center mb-4">
                                        <Target className="w-6 h-6 text-neon-purple" />
                                    </div>
                                    <CardTitle className="text-2xl">Current Skill Proficiency</CardTitle>
                                    <CardDescription>How much do you already know about this domain?</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 mb-8">
                                        {["Beginner (Just starting)", "Intermediate (Know the basics)", "Advanced (Looking for mastery)"].map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => setSkillLevel(level)}
                                                className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${skillLevel === level
                                                        ? 'border-neon-purple bg-neon-purple/10'
                                                        : 'border-white/10 bg-white/5 hover:border-white/30'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                                        <Button
                                            variant="neon"
                                            className="flex-1"
                                            disabled={!skillLevel || analyzing}
                                            onClick={handleAnalyze}
                                        >
                                            {analyzing ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Analyzing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4" />
                                                    Analyze My Path
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && suggestedDomain && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card className="glass-card border-neon-blue/50 shadow-2xl shadow-neon-blue/10">
                                <CardHeader className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-6 mx-auto">
                                        <Rocket className="w-10 h-10 text-white" />
                                    </div>
                                    <Badge variant="neon" className="mx-auto mb-2">AI RECOMMENDATION</Badge>
                                    <CardTitle className="text-3xl mb-2">
                                        {domains[suggestedDomain as keyof typeof domains]?.title}
                                    </CardTitle>
                                    <CardDescription className="text-lg">
                                        Based on your interest in {interest} and current {skillLevel} level, we've architected a perfect roadmap for you.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-neon-blue">
                                            <Sparkles className="w-4 h-4" />
                                            Analysis Results
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {domains[suggestedDomain as keyof typeof domains]?.description}
                                        </p>
                                    </div>

                                    <Button
                                        variant="neon"
                                        className="w-full py-8 text-xl font-bold rounded-2xl"
                                        onClick={handleGenerate}
                                    >
                                        Generate My Personal Roadmap
                                        <ArrowRight className="w-6 h-6 ml-3" />
                                    </Button>

                                    <button
                                        className="w-full text-sm text-muted-foreground hover:text-white transition-colors"
                                        onClick={() => setStep(1)}
                                    >
                                        Retake Analysis
                                    </button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
