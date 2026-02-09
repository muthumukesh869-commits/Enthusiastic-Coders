"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Award, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const recommendedDomains = [
    {
        name: "AI/ML Engineering",
        fit: 92,
        skills: ["Python", "TensorFlow", "Machine Learning"],
        outlook: "Excellent",
        color: "from-neon-blue to-blue-600",
    },
    {
        name: "Full Stack Development",
        fit: 85,
        skills: ["React", "Node.js", "MongoDB"],
        outlook: "Very Good",
        color: "from-neon-purple to-purple-600",
    },
    {
        name: "Data Science",
        fit: 78,
        skills: ["Python", "SQL", "Data Analysis"],
        outlook: "Good",
        color: "from-neon-green to-green-600",
    },
];

const stats = [
    { label: "Skills Learned", value: "12", icon: Award, color: "text-neon-blue" },
    { label: "Roadmap Progress", value: "45%", icon: Target, color: "text-neon-purple" },
    { label: "Resources Completed", value: "28", icon: BookOpen, color: "text-neon-green" },
    { label: "Days Streak", value: "7", icon: TrendingUp, color: "text-neon-pink" },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Welcome back, <span className="text-gradient">Student</span>! 👋
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Your personalized career journey continues here
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="hover-lift">
                                <CardContent className="p-6">
                                    <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} />
                                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Recommended Domains */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">Recommended Career Paths</h2>
                        <Link href="/domains">
                            <Button variant="ghost">
                                View All
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {recommendedDomains.map((domain, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className="h-full hover-lift cursor-pointer group">
                                    <CardHeader>
                                        <div className={`w-full h-2 rounded-full bg-gradient-to-r ${domain.color} mb-4`} />
                                        <CardTitle className="group-hover:text-gradient transition-all">
                                            {domain.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {domain.outlook} career outlook
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Fit Percentage */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium">Match Score</span>
                                                    <span className="text-sm font-bold text-neon-blue">{domain.fit}%</span>
                                                </div>
                                                <Progress value={domain.fit} />
                                            </div>

                                            {/* Skills */}
                                            <div>
                                                <p className="text-sm font-medium mb-2">Key Skills</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {domain.skills.map((skill, idx) => (
                                                        <Badge key={idx} variant="neon">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <Link href={`/roadmap/${domain.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                                <Button variant="neon" className="w-full mt-4">
                                                    View Roadmap
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h2 className="text-3xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/resume-analyzer">
                            <Card className="hover-lift cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Analyze Resume</h3>
                                    <p className="text-muted-foreground">Get ATS score and improvement tips</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/companies">
                            <Card className="hover-lift cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Explore Companies</h3>
                                    <p className="text-muted-foreground">Find companies hiring for your skills</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/benchmarking">
                            <Card className="hover-lift cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Skill Benchmarking</h3>
                                    <p className="text-muted-foreground">Compare your skills with peers</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
