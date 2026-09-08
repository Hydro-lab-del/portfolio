import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { containerVariants, itemVariants } from '@/animations/variants';
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  Server,
  Maximize2,
  X,
  ExternalLink,
  Bell,
  Trash2,
  CheckSquare,
  Mail,
  Layers
} from 'lucide-react';

import dashboardScreenshot from '../../assets/dashboard.png';

export const NotesNestPage = ({ onOpenContact }) => {
  const navigate = useNavigate();
  const [activeModalImage, setActiveModalImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveModalImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0F172A] selection:text-white flex flex-col"
    >
      {/* 1. STICKY HEADER */}
      <motion.header variants={itemVariants} className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 w-full">
        <div className="flex justify-between items-center w-full px-6 max-w-container-max mx-auto h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-3">
            <a href="https://notenest-web.vercel.app/welcome" target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2">
              Live Demo <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.header>

      <main className="max-w-container-max mx-auto px-6 py-12 space-y-24 w-full">
        
        {/* 2. HERO & BENTO METADATA */}
        <motion.section variants={itemVariants} className="space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Productivity Suite
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">NotesNest</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              A fast, secure note-taking workspace with a rich-text editor and instant UI updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 p-8 bg-[#0F172A] rounded-3xl text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
               <div className="relative z-10">
                <div className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">Architecture</div>
                <h3 className="text-2xl font-bold mb-2">MERN Cluster</h3>
                <p className="text-slate-400 text-sm">Full-stack synchronization with TipTap rich-text extensions and MongoDB persistence.</p>
               </div>
               <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                  {['Express 5', 'React 19', 'Mongoose 9', 'TipTap 3'].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-[11px] border border-white/10">{t}</span>
                  ))}
               </div>
               <Layers className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
            </div>

            <div className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="text-slate-400 text-[10px] font-bold uppercase mb-4">Sync Speed</div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-slate-900">15ms</div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">Optimistic Latency</p>
              </div>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="text-slate-400 text-[10px] font-bold uppercase mb-4">Security</div>
              <div className="space-y-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-lg leading-tight">XSS Hardened</h4>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 3. CORE TECHNICAL PILLARS */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Engineering Highlights</h2>
            <p className="text-slate-500 text-sm">Building a resilient productivity pipeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar: Security */}
            <div className="p-10 bg-white border border-slate-200 rounded-4xl space-y-6 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <ShieldCheck className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold">In-Memory JWT & Session Hydration</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 Access tokens are stored strictly in memory to eliminate XSS surface area, while multi-session persistence is handled via HTTP-Only Lax cookies and MongoDB refresh token arrays.
               </p>
            </div>

            {/* Pillar: Optimistic UI */}
            <div className="p-10 bg-white border border-slate-200 rounded-4xl space-y-6 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                 <Zap className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold">State Mutation & Error Rollback</h3>
               <p className="text-slate-600 text-sm leading-relaxed">
                 Implemented instant UI feedback for note pinning and deletion. In the event of network failure, the application automatically triggers a state rollback to ensure data consistency.
               </p>
            </div>
          </div>
        </motion.section>

        {/* 4. PERFORMANCE GRID (BENTO LIGHT) */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white overflow-hidden relative">
            <div className="md:col-span-7 space-y-6 relative z-10">
               <span className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">Performance Engine</span>
               <h2 className="text-3xl font-bold leading-tight">Infinite Masonry & 400ms Debounced Queries</h2>
               <p className="text-slate-400 leading-relaxed text-sm">
                 Search queries are debounced to avoid flooding the server — this reduced API calls by ~80% and keeps scrolling smooth.
               </p>
               <div className="flex gap-8 pt-4">
                  <div>
                    <div className="text-2xl font-bold">80%</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Load Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">60</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Stable FPS</div>
                  </div>
               </div>
            </div>
            <div className="md:col-span-5 bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-center gap-4 relative z-10 backdrop-blur-sm">
               <div className="flex items-center gap-3">
                 <CheckSquare className="text-emerald-400 w-5 h-5" />
                 <span className="text-sm">IntersectionObserver Pagination</span>
               </div>
               <div className="flex items-center gap-3">
                 <Mail className="text-blue-400 w-5 h-5" />
                 <span className="text-sm">Brevo Automated Email Workers</span>
               </div>
               <div className="flex items-center gap-3">
                 <Bell className="text-amber-400 w-5 h-5" />
                 <span className="text-sm">Node-Cron Background Scheduler</span>
               </div>
            </div>
        </motion.section>

        {/* 5. SCREENSHOT PREVIEW */}
        <motion.section variants={itemVariants} className="space-y-6">
           <button 
             onClick={() => setActiveModalImage({ src: dashboardScreenshot, title: 'Dashboard Interface' })}
             className="group relative w-full aspect-video rounded-4xl overflow-hidden border border-slate-200 bg-white p-2"
           >
              <div className="w-full h-full rounded-3xl overflow-hidden relative">
                <img 
                  src={dashboardScreenshot} 
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Dashboard" 
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 flex items-center justify-center transition-colors">
                   <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                </div>
              </div>
           </button>
        </motion.section>

        {/* 6. CALL TO ACTION */}
        <motion.section variants={itemVariants} className="p-12 bg-white rounded-4xl border border-slate-200 text-center space-y-6 shadow-sm">
           <h3 className="text-2xl font-bold">Ready to analyze the production code?</h3>
           <p className="text-slate-500 text-sm max-w-xl mx-auto">
             Discuss the Mongoose schema design, the TipTap sanitization logic, or the secure refresh-token lifecycle.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl border border-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors">Back Home</button>
              <button onClick={() => onOpenContact()} className="px-8 py-3 rounded-xl bg-[#0F172A] text-white text-sm font-bold hover:bg-slate-800 transition-colors">Contact Me</button>
           </div>
        </motion.section>

      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl" onClick={() => setActiveModalImage(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
               <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <span className="text-sm font-bold">{activeModalImage.title}</span>
                  <button onClick={() => setActiveModalImage(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <img src={activeModalImage.src} className="w-full h-auto max-h-[80vh] object-contain" alt="Preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-slate-200 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} CS Scholar &bull; NotesNest Case Study
      </footer>
    </motion.div>
  );
};