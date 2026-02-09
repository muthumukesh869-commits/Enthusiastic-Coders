"use client";

import { use, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    RotateCcw,
    Trophy,
    ArrowLeft,
    Zap,
    BookOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Simplified Mock Data for Questions
const QUESTION_BANK: Record<string, any[]> = {
    python: [
        { id: 1, q: "What is the output of print(type([]) is list)?", a: ["True", "False", "Error", "None"], correct: 0 },
        { id: 2, q: "Which of the following is used to handle exceptions in Python?", a: ["try-except", "catch", "do-while", "handle"], correct: 0 },
        { id: 3, q: "How do you start a comment in Python?", a: ["//", "/*", "#", "--"], correct: 2 },
        { id: 4, q: "What is the purpose of 'self' in Python classes?", a: ["To make it private", "Reference the instance", "Define a static method", "Inherit from parent"], correct: 1 },
        { id: 5, q: "What does pip stand for?", a: ["Pip Installs Python", "Pip Installs Packages", "Python Index Package", "None of these"], correct: 1 }
    ],
    frontend: [
        { id: 1, q: "What does CSS stand for?", a: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], correct: 1 },
        { id: 2, q: "Which Hook is used to handle side effects in React?", a: ["useState", "useContext", "useEffect", "useMemo"], correct: 2 },
        { id: 3, q: "Which HTML tag is used to define an internal style sheet?", a: ["<css>", "<script>", "<style>", "<link>"], correct: 2 },
        { id: 4, q: "What is the correct way to write a JS array?", a: ["var c = (1,2,3)", "var c = [1,2,3]", "var c = {1,2,3}", "var c = '1,2,3'"], correct: 1 },
        { id: 5, q: "Which property is used to change the background color?", a: ["color", "bgcolor", "background-color", "canvas-color"], correct: 2 }
    ]
};

// Generic fallback for other test IDs (100+ tests representation)
const getQuestions = (id: string) => {
    return QUESTION_BANK[id] || [
        { id: 1, q: `General ${id} Question 1: What is the primary use case?`, a: ["Scaling", "DevOps", "Production", "Analysis"], correct: 0 },
        { id: 2, q: "What is the time complexity of a Binary Search?", a: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correct: 1 },
        { id: 3, q: "Which protocol is stateless?", a: ["TCP", "UDP", "HTTP", "FTP"], correct: 2 },
        { id: 4, q: "What is a deadlock?", a: ["System freeze", "Circular wait", "Starvation", "Infinite loop"], correct: 1 },
        { id: 5, q: "What does ACID stand for?", a: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Input, Data", "Auto, Command, Index, Disk", "None"], correct: 0 }
    ];
};

export default function MockTestPage({ params: paramsPromise }: { params: Promise<{ testId: string }> }) {
    const params = use(paramsPromise);
    const testId = params.testId;
    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isFinished, setIsFinished] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const questions = getQuestions(testId);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0 || isFinished) {
            if (!isFinished) handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isFinished]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswer = (optionIndex: number) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleSubmit = () => {
        setIsFinished(true);
        setShowResults(true);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correct) score++;
        });
        return {
            points: score,
            total: questions.length,
            percentage: (score / questions.length) * 100
        };
    };

    const scoreData = calculateScore();

    if (showResults) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="max-w-md w-full glass-card border-neon-blue/50 overflow-hidden">
                        <div className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 p-8 text-center border-b border-white/10">
                            <Trophy className="w-16 h-16 text-neon-blue mx-auto mb-4" />
                            <h2 className="text-3xl font-bold">Assessment Complete!</h2>
                            <p className="text-muted-foreground mt-2 uppercase tracking-widest text-xs font-bold">Result For {testId.toUpperCase()}</p>
                        </div>
                        <CardContent className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-center flex-1 border-r border-white/10">
                                    <span className="block text-4xl font-bold">{scoreData.percentage}%</span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-tighter">Score</span>
                                </div>
                                <div className="text-center flex-1 border-r border-white/10">
                                    <span className="block text-4xl font-bold">{scoreData.points}/{scoreData.total}</span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-tighter">Correct</span>
                                </div>
                                <div className="text-center flex-1">
                                    <span className="block text-4xl font-bold">{formatTime(300 - timeLeft)}</span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-tighter">Time Taken</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button variant="neon" className="w-full" onClick={() => router.push('/mock-tests')}>
                                    Take Another Test
                                </Button>
                                <Button variant="outline" className="w-full" onClick={() => {
                                    setIsFinished(false);
                                    setShowResults(false);
                                    setCurrentQuestion(0);
                                    setAnswers({});
                                    setTimeLeft(300);
                                }}>
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Retry Mock
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10 max-w-4xl mx-auto">
            {/* Header / Stats */}
            <div className="flex justify-between items-center mb-8">
                <Button variant="ghost" onClick={() => router.back()} className="hover:text-neon-blue">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Exit Test
                </Button>

                <div className={`flex items-center gap-4 px-6 py-2 rounded-full border transition-colors ${timeLeft < 60 ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/10 bg-black/40'}`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Side Progress */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-2">
                                {questions.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-10 w-full rounded-md flex items-center justify-center text-xs font-bold border transition-all ${currentQuestion === idx ? 'border-neon-blue bg-neon-blue/20 text-neon-blue' :
                                                answers[idx] !== undefined ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-muted-foreground'
                                            }`}
                                    >
                                        {idx + 1}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex justify-between text-xs mb-2 text-muted-foreground">
                                    <span>{questions.length - Object.keys(answers).length} Remaining</span>
                                    <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
                                </div>
                                <Progress value={(Object.keys(answers).length / questions.length) * 100} className="h-1" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-neon-blue/10 to-transparent border-white/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-2 text-neon-blue">
                                <Zap className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Instructions</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                                Do not refresh the page. Each question has one correct answer. Points are awarded based on accuracy.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Question Area */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="glass-card min-h-[400px] flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-neon-purple mb-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span className="text-xs font-bold tracking-widest uppercase">Question {currentQuestion + 1} of {questions.length}</span>
                                    </div>
                                    <CardTitle className="text-2xl font-medium leading-relaxed">
                                        {questions[currentQuestion].q}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4 pt-4">
                                    {questions[currentQuestion].a.map((option: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className={`w-full p-5 rounded-xl border text-left transition-all duration-300 ${answers[currentQuestion] === idx
                                                    ? 'bg-neon-blue/20 border-neon-blue shadow-lg shadow-neon-blue/10'
                                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border font-bold ${answers[currentQuestion] === idx ? 'bg-neon-blue text-black border-neon-blue' : 'bg-white/5 border-white/10'
                                                    }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="text-lg">{option}</span>
                                            </div>
                                        </button>
                                    ))}
                                </CardContent>
                                <div className="p-8 pt-0 flex justify-between">
                                    <Button
                                        variant="ghost"
                                        disabled={currentQuestion === 0}
                                        onClick={() => setCurrentQuestion(prev => prev - 1)}
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                    </Button>

                                    {currentQuestion === questions.length - 1 ? (
                                        <Button
                                            variant="neon"
                                            disabled={Object.keys(answers).length < questions.length}
                                            onClick={handleSubmit}
                                            className="px-10"
                                        >
                                            Submit Assessment
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="glass"
                                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                                        >
                                            Next <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
