"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Brain, Trophy, BookOpen, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
    { id: 'basics', title: 'The Basics', summary: 'Let\'s start with your name.' },
    { id: 'interests', title: 'Interests', summary: 'What fuels your passion?' },
    { id: 'tech-skills', title: 'Tech Stack', summary: 'Your technical arsenal.' },
    { id: 'soft-skills', title: 'Soft Skills', summary: 'Your people powers.' },
    { id: 'academic', title: 'Academic', summary: 'Your educational baseline.' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { userProfile, setUserProfile, setIsOnboarded } = useAppStore();
    const [currentStep, setCurrentStep] = useState(0);
    const [name, setName] = useState(userProfile.name);

    const progress = ((currentStep + 1) / steps.length) * 100;

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsOnboarded(true);
            router.push('/dashboard');
        }
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const currentStepData = steps[currentStep];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 pt-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-2xl z-10">
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        <span>Step {currentStep + 1} of {steps.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-white/5" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="glass p-10 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />

                        <header className="mb-8">
                            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                {currentStep === 0 && <Brain className="w-8 h-8 text-cyan-400" />}
                                {currentStep === 1 && <Sparkles className="w-8 h-8 text-purple-400" />}
                                {currentStep === 2 && <Zap className="w-8 h-8 text-yellow-400" />}
                                {currentStep === 3 && <Trophy className="w-8 h-8 text-pink-400" />}
                                {currentStep === 4 && <BookOpen className="w-8 h-8 text-emerald-400" />}
                                {currentStepData.title}
                            </h1>
                            <p className="text-muted-foreground">{currentStepData.summary}</p>
                        </header>

                        <div className="space-y-8">
                            {currentStep === 0 && (
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setName(val);
                                            setUserProfile({ name: val });
                                        }}
                                        placeholder="Enter your name"
                                        className="h-14 bg-white/5 border-white/10 text-xl focus:border-primary transition-all"
                                    />
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {['Web Dev', 'AI/ML', 'Mobile Apps', 'Cybersecurity', 'Cloud', 'Blockchain', 'Data Science', 'Design'].map((interest) => (
                                        <button
                                            key={interest}
                                            onClick={() => {
                                                const newInterests = userProfile.interests.includes(interest)
                                                    ? userProfile.interests.filter(i => i !== interest)
                                                    : [...userProfile.interests, interest];
                                                setUserProfile({ interests: newInterests });
                                            }}
                                            className={`p-4 rounded-2xl border text-left transition-all ${userProfile.interests.includes(interest)
                                                ? 'bg-primary/20 border-primary text-primary-foreground'
                                                : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{interest}</span>
                                                {userProfile.interests.includes(interest) && <CheckCircle2 className="w-4 h-4" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    {['React', 'Node.js', 'Python', 'System Design'].map((skill) => (
                                        <div key={skill} className="space-y-3">
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span>{skill}</span>
                                                <span className="text-primary">Lvl {userProfile.technicalSkills.find(s => s.name === skill)?.level || 0}</span>
                                            </div>
                                            <Slider
                                                defaultValue={[0]}
                                                max={10}
                                                step={1}
                                                onValueChange={(val) => {
                                                    const otherSkills = userProfile.technicalSkills.filter(s => s.name !== skill);
                                                    setUserProfile({ technicalSkills: [...otherSkills, { name: skill, level: val[0] }] });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {['Communication', 'Leadership', 'Problem Solving', 'Teamwork'].map((skill) => (
                                        <button
                                            key={skill}
                                            onClick={() => {
                                                const hasSkill = userProfile.softSkills.find(s => s.name === skill);
                                                const newSkills = hasSkill
                                                    ? userProfile.softSkills.filter(s => s.name !== skill)
                                                    : [...userProfile.softSkills, { name: skill, level: 5 }];
                                                setUserProfile({ softSkills: newSkills });
                                            }}
                                            className={`p-4 rounded-2xl border text-left transition-all ${userProfile.softSkills.find(s => s.name === skill)
                                                ? 'bg-accent/20 border-accent text-accent-foreground'
                                                : 'bg-white/5 border-white/10 text-muted-foreground hover:border-white/20'
                                                }`}
                                        >
                                            <span className="font-medium">{skill}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-muted-foreground">Highest Degree</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['B.Tech / B.E', 'M.Tech / M.E', 'BCA / MCA', 'B.Sc / M.Sc'].map((deg) => (
                                            <button
                                                key={deg}
                                                onClick={() => setUserProfile({ academicBackground: deg })}
                                                className={`p-5 rounded-2xl border text-left transition-all flex justify-between items-center ${userProfile.academicBackground === deg
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                                    : 'bg-white/5 border-white/10 text-muted-foreground'
                                                    }`}
                                            >
                                                <span className="font-medium text-lg">{deg}</span>
                                                {userProfile.academicBackground === deg && <CheckCircle2 className="w-5 h-5" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <footer className="mt-12 flex justify-between items-center">
                            <ShadcnButton
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="gap-2 text-muted-foreground"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </ShadcnButton>
                            <ShadcnButton
                                onClick={nextStep}
                                className="h-12 px-8 rounded-xl font-bold gap-2 animate-pulse-slow shadow-lg shadow-primary/20"
                            >
                                {currentStep === steps.length - 1 ? 'Finish Profile' : 'Continue'}
                                <ChevronRight className="w-4 h-4" />
                            </ShadcnButton>
                        </footer>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
