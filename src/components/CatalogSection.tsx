import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { CategoryType, Product } from '../types';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onQuickView,
  onAddToCart,
}) => {
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-asc' | 'price-desc' | 'bestseller'>('featured');
  const [selectedFabric, setSelectedFabric] = React.useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = React.useState<string>('all');
  const [showFiltersMobile, setShowFiltersMobile] = React.useState(false);

  const fabrics = ['all', 'Korean Nida', 'Cotton', 'Georgette', 'Linen'];
  const sizes = ['all', '36 (S)', '38 (M)', '40 (L)', '42 (XL)', '54 (Abaya)', 'Unstitched'];

  // Filter logic
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
    <section id="catalog-section" className="py-10 bg-[#FAFAF8] min-h-[600px] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div className="text-xs text-neutral-500 font-medium">
            Showing <strong className="font-semibold text-neutral-900 font-mono tabular-nums">{filteredProducts.length}</strong> items (Tk)
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Fabric Filter */}
            <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-xs px-3 py-1.5 text-xs">
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
            <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-xs px-3 py-1.5 text-xs">
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

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-xs px-3 py-1.5 text-xs text-neutral-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <label htmlFor="sort-select-main" className="text-neutral-500 font-medium">Sort:</label>
              <select
                id="sort-select-main"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-medium text-neutral-900 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="bestseller">Best Selling First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-[#E10613] hover:underline font-semibold cursor-pointer px-2 py-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Query Kicker if active */}
        {searchQuery.trim() && (
          <div className="mt-4 flex items-center justify-between bg-neutral-100 px-4 py-2 text-xs text-neutral-700 rounded-sm">
            <span>
              Searching for: <strong className="text-black">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => onSearchChange('')}
              className="text-neutral-500 hover:text-black flex items-center gap-1 text-[11px] cursor-pointer"
            >
              Clear search <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-7 sm:gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-sm border border-neutral-200 mt-8">
            <Filter className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-neutral-800">No matching designs found</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-5">
              We couldn't find any clothing matching your current filter combination. Try clearing your filters to explore our full collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#141416] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#E10613] transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
