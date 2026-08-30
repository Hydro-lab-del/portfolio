import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, FileText } from 'lucide-react';
import { SCHOLAR_INFO } from '../data/scholarData';

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar = ({ onOpenResume, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-outline-variant w-full"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-12 max-w-container-max mx-auto h-16">
        {/* Brand Name */}
        <a
          href="#about"
          className="font-headline-md text-headline-md font-bold text-[#0F172A] tracking-tight hover:opacity-80 transition-opacity"
        >
          {SCHOLAR_INFO.name}
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`font-body-md text-body-md transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#0F172A] font-semibold'
                    : 'text-on-surface-variant hover:text-[#0F172A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Resume Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            id="navbar-resume-btn"
            onClick={onOpenResume}
            className="bg-[#0F172A] hover:bg-on-surface-variant text-white px-5 sm:px-6 py-2 rounded-xl font-label-md text-label-md transition-colors shadow-xs cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </motion.button>

            <button
            type="button"
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden px-6 py-4 bg-white border-b border-outline-variant flex flex-col space-y-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant hover:text-[#0F172A] py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};
