import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Core Immediate Components (Landing Page Critical Path)
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import { ContactSection } from './components/ContactSection';

// Lazily Loaded Modals & Sub-Pages (Loaded On-Demand)
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const ChemistryLabPage = lazy(() => import('./components/ChemistryLabPage').then(m => ({ default: m.ChemistryLabPage })));
const NotesNestPage = lazy(() => import('./components/NotesNestPage').then(m => ({ default: m.NotesNestPage })));
const RobotProjectPage = lazy(() => import('./components/RobotProjectPage').then(m => ({ default: m.RobotProjectPage })));

// Smooth Route Fallback
const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-slate-900 animate-spin" />
      <span className="font-mono text-xs text-slate-500 tracking-wider">LOADING MODULE...</span>
    </div>
  </div>
);

// Helper to scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Home View for main landing page
const HomeView = ({ onOpenResume, onOpenContact }) => {
  const navigate = useNavigate();

  const handleSelectProject = (project) => {
    if (project.id === 'virtual-chemistry-lab' || project.modalType === 'chemistry-detail') {
      navigate('/chemistry-lab');
    } else if (project.id === 'notesnest-workspace' || project.modalType === 'notes-detail') {
      navigate('/notesnest');
    } else if (project.id === 'quadruped-robot-ai' || project.modalType === 'robot' || project.modalType === 'robot-detail') {
      navigate('/robot');
    }
  };

  return (
    <>
      <Navbar onOpenResume={onOpenResume} />
      <main>
        <HeroSection />
        <ProjectsSection onSelectProject={handleSelectProject} />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer onOpenContact={onOpenContact} />
    </>
  );
};

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = React.useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-[#0F172A] font-inter">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Main Portfolio Route */}
            <Route path="/" element={
              <HomeView 
                onOpenResume={() => setIsResumeOpen(true)} 
                onOpenContact={() => setIsContactOpen(true)}
              />
            } />

            {/* Dedicated Case Study Routes */}
            <Route path="/chemistry-lab" element={
              <ChemistryLabPage onOpenContact={() => setIsContactOpen(true)} />
            } />
            
            <Route path="/notesnest" element={
              <NotesNestPage onOpenContact={() => setIsContactOpen(true)} />
            } />

            <Route path="/robot" element={
              <RobotProjectPage onOpenContact={() => setIsContactOpen(true)} />
            } />
          </Routes>
        </Suspense>

        {/* Global Modals (Lazy Loaded on Demand) */}
        <AnimatePresence>
          {isResumeOpen && (
            <Suspense fallback={null}>
              <ResumeModal onClose={() => setIsResumeOpen(false)} />
            </Suspense>
          )}
          {isContactOpen && (
            <Suspense fallback={null}>
              <ContactModal onClose={() => setIsContactOpen(false)} />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

