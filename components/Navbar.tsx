"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, LayoutDashboard, FileText, User, BarChart3, Terminal } from 'lucide-react';
import UserAuth from './auth/UserAuth';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Roadmap', href: '/roadmap', icon: Briefcase },
    { name: 'Study Plan', href: '/study-plan', icon: Briefcase },
    { name: 'Benchmark', href: '/benchmarking', icon: BarChart3 },
    { name: 'Mock Test', href: '/mock-tests', icon: Terminal },
    { name: 'Courses', href: '/courses', icon: FileText },
    { name: 'Resume', href: '/resume-analyzer', icon: FileText },
    { name: 'Profile', href: '/profile', icon: User },
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass rounded-full px-6 py-3 flex items-center gap-8 border border-white/20"
            >
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    MindMaple
                </Link>
                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <div className="w-[1px] h-6 bg-white/10 mx-2" />
                    <UserAuth />
                </div>
            </motion.div>
        </nav>
    );
}
