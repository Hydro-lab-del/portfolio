import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { containerVariants, itemVariants } from '@/animations/variants';
import {
  ArrowLeft,
  Layers,
  Cpu,
  Database,
  FlaskConical,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  Server,
  Maximize2,
  X,
  ChevronDown,
  ArrowRight,
  Monitor
} from 'lucide-react';

import labScreenshot from '../../assets/lab.png';
import authScreenshot from '../../assets/auth.png';
import reportScreenshot from '../../assets/report.png';

export const ChemistryLabPage = ({ onBack, onOpenContact }) => {
  const navigate = useNavigate();
  const [activeModalImage, setActiveModalImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveModalImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const roadmapPhases = [
    {
      phase: 'Phase 1',
      title: '3D WebGL Simulation',
      status: 'Completed',
      items: ['Three.js apparatus simulation', 'Redux state architecture', 'Stoichiometry engine', 'Fluid shaders']
    },
    {
      phase: 'Phase 2',
      title: 'Enterprise Security',
      status: 'Completed',
      items: ['Dual-token JWT', 'HTTP-Only cookies', 'Session hydration', 'MongoDB refresh arrays']
    },
    {
      phase: 'Phase 3',
      title: 'AI Diagnostic Engine',
      status: 'In Progress',
      items: ['Gemini SDK integration', 'Step-by-step error checking', 'AI-assisted grading']
    },
    {
      phase: 'Phase 4 & 5',
      title: 'Thermodynamics & QA',
      status: 'Upcoming',
      items: ['Calorimetry simulations', 'Redox Potentiometry', 'TestSprite E2E pipeline']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-inter selection:bg-slate-900 selection:text-white">
      {/* 1. MINIMALIST NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-6 h-16 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>
          <div className="flex items-center gap-4">
             <span className="hidden md:block text-[10px] font-bold text-slate-400 tracking-widest uppercase">FYP Case Study</span>
             <button
              onClick={onOpenContact}
              className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
            >
              Contact Author
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-6 py-12 space-y-24">
        
        {/* 2. HERO SECTION & BENTO METADATA */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <motion.div variants={itemVariants} className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Technical Spotlight
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Virtual Chemistry Lab
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              A browser-based 3D chemistry lab that removes safety risks and equipment costs from student experiments.
            </p>
          </motion.div>

          {/* BENTO GRID: Prioritizes visuals and key metrics */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div variants={itemVariants} className="md:col-span-2 p-8 bg-slate-900 rounded-3xl text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
               <div className="relative z-10">
                <div className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4">Core Engine</div>
                <h3 className="text-2xl font-bold mb-2 text-pretty">WebGL 60 FPS Physics Pipeline</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Three.js renders the 3D lab while Redux manages experiment state so results stay consistent.</p>
               </div>
               <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                  {['React 19', 'Three.js', 'Redux', 'GLSL'].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-[11px] font-medium border border-white/10">{t}</span>
                  ))}
               </div>
               {/* Decorative Background Icon */}
               <FlaskConical className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Security</div>
              <div className="space-y-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-lg leading-tight">Dual-Token JWT Auth</h4>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Status</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-bold text-lg">Phase 2 Live</span>
                </div>
                <p className="text-xs text-slate-500">Currently integrating Gemini AI Diagnostics.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 3. NARRATIVE: PROBLEM VS SOLUTION (SPLIT CONTRAST) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-12 rounded-4xl overflow-hidden border border-slate-200 shadow-2xl"
        >
           <motion.div variants={itemVariants} className="md:col-span-5 bg-slate-50 p-10 md:p-14 border-b md:border-b-0 md:border-r border-slate-200">
              <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase">The Friction</span>
              <h3 className="text-3xl font-bold mt-4 text-slate-900">Barriers to Physical Science</h3>
              <p className="text-slate-600 mt-6 leading-relaxed italic text-sm">
                "Traditional labs face 3 core bottlenecks: physical safety risks, consumable costs, and delayed feedback during over-titration."
              </p>
              <div className="mt-8 space-y-3">
                {['Glassware Breakage', 'Chemical Waste', 'Limited Access'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                    <X className="w-3.5 h-3.5 text-red-400" /> {item}
                  </div>
                ))}
              </div>
           </motion.div>
           <motion.div variants={itemVariants} className="md:col-span-7 bg-white p-10 md:p-14">
              <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase">The Resolution</span>
              <h3 className="text-3xl font-bold mt-4 text-slate-900">Deterministic Simulation</h3>
              <p className="text-slate-600 mt-6 leading-relaxed text-base">
                A browser-accessible 3D rig that delivers native performance. By decoupling the <strong>60 FPS graphics loop</strong> from the React state, I achieved a fluid UX that provides real-time telemetry and error detection without the safety overhead.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                   <div className="text-2xl font-bold text-slate-900">60 FPS</div>
                   <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Render Performance</div>
                </div>
                <div>
                   <div className="text-2xl font-bold text-slate-900">0.0%</div>
                   <div className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Physical Risk</div>
                </div>
              </div>
           </motion.div>
        </motion.section>

        {/* 4. SHOWCASE GALLERY */}
        <section className="space-y-8">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-900">Interface Modules</h2>
                <p className="text-slate-500 text-sm">Engineered for clarity and academic precision.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { img: labScreenshot, title: 'WebGL Workbench', label: '3D Scene' },
               { img: reportScreenshot, title: 'Telemetry Data', label: 'Analytics' },
               { img: authScreenshot, title: 'XSS-Hardened Auth', label: 'Security' }
             ].map((item, i) => (
               <button 
                key={i}
                onClick={() => setActiveModalImage({ src: item.img, title: item.title })}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 transition-all hover:shadow-lg text-left"
               >
                 <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                      <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" />
                    </div>
                 </div>
                 <div className="p-3 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase mb-0.5">{item.label}</div>
                      <div className="text-sm font-bold text-slate-900">{item.title}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                 </div>
               </button>
             ))}
           </div>
        </section>

        {/* 5. ROADMAP: PROGRESSIVE DISCLOSURE (ACCORDIONS) */}
        <section className="bg-white border border-slate-200 rounded-4xl p-10 md:p-14 space-y-10 shadow-sm">
           <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">Project Roadmap</h2>
              <p className="text-slate-500 text-sm">Development timeline from prototype to current features.</p>
           </div>

           <div className="space-y-3">
              {roadmapPhases.map((phase, idx) => (
                <details key={idx} className="group bg-slate-50 rounded-2xl border border-slate-200 transition-all open:bg-white open:shadow-md">
                   <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <div className="flex items-center gap-6">
                         <span className="text-xs font-bold text-slate-400 tabular-nums">{phase.phase}</span>
                         <h4 className="text-base font-bold text-slate-900">{phase.title}</h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                          phase.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          phase.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-white text-slate-400 border-slate-200'
                        }`}>
                          {phase.status}
                        </span>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                      </div>
                   </summary>
                   <div className="px-12 pb-8 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {phase.items.map((item, i) => (
                           <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                             <CheckCircle2 className={`w-4 h-4 ${phase.status === 'Completed' ? 'text-emerald-500' : 'text-slate-300'}`} />
                             {item}
                           </div>
                         ))}
                      </div>
                   </div>
                </details>
              ))}
           </div>
        </section>

        {/* 6. BOTTOM CTA */}
        <section className="bg-slate-900 rounded-4xl p-10 md:p-14 text-center space-y-8 shadow-2xl relative overflow-hidden">
           <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold text-white">Review the Full Architecture</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm">
                Interested in the Three.js shader implementation or the MERN security model? Let's discuss the research thesis.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                 <button onClick={onBack} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-all border border-white/10">
                   Back to Home
                 </button>
                 <button onClick={onOpenContact} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-all shadow-lg flex items-center justify-center gap-2">
                   Contact Lead Developer <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
           {/* Visual BG element */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[120px]" />
        </section>

      </main>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <span className="text-sm font-bold text-slate-900">{activeModalImage.title}</span>
                 <button onClick={() => setActiveModalImage(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-500" />
                 </button>
              </div>
              <img src={activeModalImage.src} className="w-full h-auto max-h-[80vh] object-contain" alt="Enlarged view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-slate-200 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} CS Scholar &bull; Built with React 19 & Three.js
      </footer>
    </div>
  );
};