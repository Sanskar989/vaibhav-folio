import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useLenis } from './hooks/useLenis';

// Layout
import PremiumNavbar from './components/layout/PremiumNavbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import AdminToolbar from './components/admin/AdminToolbar';
import BackgroundMusic from './components/layout/BackgroundMusic';

// Pages
import Home from './pages/Home';
import MediaKit from './pages/MediaKit';
import Contact from './pages/Contact';
import Collaborations from './pages/Collaborations';
import TravelMap from './pages/TravelMap';
import Reels from './pages/Reels';
import Testimonials from './pages/Testimonials';
import TravelGallery from './pages/TravelGallery';
import Resume from './pages/Resume';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  // Initialize smooth scrolling
  useLenis();

  const location = useLocation();

  return (
    <div className="bg-brand-bg min-h-screen text-white font-sans selection:bg-brand-accent/30 overflow-x-hidden">
      <PremiumNavbar />
      <AdminToolbar />
      <BackgroundMusic />

      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/media-kit" element={<PageTransition><MediaKit /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/collaborations" element={<PageTransition><Collaborations /></PageTransition>} />
            <Route path="/travel-map" element={<PageTransition><TravelMap /></PageTransition>} />
            <Route path="/reels" element={<PageTransition><Reels /></PageTransition>} />
            <Route path="/testimonials" element={<PageTransition><Testimonials /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><TravelGallery /></PageTransition>} />
            <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
            <Route path="/admin" element={<PageTransition><AdminPanel /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
