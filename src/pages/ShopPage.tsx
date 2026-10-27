import React from 'react';
import { Filter, ArrowUpDown, X, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CategoryType, Product } from '../types';

interface ShopPageProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onInstantBuy?: (product: Product, size: string, color: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenProduct,
  onQuickView,
  onAddToCart,
  onInstantBuy,
}) => {
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'bestseller'>('featured');
  const [selectedFabric, setSelectedFabric] = React.useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = React.useState<string>('all');

  const fabrics = ['all', 'Korean Nida', 'Cotton', 'Georgette', 'Linen'];
  const sizes = ['all', '36 (S)', '38 (M)', '40 (L)', '42 (XL)', '54 (Abaya)', 'Unstitched'];

  const categories: { id: CategoryType; label: string; count?: number }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'abaya', label: 'Abayas & Borkas' },
    { id: 'three-piece', label: 'Three-Piece Sets' },
    { id: 'kurti', label: 'Designer Kurtis' },
    { id: 'gown', label: 'Occasion Gowns' },
    { id: 'hijab', label: 'Hijabs & Scarves' },
    { id: 'shirt', label: 'Cuban Shirts' },
    { id: 'footwear', label: 'Footwear & Heels' },
  ];

  // Filtered list
  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchFabric = p.fabric.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchFabric) return false;
      }
      if (selectedFabric !== 'all') {
        if (!p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
          return false;
        }
      }
      if (selectedSizeFilter !== 'all') {
        const hasSize = p.sizes.some((s) => s.toLowerCase().includes(selectedSizeFilter.toLowerCase().split(' ')[0]));
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'bestseller') return b.soldCount - a.soldCount;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedFabric, selectedSizeFilter, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedFabric !== 'all' || selectedSizeFilter !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedFabric('all');
    setSelectedSizeFilter('all');
    onSearchChange('');
  };

  return (
    <div className="bg-[#FAFAF8] py-10 sm:py-14 min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8 pb-6 border-b border-neutral-200">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold mb-1">
            Assiano Online Boutique
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141416]">
            {selectedCategory === 'all'
              ? 'Complete Collection'
              : categories.find((c) => c.id === selectedCategory)?.label || 'Shop'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Showing <strong className="font-semibold text-neutral-900 font-mono tabular-nums">{filteredProducts.length}</strong> styles · Doorstep Cash on Delivery Across Bangladesh
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="bg-white p-4 sm:p-5 border border-neutral-200 rounded-sm mb-8 space-y-4 shadow-2xs">
          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#141416] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub Filters: Fabric, Size, Sorting, and Reset */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-100">
            <div className="flex flex-wrap items-center gap-3">
              {/* Fabric Filter */}
              <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-300 rounded-xs px-3 py-1.5 text-xs">
                <span className="text-neutral-500 font-medium">Fabric:</span>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="bg-transparent focus:outline-none font-medium text-neutral-900 cursor-pointer"
                >
                  {fabrics.map((f) => (
                    <option key={f} value={f}>
                      {f === 'all' ? 'All Materials' : f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-300 rounded-xs px-3 py-1.5 text-xs">
                <span className="text-neutral-500 font-medium">Size:</span>
                <select
                  value={selectedSizeFilter}
                  onChange={(e) => setSelectedSizeFilter(e.target.value)}
                  className="bg-transparent focus:outline-none font-medium text-neutral-900 cursor-pointer"
                >
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s === 'all' ? 'All Sizes' : s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 text-xs text-[#E10613] hover:underline font-semibold cursor-pointer px-2 py-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-300 rounded-xs px-3 py-1.5 text-xs text-neutral-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <label htmlFor="shop-sort" className="text-neutral-500 font-medium">Sort:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-medium text-neutral-900 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="bestseller">Best Selling First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Kicker if active */}
        {searchQuery.trim() && (
          <div className="mb-6 flex items-center justify-between bg-neutral-100 px-4 py-2.5 text-xs text-neutral-700 rounded-sm">
            <span>
              Search query active: <strong className="text-black">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => onSearchChange('')}
              className="text-neutral-500 hover:text-black flex items-center gap-1 text-[11px] cursor-pointer"
            >
              Clear search <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Product Cards Grid (2-column on mobile matching screenshot) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onInstantBuy={onInstantBuy}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-sm border border-neutral-200">
            <Filter className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-neutral-800">No matching designs found</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-5">
              Try resetting your filters or selecting another category.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#141416] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#E10613] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
