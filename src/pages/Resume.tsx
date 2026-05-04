import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, GraduationCap, Briefcase, Award, Code, Languages, Heart } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';
import { HOBBIES } from '../lib/defaultData';

const RESUME_URL = "/vaibhav-goyal-resume.pdf";

export default function Resume() {
  const { data } = useDataStore();

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4"
        >
          MY RESUME
        </motion.h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm mb-8">Professional Profile & Qualifications</p>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          href={RESUME_URL}
          download="Vaibhav_Goyal_Resume.pdf"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(108,99,255,0.3)]"
        >
          <Download className="w-5 h-5" />
          Download Resume (PDF)
        </motion.a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
        {/* Left — Resume PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-brand-accent/20 border border-brand-accent/30">
              <FileText className="w-5 h-5 text-brand-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Resume Preview</h2>
          </div>

          <div className="glass-card border-brand-accent/20 rounded-2xl overflow-hidden relative">
            <iframe
              src={RESUME_URL}
              className="w-full border-0 rounded-2xl"
              style={{ height: '85vh', minHeight: '700px' }}
              title="Vaibhav Goyal Resume"
            />
          </div>

          <div className="flex justify-center mt-4">
            <a
              href={RESUME_URL}
              download="Vaibhav_Goyal_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl font-bold text-sm hover:bg-brand-accent/80 transition-colors shadow-lg shadow-brand-accent/20"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* Right — Resume Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <div className="glass-card p-6 border-brand-accent/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-purple-400 to-brand-accent" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Experience', value: '2+ Years', icon: Briefcase },
                { label: 'Certifications', value: '14+', icon: Award },
                { label: 'Education', value: 'MBA (Pursuing)', icon: GraduationCap },
                { label: 'Projects', value: '4+', icon: Code },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <stat.icon className="w-5 h-5 text-brand-accent mx-auto mb-2" />
                  <div className="font-display font-bold text-white text-lg">{stat.value}</div>
                  <div className="text-[9px] font-mono text-brand-muted uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="glass-card p-6 border-brand-accent/20">
            <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-accent" /> About
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed">{data.profile.about}</p>
          </div>

          {/* Experience */}
          <div className="glass-card p-6 border-brand-accent/20">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-accent" /> Experience
            </h3>
            <div className="space-y-4">
              {data.experience?.map((exp: any, idx: number) => (
                <div key={idx} className="relative pl-4 border-l-2 border-brand-accent/30">
                  <h4 className="text-white text-sm font-bold">{exp.role}</h4>
                  <p className="text-brand-accent font-mono text-[10px] uppercase tracking-widest">{exp.company} | {exp.location}</p>
                  <span className="text-brand-muted text-[10px] font-mono">{exp.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card p-6 border-brand-accent/20">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-accent" /> Education
            </h3>
            <div className="space-y-3">
              {data.education?.map((edu: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                  <div>
                    <h4 className="text-white text-sm font-medium">{edu.degree}</h4>
                    <p className="text-brand-muted text-xs">{edu.institution} ({edu.period})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card p-6 border-brand-accent/20">
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Code className="w-4 h-4 text-brand-accent" /> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills?.flatMap((group: any) => group.labels).map((skill: string, idx: number) => (
                <span key={idx} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-brand-muted hover:text-white hover:border-brand-accent/40 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="glass-card p-6 border-brand-accent/20">
            <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Languages className="w-4 h-4 text-brand-accent" /> Languages
            </h3>
            <div className="space-y-2">
              {data.languages?.map((lang, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-white text-sm">{lang.name}</span>
                  <span className="text-brand-accent font-mono text-[10px] uppercase">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="glass-card p-6 border-brand-accent/20">
            <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand-accent" /> Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {HOBBIES.map((hobby, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-brand-muted">
                  {hobby.emoji} {hobby.name}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={RESUME_URL}
            download="Vaibhav_Goyal_Resume.pdf"
            className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-brand-accent hover:text-white transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download Full Resume
          </a>
        </motion.div>
      </div>
    </div>
  );
}
