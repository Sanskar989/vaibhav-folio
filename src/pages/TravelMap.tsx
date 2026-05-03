import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mountain, Palmtree, Building, GraduationCap } from 'lucide-react';

const destinations = [
  {
    name: "Kashmir",
    type: "Destination Expertise",
    description: "Deep firsthand knowledge of Kashmir's valleys, culture, and travel logistics. Curated authentic itineraries for domestic and international travelers.",
    icon: Mountain,
    highlight: true,
  },
  {
    name: "Goa",
    type: "Work & Destination Expertise",
    description: "Interned at Trip String Goa DMC. Hands-on experience in sales operations, vendor management, and building the company's digital presence.",
    icon: Palmtree,
    highlight: true,
  },
  {
    name: "Jaipur, Rajasthan",
    type: "Work Experience",
    description: "Worked as Operations Executive at Thrillophilia, managing tour operations for US and UAE regions.",
    icon: Building,
  },
  {
    name: "Gwalior, M.P.",
    type: "Education",
    description: "Completed Bachelor of Tourism at Prestige Institute of Management. Currently pursuing MBA in Tourism at IITTM Gwalior.",
    icon: GraduationCap,
  },
  {
    name: "Morena, M.P.",
    type: "Hometown",
    description: "Born and raised. Completed schooling at Victor Convent H.S School. First travel operations internship at MSTRAVEL EXPERIENCE.",
    icon: MapPin,
  },
  {
    name: "Dharamshala, Himachal Pradesh",
    type: "Adventure",
    description: "Completed a certified 10-day Mountaineering Course at Atal Bihari Vajpayee Institute of Mountaineering & Allied Sports.",
    icon: Mountain,
  },
  {
    name: "Chennai & Tamil Nadu",
    type: "Vendor Network",
    description: "Managed vendor relationships and successfully onboarded a key vendor in Tamil Nadu, expanding regional service coverage for Trip String.",
    icon: Building,
  },
];

export default function TravelMap() {
  return (
    <div className="pt-32 pb-24 min-h-screen max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4">TRAVEL MAP</h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Places that shaped the journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((dest, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className={`glass-card p-6 border-brand-accent/20 hover:border-brand-accent/40 transition-colors group relative overflow-hidden ${dest.highlight ? 'md:col-span-2' : ''}`}
          >
            {dest.highlight && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-purple-400 to-brand-accent" />
            )}

            <div className="flex items-start gap-4 relative z-10">
              <div className={`p-3 rounded-xl shrink-0 ${dest.highlight ? 'bg-brand-accent/20 border border-brand-accent/30' : 'bg-white/5 border border-white/10'}`}>
                <dest.icon className={`w-6 h-6 ${dest.highlight ? 'text-brand-accent' : 'text-brand-muted'}`} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-accent transition-colors">{dest.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-brand-accent uppercase tracking-widest">
                    {dest.type}
                  </span>
                </div>
                <p className="text-brand-muted text-sm leading-relaxed">{dest.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
