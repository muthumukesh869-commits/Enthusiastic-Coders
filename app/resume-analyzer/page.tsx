"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, FileText, CheckCircle, AlertCircle,
    X, ShieldCheck, Search, Layout, Type,
    AlertTriangle, Loader2, Briefcase, Building2, Target
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const KEYWORDS_DB: Record<string, string[]> = {
    technical: ["React", "Node.js", "Python", "SQL", "Docker", "AWS", "TypeScript", "Next.js", "Git", "C++"],
    soft: ["Communication", "Leadership", "Teamwork", "Problem Solving", "Adaptability"],
};

export default function ResumeAnalyzerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File) => {
        // 1. Check extension
        const validExtensions = ["pdf", "doc", "docx"];
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (!extension || !validExtensions.includes(extension)) {
            return "Invalid file type. Please upload a PDF or Word document.";
        }

        // 2. Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return "File is too large. Maximum size is 5MB.";
        }

        // 3. Simple Resume Identity Check (simulate finding keywords in filename)
        const nameKeywords = ["resume", "cv", "portfolio", "profile", "bio"];
        const isLikelyResume = nameKeywords.some(keyword => file.name.toLowerCase().includes(keyword));

        if (!isLikelyResume) {
            return "This file doesn't look like a Resume. Please ensure the filename contains 'Resume' or 'CV'.";
        }

        return null;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const validationError = validateFile(selectedFile);

            if (validationError) {
                setError(validationError);
                return;
            }

            setFile(selectedFile);
            startAnalysis();
        }
    };

    const startAnalysis = () => {
        setAnalyzing(true);
        setResults(null);

        // Simulating detailed step-by-step analysis
        setTimeout(() => {
            setResults({
                atsScore: 84,
                formattingScore: 92,
                clarityScore: 78,
                keywordScore: 82,
                summary: "Your resume is strong and follows most industry standards. Focus on adding more quantitative achievements to boost your clarity score.",
                foundKeywords: ["React", "TypeScript", "Node.js", "SQL", "Git", "Problem Solving"],
                missingKeywords: ["Docker", "AWS", "CI/CD", "Unit Testing"],
                formatingIssues: [
                    { type: "success", text: "Standard font sizes used" },
                    { type: "success", text: "Professional header formatting" },
                    { type: "warning", text: "Consistency in bullet point margins can be improved" }
                ],
                clarityIssues: [
                    { type: "warning", text: "Include more results-driven data (e.g., 'Improved performance by 20%')" },
                    { type: "success", text: "No jargon or confusing acronyms" }
                ],
                recommendedRoles: ["Senior Frontend Engineer", "Full Stack Developer (React/Node)", "UI/UX Engineer"],
                recommendedCompanies: [
                    { name: "Google", logo: "🔍", match: "94%" },
                    { name: "Razorpay", logo: "💳", match: "96%" },
                    { name: "Microsoft", logo: "🪟", match: "89%" }
                ]
            });
            setAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        AI Resume <span className="text-gradient">Auditor</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Automated review for formatting, clarity, and ATS alignment. Get your resume ready for top tech companies.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!results && !analyzing && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card className="border-dashed border-2 bg-black/40 border-white/10 hover:border-neon-blue/50 transition-colors">
                                <CardContent className="flex flex-col items-center justify-center py-20">
                                    <div className="w-20 h-20 rounded-full bg-neon-blue/10 flex items-center justify-center mb-6 group cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="w-10 h-10 text-neon-blue animate-bounce" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Upload your Resume</h3>
                                    <p className="text-muted-foreground mb-8">PDF, DOC, or DOCX up to 5MB</p>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                    />

                                    <Button variant="neon" size="lg" onClick={() => fileInputRef.current?.click()}>
                                        Select File
                                    </Button>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-6 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20"
                                        >
                                            <AlertTriangle className="w-4 h-4" />
                                            <span className="text-sm">{error}</span>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {analyzing && (
                        <motion.div
                            key="analyzing"
                            className="flex flex-col items-center justify-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Loader2 className="w-16 h-16 text-neon-blue animate-spin mb-6" />
                            <h2 className="text-2xl font-bold mb-2 text-gradient">Auditing Resume Details...</h2>
                            <div className="w-full max-w-md space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span>Scanning ATS Keywords</span>
                                    <span className="text-neon-blue">Processing...</span>
                                </div>
                                <Progress value={65} className="h-2" />
                                <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground uppercase text-center">
                                    <div className="border border-white/10 rounded-md p-1">Formatting</div>
                                    <div className="border border-white/10 rounded-md p-1">Clarity</div>
                                    <div className="border border-white/10 rounded-md p-1">Alignment</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {results && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Left Column: Overall Score */}
                            <div className="lg:col-span-1 space-y-8">
                                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                                    <CardHeader className="text-center">
                                        <CardTitle>ATS Quality Score</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center">
                                        <div className="relative w-40 h-40 mb-6 font-bold">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent"
                                                    strokeDasharray={440}
                                                    strokeDashoffset={440 - (440 * results.atsScore) / 100}
                                                    className="text-neon-blue transition-all duration-1000" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-4xl">
                                                {results.atsScore}<span className="text-xl text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                        <Badge variant="neon" className="mb-4">PROFESSIONAL GRADE</Badge>
                                        <p className="text-sm text-center text-muted-foreground italic">
                                            "{results.summary}"
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-black/40 border-white/10">
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="flex items-center gap-2"><Layout className="w-4 h-4" /> Formatting</span>
                                                <span className="text-neon-blue font-bold">{results.formattingScore}%</span>
                                            </div>
                                            <Progress value={results.formattingScore} className="h-1" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="flex items-center gap-2"><Type className="w-4 h-4" /> Clarity</span>
                                                <span className="text-neon-purple font-bold">{results.clarityScore}%</span>
                                            </div>
                                            <Progress value={results.clarityScore} className="h-1 bg-white/5" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="flex items-center gap-2"><Target className="w-4 h-4" /> Keywords</span>
                                                <span className="text-neon-green font-bold">{results.keywordScore}%</span>
                                            </div>
                                            <Progress value={results.keywordScore} className="h-1" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => { setResults(null); setFile(null); }}
                                >
                                    Re-upload Resume
                                </Button>
                            </div>

                            {/* Right Column: Detailed Breakdown */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Keyword Alignment */}
                                <Card className="bg-black/40 border-white/10">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-neon-blue">
                                            <ShieldCheck className="w-5 h-5" />
                                            <CardTitle className="text-xl">ATS Keyword Alignment</CardTitle>
                                        </div>
                                        <CardDescription>Matched skills and relevant industry keywords.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-semibold text-neon-green uppercase tracking-wider mb-3">Identified Matching Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {results.foundKeywords.map((tag: string) => (
                                                    <Badge key={tag} className="bg-neon-green/10 text-neon-green border-neon-green/20">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">Critical Missing Keywords</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {results.missingKeywords.map((tag: string) => (
                                                    <Badge key={tag} className="bg-red-400/10 text-red-400 border-red-400/20">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Formatting & Clarity Review */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="bg-black/40 border-white/10">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Layout className="w-4 h-4 text-neon-blue" />
                                                Formatting
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {results.formatingIssues.map((issue: any, i: number) => (
                                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                                    {issue.type === 'success' ? <CheckCircle className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />}
                                                    <span className="text-xs">{issue.text}</span>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-black/40 border-white/10">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Type className="w-4 h-4 text-neon-purple" />
                                                Clarity & Content
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {results.clarityIssues.map((issue: any, i: number) => (
                                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                                    {issue.type === 'success' ? <CheckCircle className="w-4 h-4 text-neon-green mt-1 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />}
                                                    <span className="text-xs">{issue.text}</span>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Recommendations Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="bg-gradient-to-br from-neon-blue/10 to-transparent border-white/10">
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-neon-blue" />
                                                Suggested Roles
                                            </CardTitle>
                                            <CardDescription>Based on your skill profile.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {results.recommendedRoles.map((role: string, i: number) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="text-sm font-medium">{role}</span>
                                                    <Badge variant="outline" className="text-[10px] text-neon-blue border-neon-blue/30">90%+ Match</Badge>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-gradient-to-br from-neon-purple/10 to-transparent border-white/10">
                                        <CardHeader>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-neon-purple" />
                                                Target Companies
                                            </CardTitle>
                                            <CardDescription>Top firms hiring for your profile.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {results.recommendedCompanies.map((comp: any, i: number) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{comp.logo}</span>
                                                        <span className="text-sm font-medium">{comp.name}</span>
                                                    </div>
                                                    <Badge variant="neon" className="text-[10px]">{comp.match}</Badge>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


