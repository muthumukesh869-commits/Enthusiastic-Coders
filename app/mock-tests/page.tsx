"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Terminal,
    Database,
    Globe,
    Server,
    Layers,
    Cpu,
    Workflow,
    Search,
    Clock,
    Trophy,
    HelpCircle
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const categories = [
    { id: "python", name: "Python Mastery", icon: "🐍", tests: 25, level: "All Levels", color: "from-blue-500 to-yellow-500" },
    { id: "cpp", name: "C++ Programming", icon: "⚙️", tests: 20, level: "Intermediate", color: "from-blue-600 to-cyan-500" },
    { id: "java", name: "Java Enterprise", icon: "☕", tests: 22, level: "Advanced", color: "from-red-500 to-orange-500" },
    { id: "c", name: "C Language", icon: "🛡️", tests: 15, level: "Basic", color: "from-gray-500 to-blue-400" },
    { id: "frontend", name: "Frontend Development", icon: "🎨", tests: 30, level: "All Levels", color: "from-pink-500 to-purple-500" },
    { id: "backend", name: "Backend Architecture", icon: "🖥️", tests: 28, level: "Advanced", color: "from-green-500 to-teal-500" },
    { id: "fullstack", name: "Full Stack Mastery", icon: "🚀", tests: 35, level: "Pro", color: "from-indigo-500 to-blue-500" },
    { id: "sql", name: "Database & SQL", icon: "📊", tests: 18, level: "Intermediate", color: "from-orange-400 to-red-400" },
];

export default function MockTestsCatalogue() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="neon">100+ TESTS LIVE</Badge>
                            <Badge variant="outline">AI-MODERATED</Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            Placement <span className="text-gradient">Mock Lab</span>
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-2xl">
                            Simulate real coding interviews and placement exams. Timed, structured, and instantly evaluated.
                        </p>
                    </motion.div>
                </header>

                {/* Search & Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="md:col-span-3 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by language or stack (e.g., Python, Frontend)..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-neon-blue/50 outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Card className="bg-neon-blue/10 border-neon-blue/30">
                        <CardContent className="py-4 flex items-center justify-center gap-3">
                            <Clock className="text-neon-blue" />
                            <div className="text-sm">
                                <span className="block font-bold">1,250+</span>
                                <span className="text-xs text-muted-foreground uppercase">Questions Bank</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="h-full bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer overflow-hidden relative"
                                onClick={() => router.push(`/mock-tests/${cat.id}`)}>

                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cat.color}`} />

                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                            {cat.icon}
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">{cat.level}</Badge>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-neon-blue transition-colors">
                                        {cat.name}
                                    </CardTitle>
                                    <CardDescription>
                                        Standard placement pattern
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <HelpCircle className="w-3 h-3" />
                                            {cat.tests} Full Length Tests
                                        </div>
                                        <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform p-0 text-neon-blue">
                                            Explore <Workflow className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <Terminal className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-xl font-bold">No test paths found for "{search}"</h3>
                        <p className="text-muted-foreground">Try searching for generic terms like "Fullstack" or "C"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
