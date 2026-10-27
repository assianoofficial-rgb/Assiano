import React from 'react';
import { ArrowLeft, Check, Shield, Truck, RotateCcw, Ruler, Plus, Minus, ShoppingBag, Zap, Star } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, qty?: number, customPrice?: number, customImage?: string) => void;
  onInstantBuy: (product: Product, size: string, color: string, qty: number, customPrice?: number, customImage?: string) => void;
  onOpenSizeGuide: () => void;
  onNavigateCategory: (cat: CategoryType) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBackToShop,
  onSelectProduct,
  onAddToCart,
  onInstantBuy,
  onOpenSizeGuide,
  onNavigateCategory,
}) => {
  const [selectedSize, setSelectedSize] = React.useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = React.useState<string>(product.colors[0] || 'Default');
  const [quantity, setQuantity] = React.useState(1);
  const [activeImage, setActiveImage] = React.useState(product.image);

  // Active variation details based on selected color
  const activeVariation = product.colorVariations?.[selectedColor];
  const activePrice = activeVariation?.price ?? product.price;
  const activeOriginalPrice = activeVariation?.originalPrice ?? product.originalPrice;
  const activeDiscountPercent = activeVariation?.discountPercent ?? (
    activeOriginalPrice > activePrice
      ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
      : product.discountPercent
  );
  const activeDescription = activeVariation?.description ?? product.description;

  // Image Zoom In / Out State
  const [zoomScale, setZoomScale] = React.useState(1);
  const [zoomOrigin, setZoomOrigin] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    const defaultColor = product.colors[0] || 'Default';
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedColor(defaultColor);
    setQuantity(1);
    const initialImg = product.colorVariations?.[defaultColor]?.image || product.image;
    setActiveImage(initialImg);
    setZoomScale(1);
    setZoomOrigin({ x: 50, y: 50 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Handle color change and swap image, price, description
  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    if (product.colorVariations?.[color]) {
      setActiveImage(product.colorVariations[color].image);
    }
  };

  // Reset zoom whenever image changes
  React.useEffect(() => {
    setZoomScale(1);
    setZoomOrigin({ x: 50, y: 50 });
  }, [activeImage]);

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 3));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale((prev) => {
      const next = Math.max(Number((prev - 0.5).toFixed(1)), 1);
      if (next === 1) setZoomOrigin({ x: 50, y: 50 });
      return next;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoomScale(1);
    setZoomOrigin({ x: 50, y: 50 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomScale <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomScale <= 1 || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleImageDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomScale > 1) {
      handleResetZoom();
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setZoomOrigin({ x, y });
      setZoomScale(2);
    }
  };

  // Related products
  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestSeller))
    .slice(0, 4);

  return (
    <div className="bg-[#FAFAF8] py-0 sm:py-12">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation & Share Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-0 py-3 sm:py-0 mb-0 sm:mb-8 bg-white sm:bg-transparent border-b sm:border-b-0 border-neutral-200/80">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <a
              href="/shop"
              onClick={(e) => {
                e.preventDefault();
                onBackToShop();
              }}
              className="hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Shop</span>
            </a>
            <span>/</span>
            <a
              href={`/shop/${product.category}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigateCategory(product.category);
              }}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {product.categoryLabel}
            </a>
            <span>/</span>
            <span className="text-neutral-900 font-semibold truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const fullUrl = window.location.origin + '/product/' + product.id;
              navigator.clipboard?.writeText(fullUrl);
              const el = document.getElementById('copied-badge');
              if (el) {
                el.classList.remove('opacity-0');
                setTimeout(() => el.classList.add('opacity-0'), 2500);
              }
            }}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-[#E10613] bg-neutral-50 sm:bg-white border border-neutral-200 px-3 py-1.5 rounded-xs transition-colors cursor-pointer shadow-xs ml-auto"
            title="Copy direct product link"
          >
            <span className="text-[11px]">🔗 কপি লিংক</span>
            <span id="copied-badge" className="text-[10px] text-emerald-600 font-bold opacity-0 transition-opacity">
              ✓ Copied!
            </span>
          </button>
        </div>

        {/* Product Purchase Section Grid: borderless & padless on mobile for full-bleed image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 bg-white p-0 sm:p-10 border-0 sm:border border-neutral-200 rounded-none sm:rounded-sm mb-10 sm:mb-16">
          
          {/* Left Column: Image Presentation */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Main Product Image Container with Zoom: Full width edge-to-edge without padding/border on mobile */}
            <div
              className={`relative aspect-[3/4] w-full rounded-none sm:rounded-sm overflow-hidden bg-neutral-100 border-0 sm:border border-neutral-200 shadow-none sm:shadow-xs select-none transition-all ${
                zoomScale > 1 ? 'cursor-move ring-2 ring-[#E10613]/30' : 'cursor-zoom-in'
              }`}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onDoubleClick={handleImageDoubleClick}
              title={zoomScale > 1 ? 'Move cursor or touch drag to inspect details • Double-click to reset' : 'Click + or double-click to zoom in'}
            >
              <img
                src={activeImage}
                alt={product.name}
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  transition: zoomScale === 1 ? 'transform 0.25s ease-out' : 'transform 0.12s ease-out',
                }}
                className="w-full h-full object-cover object-center pointer-events-none will-change-transform"
                referrerPolicy="no-referrer"
              />

              {/* Discount Tag */}
              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#E10613] text-white text-xs font-bold tracking-wider px-2.5 py-1 uppercase rounded-xs shadow-sm z-10 pointer-events-none">
                  {product.discountPercent}% OFF
                </div>
              )}

              {/* Active Zoom Indicator Pill */}
              {zoomScale > 1 && (
                <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-xs shadow-md flex items-center gap-1.5 pointer-events-none animate-in fade-in duration-150">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Zoom: {zoomScale.toFixed(1)}x • ড্র্যাগ করে দেখুন</span>
                </div>
              )}

              {/* Side Floating Zoom Controls (+ / -) */}
              <div
                className="absolute top-4 right-4 z-20 flex flex-col items-center bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-md shadow-lg p-1 space-y-1"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Zoom In (+) */}
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3}
                  className="w-8 h-8 flex items-center justify-center rounded-xs text-neutral-800 hover:text-white hover:bg-[#E10613] active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-800 disabled:cursor-not-allowed transition-all cursor-pointer font-bold shadow-2xs"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Current Zoom Level / Reset Indicator */}
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer select-none ${
                    zoomScale > 1
                      ? 'text-[#E10613] bg-red-50 hover:bg-red-100 font-extrabold'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                  title={zoomScale > 1 ? 'Click to reset zoom (1.0x)' : 'Current zoom 1.0x'}
                >
                  {zoomScale.toFixed(1)}x
                </button>

                {/* Zoom Out (-) */}
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-xs text-neutral-800 hover:text-white hover:bg-[#E10613] active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-800 disabled:cursor-not-allowed transition-all cursor-pointer font-bold shadow-2xs"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Reset button if zoomed */}
                {zoomScale > 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="w-8 h-7 flex items-center justify-center rounded-xs text-neutral-500 hover:text-[#E10613] hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer border-t border-neutral-200/60 mt-0.5 pt-0.5"
                    title="Reset to 1.0x"
                    aria-label="Reset to 1.0x"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Color Variation Image Thumbnails */}
            {product.colorVariations && Object.keys(product.colorVariations).length > 0 && (
              <div className="pt-2 px-4 sm:px-0">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-800">
                    Color Variants: <strong className="text-[#E10613]">{selectedColor}</strong>
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Tk {activePrice}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {Object.entries(product.colorVariations).map(([colName, colData]) => {
                    const isSelected = selectedColor === colName;
                    return (
                      <button
                        key={colName}
                        type="button"
                        onClick={() => handleSelectColor(colName)}
                        className={`group relative rounded-sm overflow-hidden aspect-[3/4] border-2 transition-all cursor-pointer bg-neutral-100 ${
                          isSelected
                            ? 'border-[#E10613] ring-2 ring-[#E10613]/30 shadow-md scale-[1.02]'
                            : 'border-neutral-200 opacity-75 hover:opacity-100 hover:border-neutral-400'
                        }`}
                        title={`${colName} - Tk ${colData.price}`}
                      >
                        <img
                          src={colData.image}
                          alt={colName}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-2xs p-1 text-center">
                          <span className="block text-[10px] font-semibold text-white truncate leading-tight">
                            {colName}
                          </span>
                          <span className="block text-[9.5px] font-mono font-bold text-amber-300 tabular-nums">
                            Tk {colData.price}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-[#E10613] text-white p-0.5 rounded-full shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Micro Trust Strip */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 px-4 sm:px-0 text-center text-xs text-neutral-600">
              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200/80">
                <Shield className="w-4 h-4 text-[#E10613] mx-auto mb-1" />
                <span className="font-semibold text-neutral-900 block text-[11px]">100% Authentic</span>
                <span className="text-[10px] text-neutral-500">Premium Fabrics</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200/80">
                <Truck className="w-4 h-4 text-[#E10613] mx-auto mb-1" />
                <span className="font-semibold text-neutral-900 block text-[11px]">Nationwide COD</span>
                <span className="text-[10px] text-neutral-500">Dhaka 24-48 hrs</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200/80">
                <RotateCcw className="w-4 h-4 text-[#E10613] mx-auto mb-1" />
                <span className="font-semibold text-neutral-900 block text-[11px]">7-Day Exchange</span>
                <span className="text-[10px] text-neutral-500">Hassle-Free</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 px-4 sm:px-0 pt-4 sm:pt-0 pb-6 sm:pb-0">
            <div>
              {/* Category & Code */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                <span className="uppercase tracking-[0.2em] font-bold text-[#E10613]">
                  {product.categoryLabel}
                </span>
                <span className="font-mono tabular-nums">CODE: {product.id.toUpperCase()}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">{product.subtitle}</p>

              {/* Price & Rating Row (Updates dynamically per variation) */}
              <div className="mt-5 flex items-baseline justify-between pb-5 border-b border-neutral-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-mono text-[#141416] tabular-nums">
                    Tk {activePrice}
                  </span>
                  {activeOriginalPrice > activePrice && (
                    <span className="text-base text-neutral-400 line-through font-mono tabular-nums">
                      Tk {activeOriginalPrice}
                    </span>
                  )}
                  {activeOriginalPrice > activePrice && (
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200/60">
                      Save Tk {activeOriginalPrice - activePrice} ({activeDiscountPercent}% OFF)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums font-bold text-neutral-900">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-400 text-[11px]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Color Selection with Swatches and Specific Price */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-800">
                    Select Color: <strong className="text-neutral-900">{selectedColor}</strong>
                  </span>
                  {product.colorVariations?.[selectedColor] && (
                    <span className="text-[11px] font-mono font-bold text-[#E10613]">
                      Price: Tk {product.colorVariations[selectedColor].price}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => {
                    const varInfo = product.colorVariations?.[color];
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleSelectColor(color)}
                        className={`flex items-center gap-2 px-3.5 py-2 text-xs rounded-sm border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#E10613] bg-red-50/50 text-neutral-900 font-bold ring-1 ring-[#E10613] shadow-xs'
                            : 'border-neutral-300 bg-white text-neutral-700 hover:border-black hover:bg-neutral-50'
                        }`}
                      >
                        {varInfo?.colorCode && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-2xs"
                            style={{ backgroundColor: varInfo.colorCode }}
                          />
                        )}
                        <span>{color}</span>
                        {varInfo && (
                          <span
                            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs ${
                              isSelected ? 'bg-[#E10613] text-white' : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            Tk {varInfo.price}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-800">
                    Size: <strong className="text-neutral-900">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[#E10613] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Measurements Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs rounded-xs border transition-colors cursor-pointer font-medium ${
                        selectedSize === size
                          ? 'border-[#E10613] bg-[#E10613] text-white shadow-xs'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Specifications (Sleeve, Neckline, Pattern, Occasion) */}
              {(product.sleeveLength || product.neckline || product.pattern || product.occasion) && (
                <div className="mt-5 p-3.5 bg-neutral-50 rounded-xs border border-neutral-200/80 space-y-2">
                  <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider block">
                    Product Specifications
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    {product.sleeveLength && (
                      <div>
                        <span className="text-neutral-500 block text-[10.5px]">Sleeve Length:</span>
                        <span className="font-semibold text-neutral-900">{product.sleeveLength}</span>
                      </div>
                    )}
                    {product.neckline && (
                      <div>
                        <span className="text-neutral-500 block text-[10.5px]">Neckline:</span>
                        <span className="font-semibold text-neutral-900">{product.neckline}</span>
                      </div>
                    )}
                    {product.pattern && (
                      <div>
                        <span className="text-neutral-500 block text-[10.5px]">Pattern:</span>
                        <span className="font-semibold text-neutral-900">{product.pattern}</span>
                      </div>
                    )}
                    {product.occasion && (
                      <div>
                        <span className="text-neutral-500 block text-[10.5px]">Occasion:</span>
                        <span className="font-semibold text-neutral-900">{product.occasion}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description & Key Fabric Details (Updates dynamically per color) */}
              <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider block">
                    Description ({selectedColor}):
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {activeDescription}
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200/80 space-y-1.5 text-xs">
                  <div className="text-neutral-800">
                    <strong>Fabric:</strong> {product.fabric}
                  </div>
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-[#E10613] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add to Bag + Buy Now */}
            <div className="pt-6 border-t border-neutral-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-300 rounded-xs bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 text-neutral-600 hover:text-black disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-semibold text-xs tabular-nums text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity, activePrice, activeImage)}
                  className="flex-1 py-3.5 px-4 bg-white border border-neutral-900 text-neutral-900 hover:bg-neutral-100 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag (Tk {activePrice * quantity})</span>
                </button>
              </div>

              {/* Direct Instant Order Button */}
              <button
                onClick={() => onInstantBuy(product, selectedSize, selectedColor, quantity, activePrice, activeImage)}
                className="w-full py-4 px-4 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 animate-order-glow hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Order Now • Tk {activePrice * quantity} (Cash on Delivery)</span>
              </button>

              <div className="text-[11px] text-center text-neutral-500 space-y-0.5 pt-1">
                <p>Delivery: Dhaka Tk 60 (24-48 hrs) · Outside Dhaka Tk 120 (48-72 hrs)</p>
                <p className="text-neutral-400">Doorstep inspection permitted upon courier arrival</p>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div className="pt-6 px-4 sm:px-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold block mb-1">
                  Complete the Look
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#141416]">
                  Related Modest Silhouettes
                </h3>
              </div>
              <button
                onClick={onBackToShop}
                className="text-xs font-semibold text-neutral-900 hover:text-[#E10613] transition-colors cursor-pointer uppercase tracking-wider"
              >
                View Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onOpenProduct={onSelectProduct}
                  onQuickView={(p) => onSelectProduct(p)}
                  onAddToCart={(p, s, c) => onAddToCart(p, s, c, 1)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
