import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-brand-bg relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-bold text-white text-xl">VAIBHAV GOYAL</span>
          <span className="text-brand-muted text-sm mt-1">Travel Operations & AI Integration</span>
        </div>
        
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/vaibhav-goyal-1b8a101ba" target="_blank" rel="noreferrer" className="text-brand-muted hover:text-brand-accent transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/live_in_travel_zone_" target="_blank" rel="noreferrer" className="text-brand-muted hover:text-brand-accent transition-colors">Instagram</a>
          <a href="mailto:vaibhavgoyal026@gmail.com" className="text-brand-muted hover:text-brand-accent transition-colors">Email</a>
        </div>
        
        <div className="text-sm text-brand-muted font-mono">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
