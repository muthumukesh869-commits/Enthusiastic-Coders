"use client";

import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ResumeAnalyzerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            analyzeResume();
        }
    };

    const analyzeResume = () => {
        setAnalyzing(true);
        // Simulate analysis
        setTimeout(() => {
            setResults({
                atsScore: 78,
                strengths: [
                    "Clear technical skills section",
                    "Quantified achievements",
                    "Relevant project experience",
                ],
                improvements: [
                    "Add more action verbs",
                    "Include keywords: 'agile', 'CI/CD'",
                    "Expand on leadership experience",
                ],
                missingKeywords: ["Docker", "Kubernetes", "AWS", "Microservices"],
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Resume <span className="text-gradient">Analyzer</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Get instant ATS score and actionable improvements
                    </p>
                </motion.div>

                {/* Upload Section */}
                {!results && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8">
                            <div className="flex flex-col items-center justify-center min-h-[400px]">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-6">
                                    <Upload className="w-12 h-12" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
                                <p className="text-muted-foreground mb-8 text-center max-w-md">
                                    Drag and drop your resume or click to browse. Supports PDF, DOC, DOCX
                                </p>

                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <Button variant="neon" size="lg">
                                        <FileText className="w-5 h-5 mr-2" />
                                        Choose File
                                    </Button>
                                </label>

                                {analyzing && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-8 w-full max-w-md"
                                    >
                                        <p className="text-center mb-4">Analyzing your resume...</p>
                                        <Progress value={65} className="h-2" />
                                    </motion.div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Results Section */}
                {results && !analyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* ATS Score */}
                        <Card>
                            <CardHeader>
                                <CardTitle>ATS Score</CardTitle>
                                <CardDescription>How well your resume passes Applicant Tracking Systems</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-8">
                                    <div className="relative w-32 h-32">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="56"
                                                stroke="rgba(255,255,255,0.1)"
                                                strokeWidth="12"
                                                fill="none"
                                            />
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="56"
                                                stroke="url(#gradient)"
                                                strokeWidth="12"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 56}`}
                                                strokeDashoffset={`${2 * Math.PI * 56 * (1 - results.atsScore / 100)}`}
                                                strokeLinecap="round"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#00d4ff" />
                                                    <stop offset="100%" stopColor="#a855f7" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl font-bold">{results.atsScore}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Good Score!</h3>
                                        <p className="text-muted-foreground">
                                            Your resume has a {results.atsScore}% chance of passing ATS filters.
                                            A few improvements can boost this to 90%+
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Strengths */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-neon-green" />
                                    Strengths
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {results.strengths.map((strength: string, index: number) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Improvements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-neon-blue" />
                                    Suggested Improvements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {results.improvements.map((improvement: string, index: number) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <AlertCircle className="w-5 h-5 text-neon-blue mt-0.5 flex-shrink-0" />
                                            <span>{improvement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Missing Keywords */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Missing Keywords</CardTitle>
                                <CardDescription>Add these to improve your ATS score</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {results.missingKeywords.map((keyword: string, index: number) => (
                                        <Badge key={index} variant="outline">
                                            {keyword}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            variant="ghost"
                            onClick={() => {
                                setResults(null);
                                setFile(null);
                            }}
                            className="w-full"
                        >
                            Analyze Another Resume
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
