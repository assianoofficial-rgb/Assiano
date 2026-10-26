import React from 'react';
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2, Plus, Minus, Tag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountAmount: number;
  onApplyPromo: (code: string) => void;
  promoError: string;
  deliveryArea: 'dhaka' | 'outside_dhaka';
  setDeliveryArea: (area: 'dhaka' | 'outside_dhaka') => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  promoCode,
  setPromoCode,
  discountAmount,
  onApplyPromo,
  promoError,
  deliveryArea,
  setDeliveryArea,
}) => {
  const [inputCode, setInputCode] = React.useState(promoCode);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = items.length === 0 ? 0 : deliveryArea === 'dhaka' ? 60 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  if (items.length === 0) {
    return (
      <div className="bg-[#FAFAF8] py-20 min-h-[600px] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-200/80 flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif text-neutral-900 font-bold">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Looks like you haven't added any garments to your bag yet. Explore our handcrafted modest silhouettes, kurtis, and three-piece sets.
          </p>
          <div className="pt-4">
            <button
              onClick={onContinueShopping}
              className="px-8 py-3.5 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] py-10 sm:py-14 min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="mb-8 pb-6 border-b border-neutral-200">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold mb-1">
            Review Your Order
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141416]">
            Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)} Items)
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-neutral-200 rounded-sm divide-y divide-neutral-100 overflow-hidden shadow-2xs">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  {/* Image & Details */}
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-26 bg-neutral-100 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
                      <img
                        src={item.customImage || item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#E10613] font-semibold">
                        {item.product.categoryLabel}
                      </span>
                      <h3 className="text-sm font-serif font-bold text-neutral-900 mt-0.5">
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-neutral-500 mt-1 flex flex-wrap gap-2">
                        <span>Size: <strong className="text-neutral-800">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-neutral-800">{item.selectedColor}</strong></span>
                      </div>
                      <div className="text-xs font-mono font-semibold text-neutral-800 mt-1 sm:hidden">
                        Tk {(item.customPrice ?? item.product.price).toLocaleString()} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Total */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 rounded-xs bg-neutral-50">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono font-semibold text-xs tabular-nums text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="text-right min-w-[90px]">
                      <span className="text-base font-bold font-mono text-neutral-900 tabular-nums block">
                        Tk {((item.customPrice ?? item.product.price) * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono hidden sm:block">
                        Tk {(item.customPrice ?? item.product.price).toLocaleString()} / pc
                      </span>
                    </div>

                    {/* Delete item */}
                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-2 text-neutral-400 hover:text-[#E10613] transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions: Continue shopping */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={onContinueShopping}
                className="text-xs font-semibold text-neutral-800 hover:text-[#E10613] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Browsing Catalog</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white border border-neutral-200 rounded-sm p-6 space-y-5 shadow-2xs">
              <h2 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-3">
                Order Summary
              </h2>

              {/* Promo Code Voucher Box */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. ASSIANO10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="w-full text-xs pl-8 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs uppercase font-mono tracking-wider focus:bg-white focus:outline-none focus:border-black"
                    />
                  </div>
                  <button
                    onClick={() => onApplyPromo(inputCode)}
                    className="px-4 py-2.5 bg-neutral-900 hover:bg-[#E10613] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-[#E10613] font-medium mt-1.5">{promoError}</p>
                )}
                {discountAmount > 0 && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1.5">
                    ✓ Promo applied: Saved Tk {discountAmount.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Delivery Location Selector */}
              <div className="pt-3 border-t border-neutral-100">
                <span className="text-xs font-semibold text-neutral-700 block mb-2">
                  Courier Delivery Destination:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setDeliveryArea('dhaka')}
                    className={`p-2.5 rounded-xs border text-left cursor-pointer transition-colors ${
                      deliveryArea === 'dhaka'
                        ? 'border-[#141416] bg-neutral-50 font-semibold text-neutral-900 ring-1 ring-black'
                        : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <span className="block text-[11px]">Inside Dhaka City</span>
                    <span className="font-mono tabular-nums text-xs font-bold text-neutral-900">Tk 60</span>
                  </button>
                  <button
                    onClick={() => setDeliveryArea('outside_dhaka')}
                    className={`p-2.5 rounded-xs border text-left cursor-pointer transition-colors ${
                      deliveryArea === 'outside_dhaka'
                        ? 'border-[#141416] bg-neutral-50 font-semibold text-neutral-900 ring-1 ring-black'
                        : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <span className="block text-[11px]">Outside Dhaka</span>
                    <span className="font-mono tabular-nums text-xs font-bold text-neutral-900">Tk 120</span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 pt-3 border-t border-neutral-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-neutral-900 font-medium">
                    Tk {subtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Voucher Discount</span>
                    <span className="font-mono tabular-nums font-medium">
                      - Tk {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Shipping ({deliveryArea === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span className="font-mono tabular-nums text-neutral-900 font-medium">
                    Tk {shippingFee}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-lg text-[#141416]">
                    Tk {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-neutral-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doorstep Cash on Delivery (COD)</span>
                </div>
                <p className="text-neutral-500">Pay when your order arrives. You may check the fabric at your doorstep.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
