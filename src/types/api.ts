export interface Skill {
    name: string;
    level: number;
}

export interface UserProfile {
    name: string;
    interests: string[];
    technicalSkills: Skill[];
    softSkills: Skill[];
    academicBackground: string;
}

export interface Recommendation {
    role: string;
    matchPercentage: number;
    growth: string;
    skills: string[];
    color: string;
}

export interface RoadmapModule {
    name: string;
    type: 'Concepts' | 'Practice' | 'Code' | 'Task';
    completed: boolean;
    active?: boolean;
    duration: string;
}

export interface RoadmapPhase {
    week: string;
    title: string;
    status: 'completed' | 'active' | 'locked';
    modules: RoadmapModule[];
}

export interface ResumeAnalysis {
    score: number;
    status: 'Weak' | 'Average' | 'Strong' | 'Excellent';
    missingKeywords: string[];
    recommendations: { title: string; text: string }[];
    idealStructure: { section: string; points: string[] }[];
    improvements: { title: string; description: string; priority: 'High' | 'Medium' | 'Low' }[];
    breakdown: {
        foundations: { name: string; status: 'completed' | 'pending' | 'warning' }[];
        contentDepth: { name: string; status: 'completed' | 'pending' | 'warning' }[];
    };
}

export interface AIInsight {
    id: number;
    type: 'Insight' | 'Adaptation' | 'Alert';
    title: string;
    content: string;
    icon: string;
    color: string;
    bg: string;
    action: string;
}
