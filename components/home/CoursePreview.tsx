"use client";

import { motion } from "framer-motion";
import { courses } from "@/data/courses";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CoursePreview() {
    // Show only 6 featured courses on home page
    const featuredCourses = courses.slice(0, 6);

    return (
        <section className="relative z-10 py-24 px-6 md:px-10 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Explore <span className="text-gradient">Featured Courses</span>
                        </motion.h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Unlock your potential with our most popular learning paths in Python, Java, Web Dev, and more.
                        </p>
                    </div>
                    <Link href="/courses">
                        <Button variant="neon" size="lg" className="group">
                            View All 100+ Courses
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCourses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group h-full flex flex-col hover-lift border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                                <div className="relative aspect-video">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-12 h-12 text-neon-blue fill-current" />
                                    </div>
                                    <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md">
                                        {course.level}
                                    </Badge>
                                </div>
                                <CardHeader className="pb-2">
                                    <Badge variant="outline" className="w-fit mb-2 text-[10px] uppercase tracking-wider">
                                        {course.category}
                                    </Badge>
                                    <CardTitle className="text-xl group-hover:text-neon-blue transition-colors">
                                        {course.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {course.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
