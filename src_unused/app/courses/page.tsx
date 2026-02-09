"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Video,
    Clock,
    User,
    ArrowLeft,
    Maximize2,
    CheckCircle2,
    Info,
    Layout
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courses, Course, Lesson } from '@/lib/courses-data';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { Progress } from '@/components/ui/progress';

export default function CoursesPage() {
    const { courseProgress, toggleLesson } = useAppStore();
    const [mounted, setMounted] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
        setActiveLesson(course.lessons[0]);
    };

    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            <Sidebar />

            <main className="flex-1 pl-64 p-10 pt-28">
                <AnimatePresence mode="wait">
                    {!selectedCourse ? (
                        <motion.section
                            key="course-list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10 max-w-7xl mx-auto"
                        >
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl font-black flex items-center gap-3">
                                    <Video className="w-10 h-10 text-primary" />
                                    Skill Courses
                                </h1>
                                <p className="text-muted-foreground text-lg">
                                    Learn from the best industry experts with our curated video courses.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course) => (
                                    <motion.div
                                        key={course.id}
                                        whileHover={{ y: -8 }}
                                        onClick={() => handleCourseClick(course)}
                                        className="group cursor-pointer rounded-[32px] overflow-hidden glass-darker border border-white/5 hover:border-primary/30 transition-all flex flex-col h-full"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                    <Play className="w-6 h-6 text-black fill-current translate-x-0.5" />
                                                </div>
                                            </div>
                                            <Badge className="absolute top-4 left-4 rounded-full bg-black/60 shadow-lg backdrop-blur-md px-3 py-1 border-white/10 uppercase text-[10px] font-bold tracking-widest">
                                                {course.category}
                                            </Badge>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col gap-4">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                    <User className="w-4 h-4" />
                                                    {course.instructor}
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {course.description}
                                            </p>

                                            {/* Progress Bar */}
                                            {courseProgress[course.id]?.length > 0 && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
                                                        <span>Progress</span>
                                                        <span>{Math.round((courseProgress[course.id].length / course.lessons.length) * 100)}%</span>
                                                    </div>
                                                    <Progress
                                                        value={(courseProgress[course.id].length / course.lessons.length) * 100}
                                                        className="h-1 bg-white/5"
                                                    />
                                                </div>
                                            )}

                                            <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {course.lessons[0].duration}
                                                </div>
                                                <div className="text-xs font-black uppercase text-primary tracking-tighter">
                                                    {course.level}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="course-player"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10"
                        >
                            {/* Player Section */}
                            <div className="lg:col-span-2 space-y-8">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedCourse(null)}
                                    className="text-muted-foreground hover:text-white gap-2 -ml-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Courses
                                </Button>

                                <div className="aspect-video w-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-black">
                                    {activeLesson && (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1`}
                                            title={activeLesson.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-center gap-3">
                                                <Badge className="rounded-lg bg-primary/20 text-primary border-primary/20">
                                                    {selectedCourse.category}
                                                </Badge>
                                                <Badge variant="outline" className="border-white/10 rounded-lg">
                                                    {selectedCourse.level}
                                                </Badge>
                                            </div>
                                            <h2 className="text-3xl font-black">{activeLesson?.title}</h2>
                                            <div className="flex items-center gap-6 text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-5 h-5 text-primary" />
                                                    <span className="font-bold text-white">{selectedCourse.instructor}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5" />
                                                    <span>{activeLesson?.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {activeLesson && (
                                            <Button
                                                onClick={() => toggleLesson(selectedCourse.id, activeLesson.id)}
                                                className={cn(
                                                    "rounded-xl h-12 px-6 font-bold transition-all",
                                                    courseProgress[selectedCourse.id]?.includes(activeLesson.id)
                                                        ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/30"
                                                        : "bg-white text-black hover:bg-white/90"
                                                )}
                                            >
                                                {courseProgress[selectedCourse.id]?.includes(activeLesson.id) ? (
                                                    <span className="flex items-center gap-2 italic">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Completed
                                                    </span>
                                                ) : "Mark as Complete"}
                                            </Button>
                                        )}
                                    </div>

                                    <div className="p-8 rounded-[32px] glass-darker border border-white/5 space-y-4">
                                        <h4 className="font-bold flex items-center gap-2">
                                            <Info className="w-5 h-5 text-primary" />
                                            Course Description
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedCourse.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Playlist Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-2">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Layout className="w-5 h-5 text-primary" />
                                        Course Contents
                                    </h3>
                                    <span className="text-sm text-muted-foreground font-medium">
                                        {selectedCourse.lessons.length} Lessons
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {selectedCourse.lessons.map((lesson, idx) => {
                                        const isActive = activeLesson?.id === lesson.id;
                                        const isCompleted = courseProgress[selectedCourse.id]?.includes(lesson.id);
                                        return (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setActiveLesson(lesson)}
                                                className={cn(
                                                    "w-full p-5 rounded-[24px] text-left transition-all duration-300 border flex items-center gap-4 group",
                                                    isActive
                                                        ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10"
                                                        : isCompleted
                                                            ? "bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10"
                                                            : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center border font-black shrink-0",
                                                    isActive
                                                        ? "bg-primary text-black border-primary"
                                                        : isCompleted
                                                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
                                                            : "bg-white/5 border-white/10 group-hover:border-white/20"
                                                )}>
                                                    {isActive ? <Play className="w-4 h-4 fill-current" /> : (idx + 1)}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className={cn(
                                                        "font-bold truncate text-sm",
                                                        isActive ? "text-primary" : isCompleted ? "text-emerald-500/70" : "text-white group-hover:text-primary transition-colors"
                                                    )}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground mt-0.5">{lesson.duration}</p>
                                                </div>
                                                {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="p-8 rounded-[40px] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 space-y-4">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <Maximize2 className="w-5 h-5 text-primary" />
                                        Earn Certificate
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Complete all lessons and pass the final assessment in the "Mock Tests" section to earn your verified badge.
                                    </p>
                                    <Button className="w-full rounded-xl bg-primary text-black hover:bg-primary/90 font-bold">
                                        View Roadmap
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
