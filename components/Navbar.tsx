"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    LayoutDashboard,
    FileText,
    User,
    BarChart3,
    Terminal,
    Menu,
    X,
    Map
} from 'lucide-react';
import UserAuth from './auth/UserAuth';
import { useState } from 'react';
import { Button } from './ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
    { name: 'Study Plan', href: '/study-plan', icon: Briefcase },
    { name: 'Benchmark', href: '/benchmarking', icon: BarChart3 },
    { name: 'Mock Test', href: '/mock-tests', icon: Terminal },
    { name: 'Courses', href: '/courses', icon: FileText },
    { name: 'Resume', href: '/resume-analyzer', icon: FileText },
    { name: 'Profile', href: '/profile', icon: User },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center">
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="hidden lg:flex glass rounded-full px-6 py-3 items-center gap-8 border border-white/20"
            >
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent decoration-none">
                    MindMaple
                </Link>
                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors decoration-none"
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <div className="w-[1px] h-6 bg-white/10 mx-2" />
                    <UserAuth />
                </div>
            </motion.nav>

            {/* Mobile Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="lg:hidden flex w-full max-w-md glass rounded-2xl px-4 py-3 items-center justify-between border border-white/20 shadow-xl"
            >
                <Link href="/" className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent decoration-none">
                    MindMaple
                </Link>

                <div className="flex items-center gap-3">
                    <UserAuth />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="glass border-l border-white/20 w-[80%] max-w-[300px] text-white">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                    MindMaple
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 mt-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-primary transition-all decoration-none"
                                    >
                                        <div className="p-2 rounded-md bg-white/5 group-hover:bg-primary/20">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.nav>
        </header>
    );
}

