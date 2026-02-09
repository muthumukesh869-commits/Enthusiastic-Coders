"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, Clock, BookOpen, X } from 'lucide-react';
import { courses } from '@/data/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const categories = ["All", "Python", "C++", "C", "Java", "Frontend", "Backend", "DSA"];

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Master New <span className="text-gradient">Skills</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Explore our library of 100+ professional courses designed to take your career to the next level.
                    </p>
                </motion.div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "neon" : "outline"}
                                className="cursor-pointer px-4 py-1 text-sm transition-all hover:scale-105"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="group h-full flex flex-col hover-lift border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="neon"
                                                size="icon"
                                                className="rounded-full w-12 h-12"
                                                onClick={() => setSelectedCourse(course)}
                                            >
                                                <Play className="w-6 h-6 fill-current" />
                                            </Button>
                                        </div>
                                        <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md">
                                            {course.level}
                                        </Badge>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                                                {course.category}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                {course.duration}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-neon-blue transition-colors">
                                            {course.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {course.description}
                                        </p>
                                        <div className="mt-4 flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                className="w-full text-xs h-8"
                                                onClick={() => setSelectedCourse(course)}
                                            >
                                                Watch Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                        <h3 className="text-2xl font-bold">No courses found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedCourse(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 hover:bg-black/80 text-white"
                                onClick={() => setSelectedCourse(null)}
                            >
                                <X className="w-5 h-5" />
                            </Button>

                            <div className="aspect-video w-full">
                                <iframe
                                    src={selectedCourse.videoUrl}
                                    title={selectedCourse.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                    <h2 className="text-2xl md:text-3xl font-bold">{selectedCourse.title}</h2>
                                    <Badge variant="neon">{selectedCourse.category}</Badge>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {selectedCourse.duration}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        {selectedCourse.level} Level
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {selectedCourse.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
