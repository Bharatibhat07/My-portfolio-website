import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AssistantWidget from "@/components/AssistantWidget";

const Index = () => (
  <div className="min-h-screen gradient-bg">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <EducationSection />
    <SkillsSection />
    <AchievementsSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
    <AssistantWidget />
  </div>
);

export default Index;
