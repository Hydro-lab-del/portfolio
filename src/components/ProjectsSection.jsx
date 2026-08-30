import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Cpu, FileText, FlaskConical, Box } from 'lucide-react';
import { PROJECTS_DATA } from '../data/scholarData';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const ProjectsSection = ({ onSelectProject }) => {
  return (
    <section className="bg-[#F9FAFB] py-20 border-b border-outline-variant " id="projects">
      <div className="page-container flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-[#0F172A] uppercase tracking-wider">
            <span>// SELECTED WORKS</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-[#0F172A] tracking-tight">
            Selected Works
          </h2>
          <p className="text-on-surface-variant  font-body-md text-body-md max-w-2xl">
            A collection of systems architecture, hardware integrations, and full-stack platforms.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10">
          {PROJECTS_DATA.map((project, index) => {
            const isReverse = index % 2 === 1;
            const isChemistryLab = project.id === 'virtual-chemistry-lab';
            const isRobot = project.id === 'quadruped-robot-ai';

            return (
              <motion.article
                key={project.id}
                id={`project-card-${project.id}`}
                aria-labelledby={`project-title-${project.id}`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
                className={`surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md ${
                  isReverse ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Media Preview Container */}
                <button
                  type="button"
                  aria-label={`Open ${project.title} project`}
                  className={`group/img relative flex w-full cursor-pointer items-center justify-center overflow-hidden border-b bg-surface-variant  p-4 text-left sm:p-6 md:w-[62%] md:border-b-0 ${
                    isReverse ? 'md:border-l' : 'md:border-r'
                  } border-outline-variant `}
                  onClick={() => onSelectProject && onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    className={`aspect-video w-full rounded-xl border border-outline-variant shadow-sm transition-transform duration-500 group-hover/img:scale-[1.015] ${
                      isRobot 
                        ? 'object-contain bg-slate-900/5 p-1 sm:p-2' 
                        : 'object-cover'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Interactive view indicator */}
                  <div className="absolute inset-0 bg-[#0F172A]/0 group-hover/img:bg-[#0F172A]/10 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#0F172A] text-white font-label-sm text-label-sm px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                      {isChemistryLab ? (
                        <>
                          <FlaskConical className="w-3.5 h-3.5 text-blue-400" />
                          <span>Open FYP Project Deck</span>
                        </>
                      ) : isRobot ? (
                        <>
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Explore Robotics Case Study</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Launch Interactive View</span>
                        </>
                      )}
                    </span>
                  </div>
                </button>

                {/* Project Information */}
                <div className="flex flex-col justify-between gap-6 p-5 sm:p-6 lg:p-8 md:w-[38%]">
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-2.5 py-1 font-label-sm text-label-sm transition-colors ${
                            tag === 'Final Year Project' || tag === 'Interactive 3D GLB'
                              ? 'border-gray-300 bg-white font-semibold text-gray-900'
                              : 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        id={`project-title-${project.id}`}
                        className="font-title-lg text-title-lg text-[#0F172A] font-bold group-hover:text-slate-700 transition-colors"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 text-label-sm text-slate-500 font-label-sm">
                        {project.subtitle}
                      </p>
                      <p className="mt-3 font-body-md text-body-md text-on-surface-variant  leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Stats Grid */}
                    {project.stats && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        {project.stats.map((stat, i) => (
                          <div key={i} className="p-2 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                            <div className="text-[10px] text-slate-500 uppercase font-mono-code">{stat.label}</div>
                            <div className="text-xs font-bold text-slate-900 font-mono-code">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-outline-variant ">
                    <button
                      type="button"
                      id={`project-action-btn-${project.id}`}
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="inline-flex items-center gap-2 font-label-md text-label-md font-semibold text-[#0F172A] hover:text-slate-600 transition-colors group/link cursor-pointer"
                    >
                      <span>{project.actionText || 'Explore Project'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
