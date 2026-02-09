"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Book, Video, Code, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { use } from "react";

const allRoadmaps: Record<string, any> = {
    ai: {
        title: "AI/ML Engineering Roadmap",
        totalWeeks: 16,
        modules: [
            {
                id: 1,
                title: "Python Fundamentals",
                week: "Week 1-2",
                status: "completed",
                progress: 100,
                skills: ["Python Basics", "Data Structures", "OOP"],
                resources: [
                    { type: "video", title: "Python Crash Course", duration: "4h" },
                    { type: "article", title: "Python Best Practices", duration: "30min" },
                    { type: "practice", title: "100 Python Exercises", duration: "10h" },
                ],
            },
            {
                id: 2,
                title: "Mathematics for ML",
                week: "Week 3-4",
                status: "in-progress",
                progress: 60,
                skills: ["Linear Algebra", "Calculus", "Statistics"],
                resources: [
                    { type: "video", title: "Linear Algebra Essentials", duration: "6h" },
                    { type: "article", title: "Statistics for ML", duration: "1h" },
                    { type: "practice", title: "Math Problems Set", duration: "8h" },
                ],
            },
            {
                id: 3,
                title: "Machine Learning Basics",
                week: "Week 5-8",
                status: "locked",
                progress: 0,
                skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
                resources: [
                    { type: "video", title: "ML Fundamentals", duration: "12h" },
                    { type: "article", title: "Scikit-learn Guide", duration: "2h" },
                    { type: "practice", title: "ML Projects", duration: "20h" },
                ],
            },
        ],
    },
    web: {
        title: "Full Stack Web Development Roadmap",
        totalWeeks: 12,
        modules: [
            {
                id: 1,
                title: "Frontend Basics (HTML/CSS)",
                week: "Week 1",
                status: "completed",
                progress: 100,
                skills: ["Semantic HTML", "CSS Flexbox/Grid", "Responsive Design"],
                resources: [
                    { type: "video", title: "Modern CSS Course", duration: "3h" },
                    { type: "practice", title: "Build a Portfolio Site", duration: "5h" },
                ],
            },
            {
                id: 2,
                title: "JavaScript Mastery",
                week: "Week 2-4",
                status: "in-progress",
                progress: 40,
                skills: ["ES6+", "Async/Await", "DOM Manipulation"],
                resources: [
                    { type: "video", title: "JS Deep Dive", duration: "8h" },
                    { type: "article", title: "MDN JS Guide", duration: "2h" },
                ],
            },
            {
                id: 3,
                title: "React & Next.js",
                week: "Week 5-8",
                status: "locked",
                progress: 0,
                skills: ["Hooks", "Server Components", "Routing"],
                resources: [
                    { type: "video", title: "Next.js 15 Masterclass", duration: "10h" },
                ],
            },
        ],
    },
};

const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle className="w-5 h-5 text-neon-green" />;
    if (status === "in-progress") return <Circle className="w-5 h-5 text-neon-blue animate-pulse" />;
    return <Circle className="w-5 h-5 text-muted-foreground" />;
};

const getResourceIcon = (type: string) => {
    if (type === "video") return <Video className="w-4 h-4" />;
    if (type === "practice") return <Code className="w-4 h-4" />;
    return <Book className="w-4 h-4" />;
};

export default function RoadmapPage({ params: paramsPromise }: { params: Promise<{ domain: string }> }) {
    const params = use(paramsPromise);
    const domain = params.domain || "ai";
    const roadmapData = allRoadmaps[domain] || allRoadmaps["ai"];

    const [expandedModule, setExpandedModule] = useState<number | null>(1);

    const overallProgress = roadmapData.modules.reduce((acc: number, m: any) => acc + m.progress, 0) / roadmapData.modules.length;

    return (
        <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="text-gradient">{roadmapData.title}</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-4">
                        {roadmapData.totalWeeks} weeks • Personalized learning path
                    </p>

                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Overall Progress</span>
                            <span className="text-2xl font-bold text-neon-blue">{Math.round(overallProgress)}%</span>
                        </div>
                        <Progress value={overallProgress} className="h-3" />
                    </Card>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-4">
                    {roadmapData.modules.map((module: any, index: number) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`hover-lift cursor-pointer ${module.status === 'locked' ? 'opacity-60' : ''}`}>
                                <CardHeader
                                    onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Status Icon */}
                                        <div className="mt-1">
                                            {getStatusIcon(module.status)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <CardTitle className="text-xl">{module.title}</CardTitle>
                                                    <CardDescription>{module.week}</CardDescription>
                                                </div>
                                                <Badge variant={module.status === 'completed' ? 'neon' : 'outline'}>
                                                    {module.progress}%
                                                </Badge>
                                            </div>

                                            {/* Progress Bar */}
                                            <Progress value={module.progress} className="mb-3" />

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2">
                                                {module.skills.map((skill: string, idx: number) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                {/* Expanded Resources */}
                                {expandedModule === module.id && (
                                    <CardContent>
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-3 pt-4 border-t border-white/10"
                                        >
                                            <h4 className="font-semibold mb-3">Learning Resources</h4>
                                            {module.resources.map((resource: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {getResourceIcon(resource.type)}
                                                        <div>
                                                            <p className="font-medium">{resource.title}</p>
                                                            <p className="text-sm text-muted-foreground">{resource.duration}</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </CardContent>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
