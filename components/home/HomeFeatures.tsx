"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, BarChart3, Terminal } from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Recommendations",
        description: "Get personalized career domain suggestions based on your interests, skills, and academic background.",
        href: "/onboarding",
    },
    {
        icon: ArrowRight,
        title: "Smart Roadmaps",
        description: "Follow adaptive learning paths that evolve with your progress and changing goals.",
        href: "/roadmap",
    },
    {
        icon: Sparkles,
        title: "Resume Analysis",
        description: "Optimize your resume with AI-powered ATS scoring and keyword recommendations.",
        href: "/resume-analyzer",
    },
    {
        icon: Sparkles,
        title: "Study Plan Generator",
        description: "Generate a personalized week-by-week study schedule matched to your strengths and weaknesses.",
        href: "/study-plan",
    },
    {
        icon: BarChart3,
        title: "Industry Benchmarking",
        description: "Evaluate your level against industry expectations and competitor data in real-time.",
        href: "/benchmarking",
    },
    {
        icon: Terminal,
        title: "Placement Mock Lab",
        description: "Simulate real-world exams with 100+ tests including Python, Java, and Fullstack.",
        href: "/mock-tests",
    },
];


export default function HomeFeatures() {
    return (
        <section className="relative z-10 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                >
                    Why <span className="text-gradient">CareerPath AI</span>?
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Link key={index} href={feature.href || "#"}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-8 hover-lift group h-full"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
