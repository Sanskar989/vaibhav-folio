import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, ExternalLink } from 'lucide-react';
import { useDataStore } from '../../store/useDataStore';

export default function VerifiedProfileCard() {
  const { data } = useDataStore();
  const { profile } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card p-8 border-brand-accent/20 relative overflow-hidden group max-w-sm mx-auto"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-purple-400 to-brand-accent" />
      
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-white/5 bg-brand-accent/10 flex items-center justify-center relative z-10 overflow-hidden">
            <img src="/vaibhav-photo.png" alt="Vaibhav Goyal" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 border-4 border-brand-bg z-20" title="Verified Creator">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
          {profile.name}
        </h3>
        <p className="text-brand-accent font-mono text-[10px] uppercase tracking-widest mt-1 mb-4">
          {profile.title}
        </p>

        <div className="flex items-center gap-2 text-brand-muted text-sm mb-6">
          <MapPin className="w-4 h-4" />
          {profile.location}
        </div>

        <div className="grid grid-cols-2 w-full gap-4 mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="font-display font-bold text-white text-lg">3+</div>
            <div className="text-[9px] font-mono text-brand-muted uppercase tracking-widest mt-1">Years Exp</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="font-display font-bold text-white text-lg">14+</div>
            <div className="text-[9px] font-mono text-brand-muted uppercase tracking-widest mt-1">Certificates</div>
          </div>
        </div>

        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm text-white transition-colors flex items-center justify-center gap-2">
          Contact Me <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
