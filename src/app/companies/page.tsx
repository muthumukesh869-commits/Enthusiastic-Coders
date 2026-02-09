"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MapPin,
    TrendingUp,
    Filter,
    Building2,
    Star,
    ExternalLink,
    Loader2,
    X,
    Info,
    Briefcase,
    Heart,
    DollarSign,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Users
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { companiesData, Company } from '@/lib/companies-data';

const ITEMS_PER_PAGE = 12;

export default function CompanyExplorer() {
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredCompanies = useMemo(() => {
        return companiesData.filter(company => {
            const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.headquarters.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTab = activeTab === "all" ||
                (activeTab === "mnc" && company.type === "MNC") ||
                (activeTab === "startups" && company.type === "Startup") ||
                (activeTab === "fortune" && company.type === "Fortune 500");

            return matchesSearch && matchesTab;
        });
    }, [searchQuery, activeTab]);

    if (!mounted) return null;

    const displayedCompanies = filteredCompanies.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCompanies.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <div className="min-h-screen pl-64 bg-background">
            <Sidebar />

            <main className="p-10 pt-28 max-w-7xl mx-auto space-y-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <Building2 className="w-10 h-10 text-primary" />
                            Company Explorer
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Browsing <span className="text-primary font-bold">{filteredCompanies.length}</span> verified companies for your career.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 rounded-2xl glass border-white/10"
                            />
                        </div>
                        <Button size="icon" variant="outline" className="h-12 w-12 rounded-2xl glass border-white/10">
                            <Filter className="w-5 h-5" />
                        </Button>
                    </div>
                </header>

                <section className="space-y-8">
                    <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                        <TabsList className="bg-white/5 border border-white/5 rounded-2xl p-1 h-12">
                            <TabsTrigger value="all" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All</TabsTrigger>
                            <TabsTrigger value="startups" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Startups</TabsTrigger>
                            <TabsTrigger value="mnc" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">MNCs</TabsTrigger>
                            <TabsTrigger value="fortune" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Fortune 500</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {displayedCompanies.map((company, i) => (
                                <motion.div
                                    key={company.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => setSelectedCompany(company)}
                                    className="glass group p-8 rounded-[40px] border border-white/5 relative overflow-hidden flex flex-col h-full cursor-pointer"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${company.color} blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity`} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl ${company.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-black/20`}>
                                            {company.logo}
                                        </div>
                                        <div className="flex gap-1 items-center px-3 py-1 rounded-full bg-white/5 text-yellow-400 text-sm font-bold border border-white/10">
                                            <Star className="w-4 h-4 fill-current" />
                                            {company.rating}
                                        </div>
                                    </div>

                                    <div className="mb-6 flex-1">
                                        <h3 className="text-2xl font-bold mb-1">{company.name}</h3>
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {company.headquarters}
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 italic">
                                            "{company.description}"
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {company.roles.slice(0, 3).map(role => (
                                                <Badge key={role} variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-lg py-1 px-3 text-[10px]">
                                                    {role}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground/60">Hiring Rate</p>
                                                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                                                    <TrendingUp className="w-3.5 h-3.5" />
                                                    {company.hiringRate}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground/60">Type</p>
                                                <p className="text-white font-bold text-sm">{company.type}</p>
                                            </div>
                                        </div>
                                        <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10 text-muted-foreground">
                                            <ExternalLink className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {hasMore && (
                        <div className="flex justify-center pt-8">
                            <Button
                                onClick={handleLoadMore}
                                className="px-10 py-6 rounded-2xl bg-white text-black hover:bg-white/90 text-lg font-bold gap-3 shadow-xl"
                            >
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Load More Companies
                            </Button>
                        </div>
                    )}
                </section>
            </main>

            {/* Company Detail Modal */}
            <AnimatePresence>
                {selectedCompany && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCompany(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            layoutId={selectedCompany.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl h-full max-h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-[48px] overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* Modal Header/Banner */}
                            <div className={`h-48 md:h-64 relative ${selectedCompany.color} overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => setSelectedCompany(null)}
                                    className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white border border-white/10"
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            {/* Company Branding Overlay */}
                            <div className="px-12 -mt-16 relative z-10">
                                <div className={`w-32 h-32 rounded-[32px] ${selectedCompany.color} border-4 border-[#0A0A0A] shadow-2xl flex items-center justify-center text-4xl font-bold text-white mb-6 animate-float`}>
                                    {selectedCompany.logo}
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                    <div className="space-y-2">
                                        <h2 className="text-4xl md:text-5xl font-black">{selectedCompany.name}</h2>
                                        <div className="flex flex-wrap gap-4 text-muted-foreground font-medium">
                                            <div className="flex items-center gap-1.5 border border-white/5 py-1 px-3 rounded-full bg-white/5">
                                                <MapPin className="w-4 h-4" />
                                                {selectedCompany.headquarters}
                                            </div>
                                            <div className="flex items-center gap-1.5 border border-white/5 py-1 px-3 rounded-full bg-white/5">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                {selectedCompany.rating} Rating
                                            </div>
                                            <div className="flex items-center gap-1.5 border border-white/5 py-1 px-3 rounded-full bg-white/5">
                                                <Building2 className="w-4 h-4 text-primary" />
                                                {selectedCompany.type}
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="lg" className="rounded-2xl px-8 h-14 font-black shadow-lg shadow-primary/20 gap-2">
                                        Follow Company
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-10">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    {/* Left Column: Info */}
                                    <div className="lg:col-span-2 space-y-10">
                                        <section className="space-y-4">
                                            <h4 className="text-xl font-bold flex items-center gap-2">
                                                <Info className="w-5 h-5 text-primary" />
                                                About {selectedCompany.name}
                                            </h4>
                                            <p className="text-muted-foreground leading-relaxed text-lg italic">
                                                "{selectedCompany.description}"
                                            </p>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {selectedCompany.about}
                                            </p>
                                        </section>

                                        <section className="space-y-6">
                                            <h4 className="text-xl font-bold flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-primary" />
                                                Available Jobs
                                            </h4>
                                            <div className="grid gap-4">
                                                {selectedCompany.jobs.map(job => (
                                                    <div key={job.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h5 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h5>
                                                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                                                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                                                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                                                    <span>{job.type}</span>
                                                                </div>
                                                            </div>
                                                            <Button size="sm" variant="ghost" className="rounded-xl hover:bg-primary/20 hover:text-primary">
                                                                Apply Now
                                                                <ArrowRight className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                            {job.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.skills.map(skill => (
                                                                <Badge key={skill} variant="outline" className="text-[10px] py-0.5 rounded-lg border-white/10">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Perks & Meta */}
                                    <div className="space-y-8">
                                        <div className="p-8 rounded-[40px] glass-darker border border-white/5 space-y-6">
                                            <h4 className="font-bold flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-yellow-400" />
                                                Why join us?
                                            </h4>
                                            <div className="space-y-4">
                                                {selectedCompany.benefits.map(benefit => (
                                                    <div key={benefit} className="flex gap-3 items-center text-sm font-medium">
                                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                                        </div>
                                                        {benefit}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[40px] glass-darker border border-white/5 space-y-4">
                                            <h4 className="font-bold flex items-center gap-2">
                                                <Users className="w-5 h-5 text-primary" />
                                                Our Culture
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {selectedCompany.culture}
                                            </p>
                                        </div>

                                        <div className="relative p-6 rounded-[32px] overflow-hidden group">
                                            <div className={`absolute inset-0 ${selectedCompany.color} opacity-10`} />
                                            <div className="relative z-10 text-center space-y-2">
                                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Hiring Probability</p>
                                                <p className="text-3xl font-black text-white">{selectedCompany.hiringRate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
