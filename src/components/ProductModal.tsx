import React from 'react';
import { X, Heart, Star, Check, Shield, Truck, RotateCcw, Ruler, Plus, Minus, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty?: number) => void;
  onInstantBuy: (product: Product, size: string, color: string, qty: number) => void;
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

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0] || 'Default');
      setQuantity(1);
      setActiveImage(product.image);
    }
  }, [product]);

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
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-white shadow-inner">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {product.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#E10613] text-white text-xs font-bold px-2 py-0.5 rounded-xs uppercase">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

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

              {/* Pricing & Rating */}
              <div className="mt-4 flex items-baseline justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold font-mono text-[#141416] tabular-nums">
                    Tk {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-neutral-400 line-through font-mono tabular-nums">
                      Tk {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-medium">
                    Save Tk {(product.originalPrice - product.price).toLocaleString()}
                  </span>
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
                    Selected Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-xs border transition-colors cursor-pointer ${
                        selectedColor === color
                          ? 'border-[#141416] bg-[#141416] text-white'
                          : 'border-neutral-300 bg-white text-neutral-700 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-800">
                    Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
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

              {/* Description & Key Fabric Details */}
              <div className="mt-5 pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {product.description}
                </p>

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
                    onAddToCart(product, selectedSize, selectedColor, quantity);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-white border border-neutral-900 text-neutral-900 hover:bg-neutral-100 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Direct Instant Cash on Delivery Checkout Button */}
              <button
                onClick={() => {
                  onInstantBuy(product, selectedSize, selectedColor, quantity);
                  onClose();
                }}
                className="w-full py-3.5 px-4 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Order Now (Cash on Delivery)</span>
              </button>

              {onViewFullPage && (
                <button
                  type="button"
                  onClick={() => {
                    onViewFullPage(product);
                    onClose();
                  }}
                  className="w-full text-center text-xs text-neutral-800 hover:text-[#E10613] font-semibold underline underline-offset-4 py-1 cursor-pointer transition-colors"
                >
                  View Full Separate Product Page →
                </button>
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
