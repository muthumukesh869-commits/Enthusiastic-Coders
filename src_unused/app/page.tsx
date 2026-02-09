"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Zap, TrendingUp } from 'lucide-react';
import HeroScene from '@/components/3d/HeroScene';
import { Button } from '@/components/ui/button';
import LoginButton from '@/components/auth/LoginButton';
import Link from 'next/link';

const careerDomains = [
  {
    title: "Software Engineering",
    description: "Build the future with code and scalable architecture.",
    icon: Zap,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Data Science & AI",
    description: "Unlock insights from data and build intelligent systems.",
    icon: Sparkles,
    color: "from-purple-500 to-pink-400",
  },
  {
    title: "Product Management",
    description: "Bridge the gap between business, design, and tech.",
    icon: Target,
    color: "from-orange-500 to-red-400",
  },
  {
    title: "UI / UX Design",
    description: "Create beautiful, user-centric digital experiences.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-400",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroScene />

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-100">AI-Powered Career Guidance</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
            From <span className="text-muted-foreground italic">Confusion</span> to
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Career Clarity
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Navigate your placement journey with AI-driven personalized roadmaps, skill benchmarking, and industry insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold bg-primary hover:bg-primary/90 glow-blue group">
                Discover Your Career Path
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold glass-darker">
              View Demo Dashboard
            </Button>
          </div>

          <LoginButton />
        </motion.div>
      </section>

      {/* Domain Cards Section */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {careerDomains.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl glass-darker border border-white/5 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${domain.color} blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                <domain.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-3">{domain.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Floating Elements Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
    </div>
  );
}
