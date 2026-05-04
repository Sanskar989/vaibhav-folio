import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Globe, Cpu, Users, ArrowUpRight } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';

const collaborations = [
  {
    company: "Thrillophilia",
    role: "Operations Executive",
    period: "May 2023 - Oct 2023",
    description: "Managed tour operations for US and UAE regions, handling direct bookings and custom package creation. Coordinated end-to-end tour allotments and created attraction tickets and vouchers.",
    icon: Globe,
    tags: ["US Market", "UAE Market", "Tour Operations", "Custom Packages"],
  },
  {
    company: "Trip String (Goa DMC)",
    role: "Sales & Operations Intern / Software Engineering & AI Intern",
    period: "June 2025 - Aug 2025",
    description: "Led telesales and sales operations. Spearheaded development of internal software including a dynamic digital rate sheet, CRM vertical card, and company website. Leveraged AI to automate data workflows.",
    icon: Cpu,
    tags: ["Sales", "Software Dev", "AI Automation", "CRM", "Web Development"],
  },
  {
    company: "MSTRAVEL EXPERIENCE",
    role: "Travel Operations Intern",
    period: "Aug 2022 - Dec 2022",
    description: "Learned fundamentals of air ticket reservations, hotel bookings, and tour package design. Assisted in handling customer queries and provided support in travel planning and coordination.",
    icon: Briefcase,
    tags: ["Ticketing", "Hotel Bookings", "Customer Support"],
  },
];

export default function Collaborations() {
  const { data } = useDataStore();

  return (
    <div className="pt-32 pb-24 min-h-screen max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">EXPERIENCE</h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Professional Journey & Partnerships</p>
      </div>

      <div className="space-y-8 mb-20">
        {collaborations.map((collab, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card p-8 border-brand-accent/20 hover:border-brand-accent/40 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
              <div className="p-4 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 shrink-0 self-start">
                <collab.icon className="w-8 h-8 text-brand-accent" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">{collab.company}</h3>
                    <p className="text-brand-accent font-mono text-xs uppercase tracking-widest mt-1">{collab.role}</p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/80 mt-2 md:mt-0 self-start">
                    {collab.period}
                  </span>
                </div>

                <p className="text-brand-muted text-sm leading-relaxed mb-4">{collab.description}</p>

                <div className="flex flex-wrap gap-2">
                  {collab.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 border-brand-accent/20 text-center"
      >
        <Users className="w-10 h-10 text-brand-accent mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-white mb-2">Open for Collaborations</h3>
        <p className="text-brand-muted text-sm max-w-lg mx-auto mb-6">
          Looking for travel operations roles, destination marketing partnerships, AI-driven travel tech projects, and brand collaborations. Let's work together!
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-brand-accent hover:text-white transition-all shadow-lg">
          Get In Touch <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
