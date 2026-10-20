import React from 'react';
import { ShieldCheck, Sparkles, Feather, Scissors, Heart, ArrowRight } from 'lucide-react';
import { ASSIANO_LOGO, HERO_IMAGE } from '../data/products';

interface AboutPageProps {
  onNavigateShop: () => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateShop, onNavigateContact }) => {
  return (
    <div className="bg-[#FAFAF8] text-[#141416] py-12 sm:py-16">
      {/* Brand Hero Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#E10613] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Assiano Story</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#141416] tracking-tight leading-tight">
          Where Contemporary Aesthetics Meet Modest Heritage.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Founded in Dhaka, Assiano was born from a desire to elevate modest fashion with high-end fabrics, precision tailoring, and timeless elegance for modern women across Bangladesh.
        </p>
      </div>

      {/* Visual Story Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 border border-neutral-200 rounded-sm">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100">
            <img
              src={HERO_IMAGE}
              alt="Assiano Dhaka Atelier Tailoring"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-200">
                Dhaka Central Atelier
              </span>
              <p className="font-serif text-base sm:text-lg">
                Crafting silhouettes that honor tradition without sacrificing modern flair.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 lg:pl-6">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E10613]">
              Artisanal Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#141416]">
              Every stitch holds a standard of uncompromising refinement.
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              In a market overwhelmed by synthetic blends and mass-produced copies, Assiano took a conscious stand: to curate only genuine, grade-A fabrics. From breathable pure Korean Nida crepe for our flowing abayas to colorfast 100% fine combed cotton for our three-piece sets, every fiber is selected to endure Bangladesh's climate in supreme comfort.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Our pattern masters and embroidery artisans bring decades of South Asian handloom techniques into every sleeve cuff, scalloped dupatta hem, and Mandarin collar placket.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onNavigateShop}
                className="px-6 py-3 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateContact}
                className="px-6 py-3 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xs hover:border-black transition-colors cursor-pointer"
              >
                <span>Visit Our Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Brand Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold block mb-1">
            Our Guiding Values
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#141416]">
            The 4 Assiano Commitments
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#E10613]">
              <Feather className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-neutral-900">
              Grade-A Natural Fabrics
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We never compromise on tactile feel. Imported Korean Nida, pure combed cottons, and rich Chanderi silk with skin-friendly linings.
            </p>
          </div>

          <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#E10613]">
              <Scissors className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-neutral-900">
              Bespoke Proportions
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Tailored specifically for South Asian postures and heights (lengths 52", 54", 56" and generous modest flare sweeps).
            </p>
          </div>

          <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#E10613]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-neutral-900">
              Transparent BDT Pricing
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Direct atelier-to-customer pricing without wholesale markups. Doorstep Cash on Delivery supported across all 64 districts in Bangladesh.
            </p>
          </div>

          <div className="p-6 bg-white border border-neutral-200 rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-[#E10613]">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-neutral-900">
              Ethical Local Artisanship
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Empowering master pattern-cutters and zari embroiderers in Dhaka with fair living wages, hygienic work conditions, and pride of craft.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-10 bg-white border border-neutral-200 rounded-sm">
        <img
          src={ASSIANO_LOGO}
          alt="Assiano Official Mark"
          className="w-12 h-12 rounded-full mx-auto mb-4"
        />
        <blockquote className="font-serif text-lg sm:text-xl text-neutral-800 italic leading-relaxed">
          "Modesty is not about hiding; it is about choosing what you celebrate. At Assiano, we celebrate quiet grace, fine tactile textures, and effortless poise."
        </blockquote>
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mt-4">
          — The Assiano Design Philosophy
        </span>
      </div>
    </div>
  );
};
