import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Plane, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';

export default function CinematicHero() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const { data } = useDataStore();
  const profile = data.profile;

  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center bg-brand-bg">
      {/* Background Image Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/60 via-brand-bg/40 to-brand-bg z-10" />
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop" 
          alt="Travel Cinematic" 
          className="w-full h-[120%] object-cover object-center"
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute z-10 w-full h-full pointer-events-none"
      >
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl"
        >
          <Plane className="w-8 h-8 text-brand-accent transform -rotate-45" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-[10%] w-20 h-20 bg-brand-accent/20 backdrop-blur-md border border-brand-accent/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(108,99,255,0.4)]"
        >
          <MapPin className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center text-center max-w-4xl px-6 pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">Travel Operations & AI Integration</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tighter mb-6"
        >
          STORIES FROM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-purple-400 to-rose-400">
            ROADS LESS REPEATED
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-brand-muted max-w-2xl font-sans mb-8"
        >
          {profile.about.split('.')[0]}. Built for travel stories, collaborations, and authentic discovery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={() => navigate('/gallery')}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Explore My Work <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/media-kit')}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            View Media Kit
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-muted">Scroll to discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent" />
      </motion.div>
    </section>
  );
}
