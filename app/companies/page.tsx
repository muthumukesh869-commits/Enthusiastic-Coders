"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, MapPin, Filter } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const companies = [
    {
        id: 1,
        name: "Google",
        logo: "🔍",
        type: "MNC",
        roles: ["SDE", "ML Engineer", "Data Scientist"],
        hiring: "Active",
        trend: "+15%",
        locations: ["Bangalore", "Hyderabad"],
        package: "₹20-45 LPA",
    },
    {
        id: 2,
        name: "Microsoft",
        logo: "🪟",
        type: "MNC",
        roles: ["SDE", "Cloud Engineer"],
        hiring: "Active",
        trend: "+12%",
        locations: ["Bangalore", "Noida"],
        package: "₹18-42 LPA",
    },
    {
        id: 3,
        name: "Razorpay",
        logo: "💳",
        type: "Startup",
        roles: ["Full Stack", "Backend Engineer"],
        hiring: "Active",
        trend: "+20%",
        locations: ["Bangalore"],
        package: "₹12-30 LPA",
    },
    {
        id: 4,
        name: "Flipkart",
        logo: "🛒",
        type: "MNC",
        roles: ["SDE", "Product Manager"],
        hiring: "Seasonal",
        trend: "+8%",
        locations: ["Bangalore", "Delhi"],
        package: "₹15-35 LPA",
    },
];

const filterOptions = {
    type: ["All", "MNC", "Startup", "Research"],
    role: ["All", "SDE", "ML Engineer", "Data Scientist", "Full Stack"],
    hiring: ["All", "Active", "Seasonal"],
};

export default function CompaniesPage() {
    const [selectedType, setSelectedType] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All");
    const [selectedHiring, setSelectedHiring] = useState("All");

    const filteredCompanies = companies.filter((company) => {
        if (selectedType !== "All" && company.type !== selectedType) return false;
        if (selectedRole !== "All" && !company.roles.includes(selectedRole)) return false;
        if (selectedHiring !== "All" && company.hiring !== selectedHiring) return false;
        return true;
    });

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
                        Company <span className="text-gradient">Explorer</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Discover companies hiring for your skills
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <Card className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="w-5 h-5 text-neon-blue" />
                            <h3 className="font-semibold">Filters</h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Company Type */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Company Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.type.map((type) => (
                                        <Badge
                                            key={type}
                                            variant={selectedType === type ? "neon" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedType(type)}
                                        >
                                            {type}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.role.map((role) => (
                                        <Badge
                                            key={role}
                                            variant={selectedRole === role ? "neon" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedRole(role)}
                                        >
                                            {role}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Hiring Status */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Hiring Status</label>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.hiring.map((status) => (
                                        <Badge
                                            key={status}
                                            variant={selectedHiring === status ? "neon" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedHiring(status)}
                                        >
                                            {status}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Companies Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredCompanies.map((company, index) => (
                        <motion.div
                            key={company.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <Card className="hover-lift cursor-pointer group">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center text-4xl">
                                                {company.logo}
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl group-hover:text-gradient transition-all">
                                                    {company.name}
                                                </CardTitle>
                                                <CardDescription className="flex items-center gap-2 mt-1">
                                                    <Building2 className="w-4 h-4" />
                                                    {company.type}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant={company.hiring === "Active" ? "neon" : "outline"}>
                                            {company.hiring}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Roles */}
                                    <div>
                                        <p className="text-sm font-medium mb-2">Open Roles</p>
                                        <div className="flex flex-wrap gap-2">
                                            {company.roles.map((role, idx) => (
                                                <Badge key={idx} variant="outline">
                                                    {role}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Locations */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        {company.locations.join(", ")}
                                    </div>

                                    {/* Package & Trend */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Package</p>
                                            <p className="font-bold text-lg">{company.package}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-neon-green">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="font-semibold">{company.trend}</span>
                                        </div>
                                    </div>

                                    <Button variant="neon" className="w-full">
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-2xl font-bold mb-2">No companies found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
