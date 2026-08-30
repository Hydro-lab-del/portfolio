import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, FileText, Plus, Lock, Unlock, Search, ShieldCheck, Database, Check } from 'lucide-react';
import { INITIAL_NOTES } from '../../data/scholarData';

export const NotesNestModal = ({ project, onClose }) => {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState(INITIAL_NOTES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedStatus, setSyncedStatus] = useState('SYNCED_CRDT');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const handleUpdateContent = (newContent) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNoteId ? { ...n, content: newContent, updatedAt: 'Just now' } : n))
    );
    setIsSyncing(true);
    setSyncedStatus('SYNCING...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedStatus('SYNCED_CRDT');
    }, 400);
  };

  const handleCreateNote = () => {
    const newId = `note-${Date.now()}`;
    const newNote = {
      id: newId,
      title: 'Untitled Document',
      category: 'Research',
      content: '### New Architecture Notes\n- Document systems requirements here...\n- CRDT node synchronized.',
      tags: ['Draft', 'MERN'],
      updatedAt: 'Just now',
      isEncrypted: true
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newId);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notesnest-dialog-title"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 id="notesnest-dialog-title" className="font-bold text-slate-900 text-base">{project?.title || 'NotesNest Cloud Workspace'}</h3>
              <p className="text-xs font-mono-code text-slate-500">MERN Stack • End-to-End Encrypted Markdown</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-mono-code">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{syncedStatus}</span>
            </div>

            <button
              type="button"
              aria-label="Close NotesNest project dialog"
              id="close-notes-modal-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Sidebar Note List (4 cols) */}
          <div className="md:col-span-4 bg-slate-50 p-4 flex flex-col gap-3 overflow-y-auto max-h-75 md:max-h-150">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 mr-2">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white rounded-lg border border-slate-200 text-xs font-mono-code text-slate-900 focus:outline-none focus:border-blue-900"
                />
              </div>

              <button
                type="button"
                id="create-note-btn"
                onClick={handleCreateNote}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                title="Create new markdown doc"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Note items */}
            <div className="space-y-2 mt-1">
              {filteredNotes.map((note) => {
                const isSelected = note.id === selectedNote.id;
                return (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => setSelectedNoteId(note.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-white border-blue-900/40 shadow-xs'
                        : 'bg-white/60 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900 truncate">{note.title}</span>
                      {note.isEncrypted ? (
                        <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                      ) : (
                        <Unlock className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {note.content.replace(/[#*`-]/g, '')}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px] font-mono-code text-slate-400">
                      <span>{note.category}</span>
                      <span>{note.updatedAt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editor & Preview Workspace (8 cols) */}
          <div className="md:col-span-8 p-6 flex flex-col gap-4 bg-white overflow-y-auto max-h-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setNotes((prev) =>
                      prev.map((n) => (n.id === selectedNoteId ? { ...n, title: newTitle } : n))
                    );
                  }}
                  className="text-lg font-bold text-slate-900 focus:outline-none focus:border-b-2 focus:border-blue-900 bg-transparent w-full"
                />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono-code text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedNote.category}
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">AES-256 Encrypted Payload</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code text-slate-500">Auto-sync:</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>

            {/* Markdown Textarea */}
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="notesnest-markdown-editor" className="text-xs font-mono-code text-slate-500">Markdown Buffer Editor</label>
              <textarea
                id="notesnest-markdown-editor"
                value={selectedNote.content}
                onChange={(e) => handleUpdateContent(e.target.value)}
                rows={12}
                className="w-full p-4 rounded-xl border border-slate-300 font-mono-code text-xs text-slate-900 focus:outline-none focus:border-blue-900 bg-slate-50/50 resize-y leading-relaxed"
                placeholder="Write structured markdown..."
              />
            </div>

            {/* Architecture Telemetry Footer */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-slate-600">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-900" />
                <span>MERN Cluster: Active (CRDT State: Converged)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                <span>Zero Packet Loss</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
