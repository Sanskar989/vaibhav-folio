import React from 'react';
import { motion } from 'motion/react';
import CinematicHero from '../components/sections/CinematicHero';
import AnimatedTravelGlobe from '../components/3d/AnimatedTravelGlobe';
import TravelTimeline from '../components/sections/TravelTimeline';
import VerifiedProfileCard from '../components/sections/VerifiedProfileCard';
import { useDataStore } from '../store/useDataStore';
import { SKILL_DATA, RADAR_DATA, HOBBIES } from '../lib/defaultData';
import { GraduationCap, FolderOpen, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function Home() {
  const { data } = useDataStore();

  return (
    <div className="min-h-screen">
      <CinematicHero />

      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
        <div>
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4">THE JOURNEY</h2>
            <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Milestones & Experiences</p>
          </div>
          <TravelTimeline />
        </div>

        <div className="hidden lg:block relative">
          <div className="sticky top-32">
            <VerifiedProfileCard />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-2 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-brand-accent" /> EDUCATION
        </h2>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm mb-10">Academic Background</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.education?.map((edu: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 border-brand-accent/20 hover:border-brand-accent/40 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-brand-accent uppercase tracking-widest">
                  {edu.period}
                </span>
                {edu.status && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
                    {edu.status}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-accent transition-colors">{edu.degree}</h3>
              <p className="text-brand-muted text-sm">{edu.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Charts */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-brand-accent/20">
          <h3 className="font-display text-2xl font-bold mb-6 text-white">Skill Proficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={SKILL_DATA} layout="vertical">
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="value" fill="#6C63FF" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-8 border-brand-accent/20">
          <h3 className="font-display text-2xl font-bold mb-6 text-white">Core Strengths</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(108,99,255,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Radar dataKey="A" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects Preview */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-2 flex items-center gap-3">
          <FolderOpen className="w-8 h-8 text-brand-accent" /> PROJECTS
        </h2>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm mb-10">Software Engineering & AI at Trip String</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects?.map((proj: any, idx: number) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6 border-brand-accent/20 hover:border-brand-accent/40 transition-colors group"
            >
              <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-accent transition-colors mb-2">{proj.title}</h3>
              <p className="text-brand-muted text-sm mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag: string, tIdx: number) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-brand-muted uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Tags */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="glass-card p-8 border-brand-accent/20">
          <h3 className="font-display text-2xl font-bold text-white mb-6">Skills</h3>
          <div className="space-y-6">
            {data.skills?.map((group: any, idx: number) => (
              <div key={idx}>
                <h4 className="text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-3">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.labels.map((label: string, lIdx: number) => (
                    <span key={lIdx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white hover:border-brand-accent/50 transition-colors">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Languages, Achievements, Hobbies */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 border-brand-accent/20">
          <h3 className="font-display text-2xl font-bold mb-6 text-white">Languages</h3>
          <ul className="space-y-4">
            {data.languages?.map((lang, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm">
                <span className="text-white font-medium">{lang.name}</span>
                <span className="text-brand-accent font-mono text-[10px] uppercase">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-8 border-brand-accent/20">
          <h3 className="font-display text-2xl font-bold mb-6 text-white">Hobbies</h3>
          <div className="flex flex-wrap gap-3">
            {HOBBIES.map((hobby, idx) => (
              <span key={idx} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-brand-muted hover:text-white transition-colors">
                {hobby.emoji} {hobby.name}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 border-brand-accent/20">
          <h3 className="font-display text-2xl font-bold mb-6 text-white">Achievements</h3>
          <ul className="space-y-3">
            {data.achievements?.slice(0, 4).map((achieve, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-brand-muted">
                <span className="text-brand-accent shrink-0">▸</span>
                <span className="line-clamp-2">{achieve}</span>
              </li>
            ))}
          </ul>
          <Link to="/testimonials" className="inline-flex items-center gap-1 text-brand-accent text-xs font-mono uppercase tracking-widest mt-4 hover:underline">
            View All <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <AnimatedTravelGlobe />
    </div>
  );
}
