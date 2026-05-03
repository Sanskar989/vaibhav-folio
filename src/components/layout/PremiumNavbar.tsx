import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Plane } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useDataStore } from '../../store/useDataStore';

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAdminUnlocked } = useAdminStore();
  const { data } = useDataStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Resume', path: '/resume' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reels', path: '/reels' },
    { label: 'Achievements', path: '/testimonials' },
    { label: 'Collaborations', path: '/collaborations' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 ${isScrolled ? 'py-4 bg-brand-bg/80 backdrop-blur-xl border-b border-white/5' : 'py-6 backdrop-blur-none'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-purple-500 flex items-center justify-center relative z-10 shadow-lg shadow-brand-accent/30">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <div className="flex flex-col relative z-10">
              <span className="font-display font-extrabold text-white text-lg leading-none tracking-tight">VAIBHAV GOYAL</span>
              <span className="font-mono text-[9px] text-brand-accent uppercase tracking-[0.2em] mt-0.5 flex items-center gap-1">
                {isAdminUnlocked ? <><Shield className="w-2.5 h-2.5" /> Admin Mode</> : 'Creator Platform'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`relative font-sans text-sm font-medium transition-colors group ${isActive ? 'text-white' : 'text-brand-muted hover:text-white'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-brand-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex bg-white text-brand-bg px-6 py-2.5 rounded-full font-bold text-sm hover:bg-brand-accent hover:text-white transition-all shadow-lg shadow-white/5 hover:shadow-brand-accent/20">
              Hire Me
            </button>
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {links.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-4xl font-bold text-white hover:text-brand-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-8 bg-brand-accent text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-brand-accent/30">
              Work With Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
