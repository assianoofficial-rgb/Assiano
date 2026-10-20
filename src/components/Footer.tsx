import React from 'react';
import { Mail, Phone, ExternalLink, MessageSquare } from 'lucide-react';
import { ASSIANO_LOGO } from '../data/products';
import { CategoryType, PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType, category?: CategoryType) => void;
  onOpenTrack: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTrack,
  onOpenSizeGuide,
}) => {
  return (
    <footer className="bg-[#141416] text-[#E5E5E5] pt-10 pb-6 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
          {/* Brand & Wordmark */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={ASSIANO_LOGO}
                alt="Assiano Emblem"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
              />
              <span className="text-xl font-bold tracking-[0.25em] text-white font-serif uppercase">
                Assiano
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              High-end modest & contemporary clothing tailored in Dhaka. Korean Nida abayas, unstitched three-piece sets, and bespoke kurtis.
            </p>
          </div>

          {/* Quick Silhouettes & Pages */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Menu & Boutique
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs text-neutral-400">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('shop', 'all')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Shop All Designs
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                About Assiano
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Contact & Studio
              </button>
              <button
                onClick={() => onNavigate('shop', 'abaya')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Abayas & Borkas
              </button>
            </div>
          </div>

          {/* Services & Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs text-neutral-400">
              <button onClick={onOpenTrack} className="text-left hover:text-white transition-colors cursor-pointer">
                Track Live Order
              </button>
              <button onClick={onOpenSizeGuide} className="text-left hover:text-white transition-colors cursor-pointer">
                Measurements & Size Chart
              </button>
              <button onClick={() => onNavigate('contact')} className="text-left hover:text-white transition-colors cursor-pointer">
                Contact Concierge
              </button>
              <span className="text-neutral-500">Dhaka: ৳60 · Nationwide: ৳120</span>
              <span className="text-neutral-500">Cash on Delivery Available</span>
            </div>
          </div>

          {/* Direct Contact & Social */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <a
                href="https://www.facebook.com/share/1CAKiLxa7D/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E10613] transition-colors flex items-center gap-1.5 text-white font-medium"
              >
                <span>Official Facebook Page</span>
                <ExternalLink className="w-3 h-3 text-[#E10613]" />
              </a>
              <a
                href="mailto:assiano.official@gmail.com"
                className="hover:text-[#E10613] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#E10613]" />
                <span>assiano.official@gmail.com</span>
              </a>
              <a
                href="tel:+8801712345678"
                className="hover:text-[#E10613] transition-colors flex items-center gap-1.5 font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#E10613]" />
                <span>+880 1712-345678</span>
              </a>
            </div>
            
            <button
              onClick={() => onNavigate('contact')}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-[#E10613] text-white text-[11px] font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Contact Page</span>
            </button>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
          <p>© 2026 Assiano Clothing Brand. All rights reserved. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">Cash on Delivery · bKash · Nagad</span>
            <span className="text-neutral-700">·</span>
            <a
              href="https://www.facebook.com/share/1CAKiLxa7D/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @AssianoOfficial
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
