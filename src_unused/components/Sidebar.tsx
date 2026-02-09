"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Map,
    FileText,
    Search,
    BarChart3,
    MessageSquare,
    Settings,
    LogOut,
    GraduationCap,
    Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Map, label: 'Roadmaps', href: '/roadmap' },
    { icon: FileText, label: 'Resume Analyzer', href: '/resume' },
    { icon: Search, label: 'Company Explorer', href: '/companies' },
    { icon: Video, label: 'Skill Courses', href: '/courses' },
    { icon: GraduationCap, label: 'Mock Tests', href: '/tests' },
    { icon: BarChart3, label: 'Skill Stats', href: '/stats' },
    { icon: MessageSquare, label: 'AI Feedback', href: '/feedback' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-darker border-r border-white/5 z-40 flex flex-col pt-24">
            <div className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.label} href={item.href}>
                            <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                                    isActive
                                        ? "bg-primary/20 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-primary" : "group-hover:text-foreground"
                                )} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 mt-auto border-t border-white/5 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-white/5 transition-all">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
