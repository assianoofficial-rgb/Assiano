import React from 'react';
import { Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onOpenProduct,
}) => {
  const [selectedSize] = React.useState(product.sizes[0] || 'Standard');
  const [selectedColor] = React.useState(product.colors[0] || 'Default');

  const handleCardClick = () => {
    if (onOpenProduct) {
      onOpenProduct(product);
    } else {
      onQuickView(product);
    }
  };

  return (
    <article className="group relative bg-white border border-neutral-200/80 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Visual Slot - 70% height aspect ratio */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Quiet Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-[#E10613] text-white text-[11px] font-bold tracking-wider px-2 py-0.5 uppercase rounded-xs shadow-sm">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Best seller or new tag */}
        {product.isBestSeller && product.discountPercent === 0 && (
          <div className="absolute top-3 left-3 bg-[#141416] text-white text-[11px] font-medium tracking-wider px-2 py-0.5 uppercase rounded-xs">
            Bestseller
          </div>
        )}

        {/* Quick View Floating Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-neutral-900 text-xs font-semibold tracking-wider uppercase rounded-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-600" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedSize, selectedColor);
            }}
            title="Add to Bag"
            className="px-3 py-2 bg-[#141416] hover:bg-[#E10613] text-white text-xs rounded-xs shadow-md transition-colors flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Subtle Category & Fabric Kicker */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
            <span>{product.categoryLabel}</span>
            <span className="text-[10px] text-neutral-500 font-normal">
              {product.soldCount} Sold
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={handleCardClick}
            className="text-[15px] font-semibold text-neutral-900 line-clamp-1 hover:text-[#E10613] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Ratings Row */}
        <div className="pt-3 mt-3 border-t border-neutral-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#141416] font-mono tabular-nums">
              ৳ {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through font-mono tabular-nums">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono tabular-nums font-medium text-[11px]">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
