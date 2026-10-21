import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProduct,
  featuredProducts,
}) => {
  return (
    <section id="lookbook" className="py-16 bg-[#141416] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#E10613] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assiano Atelier Lookbook</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight">
              Curated Editorial Silhouettes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Every Assiano piece is envisioned in Dhaka and tailored with imported Korean Nida, handcrafted zari, and pure breathable cottons designed for our tropical climate.
          </p>
        </div>

        {/* Editorial 3-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="group relative overflow-hidden bg-neutral-900 rounded-sm cursor-pointer border border-neutral-800"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E10613] font-semibold mb-1">
                  Volume 0{idx + 1} · {item.categoryLabel}
                </span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-1 font-light">
                  {item.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-white tabular-nums">
                    Tk {item.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-neutral-300 group-hover:text-white transition-colors">
                    <span>Inspect Design</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
