"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const steps = [
    { id: 1, title: "Interests", description: "What excites you?" },
    { id: 2, title: "Technical Skills", description: "Your tech expertise" },
    { id: 3, title: "Soft Skills", description: "Your strengths" },
    { id: 4, title: "Background", description: "Academic info" },
];

const interests = [
    "Artificial Intelligence", "Web Development", "Mobile Apps", "Data Science",
    "Cybersecurity", "Cloud Computing", "DevOps", "Blockchain",
    "Game Development", "IoT", "AR/VR", "Machine Learning"
];

const technicalSkills = [
    "Python", "JavaScript", "Java", "C++", "React", "Node.js",
    "SQL", "MongoDB", "AWS", "Docker", "Git", "TensorFlow"
];

const softSkills = [
    "Communication", "Leadership", "Problem Solving", "Teamwork",
    "Time Management", "Creativity", "Adaptability", "Critical Thinking"
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});
    const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
    const [background, setBackground] = useState({
        degree: "",
        year: "",
        cgpa: "",
    });

    const progress = (currentStep / steps.length) * 100;

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            // Save data and navigate to dashboard
            router.push("/dashboard");
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const toggleSoftSkill = (skill: string) => {
        setSelectedSoftSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-background to-neon-purple/10" />

            <div className="relative z-10 w-full max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-center">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: currentStep === step.id ? 1.2 : 1,
                                        backgroundColor: currentStep >= step.id ? "#00d4ff" : "rgba(255,255,255,0.1)",
                                    }}
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                                >
                                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                                </motion.div>
                                {step.id < steps.length && (
                                    <div className="w-16 md:w-32 h-1 mx-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={false}
                                            animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                                            className="h-full bg-neon-blue"
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Step Content */}
                <Card className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-2">{steps[currentStep - 1].title}</h2>
                            <p className="text-muted-foreground mb-8">{steps[currentStep - 1].description}</p>

                            {/* Step 1: Interests */}
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">Select all that interest you (min 3)</p>
                                    <div className="flex flex-wrap gap-3">
                                        {interests.map((interest) => (
                                            <Badge
                                                key={interest}
                                                variant={selectedInterests.includes(interest) ? "neon" : "outline"}
                                                className="cursor-pointer hover:scale-105 transition-transform px-4 py-2"
                                                onClick={() => toggleInterest(interest)}
                                            >
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Technical Skills */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <p className="text-sm text-muted-foreground">Rate your proficiency (1-5)</p>
                                    {technicalSkills.map((skill) => (
                                        <div key={skill} className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>{skill}</span>
                                                <span className="text-neon-blue font-bold">{skillLevels[skill] || 0}/5</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="5"
                                                value={skillLevels[skill] || 0}
                                                onChange={(e) => setSkillLevels({ ...skillLevels, [skill]: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Step 3: Soft Skills */}
                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">Select your top soft skills (min 3)</p>
                                    <div className="flex flex-wrap gap-3">
                                        {softSkills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant={selectedSoftSkills.includes(skill) ? "neon" : "outline"}
                                                className="cursor-pointer hover:scale-105 transition-transform px-4 py-2"
                                                onClick={() => toggleSoftSkill(skill)}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Background */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Degree</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., B.Tech in Computer Science"
                                            value={background.degree}
                                            onChange={(e) => setBackground({ ...background, degree: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Year of Study</label>
                                        <select
                                            value={background.year}
                                            onChange={(e) => setBackground({ ...background, year: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                                        >
                                            <option value="">Select year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">CGPA</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g., 8.5"
                                            value={background.cgpa}
                                            onChange={(e) => setBackground({ ...background, cgpa: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue"
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="glass"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <Button variant="neon" onClick={handleNext}>
                            {currentStep === steps.length ? "Complete" : "Next"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
            </div>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(to right, #00d4ff, #a855f7);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}
