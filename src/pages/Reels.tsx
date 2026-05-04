import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Instagram, Linkedin, ExternalLink, Heart, MessageCircle, Send, Bookmark, Play, ChevronDown, MapPin } from 'lucide-react';

const INSTAGRAM_URL = "https://www.instagram.com/live_in_travel_zone_";
const LINKEDIN_URL = "https://www.linkedin.com/in/vaibhav-goyal-1b8a101ba";

const TRAVEL_REELS = [
  {
    id: "reel-1",
    title: "Kashmir Valley Vibes",
    description: "Driving through paradise on earth. The valleys of Kashmir are unreal.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=1000&fit=crop",
    location: "Kashmir, India",
    likes: "15.2K",
    comments: "342",
  },
  {
    id: "reel-2",
    title: "Goa Beach Sunset",
    description: "Golden hour hits different when you're by the Arabian Sea.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=1000&fit=crop",
    location: "Goa, India",
    likes: "18.7K",
    comments: "521",
  },
  {
    id: "reel-3",
    title: "Mountain Trek Dharamshala",
    description: "10 days of mountaineering at Atal Bihari Vajpayee Institute.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=1000&fit=crop",
    location: "Dharamshala, HP",
    likes: "22.1K",
    comments: "678",
  },
  {
    id: "reel-4",
    title: "Streets of Jaipur",
    description: "Pink City magic. Every corner tells a royal story.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=1000&fit=crop",
    location: "Jaipur, Rajasthan",
    likes: "11.4K",
    comments: "189",
  },
  {
    id: "reel-5",
    title: "Himalayan Sunrise",
    description: "Waking up above the clouds. This is why we travel.",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=1000&fit=crop",
    location: "Himachal Pradesh",
    likes: "27.3K",
    comments: "892",
  },
  {
    id: "reel-6",
    title: "Backwater Bliss",
    description: "Floating through serenity. India's hidden waterways.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&h=1000&fit=crop",
    location: "South India",
    likes: "9.8K",
    comments: "156",
  },
  {
    id: "reel-7",
    title: "Desert Safari",
    description: "Golden sand dunes stretching to infinity.",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=600&h=1000&fit=crop",
    location: "Rajasthan",
    likes: "13.6K",
    comments: "267",
  },
  {
    id: "reel-8",
    title: "Temple Trail",
    description: "Ancient architecture meets spiritual peace.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=1000&fit=crop",
    location: "Tamil Nadu",
    likes: "8.9K",
    comments: "134",
  },
];

const ReelCard: React.FC<{ reel: typeof TRAVEL_REELS[0]; index: number }> = ({ reel, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.6 });
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      ref={cardRef}
      className="w-full h-full snap-start snap-always relative bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Ken Burns animated image */}
      <motion.div
        className="absolute inset-0"
        animate={isInView ? {
          scale: [1, 1.12],
          x: [0, index % 2 === 0 ? -10 : 10],
        } : { scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        <img
          src={reel.image}
          alt={reel.title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          loading="eager"
        />
        {/* Fallback color while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/30 to-purple-900/50 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

      {/* Floating particles */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              initial={{ x: 50 + Math.random() * 280, y: 600, opacity: 0 }}
              animate={{ y: -50, opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      {/* Play indicator when not in view */}
      <motion.div
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
          <Play className="w-7 h-7 text-white ml-1" />
        </div>
      </motion.div>

      {/* Location badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 z-20"
      >
        <MapPin className="w-3 h-3 text-rose-400" />
        <span className="text-white text-[10px] font-bold uppercase tracking-wider">{reel.location}</span>
      </motion.div>

      {/* Counter */}
      <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 z-20">
        <span className="text-white text-[10px] font-mono">{index + 1}/{TRAVEL_REELS.length}</span>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.15 }}
        className="absolute bottom-0 left-0 right-16 p-5 flex flex-col gap-3 z-20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden">
            <img src="/vaibhav-photo.png" alt="VG" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">live_in_travel_zone_</h4>
            <p className="text-[10px] text-white/60 font-mono">Travel Creator</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 border border-white rounded-full text-[10px] font-bold text-white ml-1 hover:bg-white hover:text-black transition-colors"
          >
            Follow
          </a>
        </div>

        <div>
          <p className="text-white text-sm font-bold drop-shadow-lg">{reel.title}</p>
          <p className="text-white/80 text-xs mt-1 line-clamp-2 drop-shadow">{reel.description}</p>
        </div>

        {/* Audio wave */}
        {isInView && (
          <div className="flex items-center gap-[2px]">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [3, Math.random() * 12 + 3, 3] }}
                transition={{ duration: 0.35 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.04 }}
                className="w-[2px] bg-white/50 rounded-full"
                style={{ height: 3 }}
              />
            ))}
            <span className="text-white/40 text-[9px] ml-2 font-mono">Travel Vibes</span>
          </div>
        )}
      </motion.div>

      {/* Side Actions */}
      <div className="absolute bottom-20 right-3 flex flex-col items-center gap-5 z-20">
        <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1">
          <motion.div whileTap={{ scale: 1.5 }}>
            <Heart className={`w-7 h-7 drop-shadow-lg ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </motion.div>
          <span className="text-white text-[10px] font-bold drop-shadow">{reel.likes}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
          <span className="text-white text-[10px] font-bold drop-shadow">{reel.comments}</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Send className="w-7 h-7 text-white drop-shadow-lg" />
          <span className="text-white text-[10px] font-bold drop-shadow">Share</span>
        </button>
        <button onClick={() => setIsSaved(!isSaved)}>
          <Bookmark className={`w-7 h-7 drop-shadow-lg ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
        </button>
      </div>

      {/* Progress bar */}
      {isInView && (
        <motion.div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-accent to-purple-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default function Reels() {
  return (
    <div className="pt-32 pb-24 min-h-screen max-w-6xl mx-auto px-6">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-extrabold text-white mb-4"
        >
          REELS & SOCIALS
        </motion.h1>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">Scroll through travel stories</p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg">
          <Instagram className="w-5 h-5" /> Follow on Instagram <ExternalLink className="w-4 h-4" />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0A66C2] text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg">
          <Linkedin className="w-5 h-5" /> Connect on LinkedIn <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Instagram Reels Embeds — actual reels from profile */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">My Instagram Reels</h2>
            <p className="text-brand-muted text-[10px] font-mono uppercase tracking-widest">Live from @live_in_travel_zone_</p>
          </div>
        </div>

        <div className="glass-card border-brand-accent/20 p-6 rounded-2xl">
          <div className="w-full bg-black/20 rounded-xl overflow-hidden min-h-[500px]">
            <div className="elfsight-app-e36fee7a-316e-4cc3-854d-bf4cd2873bf5" data-elfsight-app-lazy></div>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-sm font-bold hover:scale-[1.02] transition-transform">
            View All Reels on Instagram <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Travel Stories Reels Player */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-brand-accent/20 border border-brand-accent/30">
              <Play className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">Travel Stories</h2>
              <p className="text-brand-muted text-[10px] font-mono uppercase tracking-widest">Scroll to explore destinations</p>
            </div>
          </div>

          <div 
            data-lenis-prevent="true"
            className="w-full max-w-[380px] mx-auto h-[75vh] snap-y snap-mandatory overflow-y-scroll rounded-3xl hide-scrollbar bg-black border-2 border-white/10 relative shadow-[0_0_80px_rgba(108,99,255,0.15)] overscroll-contain"
          >
            <div className="sticky top-0 z-40 flex justify-center pt-2 pointer-events-none">
              <div className="w-28 h-1 rounded-full bg-white/20" />
            </div>
            {TRAVEL_REELS.map((reel, index) => (
              <ReelCard key={reel.id} reel={reel} index={index} />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 text-brand-muted text-xs font-mono">
              <ChevronDown className="w-4 h-4" /> Scroll for more
            </motion.div>
          </div>

          <div className="flex gap-3 mt-6 overflow-x-auto hide-scrollbar pb-2 justify-center flex-wrap">
            {TRAVEL_REELS.map((reel) => (
              <div key={reel.id}
                className="shrink-0 w-14 h-20 rounded-xl overflow-hidden border-2 border-white/10 hover:border-brand-accent/50 transition-all group cursor-pointer">
                <img src={reel.image} alt={reel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/*  LINKEDIN SHOWCASE                                               */}
      {/* ================================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mt-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-[#0A66C2] shadow-lg shadow-[#0A66C2]/30">
            <Linkedin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">LinkedIn Presence</h2>
            <p className="text-brand-muted text-[10px] font-mono uppercase tracking-widest">Professional network &amp; thought leadership</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-card border-[#0A66C2]/30 overflow-hidden relative">
          <div className="h-48 md:h-56 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop" alt="Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
          </div>
          <div className="px-6 md:px-10 pb-8 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#0A66C2] overflow-hidden shadow-xl shadow-[#0A66C2]/20 flex-shrink-0">
                <img src="/vaibhav-photo.png" alt="Vaibhav Goyal" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">Vaibhav Goyal</h3>
                <p className="text-brand-accent text-sm font-medium mt-1">Travel Operations Manager | AI &amp; Automation Specialist | 14x Certified Professional</p>
                <p className="text-brand-muted text-xs mt-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> New Delhi, India · 500+ connections
                </p>
              </div>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-8 py-3 bg-[#0A66C2] text-white rounded-full font-bold text-sm hover:bg-[#004182] transition-all hover:scale-105 shadow-lg shadow-[#0A66C2]/30 whitespace-nowrap">
                <Linkedin className="w-4 h-4" /> Connect
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Connections', value: '500+', icon: '🤝' },
                { label: 'Certifications', value: '14+', icon: '🏅' },
                { label: 'Experience', value: '3+ Yrs', icon: '💼' },
                { label: 'Endorsements', value: '50+', icon: '⭐' },
              ].map((stat) => (
                <motion.div key={stat.label} whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0A66C2]/40 transition-all text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="font-display text-xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="glass-card p-6 md:p-8 border-[#0A66C2]/20">
            <h4 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-xl">💼</span> Experience
            </h4>
            <div className="space-y-6">
              {[
                { role: 'Travel Operations Manager', company: 'Thrillophilia', period: '2024 – Present', desc: 'Leading travel operations, managing vendor relationships, and implementing AI-driven automation for tour management.' },
                { role: 'Operations Executive', company: 'Trip String', period: '2023 – 2024', desc: 'Managed end-to-end travel experiences, coordinating logistics for domestic and international tours.' },
                { role: 'Freelance Travel Consultant', company: 'Self-Employed', period: '2022 – 2023', desc: 'Provided customized travel planning and itinerary design for leisure and business travelers.' },
              ].map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative pl-6 border-l-2 border-[#0A66C2]/30">
                  <div className="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-[#0A66C2] border-2 border-black" />
                  <h5 className="font-bold text-white text-sm">{exp.role}</h5>
                  <p className="text-brand-accent text-xs font-medium">{exp.company}</p>
                  <p className="text-brand-muted text-[10px] font-mono mt-0.5">{exp.period}</p>
                  <p className="text-brand-muted text-xs mt-2 leading-relaxed">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 md:p-8 border-[#0A66C2]/20">
              <h4 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-xl">🎯</span> Top Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Travel Operations', 'AI & Automation', 'Vendor Management', 'Tour Planning', 'Customer Experience', 'Digital Marketing', 'Itinerary Design', 'Revenue Management', 'Team Leadership', 'Data Analytics', 'CRM Tools', 'Content Strategy'].map((skill) => (
                  <motion.span key={skill} whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/30 text-xs font-medium text-white hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 transition-all cursor-default">
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 md:p-8 border-[#0A66C2]/20">
              <h4 className="font-display text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-xl">🏅</span> Certifications
              </h4>
              <div className="space-y-3">
                {['Google AI Essentials', 'HubSpot Content Marketing', 'Meta Social Media Marketing', 'IBM Data Science Professional', 'Google Project Management'].map((cert, i) => (
                  <motion.div key={cert} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#0A66C2]/30 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/20 flex items-center justify-center text-sm flex-shrink-0">✓</div>
                    <span className="text-white text-sm font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent LinkedIn Posts */}
        <div className="mt-8">
          <h4 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-xl">📝</span> Recent Activity
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'How AI is Revolutionizing Travel Operations', excerpt: "After implementing AI-driven automation at Thrillophilia, we saw a 40% improvement in operational efficiency. Here's what I learned...", likes: 128, comments: 23, time: '2 days ago' },
              { title: 'My Journey: From Travel Enthusiast to Operations Manager', excerpt: "Three years ago, I started with a dream of making travel accessible. Today, I manage operations for one of India's top travel platforms...", likes: 256, comments: 45, time: '1 week ago' },
              { title: '14 Certifications Later — Why Continuous Learning Matters', excerpt: 'In a rapidly evolving industry, staying ahead means constantly upskilling. Here are the certifications that shaped my career...', likes: 189, comments: 34, time: '2 weeks ago' },
            ].map((post, i) => (
              <motion.a key={i} href={LINKEDIN_URL} target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-6 border-[#0A66C2]/20 hover:border-[#0A66C2]/50 transition-all group block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0A66C2]/30">
                    <img src="/vaibhav-photo.png" alt="VG" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Vaibhav Goyal</p>
                    <p className="text-brand-muted text-[10px] font-mono">{post.time}</p>
                  </div>
                </div>
                <h5 className="font-bold text-white text-sm mb-2 group-hover:text-[#0A66C2] transition-colors">{post.title}</h5>
                <p className="text-brand-muted text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <span className="text-brand-muted text-xs flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                  <span className="text-brand-muted text-xs flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {post.comments}</span>
                  <span className="ml-auto text-[#0A66C2] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Read More <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#0A66C2] text-white rounded-full font-bold text-base hover:bg-[#004182] transition-all hover:scale-105 shadow-xl shadow-[#0A66C2]/30">
            <Linkedin className="w-5 h-5" /> View Full LinkedIn Profile <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
