import React from 'react';
import { X, Heart, Star, Check, Shield, Truck, RotateCcw, Ruler, Plus, Minus, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty?: number, customPrice?: number, customImage?: string) => void;
  onInstantBuy: (product: Product, size: string, color: string, qty: number, customPrice?: number, customImage?: string) => void;
  onOpenSizeGuide: () => void;
  onViewFullPage?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
  onOpenSizeGuide,
  onViewFullPage,
}) => {
  if (!product) return null;

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

  // Zoom In / Out State
  const [zoomScale, setZoomScale] = React.useState(1);
  const [zoomOrigin, setZoomOrigin] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    if (product) {
      const defaultColor = product.colors[0] || 'Default';
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(defaultColor);
      setQuantity(1);
      const initialImg = product.colorVariations?.[defaultColor]?.image || product.image;
      setActiveImage(initialImg);
      setZoomScale(1);
      setZoomOrigin({ x: 50, y: 50 });
    }
  }, [product]);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    if (product.colorVariations?.[color]) {
      setActiveImage(product.colorVariations[color].image);
    }
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-neutral-200 my-auto overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-black bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Gallery View (Left) */}
          <div className="md:col-span-6 bg-neutral-100 flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-neutral-200">
            <div
              className={`relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-white shadow-inner select-none transition-all ${
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

              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#E10613] text-white text-xs font-bold px-2 py-0.5 rounded-xs uppercase z-10 pointer-events-none">
                  {product.discountPercent}% OFF
                </span>
              )}

              {/* Active Zoom Indicator */}
              {zoomScale > 1 && (
                <div className="absolute bottom-3 left-3 z-10 bg-black/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-xs shadow-md flex items-center gap-1.5 pointer-events-none animate-in fade-in duration-150">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Zoom: {zoomScale.toFixed(1)}x</span>
                </div>
              )}

              {/* Side Floating Zoom Controls (+ / -) */}
              <div
                className="absolute top-3 right-3 z-20 flex flex-col items-center bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-md shadow-md p-1 space-y-1"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Zoom In (+) */}
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3}
                  className="w-7 h-7 flex items-center justify-center rounded-xs text-neutral-800 hover:text-white hover:bg-[#E10613] active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-800 disabled:cursor-not-allowed transition-all cursor-pointer font-bold shadow-2xs"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {/* Scale Display */}
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded-xs transition-colors cursor-pointer select-none ${
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
                  className="w-7 h-7 flex items-center justify-center rounded-xs text-neutral-800 hover:text-white hover:bg-[#E10613] active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-800 disabled:cursor-not-allowed transition-all cursor-pointer font-bold shadow-2xs"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {/* Reset button if zoomed */}
                {zoomScale > 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    className="w-7 h-6 flex items-center justify-center rounded-xs text-neutral-500 hover:text-[#E10613] hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer border-t border-neutral-200/60 mt-0.5 pt-0.5"
                    title="Reset to 1.0x"
                    aria-label="Reset to 1.0x"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Color Variation Thumbnails */}
            {product.colorVariations && Object.keys(product.colorVariations).length > 0 && (
              <div className="mt-3">
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(product.colorVariations).map(([colName, colData]) => {
                    const isSelected = selectedColor === colName;
                    return (
                      <button
                        key={colName}
                        type="button"
                        onClick={() => handleSelectColor(colName)}
                        className={`group relative rounded-xs overflow-hidden aspect-[3/4] border-2 transition-all cursor-pointer bg-white ${
                          isSelected
                            ? 'border-[#E10613] ring-1 ring-[#E10613]/30 shadow-sm scale-102'
                            : 'border-neutral-200 opacity-75 hover:opacity-100 hover:border-neutral-400'
                        }`}
                        title={`${colName} - Tk ${colData.price}`}
                      >
                        <img
                          src={colData.image}
                          alt={colName}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/80 p-0.5 text-center">
                          <span className="block text-[8.5px] font-semibold text-white truncate leading-tight">
                            {colName}
                          </span>
                          <span className="block text-[8px] font-mono font-bold text-amber-300">
                            Tk {colData.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Micro badges below image */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600">
              <div className="p-2 bg-white/70 rounded-xs border border-neutral-200/60">
                <Shield className="w-3.5 h-3.5 text-[#E10613] mx-auto mb-1" />
                <span className="font-medium text-neutral-800">100% Quality</span>
              </div>
              <div className="p-2 bg-white/70 rounded-xs border border-neutral-200/60">
                <Truck className="w-3.5 h-3.5 text-[#E10613] mx-auto mb-1" />
                <span className="font-medium text-neutral-800">Fast Courier</span>
              </div>
              <div className="p-2 bg-white/70 rounded-xs border border-neutral-200/60">
                <RotateCcw className="w-3.5 h-3.5 text-[#E10613] mx-auto mb-1" />
                <span className="font-medium text-neutral-800">Easy Return</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Module (Right) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span className="uppercase tracking-widest font-semibold text-[#E10613]">
                  {product.categoryLabel}
                </span>
                <span className="font-mono tabular-nums">Code: {product.id.toUpperCase()}</span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl font-serif font-bold text-neutral-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-neutral-500 mt-1">{product.subtitle}</p>

              {/* Pricing & Rating (Updates dynamically per variation) */}
              <div className="mt-4 flex items-baseline justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold font-mono text-[#141416] tabular-nums">
                    Tk {activePrice.toLocaleString()}
                  </span>
                  {activeOriginalPrice > activePrice && (
                    <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                      Tk {activeOriginalPrice.toLocaleString()}
                    </span>
                  )}
                  {activeOriginalPrice > activePrice && (
                    <span className="text-xs text-emerald-700 font-medium">
                      Save Tk {(activeOriginalPrice - activePrice).toLocaleString()} ({activeDiscountPercent}% OFF)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-800">
                    Selected Color: <span className="font-bold text-neutral-900">{selectedColor}</span>
                  </span>
                  {product.colorVariations?.[selectedColor] && (
                    <span className="text-[11px] font-mono font-bold text-[#E10613]">
                      Tk {product.colorVariations[selectedColor].price.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const varInfo = product.colorVariations?.[color];
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleSelectColor(color)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xs border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#E10613] bg-red-50/50 text-neutral-900 font-bold ring-1 ring-[#E10613]'
                            : 'border-neutral-300 bg-white text-neutral-700 hover:border-black'
                        }`}
                      >
                        {varInfo?.colorCode && (
                          <span
                            className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: varInfo.colorCode }}
                          />
                        )}
                        <span>{color}</span>
                        {varInfo && (
                          <span className={`text-[9.5px] font-mono font-semibold px-1 py-0.2 rounded-2xs ${
                            isSelected ? 'bg-[#E10613] text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}>
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
                    Size: <span className="font-bold text-neutral-900">{selectedSize}</span>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[#E10613] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Chart</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 text-xs rounded-xs border transition-colors cursor-pointer font-medium ${
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
                <div className="mt-4 p-3 bg-neutral-50 rounded-xs border border-neutral-200/80 space-y-1.5">
                  <span className="text-[10.5px] font-bold text-neutral-900 uppercase tracking-wider block">
                    Product Details
                  </span>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                    {product.sleeveLength && (
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Sleeve Length:</span>
                        <span className="font-semibold text-neutral-900 text-[11px]">{product.sleeveLength}</span>
                      </div>
                    )}
                    {product.neckline && (
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Neckline:</span>
                        <span className="font-semibold text-neutral-900 text-[11px]">{product.neckline}</span>
                      </div>
                    )}
                    {product.pattern && (
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Pattern:</span>
                        <span className="font-semibold text-neutral-900 text-[11px]">{product.pattern}</span>
                      </div>
                    )}
                    {product.occasion && (
                      <div>
                        <span className="text-neutral-500 block text-[10px]">Occasion:</span>
                        <span className="font-semibold text-neutral-900 text-[11px]">{product.occasion}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description & Key Fabric Details */}
              <div className="mt-5 pt-4 border-t border-neutral-100">
                <div className="space-y-1">
                  <span className="text-[10.5px] font-bold text-neutral-900 uppercase tracking-wider block">
                    Description ({selectedColor}):
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {activeDescription}
                  </p>
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="text-[11px] text-neutral-700">
                    <strong className="text-neutral-900">Fabric Composition:</strong> {product.fabric}
                  </div>
                  {product.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-600">
                      <Check className="w-3 h-3 text-[#E10613] shrink-0 mt-0.5" />
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
                    className="p-2 text-neutral-600 hover:text-black disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono font-semibold text-xs tabular-nums text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-neutral-600 hover:text-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => {
                    onAddToCart(product, selectedSize, selectedColor, quantity, activePrice, activeImage);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-white border border-neutral-900 text-neutral-900 hover:bg-neutral-100 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag (Tk {(activePrice * quantity).toLocaleString()})</span>
                </button>
              </div>

              {/* Direct Instant Cash on Delivery Checkout Button */}
              <button
                onClick={() => {
                  onInstantBuy(product, selectedSize, selectedColor, quantity, activePrice, activeImage);
                  onClose();
                }}
                className="w-full py-3.5 px-4 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 animate-order-glow hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Order Now • Tk {(activePrice * quantity).toLocaleString()} (Cash on Delivery)</span>
              </button>

              {onViewFullPage && (
                <a
                  href={`/product/${product.id}`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      onViewFullPage(product);
                      onClose();
                    }
                  }}
                  className="w-full text-center text-xs text-neutral-800 hover:text-[#E10613] font-semibold underline underline-offset-4 py-1 cursor-pointer transition-colors block"
                >
                  View Full Separate Product Page →
                </a>
              )}

              <p className="text-[11px] text-center text-neutral-500">
                Tk 60 inside Dhaka · Tk 120 outside Dhaka · No Advance Payment Required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
