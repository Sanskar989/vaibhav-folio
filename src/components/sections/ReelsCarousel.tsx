import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { useDataStore } from '../../store/useDataStore';

export default function ReelsCarousel() {
  const { data } = useDataStore();
  const { photography } = data;

  return (
    <div className="w-full max-w-[400px] mx-auto h-[80vh] snap-y snap-mandatory overflow-y-scroll rounded-3xl hide-scrollbar bg-black border border-white/10">
      {photography.map((item, index) => (
        <ReelCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

function ReelCard({ item, index }: { key?: string, item: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.8 });
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div 
      ref={ref}
      className="w-full h-full snap-start relative bg-black flex items-center justify-center overflow-hidden group"
    >
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: isInView ? 1 : 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src={item.image} 
        alt={item.title}
        className="w-full h-full object-cover opacity-90"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-16 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
            <img src="/vaibhav-photo.png" alt="VG" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">live_in_travel_zone_</h4>
            <p className="text-[10px] text-white/70">Original Audio</p>
          </div>
          <button className="px-3 py-1 border border-white rounded-full text-[10px] font-bold text-white ml-2 hover:bg-white hover:text-black transition-colors">
            Follow
          </button>
        </div>

        <div>
          <p className="text-white text-sm font-medium line-clamp-2">{item.title} — {item.description}</p>
        </div>
      </div>

      {/* Side Actions */}
      <div className="absolute bottom-6 right-4 flex flex-col items-center gap-6">
        <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1 group/btn">
          <Heart className={`w-7 h-7 transition-transform ${isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white group-hover/btn:scale-110'}`} />
          <span className="text-white text-[10px] font-bold">{isLiked ? '12.4K' : '12.3K'}</span>
        </button>
        <button className="flex flex-col items-center gap-1 group/btn">
          <MessageCircle className="w-7 h-7 text-white group-hover/btn:scale-110 transition-transform" />
          <span className="text-white text-[10px] font-bold">248</span>
        </button>
        <button className="flex flex-col items-center gap-1 group/btn">
          <Send className="w-7 h-7 text-white group-hover/btn:scale-110 transition-transform" />
          <span className="text-white text-[10px] font-bold">Share</span>
        </button>
        <button onClick={() => setIsSaved(!isSaved)} className="flex flex-col items-center gap-1 group/btn">
          <Bookmark className={`w-7 h-7 transition-transform ${isSaved ? 'fill-white text-white' : 'text-white group-hover/btn:scale-110'}`} />
        </button>
        <button className="flex flex-col items-center gap-1 group/btn mt-2">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
