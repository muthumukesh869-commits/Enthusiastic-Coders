"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomeHero() {
    return (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-5xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
                >
                    <Sparkles className="w-4 h-4 text-neon-blue" />
                    <span className="text-sm font-medium">AI-Powered Career Guidance</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight"
                >
                    From <span className="text-gradient">Confusion</span>
                    <br />
                    to <span className="text-gradient">Career Clarity</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
                >
                    Your personalized AI companion for campus placements. Discover your perfect career path,
                    build skills strategically, and ace your interviews with confidence.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/onboarding">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-neon-blue/50 transition-all duration-300 hover:scale-105">
                            <span className="flex items-center gap-2">
                                Discover Your Career Path
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </Link>

                    <Link href="/dashboard">
                        <button className="px-8 py-4 glass-card rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover-lift">
                            View Demo Dashboard
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                >
                    <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </div>
    );
}
