import React from 'react';
import { motion } from 'motion/react';
import { SCHOLAR_INFO } from '../data/scholarData';

export const Footer = ({ onOpenContact }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#F9FAFB] border-t border-[#E5E7EB] w-full"
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-12 py-12 max-w-[1120px] mx-auto gap-6">
        {/* Copyright notice */}
        <div className="font-label-md text-label-md text-[#0F172A] text-center md:text-left">
          © {new Date().getFullYear()} {SCHOLAR_INFO.name}. All rights reserved.
        </div>

        {/* External Profile Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={SCHOLAR_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#334155] hover:text-[#0F172A] transition-colors font-body-sm text-body-sm hover:underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={SCHOLAR_INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#334155] hover:text-[#0F172A] transition-colors font-body-sm text-body-sm hover:underline underline-offset-4"
          >
            LinkedIn
          </a>
          
          <button
            type="button"
            onClick={onOpenContact}
            className="text-[#334155] hover:text-[#0F172A] transition-colors font-body-sm text-body-sm cursor-pointer hover:underline underline-offset-4"
          >
            Email
          </button>
        </div>
      </div>
    </motion.footer>
  );
};
