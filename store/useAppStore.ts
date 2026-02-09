import { create } from 'zustand';
import { UserProfile, Recommendation, ResumeAnalysis, AIInsight } from '@/types/api';

interface AppState {
    userProfile: UserProfile;
    isOnboarded: boolean;
    currentStep: number;
    recommendations: Recommendation[];
    resumeAnalysis: ResumeAnalysis | null;
    feedbacks: AIInsight[];
    courseProgress: Record<string, string[]>;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUserProfile: (profile: Partial<UserProfile>) => void;
    setIsOnboarded: (status: boolean) => void;
    setCurrentStep: (step: number) => void;
    toggleLesson: (courseId: string, lessonId: string) => void;

    // AI Service Actions
    fetchRecommendations: () => Promise<void>;
    analyzeResume: (file: File) => Promise<void>;
    fetchFeedbacks: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
    userProfile: {
        name: '',
        interests: [],
        technicalSkills: [],
        softSkills: [],
        academicBackground: '',
    },
    isOnboarded: false,
    currentStep: 0,
    recommendations: [],
    resumeAnalysis: null,
    feedbacks: [],
    courseProgress: {},
    isLoading: false,
    error: null,

    setUserProfile: (profile) =>
        set((state) => ({
            userProfile: { ...state.userProfile, ...profile },
        })),

    setIsOnboarded: (status) => set({ isOnboarded: status }),
    setCurrentStep: (step) => set({ currentStep: step }),

    toggleLesson: (courseId, lessonId) =>
        set((state) => {
            const currentProgress = state.courseProgress[courseId] || [];
            const isCompleted = currentProgress.includes(lessonId);

            const newProgress = isCompleted
                ? currentProgress.filter(id => id !== lessonId)
                : [...currentProgress, lessonId];

            return {
                courseProgress: {
                    ...state.courseProgress,
                    [courseId]: newProgress
                }
            };
        }),

    fetchRecommendations: async () => {
        set({ isLoading: true, error: null });
        try {
            const { userProfile } = get();
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userProfile),
            });
            const data = await response.json();
            set({ recommendations: data.recommendations, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to fetch recommendations', isLoading: false });
        }
    },

    analyzeResume: async (file: File) => {
        set({ isLoading: true, error: null, resumeAnalysis: null });
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/analyze-resume', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze resume');
            }

            set({ resumeAnalysis: data, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false, resumeAnalysis: null });
        }
    },

    fetchFeedbacks: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/feedback');
            const data = await response.json();
            set({ feedbacks: data.feedbacks, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to fetch feedbacks', isLoading: false });
        }
    }
}));
