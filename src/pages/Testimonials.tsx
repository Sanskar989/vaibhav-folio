import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Mountain, Trophy, Lightbulb, Palette } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';

const achievementIcons = [Trophy, BookOpen, Award, Mountain, Lightbulb, Palette];

export default function Testimonials() {
  const { data } = useDataStore();

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">ACHIEVEMENTS</h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Milestones & Certifications</p>
      </div>

      <div className="mb-20">
        <h2 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-brand-accent" /> Key Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.achievements?.map((achievement, idx) => {
            const Icon = achievementIcons[idx % achievementIcons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card p-6 border-brand-accent/20 hover:border-brand-accent/40 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/20 shrink-0">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed group-hover:text-white transition-colors">{achievement}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Award className="w-6 h-6 text-brand-accent" /> Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.certificates?.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                <span className="text-sm text-brand-muted group-hover:text-white transition-colors">{cert}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
