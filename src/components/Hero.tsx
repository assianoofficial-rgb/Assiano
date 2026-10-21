import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onExploreAbayas: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreAbayas }) => {
  return (
    <section className="relative overflow-hidden bg-[#F5F2EB] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#E10613] uppercase">
              <span>Contemporary Modest Fashion</span>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-600">Dhaka, Bangladesh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#141416] leading-[1.12] tracking-tight text-balance">
              Where Modesty Meets High-End Modernity.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
              Assiano curates timeless artisanal kurtis, flowing Korean Nida abayas, and unstitched luxury cotton three-pieces tailored for the contemporary Bangladeshi woman.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center gap-2.5 shadow-md active:scale-95 cursor-pointer rounded-xs"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreAbayas}
                className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-[#141416] border border-neutral-300 text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer rounded-xs"
              >
                <span>Explore Abayas & Borkas</span>
              </button>
            </div>

            {/* Micro value props strip */}
            <div className="pt-6 border-t border-neutral-300/70 grid grid-cols-3 gap-4 text-neutral-700">
              <div className="flex flex-col">
                <span className="text-sm font-semibold font-serif text-[#141416]">Tk Currency</span>
                <span className="text-xs text-neutral-500">Transparent pricing</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold font-serif text-[#141416]">Cash on Delivery</span>
                <span className="text-xs text-neutral-500">All 64 districts</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold font-serif text-[#141416]">7-Day Exchange</span>
                <span className="text-xs text-neutral-500">Hassle-free guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-neutral-300/60 bg-neutral-200">
              <img
                src={HERO_IMAGE}
                alt="Assiano Contemporary Fashion Campaign"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white pointer-events-none">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F5F2EB]/80 block">Campaign 2026</span>
                  <span className="font-serif text-lg text-white">The Artisan Modest Line</span>
                </div>
                <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-sm">
                  Starting at Tk 750
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Ribbon */}
      <div className="bg-white border-t border-neutral-200 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-neutral-600">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#E10613]" />
            <span>Express Delivery via Steadfast & Pathao (Dhaka 24-48 hrs)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E10613]" />
            <span>100% Authentic Korean Nida & Pure Cotton Fabrics</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#E10613]" />
            <span>Doorstep Check on Delivery Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
};
