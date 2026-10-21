import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenProduct?: (product: Product) => void;
  onInstantBuy?: (product: Product, size: string, color: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onOpenProduct,
  onInstantBuy,
  viewMode = 'grid',
}) => {
  const [selectedSize] = React.useState(product.sizes[0] || 'Free Size');
  const [selectedColor] = React.useState(product.colors[0] || 'Default');

  const handleCardClick = () => {
    if (onOpenProduct) {
      onOpenProduct(product);
    } else {
      onQuickView(product);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInstantBuy) {
      onInstantBuy(product, selectedSize, selectedColor);
    } else {
      onAddToCart(product, selectedSize, selectedColor);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
  };

  if (viewMode === 'list') {
    return (
      <article className="group bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col sm:flex-row transition-all duration-200 hover:shadow-md hover:border-neutral-300">
        <div
          className="relative w-full sm:w-48 sm:min-w-[192px] aspect-[4/3] sm:aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer"
          onClick={handleCardClick}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {product.discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-[#E10613] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 uppercase rounded-xs shadow-sm">
              {product.discountPercent}% OFF
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
          <div>
            <h3
              onClick={handleCardClick}
              className="text-base sm:text-lg font-bold text-neutral-900 hover:text-[#E10613] transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            
            {/* Sold Count directly under Title */}
            <p className="text-xs text-neutral-500 font-medium mt-1">
              {product.soldCount} Sold
            </p>

            <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mt-2">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-[#141416] tabular-nums">
                Tk {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-neutral-400 line-through tabular-nums">
                  Tk {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBuyNow}
                className="px-4 py-2 bg-[#E10613] hover:bg-[#b8000b] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>অর্ডার করুন</span>
              </button>
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="p-2 border border-neutral-300 hover:border-black text-neutral-800 rounded-xs hover:bg-neutral-50 cursor-pointer"
                title="Add to Bag"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative bg-white border border-neutral-200/90 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-neutral-300">
      {/* Product Image Slot */}
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Clean Discount Badge */}
        {product.discountPercent > 0 ? (
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10">
            <div className="bg-[#E10613] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-sm">
              {product.discountPercent}% OFF
            </div>
          </div>
        ) : product.isBestSeller ? (
          <div className="absolute top-2 left-2 bg-[#141416] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 uppercase rounded-xs shadow-sm">
            Bestseller
          </div>
        ) : null}

        {/* Cash on Delivery guarantee tag on bottom of image */}
        <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-xs font-medium tracking-tight">
          ক্যাশ অন ডেলিভারি
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Product Name */}
          <h3
            onClick={handleCardClick}
            className="text-[13px] sm:text-[14px] font-bold text-neutral-900 line-clamp-1 hover:text-[#E10613] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Sold Count directly under Title */}
          <p className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-0.5">
            {product.soldCount} Sold
          </p>
        </div>

        {/* Pricing Row */}
        <div className="pt-2 mt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base sm:text-lg font-bold text-[#141416] tabular-nums">
              Tk {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                Tk {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
            {/* Direct Order Now button in prominent red */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="col-span-8 sm:col-span-9 py-2 px-2 bg-[#E10613] hover:bg-[#b8000b] active:bg-[#910009] text-white text-[11px] sm:text-xs font-bold tracking-tight uppercase rounded-xs transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current shrink-0" />
              <span className="truncate">অর্ডার করুন</span>
            </button>

            {/* Add to Bag button */}
            <button
              type="button"
              onClick={handleAddToCartClick}
              title="Add to Bag (ব্যাগে রাখুন)"
              className="col-span-4 sm:col-span-3 py-2 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-xs font-semibold rounded-xs transition-colors flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
