"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    BookOpen,
    Timer,
    ChevronRight,
    CheckCircle2,
    XCircle,
    ArrowLeft,
    Trophy,
    RefreshCcw,
    Award
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockTests, MockTest, Question } from '@/lib/mock-tests-data';
import { cn } from '@/lib/utils';

export default function MockTestsPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Timer Logic
    useEffect(() => {
        if (!selectedTest || showResults) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [selectedTest, showResults]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!mounted) return null;

    const handleStartTest = (test: MockTest) => {
        setSelectedTest(test);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowResults(false);
        setScore(0);
        setTimeLeft(test.duration * 60);
    };

    const handleFinishTest = () => {
        calculateScore();
        setShowResults(true);
    };

    const handleAnswerSelect = (optionIndex: number) => {
        if (!selectedTest) return;
        const currentQuestion = selectedTest.questions[currentQuestionIndex];
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
    };

    const handleNext = () => {
        if (!selectedTest) return;
        if (currentQuestionIndex < selectedTest.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleFinishTest();
        }
    };

    const calculateScore = () => {
        if (!selectedTest) return;
        let correctCount = 0;
        selectedTest.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        setScore(Math.round((correctCount / selectedTest.questions.length) * 100));
    };

    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            <Sidebar />

            <main className="flex-1 pl-64 p-10 pt-28">
                <AnimatePresence mode="wait">
                    {!selectedTest ? (
                        <motion.section
                            key="test-list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8 max-w-6xl mx-auto"
                        >
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl font-black flex items-center gap-3">
                                    <GraduationCap className="w-10 h-10 text-primary" />
                                    Skill Assessments
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Validate your knowledge with industry-standard mock tests across multiple domains.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockTests.map((test) => (
                                    <motion.div
                                        key={test.id}
                                        whileHover={{ y: -5 }}
                                        className="p-8 rounded-[32px] glass-darker border border-white/5 flex flex-col gap-6 relative overflow-hidden group"
                                    >
                                        <div className="flex justify-between items-start relative z-10">
                                            <div className="space-y-2">
                                                <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary">
                                                    {test.topic}
                                                </Badge>
                                                <h3 className="text-2xl font-bold">{test.title}</h3>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                                                    <Timer className="w-4 h-4" />
                                                    {test.duration} mins
                                                </div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mt-1">
                                                    {test.difficulty}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed relative z-10">
                                            {test.description}
                                        </p>

                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto relative z-10">
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <BookOpen className="w-4 h-4" />
                                                {test.questions.length} Questions
                                            </div>
                                            <Button
                                                onClick={() => handleStartTest(test)}
                                                className="rounded-xl px-6 bg-white text-black hover:bg-white/90 font-bold gap-2"
                                            >
                                                Start Assessment
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Background Decor */}
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ) : showResults ? (
                        <motion.section
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl mx-auto text-center space-y-10 py-12"
                        >
                            <div className="space-y-4">
                                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                                    <Trophy className="w-12 h-12 text-primary" />
                                </div>
                                <h1 className="text-4xl font-black">Assessment Complete!</h1>
                                <p className="text-muted-foreground text-lg">
                                    Great job on finishing the <span className="text-white font-bold">{selectedTest.title}</span> test.
                                </p>
                            </div>

                            <div className="p-10 rounded-[48px] glass-darker border border-white/10 relative overflow-hidden">
                                <div className="relative z-10 space-y-6">
                                    <div className="text-6xl font-black text-primary">{score}%</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                            <span>Accuracy Score</span>
                                            <span>{score}/100</span>
                                        </div>
                                        <Progress value={score} className="h-3 bg-white/5" />
                                    </div>
                                    <div className="flex justify-center gap-8 pt-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold">{Object.keys(answers).length}</p>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Attempted</p>
                                        </div>
                                        <div className="w-[1px] h-10 bg-white/10" />
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-emerald-400">
                                                {selectedTest.questions.filter(q => answers[q.id] === q.correctAnswer).length}
                                            </p>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground">Correct</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-400" />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={() => handleStartTest(selectedTest)}
                                    variant="outline"
                                    className="rounded-2xl px-8 h-14 font-bold border-white/10 hover:bg-white/5 gap-2"
                                >
                                    <RefreshCcw className="w-5 h-5" />
                                    Retake Test
                                </Button>
                                <Button
                                    onClick={() => setSelectedTest(null)}
                                    className="rounded-2xl px-8 h-14 bg-white text-black hover:bg-white/90 font-bold gap-2"
                                >
                                    Browse Other Tests
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="test-taking"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedTest(null)}
                                    className="text-muted-foreground hover:text-white gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quit Assessment
                                </Button>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Time Remaining</p>
                                        <p className={cn(
                                            "font-mono font-bold text-lg",
                                            timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-primary"
                                        )}>
                                            {formatTime(timeLeft)}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Timer className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                            </div>

                            <Progress
                                value={((currentQuestionIndex + 1) / selectedTest.questions.length) * 100}
                                className="h-1 bg-white/5"
                            />

                            <div className="space-y-10 pt-10">
                                <div className="space-y-4">
                                    <Badge className="rounded-lg bg-primary/20 text-primary border-primary/20">
                                        {selectedTest.topic}
                                    </Badge>
                                    <h2 className="text-3xl font-bold leading-tight">
                                        {selectedTest.questions[currentQuestionIndex].question}
                                    </h2>
                                </div>

                                <div className="grid gap-4">
                                    {selectedTest.questions[currentQuestionIndex].options.map((option, idx) => {
                                        const isSelected = answers[selectedTest.questions[currentQuestionIndex].id] === idx;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswerSelect(idx)}
                                                className={cn(
                                                    "w-full p-6 rounded-[24px] text-left transition-all duration-300 border flex items-center justify-between group",
                                                    isSelected
                                                        ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10"
                                                        : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                                )}
                                            >
                                                <span className="text-lg font-medium">{option}</span>
                                                <div className={cn(
                                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                    isSelected ? "border-primary bg-primary" : "border-white/20 group-hover:border-white/40"
                                                )}>
                                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-black" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="pt-10 flex justify-end">
                                    <Button
                                        onClick={handleNext}
                                        disabled={answers[selectedTest.questions[currentQuestionIndex].id] === undefined}
                                        className="rounded-2xl px-10 h-16 bg-white text-black hover:bg-white/90 text-lg font-bold gap-2"
                                    >
                                        {currentQuestionIndex === selectedTest.questions.length - 1 ? "Finish Test" : "Next Question"}
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </Button>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
