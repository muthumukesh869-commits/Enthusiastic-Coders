"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, MapPin, Filter, Search, Globe, Zap, Cpu, ExternalLink, Briefcase } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const domains = ["Web Development", "AI/ML Engineering", "Cybersecurity", "Cloud Computing", "Data Science"];

interface Company {
    id: number;
    name: string;
    logo: string;
    type: string;
    domain: string;
    roles: string[];
    hiring: "Active" | "Seasonal" | "Closed";
    trend: string;
    locations: string[];
    package: string;
    description: string;
}

const companies: Company[] = [
    // Web Development
    { id: 1, name: "Google", logo: "🔍", type: "MNC", domain: "Web Development", roles: ["Frontend Dev", "Backend Dev", "Full Stack"], hiring: "Active", trend: "+15%", locations: ["Bangalore", "Hyderabad", "Mountain View"], package: "₹20-45 LPA", description: "World leader in search, cloud, and advertising technologies." },
    { id: 2, name: "Microsoft", logo: "🪟", type: "MNC", domain: "Web Development", roles: ["Software Engineer", "Frontend Specialist"], hiring: "Active", trend: "+12%", locations: ["Hyderabad", "Redmond", "Bangalore"], package: "₹18-42 LPA", description: "Global leader in software, services, and cloud solutions." },
    { id: 3, name: "Apple", logo: "🍎", type: "MNC", domain: "Web Development", roles: ["UI Engineer", "Full Stack Web"], hiring: "Active", trend: "+8%", locations: ["Hyderabad", "Cupertino"], package: "₹25-55 LPA", description: "Pioneer in consumer electronics and software ecosystems." },
    { id: 4, name: "Meta", logo: "♾️", type: "MNC", domain: "Web Development", roles: ["Product Engineer", "React Specialist"], hiring: "Active", trend: "+20%", locations: ["Remote", "Menlo Park"], package: "₹30-60 LPA", description: "Developing the next evolution of social connection." },
    { id: 5, name: "Amazon", logo: "📦", type: "MNC", domain: "Web Development", roles: ["SDE-1", "SDE-2", "Frontend Engineer"], hiring: "Active", trend: "+10%", locations: ["Bangalore", "Seattle"], package: "₹16-40 LPA", description: "The world's largest e-commerce and cloud services provider." },
    { id: 6, name: "Razorpay", logo: "💳", type: "Startup", domain: "Web Development", roles: ["Frontend Dev", "Full Stack"], hiring: "Active", trend: "+20%", locations: ["Bangalore"], package: "₹12-30 LPA", description: "The convergence of payments and banking technology." },
    { id: 7, name: "Zomato", logo: "🍅", type: "Unicorn", domain: "Web Development", roles: ["SDE-1", "SDE-2"], hiring: "Active", trend: "+10%", locations: ["Gurgaon"], package: "₹18-35 LPA", description: "India's leading food discovery and delivery platform." },
    { id: 8, name: "Netflix", logo: "📺", type: "MNC", domain: "Web Development", roles: ["Senior UI Engineer", "Streaming Architect"], hiring: "Active", trend: "+5%", locations: ["Los Gatos", "Remote"], package: "₹40-75 LPA", description: "The world's leading streaming entertainment service." },
    { id: 9, name: "Uber", logo: "🚗", type: "MNC", domain: "Web Development", roles: ["Software Engineer", "Maps Specialist"], hiring: "Active", trend: "+15%", locations: ["Bangalore", "San Francisco"], package: "₹22-48 LPA", description: "Igniting opportunity by setting the world in motion." },
    { id: 10, name: "Airbnb", logo: "🏠", type: "MNC", domain: "Web Development", roles: ["Guest Experience Dev", "Full Stack"], hiring: "Active", trend: "+12%", locations: ["Remote", "San Francisco"], package: "₹24-52 LPA", description: "A community marketplace for unique travel experiences." },

    // AI/ML
    { id: 11, name: "Adobe", logo: "🅰️", type: "MNC", domain: "AI/ML Engineering", roles: ["ML Researcher", "Data Scientist"], hiring: "Active", trend: "+12%", locations: ["Noida", "Bangalore", "San Jose"], package: "₹25-50 LPA", description: "Global leader in digital media and marketing solutions." },
    { id: 12, name: "NVIDIA", logo: "🖥️", type: "Core", domain: "AI/ML Engineering", roles: ["Deep Learning Engineer", "CUDA Architect"], hiring: "Active", trend: "+30%", locations: ["Bangalore", "Pune", "Santa Clara"], package: "₹30-60 LPA", description: "The engine of modern AI and graphics processing." },
    { id: 13, name: "OpenAI", logo: "🧠", type: "Startup", domain: "AI/ML Engineering", roles: ["LLM Specialist", "Safety Researcher"], hiring: "Active", trend: "+50%", locations: ["San Francisco", "Remote"], package: "₹45-90 LPA", description: "Creating safe and beneficial artificial general intelligence." },
    { id: 14, name: "Anthropic", logo: "🤖", type: "Startup", domain: "AI/ML Engineering", roles: ["AI Safety Engineer", "NLP Scientist"], hiring: "Active", trend: "+40%", locations: ["San Francisco"], package: "₹40-85 LPA", description: "AI safety and research company building reliable AI." },
    { id: 15, name: "Tesla AI", logo: "⚡", type: "Core", domain: "AI/ML Engineering", roles: ["Autopilot Engineer", "Vision Scientist"], hiring: "Active", trend: "+25%", locations: ["Austin", "Palo Alto"], package: "₹35-70 LPA", description: "Advancing autonomy through neural networks and robotics." },
    { id: 16, name: "DeepMind", logo: "🧬", type: "MNC", domain: "AI/ML Engineering", roles: ["AI Research Scientist"], hiring: "Active", trend: "+15%", locations: ["London", "Mountain View"], package: "₹35-65 LPA", description: "Solving intelligence to advance science and benefit humanity." },
    { id: 17, name: "IBM Research", logo: "🔵", type: "MNC", domain: "AI/ML Engineering", roles: ["Watson Engineer", "Quantum Scientist"], hiring: "Active", trend: "+10%", locations: ["Bangalore", "New York"], package: "₹15-35 LPA", description: "A global leader in enterprise AI and quantum computing." },
    { id: 18, name: "Hugging Face", logo: "🤗", type: "Startup", domain: "AI/ML Engineering", roles: ["ML Ops Engineer", "Open Source Dev"], hiring: "Active", trend: "+45%", locations: ["Remote", "Paris"], package: "₹25-55 LPA", description: "The community building the future of machine learning." },

    // Cybersecurity
    { id: 19, name: "CrowdStrike", logo: "🛡️", type: "MNC", domain: "Cybersecurity", roles: ["Security Analyst", "Penetration Tester"], hiring: "Active", trend: "+18%", locations: ["Pune", "Sunnyvale"], package: "₹15-35 LPA", description: "Leader in cloud-delivered endpoint and workload protection." },
    { id: 20, name: "Cisco", logo: "🌐", type: "MNC", domain: "Cybersecurity", roles: ["Network Security Engineer"], hiring: "Active", trend: "+8%", locations: ["Bangalore", "San Jose"], package: "₹12-28 LPA", description: "Transforming how people connect, communicate, and collaborate." },
    { id: 21, name: "Palo Alto Networks", logo: "🧱", type: "MNC", domain: "Cybersecurity", roles: ["SecOps Engineer", "Malware Researcher"], hiring: "Active", trend: "+15%", locations: ["Bangalore", "Santa Clara"], package: "₹18-38 LPA", description: "The global cybersecurity leader shaping the cloud-centric future." },
    { id: 22, name: "Fortinet", logo: "🏯", type: "MNC", domain: "Cybersecurity", roles: ["Security Software Dev"], hiring: "Active", trend: "+10%", locations: ["Bangalore", "Sunnyvale"], package: "₹15-32 LPA", description: "Delivering broad, integrated, and high-performance security." },
    { id: 23, name: "Snyk", logo: "🐶", type: "Startup", domain: "Cybersecurity", roles: ["DevSecOps Engineer"], hiring: "Active", trend: "+35%", locations: ["Remote", "London"], package: "₹20-45 LPA", description: "Helping developers find and fix vulnerabilities in their code." },

    // Cloud Computing
    { id: 24, name: "AWS", logo: "☁️", type: "MNC", domain: "Cloud Computing", roles: ["Cloud Architect", "DevOps Engineer"], hiring: "Active", trend: "+20%", locations: ["Seattle", "Bangalore"], package: "₹18-45 LPA", description: "The world's most comprehensive and broadly adopted cloud." },
    { id: 25, name: "DigitalOcean", logo: "🌊", type: "MNC", domain: "Cloud Computing", roles: ["Droplet Engineer", "Kubernetes Specialist"], hiring: "Active", trend: "+12%", locations: ["Remote", "New York"], package: "₹15-35 LPA", description: "Simplifying cloud computing so businesses can spend more time building." },
    { id: 26, name: "Snowflake", logo: "❄️", type: "Unicorn", domain: "Cloud Computing", roles: ["Data Cloud Architect", "SRE"], hiring: "Active", trend: "+25%", locations: ["Pune", "San Mateo"], package: "₹22-48 LPA", description: "Enabling every organization to be data-driven with the Data Cloud." },
    { id: 27, name: "Databricks", logo: "🧱", type: "Startup", domain: "Cloud Computing", roles: ["Lakehouse Architect"], hiring: "Active", trend: "+40%", locations: ["Bangalore", "San Francisco"], package: "₹25-55 LPA", description: "The Data and AI company helping organizations simplify data." },
    { id: 28, name: "Intel", logo: "💙", type: "Core", domain: "Cloud Computing", roles: ["Cloud Architect", "Hardware Engineer"], hiring: "Active", trend: "+10%", locations: ["Bangalore", "Santa Clara"], package: "₹18-40 LPA", description: "World leader in computing innovation and silicon technology." },

    // Data Science
    { id: 29, name: "Palantir", logo: "💎", type: "MNC", domain: "Data Science", roles: ["Forward Deployed Engineer", "Data Analyst"], hiring: "Active", trend: "+15%", locations: ["London", "Palo Alto"], package: "₹25-55 LPA", description: "Building software that lets organizations integrate their data." },
    { id: 30, name: "Salesforce", logo: "☁️", type: "MNC", domain: "Data Science", roles: ["Data Architect", "Tableau Specialist"], hiring: "Active", trend: "+10%", locations: ["Hyderabad", "San Francisco"], package: "₹15-38 LPA", description: "The world's #1 customer relationship management (CRM) platform." },
];

export default function CompaniesPage() {
    const [selectedDomain, setSelectedDomain] = useState("Web Development");
    const [selectedType, setSelectedType] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const categoryIcons: Record<string, any> = {
        MNC: <Globe className="w-4 h-4" />,
        Startup: <Zap className="w-4 h-4" />,
        Core: <Cpu className="w-4 h-4" />,
        Unicorn: <TrendingUp className="w-4 h-4" />,
    };

    const filteredCompanies = useMemo(() => {
        return companies.filter((c) => {
            const domainMatch = c.domain === selectedDomain;
            const typeMatch = selectedType === "All" || c.type === selectedType;
            const searchMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.roles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
            return domainMatch && typeMatch && searchMatch;
        });
    }, [selectedDomain, selectedType, searchQuery]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 md:px-10 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Badge variant="neon" className="mb-4">PLACEMENT HUB</Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            Global <span className="text-gradient">Company Insights</span>
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-2xl">
                            Explore 100+ top companies across various domains and workplace cultures.
                        </p>
                    </motion.div>
                </header>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search companies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-neon-blue/50 outline-none transition-all"
                                />
                            </div>

                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Select Domain</h3>
                            <div className="space-y-2">
                                {domains.map((domain) => (
                                    <button
                                        key={domain}
                                        onClick={() => setSelectedDomain(domain)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${selectedDomain === domain
                                            ? 'bg-neon-blue/10 border-neon-blue/50 text-neon-blue shadow-lg shadow-neon-blue/10'
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="font-medium text-sm">{domain}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Company Type</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {["All", "Startup", "MNC", "Core", "Unicorn"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${selectedType === type
                                            ? 'bg-white text-black border-white'
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Card className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border-white/10">
                            <CardContent className="pt-6">
                                <h4 className="font-bold mb-2">Hiring Alert!</h4>
                                <p className="text-xs text-muted-foreground mb-4">
                                    NVIDIA and Google have increased their AI/ML hiring by 30% this month.
                                </p>
                                <Button size="sm" variant="neon" className="w-full">Get Daily Alerts</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredCompanies.map((company, index) => (
                                <motion.div
                                    key={company.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: (index % 10) * 0.05 }}
                                >
                                    <Card className="h-full bg-black/40 backdrop-blur-xl border-white/10 hover:border-neon-blue/30 transition-all duration-500 overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity flex gap-2">
                                            {categoryIcons[company.type as keyof typeof categoryIcons]}
                                        </div>

                                        <CardHeader>
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/5">
                                                    {company.logo}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl flex items-center gap-2">
                                                        {company.name}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                                                            {company.type}
                                                        </Badge>
                                                        <Badge variant={company.hiring === "Active" ? "neon" : "outline"} className="text-[10px] animate-pulse">
                                                            {company.hiring}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <CardDescription className="mt-4 line-clamp-2 text-xs">
                                                {company.description}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-6">
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase font-semibold mb-3 flex items-center gap-1">
                                                    <Briefcase className="w-3 h-3" /> Target Roles
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {company.roles.map(role => (
                                                        <span key={role} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5">
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-muted-foreground whitespace-nowrap overflow-hidden">
                                                    <MapPin className="w-4 h-4 shrink-0" />
                                                    <span className="truncate">{company.locations.join(", ")}</span>
                                                </div>
                                                <div className="font-bold text-neon-blue shrink-0">
                                                    {company.package}
                                                </div>
                                            </div>

                                            <Button variant="glass" className="w-full group-hover:bg-neon-blue group-hover:text-black transition-all">
                                                Preparation Guide
                                                <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {filteredCompanies.length === 0 && (
                            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                                    <Filter className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No results for this combination</h3>
                                <p className="text-muted-foreground">We are constantly updating our database with new companies.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
