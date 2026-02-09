"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileUp,
    FileSearch,
    CheckCircle,
    AlertCircle,
    Lightbulb,
    Download,
    Share2,
    Brain,
    Zap
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

export default function ResumeAnalyzer() {
    const { resumeAnalysis, analyzeResume, isLoading, error } = useAppStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await analyzeResume(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen pl-64 bg-background">
            <Sidebar />

            <main className="p-10 pt-28 max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        <FileSearch className="w-10 h-10 text-primary" />
                        Smart Resume Analyzer
                    </h1>
                    <p className="text-muted-foreground">Upload your resume to get instant ATS optimization and keyword feedback.</p>
                </header>

                <AnimatePresence mode="wait">
                    {!resumeAnalysis ? (
                        <motion.section
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass border-2 border-dashed border-white/10 rounded-[40px] p-24 text-center space-y-8 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden"
                            onClick={triggerFileInput}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileUpload}
                                accept=".pdf,.docx"
                            />
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="inline-flex items-center justify-center p-8 rounded-full bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                                {isLoading ? (
                                    <Brain className="w-16 h-16 text-primary animate-pulse" />
                                ) : (
                                    <FileUp className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                                )}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                    {isLoading ? 'AI is analyzing your profile...' : 'Drop your resume here'}
                                </h2>
                                <p className="text-muted-foreground">Supports PDF, DOCX up to 10MB</p>
                            </div>

                            {!isLoading && (
                                <div className="flex flex-col gap-6 items-center">
                                    <div className="flex gap-4 justify-center">
                                        <Button
                                            size="lg"
                                            className="rounded-2xl h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerFileInput();
                                            }}
                                        >
                                            Select File
                                        </Button>
                                        <Button size="lg" variant="outline" className="rounded-2xl h-14 px-10 glass-darker">
                                            Use LinkedIn Profile
                                        </Button>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {error}
                                        </div>
                                    )}
                                </div>
                            )}

                            {isLoading && (
                                <div className="max-w-md mx-auto space-y-4">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Processing...</span>
                                        <span>Analysis in progress</span>
                                    </div>
                                    <Progress value={45} className="h-2" />
                                </div>
                            )}
                        </motion.section>
                    ) : (
                        <motion.section
                            key="results"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Score Card */}
                            <div className="space-y-6">
                                <Card className="glass border-white/10 rounded-[32px] overflow-hidden sticky top-28">
                                    <CardHeader className="text-center pb-0">
                                        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider mt-4">ATS Compatibility Score</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8 text-center space-y-6">
                                        <div className="relative inline-flex items-center justify-center">
                                            <svg className="w-48 h-48 -rotate-90">
                                                <circle
                                                    className="text-white/5"
                                                    strokeWidth="12"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="80"
                                                    cx="96"
                                                    cy="96"
                                                />
                                                <circle
                                                    className="text-primary"
                                                    strokeWidth="12"
                                                    strokeDasharray={2 * Math.PI * 80}
                                                    strokeDashoffset={2 * Math.PI * 80 * (1 - resumeAnalysis.score / 100)}
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="80"
                                                    cx="96"
                                                    cy="96"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-extrabold">{resumeAnalysis.score}</span>
                                                <span className="text-muted-foreground font-medium uppercase text-xs">{resumeAnalysis.status}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-muted-foreground">You are in the strong range for Software Engineering roles.</p>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button className="w-full rounded-xl gap-2 h-12" onClick={() => useAppStore.setState({ resumeAnalysis: null })}>
                                                Analyze New
                                            </Button>
                                            <Button variant="outline" className="w-full rounded-xl gap-2 h-12 glass-darker">
                                                <Share2 className="w-4 h-4" /> Share
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Detailed Analysis */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="glass p-8 rounded-[32px] border border-white/5 space-y-8">
                                    {/* Missing Keywords */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 text-yellow-400" />
                                            Missing Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {resumeAnalysis?.missingKeywords?.map(kw => (
                                                <Badge key={kw} className="bg-white/5 text-muted-foreground border-white/10 px-4 py-2 rounded-full font-medium hover:bg-yellow-400/10 hover:border-yellow-400/30 transition-colors">
                                                    + {kw}
                                                </Badge>
                                            ))}
                                            {(!resumeAnalysis?.missingKeywords || resumeAnalysis.missingKeywords.length === 0) && (
                                                <p className="text-sm text-muted-foreground italic">No major keywords missing!</p>
                                            )}
                                        </div>
                                    </div>

                                    <hr className="border-white/5" />

                                    {/* Key Improvements */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <Lightbulb className="w-5 h-5 text-cyan-400" />
                                            AI Recommendations
                                        </h3>
                                        <div className="space-y-4">
                                            {resumeAnalysis.recommendations.map((rec, i) => (
                                                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 group hover:border-primary/30 transition-colors">
                                                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {i + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{rec.title}</h4>
                                                        <p className="text-sm text-muted-foreground leading-relaxed">{rec.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-white/5" />

                                    {/* Areas for Improvement */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-yellow-400" />
                                            Areas for Improvement
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {resumeAnalysis.improvements.map((imp, i) => (
                                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden group hover:border-yellow-400/30 transition-all">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{imp.title}</h4>
                                                        <Badge className={cn(
                                                            "rounded-full px-2 py-0 text-[10px] uppercase font-bold",
                                                            imp.priority === 'High' ? "bg-red-500/20 text-red-500 border-red-500/20" :
                                                                imp.priority === 'Medium' ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" :
                                                                    "bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
                                                        )}>
                                                            {imp.priority} Priority
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {imp.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-white/5" />

                                    {/* Ideal Structure */}
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                            Ideal Resume Structure
                                        </h3>
                                        <div className="space-y-6">
                                            {resumeAnalysis.idealStructure.map((section, i) => (
                                                <div key={i} className="relative pl-8">
                                                    <div className="absolute left-0 top-0 w-1 h-full bg-white/5 rounded-full overflow-hidden">
                                                        <div className="w-full h-12 bg-primary/40" />
                                                    </div>
                                                    <h4 className="font-bold text-primary mb-3 uppercase tracking-wider text-xs">{section.section}</h4>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                                        {section.points.map((point, j) => (
                                                            <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-white/5" />

                                    {/* Section breakdown */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Foundations</p>
                                            {resumeAnalysis.breakdown.foundations.map((f, i) => (
                                                <div key={i} className="flex justify-between items-center mb-2 last:mb-0">
                                                    <span className="text-sm font-medium">{f.name}</span>
                                                    {f.status === 'completed' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Zap className="w-4 h-4 text-yellow-500 opacity-50" />}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                            <p className="text-xs font-bold text-muted-foreground uppercase mb-3">Content Depth</p>
                                            {resumeAnalysis.breakdown.contentDepth.map((f, i) => (
                                                <div key={i} className="flex justify-between items-center mb-2 last:mb-0">
                                                    <span className="text-sm font-medium">{f.name}</span>
                                                    {f.status === 'completed' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-yellow-500" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
