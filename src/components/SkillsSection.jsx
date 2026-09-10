import React from 'react';
import { motion } from 'motion/react';
import { Code, Layers, Database } from 'lucide-react';
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
  const getCategoryIcon = (iconName) => {
    const Icon = CATEGORY_ICONS[iconName] || CATEGORY_ICONS.code;
    return <Icon className="h-5 w-5 text-[#0F172A]" aria-hidden="true" />;
  };

  return (
    <section className="bg-white py-20 border-b border-outline-variant" id="skills">
      <div className="max-w-container-max mx-auto px-4 sm:px-12 flex flex-col gap-12">
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
          <p className="text-on-surface-variant font-body-md text-body-md">
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
              className="bg-white border border-outline-variant rounded-2xl p-8 soft-shadow flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="h-10 w-10 rounded-lg bg-surface-variant flex items-center justify-center border border-outline-variant mb-6 text-[#0F172A] shadow-2xs">
                  {getCategoryIcon(category.icon)}
                </div>

                {/* Category Title */}
                <h4 className="font-label-md text-label-md text-[#0F172A] mb-6">
                  {category.title}
                </h4>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      whileHover={{ scale: 1.04 }}
                      key={skill.name}
                      className="bg-surface-variant text-[#0F172A] px-3 py-1.5 rounded-md font-label-sm text-label-sm border border-outline-variant shadow-2xs"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
