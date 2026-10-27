import React from 'react';
import {
  LayoutGrid,
  List,
  ChevronDown,
  Sparkles,
  Phone,
  MessageCircle,
  Search,
  X,
  ArrowRight,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CategoryType, Product } from '../types';
import { HERO_IMAGE } from '../data/products';

interface HomePageProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onNavigateShop: (cat?: CategoryType) => void;
  onOpenProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onInstantBuy?: (product: Product, size: string, color: string) => void;
}

interface CircleCategory {
  id: CategoryType;
  label: string;
  image: string;
}

const CIRCLE_CATEGORIES: CircleCategory[] = [
  {
    id: 'all',
    label: 'All Designs',
    image: '/assets/images/assiano_hero_editorial_1792505196532.jpg',
  },
  {
    id: 'abaya',
    label: 'Abayas',
    image: '/assets/aistudio/image_78204c97.png',
  },
  {
    id: 'three-piece',
    label: 'Three-Piece',
    image: '/assets/images/assiano_three_piece_suit_1792505198277.jpg',
  },
  {
    id: 'kurti',
    label: 'Kurtis',
    image: '/assets/images/assiano_designer_kurti_1792505198620.jpg',
  },
  {
    id: 'gown',
    label: 'Gowns',
    image: '/assets/images/assiano_evening_gown_1792505198775.jpg',
  },
  {
    id: 'hijab',
    label: 'Hijabs',
    image: '/assets/images/assiano_luxury_abaya_1792505197814.jpg',
  },
  {
    id: 'shirt',
    label: 'Shirts',
    image: '/assets/images/assiano_hero_editorial_1792505196532.jpg',
  },
  {
    id: 'footwear',
    label: 'Footwear',
    image: '/assets/aistudio/image_fdd18a03.png',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenProduct,
  onQuickView,
  onAddToCart,
  onInstantBuy,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'bestseller'>('bestseller');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const productsSectionRef = React.useRef<HTMLDivElement>(null);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchDesc && !matchFabric && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'bestseller') return b.soldCount - a.soldCount;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const scrollToProducts = () => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat: CategoryType) => {
    onSelectCategory(cat);
  };


  return (
    <div className="bg-[#FAF9F6] text-[#141416] pb-16">
      
      {/* 1. MAIN FRONT PAGE BANNER SECTION (Clean, Light, Simple 2/3 + 1/3 layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          
          {/* --- 2/3 LARGE BANNER (Lighter, simple, elegant) --- */}
          <div className="lg:col-span-8 relative rounded-lg overflow-hidden group shadow-xs border border-neutral-200 bg-neutral-900 min-h-[300px] sm:min-h-[360px] lg:min-h-[380px] flex flex-col justify-end p-5 sm:p-7 md:p-8 text-white">
            {/* Background Image */}
            <img
              src={HERO_IMAGE}
              alt="ঈদ স্পেশাল কালেকশন"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Soft, lighter gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Simple Light Content */}
            <div className="relative z-10 space-y-2 max-w-lg">
              <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-amber-300">
                ঈদ স্পেশাল কালেকশন
              </span>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                ঈদ ও স্পেশাল মোডেস্ট কালেকশন
              </h1>

              <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                প্রিমিয়াম আবায়া ও থ্রি-পিস কালেকশন · সারাদেশে ক্যাশ অন ডেলিভারি
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleCategorySelect('all');
                    scrollToProducts();
                  }}
                  className="px-5 py-2.5 bg-[#E10613] hover:bg-[#b8000b] active:scale-95 text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>অর্ডার করুন (Shop Now)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* --- 1/3 TWO LIGHTER & SIMPLER SMALL BANNERS --- */}
          <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
            
            {/* 1/3 Smaller Banner 1 (Top) */}
            <div
              onClick={() => {
                handleCategorySelect('abaya');
                scrollToProducts();
              }}
              className="relative rounded-lg overflow-hidden group shadow-xs border border-neutral-200 bg-neutral-900 h-[145px] sm:h-[175px] lg:h-[185px] flex flex-col justify-end p-4 text-white cursor-pointer"
            >
              <img
                src="/assets/aistudio/image_78204c97.png"
                alt="দুবাই চেরি বোরকা"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-medium block">
                  আবায়া কালেকশন
                </span>
                <h2 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  দুবাই চেরি বোরকা
                </h2>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-neutral-200">
                    শুরু মাত্র Tk 1,450 থেকে
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:text-amber-300 transition-colors">
                    দেখুন <ArrowRight className="w-3 h-3 text-[#E10613]" />
                  </span>
                </div>
              </div>
            </div>

            {/* 1/3 Smaller Banner 2 (Bottom) */}
            <div
              onClick={() => {
                handleCategorySelect('three-piece');
                scrollToProducts();
              }}
              className="relative rounded-lg overflow-hidden group shadow-xs border border-neutral-200 bg-neutral-900 h-[145px] sm:h-[175px] lg:h-[185px] flex flex-col justify-end p-4 text-white cursor-pointer"
            >
              <img
                src="/assets/images/assiano_three_piece_suit_1792505198277.jpg"
                alt="কটন থ্রি-পিস"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="relative z-10 space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-medium block">
                  থ্রি-পিস কালেকশন
                </span>
                <h2 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  কটন থ্রি-পিস ও কুর্তি
                </h2>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-neutral-200">
                    ২টি অর্ডারে ফ্রি ডেলিভারি
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:text-amber-300 transition-colors">
                    দেখুন <ArrowRight className="w-3 h-3 text-emerald-400" />
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CIRCULAR-STYLE CATEGORY ICONS (8 items: 4 on row 1, 4 on row 2 on mobile, no horizontal scroll) */}
      <section className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-3">
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:items-start sm:justify-center gap-x-2 sm:gap-x-6 gap-y-3 sm:gap-y-5 px-1 max-w-lg sm:max-w-none mx-auto">
          {CIRCLE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className="group flex flex-col items-center text-center w-full sm:w-22 cursor-pointer focus:outline-none py-0.5"
              >
                {/* Circular Image Container */}
                <div
                  className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-full p-1 transition-all duration-200 ${
                    isSelected
                      ? 'ring-2.5 ring-[#E10613] ring-offset-2 shadow-md bg-[#FFE4E6]'
                      : 'ring-1 ring-neutral-300 hover:ring-[#E10613] bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 shadow-2xs'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Category Label (English Only) */}
                <span
                  className={`mt-1.5 text-[11px] sm:text-xs font-semibold tracking-tight leading-tight transition-colors line-clamp-1 ${
                    isSelected ? 'text-[#E10613]' : 'text-neutral-800 group-hover:text-[#E10613]'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>


      {/* 4. SHOPPING TOOLBAR & PRODUCT GRID */}
      <section ref={productsSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 scroll-mt-24">
        
        {/* Toolbar Header (Jeem 3-segment style: FILTER | SORT BY | View Switch) */}
        <div className="bg-white border-y sm:border border-neutral-200/80 mb-6 shadow-2xs">
          <div className="grid grid-cols-3 divide-x divide-neutral-200/80 items-stretch text-center">
            
            {/* 1. FILTER */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`py-3 px-2 flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer ${
                isFilterOpen || searchQuery.trim() || selectedCategory !== 'all'
                  ? 'bg-neutral-50 text-neutral-900 font-semibold'
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-50/50'
              }`}
            >
              <span>FILTER</span>
              {(selectedCategory !== 'all' || searchQuery.trim()) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E10613]" />
              )}
            </button>

            {/* 2. SORT BY */}
            <div className="relative flex items-center justify-center py-3 px-2 text-xs uppercase tracking-[0.16em] font-medium text-neutral-700 hover:text-black cursor-pointer group">
              <span className="pointer-events-none flex items-center gap-1">
                <span>SORT BY</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-xs"
                title="Sort Products"
              >
                <option value="bestseller">Best Selling / জনপ্রিয়</option>
                <option value="featured">New Arrivals / নতুন কালেকশন</option>
                <option value="price-asc">Price: Low to High / দাম: কম</option>
                <option value="price-desc">Price: High to Low / দাম: বেশি</option>
              </select>
            </div>

            {/* 3. VIEW TOGGLE (1-col vs 2-col matching reference icons) */}
            <div className="flex items-center justify-center gap-3 py-3 px-2">
              {/* Single Column Icon */}
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`transition-opacity cursor-pointer p-0.5 ${
                  viewMode === 'list' ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                }`}
                title="Single Column View"
                aria-label="Single Column View"
              >
                <div className="w-4 h-4 bg-neutral-800 rounded-[1px]" />
              </button>

              {/* 2x2 Grid Icon */}
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`transition-opacity cursor-pointer p-0.5 ${
                  viewMode === 'grid' ? 'opacity-100' : 'opacity-35 hover:opacity-75'
                }`}
                title="Two Column Grid View"
                aria-label="Two Column Grid View"
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-[0.5px]" />
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-[0.5px]" />
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-[0.5px]" />
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-[0.5px]" />
                </div>
              </button>
            </div>

          </div>

          {/* Expandable Filter / Search Panel */}
          {isFilterOpen && (
            <div className="p-4 border-t border-neutral-200/80 bg-neutral-50/70 space-y-3.5 transition-all">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="পণ্য বা ডিজাইনের নাম খুঁজুন..."
                    className="w-full pl-8 pr-8 py-2 bg-white border border-neutral-300 focus:border-neutral-900 rounded-none text-xs text-neutral-900 outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Reset / Count info */}
                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-neutral-500">
                  <span>
                    Showing <strong className="text-neutral-900 font-mono">{filteredProducts.length}</strong> items
                  </span>
                  {(selectedCategory !== 'all' || searchQuery.trim()) && (
                    <button
                      onClick={() => {
                        handleCategorySelect('all');
                        setSearchQuery('');
                      }}
                      className="text-[#E10613] hover:underline font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. PRODUCT GRID / LIST (Clean, user-friendly 2-col on mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center my-8">
            <p className="text-base text-neutral-700 font-semibold mb-2">
              কোনো পণ্য খুঁজে পাওয়া যায়নি
            </p>
            <p className="text-xs text-neutral-400 mb-4">
              অন্য কোনো নামে সার্চ করুন অথবা সব ক্যাটাগরি দেখুন।
            </p>
            <button
              onClick={() => {
                handleCategorySelect('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#E10613] text-white text-xs font-bold rounded-xs cursor-pointer"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-10'
                : 'flex flex-col gap-6 max-w-3xl mx-auto'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onInstantBuy={onInstantBuy}
              />
            ))}
          </div>
        )}
      </section>

      {/* 6. HELP & CALL-TO-ORDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-7 space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#E10613] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>সহজ ও দ্রুত কেনাকাটা</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#141416]">
                ওয়েবসাইটে অর্ডার করতে সমস্যা হচ্ছে?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed">
                কোনো চিন্তা নেই! আপনি চাইলে সরাসরি আমাদের কল দিয়ে অথবা হোয়াটসঅ্যাপে মেসেজ পাঠিয়েও অর্ডার কনফার্ম করতে পারেন। আমাদের প্রতিনিধি আপনাকে সাহায্য করবেন।
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
              {/* Call Hotline */}
              <a
                href="tel:+8801897684273"
                className="px-5 py-3 bg-[#141416] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E10613]" />
                <span>কল করুন: 01897-684273</span>
              </a>

              {/* WhatsApp Direct Chat */}
              <a
                href="https://wa.me/8801897684273?text=Hello%20Assiano,%20I%20would%20like%20to%20order%20from%20your%20collection."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>হোয়াটসঅ্যাপে অর্ডার</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
