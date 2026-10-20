import React from 'react';
import { ArrowLeft, Check, Shield, Truck, RotateCcw, Ruler, Plus, Minus, ShoppingBag, Zap, Star } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string, qty?: number) => void;
  onInstantBuy: (product: Product, size: string, color: string, qty: number) => void;
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

  React.useEffect(() => {
    setSelectedSize(product.sizes[0] || 'Standard');
    setSelectedColor(product.colors[0] || 'Default');
    setQuantity(1);
    setActiveImage(product.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Related products
  const related = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isBestSeller))
    .slice(0, 4);

  return (
    <div className="bg-[#FAFAF8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-8 font-medium">
          <button onClick={onBackToShop} className="hover:text-black transition-colors cursor-pointer flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Shop</span>
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigateCategory(product.category)}
            className="hover:text-black transition-colors cursor-pointer"
          >
            {product.categoryLabel}
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Purchase Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 border border-neutral-200 rounded-sm mb-16">
          
          {/* Left Column: Image Presentation */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#E10613] text-white text-xs font-bold tracking-wider px-2.5 py-1 uppercase rounded-xs shadow-sm">
                  {product.discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Micro Trust Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-neutral-600">
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
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
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

              {/* Price & Rating Row */}
              <div className="mt-5 flex items-baseline justify-between pb-5 border-b border-neutral-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-mono text-[#141416] tabular-nums">
                    ৳ {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-neutral-400 line-through font-mono tabular-nums">
                      ৳ {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200/60">
                    Save ৳ {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-mono tabular-nums font-bold text-neutral-900">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-400 text-[11px]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-800">
                    Color: <strong className="text-neutral-900">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-1.5 text-xs rounded-xs border transition-colors cursor-pointer ${
                        selectedColor === color
                          ? 'border-[#141416] bg-[#141416] text-white font-semibold'
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

              {/* Description & Key Fabric Details */}
              <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {product.description}
                </p>

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
                  onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
                  className="flex-1 py-3.5 px-4 bg-white border border-neutral-900 text-neutral-900 hover:bg-neutral-100 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              {/* Direct Instant Order Button */}
              <button
                onClick={() => onInstantBuy(product, selectedSize, selectedColor, quantity)}
                className="w-full py-4 px-4 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Order Now (Cash on Delivery)</span>
              </button>

              <div className="text-[11px] text-center text-neutral-500 space-y-0.5 pt-1">
                <p>Delivery: Dhaka ৳ 60 (24-48 hrs) · Outside Dhaka ৳ 120 (48-72 hrs)</p>
                <p className="text-neutral-400">Doorstep inspection permitted upon courier arrival</p>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div className="pt-6">
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
