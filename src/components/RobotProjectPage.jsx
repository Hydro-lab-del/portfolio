import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { containerVariants, itemVariants } from '@/animations/variants';
import {
  ArrowLeft,
  Cpu,
  Sliders,
  Maximize2,
  X,
  CheckCircle2,
  Eye,
  Terminal,
  Mic,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Monitor
} from 'lucide-react';

import robotPreview from '../../assets/robot-preview.jpg';
import robotSchematic from '../../assets/robot-schematic.svg';
import robotCompanion from '../../assets/robot-companion.png';

export const RobotProjectPage = ({ onOpenContact }) => {
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
      title: '3D PLA Chassis & Servo Calibration',
      status: 'Completed',
      items: [
        'Lightweight 3D-printed PLA frame with minimal supports',
        'SG90 servo horn alignment & zero-offset calibration',
        'Center of gravity & weight balance distribution',
        'Mechanical joint friction reduction'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'ESP32-S2 Firmware & Kinematics Engine',
      status: 'Completed',
      items: [
        'LOLIN ESP32-S2 Mini FreeRTOS multi-channel PWM control',
        'Inverse kinematics trigonometric solver for smooth gaits',
        'Pre-programmed movement emotes (Walk, Wave, Dance, Rest)',
        'Serial CLI terminal for instant telemetry & debugging'
      ]
    },
    {
      phase: 'Phase 3',
      title: '0.96" OLED Emotive Display & WiFi JSON API',
      status: 'Completed',
      items: [
        'SSD1306 128x64 I2C reactive emotive eye states',
        'Facial animations synchronized to physical gestures',
        'RESTful JSON API over WiFi for remote web/Python control',
        'Live system telemetry & battery status monitor'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Desktop Companion App & Voice AI Loop',
      status: 'Completed',
      items: [
        'Python desktop control suite with graphical UI',
        '"Hey Sesame" wake word & voice control loop',
        'Dual AI backend (Groq Llama-3 + Local fallback)',
        'Real-time virtual face emulator mirroring hardware OLED'
      ]
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
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700">
              <Sparkles className="w-3 h-3 text-cyan-600" /> Built on Open-Source Robotics
            </span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-[10px] font-bold uppercase tracking-wider">
              <Cpu className="w-3 h-3 text-cyan-600" /> Embedded Systems & Robotics
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
              Quadruped Robot Platform
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              An accessible quadruped robot built upon open-source robotics architecture, powered by a LOLIN ESP32-S2 Mini, 0.96&quot; I2C OLED emotive display, SG90 servo kinematics, and a custom Desktop Companion application with Voice & AI control.
            </p>
          </motion.div>

          {/* BENTO GRID */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div variants={itemVariants} className="md:col-span-2 p-8 bg-slate-900 rounded-3xl text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4">Processing & Control Core</div>
                <h3 className="text-2xl font-bold mb-2">LOLIN ESP32-S2 Mini</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  240MHz single-core Tensilica LX7 processor driving multi-channel hardware PWM servo timers, WiFi RESTful JSON API endpoints, and real-time OLED graphics.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                {['ESP32-S2 Mini', 'SG90 Servos', '0.96" OLED I2C', 'Desktop Companion', 'Groq AI + Local', '3D PLA'].map(t => (
                  <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-[11px] font-medium border border-white/10">{t}</span>
                ))}
              </div>
              <Cpu className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Actuation</div>
              <div className="space-y-2">
                <Sliders className="w-5 h-5 text-cyan-600" />
                <h4 className="font-bold text-lg leading-tight">SG90 Micro Servos</h4>
                <p className="text-xs text-slate-500">Kinematic leg articulation for walk, dance, wave, bow, and swim emotes.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Emotive Display</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-lg">0.96&quot; OLED</span>
                </div>
                <p className="text-xs text-slate-500">128x64 I2C reactive face with synchronized expressive eye states.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* 3. CORE ARCHITECTURE SPECIFICATIONS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Hardware & Component Specs</h2>
            <p className="text-slate-500 text-sm">Key architectural components powering the robotic platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Component 1: ESP32-S2 Mini */}
            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-700">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">LOLIN ESP32-S2 Mini</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Compact, breadboard-friendly MCU with 4MB Flash, 2MB PSRAM, native USB Type-C, and high-frequency PWM generator outputs.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 240MHz Single-Core LX7 Processor
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 27x GPIO with Hardware Timers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 802.11 b/g/n WiFi + JSON REST API
                </li>
              </ul>
            </motion.div>

            {/* Component 2: SG90 Micro Servos */}
            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">SG90 Micro Servos</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lightweight 9g micro servo motors calibrated for precision rotation, driving multi-axis kinematic leg movement and emotive body gestures.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 1.8 kg-cm Stall Torque at 4.8V
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 0.10 sec/60° Operating Speed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 500–2500µs PWM Pulse Calibration
                </li>
              </ul>
            </motion.div>

            {/* Component 3: 0.96" OLED Display */}
            <motion.div variants={itemVariants} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-700">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">0.96&quot; I2C OLED (SSD1306)</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                128x64 high-contrast monochrome OLED display mounted to the chassis face for expressive emotive visual states and live metrics.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 128x64 Crisp Monochrome Pixels
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> 400kHz Fast I2C Bus (SDA/SCL)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /> Synchronized Eye Animation Library
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* 4. COMPANION APP SPOTLIGHT */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-12 rounded-4xl overflow-hidden border border-slate-200 shadow-2xl"
        >
          <motion.div variants={itemVariants} className="md:col-span-6 bg-slate-900 p-10 md:p-14 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                <Monitor className="w-3 h-3" /> Fully Operational Application
              </div>
              <h3 className="text-3xl font-bold">Sesame Desktop Companion</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A purpose-built desktop control and conversational AI hub communicating with the robot over Wi-Fi network sockets and serial telemetry.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1">
                    <Sliders className="w-4 h-4" /> Movement Suite
                  </div>
                  <p className="text-[11px] text-slate-400">Walk, Dance, Crab Walk, Wiggle, Wave, Bow, Pushup & Swim.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                    <MessageSquare className="w-4 h-4" /> Dual AI Engine
                  </div>
                  <p className="text-[11px] text-slate-400">Groq Llama-3 cloud intelligence with local state fallback.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
                    <Mic className="w-4 h-4" /> Voice Control Loop
                  </div>
                  <p className="text-[11px] text-slate-400">&quot;Hey Sesame&quot; wake word with pyttsx3 & Gemini TTS.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                    <Eye className="w-4 h-4" /> Face Simulator
                  </div>
                  <p className="text-[11px] text-slate-400">Real-time virtual OLED emulator mirroring physical screen.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>STATUS: CONNECTED (192.168.100.97)</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE TELEMETRY
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-6 bg-slate-950 p-4 flex items-center justify-center">
            <button
              onClick={() => setActiveModalImage({ src: robotCompanion, title: 'Sesame Desktop Companion UI' })}
              className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={robotCompanion}
                alt="Sesame Desktop Companion Interface"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xl">
                  <Maximize2 className="w-4 h-4" /> Click to Enlarge Companion UI
                </span>
              </div>
            </button>
          </motion.div>
        </motion.section>

        {/* 5. SHOWCASE GALLERY */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">Hardware & Interface Showcase</h2>
              <p className="text-slate-500 text-sm">Visual assets of the physical robot build, desktop companion, and electrical schematic.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: robotPreview, title: 'Quadruped 3D-Printed Prototype', label: 'Physical Build' },
              { img: robotCompanion, title: 'Sesame Desktop Companion UI', label: 'Desktop Software' },
              { img: robotSchematic, title: 'ESP32-S2 & Servo Wiring Schematic', label: 'Schematic' }
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
                    className="w-full h-full object-contain p-1 transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5" />
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-cyan-600 uppercase mb-0.5">{item.label}</div>
                    <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 6. ROADMAP: PROGRESSIVE DISCLOSURE */}
        <section className="bg-white border border-slate-200 rounded-4xl p-10 md:p-14 space-y-10 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Platform Milestones & Roadmap</h2>
            <p className="text-slate-500 text-sm">Strategic progression from 3D printing and firmware calibration to conversational desktop companion.</p>
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
                      phase.status === 'In Progress' ? 'bg-cyan-50 text-cyan-700 border-cyan-100' : 'bg-white text-slate-400 border-slate-200'
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {phase.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
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
        &copy; {new Date().getFullYear()} CS Scholar &bull; Quadruped Robotics Platform
      </footer>
    </div>
  );
};