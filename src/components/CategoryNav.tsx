import React from 'react';
import { CategoryType } from '../types';

interface CategoryNavProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

interface CategoryItem {
  id: CategoryType;
  label: string;
  image: string;
  tag: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'all',
    label: 'All Designs',
    image: '/assets/images/assiano_hero_editorial_1792505196532.jpg',
    tag: 'Full Catalog'
  },
  {
    id: 'abaya',
    label: 'Abaya & Borka',
    image: '/assets/images/assiano_luxury_abaya_1792505197814.jpg',
    tag: 'Modest Wear'
  },
  {
    id: 'three-piece',
    label: 'Three-Piece Sets',
    image: '/assets/images/assiano_three_piece_suit_1792505198277.jpg',
    tag: 'Unstitched Cotton'
  },
  {
    id: 'kurti',
    label: 'Designer Kurtis',
    image: '/assets/images/assiano_designer_kurti_1792505198620.jpg',
    tag: 'Artisanal Tunics'
  },
  {
    id: 'gown',
    label: 'Evening Gowns',
    image: '/assets/images/assiano_evening_gown_1792505198775.jpg',
    tag: 'Shimmer Georgette'
  },
  {
    id: 'shirt',
    label: 'Cuban Shirts',
    image: '/assets/images/assiano_hero_editorial_1792505196532.jpg',
    tag: 'Linen Blend'
  },
  {
    id: 'footwear',
    label: 'Footwear & Heels',
    image: '/assets/images/assiano_hero_editorial_1792505196532.jpg',
    tag: 'Party Stilettos'
  }
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section className="bg-white py-12 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-[0.28em] font-semibold text-[#E10613] block mb-1.5">
            Curated Departments
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#141416]">
            Explore by Silhouette
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Tap any department to view exclusive modest cuts and bespoke fabrics
          </p>
        </div>

        {/* Centered Larger Category Circles filling up the row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {CATEGORY_ITEMS.map((item) => {
            const isSelected = selectedCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className="group flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10613] cursor-pointer"
              >
                {/* Large circular avatar */}
                <div
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1.5 transition-all duration-300 shadow-sm ${
                    isSelected
                      ? 'ring-3 ring-[#E10613] ring-offset-2 scale-105'
                      : 'ring-1 ring-neutral-300 hover:ring-neutral-900 hover:scale-103'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-[#E10613]/10 pointer-events-none" />
                  )}
                </div>

                <span
                  className={`mt-3 text-sm tracking-wide transition-colors ${
                    isSelected
                      ? 'font-bold text-[#E10613]'
                      : 'font-semibold text-neutral-800 group-hover:text-black'
                  }`}
                >
                  {item.label}
                </span>
                <span className="text-[11px] text-neutral-500 font-normal">
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
