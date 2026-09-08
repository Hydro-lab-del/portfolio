import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Layers, Database, Info, X } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/scholarData';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const CATEGORY_ICONS = {
  code: Code,
  layers: Layers,
  memory: Database,
  database: Database,
};

export const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const getCategoryIcon = (iconName) => {
    const Icon = CATEGORY_ICONS[iconName] || CATEGORY_ICONS.code;
    return <Icon className="h-5 w-5 text-[#0F172A]" aria-hidden="true" />;
  };

  return (
    <section className="bg-white py-20 border-b border-[#E5E7EB]" id="skills">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-[#0F172A] uppercase tracking-wider">
            <span>// CAPABILITIES</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-[#0F172A] tracking-tight">
            Technical Competencies
          </h2>
          <p className="text-[#334155] font-body-md text-body-md">
            Production-ready technologies across the modern MERN stack ecosystem.
          </p>
        </motion.div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              id={`skills-card-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-8 soft-shadow flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="h-10 w-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center border border-[#E5E7EB] mb-6 text-[#0F172A] shadow-2xs">
                  {getCategoryIcon(category.icon)}
                </div>

                {/* Category Title */}
                <h4 className="font-label-md text-label-md text-[#0F172A] mb-6">
                  {category.title}
                </h4>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      key={skill.name}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className="bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0F172A] px-3 py-1.5 rounded-md font-label-sm text-label-sm border border-[#E5E7EB] transition-colors cursor-pointer text-left shadow-2xs"
                      title="Click to view competency details"
                    >
                      {skill.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Skill Detail Popover / Inspector */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl flex items-start justify-between gap-4 soft-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#0F172A] text-white rounded-xl mt-0.5 shadow-xs">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-headline-md text-xl text-[#0F172A] font-bold">{selectedSkill.name}</span>
                    <span className="font-label-sm text-label-sm bg-[#0F172A] text-white px-2.5 py-0.5 rounded-md">
                      {selectedSkill.role || 'Core MERN'}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#334155]">
                      Domain: {selectedSkill.experience}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-[#334155] leading-relaxed max-w-3xl">
                    {selectedSkill.description}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="p-1.5 text-[#334155] hover:text-[#0F172A] hover:bg-[#F3F4F6] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
