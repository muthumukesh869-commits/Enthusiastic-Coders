import dynamic from "next/dynamic";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";
import CoursePreview from "@/components/home/CoursePreview";

const Background3D = dynamic(() => import("@/components/three/Background3D"));
const AIChat = dynamic(() => import("@/components/shared/AIChat"));

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <Background3D />

      {/* Hero Section */}
      <HomeHero />

      {/* Features Section */}
      <HomeFeatures />

      {/* Courses Preview */}
      <CoursePreview />

      {/* AI Chatbot */}
      <AIChat />
    </main>
  );
}
