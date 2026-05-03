import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdminStore } from '../../store/useAdminStore';
import { Save, Eye, EyeOff, LogOut, Terminal } from 'lucide-react';
import { useDataStore } from '../../store/useDataStore';

export default function AdminToolbar() {
  const { isAdminUnlocked, lockAdmin } = useAdminStore();
  const { saveDraft, publishDraft, discardDraft, draftData } = useDataStore();

  if (!isAdminUnlocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-brand-bg/95 backdrop-blur-xl border border-brand-accent/40 px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(108,99,255,0.2)] flex items-center gap-4"
      >
        <div className="flex items-center gap-2 pr-6 border-r border-white/10">
          <Terminal className="w-5 h-5 text-brand-accent" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Admin Mode</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => saveDraft()}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            Save Draft
          </button>
          
          <button 
            onClick={() => publishDraft()}
            className="flex items-center gap-2 px-4 py-2 bg-brand-accent hover:bg-brand-accent/80 rounded-lg text-sm font-bold text-white transition-colors shadow-lg shadow-brand-accent/30"
          >
            <Eye className="w-4 h-4" />
            Publish
          </button>

          {draftData && (
            <button 
              onClick={() => discardDraft()}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-sm font-bold transition-colors"
            >
              Discard
            </button>
          )}
        </div>

        <button 
          onClick={lockAdmin}
          className="ml-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-brand-muted hover:text-white transition-colors"
          title="Lock Admin Mode"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
