import { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Download, 
  Award, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Cpu, 
  Globe, 
  Database,
  ExternalLink,
  Mail,
  Github,
  Linkedin
} from 'lucide-react';
import { SCHOLAR_INFO } from '../data/scholarData';

export const ResumeModal = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-dialog-title"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-4xl bg-white border border-outline-variant rounded-2xl soft-shadow overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#0F172A]"
      >
        {/* Modal Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 sm:px-6 py-3.5 border-b border-outline-variant bg-[#F9FAFB] gap-3">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-[#0F172A]" />
            <h3 id="resume-dialog-title" className="font-headline-md text-sm sm:text-base font-bold text-[#0F172A]">
              Curriculum Vitae & Academic Credentials
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Junaid_Ilyas_CV.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A] hover:bg-on-surface-variant text-white rounded-lg font-label-sm text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-surface-variant transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-8 bg-white font-body-md text-[#0F172A]">
          
          {/* 1. Header Section */}
          <div className="border-b border-outline-variant pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-display-lg text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                {SCHOLAR_INFO.name}
              </h1>
              <span className="text-xs font-label-sm font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block w-fit">
                PEEF Merit Scholar
              </span>
            </div>

            <p className="text-on-surface-variant font-label-md text-sm font-semibold">
              Full-Stack MERN Developer • BS Computer Science (2023 — 2027)
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-label-sm text-xs text-[#64748B] pt-1">
              <a href={SCHOLAR_INFO.links.email} className="flex items-center gap-1.5 hover:text-[#0F172A] transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-700" />
                <span>{SCHOLAR_INFO.contactEmail}</span>
              </a>
              <span>•</span>
              <a href={SCHOLAR_INFO.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#0F172A] transition-colors">
                <Github className="w-3.5 h-3.5 text-slate-700" />
                <span>github.com/Hydro-lab-del</span>
              </a>
              <span>•</span>
              <a href={SCHOLAR_INFO.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#0F172A] transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>linkedin.com/in/muhammad-junaid-ilyas</span>
              </a>
            </div>
          </div>

          {/* 2. Academic Honors & Scholarships */}
          <div>
            <h4 className="font-label-sm text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Academic Honors & Scholarships
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-[#F9FAFB] rounded-xl border border-outline-variant">
                <div className="font-headline-md text-sm font-bold text-[#0F172A]">PEEF Excellence Scholarship</div>
                <div className="font-label-sm text-xs text-[#64748B] mt-0.5">Punjab Educational Endowment Fund</div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Prestigious merit scholarship awarded to top academic performers in computer science and engineering disciplines.
                </p>
              </div>

              <div className="p-4 bg-[#F9FAFB] rounded-xl border border-outline-variant">
                <div className="font-headline-md text-sm font-bold text-[#0F172A]">Dean's Honor List</div>
                <div className="font-label-sm text-xs text-[#64748B] mt-0.5">Academic Excellence Recognition</div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                  Consistently recognized on the Dean's Honor List for outstanding academic performance and leadership in computing coursework.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Education & Relevant Coursework */}
          <div>
            <h4 className="font-label-sm text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0F172A]" />
              Education & Relevant Coursework
            </h4>
            <div className="p-4 sm:p-5 border border-outline-variant rounded-xl bg-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-headline-md text-sm sm:text-base font-bold text-[#0F172A]">
                  Bachelor of Science in Computer Science
                </span>
                <span className="font-label-sm text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md w-fit">
                  2023 — 2027
                </span>
              </div>
              
              <div>
                <span className="font-label-sm text-xs font-semibold text-[#0F172A]">Core Computing Coursework:</span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Web Application Engineering, Database Management Systems (DBMS), Data Structures & Algorithms, Object-Oriented Programming (OOP), Computer Networks, Operating Systems, Software Engineering & System Design.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Technical Skills Matrix */}
          <div>
            <h4 className="font-label-sm text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" />
              Technical Skills & Competencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              
              {/* Core Languages */}
              <div className="p-3.5 bg-[#F9FAFB] rounded-xl border border-outline-variant space-y-1.5">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-600" />
                  <span>Core Languages</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  JavaScript (ES6+), HTML5, CSS3, SQL
                </p>
              </div>

              {/* Frontend Architecture */}
              <div className="p-3.5 bg-[#F9FAFB] rounded-xl border border-outline-variant space-y-1.5">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Frontend Architecture</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  React 19, Redux Toolkit, Tailwind CSS, Component Architecture, Responsive Web Design, REST API Integration.
                </p>
              </div>

              {/* Backend & Databases */}
              <div className="p-3.5 bg-[#F9FAFB] rounded-xl border border-outline-variant space-y-1.5">
                <div className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Backend & Databases</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Node.js, Express.js, MongoDB Atlas, Mongoose ODM, JWT Authentication, RESTful APIs, Postman, Git & GitHub.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Featured Technical Projects */}
          <div>
            <h4 className="font-label-sm text-xs font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-on-surface-variant" />
              Featured Technical Projects
            </h4>
            <div className="space-y-3">
              
              {/* Virtual Chemistry Lab */}
              <div className="p-4 sm:p-5 border border-outline-variant rounded-xl bg-[#F9FAFB] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-headline-md text-sm font-bold text-[#0F172A]">
                    Virtual Chemistry Lab Suite (BS CS FYP)
                  </div>
                  <span className="font-label-sm text-[11px] text-[#0F172A] bg-white px-2 py-0.5 rounded border border-outline-variant w-fit font-semibold">
                    MERN Stack • React 19 • Node.js • MongoDB Atlas
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Built an interactive 3D full-stack chemistry simulation platform with React 19, Three.js WebGL visuals, Node.js/Express backend APIs, and MongoDB Atlas persistence.
                </p>
              </div>

              {/* Quadruped Robot */}
              <div className="p-4 sm:p-5 border border-outline-variant rounded-xl bg-[#F9FAFB] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-headline-md text-sm font-bold text-[#0F172A]">
                     Quadruped Robot Platform (Hardware Showcase)
                  </div>
                   <span className="font-label-sm text-[11px] text-[#0F172A] bg-white px-2 py-0.5 rounded border border-outline-variant w-fit font-semibold">
                     ESP32-S2 Mini • SG90 Servos • Hardware Showcase
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                   Exploratory hardware & robotics project: Built a 3D-printed quadruped walking robot platform powered by an ESP32-S2 microcontroller, 0.96" I2C OLED display rendering dynamic expressions, and SG90 servo kinematics with desktop control.
                </p>
              </div>

              {/* NotesNest */}
              <div className="p-4 sm:p-5 border border-outline-variant rounded-xl bg-[#F9FAFB] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-headline-md text-sm font-bold text-[#0F172A]">
                    NotesNest — Modular Productivity Workspace
                  </div>
                  <span className="font-label-sm text-[11px] text-[#0F172A] bg-white px-2 py-0.5 rounded border border-outline-variant w-fit font-semibold">
                    MERN Stack • React 19 • Express 5 • MongoDB Atlas
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                   Built a modular full-stack productivity workspace featuring rich-text editing, MongoDB persistence, automated background reminders, and protected authentication.
                </p>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
