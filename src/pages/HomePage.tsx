import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryNav } from '../components/CategoryNav';
import { LookbookSection } from '../components/LookbookSection';
import { CustomerReviews } from '../components/CustomerReviews';
import { ProductCard } from '../components/ProductCard';
import { CategoryType, Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onNavigateShop: (cat?: CategoryType) => void;
  onOpenProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onNavigateShop,
  onOpenProduct,
  onQuickView,
  onAddToCart,
}) => {
  return (
    <div>
      {/* Editorial Hero Banner */}
      <Hero
        onShopClick={() => onNavigateShop('all')}
        onExploreAbayas={() => onNavigateShop('abaya')}
      />

      {/* Centered Large Circular Categories */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigateShop(cat);
        }}
      />

      {/* Featured Bestsellers Showcase */}
      <section className="py-14 bg-[#FAFAF8] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E10613] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked for You</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#141416]">
                Trending & Signature Designs
              </h2>
            </div>

            <button
              onClick={() => onNavigateShop('all')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-[#E10613] transition-colors cursor-pointer group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Featured Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Atelier Section */}
      <LookbookSection
        featuredProducts={products}
        onSelectProduct={(p) => onOpenProduct(p)}
      />

      {/* Customer Reviews & Social Proof */}
      <CustomerReviews />
    </div>
  );
};
