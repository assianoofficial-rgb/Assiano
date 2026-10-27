import React from 'react';
import { ShoppingBag } from 'lucide-react';
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
  const productUrl = getProductUrl(product.id);
  const [cardColor, setCardColor] = React.useState<string>(product.colors[0] || '');
  const activeVar = product.colorVariations?.[cardColor];
  const displayImage = activeVar?.image || product.image;
  const displayPrice = activeVar?.price || product.price;
  const displayOriginalPrice = activeVar?.originalPrice || product.originalPrice;

  React.useEffect(() => {
    setCardColor(product.colors[0] || '');
  }, [product]);

  const handleProductNavigation = (e: React.MouseEvent) => {
    // Only intercept regular primary button clicks without modifier keys
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      if (onOpenProduct) {
        onOpenProduct(product);
      } else {
        onQuickView(product);
      }
    }
  };

  const handleBagClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to product detail page to select size/color options as requested
    if (onOpenProduct) {
      onOpenProduct(product);
    } else {
      onQuickView(product);
    }
  };

  // List view (editorial horizontal layout matching minimalist aesthetic)
  if (viewMode === 'list') {
    return (
      <article className="group bg-white rounded-none border-b border-neutral-200/70 pb-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start transition-colors">
        <a
          href={productUrl}
          onClick={handleProductNavigation}
          className="relative w-full sm:w-52 sm:min-w-[208px] aspect-[3/4] bg-[#F5F4F0] overflow-hidden cursor-pointer block"
        >
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Floating white square shopping bag button */}
          <button
            type="button"
            onClick={handleBagClick}
            aria-label="Select Options & Add to Bag"
            className="absolute bottom-3 right-3 w-10 h-10 bg-white/95 hover:bg-neutral-900 text-neutral-800 hover:text-white rounded-xs shadow-xs border border-neutral-100 flex items-center justify-center transition-all duration-200 cursor-pointer z-10 active:scale-95"
            title="Add to Bag / Select Options"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.4} />
          </button>
        </a>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <a
              href={productUrl}
              onClick={handleProductNavigation}
              className="text-sm sm:text-base font-medium uppercase tracking-[0.15em] text-neutral-800 hover:text-black transition-colors block"
            >
              {product.name}
            </a>

            <div className="mt-1.5 flex items-baseline gap-2 text-xs text-neutral-500 font-normal tracking-wide">
              <span>TK {displayPrice.toLocaleString()}</span>
              {displayOriginalPrice > displayPrice && (
                <span className="text-[11px] text-neutral-400 line-through">
                  TK {displayOriginalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-500 line-clamp-2 mt-2.5 font-light leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Subtle color dots if variations exist */}
            {product.colorVariations && Object.keys(product.colorVariations).length > 1 && (
              <div className="flex items-center gap-2 mt-3">
                {Object.entries(product.colorVariations).map(([colName, colData]) => (
                  <button
                    key={colName}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCardColor(colName);
                    }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                      cardColor === colName
                        ? 'ring-1 ring-neutral-900 scale-110 border-white'
                        : 'border-black/20 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: colData.colorCode || '#888' }}
                    title={colName}
                  />
                ))}
                <span className="text-[11px] text-neutral-400 font-normal ml-1">
                  {cardColor}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-medium">
              {product.fabric}
            </span>
            <a
              href={productUrl}
              onClick={handleProductNavigation}
              className="text-xs uppercase tracking-widest font-medium text-neutral-800 hover:text-[#E10613] transition-colors underline underline-offset-4"
            >
              View Details
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Minimalist Luxury Grid Layout (Exact match to reference image: jeem.pk style)
  return (
    <article className="group flex flex-col w-full text-center select-none">
      {/* Product Image Container: aspect-[3/4] with bottom-right floating white square bag icon */}
      <a
        href={productUrl}
        onClick={handleProductNavigation}
        className="relative aspect-[3/4] w-full bg-[#F5F4F0] overflow-hidden cursor-pointer block rounded-none"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Minimalist Floating White Square Shopping Bag Button */}
        <button
          type="button"
          onClick={handleBagClick}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white rounded-xs shadow-xs border border-neutral-100/80 flex items-center justify-center transition-all duration-200 cursor-pointer z-10 active:scale-95"
          title="Add to Bag / Select Options"
        >
          <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.4} />
        </button>
      </a>

      {/* Centered Typography matching reference: Title + Price */}
      <div className="pt-3 pb-2 px-1 flex flex-col items-center">
        {/* Product Title in clean, uppercase tracking-widest font */}
        <a
          href={productUrl}
          onClick={handleProductNavigation}
          className="text-[11.5px] sm:text-[13px] font-normal uppercase tracking-[0.14em] text-neutral-800 group-hover:text-black transition-colors cursor-pointer line-clamp-1 block max-w-full"
          title={product.name}
        >
          {product.name}
        </a>

        {/* Price Centered below title */}
        <div className="mt-1 flex items-baseline justify-center gap-1.5 text-[11.5px] sm:text-xs text-neutral-500 font-normal tracking-wide tabular-nums">
          <span>TK {displayPrice.toLocaleString()}</span>
          {displayOriginalPrice > displayPrice && (
            <span className="text-[10.5px] sm:text-[11px] text-neutral-400 line-through">
              TK {displayOriginalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Discrete Micro Color Dots if multiple variations exist */}
        {product.colorVariations && Object.keys(product.colorVariations).length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {Object.entries(product.colorVariations).map(([colName, colData]) => (
              <button
                key={colName}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCardColor(colName);
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-transform cursor-pointer ${
                  cardColor === colName
                    ? 'ring-1 ring-neutral-800 scale-125 border-white'
                    : 'border-black/20 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: colData.colorCode || '#888' }}
                title={colName}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
