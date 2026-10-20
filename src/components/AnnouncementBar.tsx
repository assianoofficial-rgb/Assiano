import React from 'react';
import { Truck, Sparkles, ExternalLink } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenTrack: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenTrack }) => {
  return (
    <div className="bg-[#141416] text-[#F3F3F1] text-xs py-2 px-4 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E10613]" />
          <span className="font-medium tracking-wide">
            Assiano Festive & Modest Collection 2026 is Live
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-white/80">
            Free Shipping inside Bangladesh on orders above <span className="font-semibold text-white">৳ 3,000</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-white/80">
          <button
            onClick={onOpenTrack}
            className="hover:text-white transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <Truck className="w-3 h-3 text-[#E10613]" />
            <span>Track Order</span>
          </button>
          <span className="text-white/30">·</span>
          <a
            href="https://www.facebook.com/share/1CAKiLxa7D/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E10613] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Facebook Page</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
