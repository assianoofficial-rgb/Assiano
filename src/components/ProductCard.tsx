import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types';
import { getProductUrl } from '../utils/navigation';

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
  const [isOrdered, setIsOrdered] = React.useState(false);
  const productUrl = getProductUrl(product.id);

  const handleProductNavigation = (e: React.MouseEvent) => {
    // Only intercept regular primary button clicks without modifiers
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      if (onOpenProduct) {
        onOpenProduct(product);
      } else {
        onQuickView(product);
      }
    }
  };

  const handleOrderNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInstantBuy) {
      onInstantBuy(product, selectedSize, selectedColor);
    } else {
      onAddToCart(product, selectedSize, selectedColor);
    }
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 1800);
  };

  if (viewMode === 'list') {
    return (
      <article className="group bg-white border border-neutral-200/80 rounded-xl overflow-hidden flex flex-col sm:flex-row transition-all duration-200 hover:shadow-md hover:border-neutral-300">
        <a
          href={productUrl}
          onClick={handleProductNavigation}
          className="relative w-full sm:w-48 sm:min-w-[192px] aspect-[9/13] sm:aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer block"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Frosted rating badge */}
          <div className="absolute bottom-2 left-2 bg-white/85 backdrop-blur-xs text-neutral-800 text-[10px] font-semibold px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
            <span className="text-amber-500 font-bold">★</span>
            <span>{product.rating > 0 ? product.rating.toFixed(1) : '5.0'}</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-600">{product.soldCount} Sold</span>
          </div>

          {product.discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-[#E10613] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 uppercase rounded-xs shadow-sm">
              {product.discountPercent}% OFF
            </div>
          )}
        </a>

        <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
          <div>
            <a
              href={productUrl}
              onClick={handleProductNavigation}
              className="text-base sm:text-lg font-bold text-neutral-900 hover:text-[#E10613] transition-colors cursor-pointer block"
            >
              {product.name}
            </a>

            <p className="text-xs text-neutral-500 font-medium mt-1">
              {product.soldCount} Sold
            </p>

            <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mt-2">
              {product.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-neutral-900 tabular-nums">
                TK. {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through tabular-nums">
                  TK. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleOrderNowClick}
              className={`px-5 py-2.5 rounded-md text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                isOrdered
                  ? 'bg-emerald-600 text-white border border-emerald-600'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 hover:border-neutral-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{isOrdered ? 'Processing...' : 'Order Now'}</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Exact mobile-first design matching Glam Touch screenshot:
  return (
    <article className="group relative bg-white border border-neutral-200/80 rounded-xl overflow-hidden flex flex-col shadow-xs transition-all duration-300 hover:shadow-md hover:border-neutral-300">
      {/* Product Image Slot: Slightly taller vertical ratio on mobile (aspect-[9/13] or aspect-[10/14.5]) */}
      <a
        href={productUrl}
        onClick={handleProductNavigation}
        className="relative aspect-[9/13] sm:aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Translucent Rating / Sold Badge in Bottom-Left of Image (exact screenshot style) */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-neutral-800 text-[10.5px] font-medium px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1 tracking-tight">
          <span>{product.rating > 0 ? product.rating.toFixed(1) : '5.0'}</span>
          <span className="text-amber-500 text-[11px] leading-none">★</span>
          <span className="text-neutral-300">|</span>
          <span className="text-neutral-600">{product.soldCount} Sold</span>
        </div>

        {/* Subtle Discount Tag if on sale */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-[#E10613] text-white text-[9.5px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs">
            {product.discountPercent}% OFF
          </div>
        )}
      </a>

      {/* Card Content (Clean Title, Price, Order Now button) */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-grow justify-between bg-white text-left">
        <div>
          {/* Product Title */}
          <a
            href={productUrl}
            onClick={handleProductNavigation}
            className="text-[13px] sm:text-[14px] font-medium text-neutral-800 line-clamp-1 hover:text-[#E10613] transition-colors cursor-pointer leading-snug block"
            title={product.name}
          >
            {product.name}
          </a>

          {/* Clean Price Display: TK. 3300 */}
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[14px] sm:text-[15px] font-bold text-neutral-900 tabular-nums">
              TK. {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-neutral-400 line-through tabular-nums">
                TK. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Clean Rounded "Order Now" button */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={handleOrderNowClick}
            className={`w-full py-2 px-3 rounded-md text-xs font-semibold transition-all duration-200 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
              isOrdered
                ? 'bg-emerald-600 text-white border border-emerald-600'
                : 'bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 border border-neutral-300/90 hover:border-neutral-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{isOrdered ? 'Processing...' : 'Order Now'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
