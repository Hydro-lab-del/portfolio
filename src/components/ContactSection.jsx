import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  ExternalLink, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { SCHOLAR_INFO } from '../data/scholarData';

export const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Research & Systems Collaboration');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SCHOLAR_INFO.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setSubmitError('Clipboard access unavailable. Please copy manually.');
    }
  };

  const handleMailtoFallback = () => {
    const encodedSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${SCHOLAR_INFO.contactEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Direct Real Email Dispatch to j8881817@gmail.com via FormSubmit.co
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
    } catch (err) {
      console.warn('Direct web submission failed or blocked, falling back to mail client:', err);
      handleMailtoFallback();
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-20 border-b border-[#E5E7EB]" id="contact">
      <div className="page-container flex flex-col gap-12 max-w-[1120px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-[#0F172A] uppercase tracking-wider">
            <span>// GET IN TOUCH</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-[#0F172A] tracking-tight">
            Contact & Collaboration
          </h2>
          <p className="text-[#334155] font-body-md text-body-md max-w-2xl">
            Have a question, project idea, or job opportunity? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Connect & Social Links (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Primary Direct Email Card */}
            <div className="p-6 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-label-sm text-[11px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  &lt; 24h Response
                </span>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] text-sm">Direct Email Address</h4>
                <p className="text-xs text-slate-500 font-label-sm mt-0.5">Primary channel for academic & professional correspondence</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-mono-code">
                <span className="text-[#0F172A] font-semibold truncate select-all">{SCHOLAR_INFO.contactEmail}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#0F172A] flex items-center gap-1 font-medium transition-colors shrink-0 cursor-pointer ml-2"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* LinkedIn & GitHub Direct Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* LinkedIn */}
              <a
                href={SCHOLAR_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white hover:bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] transition-all hover:border-slate-400 group flex flex-col justify-between h-28 cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between text-[#0077B5]">
                  <Linkedin className="w-6 h-6" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0077B5] transition-colors" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#0F172A] group-hover:text-[#0077B5] transition-colors">LinkedIn Profile</div>
                  <div className="text-[11px] text-slate-500 font-label-sm truncate">Muhammad Junaid Ilyas</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={SCHOLAR_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white hover:bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] transition-all hover:border-slate-400 group flex flex-col justify-between h-28 cursor-pointer shadow-xs"
              >
                <div className="flex items-center justify-between text-[#0F172A]">
                  <Github className="w-6 h-6" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] transition-colors" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#0F172A] group-hover:text-slate-700 transition-colors">GitHub Repositories</div>
                  <div className="text-[11px] text-slate-500 font-label-sm truncate">Hydro-lab-del</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Embedded Transmission Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-xs"
          >
            {isSent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Message Sent!</h3>
                <p className="font-body-sm text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-[#0F172A]">{name}</span>. I got your message and will reply to <span className="font-semibold text-[#0F172A]">{email}</span> soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSent(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#0F172A] hover:bg-[#334155] text-white rounded-xl font-label-sm text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="block font-label-sm text-xs font-semibold text-[#334155] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block font-label-sm text-xs font-semibold text-[#334155] mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.vance@institution.edu"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-subject" className="block font-label-sm text-xs font-semibold text-[#334155] mb-1.5">
                    Subject / Area of Interest
                  </label>
                  <select
                    id="form-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A] cursor-pointer"
                  >
                    <option value="Research & Systems Collaboration">Research & Systems Collaboration</option>
                    <option value="Robotics & Firmware Engineering">Robotics & Firmware Engineering (ESP32 / Servos)</option>
                    <option value="WebGL Simulation Graphics">WebGL Simulation Graphics (Three.js)</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="form-message" className="block font-label-sm text-xs font-semibold text-[#334155] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details regarding your project scope, technical questions, or collaboration ideas..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white font-label-sm text-xs text-[#0F172A] focus:outline-none focus:border-[#0F172A] resize-none transition-colors"
                  />
                </div>

                {submitError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-label-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex-1 py-3 px-6 bg-[#0F172A] hover:bg-[#334155] disabled:opacity-50 text-white rounded-xl font-label-md text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMailtoFallback}
                    className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#334155] rounded-xl font-label-sm text-xs transition-colors cursor-pointer"
                  >
                    Open Mail App
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
