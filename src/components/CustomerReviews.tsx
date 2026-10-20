import React from 'react';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold block mb-1">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#141416]">
            Loved by Modest Fashion Enthusiasts
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-neutral-800 ml-1">4.9 / 5.0</span>
            <span className="text-xs text-neutral-400">· Over 2,400+ Verified Orders across Bangladesh</span>
          </div>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-[#FAFAF8] rounded-sm border border-neutral-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">{rev.author}</h4>
                    <span className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#E10613]" />
                      <span>{rev.location}</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200/50">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 block mt-2">
                  Purchased: {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
