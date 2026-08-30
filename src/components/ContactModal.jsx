import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Send, Check, Copy } from 'lucide-react';
import { SCHOLAR_INFO } from '../data/scholarData';

export const ContactModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Research & Systems Collaboration');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SCHOLAR_INFO.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setSubmitError('Copy is unavailable here. Please select the email address manually.');
    }
  };

  const handleMailtoFallback = () => {
    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject}`);
    const encodedBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    window.location.href = `mailto:${SCHOLAR_INFO.contactEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SCHOLAR_INFO.contactEmail}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _subject: `[Portfolio Inquiry] ${subject} - from ${name.trim()}`,
          inquiry_topic: subject,
          message: message.trim(),
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok && data.success !== 'true' && data.success !== true) {
        throw new Error(data.message || 'Submission failed');
      }

      setIsSent(true);
    } catch {
      handleMailtoFallback();
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-lg bg-white border border-[#E5E7EB] rounded-2xl soft-shadow overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#0F172A]" />
            <h3 id="contact-dialog-title" className="font-headline-md text-base font-bold text-[#0F172A]">Get in Touch</h3>
          </div>
          <button
            type="button"
              aria-label="Close contact dialog"
            onClick={onClose}
              className="focus-ring p-1.5 text-[#64748B] hover:text-[#0F172A] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {isSent ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-headline-md text-lg font-bold text-[#0F172A]">Message Dispatched</h4>
              <p className="font-body-sm text-xs text-[#64748B] max-w-xs mx-auto">
                Thank you, {name}. Your transmission has been logged. Expect a response at {email} within 24 hours.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#0F172A] text-white rounded-xl font-label-sm text-xs hover:bg-[#334155] cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick direct contact pill */}
              <div className="flex items-center justify-between p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl font-label-sm text-xs">
                <div className="flex items-center gap-2 text-[#334155] truncate">
                  <Mail className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span className="truncate">{SCHOLAR_INFO.contactEmail}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#0F172A] flex items-center gap-1 font-medium transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <label htmlFor="contact-name" className="block font-label-sm text-xs font-medium text-[#334155] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Alex Vance"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-label-sm text-xs font-medium text-[#334155] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.vance@institution.edu"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block font-label-sm text-xs font-medium text-[#334155] mb-1">
                  Topic / Area of Inquiry
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A] bg-white cursor-pointer"
                >
                  <option value="Research & Systems Collaboration">Research & Systems Collaboration</option>
                  <option value="Robotics & Firmware Engineering">Robotics & Firmware Engineering</option>
                  <option value="WebGL Simulation Graphics">WebGL Simulation Graphics</option>
                  <option value="General Technical Inquiry">General Technical Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-label-sm text-xs font-medium text-[#334155] mb-1">
                  Transmission Message
                </label>
                <textarea
                  required
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide project overview, timeline, or research scope..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5E7EB] font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A] resize-none"
                />
              </div>

              {submitError && (
                <p role="alert" className="font-body-sm text-xs text-red-700">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#0F172A] hover:bg-[#334155] disabled:opacity-50 text-white rounded-xl font-label-md text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting Data...' : 'Dispatch Message'}</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
