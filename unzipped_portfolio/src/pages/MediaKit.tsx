import React from 'react';
import { motion } from 'motion/react';
import { Download, Users, Target, Globe } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';

export default function MediaKit() {
  const { data } = useDataStore();

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">MEDIA KIT</h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Partnerships & Analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 border-brand-accent/20 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Audience & Reach</h3>
            <p className="text-brand-muted text-sm leading-relaxed mb-8">
              Engaging a high-intent travel audience across US and UAE markets. My followers are adventure seekers, luxury travelers, and cultural explorers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">12.4K</div>
              <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">Instagram</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">5.2K</div>
              <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">LinkedIn</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">8%</div>
              <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">Engagement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">US/UAE</div>
              <div className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">Top Locations</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 border-brand-accent/20 bg-brand-accent/5 relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-accent/20 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-2xl font-bold mb-6 text-white relative z-10">Collaboration Types</h3>
          <ul className="space-y-4 relative z-10">
            {[
              { icon: Target, text: 'Sponsored Content & Brand Ambassadorship' },
              { icon: Globe, text: 'Destination Marketing & Press Trips' },
              { icon: Users, text: 'UGC Creation & Storytelling' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-brand-muted text-sm">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <item.icon className="w-5 h-5 text-brand-accent" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <button className="px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform flex items-center gap-3">
          <Download className="w-5 h-5" />
          Download Full Media Kit (PDF)
        </button>
      </div>
    </div>
  );
}

