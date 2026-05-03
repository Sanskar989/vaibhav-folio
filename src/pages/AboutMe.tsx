import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, GraduationCap, Camera } from 'lucide-react';

export default function AboutMe() {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen bg-brand-bg pt-32 pb-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Wavy Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]"
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, y: `${particle.y}vh`, x: `${particle.x}vw` }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [`${particle.y}vh`, `${particle.y - 20}vh`],
              x: [`${particle.x}vw`, `${particle.x + (Math.random() * 10 - 5)}vw`],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-purple-400 to-rose-400">
              ABOUT ME
            </span>
          </h1>
          <p className="text-brand-muted font-mono uppercase tracking-[0.2em] text-sm">
            The Journey Beyond the Ordinary
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Photo & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-brand-bg">
                <img
                  src="/vaibhav-photo.png"
                  alt="Vaibhav Goyal"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-1">Vaibhav Goyal</h3>
                  <p className="text-brand-accent font-mono text-sm uppercase tracking-wider">Tourism Leader & Tech Enthusiast</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: 'Expertise', value: 'Kashmir & Goa' },
                { icon: Briefcase, label: 'Background', value: 'Operations & Tech' },
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-4 border-brand-accent/20 flex flex-col items-center text-center">
                  <stat.icon className="w-6 h-6 text-brand-accent mb-2" />
                  <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">{stat.label}</span>
                  <span className="text-sm font-bold text-white mt-1">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Content Sections */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card p-8 border-brand-accent/20"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-4">The Vision</h2>
              <p className="text-brand-muted leading-relaxed text-lg">
                I’m <strong className="text-white">Vaibhav Goyal</strong>, a passionate travel professional and aspiring tourism leader who blends real-world travel expertise with technology-driven innovation. With hands-on experience across destinations like Kashmir and Goa, I specialize in designing authentic, affordable, and memorable travel experiences that go beyond the ordinary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-8 border-brand-accent/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-bl-[100px]" />
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-brand-accent" />
                <h2 className="text-xl font-display font-bold text-white">Professional Journey</h2>
              </div>
              <div className="space-y-6 text-brand-muted leading-relaxed">
                <p>
                  My professional journey includes working as an <strong className="text-white">Operations Executive at Thrillophilia</strong>, where I managed international travel operations for clients across the US and UAE. From customizing travel packages to ensuring seamless end-to-end execution, I developed a strong foundation in delivering high-quality customer experiences.
                </p>
                <p>
                  I further expanded my skills during my time with <strong className="text-white">Trip String Goa</strong>, where I didn’t just contribute to sales and operations—I also played a key role in building digital systems, developing the company website, and implementing CRM solutions. This unique blend of travel operations and tech exposure allows me to approach tourism with a modern, efficiency-driven mindset.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card p-8 border-brand-accent/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-brand-accent" />
                <h2 className="text-xl font-display font-bold text-white">Current Pursuits</h2>
              </div>
              <p className="text-brand-muted leading-relaxed">
                Currently pursuing an <strong className="text-white">MBA in Tourism</strong>, I’m focused on integrating AI, automation, and smart tools into travel planning to create scalable and personalized solutions. Whether it’s crafting itineraries, optimizing workflows, or enhancing customer journeys, I aim to redefine how travel experiences are designed and delivered.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card p-8 border-brand-accent/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-5 h-5 text-brand-accent" />
                <h2 className="text-xl font-display font-bold text-white">Beyond Work</h2>
              </div>
              <p className="text-brand-muted leading-relaxed">
                I’m deeply passionate about photography, travel storytelling, and adventure activities, constantly exploring new ways to capture and share the essence of destinations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
