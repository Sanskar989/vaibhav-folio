import React from 'react';
import { motion } from 'motion/react';
import { useDataStore } from '../../store/useDataStore';
import { Plane, Briefcase, GraduationCap } from 'lucide-react';

export default function TravelTimeline() {
  const { data } = useDataStore();
  const { experience } = data;

  return (
    <div className="relative border-l border-brand-accent/30 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0 space-y-16">
      {/* Centered line for Desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-accent/0 via-brand-accent/30 to-brand-accent/0 -translate-x-1/2" />

      {experience.map((exp, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative flex flex-col md:flex-row items-center justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-37px] md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(108,99,255,0.6)] border-2 border-brand-bg z-10" />

            {/* Content Box */}
            <div className="w-full md:w-[45%]">
              <div className={`glass-card p-6 md:p-8 border-brand-accent/20 hover:border-brand-accent/50 transition-colors group relative overflow-hidden ${isEven ? 'md:text-right' : 'text-left'}`}>
                <div className="absolute -inset-1 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
                  <Briefcase className="w-4 h-4 text-brand-accent" />
                  <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest">{exp.type}</span>
                </div>
                
                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">{exp.role}</h3>
                <p className="text-brand-muted font-sans text-sm mb-4">{exp.company} • {exp.location}</p>
                
                <div className={`inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/80 mb-6 ${isEven ? 'md:mr-0' : ''}`}>
                  {exp.period}
                </div>
                
                <ul className={`space-y-2 text-sm text-brand-muted ${isEven ? 'md:items-end' : ''} flex flex-col`}>
                  {(exp.bullets || []).map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className={`flex items-start gap-2 ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
                      <span className="text-brand-accent mt-1 shrink-0 text-[10px]">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Spacer for other side */}
            <div className="hidden md:block w-[45%]" />
          </motion.div>
        );
      })}
    </div>
  );
}
