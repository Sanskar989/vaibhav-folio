import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Camera,
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Filter,
  Mountain,
  Compass,
  Sparkles,
  Settings,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  category: string;
  size: 'tall' | 'wide' | 'square';
  isVideo?: boolean;
}

const CATEGORIES = [
  'All',
  'Kashmir',
  'Goa',
  'Rajasthan',
  'Himachal',
  'Adventure',
  'Culture',
  'Street Photography',
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Dal Lake Serenity',
    description:
      'The iconic houseboats of Dal Lake reflecting in still waters at dawn. A moment of pure tranquility in the heart of Srinagar.',
    location: 'Srinagar, Kashmir',
    date: '2023-04-12',
    image:
      'https://images.unsplash.com/photo-1598305317374-825d4f77545e?q=80&w=1200&auto=format&fit=crop',
    category: 'Kashmir',
    size: 'tall',
  },
  {
    id: 'g-2',
    title: 'Goa Golden Hour',
    description:
      'The Arabian Sea painted in molten gold as the sun dips below the Goan horizon. Palm silhouettes frame the perfect tropical farewell.',
    location: 'Palolem Beach, Goa',
    date: '2023-06-20',
    image:
      'https://images.unsplash.com/photo-1512757776233-bc397390ea4a?q=80&w=1200&auto=format&fit=crop',
    category: 'Goa',
    size: 'wide',
  },
  {
    id: 'g-3',
    title: 'Amber Fort Grandeur',
    description:
      'The majestic Amber Fort rising from the Aravalli hills, its honey-toned walls glowing in the Rajasthani afternoon sun.',
    location: 'Jaipur, Rajasthan',
    date: '2023-07-05',
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
    category: 'Rajasthan',
    size: 'square',
  },
  {
    id: 'g-4',
    title: 'Himalayan Sunrise Trek',
    description:
      'First light breaking over snow-capped peaks during a high-altitude trek. The world below still sleeps while we touch the sky.',
    location: 'Triund, Himachal Pradesh',
    date: '2023-08-15',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    category: 'Himachal',
    size: 'tall',
  },
  {
    id: 'g-5',
    title: 'Varanasi Ghats at Dawn',
    description:
      'Ancient rituals unfold on the ghats of Varanasi as the first rays of sun illuminate centuries of spiritual devotion along the Ganges.',
    location: 'Varanasi, Uttar Pradesh',
    date: '2023-03-22',
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop',
    category: 'Culture',
    size: 'wide',
  },
  {
    id: 'g-6',
    title: 'Streets of Jodhpur',
    description:
      'The Blue City reveals its palette through winding lanes. Every corner holds a frame worth capturing in the labyrinth of Jodhpur.',
    location: 'Jodhpur, Rajasthan',
    date: '2023-07-10',
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop',
    category: 'Street Photography',
    size: 'square',
  },
  {
    id: 'g-7',
    title: 'Pahalgam Valley Dreams',
    description:
      'Lush green meadows stretching endlessly beneath snow-dusted peaks. Pahalgam is Kashmir distilled to its purest essence.',
    location: 'Pahalgam, Kashmir',
    date: '2023-04-18',
    image:
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
    category: 'Kashmir',
    size: 'wide',
  },
  {
    id: 'g-8',
    title: 'Rappelling Down',
    description:
      'Heart pounding, ropes taut — the thrill of rappelling down a sheer rock face with nothing but wilderness below.',
    location: 'Rishikesh, Uttarakhand',
    date: '2023-09-01',
    image:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200&auto=format&fit=crop',
    category: 'Adventure',
    size: 'tall',
  },
  {
    id: 'g-9',
    title: 'Goa Beach Life',
    description:
      'Colorful fishing boats resting on white sand, the laid-back rhythm of Goan coastal life captured in a single frame.',
    location: 'Anjuna, Goa',
    date: '2023-06-25',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    category: 'Goa',
    size: 'square',
  },
  {
    id: 'g-10',
    title: 'Dharamshala Mountains',
    description:
      'The Dhauladhar range towers over McLeod Ganj, where Tibetan prayer flags flutter against an impossibly blue sky.',
    location: 'Dharamshala, Himachal Pradesh',
    date: '2023-10-05',
    image:
      'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1200&auto=format&fit=crop',
    category: 'Himachal',
    size: 'wide',
  },
  {
    id: 'g-11',
    title: 'Jaisalmer Fortress',
    description:
      'The Golden Fort rises like a mirage from the Thar Desert, its sandstone walls telling tales of centuries past.',
    location: 'Jaisalmer, Rajasthan',
    date: '2023-07-20',
    image:
      'https://images.unsplash.com/photo-1624461986010-84e9c3e87e3a?q=80&w=1200&auto=format&fit=crop',
    category: 'Rajasthan',
    size: 'tall',
  },
  {
    id: 'g-12',
    title: 'River Rafting Rush',
    description:
      'White water surges as our raft cuts through the rapids of the Ganges. Pure adrenaline in nature\'s playground.',
    location: 'Rishikesh, Uttarakhand',
    date: '2023-09-05',
    image:
      'https://images.unsplash.com/photo-1530866495561-507c83a8e5a3?q=80&w=1200&auto=format&fit=crop',
    category: 'Adventure',
    size: 'square',
  },
  {
    id: 'g-13',
    title: 'Old Delhi Spice Market',
    description:
      'A kaleidoscope of colors and aromas in Asia\'s largest spice market. The sensory overload of Khari Baoli captured through the lens.',
    location: 'Chandni Chowk, Delhi',
    date: '2023-02-14',
    image:
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=1200&auto=format&fit=crop',
    category: 'Street Photography',
    size: 'wide',
  },
  {
    id: 'g-14',
    title: 'Holi Festival Colors',
    description:
      'Clouds of vibrant gulal fill the air as India celebrates the festival of colors. Pure joy in every splash of pigment.',
    location: 'Mathura, Uttar Pradesh',
    date: '2023-03-08',
    image:
      'https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?q=80&w=1200&auto=format&fit=crop',
    category: 'Culture',
    size: 'tall',
  },
  {
    id: 'g-15',
    title: 'Kerala Backwaters',
    description:
      'A traditional houseboat glides through the emerald backwaters of Alleppey, where time slows to the pace of the tides.',
    location: 'Alleppey, Kerala',
    date: '2023-11-10',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    category: 'Culture',
    size: 'wide',
  },
  {
    id: 'g-16',
    title: 'Snowfall in Manali',
    description:
      'Pine forests blanketed in fresh snow create a winter wonderland in the Kullu Valley. Silence has never been so loud.',
    location: 'Manali, Himachal Pradesh',
    date: '2023-12-20',
    image:
      'https://images.unsplash.com/photo-1626621338750-2682db580ded?q=80&w=1200&auto=format&fit=crop',
    category: 'Himachal',
    size: 'square',
  },
  {
    id: 'g-17',
    title: 'Shikara Rides at Dusk',
    description:
      'Gliding through the lotus gardens of Dal Lake as the sky turns shades of amber and violet. Kashmir in its most romantic light.',
    location: 'Dal Lake, Srinagar',
    date: '2023-04-14',
    image:
      'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Kashmir',
    size: 'square',
    isVideo: true,
  },
  {
    id: 'g-18',
    title: 'Paragliding over Bir',
    description:
      'Soaring high above the Kangra Valley with the Dhauladhar range as the backdrop. The world shrinks to toy-town proportions below.',
    location: 'Bir Billing, Himachal Pradesh',
    date: '2023-10-12',
    image:
      'https://cdn.pixabay.com/video/2016/08/22/4741-180735749_tiny.mp4',
    category: 'Adventure',
    size: 'wide',
    isVideo: true,
  },
  {
    id: 'g-19',
    title: 'Mehrangarh at Twilight',
    description:
      'The imposing silhouette of Mehrangarh Fort against a dusky sky. Jodhpur\'s crown jewel commands attention even in darkness.',
    location: 'Jodhpur, Rajasthan',
    date: '2023-07-15',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop',
    category: 'Rajasthan',
    size: 'tall',
  },
  {
    id: 'g-20',
    title: 'Chai & Conversations',
    description:
      'A roadside chai stall becomes a universe of stories. Steam rises from earthen cups as strangers become friends over India\'s favourite drink.',
    location: 'Pushkar, Rajasthan',
    date: '2023-07-22',
    image:
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200&auto=format&fit=crop',
    category: 'Street Photography',
    size: 'square',
  },
];

const HERO_SLIDES = GALLERY_ITEMS.filter((i) =>
  ['g-1', 'g-2', 'g-4', 'g-10', 'g-15', 'g-18'].includes(i.id),
);

// ---------------------------------------------------------------------------
// Floating Particle
// ---------------------------------------------------------------------------

const FloatingParticle: React.FC<{ delay: number; size: number; x: number }> = ({ delay, size, x }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-brand-accent/20 pointer-events-none"
      style={{ width: size, height: size, left: `${x}%` }}
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
      transition={{
        duration: 12 + Math.random() * 8,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Hero Carousel
// ---------------------------------------------------------------------------

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (dir: -1 | 1) => {
    setCurrent((prev) => (prev + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    resetTimer();
  };

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Ken Burns zoom */}
          <motion.img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 7, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/20 border border-brand-accent/30 font-mono text-[10px] text-brand-accent uppercase tracking-widest mb-4">
                <MapPin className="w-3 h-3" />
                {slide.location}
              </span>
              <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight max-w-2xl">
                {slide.title}
              </h1>
              <p className="text-brand-muted text-lg max-w-xl mt-4 leading-relaxed">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => goTo(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:border-brand-accent/50 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goTo(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:border-brand-accent/50 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx);
              resetTimer();
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current
                ? 'w-8 bg-brand-accent'
                : 'w-3 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative max-w-6xl w-full max-h-[90vh] glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_380px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image / Video */}
        <div className="relative w-full h-[50vh] lg:h-auto overflow-hidden bg-black flex items-center justify-center">
          {item.isVideo ? (
            <video
              src={item.image}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Info panel */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/25 font-mono text-[10px] text-brand-accent uppercase tracking-widest mb-4">
              {item.category}
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white mb-3">
              {item.title}
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                <span className="text-white">{item.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-brand-accent shrink-0" />
                <span className="text-white">
                  {new Date(item.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-mono"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 text-brand-muted hover:text-white transition-colors text-sm font-mono"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent/30 hover:border-brand-accent/50 transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Gallery Card
// ---------------------------------------------------------------------------

const GalleryCard: React.FC<{
  item: GalleryItem;
  index: number;
  onClick: () => void;
}> = ({ item, index, onClick }) => {
  const sizeClasses: Record<string, string> = {
    tall: 'row-span-2',
    wide: 'md:col-span-2',
    square: '',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${sizeClasses[item.size]} min-h-[280px]`}
      onClick={onClick}
    >
      {/* Image / Video */}
      {item.isVideo ? (
        <motion.video
          src={item.image}
          className="w-full h-full object-cover absolute inset-0"
          muted
          loop
          playsInline
          autoPlay
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Always-visible bottom gradient for readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Video play icon */}
      {item.isVideo && (
        <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-accent/80 flex items-center justify-center shadow-lg shadow-brand-accent/30">
          <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
        </div>
      )}

      {/* Category tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-white uppercase tracking-widest">
          {item.category}
        </span>
      </div>

      {/* Bottom content — revealed on hover */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <h3 className="font-display font-bold text-lg text-white mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-white/60 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <MapPin className="w-3 h-3" />
          {item.location}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function TravelGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploadedItems, setUploadedItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.items) {
          const mapped: GalleryItem[] = data.items.map((item: any) => {
            const imgUrl = item.image || '';
            const isVideoFile = imgUrl.toLowerCase().includes('.mp4') || 
                                imgUrl.toLowerCase().includes('.webm') || 
                                imgUrl.toLowerCase().includes('.mov') ||
                                imgUrl.toLowerCase().includes('.m3u8');
            return {
              id: item.id,
              title: item.title || 'Untitled',
              description: item.description || '',
              location: item.category || 'India',
              date: item.uploadedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
              image: imgUrl,
              category: item.category || 'General',
              size: 'square' as const,
              isVideo: isVideoFile || item.isVideo,
            };
          });
          setUploadedItems(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const allItems = [...uploadedItems, ...GALLERY_ITEMS];

  const filtered =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((i) => i.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null,
    );
  }, [filtered.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null,
    );
  }, [filtered.length]);

  // Floating particle data (stable across renders)
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      size: 4 + Math.random() * 8,
      x: Math.random() * 100,
    })),
  ).current;

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} size={p.size} x={p.x} />
        ))}
      </div>

      {/* Ambient blobs */}
      <div className="mesh-blob w-[500px] h-[500px] bg-brand-accent top-[20%] -left-[200px]" />
      <div className="mesh-blob w-[400px] h-[400px] bg-purple-600 bottom-[10%] -right-[150px]" />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Gallery Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-6 h-6 text-brand-accent" />
            <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
              Visual Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-3">
            TRAVEL GALLERY
          </h2>
          <p className="text-brand-muted max-w-2xl text-lg">
            A curated collection of moments captured across India — from the snow-capped
            Himalayas to the sun-kissed shores of Goa, every frame tells a story.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          <Filter className="w-4 h-4 text-brand-muted mr-1" />
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${
                  isActive
                    ? 'bg-brand-accent text-white border-brand-accent shadow-lg shadow-brand-accent/25'
                    : 'bg-white/[0.03] text-brand-muted border-white/10 hover:border-brand-accent/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Masonry grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={idx}
                onClick={() => openLightbox(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Compass className="w-12 h-12 text-brand-muted mx-auto mb-4" />
            <p className="text-brand-muted font-mono text-sm">
              No photos in this category yet. More adventures coming soon.
            </p>
          </motion.div>
        )}

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 glass-card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-brand-accent/20"
        >
          {[
            { label: 'Photos Captured', value: '2,500+', icon: Camera },
            { label: 'Destinations', value: '40+', icon: MapPin },
            { label: 'Adventures', value: '60+', icon: Mountain },
            { label: 'Stories Told', value: '150+', icon: Sparkles },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-5 h-5 text-brand-accent mx-auto mb-2" />
              <div className="font-display font-extrabold text-3xl text-white mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            item={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>

      {/* Floating Admin Button */}
      <Link
        to="/admin"
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full bg-brand-bg/90 backdrop-blur-xl border border-white/10 hover:border-brand-accent/50 flex items-center justify-center text-brand-muted hover:text-brand-accent transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-brand-accent/20 group"
        title="Admin Panel — Manage Gallery"
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
      </Link>
    </div>
  );
}
