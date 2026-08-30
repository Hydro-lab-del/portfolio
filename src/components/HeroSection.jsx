import { motion } from 'motion/react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '@/animations/variants';
import { SCHOLAR_INFO } from '../data/scholarData';
import { InteractiveHeroGraphic } from './InteractiveHeroGraphic';

export const HeroSection = () => {
  return (
    <section className="overflow-hidden border-b border-outline-variant bg-white py-14 sm:py-20" id="about">
      <div className="page-container flex flex-col items-center gap-10 sm:gap-12 md:flex-row">
        {/* Left Column Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6 md:w-1/2"
        >
          <motion.div
            variants={itemVariants}
            className="bg-surface-variant text-[#0F172A] px-4 py-1.5 rounded-md font-label-sm text-label-sm border border-outline-variant inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{SCHOLAR_INFO.badge || "Documentation Ready"}</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="type-display text-[#1C1917]"
          >
            {SCHOLAR_INFO.tagline}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl font-body-lg text-body-lg text-[#1C1917]"
          >
            {SCHOLAR_INFO.subtitle}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="max-w-xl font-body-md text-body-md leading-relaxed text-[#7F7663]"
          >
            {SCHOLAR_INFO.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              id="hero-view-projects-btn"
              className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#2f4a3a] px-6 py-2.5 font-label-md text-label-md text-white shadow-xs transition-colors hover:bg-[#1f3528]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="/resume.pdf"
              download="CS_Scholar_CV.pdf"
              id="hero-download-resume-btn"
              className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#EAE1D4] bg-white px-6 py-2.5 font-label-md text-label-md text-[#1C1917] transition-colors hover:bg-[#F7F4EE]"
            >
              <Download className="h-4 w-4 text-[#2f4a3a]" aria-hidden="true" />
              <span>Download Academic CV</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex w-full flex-col items-center justify-center md:w-1/2"
        >
          <InteractiveHeroGraphic />
        </motion.div>
      </div>
    </section>
  );
};
